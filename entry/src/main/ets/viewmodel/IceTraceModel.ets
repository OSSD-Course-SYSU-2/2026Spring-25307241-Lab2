/**
 * 冰迹花滑 - 核心数据模型定义
 * 包含选手、赛事、动作、题库等所有实体类型
 */

// ==================== 基础类型定义 ====================

/**
 * 项目类型
 */
export type Discipline = 'MEN' | 'LADIES' | 'PAIRS' | 'ICE_DANCE' | 'TEAM';

/**
 * 项目类型中文名称映射
 */
export const DISCIPLINE_NAMES: Record<Discipline, string> = {
  'MEN': '男子单人滑',
  'LADIES': '女子单人滑',
  'PAIRS': '双人滑',
  'ICE_DANCE': '冰上舞蹈',
  'TEAM': '团体赛'
};

/**
 * 赛事类型
 */
export type CompetitionType = 
  | 'WORLD'           // 世锦赛
  | 'EUROPEAN'        // 欧锦赛
  | 'FOUR_CONTINENTS' // 四大洲锦标赛
  | 'OLYMPICS'        // 冬奥会
  | 'GP_SERIES'       // 大奖赛分站
  | 'GP_FINAL'        // 大奖赛总决赛
  | 'NATIONAL'        // 全国锦标赛
  | 'CHALLENGER';     // 挑战赛

export const COMPETITION_TYPE_NAMES: Record<CompetitionType, string> = {
  'WORLD': '世界锦标赛',
  'EUROPEAN': '欧洲锦标赛',
  'FOUR_CONTINENTS': '四大洲锦标赛',
  'OLYMPICS': '冬季奥运会',
  'GP_SERIES': '大奖赛分站赛',
  'GP_FINAL': '大奖赛总决赛',
  'NATIONAL': '全国锦标赛',
  'CHALLENGER': '挑战赛'
};

/**
 * 赛事状态
 */
export type CompetitionStatus = 'UPCOMING' | 'LIVE' | 'FINISHED' | 'CANCELLED';

export const COMPETITION_STATUS_NAMES: Record<CompetitionStatus, string> = {
  'UPCOMING': '即将开始',
  'LIVE': '进行中',
  'FINISHED': '已结束',
  'CANCELLED': '已取消'
};

/**
 * 动作类型
 */
export type MoveType = 
  | 'JUMP'            // 跳跃
  | 'SPIN'            // 旋转
  | 'STEP_SEQUENCE'   // 接续步
  | 'LIFT'            // 托举
  | 'SPIRAL'          // 螺旋线
  | 'TWIZZLE';        // 转体托举

export const MOVE_TYPE_NAMES: Record<MoveType, string> = {
  'JUMP': '跳跃',
  'SPIN': '旋转',
  'STEP_SEQUENCE': '接续步',
  'LIFT': '托举',
  'SPIRAL': '螺旋线',
  'TWIZZLE': '转体托举'
};

/**
 * 题目类型
 */
export type QuizType = 
  | 'SINGLE_CHOICE'    // 单选题
  | 'MULTIPLE_CHOICE'  // 多选题
  | 'TRUE_FALSE'       // 判断题
  | 'IMAGE_GUESS';     // 图片猜题

/**
 * 题目分类
 */
export type QuizCategory = 
  | 'BASICS'    // 基础知识
  | 'MOVES'     // 动作识别
  | 'RULES'     // 规则知识
  | 'HISTORY'   // 赛事历史
  | 'SKATERS';  // 选手知识

export const QUIZ_CATEGORY_NAMES: Record<QuizCategory, string> = {
  'BASICS': '花滑基础',
  'MOVES': '动作识别',
  'RULES': '规则知识',
  'HISTORY': '赛事历史',
  'SKATERS': '选手小知识'
};

/**
 * 难度等级
 */
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export const DIFFICULTY_NAMES: Record<Difficulty, string> = {
  'BEGINNER': '入门',
  'INTERMEDIATE': '进阶',
  'ADVANCED': '资深'
};

// ==================== 选手相关模型 ====================

/**
 * 奖牌类型
 */
export type MedalType = 'GOLD' | 'SILVER' | 'BRONZE';

/**
 * 奖牌记录
 */
export interface MedalRecord {
  competition: string;      // 赛事名称
  year: number;             // 年份
  discipline: Discipline;   // 项目
  medalType: MedalType;     // 奖牌类型
}

/**
 * 最佳成绩
 */
