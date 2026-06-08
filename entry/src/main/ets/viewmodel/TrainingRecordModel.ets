/**
 * 冰迹·EdgeFlow - 训练记录数据模型
 * 包含训练记录、动作掌握度、勋章等数据结构
 */

// 动作类型
export type MoveCategory = 'JUMP' | 'SPIN' | 'STEP' | 'OTHER';

// 疲劳度定义：步法=1，旋转=3，跳跃=7
export const FATIGUE_LEVELS: Record<MoveCategory, number> = {
  'JUMP': 7,    // 跳跃最累
  'SPIN': 3,    // 旋转中等
  'STEP': 1,    // 步法最轻
  'OTHER': 2    // 其他
};

// 训练记录
export interface TrainingRecord {
  id: string;
  date: string;              // 训练日期 YYYY-MM-DD
  startTime: string;         // 开始时间 HH:mm
  duration: number;          // 持续时长（秒）
  moves: string[];           // 练习的动作
  fatigueLevel: number;      // 疲劳度（自动计算：步法=1，旋转=3，跳跃=7）
  notes?: string;            // 备注
  calories?: number;         // 消耗卡路里
}

// 动作练习记录
export interface MovePracticeRecord {
  moveId: string;            // 动作ID
  moveName: string;          // 动作名称
  date: string;              // 练习日期
  duration: number;          // 练习时长
  fatigueLevel: number;      // 当时疲劳度
  notes?: string;            // 备注
  quality?: number;          // 自评质量 1-5
}

// 动作掌握度
export interface MoveMastery {
  moveId: string;
  moveName: string;
  level: 'S' | 'A' | 'B' | 'C' | 'D';  // 掌握等级
  practiceCount: number;               // 练习次数
  totalDuration: number;               // 累计时长
  avgFatigue: number;                  // 平均疲劳度
  qualityScore: number;                // 质量评分（考虑疲劳度加权）
  lastPracticeDate: string;            // 最近练习日期
  records: MovePracticeRecord[];       // 练习记录时间轴
}

// 勋章类型
export type MedalType = 'LABOR' | 'TECHNICAL';  // 劳模轨 | 技术轨

// 勋章定义
export interface MedalDefinition {
  id: string;
  name: string;
  icon: string;
  type: MedalType;
  description: string;
  requirement: number;       // 达成要求
  unit: string;              // 单位（小时/次数）
  levels: MedalLevel[];      // 等级（青铜/白银/黄金）
}

// 勋章等级
export interface MedalLevel {
  level: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  name: string;
  threshold: number;         // 达成阈值
  unlocked: boolean;
  unlockedDate?: string;
}

// 用户勋章
export interface UserMedal {
  definitionId: string;
  currentProgress: number;
  currentLevel: MedalLevel;
  unlockedLevels: MedalLevel[];
}

// 装备信息
export interface Equipment {
  id: string;
  type: 'SKATES' | 'BLADES' | 'ACCESSORY';  // 冰鞋/冰刀/配件
  name: string;
  brand: string;
  purchaseDate: string;
  sharpenDate?: string;       // 开刃日期
  usageHours: number;         // 使用时长
  maxHours: number;           // 建议使用时长
  sharpenReminder?: boolean;  // 磨刀提醒
  notes?: string;
}

// 训练歌单
export interface TrainingPlaylist {
  id: string;
  name: string;
  programType: 'SP' | 'FS';   // 短节目/自由滑
  songs: Song[];
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  bpm: number;                // 节拍
  duration: number;           // 时长
  moveAssociations: string[]; // 关联动作
}

// 冰友动态
export interface IceFriendActivity {
  id: string;
  city: string;
  moveName: string;           // 正在练的动作
  message: string;            // 留言
  time: string;
  isAnonymous: boolean;
}

// 月度报告数据
export interface MonthlyReport {
  month: string;
  totalHours: number;
  jumpCount: number;
  spinDuration: number;
  stepDiversity: number;      // 步法多样性
  attendanceRate: number;     // 出勤率
  radarData: RadarDataPoint[];
  motivationalText: string;
}

