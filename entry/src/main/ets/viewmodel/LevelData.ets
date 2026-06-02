/*
 * 花样滑冰解谜游戏 - 关卡数据
 * 从简单到困难的多个关卡
 */

import { Medal, MedalType, ActionCard, ActionType, TargetPattern } from './PuzzleGameModel';
import { GameLevel, LevelDifficulty } from './LevelModel';

// 辅助函数：创建奖牌数组
function createMedals(types: MedalType[]): Medal[] {
  return types.map((type, index) => new Medal(type, index.toString()));
}

// 辅助函数：创建动作卡牌
function createCard(type: ActionType, name: string, desc: string, diff: number, icon: string): ActionCard {
  return new ActionCard(type, name, desc, diff, icon);
}

// 辅助函数：创建目标图案
function createTarget(positions: number[], medals: MedalType[], desc: string): TargetPattern {
  return new TargetPattern(positions, medals, desc);
}

// ==================== 关卡定义 ====================

// 第1关：教程关 - 单个目标
export const LEVEL_1_TUTORIAL: GameLevel = new GameLevel(
  1,
  '初识冰场',
  '学习基本操作，完成第一行金牌目标',
  LevelDifficulty.TUTORIAL,
  3,
  createMedals([
    MedalType.GOLD, MedalType.SILVER, MedalType.BRONZE,
    MedalType.SILVER, MedalType.GOLD, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.SILVER, MedalType.GOLD
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 1, 2], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '第一行全是金牌')
  ],
  5,
  0,
  [5, 3, 2]
);

// 第2关：简单 - 双目标
export const LEVEL_2_EASY: GameLevel = new GameLevel(
  2,
  '冰上漫步',
  '完成两个目标图案',
  LevelDifficulty.EASY,
  3,
  createMedals([
    MedalType.SILVER, MedalType.GOLD, MedalType.SILVER,
    MedalType.BRONZE, MedalType.SILVER, MedalType.BRONZE,
    MedalType.GOLD, MedalType.BRONZE, MedalType.GOLD
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 2], [MedalType.GOLD, MedalType.GOLD], '对角线金牌'),
    createTarget([3, 4, 5], [MedalType.SILVER, MedalType.SILVER, MedalType.SILVER], '中间行银牌')
  ],
  6,
  0,
  [6, 4, 3]
);

// 第3关：简单 - 中心目标
export const LEVEL_3_EASY: GameLevel = new GameLevel(
  3,
  '旋转练习',
  '围绕中心完成目标',
  LevelDifficulty.EASY,
  3,
  createMedals([
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.GOLD, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 1, 2, 3, 5, 6, 7, 8], 
      [MedalType.SILVER, MedalType.SILVER, MedalType.SILVER, 
       MedalType.SILVER, MedalType.SILVER, MedalType.SILVER,
       MedalType.SILVER, MedalType.SILVER], 
      '周围全是银牌')
  ],
  7,
  0,
  [7, 5, 4]
);

// 第4关：普通 - 三目标
export const LEVEL_4_NORMAL: GameLevel = new GameLevel(
  4,
  '花样初成',
  '完成三个目标图案',
  LevelDifficulty.NORMAL,
  3,
  createMedals([
    MedalType.BRONZE, MedalType.SILVER, MedalType.GOLD,
    MedalType.GOLD, MedalType.BRONZE, MedalType.SILVER,
    MedalType.SILVER, MedalType.GOLD, MedalType.BRONZE
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 3, 6], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '第一列金牌'),
    createTarget([1, 4, 7], [MedalType.SILVER, MedalType.SILVER, MedalType.SILVER], '第二列银牌'),
    createTarget([2, 5, 8], [MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE], '第三列铜牌')
  ],
  8,
  120,
  [8, 6, 5]
);

// 第5关：普通 - 时间限制
export const LEVEL_5_NORMAL: GameLevel = new GameLevel(
  5,
  '计时挑战',
  '在限定时间内完成目标',
  LevelDifficulty.NORMAL,
  3,
  createMedals([
    MedalType.SILVER, MedalType.GOLD, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.SILVER, MedalType.GOLD,
    MedalType.GOLD, MedalType.BRONZE, MedalType.SILVER
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 4, 8], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '主对角线金牌'),
    createTarget([2, 4, 6], [MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE], '副对角线铜牌')
  ],
  6,
  90,
  [6, 4, 3]
);

// 第6关：困难 - 复杂目标
export const LEVEL_6_HARD: GameLevel = new GameLevel(
  6,
  '冰上芭蕾',
  '完成复杂的图案组合',
  LevelDifficulty.HARD,
  3,
  createMedals([
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 1, 2], [MedalType.GOLD, MedalType.SILVER, MedalType.BRONZE], '第一行奖牌序列'),
    createTarget([3, 4, 5], [MedalType.BRONZE, MedalType.GOLD, MedalType.SILVER], '第二行奖牌序列'),
    createTarget([6, 7, 8], [MedalType.SILVER, MedalType.BRONZE, MedalType.GOLD], '第三行奖牌序列')
  ],
  10,
  150,
  [10, 7, 5]
);