export interface BestScore {
  segment: 'SP' | 'FS' | 'TOTAL';  // 短节目/自由滑/总分
  score: number;                    // 分数
  competition: string;              // 赛事
  date: string;                     // 日期
  season: string;                   // 赛季
}

/**
 * 代表节目
 */
export interface Program {
  name: string;             // 节目名称
  season: string;           // 赛季
  type: 'SP' | 'FS';        // 节目类型
  music: string;            // 配乐
  choreographer: string;    // 编舞
  score: number;            // 最高分
  videoUrl?: string;        // 视频链接
  isClassic: boolean;       // 是否经典节目
}

/**
 * 排名历史
 */
export interface RankingHistory {
  season: string;           // 赛季
  worldRanking: number;     // 世界排名
  seasonBest: number;       // 赛季最佳
}

/**
 * 社交媒体信息
 */
export interface SocialMedia {
  instagram?: string;
  twitter?: string;
  weibo?: string;
}

/**
 * 选手完整信息
 */
export interface Skater {
  id: string;                       // 唯一标识
  name: string;                     // 姓名
  nameEn: string;                   // 英文名
  nationality: string;              // 国籍
  nationalityCode: string;          // 国籍代码(如CHN)
  birthDate: string;                // 出生日期 (YYYY-MM-DD)
  gender: 'M' | 'F';                // 性别
  discipline: Discipline;           // 项目类型
  isActive: boolean;                // 是否现役
  avatar: string;                   // 头像URL
  biography: string;                // 简介
  height?: number;                  // 身高(cm)
  coach?: string;                   // 教练
  trainingLocation?: string;        // 训练地点
  careerHighlights: string[];       // 生涯亮点
  bestScores: BestScore[];          // 最佳成绩
  medals: MedalRecord[];            // 奖牌记录
  programs: Program[];              // 代表节目
  rankings: RankingHistory[];       // 排名历史
  socialMedia?: SocialMedia;        // 社交媒体
}

// ==================== 赛事相关模型 ====================

/**
 * 参赛选手信息
 */
export interface Participant {
  skaterId: string;         // 选手ID
  name: string;             // 姓名
  nation: string;           // 国家代码
  startOrder: number;       // 出场顺序
  withdraw?: boolean;       // 是否退赛
}

/**
 * 技术元素得分
 */
export interface TechnicalScore {
  element: string;          // 动作名称
  baseValue: number;        // 基础分值
  goe: number;              // GOE加分
  finalValue: number;       // 最终得分
  info: string;             // 备注信息
}

/**
 * 节目内容分
 */
export interface ComponentScore {
  name: string;             // 项目名称
  factor: number;           // 系数
  score: number;            // 分数
  finalValue: number;       // 最终得分
}

/**
 * 单段节目成绩
 */
export interface SegmentResult {
  segment: 'SP' | 'FS';             // 节目类型
  rank: number;                      // 排名
  tes: number;                       // 技术分
  pcs: number;                       // 内容分
  deductions: number;                // 扣分
  totalScore: number;                // 总分
  technicalScores: TechnicalScore[]; // 技术元素详情
  componentScores: ComponentScore[]; // 内容分详情
}

/**
 * 选手比赛结果
 */
export interface CompetitionResult {
  rank: number;                      // 最终排名
  skaterId: string;                  // 选手ID
  name: string;                      // 姓名
  nation: string;                    // 国家
  totalScore: number;                // 总分
  segments: SegmentResult[];         // 各段成绩
  qualified?: boolean;               // 是否晋级
}

/**
 * 赛事完整信息
 */
export interface Competition {
  id: string;                        // 赛事ID
  name: string;                      // 赛事名称
  nameEn: string;                    // 英文名称
  season: string;                    // 赛季(如2023-24)
  type: CompetitionType;             // 赛事类型
  location: string;                  // 举办地点
  country: string;                   // 举办国家
  startDate: string;                 // 开始日期
  endDate: string;                   // 结束日期
  disciplines: Discipline[];         // 包含项目
  status: CompetitionStatus;         // 赛事状态
  results: CompetitionResult[];      // 比赛结果
  participants: Participant[];       // 参赛选手
  liveStreamUrl?: string;            // 直播链接
  officialUrl?: string;              // 官方链接
}

// ==================== 动作相关模型 ====================

/**
 * 动作完整信息
 */
