/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 跳跃类型枚举
 */
export enum JumpType {
    TOE_LOOP = "T",
    SALCHOW = "S",
    LOOP = "Lo",
    FLIP = "F",
    LUTZ = "Lz",
    AXEL = "A" // 阿克塞尔跳
}
/**
 * 旋转类型枚举
 */
export enum SpinType {
    UPRIGHT = "USp",
    SIT = "SSp",
    CAMEL = "CSp",
    LAYBACK = "LSp" // 仰转
}
/**
 * 步法类型枚举
 */
export enum StepType {
    THREE_TURN = "3T",
    BRACKET = "Br",
    ROCKEFELLER = "Rk",
    COUNTER = "Co",
    CHOCTAW = "Ch",
    MOHAWK = "Mo",
    TWIZZLE = "Tw",
    SPIRAL = "Sp" // 螺旋线
}
/**
 * 动作状态枚举
 */
export enum ActionState {
    IDLE = "idle",
    GLIDING = "gliding",
    PREPARING = "preparing",
    EXECUTING = "executing",
    LANDING = "landing",
    RECOVERING = "recovering" // 恢复
}
/**
 * 跳跃阶段枚举
 */
export enum JumpPhase {
    APPROACH = "approach",
    TAKEOFF = "takeoff",
    FLIGHT = "flight",
    LANDING = "landing" // 落冰
}
/**
 * 旋转姿态枚举
 */
export enum SpinPosition {
    UPRIGHT = "upright",
    SIT = "sit",
    CAMEL = "camel",
    LAYBACK = "layback",
    CHANGE = "change" // 换姿
}
/**
 * 滑冰者位置和状态
 */
export class SkaterPosition {
    x: number = 0; // X坐标（米）
    y: number = 0; // Y坐标（米）
    angle: number = 0; // 朝向角度（度）
    speed: number = 0; // 速度（米/秒）
    edge: string = 'RFO'; // 刀刃（右前外刃）
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}
/**
 * 跳跃数据模型
 */
export class JumpExecution {
    type: JumpType; // 跳跃类型
    rotations: number; // 旋转周数
    phase: JumpPhase = JumpPhase.APPROACH; // 当前阶段
    takeoffTime: number = 0; // 起跳时间
    flightTime: number = 0; // 空中时间（毫秒）
    landingTime: number = 0; // 落冰时间
    height: number = 0; // 跳跃高度（米）
    rotationAngle: number = 0; // 当前旋转角度
    landingQuality: number = 0; // 落冰质量（0-10）
    underRotated: boolean = false; // 是否降组
    fall: boolean = false; // 是否摔倒
    constructor(type: JumpType, rotations: number) {
        this.type = type;
        this.rotations = rotations;
    }
}
/**
 * 旋转数据模型
 */
export class SpinExecution {
    type: SpinType; // 旋转类型
    level: number = 1; // 等级（1-4）
    position: SpinPosition; // 当前姿态
    rotations: number = 0; // 总旋转周数
    currentRotations: number = 0; // 当前已旋转周数
    speed: number = 0; // 旋转速度（转/秒）
    center: SkaterPosition; // 旋转中心
    startTime: number = 0; // 开始时间
    duration: number = 0; // 持续时间（毫秒）
    changeFoot: boolean = false; // 是否换脚
    flying: boolean = false; // 是否飞身旋转
    constructor(type: SpinType, position: SpinPosition) {
        this.type = type;
        this.position = position;
        this.center = new SkaterPosition();
    }
}
/**
 * 步法数据模型
 */
export class StepExecution {
    type: StepType; // 步法类型
    direction: string = 'forward'; // 方向（forward/backward）
    edge: string = 'outside'; // 刀刃（inside/outside）
    startTime: number = 0; // 开始时间
    duration: number = 0; // 持续时间
    quality: number = 0; // 执行质量（0-10）
    constructor(type: StepType) {
        this.type = type;
    }
}
/**
 * 节目动作元素
 */
export class ProgramElement {
    id: string; // 元素ID
    type: string; // 元素类型（jump/spin/step）
    execution: JumpExecution | SpinExecution | StepExecution; // 执行数据
    startTime: number; // 开始时间（毫秒）
    endTime: number; // 结束时间（毫秒）
    baseValue: number; // 基础分值
    goe: number = 0; // GOE评分
    finalScore: number = 0; // 最终得分
    isExecuted: boolean = false; // 是否已执行
    constructor(id: string, type: string, startTime: number) {
        this.id = id;
        this.type = type;
        this.startTime = startTime;
        this.endTime = startTime;
        this.execution = new JumpExecution(JumpType.TOE_LOOP, 1);
        this.baseValue = 0;
    }
}
/**
 * 音乐数据模型
 */
