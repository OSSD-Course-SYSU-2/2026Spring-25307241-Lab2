/*
 * 花样滑冰解谜游戏 - 游戏引擎
 * Copyright (c) 2024
 */

import {
  Medal, MedalType, ActionType, ActionCard,
  TargetPattern, GameMode, GameState,
  PlayerScore, GameConfig
} from '../../viewmodel/PuzzleGameModel';

// 游戏引擎
export class PuzzleGameEngine {
  // 棋盘状态（3x3 = 9个格子）
  private board: Medal[] = [];
  
  // 当前手牌
  private handCards: ActionCard[] = [];
  
  // 目标图案列表
  private targetPatterns: TargetPattern[] = [];
  
  // 当前需要完成的目标索引
  private currentTargetIndex: number = 0;
  
  // 游戏状态
  private gameState: GameState = GameState.READY;
  
  // 玩家成绩
  private playerScore: PlayerScore = new PlayerScore();
  
  // 游戏配置
  private config: GameConfig = new GameConfig();
  
  // 游戏模式
  private gameMode: GameMode = GameMode.CLASSIC;
  
  // 开始时间
  private startTime: number = 0;
  
  // 所有可用的动作卡牌（15种）
  private allActionCards: ActionCard[] = [
    new ActionCard(ActionType.SPIN, '旋转', '翻转整列/整堆奖牌', 2, '🔄'),
    new ActionCard(ActionType.JUMP, '跳跃', '交换棋盘上两堆奖牌', 3, '🦘'),
    new ActionCard(ActionType.POSE, '姿态', '把相邻奖牌堆叠到目标格', 2, '💃'),
    new ActionCard(ActionType.PIROUETTE, '捻转', '交换侧边和匹配奖牌', 4, '🎀'),
    new ActionCard(ActionType.AXEL, '阿克塞尔', '高级跳跃动作', 5, '⭐'),
    new ActionCard(ActionType.LUTZ, '勾手跳', '难度跳跃动作', 4, '🌟'),
    new ActionCard(ActionType.FLIP, '后内点冰', '点冰跳跃动作', 3, '✨'),
    new ActionCard(ActionType.LOOP, '后外结环', '结环跳跃动作', 3, '💫'),
    new ActionCard(ActionType.SALCHOW, '后内结环', '内结环跳跃', 3, '🔥'),
    new ActionCard(ActionType.TOE_LOOP, '后外点冰', '点冰跳跃基础', 2, '❄️'),
    new ActionCard(ActionType.CAMEL, '骆驼旋转', '蹲旋转动作', 2, '🐪'),
    new ActionCard(ActionType.SIT, '蹲旋转', '蹲姿旋转动作', 2, '🦵'),
    new ActionCard(ActionType.UPRIGHT, '直立旋转', '直立旋转动作', 1, '🧍'),
    new ActionCard(ActionType.SPIRAL, '螺旋线', '螺旋线动作', 3, '🌀'),
    new ActionCard(ActionType.STEP, '接续步', '步伐连接动作', 1, '👣')
  ];

  // 初始化游戏
  initializeGame(mode: GameMode, config?: GameConfig): void {
    this.gameMode = mode;
    if (config) {
      this.config = config;
    }
    
    // 初始化棋盘
    this.initializeBoard();
    
    // 生成目标图案
    this.generateTargetPatterns();
    
    // 发放初始手牌
    this.dealCards(5);
    
    // 重置游戏状态
    this.gameState = GameState.READY;
    this.currentTargetIndex = 0;
    this.playerScore = new PlayerScore();
    this.startTime = Date.now();
  }

