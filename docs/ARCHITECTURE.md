# 冰迹花滑系统架构设计文档

## 一、系统概述

### 1.1 项目定位
- **名称**：冰迹花滑（IceTrace）
- **核心定位**：专业数据查询 + 大众花样滑冰知识普及
- **目标用户**：零基础爱好者、观赛观众、花滑学习者、资深粉丝
- **设计理念**：数据可查、知识易懂、玩法有趣

### 1.2 技术栈
- **开发框架**：HarmonyOS (API 10+)
- **开发语言**：ArkTS
- **UI框架**：ArkUI (声明式UI)
- **状态管理**：@State、@Prop、@Link、@Provide/@Consume
- **数据存储**：Preferences (本地缓存)、关系型数据库 (复杂数据)
- **网络请求**：@ohos.net.http
- **响应式布局**：GridRow/GridCol + BreakpointSystem

### 1.3 视觉风格
- **主色调**：冰蓝 (#4FC3F7) + 纯白 (#FFFFFF)
- **辅助色**：深蓝 (#1976D2)、浅灰 (#F5F5F5)
- **字体**：HarmonyOS Sans
- **设计原则**：极简、无广告、轻量化、响应式

## 二、功能模块架构

### 2.1 模块划分

```
冰迹花滑系统
├── 核心数据模块 (专业向)
│   ├── 赛事中心 - CompetitionCenter
│   ├── 选手档案 - SkaterArchive
│   ├── 数据纪录 - DataRecords
│   └── 计分工具 - ScoringTools
│
├── 科普学习模块 (入门向)
│   ├── 花滑百科 - FigureSkatingWiki
│   ├── 动作图鉴 - MoveGallery
│   ├── 术语词典 - Glossary
│   ├── 赛事入门 - CompetitionGuide
│   └── 历史长廊 - HistoryGallery
│
├── 互动体验模块 (趣味向)
│   ├── 知识闯关 - QuizChallenge
│   ├── 动作猜猜看 - MoveGuessing
│   ├── 节目赏析 - ProgramAppreciation
│   └── 新手问答 - BeginnerQA
│
└── 辅助工具模块 (实用向)
    ├── 打分解读 - ScoreAnalysis
    ├── 时长计算 - DurationCalculator
    └── 动作组合 - MoveCombination
```

### 2.2 页面路由规划

| 路由路径 | 页面名称 | 功能说明 |
|---------|---------|---------|
| pages/Index | 首页 | 综合门户，展示核心入口 |
| pages/CompetitionCenter | 赛事中心 | 赛事列表与详情 |
| pages/CompetitionDetail | 赛事详情 | 单场赛事完整信息 |
| pages/SkaterArchive | 选手档案 | 选手列表与筛选 |
| pages/SkaterDetail | 选手详情 | 选手个人信息页 |
| pages/DataRecords | 数据纪录 | 各类纪录榜单 |
| pages/WikiHome | 百科首页 | 科普模块入口 |
| pages/MoveGallery | 动作图鉴 | 可视化动作教学 |
| pages/Glossary | 术语词典 | 专业词汇查询 |
| pages/QuizChallenge | 知识闯关 | 答题系统 |
| pages/MoveGuessing | 动作猜猜看 | 趣味小游戏 |
| pages/ScoringSimulator | 计分模拟器 | 专业计分工具 |
| pages/ScoreAnalysis | 打分解读 | 分数解析工具 |

## 三、数据模型设计

### 3.1 核心实体模型

#### 选手模型 (Skater)
```typescript
interface Skater {
  id: string;                    // 唯一标识
  name: string;                  // 姓名
  nameEn: string;                // 英文名
  nationality: string;           // 国籍
  nationalityCode: string;       // 国籍代码(如CHN)
  birthDate: string;             // 出生日期
  age: number;                   // 年龄
  gender: 'M' | 'F';             // 性别
  discipline: Discipline;        // 项目类型
  isActive: boolean;             // 是否现役
  avatar: string;                // 头像URL
  biography: string;             // 简介
  careerHighlights: string[];    // 生涯亮点
  bestScores: BestScore[];       // 最佳成绩
  medals: MedalRecord[];         // 奖牌记录
  programs: Program[];           // 代表节目
  rankings: RankingHistory[];    // 排名历史
}

type Discipline = 'MEN' | 'LADIES' | 'PAIRS' | 'ICE_DANCE' | 'TEAM';
```

#### 赛事模型 (Competition)
```typescript
interface Competition {
  id: string;                    // 赛事ID
  name: string;                  // 赛事名称
  nameEn: string;                // 英文名称
  season: string;                // 赛季(如2023-24)
  type: CompetitionType;         // 赛事类型
  level: CompetitionLevel;       // 赛事等级
  location: string;              // 举办地点
  country: string;               // 举办国家
  startDate: string;             // 开始日期
  endDate: string;               // 结束日期
  disciplines: Discipline[];     // 包含项目
  status: CompetitionStatus;     // 赛事状态
  results: CompetitionResult[];  // 比赛结果
  participants: Participant[];   // 参赛选手
}

type CompetitionType = 'WORLD' | 'EUROPEAN' | 'FOUR_CONTINENTS' | 
                       'OLYMPICS' | 'GP_SERIES' | 'GP_FINAL' | 
                       'NATIONAL' | 'CHALLENGER';
type CompetitionStatus = 'UPCOMING' | 'LIVE' | 'FINISHED' | 'CANCELLED';
```

#### 动作模型 (Move)
```typescript
interface Move {
  id: string;                    // 动作ID
  name: string;                  // 中文名称
  nameEn: string;                // 英文名称
  abbreviation: string;          // 缩写(如3A)
  type: MoveType;                // 动作类型
  difficulty: number;            // 难度等级
  baseValue: number;             // 基础分值
  description: string;           // 动作描述
  keyPoints: string[];           // 技术要点
  commonErrors: string[];        // 常见失误
  imageUrl: string;              // 示例图片
  videoUrl: string;              // 演示视频
  slowMotionUrl: string;         // 慢动作视频
  isBeginner: boolean;           // 是否适合入门
}

type MoveType = 'JUMP' | 'SPIN' | 'STEP_SEQUENCE' | 'LIFT' | 'SPIRAL';
```

#### 题目模型 (Quiz)
```typescript
interface Quiz {
  id: string;                    // 题目ID
  question: string;              // 题目内容
  type: QuizType;                // 题目类型
  category: QuizCategory;        // 题目分类
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  options: QuizOption[];         // 选项(选择题)
  correctAnswer: string;         // 正确答案
  explanation: string;           // 答案解析
  relatedKnowledge: string[];    // 相关知识点
  imageUrl: string;              // 配图(可选)
}

type QuizType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'IMAGE_GUESS';
type QuizCategory = 'BASICS' | 'MOVES' | 'RULES' | 'HISTORY' | 'SKATERS';
```

### 3.2 数据存储策略

#### 本地缓存 (Preferences)
- 用户偏好设置
- 语言选择
- 主题设置
- 最近浏览记录
- 答题进度

#### 关系型数据库 (RdbStore)
- 选手档案数据
- 赛事历史数据
- 动作图鉴数据
- 题库数据
- 用户答题记录

#### 远程数据同步
- 实时赛况数据 (ISU官方API)
- 最新排名数据
- 赛事日程更新

## 四、UI组件体系

### 4.1 基础组件

```
components/
├── common/
│   ├── IceNavBar.ets           # 统一导航栏
│   ├── IceCard.ets             # 卡片容器
│   ├── IceButton.ets           # 按钮组件
│   ├── IceTag.ets              # 标签组件
│   ├── IceSearchBar.ets        # 搜索栏
│   ├── IceFilterBar.ets        # 筛选栏
│   ├── IceLoading.ets          # 加载状态
│   └── IceEmpty.ets            # 空状态
│
├── competition/
│   ├── CompetitionCard.ets     # 赛事卡片
│   ├── ResultTable.ets         # 成绩表格
│   └── ScoreBreakdown.ets      # 分数拆解
│
├── skater/
│   ├── SkaterCard.ets          # 选手卡片
│   ├── MedalDisplay.ets        # 奖牌展示
│   └── ScoreChart.ets          # 分数图表
│
├── wiki/
│   ├── MoveCard.ets            # 动作卡片
│   ├── TermTooltip.ets         # 术语提示
│   └── DifficultyBadge.ets     # 难度徽章
│
└── quiz/
    ├── QuizCard.ets            # 题目卡片
    ├── AnswerResult.ets        # 答题结果
    └── ProgressBar.ets         # 进度条
```

### 4.2 响应式布局策略

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

## 五、核心功能实现方案

### 5.1 首页模块

**功能要点**：
1. 轮播横幅：重大赛事预告 + 科普专题
2. 实时赛况：正在进行的赛事、领奖台
3. 热门选手榜：人气排名 + 简介
4. 每日一识：推送花滑小知识
5. 赛事日历：近期赛事预告
6. 快速入口：直达核心功能

**技术实现**：
- 使用 Swiper 组件实现轮播
- 使用 GridRow/GridCol 实现响应式卡片布局
- 定时器自动刷新实时数据
- 本地缓存每日一识内容

### 5.2 赛事中心

**功能要点**：
1. 赛事列表：按年份/赛季/类型筛选
2. 赛事详情：出场顺序、分段成绩、技术协议
3. 赛事日历：未来赛事预告
4. 赛果复盘：总分、技术分/内容分拆分

**技术实现**：
- 使用 List + LazyForEach 实现长列表懒加载
- 使用 Tabs 组件切换不同视图
- 数据分页加载，支持上拉加载更多
- 赛事详情使用 Scroll + Column 布局

### 5.3 动作图鉴

**功能要点**：
1. 分类展示：跳跃、旋转、步法、托举、螺旋线
2. 动作详情：图解、慢动作、分值说明
3. 难度排序：从入门到顶级
4. 搜索功能：按难度/类型/名称搜索

**技术实现**：
- 使用 Grid 组件展示动作网格
- 使用 Video 组件播放演示视频
- 支持全屏查看慢动作
- 使用 Search 组件实现搜索

### 5.4 知识闯关

**功能要点**：
1. 题库分类：入门、动作、规则、历史、选手
2. 模式选择：每日闯关、随机刷题、专项练习
3. 难度分级：萌新/进阶/资深
4. 成就体系：答题解锁徽章

**技术实现**：
- 使用 Progress 组件显示进度
- 使用 Dialog 组件显示答题结果
- 本地存储答题记录和成就
- 使用 Canvas 绘制徽章

### 5.5 计分模拟器

**功能要点**：
1. 手动录入动作
2. 自动计算技术分(TES)、内容分(PCS)
3. 标注基础分值、扣分规则
4. 保存模拟记录，对比节目

**技术实现**：
- 复用现有 ScoreCalculator 工具类
- 使用 Canvas 绘制分数图表
- 支持导出计算结果
- 本地保存历史记录

## 六、性能优化方案

### 6.1 数据加载优化
- 长列表使用 LazyForEach 懒加载
- 图片使用异步加载和缓存
- 分页加载，避免一次性加载过多数据

### 6.2 渲染性能优化
- 使用 @Observed 和 @ObjectLink 优化状态更新
- 避免在 build 方法中进行耗时计算
- 使用 Worker 处理复杂计算

### 6.3 网络优化
- 使用 HTTP 缓存策略
- 预加载关键数据
- 离线模式支持

## 七、开发计划

### Phase 1: 基础架构 (Week 1-2)
- [x] 项目初始化
- [ ] 数据模型定义
- [ ] 通用组件开发
- [ ] 路由配置
- [ ] 状态管理框架

### Phase 2: 核心功能 (Week 3-4)
- [ ] 首页模块
- [ ] 赛事中心
- [ ] 选手档案
- [ ] 数据纪录

### Phase 3: 科普功能 (Week 5-6)
- [ ] 花滑百科
- [ ] 动作图鉴
- [ ] 术语词典
- [ ] 赛事入门

### Phase 4: 互动功能 (Week 7-8)
- [ ] 知识闯关
- [ ] 动作猜猜看
- [ ] 节目赏析
- [ ] 计分工具增强

### Phase 5: 优化与测试 (Week 9-10)
- [ ] 性能优化
- [ ] 响应式适配
- [ ] 多语言支持
- [ ] 测试与修复

## 八、技术难点与解决方案

### 8.1 实时赛况数据同步
**难点**：ISU官方数据获取
**方案**：
- 对接ISU官方API（如有）
- 使用第三方数据源（如skatingscores.com）
- 人工录入关键赛事数据

### 8.2 大量数据存储与查询
**难点**：选手、赛事数据量大
**方案**：
- 使用关系型数据库建立索引
- 数据分表存储
- 实现全文搜索功能

### 8.3 视频资源加载
**难点**：动作演示视频体积大
**方案**：
- 使用视频压缩和转码
- 实现视频预加载
- 提供不同清晰度选项

### 8.4 多语言支持
**难点**：中英双语实时切换
**方案**：
- 使用资源文件管理多语言
- 实现全局语言状态管理
- 支持动态切换

## 九、扩展性设计

### 9.1 插件化架构
- 预留第三方数据源接口
- 支持自定义主题
- 可扩展新的题型

### 9.2 数据更新机制
- 支持在线数据更新
- 版本控制和增量更新
- 用户贡献数据审核机制

### 9.3 社区功能预留
- 新手问答社区接口
- 用户评论系统
- 内容举报机制

---

**文档版本**: v1.0
**创建日期**: 2024-01-XX
**维护者**: 开发团队
