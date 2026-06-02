if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SkatingSimulatorPage_Params {
    engine?: SkatingSimulatorEngine;
    timer?: number;
    TAG?;
    trainingMode?: TrainingMode;
    actionState?: ActionState;
    currentAction?: string;
    programTime?: number;
    skaterX?: number;
    skaterY?: number;
    skaterAngle?: number;
    jumpHeight?: number;
    rotationAngle?: number;
    isAccelerating?: boolean;
    isTurningLeft?: boolean;
    isTurningRight?: boolean;
}
import SkatingSimulatorEngine from "@bundle:com.example.simplecalculator/entry/ets/common/util/SkatingSimulatorEngine";
import { TrainingMode, ActionState, JumpType, SpinType, SpinPosition, StepType, JumpExecution, SpinExecution, SimulatorConfig } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingSimulatorModel";
import Logger from "@bundle:com.example.simplecalculator/entry/ets/common/util/Logger";
class SkatingSimulatorPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.engine = new SkatingSimulatorEngine();
        this.timer = -1;
        this.TAG = 'SkatingSimulatorPage';
        this.__trainingMode = new ObservedPropertySimplePU(TrainingMode.FREE_SKATE, this, "trainingMode");
        this.__actionState = new ObservedPropertySimplePU(ActionState.IDLE, this, "actionState");
        this.__currentAction = new ObservedPropertySimplePU('', this, "currentAction");
        this.__programTime = new ObservedPropertySimplePU(0, this, "programTime");
        this.__skaterX = new ObservedPropertySimplePU(0, this, "skaterX");
        this.__skaterY = new ObservedPropertySimplePU(0, this, "skaterY");
        this.__skaterAngle = new ObservedPropertySimplePU(0, this, "skaterAngle");
        this.__jumpHeight = new ObservedPropertySimplePU(0, this, "jumpHeight");
        this.__rotationAngle = new ObservedPropertySimplePU(0, this, "rotationAngle");
        this.__isAccelerating = new ObservedPropertySimplePU(false, this, "isAccelerating");
        this.__isTurningLeft = new ObservedPropertySimplePU(false, this, "isTurningLeft");
        this.__isTurningRight = new ObservedPropertySimplePU(false, this, "isTurningRight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SkatingSimulatorPage_Params) {
        if (params.engine !== undefined) {
            this.engine = params.engine;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.TAG !== undefined) {
            this.TAG = params.TAG;
        }
        if (params.trainingMode !== undefined) {
            this.trainingMode = params.trainingMode;
        }
        if (params.actionState !== undefined) {
            this.actionState = params.actionState;
        }
        if (params.currentAction !== undefined) {
            this.currentAction = params.currentAction;
        }
        if (params.programTime !== undefined) {
            this.programTime = params.programTime;
        }
        if (params.skaterX !== undefined) {
            this.skaterX = params.skaterX;
        }
        if (params.skaterY !== undefined) {
            this.skaterY = params.skaterY;
        }
        if (params.skaterAngle !== undefined) {
            this.skaterAngle = params.skaterAngle;
        }
        if (params.jumpHeight !== undefined) {
            this.jumpHeight = params.jumpHeight;
        }
        if (params.rotationAngle !== undefined) {
            this.rotationAngle = params.rotationAngle;
        }
        if (params.isAccelerating !== undefined) {
            this.isAccelerating = params.isAccelerating;
        }
        if (params.isTurningLeft !== undefined) {
            this.isTurningLeft = params.isTurningLeft;
        }
        if (params.isTurningRight !== undefined) {
            this.isTurningRight = params.isTurningRight;
        }
    }
    updateStateVars(params: SkatingSimulatorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__trainingMode.purgeDependencyOnElmtId(rmElmtId);
        this.__actionState.purgeDependencyOnElmtId(rmElmtId);
        this.__currentAction.purgeDependencyOnElmtId(rmElmtId);
        this.__programTime.purgeDependencyOnElmtId(rmElmtId);
        this.__skaterX.purgeDependencyOnElmtId(rmElmtId);
        this.__skaterY.purgeDependencyOnElmtId(rmElmtId);
        this.__skaterAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__jumpHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__rotationAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__isAccelerating.purgeDependencyOnElmtId(rmElmtId);
        this.__isTurningLeft.purgeDependencyOnElmtId(rmElmtId);
        this.__isTurningRight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__trainingMode.aboutToBeDeleted();
        this.__actionState.aboutToBeDeleted();
        this.__currentAction.aboutToBeDeleted();
        this.__programTime.aboutToBeDeleted();
        this.__skaterX.aboutToBeDeleted();
        this.__skaterY.aboutToBeDeleted();
        this.__skaterAngle.aboutToBeDeleted();
        this.__jumpHeight.aboutToBeDeleted();
        this.__rotationAngle.aboutToBeDeleted();
        this.__isAccelerating.aboutToBeDeleted();
        this.__isTurningLeft.aboutToBeDeleted();
        this.__isTurningRight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private engine: SkatingSimulatorEngine;
    private timer: number;
    private readonly TAG;
    private __trainingMode: ObservedPropertySimplePU<TrainingMode>;
    get trainingMode() {
        return this.__trainingMode.get();
    }
    set trainingMode(newValue: TrainingMode) {
        this.__trainingMode.set(newValue);
    }
    private __actionState: ObservedPropertySimplePU<ActionState>;
    get actionState() {
        return this.__actionState.get();
    }
    set actionState(newValue: ActionState) {
        this.__actionState.set(newValue);
    }
    private __currentAction: ObservedPropertySimplePU<string>;
    get currentAction() {
        return this.__currentAction.get();
    }
    set currentAction(newValue: string) {
        this.__currentAction.set(newValue);
    }
    private __programTime: ObservedPropertySimplePU<number>;
    get programTime() {
        return this.__programTime.get();
    }
    set programTime(newValue: number) {
        this.__programTime.set(newValue);
    }
    // 滑冰者位置（用于UI显示）
    private __skaterX: ObservedPropertySimplePU<number>;
    get skaterX() {
        return this.__skaterX.get();
    }
    set skaterX(newValue: number) {
        this.__skaterX.set(newValue);
    }
    private __skaterY: ObservedPropertySimplePU<number>;
    get skaterY() {
        return this.__skaterY.get();
    }
    set skaterY(newValue: number) {
        this.__skaterY.set(newValue);
    }
    private __skaterAngle: ObservedPropertySimplePU<number>;
    get skaterAngle() {
        return this.__skaterAngle.get();
    }
    set skaterAngle(newValue: number) {
        this.__skaterAngle.set(newValue);
    }
    private __jumpHeight: ObservedPropertySimplePU<number>;
    get jumpHeight() {
        return this.__jumpHeight.get();
    }
    set jumpHeight(newValue: number) {
        this.__jumpHeight.set(newValue);
    }
    private __rotationAngle: ObservedPropertySimplePU<number>;
    get rotationAngle() {
        return this.__rotationAngle.get();
    }
    set rotationAngle(newValue: number) {
        this.__rotationAngle.set(newValue);
    }
    // 控制状态
    private __isAccelerating: ObservedPropertySimplePU<boolean>;
    get isAccelerating() {
        return this.__isAccelerating.get();
    }
    set isAccelerating(newValue: boolean) {
        this.__isAccelerating.set(newValue);
    }
    private __isTurningLeft: ObservedPropertySimplePU<boolean>;
    get isTurningLeft() {
        return this.__isTurningLeft.get();
    }
    set isTurningLeft(newValue: boolean) {
        this.__isTurningLeft.set(newValue);
    }
    private __isTurningRight: ObservedPropertySimplePU<boolean>;
    get isTurningRight() {
        return this.__isTurningRight.get();
    }
    set isTurningRight(newValue: boolean) {
        this.__isTurningRight.set(newValue);
    }
    aboutToAppear() {
        Logger.info(this.TAG, 'Simulator page appeared');
        this.startSimulation();
    }
    aboutToDisappear() {
        this.stopSimulation();
        Logger.info(this.TAG, 'Simulator page disappeared');
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        // 顶部控制栏
        this.buildTopBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区域
            Stack.create();
            // 主内容区域
            Stack.width('100%');
            // 主内容区域
            Stack.height(450);
            // 主内容区域
            Stack.backgroundColor('#E3F2FD');
        }, Stack);
        // 冰场
        this.buildRink.bind(this)();
        // 滑冰者
        this.buildSkater.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 训练模式界面
            if (this.trainingMode === TrainingMode.JUMP_TRAINING) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildJumpTrainingPanel.bind(this)();
                });
            }
            else if (this.trainingMode === TrainingMode.SPIN_TRAINING) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildSpinTrainingPanel.bind(this)();
                });
            }
            else if (this.trainingMode === TrainingMode.STEP_TRAINING) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildStepTrainingPanel.bind(this)();
                });
            }
            else if (this.trainingMode === TrainingMode.PROGRAM_EDIT) {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.buildProgramEditPanel.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
        // 主内容区域
        Stack.pop();
        // 底部控制面板
        this.buildControlPanel.bind(this)();
        Column.pop();
    }
    // 构建顶部控制栏
    buildTopBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(60);
            Row.padding({ left: 10, right: 10 });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('自由滑行');
            Button.width('18%');
            Button.height(40);
            Button.fontSize(12);
            Button.backgroundColor(this.trainingMode === TrainingMode.FREE_SKATE ? '#4CAF50' : '#E0E0E0');
            Button.onClick(() => this.setMode(TrainingMode.FREE_SKATE));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('跳跃训练');
            Button.width('18%');
            Button.height(40);
            Button.fontSize(12);
            Button.backgroundColor(this.trainingMode === TrainingMode.JUMP_TRAINING ? '#4CAF50' : '#E0E0E0');
            Button.onClick(() => this.setMode(TrainingMode.JUMP_TRAINING));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('旋转训练');
            Button.width('18%');
            Button.height(40);
            Button.fontSize(12);
            Button.backgroundColor(this.trainingMode === TrainingMode.SPIN_TRAINING ? '#4CAF50' : '#E0E0E0');
            Button.onClick(() => this.setMode(TrainingMode.SPIN_TRAINING));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('步法训练');
            Button.width('18%');
            Button.height(40);
            Button.fontSize(12);
            Button.backgroundColor(this.trainingMode === TrainingMode.STEP_TRAINING ? '#4CAF50' : '#E0E0E0');
            Button.onClick(() => this.setMode(TrainingMode.STEP_TRAINING));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('节目编排');
            Button.width('18%');
            Button.height(40);
            Button.fontSize(12);
            Button.backgroundColor(this.trainingMode === TrainingMode.PROGRAM_EDIT ? '#4CAF50' : '#E0E0E0');
            Button.onClick(() => this.setMode(TrainingMode.PROGRAM_EDIT));
        }, Button);
        Button.pop();
        Row.pop();
    }
    // 构建冰场
    buildRink(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.border({ width: 3, color: '#2196F3' });
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 冰场背景
            Column.create();
            // 冰场背景
            Column.width('100%');
            // 冰场背景
            Column.height('100%');
            // 冰场背景
            Column.linearGradient({
                angle: 180,
                colors: [['#E3F2FD', 0], ['#BBDEFB', 0.5], ['#90CAF9', 1]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 中心圆
            Row.create();
            // 中心圆
            Row.width('100%');
            // 中心圆
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(100);
            Row.height(100);
            Row.borderRadius(50);
            Row.border({ width: 2, color: '#B3E5FC' });
        }, Row);
        Row.pop();
        Column.pop();
        // 中心圆
        Row.pop();
        // 冰场背景
        Column.pop();
        Column.pop();
    }
    // 构建滑冰者
    buildSkater(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(50);
            Row.height(50);
            Row.position({ x: `${(this.skaterX / SimulatorConfig.RINK_WIDTH) * 100}%`, y: `${(this.skaterY / SimulatorConfig.RINK_LENGTH) * 100}%` });
            Row.justifyContent(FlexAlign.Center);
            Row.markAnchor({ x: 25, y: 25 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️');
            Text.fontSize(40);
            Text.rotate({ angle: this.skaterAngle + this.rotationAngle });
            Text.offset({ y: -this.jumpHeight * 50 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    // 构建跳跃训练面板
    buildJumpTrainingPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor('rgba(255, 255, 255, 0.95)');
            Column.borderRadius(15);
            Column.position({ x: '5%', y: '10%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('跳跃训练');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`当前动作: ${this.currentAction}`);
            Text.fontSize(16);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 跳跃选择
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround });
            // 跳跃选择
            Flex.width('100%');
        }, Flex);
        this.buildJumpButton.bind(this)('1T', JumpType.TOE_LOOP, 1);
        this.buildJumpButton.bind(this)('1S', JumpType.SALCHOW, 1);
        this.buildJumpButton.bind(this)('1Lo', JumpType.LOOP, 1);
        this.buildJumpButton.bind(this)('1F', JumpType.FLIP, 1);
        this.buildJumpButton.bind(this)('1Lz', JumpType.LUTZ, 1);
        this.buildJumpButton.bind(this)('1A', JumpType.AXEL, 1);
        this.buildJumpButton.bind(this)('2T', JumpType.TOE_LOOP, 2);
        this.buildJumpButton.bind(this)('2S', JumpType.SALCHOW, 2);
        this.buildJumpButton.bind(this)('2A', JumpType.AXEL, 2);
        this.buildJumpButton.bind(this)('3T', JumpType.TOE_LOOP, 3);
        this.buildJumpButton.bind(this)('3S', JumpType.SALCHOW, 3);
        this.buildJumpButton.bind(this)('3Lz', JumpType.LUTZ, 3);
        this.buildJumpButton.bind(this)('4T', JumpType.TOE_LOOP, 4);
        this.buildJumpButton.bind(this)('4S', JumpType.SALCHOW, 4);
        // 跳跃选择
        Flex.pop();
        Column.pop();
    }
    // 构建跳跃按钮
    buildJumpButton(label: string, type: JumpType, rotations: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(label);
            Button.width(60);
            Button.height(50);
            Button.fontSize(14);
            Button.backgroundColor('#2196F3');
            Button.margin({ bottom: 10 });
            Button.onClick(() => {
                this.executeJump(type, rotations);
            });
        }, Button);
        Button.pop();
    }
    // 构建旋转训练面板
    buildSpinTrainingPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor('rgba(255, 255, 255, 0.95)');
            Column.borderRadius(15);
            Column.position({ x: '5%', y: '10%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('旋转训练');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`当前动作: ${this.currentAction}`);
            Text.fontSize(16);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 旋转选择
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround });
            // 旋转选择
            Flex.width('100%');
        }, Flex);
        this.buildSpinButton.bind(this)('直立转', SpinType.UPRIGHT, SpinPosition.UPRIGHT);
        this.buildSpinButton.bind(this)('蹲转', SpinType.SIT, SpinPosition.SIT);
        this.buildSpinButton.bind(this)('骆驼转', SpinType.CAMEL, SpinPosition.CAMEL);
        this.buildSpinButton.bind(this)('后仰转', SpinType.LAYBACK, SpinPosition.LAYBACK);
        // 旋转选择
        Flex.pop();
        Column.pop();
    }
    // 构建旋转按钮
    buildSpinButton(label: string, type: SpinType, position: SpinPosition, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(label);
            Button.width(80);
            Button.height(50);
            Button.fontSize(14);
            Button.backgroundColor('#9C27B0');
            Button.margin({ bottom: 10 });
            Button.onClick(() => {
                this.executeSpin(type, position);
            });
        }, Button);
        Button.pop();
    }
    // 构建步法训练面板
    buildStepTrainingPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor('rgba(255, 255, 255, 0.95)');
            Column.borderRadius(15);
            Column.position({ x: '5%', y: '10%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('步法训练');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`当前动作: ${this.currentAction}`);
            Text.fontSize(16);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步法选择
            Flex.create({ wrap: FlexWrap.Wrap, justifyContent: FlexAlign.SpaceAround });
            // 步法选择
            Flex.width('100%');
        }, Flex);
        this.buildStepButton.bind(this)('三字转', StepType.THREE_TURN);
        this.buildStepButton.bind(this)('括弧步', StepType.BRACKET);
        this.buildStepButton.bind(this)('捻转步', StepType.TWIZZLE);
        this.buildStepButton.bind(this)('螺旋线', StepType.SPIRAL);
        // 步法选择
        Flex.pop();
        Column.pop();
    }
    // 构建步法按钮
    buildStepButton(label: string, type: StepType, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(label);
            Button.width(80);
            Button.height(50);
            Button.fontSize(14);
            Button.backgroundColor('#FF9800');
            Button.margin({ bottom: 10 });
            Button.onClick(() => {
                this.executeStep(type);
            });
        }, Button);
        Button.pop();
    }
    // 构建节目编排面板
    buildProgramEditPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor('rgba(255, 255, 255, 0.95)');
            Column.borderRadius(15);
            Column.position({ x: '5%', y: '10%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节目编排');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`节目时间: ${(this.programTime / 1000).toFixed(1)}秒`);
            Text.fontSize(16);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始节目');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
            Button.backgroundColor('#4CAF50');
            Button.onClick(() => {
                this.engine.startProgram();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('停止节目');
            Button.width('45%');
            Button.height(50);
            Button.fontSize(16);
            Button.backgroundColor('#FF6B6B');
            Button.onClick(() => {
                this.engine.stopProgram();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    // 构建控制面板
    buildControlPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor(Color.White);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 方向控制
            Row.create();
            // 方向控制
            Row.width('100%');
            // 方向控制
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 方向控制
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('← 左转');
            Button.width('30%');
            Button.height(60);
            Button.fontSize(16);
            Button.backgroundColor(this.isTurningLeft ? '#4CAF50' : '#E0E0E0');
            Button.onTouch((event: TouchEvent) => {
                if (event.type === TouchType.Down) {
                    this.isTurningLeft = true;
                }
                else if (event.type === TouchType.Up) {
                    this.isTurningLeft = false;
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('加速');
            Button.width('30%');
            Button.height(60);
            Button.fontSize(16);
            Button.backgroundColor(this.isAccelerating ? '#4CAF50' : '#E0E0E0');
            Button.onTouch((event: TouchEvent) => {
                if (event.type === TouchType.Down) {
                    this.isAccelerating = true;
                }
                else if (event.type === TouchType.Up) {
                    this.isAccelerating = false;
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('右转 →');
            Button.width('30%');
            Button.height(60);
            Button.fontSize(16);
            Button.backgroundColor(this.isTurningRight ? '#4CAF50' : '#E0E0E0');
            Button.onTouch((event: TouchEvent) => {
                if (event.type === TouchType.Down) {
                    this.isTurningRight = true;
                }
                else if (event.type === TouchType.Up) {
                    this.isTurningRight = false;
                }
            });
        }, Button);
        Button.pop();
        // 方向控制
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 状态显示
            Row.create();
            // 状态显示
            Row.width('100%');
            // 状态显示
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`状态: ${this.getStateText()}`);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`速度: ${this.engine.getPosition().speed.toFixed(1)} m/s`);
            Text.fontSize(14);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        // 状态显示
        Row.pop();
        Column.pop();
    }
    // 设置训练模式
    private setMode(mode: TrainingMode) {
        this.trainingMode = mode;
        this.engine.setTrainingMode(mode);
    }
    // 执行跳跃
    private executeJump(type: JumpType, rotations: number) {
        const jump = this.engine.executeJump(type, rotations);
        this.currentAction = `${rotations}${type}`;
    }
    // 执行旋转
    private executeSpin(type: SpinType, position: SpinPosition) {
        const spin = this.engine.executeSpin(type, position, 3);
        this.currentAction = type;
    }
    // 执行步法
    private executeStep(type: StepType) {
        const step = this.engine.executeStep(type);
        this.currentAction = type;
    }
    // 获取状态文本
    private getStateText(): string {
        switch (this.actionState) {
            case ActionState.IDLE:
                return '空闲';
            case ActionState.GLIDING:
                return '滑行';
            case ActionState.PREPARING:
                return '准备';
            case ActionState.EXECUTING:
                return '执行中';
            case ActionState.LANDING:
                return '落冰';
            case ActionState.RECOVERING:
                return '恢复';
            default:
                return '未知';
        }
    }
    // 启动模拟
    private startSimulation() {
        this.stopSimulation();
        this.timer = setInterval(() => {
            const currentTime = Date.now();
            // 处理控制输入
            if (this.isTurningLeft) {
                this.engine.controlSkating(-1, 0);
            }
            if (this.isTurningRight) {
                this.engine.controlSkating(1, 0);
            }
            if (this.isAccelerating) {
                this.engine.controlSkating(0, 1);
            }
            // 更新引擎
            this.engine.update(currentTime);
            // 更新UI状态
            this.updateUI();
        }, SimulatorConfig.UPDATE_INTERVAL);
    }
    // 停止模拟
    private stopSimulation() {
        if (this.timer !== -1) {
            clearInterval(this.timer);
            this.timer = -1;
        }
    }
    // 更新UI
    private updateUI() {
        const position = this.engine.getPosition();
        this.skaterX = position.x;
        this.skaterY = position.y;
        this.skaterAngle = position.angle;
        this.actionState = this.engine.getState();
        this.programTime = this.engine.getProgramTime();
        // 更新动作状态
        const action = this.engine.getCurrentAction();
        if (action instanceof JumpExecution) {
            this.jumpHeight = action.height;
            this.rotationAngle = action.rotationAngle;
        }
        else if (action instanceof SpinExecution) {
            this.rotationAngle = action.currentRotations * 360;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SkatingSimulatorPage";
    }
}
registerNamedRoute(() => new SkatingSimulatorPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/SkatingSimulatorPage", pageFullPath: "entry/src/main/ets/pages/SkatingSimulatorPage", integratedHsp: "false", moduleType: "followWithHap" });
