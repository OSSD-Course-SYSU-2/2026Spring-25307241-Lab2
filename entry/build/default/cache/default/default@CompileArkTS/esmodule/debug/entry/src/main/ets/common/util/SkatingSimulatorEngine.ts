import { SkaterPosition, JumpExecution, SpinExecution, StepExecution, Program, TrainingMode, ActionState, JumpPhase, SimulatorConfig, ISUBaseValues } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingSimulatorModel";
import type { ProgramElement, JumpType, SpinType, SpinPosition, StepType } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingSimulatorModel";
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
/**
 * 花样滑冰模拟器引擎
 * 负责物理模拟、动作执行、评分计算
 */
export default class SkatingSimulatorEngine {
    private static readonly TAG = 'SkatingSimulatorEngine';
    // 滑冰者状态
    private position: SkaterPosition;
    private state: ActionState = ActionState.IDLE;
    private currentAction: JumpExecution | SpinExecution | StepExecution | null = null;
    // 节目相关
    private program: Program;
    private currentElement: ProgramElement | null = null;
    private programTime: number = 0;
    private isProgramRunning: boolean = false;
    // 训练模式
    private trainingMode: TrainingMode = TrainingMode.FREE_SKATE;
    // 时间管理
    private lastUpdateTime: number = 0;
    private actionStartTime: number = 0;
    constructor() {
        this.position = new SkaterPosition(SimulatorConfig.RINK_WIDTH / 2, SimulatorConfig.RINK_LENGTH / 2);
        this.program = new Program();
    }
    /**
     * 更新模拟器状态
     */
    update(currentTime: number): void {
        const deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;
        // 更新节目时间
        if (this.isProgramRunning) {
            this.programTime += deltaTime;
            this.checkProgramElements();
        }
        // 根据当前状态更新
        switch (this.state) {
            case ActionState.GLIDING:
                this.updateGliding(deltaTime);
                break;
            case ActionState.EXECUTING:
                this.updateAction(deltaTime, currentTime);
                break;
            case ActionState.LANDING:
                this.updateLanding(deltaTime);
                break;
        }
    }
    /**
     * 更新滑行状态
     */
    private updateGliding(deltaTime: number): void {
        // 应用摩擦力减速
        this.position.speed = Math.max(0, this.position.speed - SimulatorConfig.FRICTION * deltaTime / 1000);
        // 更新位置
        const distance = this.position.speed * deltaTime / 1000;
        const radians = this.position.angle * Math.PI / 180;
        this.position.x += Math.cos(radians) * distance;
        this.position.y += Math.sin(radians) * distance;
        // 边界检测
        this.checkRinkBoundaries();
    }
    /**
     * 更新动作执行
     */
    private updateAction(deltaTime: number, currentTime: number): void {
        if (!this.currentAction) {
            return;
        }
        if (this.currentAction instanceof JumpExecution) {
            this.updateJump(this.currentAction, deltaTime, currentTime);
        }
        else if (this.currentAction instanceof SpinExecution) {
            this.updateSpin(this.currentAction, deltaTime, currentTime);
        }
        else if (this.currentAction instanceof StepExecution) {
            this.updateStep(this.currentAction, deltaTime, currentTime);
        }
    }
    /**
     * 更新跳跃
     */
    private updateJump(jump: JumpExecution, deltaTime: number, currentTime: number): void {
        switch (jump.phase) {
            case JumpPhase.TAKEOFF:
                // 起跳阶段
                const takeoffProgress = (currentTime - jump.takeoffTime) / 200; // 200ms起跳
                if (takeoffProgress >= 1) {
                    jump.phase = JumpPhase.FLIGHT;
                    jump.flightTime = currentTime;
                }
                break;
            case JumpPhase.FLIGHT:
                // 空中飞行阶段
                const flightDuration = this.calculateFlightDuration(jump.rotations);
                const flightProgress = (currentTime - jump.flightTime) / flightDuration;
                if (flightProgress >= 1) {
                    jump.phase = JumpPhase.LANDING;
                    jump.landingTime = currentTime;
                    this.state = ActionState.LANDING;
                }
                else {
                    // 计算高度（抛物线）
                    jump.height = this.calculateJumpHeight(jump.rotations) * Math.sin(flightProgress * Math.PI);
                    // 计算旋转角度
                    jump.rotationAngle = jump.rotations * 360 * flightProgress;
                }
                break;
        }
    }
    /**
     * 更新旋转
     */
    private updateSpin(spin: SpinExecution, deltaTime: number, currentTime: number): void {
        const elapsed = currentTime - spin.startTime;
        const progress = elapsed / spin.duration;
        if (progress >= 1) {
            // 旋转完成
            this.state = ActionState.RECOVERING;
            setTimeout(() => {
                this.state = ActionState.GLIDING;
                this.currentAction = null;
            }, 500);
        }
        else {
            // 更新旋转角度
            spin.currentRotations = spin.rotations * progress;
            // 更新旋转速度（开始快，结束慢）
            const speedFactor = 1 - Math.pow(progress, 2);
            spin.speed = SimulatorConfig.SPIN_SPEED_BASE * speedFactor + 1;
        }
    }
    /**
     * 更新步法
     */
    private updateStep(step: StepExecution, deltaTime: number, currentTime: number): void {
        const elapsed = currentTime - step.startTime;
        const progress = elapsed / step.duration;
        if (progress >= 1) {
            // 步法完成
            this.state = ActionState.GLIDING;
            this.currentAction = null;
        }
        else {
            // 更新步法执行
            step.quality = Math.min(10, step.quality + deltaTime / 100);
        }
    }
    /**
     * 更新落冰
     */
    private updateLanding(deltaTime: number): void {
        if (this.currentAction instanceof JumpExecution) {
            const jump = this.currentAction;
            const landingProgress = (Date.now() - jump.landingTime) / 500; // 500ms落冰
            if (landingProgress >= 1) {
                // 落冰完成
                jump.height = 0;
                this.state = ActionState.RECOVERING;
                // 计算落冰质量
                jump.landingQuality = this.calculateLandingQuality(jump);
                setTimeout(() => {
                    this.state = ActionState.GLIDING;
                    this.currentAction = null;
                }, 300);
            }
        }
    }
    /**
     * 执行跳跃
     */
    executeJump(type: JumpType, rotations: number): JumpExecution {
        const jump = new JumpExecution(type, rotations);
        jump.phase = JumpPhase.APPROACH;
        jump.takeoffTime = Date.now();
        this.currentAction = jump;
        this.state = ActionState.EXECUTING;
        this.actionStartTime = Date.now();
        Logger.info(SkatingSimulatorEngine.TAG, `Executing jump: ${rotations}${type}`);
        return jump;
    }
    /**
     * 执行旋转
     */
    executeSpin(type: SpinType, position: SpinPosition, rotations: number): SpinExecution {
        const spin = new SpinExecution(type, position);
        spin.rotations = rotations;
        spin.startTime = Date.now();
        spin.duration = rotations * 1000; // 每周1秒
        spin.center = new SkaterPosition(this.position.x, this.position.y);
        this.currentAction = spin;
        this.state = ActionState.EXECUTING;
        this.actionStartTime = Date.now();
        Logger.info(SkatingSimulatorEngine.TAG, `Executing spin: ${type}`);
        return spin;
    }
    /**
     * 执行步法
     */
    executeStep(type: StepType): StepExecution {
        const step = new StepExecution(type);
        step.startTime = Date.now();
        step.duration = 1000; // 1秒
        this.currentAction = step;
        this.state = ActionState.EXECUTING;
        this.actionStartTime = Date.now();
        Logger.info(SkatingSimulatorEngine.TAG, `Executing step: ${type}`);
        return step;
    }
    /**
     * 控制滑行
     */
    controlSkating(direction: number, acceleration: number): void {
        if (this.state !== ActionState.GLIDING && this.state !== ActionState.IDLE) {
            return;
        }
        // 转向
        this.position.angle += direction * 5;
        // 加速
        this.position.speed = Math.min(SimulatorConfig.MAX_SPEED, this.position.speed + acceleration * SimulatorConfig.ACCELERATION * 0.1);
        this.state = ActionState.GLIDING;
    }
    /**
     * 开始节目
     */
    startProgram(): void {
        this.isProgramRunning = true;
        this.programTime = 0;
        Logger.info(SkatingSimulatorEngine.TAG, 'Program started');
    }
    /**
     * 停止节目
     */
    stopProgram(): void {
        this.isProgramRunning = false;
        Logger.info(SkatingSimulatorEngine.TAG, 'Program stopped');
    }
    /**
     * 检查节目元素
     */
    private checkProgramElements(): void {
        for (const element of this.program.elements) {
            if (!element.isExecuted && this.programTime >= element.startTime) {
                this.currentElement = element;
                this.executeProgramElement(element);
            }
        }
    }
    /**
     * 执行节目元素
     */
    private executeProgramElement(element: ProgramElement): void {
        if (element.execution instanceof JumpExecution) {
            const jump = element.execution as JumpExecution;
            this.executeJump(jump.type, jump.rotations);
        }
        else if (element.execution instanceof SpinExecution) {
            const spin = element.execution as SpinExecution;
            this.executeSpin(spin.type, spin.position, spin.rotations);
        }
        else if (element.execution instanceof StepExecution) {
            const step = element.execution as StepExecution;
            this.executeStep(step.type);
        }
        element.isExecuted = true;
    }
    /**
     * 添加节目元素
     */
    addProgramElement(element: ProgramElement): void {
        this.program.elements.push(element);
        this.calculateElementBaseValue(element);
    }
    /**
     * 计算元素基础分值
     */
    private calculateElementBaseValue(element: ProgramElement): void {
        let code = '';
        if (element.execution instanceof JumpExecution) {
            const jump = element.execution as JumpExecution;
            code = `${jump.rotations}${jump.type}`;
            element.baseValue = ISUBaseValues.JUMP_VALUES.get(code) || 0;
        }
        else if (element.execution instanceof SpinExecution) {
            const spin = element.execution as SpinExecution;
            code = `${spin.type}${spin.level}`;
            element.baseValue = ISUBaseValues.SPIN_VALUES.get(code) || 0;
        }
        else if (element.execution instanceof StepExecution) {
            const step = element.execution as StepExecution;
            code = `StSq${step.quality >= 8 ? 4 : step.quality >= 6 ? 3 : step.quality >= 4 ? 2 : 1}`;
            element.baseValue = ISUBaseValues.STEP_VALUES.get(code) || 0;
        }
    }
    /**
     * 计算飞行时长
     */
    private calculateFlightDuration(rotations: number): number {
        // 根据周数计算空中时间
        return 400 + rotations * 100; // 基础400ms + 每周100ms
    }
    /**
     * 计算跳跃高度
     */
    private calculateJumpHeight(rotations: number): number {
        switch (rotations) {
            case 1:
                return SimulatorConfig.JUMP_HEIGHT_1ROT;
            case 2:
                return SimulatorConfig.JUMP_HEIGHT_2ROT;
            case 3:
                return SimulatorConfig.JUMP_HEIGHT_3ROT;
            case 4:
                return SimulatorConfig.JUMP_HEIGHT_4ROT;
            default:
                return SimulatorConfig.JUMP_HEIGHT_1ROT;
        }
    }
    /**
     * 计算落冰质量
     */
    private calculateLandingQuality(jump: JumpExecution): number {
        // 基于速度、角度等因素计算落冰质量
        let quality = 8; // 基础质量
        // 速度影响
        if (this.position.speed > 5) {
            quality += 1;
        }
        else if (this.position.speed < 2) {
            quality -= 2;
        }
        // 旋转完成度影响
        const expectedRotations = jump.rotations * 360;
        const actualRotations = jump.rotationAngle;
        const rotationDiff = Math.abs(expectedRotations - actualRotations);
        if (rotationDiff < 10) {
            quality += 1;
        }
        else if (rotationDiff > 30) {
            quality -= 2;
            jump.underRotated = true;
        }
        else if (rotationDiff > 90) {
            quality -= 4;
            jump.fall = true;
        }
        return Math.max(0, Math.min(10, quality));
    }
    /**
     * 检查冰场边界
     */
    private checkRinkBoundaries(): void {
        const margin = 2; // 边界余量
        // 检查X边界
        if (this.position.x < margin) {
            this.position.x = margin;
            this.position.angle = 180 - this.position.angle;
        }
        else if (this.position.x > SimulatorConfig.RINK_WIDTH - margin) {
            this.position.x = SimulatorConfig.RINK_WIDTH - margin;
            this.position.angle = 180 - this.position.angle;
        }
        // 检查Y边界
        if (this.position.y < margin) {
            this.position.y = margin;
            this.position.angle = -this.position.angle;
        }
        else if (this.position.y > SimulatorConfig.RINK_LENGTH - margin) {
            this.position.y = SimulatorConfig.RINK_LENGTH - margin;
            this.position.angle = -this.position.angle;
        }
    }
    /**
     * 获取当前位置
     */
    getPosition(): SkaterPosition {
        return this.position;
    }
    /**
     * 获取当前状态
     */
    getState(): ActionState {
        return this.state;
    }
    /**
     * 获取当前动作
     */
    getCurrentAction(): JumpExecution | SpinExecution | StepExecution | null {
        return this.currentAction;
    }
    /**
     * 获取节目
     */
    getProgram(): Program {
        return this.program;
    }
    /**
     * 获取节目时间
     */
    getProgramTime(): number {
        return this.programTime;
    }
    /**
     * 设置训练模式
     */
    setTrainingMode(mode: TrainingMode): void {
        this.trainingMode = mode;
        Logger.info(SkatingSimulatorEngine.TAG, `Training mode set to: ${mode}`);
    }
    /**
     * 获取训练模式
     */
    getTrainingMode(): TrainingMode {
        return this.trainingMode;
    }
}
