/**
 * 冰迹·EdgeFlow - 数据存储服务
 */

import { PracticeRecord, MoveDetail, UserData, WeeklyPlan, DailyPlan, DEFAULT_MOVES } from '../models/IceTraceData';

export class DataStore {
  private static instance: DataStore;
  private data: UserData;
  
  private constructor() {
    // 从AppStorage加载或初始化
    const savedData = AppStorage.get<string>('iceTraceData');
    if (savedData) {
      try {
        this.data = JSON.parse(savedData) as UserData;
      } catch (e) {
        this.data = this.getDefaultData();
      }
    } else {
      this.data = this.getDefaultData();
    }
  }
  
  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }
  
  private getDefaultData(): UserData {
    return {
      name: '冰上舞者',
      level: 1,
      totalIceTime: 0,
      totalPractices: 0,
      records: [],
      moves: DEFAULT_MOVES,
      weeklyPlans: []
    };
  }
  
  private save() {
    AppStorage.setOrCreate('iceTraceData', JSON.stringify(this.data));
  }
  
  // 获取所有动作
  getMoves(): Record<string, MoveDetail> {
    return this.data.moves;
  }
  
  // 获取动作列表
  getMoveList(): MoveDetail[] {
    return Object.values(this.data.moves);
  }
  
  // 获取单个动作
  getMove(abbr: string): MoveDetail | undefined {
    return this.data.moves[abbr];
  }
  
  // 更新动作要点
  updateMoveTips(abbr: string, tips: string) {
    if (this.data.moves[abbr]) {
      this.data.moves[abbr].tips = tips;
      this.save();
    }
  }
  
  // 添加练习记录
  addPracticeRecord(record: PracticeRecord) {
    this.data.records.unshift(record);
    this.data.totalPractices++;
    this.data.totalIceTime += record.duration;
    
    // 更新动作统计
    if (this.data.moves[record.moveName]) {
      this.data.moves[record.moveName].totalDuration += record.duration;
      this.data.moves[record.moveName].practiceCount++;
    }
    
    this.save();
  }
  
  // 获取动作的练习记录
  getMoveRecords(abbr: string): PracticeRecord[] {
    return this.data.records.filter(r => r.moveName === abbr);
  }
  
  // 获取所有练习记录
  getAllRecords(): PracticeRecord[] {
    return this.data.records;
  }
  
  // 获取用户数据
  getUserData(): UserData {
    return this.data;
  }
  
  // 获取动作类型统计（用于雷达图）
  getMoveTypeStats(): MoveTypeStats {
    let jump = 0, spin = 0, step = 0;
    Object.values(this.data.moves).forEach(move => {
      if (move.type === 'jump') jump += move.totalDuration;
      else if (move.type === 'spin') spin += move.totalDuration;
      else if (move.type === 'step') step += move.totalDuration;
    });
    const result: MoveTypeStats = { jump: jump, spin: spin, step: step };
    return result;
  }
  
  // 获取Top N动作（用于柱状图）
  getTopMoves(n: number = 10): MoveDetail[] {
    return Object.values(this.data.moves)
      .filter(m => m.totalDuration > 0)
      .sort((a, b) => b.totalDuration - a.totalDuration)
      .slice(0, n);
  }
  
  // 获取今日统计
  getTodayStats(): TodayStats {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = this.data.records.filter(r => r.date === today);
    
    let totalSeconds = 0;
    let totalFatigue = 0;
    
    todayRecords.forEach(r => {
      totalSeconds += r.duration;
      totalFatigue += r.fatigue;
    });
    
    const result: TodayStats = {
      minutes: Math.floor(totalSeconds / 60),
      actions: todayRecords.length,
      fatigue: totalFatigue
    };
    return result;
  }
  
  // 获取最近N天的每日练习时长（秒）
  getDailyPracticeTime(days: number = 30): DailyPracticeData[] {
    const result: DailyPracticeData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // 计算当天的总练习时长
      const dayRecords = this.data.records.filter(r => r.date === dateStr);
      let totalSeconds = 0;
      dayRecords.forEach(r => {
        totalSeconds += r.duration;
      });
      
      result.push({
        date: dateStr,
        dayOfWeek: date.getDay(),
        dayOfMonth: date.getDate(),
        duration: totalSeconds
      });
    }
    
    return result;
  }
  
  // 获取当天的练习记录（详细）
  getTodayRecords(): PracticeRecord[] {
    const today = new Date().toISOString().split('T')[0];
    return this.data.records.filter(r => r.date === today);
  }
  
  // 获取指定日期的练习记录
  getRecordsByDate(date: string): PracticeRecord[] {
    return this.data.records.filter(r => r.date === date);
  }
  
  // ========== 周训练计划相关方法 ==========
  
  // 获取所有周训练计划
  getWeeklyPlans(): WeeklyPlan[] {
    return this.data.weeklyPlans || [];
  }
  
  // 获取当前周的训练计划
  getCurrentWeekPlan(): WeeklyPlan | undefined {
    const today = new Date();
    const weekStart = this.getWeekStart(today);
    const weekStartStr = weekStart.toISOString().split('T')[0];
    
    return this.data.weeklyPlans?.find(p => p.weekStart === weekStartStr);
  }
  
  // 获取指定周的训练计划
  getWeekPlanByDate(date: string): WeeklyPlan | undefined {
    const targetDate = new Date(date);
    const weekStart = this.getWeekStart(targetDate);
    const weekStartStr = weekStart.toISOString().split('T')[0];
    
    return this.data.weeklyPlans?.find(p => p.weekStart === weekStartStr);
  }
  
  // 保存或更新周训练计划
  saveWeeklyPlan(plan: WeeklyPlan) {
    if (!this.data.weeklyPlans) {
      this.data.weeklyPlans = [];
    }
    
    const existingIndex = this.data.weeklyPlans.findIndex(p => p.id === plan.id);
    if (existingIndex >= 0) {
      // 更新现有计划
      plan.updatedAt = new Date().toISOString();
      this.data.weeklyPlans[existingIndex] = plan;
    } else {
      // 添加新计划
      this.data.weeklyPlans.push(plan);
    }
    
    this.save();
  }
  
  // 删除周训练计划
  deleteWeeklyPlan(planId: string) {
    if (this.data.weeklyPlans) {
      this.data.weeklyPlans = this.data.weeklyPlans.filter(p => p.id !== planId);
      this.save();
    }
  }
  
  // 创建新的周训练计划
  createWeeklyPlan(weekStartDate?: Date): WeeklyPlan {
    const weekStart = weekStartDate ? this.getWeekStart(weekStartDate) : this.getWeekStart(new Date());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const dailyPlans: DailyPlan[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      dailyPlans.push({
        dayOfWeek: i,
        date: date.toISOString().split('T')[0],
        moves: [],
        notes: ''
      });
    }
    
    const now = new Date().toISOString();
    const plan: WeeklyPlan = {
      id: `plan-${Date.now()}`,
      weekStart: weekStart.toISOString().split('T')[0],
      weekEnd: weekEnd.toISOString().split('T')[0],
      dailyPlans: dailyPlans,
      notes: '',
      createdAt: now,
      updatedAt: now
    };
    
    return plan;
  }
  
  // 获取周开始日期（周日为一周的开始）
  private getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    d.setDate(d.getDate() - day);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}

// 定义接口类型
export interface MoveTypeStats {
  jump: number;
  spin: number;
  step: number;
}

export interface TodayStats {
  minutes: number;
  actions: number;
  fatigue: number;
}

export interface DailyPracticeData {
  date: string;           // 日期 YYYY-MM-DD
  dayOfWeek: number;      // 星期几 0-6
  dayOfMonth: number;     // 几号 1-31
  duration: number;       // 练习时长（秒）
}
