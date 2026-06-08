/**
 * 冰迹花滑 - 核心数据模型
 * 包含所有实体类型定义和工具函数
 */

// ==================== 枚举类型 ====================

/**
 * 项目类型
 */
export enum Discipline {
  MEN = 'MEN',               // 男子单人滑
  LADIES = 'LADIES',         // 女子单人滑
  PAIRS = 'PAIRS',           // 双人滑
  ICE_DANCE = 'ICE_DANCE',   // 冰上舞蹈
  TEAM = 'TEAM'              // 团体赛
}

export const DisciplineNames: Record<Discipline, string> = {
  [Discipline.MEN]: '男子单人滑',
  [Discipline.LADIES]: '女子单人滑',
  [Discipline.PAIRS]: '双人滑',
  [Discipline.ICE_DANCE]: '冰上舞蹈',
  [Discipline.TEAM]: '团体赛'
};

export const DisciplineIcons: Record<Discipline, string> = {
  [Discipline.MEN]: '👨',
  [Discipline.LADIES]: '👩',
  [Discipline.PAIRS]: '👫',
  [Discipline.ICE_DANCE]: '💃',
  [Discipline.TEAM]: '👥'
};

/**
 * 赛事类型
 */
export enum CompetitionType {
  WORLD = 'WORLD',                   // 世锦赛
  EUROPEAN = 'EUROPEAN',             // 欧锦赛
  FOUR_CONTINENTS = 'FOUR_CONTINENTS', // 四大洲
  OLYMPICS = 'OLYMPICS',             // 冬奥会
  GP_SERIES = 'GP_SERIES',           // 大奖赛分站
  GP_FINAL = 'GP_FINAL',             // 大奖赛总决赛
  NATIONAL = 'NATIONAL',             // 全国锦标赛
  CHALLENGER = 'CHALLENGER'          // 挑战赛
}

export const CompetitionTypeNames: Record<CompetitionType, string> = {
  [CompetitionType.WORLD]: '世界锦标赛',
  [CompetitionType.EUROPEAN]: '欧洲锦标赛',
  [CompetitionType.FOUR_CONTINENTS]: '四大洲锦标赛',
  [CompetitionType.OLYMPICS]: '冬季奥运会',
  [CompetitionType.GP_SERIES]: '大奖赛分站赛',
  [CompetitionType.GP_FINAL]: '大奖赛总决赛',
  [CompetitionType.NATIONAL]: '全国锦标赛',
  [CompetitionType.CHALLENGER]: '挑战赛'
};

/**
 * 赛事状态
 */
export enum CompetitionStatus {
  UPCOMING = 'UPCOMING',     // 即将开始
  LIVE = 'LIVE',             // 进行中
  FINISHED = 'FINISHED',     // 已结束
  CANCELLED = 'CANCELLED'    // 已取消
}

export const CompetitionStatusNames: Record<CompetitionStatus, string> = {
  [CompetitionStatus.UPCOMING]: '即将开始',
  [CompetitionStatus.LIVE]: '进行中',
  [CompetitionStatus.FINISHED]: '已结束',
  [CompetitionStatus.CANCELLED]: '已取消'
};

/**
 * 动作类型
 */
export enum MoveType {
  JUMP = 'JUMP',                   // 跳跃
  SPIN = 'SPIN',                   // 旋转
  STEP_SEQUENCE = 'STEP_SEQUENCE', // 接续步
  LIFT = 'LIFT',                   // 托举
  SPIRAL = 'SPIRAL',               // 螺旋线
  TWIZZLE = 'TWIZZLE'              // 转体托举
}

export const MoveTypeNames: Record<MoveType, string> = {
  [MoveType.JUMP]: '跳跃',
  [MoveType.SPIN]: '旋转',
  [MoveType.STEP_SEQUENCE]: '接续步',
  [MoveType.LIFT]: '托举',
  [MoveType.SPIRAL]: '螺旋线',
  [MoveType.TWIZZLE]: '转体托举'
};

/**
 * 难度等级
 */
export enum Difficulty {
  BEGINNER = 'BEGINNER',       // 入门
  INTERMEDIATE = 'INTERMEDIATE', // 进阶
  ADVANCED = 'ADVANCED'        // 资深
}

export const DifficultyNames: Record<Difficulty, string> = {
  [Difficulty.BEGINNER]: '入门',
  [Difficulty.INTERMEDIATE]: '进阶',
  [Difficulty.ADVANCED]: '资深'
};

export const DifficultyColors: Record<Difficulty, string> = {
  [Difficulty.BEGINNER]: '#4CAF50',
  [Difficulty.INTERMEDIATE]: '#FF9800',
  [Difficulty.ADVANCED]: '#F44336'
};

