# 截图添加指南

## 📸 需要添加的截图列表

### 主界面截图
- [ ] `main_page.png` - 主页面（功能选择页面）

### 技术元素计算器截图
- [ ] `technical_calculator_home.png` - 技术元素计算器主界面
- [ ] `technical_element_select.png` - 元素选择界面
- [ ] `technical_goe_select.png` - GOE评分选择界面
- [ ] `technical_score_result.png` - 得分计算结果展示

### 花样滑冰解谜游戏截图
- [ ] `game_mode.png` - 游戏模式选择页面
- [ ] `level_select.png` - 关卡选择页面
- [ ] `puzzle_game.png` - 解谜游戏主界面
- [ ] `game_board.png` - 3×3棋盘展示
- [ ] `action_cards.png` - 动作卡牌展示
- [ ] `target_pattern.png` - 目标图案展示

### 游戏模式截图
- [ ] `tutorial_page.png` - 新手教程页面
- [ ] `classic_mode.png` - 经典模式界面
- [ ] `daily_challenge.png` - 每日挑战界面

### 其他功能截图
- [ ] `leaderboard.png` - 排行榜页面
- [ ] `game_help.png` - 游戏帮助页面
- [ ] `level_complete.png` - 关卡完成界面

## 🎯 如何获取截图

### 方法一：使用DevEco Studio模拟器

1. 在DevEco Studio中打开项目
2. 点击运行按钮，启动模拟器
3. 导航到需要截图的页面
4. 使用模拟器的截图功能（通常在工具栏）

### 方法二：使用真机调试

1. 连接华为手机到电脑
2. 在DevEco Studio中选择真机运行
3. 导航到需要截图的页面
4. 使用手机的截图功能（通常是电源键+音量下键）

### 方法三：使用Windows截图工具

1. 运行应用后，使用Windows自带的截图工具
2. 按 `Win + Shift + S` 启动截图
3. 选择需要截图的区域
4. 保存到screenshots文件夹

## 📋 截图规范

### 格式要求
- **文件格式**: PNG（保证清晰度）
- **分辨率**: 建议 1080x2340 或设备实际分辨率
- **文件大小**: 单个文件不超过 2MB
- **命名规范**: 英文小写，下划线分隔

### 内容要求
- ✅ 确保截图清晰，文字可读
- ✅ 展示完整界面或关键功能区域
- ✅ 包含必要的交互元素
- ❌ 避免包含敏感信息（如真实用户数据）
- ❌ 避免包含调试信息

### 建议的截图内容

#### 主页面 (`main_page.png`)
- 完整展示两个功能模块入口
- 清晰显示应用标题和底部信息

#### 技术元素计算器 (`technical_calculator_home.png`, `technical_element_select.png`, `technical_goe_select.png`, `technical_score_result.png`)
- 展示计算器主界面布局
- 展示元素选择界面（跳跃、旋转、步法）
- 展示GOE评分选择界面
- 展示得分计算结果和总分

#### 游戏模式选择 (`game_mode.png`)
- 展示所有游戏模式选项
- 清晰显示每个模式的图标和描述

#### 关卡选择 (`level_select.png`)
- 展示难度筛选标签
- 展示关卡列表和进度

#### 解谜游戏主界面 (`puzzle_game.png`)
- 展示完整的游戏界面
- 包含棋盘、卡牌、目标图案

#### 棋盘展示 (`game_board.png`)
- 特写3×3棋盘
- 清晰显示奖牌类型

#### 动作卡牌 (`action_cards.png`)
- 展示手牌区域
- 清晰显示卡牌图标和名称

#### 目标图案 (`target_pattern.png`)
- 展示目标图案区域
- 清晰显示需要达成的目标

#### 新手教程 (`tutorial_page.png`)
- 展示教程界面
- 包含步骤说明和演示区域

#### 排行榜 (`leaderboard.png`)
- 展示排名列表
- 清晰显示排名信息和分数

#### 游戏帮助 (`game_help.png`)
- 展示帮助页面内容
- 清晰显示规则说明

#### 关卡完成 (`level_complete.png`)
- 展示完成界面
- 包含得分和评价信息

## 🔧 截图后处理

### 可选的优化步骤

1. **压缩图片**（如需要）
   ```bash
   # 使用图片压缩工具
   # 保持清晰度的同时减小文件大小
   ```

2. **添加标注**（可选）
   - 使用图片编辑工具添加箭头或文字说明
   - 突出关键功能区域

3. **统一尺寸**（可选）
   - 确保所有截图尺寸一致
   - 提升README的视觉效果

## ✅ 完成检查清单

添加截图后，请检查：

- [ ] 所有截图文件都已保存到 `screenshots/` 文件夹
- [ ] 文件名与README中引用的路径一致
- [ ] 图片清晰度足够，文字可读
- [ ] 图片文件大小合理（建议每个文件 < 2MB）
- [ ] README中的图片链接可以正常显示
- [ ] 在GitHub上预览README，确认图片显示正常

## 📝 更新README

添加截图后，README会自动显示这些图片。如果需要调整图片大小或布局，可以修改README.md中的图片标签：

```markdown
<!-- 调整图片大小 -->
<img src="screenshots/your_image.png" width="300" alt="描述"/>

<!-- 居中显示 -->
<div align="center">
  <img src="screenshots/your_image.png" width="300" alt="描述"/>
  <p><em>图片说明</em></p>
</div>

<!-- 并排显示多张图片 -->
<div align="center">
  <img src="screenshots/image1.png" width="300" alt="描述1"/>
  <img src="screenshots/image2.png" width="300" alt="描述2"/>
  <p><em>图片说明</em></p>
</div>
```

---

**提示**: 如果暂时没有截图，README中的图片链接会显示为占位符，不影响文档的阅读。建议尽快添加实际截图以提升文档质量。
