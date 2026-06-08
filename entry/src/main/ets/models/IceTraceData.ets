/**
 * 冰迹·EdgeFlow - 数据模型
 */

// 单次练习记录
export interface PracticeRecord {
  id: string;
  moveName: string;       // 动作名称
  date: string;           // 日期 YYYY-MM-DD
  time: string;           // 时间 HH:mm
  duration: number;       // 持续时间(秒)
  fatigue: number;        // 疲劳度
  notes?: string;         // 备注
}

// 动作详情
export interface MoveDetail {
  name: string;           // 动作名称
  abbr: string;           // 缩写
  type: 'jump' | 'spin' | 'step';  // 类型
  level: string;          // 等级 S/A/B/C
  tips: string;           // 动作要点
  totalDuration: number;  // 累计练习时间(秒)
  practiceCount: number;  // 练习次数
}

// 周训练计划
export interface WeeklyPlan {
  id: string;             // 计划ID
  weekStart: string;      // 周开始日期 YYYY-MM-DD
  weekEnd: string;        // 周结束日期 YYYY-MM-DD
  dailyPlans: DailyPlan[]; // 每日计划
  notes?: string;         // 周备注
  createdAt: string;      // 创建时间
  updatedAt: string;      // 更新时间
}

// 每日训练计划
export interface DailyPlan {
  dayOfWeek: number;      // 星期几 0-6 (0=周日)
  date: string;           // 日期 YYYY-MM-DD
  moves: PlannedMove[];   // 计划练习的动作
  targetDuration?: number; // 目标时长(分钟)
  notes?: string;         // 当日备注
}

// 计划练习的动作
export interface PlannedMove {
  moveName: string;       // 动作名称
  targetCount?: number;   // 目标次数
  targetDuration?: number; // 目标时长(分钟)
  priority: 'high' | 'medium' | 'low'; // 优先级
  notes?: string;         // 备注
}

// 用户数据
export interface UserData {
  name: string;
  level: number;
  totalIceTime: number;   // 总冰时(秒)
  totalPractices: number; // 总练习次数
  records: PracticeRecord[];  // 所有练习记录
  moves: Record<string, MoveDetail>;  // 动作详情字典
  weeklyPlans?: WeeklyPlan[]; // 周训练计划
}

// 默认动作列表
export const DEFAULT_MOVES: Record<string, MoveDetail> = {
  '1A': { name: '阿克塞尔一周跳', abbr: '1A', type: 'jump', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  '2A': { name: '阿克塞尔两周跳', abbr: '2A', type: 'jump', level: 'S', tips: '', totalDuration: 0, practiceCount: 0 },
  '3A': { name: '阿克塞尔三周跳', abbr: '3A', type: 'jump', level: 'S', tips: '', totalDuration: 0, practiceCount: 0 },
  '1Lz': { name: '勾手一周跳', abbr: '1Lz', type: 'jump', level: 'C', tips: '', totalDuration: 0, practiceCount: 0 },
  '2Lz': { name: '勾手两周跳', abbr: '2Lz', type: 'jump', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  '3Lz': { name: '勾手三周跳', abbr: '3Lz', type: 'jump', level: 'S', tips: '', totalDuration: 0, practiceCount: 0 },
  '1F': { name: '后内点冰一周跳', abbr: '1F', type: 'jump', level: 'C', tips: '', totalDuration: 0, practiceCount: 0 },
  '2F': { name: '后内点冰两周跳', abbr: '2F', type: 'jump', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  '3F': { name: '后内点冰三周跳', abbr: '3F', type: 'jump', level: 'S', tips: '', totalDuration: 0, practiceCount: 0 },
  '1Lo': { name: '后外结环一周跳', abbr: '1Lo', type: 'jump', level: 'C', tips: '', totalDuration: 0, practiceCount: 0 },
  '2Lo': { name: '后外结环两周跳', abbr: '2Lo', type: 'jump', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  '3Lo': { name: '后外结环三周跳', abbr: '3Lo', type: 'jump', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  '1S': { name: '后内结环一周跳', abbr: '1S', type: 'jump', level: 'C', tips: '', totalDuration: 0, practiceCount: 0 },
  '2S': { name: '后内结环两周跳', abbr: '2S', type: 'jump', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  '3S': { name: '后内结环三周跳', abbr: '3S', type: 'jump', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  '1T': { name: '后外点冰一周跳', abbr: '1T', type: 'jump', level: 'C', tips: '', totalDuration: 0, practiceCount: 0 },
  '2T': { name: '后外点冰两周跳', abbr: '2T', type: 'jump', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  '3T': { name: '后外点冰三周跳', abbr: '3T', type: 'jump', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  'USp': { name: '直立旋转', abbr: 'USp', type: 'spin', level: 'C', tips: '', totalDuration: 0, practiceCount: 0 },
  'SSp': { name: '蹲转', abbr: 'SSp', type: 'spin', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  'CSp': { name: '弓身转', abbr: 'CSp', type: 'spin', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  'LSp': { name: '林德转', abbr: 'LSp', type: 'spin', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  'CCoSp': { name: '换足联合转', abbr: 'CCoSp', type: 'spin', level: 'S', tips: '', totalDuration: 0, practiceCount: 0 },
  'StSq': { name: '接续步', abbr: 'StSq', type: 'step', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
  'CiSt': { name: '圆形步', abbr: 'CiSt', type: 'step', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  'RoLi': { name: '摇滚步', abbr: 'RoLi', type: 'step', level: 'B', tips: '', totalDuration: 0, practiceCount: 0 },
  'SlSt': { name: '蛇形步', abbr: 'SlSt', type: 'step', level: 'A', tips: '', totalDuration: 0, practiceCount: 0 },
};
