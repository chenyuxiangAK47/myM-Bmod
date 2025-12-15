# 简化版快速开局（不需要编译）

如果你暂时无法编译 DLL，可以使用这个简化版本，它只使用 XML 配置，不需要 C# 代码。

## 当前可用的功能

当前的 `WelcomeMessage.cs` 已经实现了**自动给金币**功能，但需要编译成 DLL。

## 临时解决方案

### 选项 1：等待编译 DLL
- 安装 Visual Studio Build Tools
- 编译 `MyMod.csproj`
- 启用 `SubModuleClass`

### 选项 2：使用现有的自动给金币功能
当前代码已经实现了：
- 每次新游戏自动给 100,000 金币
- 不需要主菜单按钮
- 不需要跳过角色创建

只需要：
1. 编译 DLL
2. 取消注释 `SubModule.xml` 中的 `SubModuleClass` 行

### 选项 3：完全移除 Harmony 依赖（最简化）

如果 Harmony 补丁太复杂，可以：
1. 移除 `QuickStartPatches.cs`
2. 简化 `WelcomeMessage.cs`（移除 Harmony 相关代码）
3. 只保留自动给金币功能

## 推荐方案

**如果你想要最简单的实现**：
1. 暂时不使用 Harmony 补丁
2. 只保留自动给金币功能
3. 等有编译环境后再添加主菜单按钮

这样至少可以：
- ✅ 每次新游戏自动给金币
- ✅ 不需要手动操作
- ✅ 不需要编译复杂代码


