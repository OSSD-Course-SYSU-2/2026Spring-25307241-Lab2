# 冰迹花滑 - 项目实施指南

## 一、项目结构

```
IceTrace/
├── entry/src/main/
│   ├── ets/
│   │   ├── common/              # 通用模块
│   │   │   ├── components/      # UI组件库
│   │   │   │   ├── IceNavBar.ets        # 导航栏
│   │   │   │   ├── IceCard.ets          # 卡片容器
│   │   │   │   ├── IceTag.ets           # 标签组件
│   │   │   │   ├── IceSearchBar.ets     # 搜索栏
│   │   │   │   ├── IceFilterBar.ets     # 筛选栏
│   │   │   │   ├── IceEmpty.ets         # 空状态
│   │   │   │   └── IceLoading.ets       # 加载状态
│   │   │   │
│   │   │   ├── constants/       # 常量定义
│   │   │   │   ├── Colors.ets           # 颜色常量
│   │   │   │   ├── Styles.ets           # 样式常量
│   │   │   │   └── Config.ets           # 配置常量
│   │   │   │
│   │   │   └── utils/           # 工具函数
│   │   │       ├── DateUtils.ets        # 日期处理
│   │   │       ├── ScoreUtils.ets       # 分数计算
│   │   │       └── StorageUtils.ets     # 数据存储
│   │   │
│   │   ├── pages/               # 页面模块
│   │   │   ├── IceTraceHomePage.ets     # 首页
│   │   │   ├── CompetitionCenterPage.ets # 赛事中心
│   │   │   ├── SkaterArchivePage.ets    # 选手档案
│   │   │   ├── DataRecordsPage.ets      # 数据纪录
│   │   │   ├── MoveGalleryPage.ets      # 动作图鉴
│   │   │   ├── GlossaryPage.ets         # 术语词典
│   │   │   ├── QuizChallengePage.ets    # 知识闯关
│   │   │   ├── ScoringSimulatorPage.ets # 计分模拟器
│   │   │   └── WikiHomePage.ets         # 科普首页
│   │   │
│   │   └── viewmodel/           # 数据模型
│   │       ├── IceTraceModel.ets        # 核心数据模型
│   │       ├── SampleData.ets           # 示例数据
│   │       └── DataService.ets          # 数据服务
│   │
│   └── resources/               # 资源文件
│       ├── base/
│       │   ├── element/         # 字符串资源
│       │   ├── media/           # 图片资源
│       │   └── profile/         # 配置文件
│       │       └── main_pages.json
│       │
│       ├── rawfile/             # 原始文件(视频等)
│       └── zh_CN/               # 中文资源
│
├── docs/                        # 文档
│   ├── ARCHITECTURE.md          # 架构设计
│   ├── API.md                   # 接口文档
│   └── DATA_SCHEMA.md           # 数据结构
│
└── build-profile.json5          # 构建配置
```

## 二、功能模块划分

### 2.1 核心数据模块 (专业向)
| 模块 | 功能 | 页面 |
|------|------|------|
| 赛事中心 | 赛事列表、详情、日历 | CompetitionCenterPage |
| 选手档案 | 选手列表、详情、筛选 | SkaterArchivePage |
| 数据纪录 | 纪录榜单、历史统计 | DataRecordsPage |
| 计分工具 | 模拟器、打分解读 | ScoringSimulatorPage |

### 2.2 科普学习模块 (入门向)
| 模块 | 功能 | 页面 |
|------|------|------|
| 动作图鉴 | 可视化动作教学 | MoveGalleryPage |
| 术语词典 | 专业词汇查询 | GlossaryPage |
| 赛事入门 | 观赛指南 | CompetitionGuidePage |
| 历史长廊 | 发展历史 | HistoryGalleryPage |

### 2.3 互动体验模块 (趣味向)
| 模块 | 功能 | 页面 |
|------|------|------|
| 知识闯关 | 答题系统 | QuizChallengePage |
| 动作猜猜看 | 趣味游戏 | MoveGuessingPage |
| 节目赏析 | 经典节目 | ProgramAppreciationPage |

## 三、数据模型设计

### 3.1 核心实体

```typescript
// 选手模型
interface Skater {
  id: string;
  name: string;              // 姓名
  nameEn: string;            // 英文名
  nationality: string;       // 国籍
  birthDate: string;         // 出生日期
  discipline: Discipline;    // 项目类型
  isActive: boolean;         // 是否现役
  biography: string;         // 简介
  bestScores: BestScore[];   // 最佳成绩
  medals: MedalRecord[];     // 奖牌记录
  programs: Program[];       // 代表节目
}

// 赛事模型
interface Competition {
  id: string;
  name: string;              // 赛事名称
  season: string;            // 赛季
  type: CompetitionType;     // 赛事类型
  location: string;          // 举办地点
  startDate: string;         // 开始日期
  endDate: string;           // 结束日期
  status: CompetitionStatus; // 赛事状态
  results: CompetitionResult[]; // 比赛结果
}

// 动作模型
interface Move {
  id: string;
  name: string;              // 中文名称
  nameEn: string;            // 英文名称
  abbreviation: string;      // 缩写(如3A)
  type: MoveType;            // 动作类型
  difficulty: number;        // 难度等级
  baseValue: number;         // 基础分值
  description: string;       // 动作描述
  keyPoints: string[];       // 技术要点
  commonErrors: string[];    // 常见失误
}

// 题目模型
interface Quiz {
  id: string;
  question: string;          // 题目内容
  type: QuizType;            // 题目类型
  category: QuizCategory;    // 题目分类
  difficulty: Difficulty;    // 难度等级
  options: QuizOption[];     // 选项
  correctAnswer: string;     // 正确答案
  explanation: string;       // 答案解析
}
```

