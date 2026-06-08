/**
 * 冰迹·EdgeFlow - 页面数据模型
 * 定义页面所需的接口类型
 */

// Tab项接口
export interface TabItem {
  icon: string;
  activeIcon: string;
  name: string;
}

// 筛选项接口
export interface FilterItem {
  id: string;
  name: string;
  color?: string;
}

// 统计卡片接口
export interface StatCard {
  icon: string;
  label: string;
  value: string;
  trend: string;
}

// 勋章接口
export interface Medal {
  name: string;
  icon: string;
  level: string;
  progress: number;
  unlocked: boolean;
}

// 月度数据接口
export interface MonthlyData {
  month: string;
  hours: number;
}

// Banner项接口
export interface BannerItem {
  title: string;
  subtitle: string;
  tag: string;
}

// 每日知识接口
export interface DailyKnowledgeItem {
  question: string;
  answer: string;
}

// 新闻项接口
export interface NewsItem {
  title: string;
  source: string;
  time: string;
  category: string;
}

// 科普项接口
export interface ScienceItem {
  title: string;
  category: string;
  readTime: string;
}

// 用户信息接口
export interface UserInfo {
  name: string;
  level: string;
  avatar: string;
}

// 装备项接口
export interface EquipmentItem {
  name: string;
  brand: string;
  purchaseDate: string;
  status: string;
}

// 设置项接口
export interface SettingItem {
  icon: string;
  title: string;
  subtitle: string;
  action: string;
}
