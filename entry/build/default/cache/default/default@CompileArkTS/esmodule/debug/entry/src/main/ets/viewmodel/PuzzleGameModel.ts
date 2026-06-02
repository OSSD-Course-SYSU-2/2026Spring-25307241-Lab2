/*
 * 花样滑冰解谜游戏 - 数据模型
 * Copyright (c) 2024
 */
// 奖牌类型
export enum MedalType {
    GOLD = "Gold",
    SILVER = "Silver",
    BRONZE = "Bronze" // 铜牌
}
// 奖牌类
export class Medal {
    type: MedalType;
    id: string;
    constructor(type: MedalType, id: string) {
        this.type = type;
        this.id = id;
    }
    static random(): MedalType {
        const types = [MedalType.GOLD, MedalType.SILVER, MedalType.BRONZE];
        return types[Math.floor(Math.random() * types.length)];
    }
}
// 动作卡牌类型（15种花样滑冰动作）
export enum ActionType {
    // 4个核心动作
    SPIN = "Spin",
    JUMP = "Jump",
    POSE = "Pose",
    PIROUETTE = "Pirouette",
    // 其他动作
    AXEL = "Axel",
    LUTZ = "Lutz",
    FLIP = "Flip",
    LOOP = "Loop",
    SALCHOW = "Salchow",
    TOE_LOOP = "ToeLoop",
    CAMEL = "Camel",
    SIT = "Sit",
    UPRIGHT = "Upright",
    SPIRAL = "Spiral",
    STEP = "Step" // 接续步
}
// 动作卡牌
export class ActionCard {
    type: ActionType;
    name: string;
    description: string;
    difficulty: number; // 难度系数 1-5
    icon: string; // emoji图标
    constructor(type: ActionType, name: string, description: string, difficulty: number, icon: string) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.icon = icon;
    }
}
// 目标图案（需要凑出的奖牌组合）
export class TargetPattern {
    positions: number[]; // 位置索引 [0-8]
    requiredMedals: MedalType[]; // 需要的奖牌类型
    description: string;
    constructor(positions: number[], requiredMedals: MedalType[], description: string) {
        this.positions = positions;
        this.requiredMedals = requiredMedals;
        this.description = description;
    }
}
// 游戏模式
export enum GameMode {
    CLASSIC = "Classic",
    DAILY = "Daily" // 每日挑战
}
// 游戏状态
export enum GameState {
    READY = "Ready",
    PLAYING = "Playing",
    PAUSED = "Paused",
    COMPLETED = "Completed",
    FAILED = "Failed" // 失败
}
// 玩家成绩
export class PlayerScore {
    medal: MedalType;
    mistakes: number; // 失误次数
    moves: number; // 总移动次数
    time: number; // 用时（秒）
    patternsCompleted: number; // 完成的图案数
    score: number; // 总分
    constructor() {
        this.medal = MedalType.BRONZE;
        this.mistakes = 0;
        this.moves = 0;
        this.time = 0;
        this.patternsCompleted = 0;
        this.score = 0;
    }
}
// 排行榜条目
export class LeaderboardEntry {
    playerName: string;
    score: number;
    medal: MedalType;
    time: number;
    date: string;
    constructor(playerName: string, score: number, medal: MedalType, time: number, date: string) {
        this.playerName = playerName;
        this.score = score;
        this.medal = medal;
        this.time = time;
        this.date = date;
    }
}
// 游戏配置
export class GameConfig {
    boardSize: number; // 棋盘大小（默认3）
    totalPatterns: number; // 需要完成的图案数（默认6）
    maxMistakes: number; // 最大失误次数（默认3）
    timeLimit: number; // 时间限制（秒，0表示无限制）
    constructor() {
        this.boardSize = 3;
        this.totalPatterns = 6;
        this.maxMistakes = 3;
        this.timeLimit = 0;
    }
}