  // 初始化3x3棋盘
  private initializeBoard(): void {
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push(new Medal(Medal.random(), `medal_${i}`));
    }
  }

  // 生成目标图案（6组）
  private generateTargetPatterns(): void {
    this.targetPatterns = [];
    
    for (let i = 0; i < this.config.totalPatterns; i++) {
      const pattern = this.generateRandomPattern();
      this.targetPatterns.push(pattern);
    }
  }

  // 生成随机目标图案
  private generateRandomPattern(): TargetPattern {
    // 随机选择一行、一列或对角线
    const patternTypes = ['row', 'column', 'diagonal'];
    const type = patternTypes[Math.floor(Math.random() * patternTypes.length)];
    
    let positions: number[] = [];
    let description = '';
    
    switch (type) {
      case 'row':
        const row = Math.floor(Math.random() * 3);
        positions = [row * 3, row * 3 + 1, row * 3 + 2];
        description = `第${row + 1}行`;
        break;
      case 'column':
        const col = Math.floor(Math.random() * 3);
        positions = [col, col + 3, col + 6];
        description = `第${col + 1}列`;
        break;
      case 'diagonal':
        if (Math.random() > 0.5) {
          positions = [0, 4, 8];
          description = '主对角线';
        } else {
          positions = [2, 4, 6];
          description = '副对角线';
        }
        break;
    }
    
    // 随机生成需要的奖牌组合
    const medals: MedalType[] = [];
    for (let i = 0; i < 3; i++) {
      medals.push(Medal.random());
    }
    
    return new TargetPattern(positions, medals, description);
  }

  // 发放动作卡牌
  private dealCards(count: number): void {
    this.handCards = [];
    const shuffled = [...this.allActionCards].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      this.handCards.push(shuffled[i]);
    }
  }

  // 开始游戏
  startGame(): void {
    if (this.gameState === GameState.READY) {
      this.gameState = GameState.PLAYING;
      this.startTime = Date.now();
    }
  }

  // 执行动作卡牌
  executeAction(cardIndex: number, params: ESObject): boolean {
    if (this.gameState !== GameState.PLAYING) {
      return false;
    }
    
    if (cardIndex < 0 || cardIndex >= this.handCards.length) {
      return false;
    }
    
    const card = this.handCards[cardIndex];
    let success = false;
    
    try {
      switch (card.type) {
        case ActionType.SPIN:
          success = this.executeSpin(params['column'] as number);
          break;
        case ActionType.JUMP:
          success = this.executeJump(params['pos1'] as number, params['pos2'] as number);
          break;
        case ActionType.POSE:
          success = this.executePose(params['from'] as number, params['to'] as number);
          break;
        case ActionType.PIROUETTE:
          success = this.executePirouette(params['side'] as number, params['target'] as number);
          break;
        case ActionType.AXEL:
          success = this.executeAxel(params['pos'] as number);
          break;
        case ActionType.LUTZ:
          success = this.executeLutz(params['pos'] as number);
          break;
        case ActionType.FLIP:
          success = this.executeFlip(params['pos'] as number);
          break;
        case ActionType.LOOP:
          success = this.executeLoop(params['pos'] as number);
          break;
        case ActionType.SALCHOW:
          success = this.executeSalchow(params['pos'] as number);
          break;
        case ActionType.TOE_LOOP:
          success = this.executeToeLoop(params['pos'] as number);
          break;
        case ActionType.CAMEL:
          success = this.executeCamel(params['pos'] as number);
          break;
        case ActionType.SIT:
          success = this.executeSit(params['pos'] as number);
          break;
        case ActionType.UPRIGHT:
          success = this.executeUpright(params['pos'] as number);
          break;
        case ActionType.SPIRAL:
          success = this.executeSpiral(params['pos'] as number);
          break;
        case ActionType.STEP:
          success = this.executeStep(params['pos'] as number);
          break;
      }
      
      if (success) {
        // 移除使用的卡牌
        this.handCards.splice(cardIndex, 1);
        this.playerScore.moves++;
        
        // 检查是否完成当前目标
        this.checkPatternCompletion();
        
        // 补充手牌
        if (this.handCards.length < 3) {
          this.dealCards(5 - this.handCards.length);
        }
      }
    } catch (error) {
      success = false;
      this.playerScore.mistakes++;
    }
    
    return success;
  }

  // Spin动作：翻转整列
  private executeSpin(column: number): boolean {
    if (column === undefined) {
      column = Math.floor(Math.random() * 3);
    }
    
    if (column < 0 || column > 2) return false;
    
    // 翻转该列的奖牌顺序
    const temp = this.board[column];
    this.board[column] = this.board[column + 6];
    this.board[column + 6] = temp;
    
    const temp2 = this.board[column + 3];
    this.board[column + 3] = this.board[column + 6];
    this.board[column + 6] = temp2;
    
    return true;
  }

  // Jump动作：交换两堆奖牌
  private executeJump(pos1: number, pos2: number): boolean {
    if (pos1 === undefined || pos2 === undefined) {
      // 随机选择两个位置
      pos1 = Math.floor(Math.random() * 9);
      do {
        pos2 = Math.floor(Math.random() * 9);
      } while (pos2 === pos1);
    }
    
    if (pos1 < 0 || pos1 > 8 || pos2 < 0 || pos2 > 8) return false;
    
    const temp = this.board[pos1];
    this.board[pos1] = this.board[pos2];
    this.board[pos2] = temp;
    
    return true;
  }

  // Pose动作：堆叠相邻奖牌
  private executePose(from: number, to: number): boolean {
    if (from === undefined || to === undefined) {
      // 随机选择相邻位置
      from = Math.floor(Math.random() * 9);
      const neighbors = this.getNeighbors(from);
      to = neighbors[Math.floor(Math.random() * neighbors.length)];
    }
    
    if (!this.areAdjacent(from, to)) return false;
    
    // 交换相邻位置
    const temp = this.board[from];
    this.board[from] = this.board[to];
    this.board[to] = temp;
    
    return true;
  }

  // Pirouette动作：交换侧边和匹配奖牌
  private executePirouette(side: number, target: number): boolean {
    // 简化实现：随机交换两个位置
    return this.executeJump(side, target);
  }

  // 其他动作的简化实现
  private executeAxel(pos: number): boolean {
    const pos2 = Math.floor(Math.random() * 9);
    return this.executeJump(pos, pos2);
  }

  private executeLutz(pos: number): boolean {
    return this.executeSpin(pos % 3);
  }

  private executeFlip(pos: number): boolean {
    const pos2 = Math.floor(Math.random() * 9);
    return this.executeJump(pos, pos2);
  }

  private executeLoop(pos: number): boolean {
    return this.executeSpin(pos % 3);
  }

  private executeSalchow(pos: number): boolean {
    const pos2 = Math.floor(Math.random() * 9);
    return this.executeJump(pos, pos2);
  }

  private executeToeLoop(pos: number): boolean {
    return this.executeSpin(pos % 3);
  }

  private executeCamel(pos: number): boolean {
    return this.executeSpin(pos % 3);
  }

  private executeSit(pos: number): boolean {
    return this.executeSpin(pos % 3);
  }

  private executeUpright(pos: number): boolean {
    return this.executeSpin(pos % 3);
  }

  private executeSpiral(pos: number): boolean {
    const pos2 = Math.floor(Math.random() * 9);
    return this.executeJump(pos, pos2);
  }

  private executeStep(pos: number): boolean {
    const pos2 = Math.floor(Math.random() * 9);
    return this.executeJump(pos, pos2);
  }

  // 获取相邻位置
  private getNeighbors(pos: number): number[] {
    const neighbors: number[] = [];
    const row = Math.floor(pos / 3);
    const col = pos % 3;
    
    if (row > 0) neighbors.push(pos - 3); // 上
    if (row < 2) neighbors.push(pos + 3); // 下
    if (col > 0) neighbors.push(pos - 1); // 左
    if (col < 2) neighbors.push(pos + 1); // 右
    
    return neighbors;
  }

  // 判断两个位置是否相邻
  private areAdjacent(pos1: number, pos2: number): boolean {
    return this.getNeighbors(pos1).includes(pos2);
  }

  // 检查图案完成
  private checkPatternCompletion(): void {
    if (this.currentTargetIndex >= this.targetPatterns.length) {
      return;
    }
    
    const target = this.targetPatterns[this.currentTargetIndex];
    let completed = true;
    
    for (let i = 0; i < target.positions.length; i++) {
      const pos = target.positions[i];
      if (this.board[pos].type !== target.requiredMedals[i]) {
        completed = false;
        break;
      }
    }
    
    if (completed) {
      this.currentTargetIndex++;
      this.playerScore.patternsCompleted++;
      
      // 检查是否全部完成
      if (this.currentTargetIndex >= this.targetPatterns.length) {
        this.completeGame();
      }
    }
  }

  // 完成游戏
  private completeGame(): void {
    this.gameState = GameState.COMPLETED;
    this.playerScore.time = Math.floor((Date.now() - this.startTime) / 1000);
    this.calculateScore();
  }

  // 计算分数
  private calculateScore(): void {
    // 基础分 = 完成图案数 * 100
    let score = this.playerScore.patternsCompleted * 100;
    
    // 时间奖励
    const timeBonus = Math.max(0, 300 - this.playerScore.time);
    score += timeBonus;
    
    // 失误惩罚
    score -= this.playerScore.mistakes * 20;
    
    // 移动效率奖励
    const efficiency = this.playerScore.patternsCompleted / Math.max(1, this.playerScore.moves);
    score += Math.floor(efficiency * 50);
    
    this.playerScore.score = Math.max(0, score);
    
    // 确定奖牌
    if (this.playerScore.mistakes === 0) {
      this.playerScore.medal = MedalType.GOLD;
    } else if (this.playerScore.mistakes === 1) {
      this.playerScore.medal = MedalType.SILVER;
    } else {
      this.playerScore.medal = MedalType.BRONZE;
    }
  }

  // 获取棋盘状态
  getBoard(): Medal[] {
    return [...this.board];
  }

  // 获取手牌
  getHandCards(): ActionCard[] {
    return [...this.handCards];
  }

  // 获取当前目标
  getCurrentTarget(): TargetPattern | null {
    if (this.currentTargetIndex < this.targetPatterns.length) {
      return this.targetPatterns[this.currentTargetIndex];
    }
    return null;
  }

  // 获取所有目标
  getAllTargets(): TargetPattern[] {
    return [...this.targetPatterns];
  }

  // 获取游戏状态
  getGameState(): GameState {
    return this.gameState;
  }

  // 获取玩家成绩
  getPlayerScore(): PlayerScore {
    return this.playerScore;
  }

  // 获取游戏模式
  getGameMode(): GameMode {
    return this.gameMode;
  }

  // 暂停游戏
  pauseGame(): void {
    if (this.gameState === GameState.PLAYING) {
      this.gameState = GameState.PAUSED;
    }
  }

  // 恢复游戏
  resumeGame(): void {
    if (this.gameState === GameState.PAUSED) {
      this.gameState = GameState.PLAYING;
    }
  }

  // 重新开始
  restartGame(): void {
    this.initializeGame(this.gameMode, this.config);
  }

  // 生成每日挑战种子
  static getDailySeed(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
