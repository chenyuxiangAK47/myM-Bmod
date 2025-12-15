# 快速开始功能 - 参考模组

## 已实现的类似模组

### 1. **QuickStart** (Nexus Mods #2524)
- **功能**：一键开始新游戏，可跳过角色创建
- **链接**：https://www.nexusmods.com/mountandblade2bannerlord/mods/2524
- **特点**：
  - 专为测试者和模组开发者设计
  - 可配置跳过哪些菜单
  - 支持跳过角色创建
- **建议**：查看源代码，了解如何实现

### 2. **Skip Intro and Character Creation** (Nexus Mods #3696)
- **功能**：跳过开场动画和角色创建
- **链接**：https://www.nexusmods.com/mountandblade2bannerlord/mods/3696
- **特点**：
  - 通过代码实现，不修改原版文件
  - 有配置文件可以开关功能
- **建议**：查看实现方式

### 3. **Useful Skips** (Nexus Mods #4896)
- **功能**：跳过开场、角色创建、教程
- **链接**：https://www.nexusmods.com/mountandblade2bannerlord/mods/4896
- **特点**：
  - 从主菜单直接开始新战役
  - 最少点击次数
- **建议**：查看如何修改主菜单

## 实现方案对比

### 方案 1：使用 UIExtenderEx（推荐）
- **优点**：
  - 比 Harmony 补丁更简单
  - 更稳定，不容易崩溃
  - 有官方文档和示例
- **缺点**：
  - 需要添加 UIExtenderEx 依赖
- **参考**：
  - UIExtenderEx GitHub: https://github.com/BUTR/Bannerlord.UIExtenderEx
  - BannerCraft 模组示例: https://github.com/6135/Bannerlord.BannerCraft

### 方案 2：参考 QuickStart 模组
- **优点**：
  - 功能完全匹配
  - 已经验证可用
- **缺点**：
  - 需要下载并查看源代码
- **建议**：
  1. 从 Nexus Mods 下载 QuickStart 模组
  2. 查看其源代码（通常在 GitHub）
  3. 参考其实现方式

### 方案 3：继续使用 Harmony（当前方案）
- **优点**：
  - 已经部分实现
- **缺点**：
  - 容易崩溃（已遇到）
  - 需要精确的类名和方法名
  - 调试困难

## 推荐行动

1. **下载 QuickStart 模组源代码**
   - 从 Nexus Mods 或 GitHub 获取
   - 查看其如何实现主菜单按钮
   - 参考其跳过角色创建的逻辑

2. **或改用 UIExtenderEx**
   - 添加 UIExtenderEx 依赖
   - 使用 XML 补丁扩展主菜单
   - 更简单、更稳定

3. **查看现有模组示例**
   - BannerCraft 使用 UIExtenderEx
   - 其他使用 Harmony 的模组

## 下一步

你希望我：
1. 帮你下载并分析 QuickStart 模组的源代码？
2. 改用 UIExtenderEx 实现（需要添加依赖）？
3. 继续调试当前的 Harmony 实现？

