/*
 * 花样滑冰解谜游戏 - 关卡模型
 * Copyright (c) 2024
 */

import { Medal, MedalType, ActionCard, ActionType, TargetPattern } from './PuzzleGameModel';

// 关卡难度
export enum LevelDifficulty {
  TUTORIAL = 0,    // 教程
  EASY = 1,        // 简单
  NORMAL = 2,      // 普通
  HARD = 3,        // 困难
  EXPERT = 4,      // 专家
  MASTER = 5       // 大师
}

// 关卡状态
export enum LevelStatus {
  LOCKED = 0,      // 未解锁
  UNLOCKED = 1,    // 已解锁
  COMPLETED = 2,   // 已完成
  PERFECT = 3      // 完美通关
}

// 关卡定义
export class GameLevel {
  id: number;
  name: string;
  description: string;
  difficulty: LevelDifficulty;
  boardSize: number;           // 棋盘大小 (3 = 3x3)
  initialBoard: Medal[];       // 初始棋盘
  handCards: ActionCard[];     // 手牌
  targets: TargetPattern[];    // 目标图案
  maxMoves: number;            // 最大步数
  timeLimit: number;           // 时间限制(秒), 0表示无限制
  starRequirements: number[];  // 星星要求 [1星, 2星, 3星]步数
  
  constructor(
    id: number,
    name: string,
    description: string,
    difficulty: LevelDifficulty,
    boardSize: number,
    initialBoard: Medal[],
    handCards: ActionCard[],
    targets: TargetPattern[],
    maxMoves: number,
    timeLimit: number,
    starRequirements: number[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
    this.boardSize = boardSize;
    this.initialBoard = initialBoard;
    this.handCards = handCards;
    this.targets = targets;
    this.maxMoves = maxMoves;
    this.timeLimit = timeLimit;
    this.starRequirements = starRequirements;
  }
  
  getDifficultyName(): string {
    switch (this.difficulty) {
      case LevelDifficulty.TUTORIAL: return '教程';
      case LevelDifficulty.EASY: return '简单';
      case LevelDifficulty.NORMAL: return '普通';
      case LevelDifficulty.HARD: return '困难';
      case LevelDifficulty.EXPERT: return '专家';
      case LevelDifficulty.MASTER: return '大师';
      default: return '未知';
    }
  }
  
  getDifficultyColor(): string {
    switch (this.difficulty) {
      case LevelDifficulty.TUTORIAL: return '#4CAF50';
      case LevelDifficulty.EASY: return '#8BC34A';
      case LevelDifficulty.NORMAL: return '#FFC107';
      case LevelDifficulty.HARD: return '#FF9800';
      case LevelDifficulty.EXPERT: return '#F44336';
      case LevelDifficulty.MASTER: return '#9C27B0';
      default: return '#9E9E9E';
    }
  }
}

// 关卡进度
export class LevelProgress {
  levelId: number;
  status: LevelStatus;
  bestMoves: number;
  bestTime: number;
  stars: number;
  completedAt: string;
  
  constructor(levelId: number) {
    this.levelId = levelId;
    this.status = LevelStatus.LOCKED;
    this.bestMoves = 999;
    this.bestTime = 999;
    this.stars = 0;
    this.completedAt = '';
  }
}
