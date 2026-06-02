/*
 * 花样滑冰解谜游戏 - 排行榜管理
 * Copyright (c) 2024
 */

import { LeaderboardEntry, MedalType } from '../../viewmodel/PuzzleGameModel';
import preferences from '@ohos.data.preferences';

// 排行榜管理器
export class LeaderboardManager {
  private static readonly LEADERBOARD_KEY = 'puzzle_game_leaderboard';
  private static readonly MAX_ENTRIES = 100;
  
  // 获取排行榜
  static async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      // 模拟数据（实际应从服务器或本地存储获取）
      const mockData: LeaderboardEntry[] = [
        new LeaderboardEntry('滑冰达人', 950, MedalType.GOLD, 120, '2024-01-15'),
        new LeaderboardEntry('冰上精灵', 920, MedalType.GOLD, 135, '2024-01-15'),
        new LeaderboardEntry('旋转大师', 890, MedalType.SILVER, 150, '2024-01-15'),
        new LeaderboardEntry('跳跃高手', 850, MedalType.SILVER, 165, '2024-01-15'),
        new LeaderboardEntry('花样玩家', 800, MedalType.BRONZE, 180, '2024-01-15'),
        new LeaderboardEntry('新手滑手', 750, MedalType.BRONZE, 200, '2024-01-15'),
      ];
      
      return mockData.sort((a, b) => b.score - a.score);
    } catch (error) {
      console.error('获取排行榜失败:', error);
      return [];
    }
  }
  
  // 提交分数
  static async submitScore(entry: LeaderboardEntry): Promise<boolean> {
    try {
      // 模拟提交（实际应提交到服务器）
      console.log('提交分数:', entry);
      return true;
    } catch (error) {
      console.error('提交分数失败:', error);
      return false;
    }
  }
  
  // 获取玩家排名
  static async getPlayerRank(score: number): Promise<number> {
    const leaderboard = await LeaderboardManager.getLeaderboard();
    let rank = 1;
    for (const entry of leaderboard) {
      if (score < entry.score) {
        rank++;
      } else {
        break;
      }
    }
    return rank;
  }
  
  // 获取今日挑战种子
  static getDailySeed(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // 检查今日是否已完成
  static async hasCompletedToday(): Promise<boolean> {
    try {
      const seed = LeaderboardManager.getDailySeed();
      // 模拟检查（实际应从本地存储检查）
      return false;
    } catch (error) {
      return false;
    }
  }
}