export interface RadarDataPoint {
  dimension: string;
  value: number;
  maxValue: number;
}

// ==================== 示例数据 ====================

export const SAMPLE_TRAINING_RECORDS: TrainingRecord[] = [
  {
    id: 'tr_001',
    date: '2024-03-15',
    startTime: '14:00',
    duration: 5400,  // 90分钟
    moves: ['2A', '3T', '3T+3T', 'USp', 'StSq'],
    fatigueLevel: 6,
    notes: '状态不错，3T成功率提高',
    calories: 450
  },
  {
    id: 'tr_002',
    date: '2024-03-14',
    startTime: '10:00',
    duration: 7200,  // 120分钟
    moves: ['1A', '2A', '3S', 'SSp', 'CiSt'],
    fatigueLevel: 8,
    notes: '有点累，但坚持完成了',
    calories: 580
  }
];

export const SAMPLE_MOVE_MASTERIES: MoveMastery[] = [
  {
    moveId: '2A',
    moveName: '两周半跳',
    level: 'B',
    practiceCount: 156,
    totalDuration: 4680,
    avgFatigue: 5.2,
    qualityScore: 72,
    lastPracticeDate: '2024-03-15',
    records: [
      { moveId: '2A', moveName: '两周半跳', date: '2024-03-15', duration: 30, fatigueLevel: 6, quality: 4 },
      { moveId: '2A', moveName: '两周半跳', date: '2024-03-14', duration: 25, fatigueLevel: 8, quality: 3 },
      { moveId: '2A', moveName: '两周半跳', date: '2024-03-12', duration: 35, fatigueLevel: 5, quality: 4 }
    ]
  },
  {
    moveId: '3T',
    moveName: '三周跳',
    level: 'A',
    practiceCount: 245,
    totalDuration: 7350,
    avgFatigue: 5.8,
    qualityScore: 85,
    lastPracticeDate: '2024-03-15',
    records: []
  }
];

export const MEDAL_DEFINITIONS: MedalDefinition[] = [
  {
    id: 'ice_perpetual',
    name: '冰上永动机',
    icon: '⚡',
    type: 'LABOR',
    description: '累计冰时达标解锁',
    requirement: 100,
    unit: '小时',
    levels: [
      { level: 'BRONZE', name: '青铜', threshold: 10, unlocked: false },
      { level: 'SILVER', name: '白银', threshold: 50, unlocked: false },
      { level: 'GOLD', name: '黄金', threshold: 100, unlocked: false },
      { level: 'PLATINUM', name: '铂金', threshold: 200, unlocked: false }
    ]
  },
  {
    id: 'attendance_star',
    name: '全勤之星',
    icon: '🌟',
    type: 'LABOR',
    description: '上冰次数达标解锁',
    requirement: 100,
    unit: '次',
    levels: [
      { level: 'BRONZE', name: '青铜', threshold: 20, unlocked: false },
      { level: 'SILVER', name: '白银', threshold: 50, unlocked: false },
      { level: 'GOLD', name: '黄金', threshold: 100, unlocked: false }
    ]
  },
  {
    id: 'muscle_memory',
    name: '肌肉记忆',
    icon: '💪',
    type: 'TECHNICAL',
    description: '单个动作练习次数达标',
    requirement: 200,
    unit: '次',
    levels: [
      { level: 'BRONZE', name: '青铜', threshold: 50, unlocked: false },
      { level: 'SILVER', name: '白银', threshold: 100, unlocked: false },
      { level: 'GOLD', name: '黄金', threshold: 200, unlocked: false }
    ]
  }
];

