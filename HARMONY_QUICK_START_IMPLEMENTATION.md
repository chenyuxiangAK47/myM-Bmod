# Harmony 快速开局功能实现说明

## 当前实现状态

已完善 Harmony 补丁代码，实现了主菜单按钮和跳过角色创建的功能框架。

## 已实现的内容

1. ✅ **添加 Harmony 依赖**：在 `SubModule.xml` 中添加了 `Bannerlord.Harmony` 依赖
2. ✅ **创建补丁类**：`QuickStartPatches.cs` 包含完整的补丁实现
3. ✅ **更新 SubModule**：`WelcomeMessage.cs` 已更新以支持 Harmony 补丁
4. ✅ **更新项目文件**：`MyMod.csproj` 已添加 Harmony 引用

## 补丁功能说明

### 1. MainMenuQuickStartButtonPatch
- **目标**：在主菜单添加"快速开始"按钮
- **方法**：补丁 `InitialMenuVM.RefreshMenuOptions` 方法
- **功能**：在菜单选项列表中添加新的"快速开始"选项

### 2. SkipCharacterCreationPatch
- **目标**：跳过角色创建流程
- **方法**：补丁 `CharacterCreationState.OnNextStage` 方法
- **功能**：如果启用了快速开局模式，直接完成角色创建

### 3. QuickStartGoldPatch
- **目标**：在角色创建完成后显示提示
- **方法**：补丁 `CharacterCreationState.OnFinalize` 方法
- **功能**：显示快速开局金币提示

## 技术细节

### 使用的 Harmony 特性
- **HarmonyPatch**：用于标记补丁类
- **TargetMethod**：动态查找目标方法（用于不确定类名的情况）
- **Postfix**：在原方法执行后执行
- **Prefix**：在原方法执行前执行，可以阻止原方法执行

### 反射使用
由于 Bannerlord 的类可能在不同版本中变化，代码使用了大量反射：
- `AccessTools.TypeByName`：通过名称查找类型
- `AccessTools.Method`：查找方法
- `AccessTools.Property`：查找属性
- `Activator.CreateInstance`：动态创建对象

## 注意事项

1. **类名可能变化**：Bannerlord 的类名可能在不同版本中不同，代码使用了多个备用方案
2. **错误处理**：所有补丁都包含 try-catch，确保不会影响游戏运行
3. **调试信息**：使用 `System.Diagnostics.Debug.WriteLine` 输出调试信息

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
3. **调试和调整**：根据实际运行情况调整补丁代码

## 编译说明

要使用 Harmony 补丁，需要：
1. 编译 `MyMod.csproj` 生成 `NordThrowingAxeMod.dll`
2. 将 DLL 放到 `MyMod\bin\Win64_Shipping_Client\` 目录
3. 在 `SubModule.xml` 中取消注释 `SubModuleClass` 行

## 可能的调整

如果补丁不工作，可能需要：
1. 调整类名（`InitialMenuVM` 的实际命名空间）
2. 调整方法名（`RefreshMenuOptions` 的实际名称）
3. 调整对象创建方式（`InitialMenuOptionVM` 的构造函数参数）


