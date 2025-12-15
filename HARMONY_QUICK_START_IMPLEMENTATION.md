# Harmony 快速开局功能实现说明

## 当前实现状态

已创建基础的 Harmony 补丁框架，但需要进一步开发才能完全实现主菜单按钮功能。

## 已实现的内容

1. ✅ **添加 Harmony 依赖**：在 `SubModule.xml` 中添加了 `Bannerlord.Harmony` 依赖
2. ✅ **创建补丁类**：`QuickStartPatches.cs` 包含基础的补丁框架
3. ✅ **更新 SubModule**：`WelcomeMessage.cs` 已更新以支持 Harmony 补丁
4. ✅ **更新项目文件**：`MyMod.csproj` 已添加 Harmony 引用

## 需要完成的工作

### 1. 找到正确的主菜单类和方法

需要找到 Bannerlord 主菜单的实际类名和方法名。可能的类：
- `TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenuVM`
- `TaleWorlds.MountAndBlade.GauntletUI.InitialMenuState`

### 2. 添加主菜单按钮

需要：
- 找到菜单选项列表的初始化方法
- 在列表中添加新的"快速开始"选项
- 实现点击处理逻辑

### 3. 实现跳过角色创建

需要：
- 补丁角色创建状态机
- 创建默认角色数据
- 直接进入游戏

## 关于 ButterLib 和 UIExtenderEx

### ButterLib
- **不需要**：我们的实现不依赖 ButterLib
- 但如果其他模组需要，可以保留

### UIExtenderEx
- **不需要**：我们可以直接用 Harmony 修改主菜单
- 但如果想用更简单的方式，UIExtenderEx 可能更容易

## 下一步

1. **编译 C# 代码**：需要先编译生成 DLL
2. **测试补丁**：在游戏中测试补丁是否生效
3. **完善实现**：根据实际的主菜单类结构完善补丁代码

## 编译说明

要使用 Harmony 补丁，需要：
1. 编译 `MyMod.csproj` 生成 `NordThrowingAxeMod.dll`
2. 将 DLL 放到 `MyMod\bin\Win64_Shipping_Client\` 目录
3. 在 `SubModule.xml` 中取消注释 `SubModuleClass` 行