export const SAMPLE_EQUIPMENTS: Equipment[] = [
  {
    id: 'eq_001',
    type: 'SKATES',
    name: 'Edea Piano',
    brand: 'Edea',
    purchaseDate: '2023-06-15',
    sharpenDate: '2024-01-10',
    usageHours: 48.5,
    maxHours: 80,
    sharpenReminder: true
  },
  {
    id: 'eq_002',
    type: 'BLADES',
    name: 'Matrix Legacy',
    brand: 'Jackson',
    purchaseDate: '2023-06-15',
    sharpenDate: '2024-02-20',
    usageHours: 48.5,
    maxHours: 60,
    sharpenReminder: true
  }
];

export const SAMPLE_PLAYLISTS: TrainingPlaylist[] = [
  {
    id: 'pl_001',
    name: '短节目训练',
    programType: 'SP',
    songs: [
      { id: 's1', name: 'Ballade No.1', artist: 'Chopin', bpm: 72, duration: 180, moveAssociations: ['2A', '3T'] },
      { id: 's2', name: 'Clair de Lune', artist: 'Debussy', bpm: 60, duration: 240, moveAssociations: ['USp', 'StSq'] }
    ]
  }
];

export const SAMPLE_FRIEND_ACTIVITIES: IceFriendActivity[] = [
  { id: 'fa_001', city: '北京', moveName: '3T', message: '正在练3T，求指导', time: '5分钟前', isAnonymous: true },
  { id: 'fa_002', city: '北京', moveName: '2A', message: '今天状态不错！', time: '15分钟前', isAnonymous: true },
  { id: 'fa_003', city: '上海', moveName: 'SSp', message: '蹲转进入总是不稳', time: '30分钟前', isAnonymous: true }
];

// 计算掌握度等级（考虑疲劳度）
export function calculateMasteryLevel(practiceCount: number, avgFatigue: number, qualityScore: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  // 疲劳度加权：疲劳时完成质量高，说明真正掌握
  const fatigueBonus = avgFatigue > 6 ? 10 : 0;
  const adjustedScore = qualityScore + fatigueBonus;
  
  if (practiceCount >= 200 && adjustedScore >= 85) return 'S';
  if (practiceCount >= 100 && adjustedScore >= 75) return 'A';
  if (practiceCount >= 50 && adjustedScore >= 60) return 'B';
  if (practiceCount >= 20 && adjustedScore >= 40) return 'C';
  return 'D';
}

// 格式化时长
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}小时${mins}分钟`;
  } else if (mins > 0) {
    return `${mins}分钟${secs}秒`;
  }
  return `${secs}秒`;
}

// 判断动作类型
export function getMoveCategory(move: string): MoveCategory {
  // 跳跃：A(Axel), Lz(Lutz), F(Flip), Lo(Loop), S(Salchow), T(Toe)
  const jumpPattern = /[1-4][ALzFLoST]|A|Lz|Flip|Loop|Sal|Toe/i;
  // 旋转：Sp(Spin), USp(Upright), SSp(Sit), CSp(Camel), LSp(Layback)
  const spinPattern = /Sp|Spin|USp|SSp|CSp|LSp/i;
  // 步法：StSq, CiSt, RoLi, Step, Spiral
  const stepPattern = /StSq|CiSt|RoLi|Step|Spiral/i;
  
  if (jumpPattern.test(move)) return 'JUMP';
  if (spinPattern.test(move)) return 'SPIN';
  if (stepPattern.test(move)) return 'STEP';
  return 'OTHER';
}

// 计算动作疲劳度
export function calculateMoveFatigue(move: string): number {
  const category = getMoveCategory(move);
  return FATIGUE_LEVELS[category];
}

// 计算训练总疲劳度（所有动作疲劳度之和）
export function calculateTotalFatigue(moves: string[]): number {
  return moves.reduce((total, move) => total + calculateMoveFatigue(move), 0);
}

// 获取动作类型中文名
export function getMoveCategoryName(category: MoveCategory): string {
  const names: Record<MoveCategory, string> = {
    'JUMP': '跳跃',
    'SPIN': '旋转',
    'STEP': '步法',
    'OTHER': '其他'
  };
  return names[category];
}
