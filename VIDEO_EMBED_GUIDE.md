# README视频嵌入说明

## ✅ 已完成

### 1. 删除应用演示动图
- ✅ 已删除README顶部的应用演示动图（SimpleCalculator.gif）
- ✅ 保留了主页面截图

## 📹 关于视频嵌入

### GitHub README的限制

**GitHub不支持直接嵌入视频**，原因如下：
- GitHub会过滤掉HTML的`<video>`标签
- 出于安全考虑，GitHub不允许执行JavaScript
- 只支持图片格式（PNG、JPG、GIF、SVG）

### 推荐的替代方案

#### 方案1：使用GIF动图（推荐）⭐

**优点：**
- 直接在README中播放
- 无需跳转外部链接
- 文件体积相对较小

**示例：**
```markdown
<div align="center">
  <img src="screenshots/tutorial_demo.gif" width="400" alt="新手教程演示"/>
  <p><em>新手教程演示动图</em></p>
</div>
```

**如何制作GIF：**
1. 录制教程演示视频（MP4格式）
2. 使用工具转换为GIF：
   - 在线工具：https://ezgif.com/video-to-gif
   - 本地工具：ScreenToGif（Windows）、Gifski（Mac）
3. 优化GIF大小（建议<5MB）

#### 方案2：视频截图+链接

**优点：**
- 可以链接到高清视频
- 支持更长的演示内容
- 可以添加播放按钮效果

**示例：**
```markdown
<div align="center">
  <a href="https://www.bilibili.com/video/BV1xx411c7mD" target="_blank">
    <img src="screenshots/tutorial_video_cover.png" width="400" alt="新手教程视频"/>
  </a>
  <p><em>📺 点击观看新手教程视频</em></p>
</div>
```

**视频托管平台推荐：**
- **Bilibili**（国内推荐）：https://www.bilibili.com
- **YouTube**：https://www.youtube.com
- **腾讯视频**：https://v.qq.com

#### 方案3：使用HTML5 video标签（仅本地预览）

**注意：** 此方法在GitHub上无效，仅在本地Markdown预览器中有效

```markdown
<video width="400" controls>
  <source src="screenshots/tutorial.mp4" type="video/mp4">
  您的浏览器不支持视频标签。
</video>
```

---

## 🎯 针对本项目的建议

### 新手教程部分

当前新手教程页面（GameTutorialPage.ets）是一个交互式的步骤演示，建议：

#### 推荐方案：录制GIF动图

**步骤：**
1. 运行应用，进入新手教程页面
2. 录制完整的教程演示过程（从开始到结束）
3. 转换为GIF动图
4. 保存为 `screenshots/tutorial_demo.gif`
5. 在README中添加：

```markdown
<div align="center">
  <img src="screenshots/tutorial_demo.gif" width="400" alt="新手教程演示"/>
  <p><em>新手教程演示动图</em></p>
</div>
```

**录制建议：**
- 录制完整的8个教程步骤
- 每个步骤停留2-3秒
- 总时长控制在15-20秒
- GIF大小控制在3-5MB

#### 备选方案：上传到Bilibili

**步骤：**
1. 录制高清视频（MP4格式，1080p）
2. 上传到Bilibili
3. 获取视频链接
4. 制作视频封面截图
5. 在README中添加链接

**示例：**
```markdown
<div align="center">
  <a href="https://www.bilibili.com/video/BV1xx411c7mD" target="_blank">
    <img src="screenshots/tutorial_video_cover.png" width="400" alt="新手教程视频"/>
  </a>
  <p><em>📺 点击观看新手教程视频（Bilibili）</em></p>
</div>
```

---

## 📝 当前README的新手教程部分

当前已有静态截图：

```markdown
<div align="center">
  <img src="screenshots/tutorial_page.png" width="300" alt="新手教程"/>
  <p><em>新手教程页面</em></p>
</div>
```

**建议添加动态演示：**

可以在截图下方添加：

```markdown
<div align="center">
  <img src="screenshots/tutorial_page.png" width="300" alt="新手教程"/>
  <p><em>新手教程页面</em></p>
</div>

**🎮 动态演示**

<div align="center">
  <img src="screenshots/tutorial_demo.gif" width="400" alt="新手教程演示"/>
  <p><em>新手教程演示动图</em></p>
</div>
```

或者：

```markdown
<div align="center">
  <img src="screenshots/tutorial_page.png" width="300" alt="新手教程"/>
  <p><em>新手教程页面</em></p>
</div>

**📺 视频教程**

<div align="center">
  <a href="https://www.bilibili.com/video/BV1xx411c7mD" target="_blank">
    <img src="screenshots/tutorial_video_cover.png" width="400" alt="新手教程视频"/>
  </a>
  <p><em>点击观看新手教程视频</em></p>
</div>
```

---

## 🛠️ 推荐工具

### GIF制作工具

1. **ScreenToGif**（Windows，免费）
   - 下载：https://www.screentogif.com/
   - 功能强大，可编辑、压缩、优化

2. **Gifski**（Mac，免费）
   - 高质量GIF生成
   - 命令行工具

3. **ezgif.com**（在线，免费）
   - 网址：https://ezgif.com/video-to-gif
   - 无需安装，直接使用

### 视频录制工具

1. **OBS Studio**（跨平台，免费）
   - 专业录屏软件
   - 支持多种格式

2. **Windows Game Bar**（Windows 10/11内置）
   - Win + G 快捷键
   - 简单易用

3. **QuickTime Player**（Mac内置）
   - 文件 → 新建屏幕录制
   - 无需额外安装

---

## ✨ 总结

1. **已删除**：README顶部的应用演示动图
2. **视频嵌入**：GitHub不支持直接嵌入视频
3. **推荐方案**：
   - 使用GIF动图（最佳体验）
   - 使用视频链接+封面图（适合长视频）
4. **下一步**：
   - 录制新手教程演示
   - 转换为GIF或上传视频平台
   - 更新README

**建议优先使用GIF动图方案，用户体验最佳！** 🎬