export class Music {
    title: string = ''; // 音乐标题
    artist: string = ''; // 艺术家
    duration: number = 0; // 时长（毫秒）
    filePath: string = ''; // 文件路径
    bpm: number = 0; // 节拍（BPM）
    beats: number[] = []; // 节拍时间点
    isPlaying: boolean = false; // 是否播放中
    currentTime: number = 0; // 当前播放时间
}
/**
 * 节目数据模型
 */
export class Program {
    name: string = ''; // 节目名称
    type: string = 'SP'; // 节目类型（SP/FS）
    music: Music = new Music(); // 音乐
    elements: ProgramElement[] = []; // 动作元素列表
    duration: number = 0; // 节目时长（毫秒）
    totalScore: number = 0; // 总分
    technicalScore: number = 0; // 技术分
    componentScore: number = 0; // 节目内容分
    // 节目内容分项
    skatingSkills: number = 0; // 滑行技术
    transitions: number = 0; // 动作衔接
    performance: number = 0; // 表演质量
    choreography: number = 0; // 编排构成
    interpretation: number = 0; // 音乐诠释
}
/**
 * 训练模式枚举
 */
export enum TrainingMode {
    FREE_SKATE = "freeSkate",
    JUMP_TRAINING = "jumpTraining",
    SPIN_TRAINING = "spinTraining",
    STEP_TRAINING = "stepTraining",
    PROGRAM_EDIT = "programEdit",
    PROGRAM_RUN = "programRun" // 节目运行
}
/**
 * 模拟器配置
 */
export class SimulatorConfig {
    static readonly RINK_WIDTH = 30; // 冰场宽度（米）
    static readonly RINK_LENGTH = 60; // 冰场长度（米）
    static readonly RINK_CORNER_RADIUS = 8.5; // 圆角半径（米）
    static readonly MAX_SPEED = 15; // 最大速度（米/秒）
    static readonly ACCELERATION = 2; // 加速度（米/秒²）
    static readonly FRICTION = 0.1; // 摩擦系数
    static readonly GRAVITY = 9.8; // 重力加速度
    static readonly JUMP_HEIGHT_1ROT = 0.5; // 1周跳高度（米）
    static readonly JUMP_HEIGHT_2ROT = 0.6; // 2周跳高度
    static readonly JUMP_HEIGHT_3ROT = 0.7; // 3周跳高度
    static readonly JUMP_HEIGHT_4ROT = 0.8; // 4周跳高度
    static readonly SPIN_SPEED_BASE = 2; // 基础旋转速度（转/秒）
    static readonly SPIN_SPEED_MAX = 5; // 最大旋转速度
    static readonly FRAME_RATE = 60; // 帧率
    static readonly UPDATE_INTERVAL = 16; // 更新间隔（毫秒）
}
/**
 * ISU基础分值表
 */
export class ISUBaseValues {
    // 跳跃基础分值
    static readonly JUMP_VALUES: Map<string, number> = new Map([
        ['1T', 0.4], ['1S', 0.4], ['1Lo', 0.5], ['1F', 0.8], ['1Lz', 0.6], ['1A', 1.1],
        ['2T', 1.3], ['2S', 1.3], ['2Lo', 1.7], ['2F', 2.6], ['2Lz', 2.1], ['2A', 3.3],
        ['3T', 4.2], ['3S', 4.3], ['3Lo', 4.9], ['3F', 5.3], ['3Lz', 5.9], ['3A', 8.0],
        ['4T', 9.5], ['4S', 9.7], ['4Lo', 10.5], ['4F', 11.0], ['4Lz', 11.5], ['4A', 12.5]
    ]);
    // 旋转基础分值
    static readonly SPIN_VALUES: Map<string, number> = new Map([
        ['USp1', 1.5], ['USp2', 2.5], ['USp3', 3.0], ['USp4', 3.5],
        ['SSp1', 1.7], ['SSp2', 2.7], ['SSp3', 3.2], ['SSp4', 3.7],
        ['CSp1', 1.6], ['CSp2', 2.6], ['CSp3', 3.1], ['CSp4', 3.6],
        ['LSp1', 1.7], ['LSp2', 2.7], ['LSp3', 3.3], ['LSp4', 3.8],
        ['CCSp1', 2.0], ['CCSp2', 3.0], ['CCSp3', 3.5], ['CCSp4', 4.0]
    ]);
    // 步法基础分值
    static readonly STEP_VALUES: Map<string, number> = new Map([
        ['StSq1', 1.5], ['StSq2', 2.5], ['StSq3', 3.25], ['StSq4', 3.9]
    ]);
}