// 第7关：困难 - 限制步数
export const LEVEL_7_HARD: GameLevel = new GameLevel(
  7,
  '精准表演',
  '用最少的步数完成目标',
  LevelDifficulty.HARD,
  3,
  createMedals([
    MedalType.GOLD, MedalType.BRONZE, MedalType.SILVER,
    MedalType.SILVER, MedalType.GOLD, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.SILVER, MedalType.GOLD
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 1, 2, 3, 4, 5, 6, 7, 8], 
      [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD,
       MedalType.GOLD, MedalType.GOLD, MedalType.GOLD,
       MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], 
      '全场金牌')
  ],
  5,
  0,
  [5, 4, 3]
);

// 第8关：专家 - 多目标复杂
export const LEVEL_8_EXPERT: GameLevel = new GameLevel(
  8,
  '三周跳',
  '完成高难度动作组合',
  LevelDifficulty.EXPERT,
  3,
  createMedals([
    MedalType.SILVER, MedalType.BRONZE, MedalType.GOLD,
    MedalType.GOLD, MedalType.SILVER, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.GOLD, MedalType.SILVER
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 1, 2], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '第一行金牌'),
    createTarget([3, 4, 5], [MedalType.SILVER, MedalType.SILVER, MedalType.SILVER], '第二行银牌'),
    createTarget([6, 7, 8], [MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE], '第三行铜牌'),
    createTarget([0, 4, 8], [MedalType.GOLD, MedalType.SILVER, MedalType.BRONZE], '对角线序列')
  ],
  8,
  120,
  [8, 6, 5]
);

// 第9关：专家 - 时间紧迫
export const LEVEL_9_EXPERT: GameLevel = new GameLevel(
  9,
  '自由滑',
  '在短时间内完成所有目标',
  LevelDifficulty.EXPERT,
  3,
  createMedals([
    MedalType.BRONZE, MedalType.GOLD, MedalType.SILVER,
    MedalType.GOLD, MedalType.BRONZE, MedalType.GOLD,
    MedalType.SILVER, MedalType.GOLD, MedalType.BRONZE
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 4, 8], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '主对角线'),
    createTarget([2, 4, 6], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '副对角线'),
    createTarget([1, 3, 5, 7], [MedalType.SILVER, MedalType.SILVER, MedalType.SILVER, MedalType.SILVER], '四边银牌')
  ],
  7,
  60,
  [7, 5, 4]
);

// 第10关：大师 - 终极挑战
export const LEVEL_10_MASTER: GameLevel = new GameLevel(
  10,
  '奥运冠军',
  '完成终极挑战，成为冠军！',
  LevelDifficulty.MASTER,
  3,
  createMedals([
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE,
    MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE
  ]),
  [
    createCard(ActionType.SPIN, '旋转', '翻转一列奖牌', 1, '🔄'),
    createCard(ActionType.JUMP, '跳跃', '交换两个奖牌', 2, '🦘'),
    createCard(ActionType.POSE, '姿态', '改变单个奖牌', 1, '💃')
  ],
  [
    createTarget([0, 1, 2], [MedalType.GOLD, MedalType.SILVER, MedalType.BRONZE], '第一行序列'),
    createTarget([3, 4, 5], [MedalType.BRONZE, MedalType.GOLD, MedalType.SILVER], '第二行序列'),
    createTarget([6, 7, 8], [MedalType.SILVER, MedalType.BRONZE, MedalType.GOLD], '第三行序列'),
    createTarget([0, 4, 8], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '主对角线金牌'),
    createTarget([2, 4, 6], [MedalType.BRONZE, MedalType.BRONZE, MedalType.BRONZE], '副对角线铜牌')
  ],
  6,
  90,
  [6, 5, 4]
);

// 所有关卡列表
export const ALL_LEVELS: GameLevel[] = [
  LEVEL_1_TUTORIAL,
  LEVEL_2_EASY,
  LEVEL_3_EASY,
  LEVEL_4_NORMAL,
  LEVEL_5_NORMAL,
  LEVEL_6_HARD,
  LEVEL_7_HARD,
  LEVEL_8_EXPERT,
  LEVEL_9_EXPERT,
  LEVEL_10_MASTER
];

// 获取关卡
export function getLevelById(id: number): GameLevel | null {
  return ALL_LEVELS.find(level => level.id === id) || null;
}

// 获取指定难度的关卡
export function getLevelsByDifficulty(difficulty: LevelDifficulty): GameLevel[] {
  return ALL_LEVELS.filter(level => level.difficulty === difficulty);
}