/**
 * 奖牌类型
 */
export enum MedalType {
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  BRONZE = 'BRONZE'
}

export const MedalIcons: Record<MedalType, string> = {
  [MedalType.GOLD]: '🥇',
  [MedalType.SILVER]: '🥈',
  [MedalType.BRONZE]: '🥉'
};

// ==================== 数据接口 ====================

/**
 * 奖牌记录
 */
export interface MedalRecord {
  competition: string;
  year: number;
  discipline: Discipline;
  medalType: MedalType;
}

/**
 * 最佳成绩
 */
export interface BestScore {
  segment: 'SP' | 'FS' | 'TOTAL';
  score: number;
  competition: string;
  date: string;
  season: string;
}

/**
 * 代表节目
 */
export interface Program {
  name: string;
  season: string;
  type: 'SP' | 'FS';
  music: string;
  choreographer: string;
  score: number;
  videoUrl?: string;
  isClassic: boolean;
}

/**
 * 选手信息
 */
export interface Skater {
  id: string;
  name: string;
  nameEn: string;
  nationality: string;
  nationalityCode: string;
  birthDate: string;
  gender: 'M' | 'F';
  discipline: Discipline;
  isActive: boolean;
  avatar: string;
  biography: string;
  height?: number;
  coach?: string;
  trainingLocation?: string;
  careerHighlights: string[];
  bestScores: BestScore[];
  medals: MedalRecord[];
  programs: Program[];
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    weibo?: string;
  };
}

/**
 * 技术元素得分
 */
export interface TechnicalScore {
  element: string;
  baseValue: number;
  goe: number;
  finalValue: number;
  info: string;
}

/**
 * 节目内容分
 */
export interface ComponentScore {
  name: string;
  factor: number;
  score: number;
  finalValue: number;
}

/**
 * 单段节目成绩
 */
export interface SegmentResult {
  segment: 'SP' | 'FS';
  rank: number;
  tes: number;
  pcs: number;
  deductions: number;
  totalScore: number;
  technicalScores: TechnicalScore[];
  componentScores: ComponentScore[];
}

/**
 * 选手比赛结果
 */
export interface CompetitionResult {
  rank: number;
  skaterId: string;
  name: string;
  nation: string;
  totalScore: number;
  segments: SegmentResult[];
}

/**
 * 参赛选手
 */
export interface Participant {
  skaterId: string;
  name: string;
  nation: string;
  startOrder: number;
  withdraw?: boolean;
}

/**
 * 赛事信息
 */
export interface Competition {
  id: string;
  name: string;
  nameEn: string;
  season: string;
  type: CompetitionType;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  disciplines: Discipline[];
  status: CompetitionStatus;
  results: CompetitionResult[];
  participants: Participant[];
  liveStreamUrl?: string;
  officialUrl?: string;
}

/**
 * 动作信息
 */
export interface Move {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  type: MoveType;
  difficulty: number;
  baseValue: number;
  description: string;
  keyPoints: string[];
  commonErrors: string[];
  imageUrl: string;
  videoUrl?: string;
  slowMotionUrl?: string;
  isBeginner: boolean;
  prerequisites?: string[];
  relatedMoves?: string[];
}

/**
 * 题目选项
 */
export interface QuizOption {
  id: string;
  text: string;
  imageUrl?: string;
}

/**
 * 题目信息
 */
export interface Quiz {
  id: string;
  question: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'IMAGE_GUESS';
  category: 'BASICS' | 'MOVES' | 'RULES' | 'HISTORY' | 'SKATERS';
  difficulty: Difficulty;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
  relatedKnowledge: string[];
  imageUrl?: string;
}

/**
 * 术语条目
 */
export interface GlossaryTerm {
  id: string;
  term: string;
  termEn: string;
  abbreviation?: string;
  definition: string;
  examples?: string[];
  relatedTerms?: string[];
  category: string;
}

/**
 * 每日知识
 */
export interface DailyKnowledge {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  date: string;
}

// ==================== 工具函数 ====================

/**
 * 计算年龄
 */
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

/**
 * 格式化分数
 */
export function formatScore(score: number): string {
  return score.toFixed(2);
}

/**
 * 格式化日期
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * 获取难度等级
 */
export function getDifficultyLevel(difficulty: number): Difficulty {
  if (difficulty <= 2) return Difficulty.BEGINNER;
  if (difficulty <= 3) return Difficulty.INTERMEDIATE;
  return Difficulty.ADVANCED;
}
