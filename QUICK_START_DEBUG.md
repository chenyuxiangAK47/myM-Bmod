# 快速开始功能调试指南

## 问题
主菜单没有显示"快速开始"按钮

## 可能的原因
1. Harmony 补丁没有正确应用
2. 类名或方法名不对
3. DLL 没有正确加载

## 调试步骤

### 1. 检查 DLL 是否编译成功
- 位置：`bin\Win64_Shipping_Client\NordThrowingAxeMod.dll`
- 应该存在且最近修改时间是最新的

### 2. 检查游戏日志
- 游戏日志位置通常在：`Documents\Mount and Blade II Bannerlord\Logs\`
- 查找包含 "快速开始" 或 "QuickStart" 的日志
- 查找 Harmony 补丁相关的错误

### 3. 检查 SubModule.xml
- 确认 `SubModuleClass` 已启用
- 确认 Harmony 依赖已添加

### 4. 测试方法
1. 启动游戏
2. 查看主菜单是否有"快速开始"按钮
3. 如果没有，检查游戏日志中的错误信息

## 当前实现
- 快速开始逻辑：点击按钮 -> 选择文化 -> 直接开始游戏（跳过角色创建的其他步骤）

## 下一步
如果按钮仍然不显示，可能需要：
1. 使用 UIExtenderEx 而不是 Harmony
2. 或者修改现有的"新沙盒"按钮行为
3. 或者使用不同的补丁方法