### 3.2 类型定义

```typescript
// 项目类型
type Discipline = 'MEN' | 'LADIES' | 'PAIRS' | 'ICE_DANCE' | 'TEAM';

// 赛事类型
type CompetitionType = 'WORLD' | 'EUROPEAN' | 'FOUR_CONTINENTS' | 
                       'OLYMPICS' | 'GP_SERIES' | 'GP_FINAL';

// 动作类型
type MoveType = 'JUMP' | 'SPIN' | 'STEP_SEQUENCE' | 'LIFT' | 'SPIRAL';

// 难度等级
type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
```

## 四、页面设计规范

### 4.1 响应式布局

```typescript
// 断点定义
const BREAKPOINTS = {
  sm: '320vp',   // 手机
  md: '600vp',   // 平板竖屏
  lg: '840vp',   // 平板横屏
  xl: '1440vp'   // 桌面
};

// 栅格配置
const GRID_CONFIG = {
  columns: { sm: 4, md: 8, lg: 12, xl: 12 },
  gutter: 16,
  margin: { sm: 16, md: 24, lg: 32, xl: 48 }
};
```

### 4.2 颜色规范

```typescript
// 主色调
const COLORS = {
  primary: '#4FC3F7',      // 冰蓝
  primaryDark: '#1976D2',  // 深蓝
  accent: '#FF9800',       // 强调色
  
  // 背景色
  background: '#F5F5F5',
  surface: '#FFFFFF',
  
  // 文字色
  textPrimary: '#333333',
  textSecondary: '#666666',
  textHint: '#999999',
  
  // 状态色
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3'
};
```

### 4.3 组件规范

```typescript
// 卡片样式
const CARD_STYLE = {
  padding: 16,
  margin: 8,
  borderRadius: 12,
  shadow: {
    radius: 8,
    color: '#1A000000',
    offsetX: 0,
    offsetY: 2
  }
};

// 按钮样式
const BUTTON_STYLE = {
  height: 40,
  borderRadius: 20,
  fontSize: 14
};
```

## 五、核心功能实现要点

### 5.1 首页模块
- Swiper 轮播横幅
- GridRow/GridCol 响应式卡片布局
- 定时器自动刷新实时数据
- 本地缓存每日一识

### 5.2 赛事中心
- List + LazyForEach 懒加载长列表
- Tabs 切换不同视图
- 分页加载，上拉加载更多
- 筛选器支持多条件组合

### 5.3 动作图鉴
- Grid 网格展示
- Video 组件播放演示视频
- 支持全屏查看慢动作
- Search 组件实现搜索

### 5.4 知识闯关
- Progress 组件显示进度
- Dialog 组件显示答题结果
- 本地存储答题记录和成就
- Canvas 绘制徽章

### 5.5 计分模拟器
- 复用 ScoreCalculator 工具类
- Canvas 绘制分数图表
- 支持导出计算结果
- 本地保存历史记录

## 六、开发计划

### Phase 1: 基础架构 (Week 1-2)
- ✅ 项目初始化
- ✅ 数据模型定义
- ✅ 通用组件开发
- ✅ 路由配置

### Phase 2: 核心功能 (Week 3-4)
- ✅ 首页模块
- ✅ 赛事中心
- ✅ 选手档案
- ✅ 数据纪录

### Phase 3: 科普功能 (Week 5-6)
- ✅ 动作图鉴
- ✅ 术语词典
- ✅ 赛事入门
- ✅ 历史长廊

### Phase 4: 互动功能 (Week 7-8)
- ✅ 知识闯关
- ✅ 动作猜猜看
- ✅ 节目赏析
- ✅ 计分工具增强

### Phase 5: 优化测试 (Week 9-10)
- ⏳ 性能优化
- ⏳ 响应式适配
- ⏳ 多语言支持
- ⏳ 测试与修复

## 七、技术难点与解决方案

### 7.1 实时赛况数据同步
**方案**: 对接ISU官方API或第三方数据源(如skatingscores.com)

### 7.2 大量数据存储与查询
**方案**: 关系型数据库建立索引，数据分表存储，实现全文搜索

### 7.3 视频资源加载
**方案**: 视频压缩转码，预加载机制，多清晰度选项

### 7.4 多语言支持
**方案**: 资源文件管理，全局语言状态管理，动态切换

## 八、扩展性设计

### 8.1 插件化架构
- 预留第三方数据源接口
- 支持自定义主题
- 可扩展新题型

### 8.2 数据更新机制
- 在线数据更新
- 版本控制和增量更新
- 用户贡献数据审核

### 8.3 社区功能预留
- 新手问答社区接口
- 用户评论系统
- 内容举报机制