export interface Move {
  id: string;                        // 动作ID
  name: string;                      // 中文名称
  nameEn: string;                    // 英文名称
  abbreviation: string;              // 缩写(如3A)
  type: MoveType;                    // 动作类型
  difficulty: number;                // 难度等级(1-5)
  baseValue: number;                 // 基础分值
  description: string;               // 动作描述
  keyPoints: string[];               // 技术要点
  commonErrors: string[];            // 常见失误
  imageUrl: string;                  // 示例图片
  videoUrl?: string;                 // 演示视频
  slowMotionUrl?: string;            // 慢动作视频
  isBeginner: boolean;               // 是否适合入门
  prerequisites?: string[];          // 前置动作
  relatedMoves?: string[];           // 相关动作
}

// ==================== 题库相关模型 ====================

/**
 * 题目选项
 */
export interface QuizOption {
  id: string;                // 选项ID
  text: string;              // 选项文本
  imageUrl?: string;         // 选项图片
}

/**
 * 题目完整信息
 */
export interface Quiz {
  id: string;                        // 题目ID
  question: string;                  // 题目内容
  type: QuizType;                    // 题目类型
  category: QuizCategory;            // 题目分类
  difficulty: Difficulty;            // 难度等级
  options: QuizOption[];             // 选项(选择题)
  correctAnswer: string;             // 正确答案
  explanation: string;               // 答案解析
  relatedKnowledge: string[];        // 相关知识点
  imageUrl?: string;                 // 配图
  videoUrl?: string;                 // 配视频
  attempts: number;                  // 尝试次数
  correctRate: number;               // 正确率
}

/**
 * 答题记录
 */
export interface QuizAttempt {
  quizId: string;                    // 题目ID
  userId: string;                    // 用户ID
  answer: string;                    // 用户答案
  isCorrect: boolean;                // 是否正确
  timestamp: number;                 // 答题时间戳
  timeSpent: number;                 // 用时(秒)
}

/**
 * 用户成就
 */
export interface Achievement {
  id: string;                        // 成就ID
  name: string;                      // 成就名称
  description: string;               // 成就描述
  icon: string;                      // 图标
  unlockedAt?: number;               // 解锁时间
  progress: number;                  // 进度(0-100)
  requirement: number;               // 达成要求
}

// ==================== 术语词典模型 ====================

/**
 * 术语条目
 */
export interface GlossaryTerm {
  id: string;                        // 术语ID
  term: string;                      // 术语
  termEn: string;                    // 英文术语
  abbreviation?: string;             // 缩写
  definition: string;                // 定义
  examples?: string[];               // 示例
  relatedTerms?: string[];           // 相关术语
  category: string;                  // 分类
  seeAlso?: string[];                // 参见
}

// ==================== 每日一识模型 ====================

/**
 * 相关链接
 */
export interface RelatedLink {
  title: string;
  url: string;
}

/**
 * 每日知识
 */
export interface DailyKnowledge {
  id: string;                        // 知识ID
  title: string;                     // 标题
  content: string;                   // 内容
  category: string;                  // 分类
  imageUrl?: string;                 // 配图
  date: string;                      // 日期
  relatedLinks?: RelatedLink[];      // 相关链接
}

// ==================== 用户偏好模型 ====================

/**
 * 用户设置
 */
export interface UserPreferences {
  language: 'zh' | 'en';             // 语言
  theme: 'light' | 'dark';           // 主题
  notifications: boolean;            // 通知开关
  favoriteSkaters: string[];         // 关注选手
  favoriteCompetitions: string[];    // 关注赛事
  quizDifficulty: Difficulty;        // 答题难度偏好
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
 * 获取项目图标
 */
export function getDisciplineIcon(discipline: Discipline): string {
  const icons: Record<Discipline, string> = {
    'MEN': '👨',
    'LADIES': '👩',
    'PAIRS': '👫',
    'ICE_DANCE': '💃',
    'TEAM': '👥'
  };
  return icons[discipline];
}

/**
 * 获取奖牌图标
 */
export function getMedalIcon(medalType: MedalType): string {
  const icons: Record<MedalType, string> = {
    'GOLD': '🥇',
    'SILVER': '🥈',
    'BRONZE': '🥉'
  };
  return icons[medalType];
}

/**
 * 获取难度颜色
 */
export function getDifficultyColor(difficulty: Difficulty): string {
  const colors: Record<Difficulty, string> = {
    'BEGINNER': '#4CAF50',
    'INTERMEDIATE': '#FF9800',
    'ADVANCED': '#F44336'
  };
  return colors[difficulty];
}
