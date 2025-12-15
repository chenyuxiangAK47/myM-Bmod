# Harmony 补丁技术说明

## 什么是 Harmony？

**Harmony** 是一个用于 .NET 程序的**运行时补丁库**（Runtime Patching Library），它允许你在不修改原始代码的情况下，动态修改已编译程序的行为。

## 📥 如何获取 Harmony？

### 方法 1：使用 Bannerlord.Harmony 模组（推荐）

**Bannerlord.Harmony** 是 Bannerlord 社区开发的 Harmony 集成模组，已经为你准备好了所有必要的文件。

#### 下载方式

1. **Nexus Mods**（推荐）：
   - 网址：https://www.nexusmods.com/mountandblade2bannerlord/mods/2006
   - 直接下载并解压到 `Modules` 文件夹

2. **Steam Workshop**：
   - 在 Steam 创意工坊搜索 "Harmony" 或 "Bannerlord.Harmony"
   - 订阅后自动安装到 `Modules` 文件夹

3. **GitHub**：
   - 源代码：https://github.com/BUTR/Bannerlord.Harmony
   - 可以下载预编译版本或自己编译

#### 安装位置

安装后，Harmony 模组应该在：
```
Mount & Blade II Bannerlord\Modules\Bannerlord.Harmony\
```

#### 检查是否已安装

你的系统已经安装了 `Bannerlord.Harmony`（在 `Modules\Bannerlord.Harmony\` 目录下），可以直接使用！

### 方法 2：自己集成 Harmony 库（不推荐）

理论上可以自己创建，但**不推荐**，因为：

❌ **需要手动处理**：
- 下载 Harmony 核心库（`0Harmony.dll`）
- 下载 Mono.Cecil 等依赖库
- 创建 SubModule 来加载这些库
- 处理版本兼容性问题

✅ **使用 Bannerlord.Harmony 的优势**：
- 已经配置好所有依赖
- 社区维护，及时更新
- 与其他模组兼容性更好
- 开箱即用

#### 如果一定要自己创建

需要：
1. 从 NuGet 下载 `Lib.Harmony` 包
2. 获取 `0Harmony.dll`
3. 创建自己的 SubModule 加载它
4. 处理所有依赖关系

**结论：直接使用 Bannerlord.Harmony 模组更简单！**

### 核心概念

1. **运行时补丁（Runtime Patching）**：
   - 在程序运行时，修改已编译的方法
   - 不需要修改原始源代码
   - 不需要重新编译游戏

2. **前缀/后缀/转接器（Prefix/Postfix/Transpiler）**：
   - **Prefix**：在原方法执行**之前**执行你的代码
   - **Postfix**：在原方法执行**之后**执行你的代码
   - **Transpiler**：修改原方法的 IL 代码（更高级）

## 在 Bannerlord 中的应用

### Bannerlord.Harmony 模组

Bannerlord 社区开发了 `Bannerlord.Harmony` 模组，它：
- 将 Harmony 库集成到 Bannerlord 中
- 为模组开发者提供补丁功能
- 是许多高级模组的基础依赖

### 为什么需要 Harmony？

Bannerlord 的官方 API 有限，很多功能无法通过标准 API 实现，例如：
- 修改主菜单界面
- 跳过角色创建流程
- 修改游戏核心逻辑
- 拦截和修改游戏事件

## 如何使用 Harmony 补丁

### 1. 基本结构

```csharp
using HarmonyLib;
using TaleWorlds.MountAndBlade;

[HarmonyPatch(typeof(目标类), "目标方法名")]
public class MyPatch
{
    // Prefix：在原方法执行前运行
    [HarmonyPrefix]
    static bool Prefix(/* 原方法的参数 */)
    {
        // 你的代码
        // 返回 false 可以阻止原方法执行
        return true; // 返回 true 继续执行原方法
    }
    
    // Postfix：在原方法执行后运行
    [HarmonyPostfix]
    static void Postfix(/* 原方法的参数 */)
    {
        // 你的代码
    }
}
```

### 2. 实际示例：跳过角色创建

假设你想跳过角色创建流程，可以这样写：

```csharp
using HarmonyLib;
using TaleWorlds.CampaignSystem.CharacterCreation;

[HarmonyPatch(typeof(CharacterCreationState), "OnNextStage")]
public class SkipCharacterCreationPatch
{
    [HarmonyPrefix]
    static bool Prefix(CharacterCreationState __instance)
    {
        // 如果已经设置了快速开局标志，直接跳过
        if (QuickStartHelper.IsQuickStartMode)
        {
            // 使用默认角色数据
            QuickStartHelper.CreateDefaultCharacter();
            // 返回 false 阻止原方法执行
            return false;
        }
        return true; // 否则正常执行
    }
}
```

### 3. 注册补丁

在你的 SubModule 中注册：

```csharp
protected override void OnSubModuleLoad()
{
    base.OnSubModuleLoad();
    
    // 创建 Harmony 实例
    var harmony = new Harmony("com.yourname.yourmod");
    
    // 应用所有标记了 [HarmonyPatch] 的补丁
    harmony.PatchAll();
}
```

## 在快速开局功能中的应用

### 当前实现（不使用 Harmony）

我们目前的实现：
- 使用 `OnCampaignStart` 钩子
- 在角色创建**完成后**给玩家金币
- **无法跳过**角色创建流程

### 使用 Harmony 的改进方案

如果要完全跳过角色创建，需要：

1. **补丁角色创建流程**：
   ```csharp
   [HarmonyPatch(typeof(CharacterCreationState), "OnNextStage")]
   public class SkipCharacterCreationPatch
   {
       [HarmonyPrefix]
       static bool Prefix()
       {
           // 检测快速开局模式
           // 直接跳转到游戏开始
           return false; // 阻止原流程
       }
   }
   ```

2. **补丁主菜单**：
   ```csharp
   [HarmonyPatch(typeof(MainMenu), "OnInitialize")]
   public class AddQuickStartButtonPatch
   {
       [HarmonyPostfix]
       static void Postfix()
       {
           // 添加"快速开局"按钮到主菜单
       }
   }
   ```

3. **创建默认角色**：
   ```csharp
   [HarmonyPatch(typeof(CharacterCreationContent), "CreatePlayerCharacter")]
   public class QuickStartCharacterPatch
   {
       [HarmonyPrefix]
       static bool Prefix(ref CharacterObject character)
       {
           // 使用预设的默认角色数据
           character = QuickStartHelper.CreateDefaultCharacter();
           return false; // 跳过原方法
       }
   }
   ```

## 优缺点分析

### 优点

✅ **功能强大**：可以修改游戏核心逻辑  
✅ **灵活性高**：几乎可以修改任何方法  
✅ **无需源码**：不需要游戏源代码  
✅ **社区支持**：Bannerlord 社区广泛使用

### 缺点

❌ **复杂度高**：需要理解游戏内部结构  
❌ **兼容性风险**：游戏更新可能破坏补丁  
❌ **调试困难**：运行时错误难以定位  
❌ **依赖外部库**：需要 Bannerlord.Harmony 模组

## 是否需要使用 Harmony？

### 当前快速开局功能

**不需要 Harmony**，因为：
- 我们的需求很简单（给金币）
- 标准 API 已经足够
- 避免额外的依赖和复杂度

### 如果需要完全跳过角色创建

**需要 Harmony**，因为：
- 标准 API 无法跳过角色创建流程
- 需要修改游戏内部状态机
- 需要拦截多个游戏方法

## 总结

**Harmony 补丁**是一种强大的模组开发技术，允许你在运行时修改游戏行为。对于简单的功能（如给金币），标准 API 就足够了。但对于复杂功能（如跳过角色创建、修改 UI），Harmony 是必要的工具。

---

## 📦 在你的模组中使用 Harmony

### 1. 添加依赖

在你的 `SubModule.xml` 中添加：

```xml
<DependedModules>
    <DependedModule Id="Bannerlord.Harmony" DependentVersion="v2.2.2" />
</DependedModules>
```

### 2. 在 C# 代码中使用

```csharp
using HarmonyLib;
using TaleWorlds.MountAndBlade;

public class MySubModule : MBSubModuleBase
{
    private static Harmony? _harmony;
    
    protected override void OnSubModuleLoad()
    {
        base.OnSubModuleLoad();
        
        // 创建 Harmony 实例（使用你的模组 ID）
        _harmony = new Harmony("com.yourname.yourmod");
        
        // 应用所有补丁
        _harmony.PatchAll();
    }
    
    protected override void OnSubModuleUnloaded()
    {
        base.OnSubModuleUnloaded();
        
        // 清理补丁
        _harmony?.UnpatchAll();
    }
}
```

### 3. 创建补丁类

```csharp
using HarmonyLib;

[HarmonyPatch(typeof(目标类), "目标方法")]
public class MyPatch
{
    [HarmonyPrefix]
    static bool Prefix()
    {
        // 你的代码
        return true;
    }
}
```

## ✅ 总结

- **下载方式**：从 Nexus Mods 或 Steam Workshop 下载 `Bannerlord.Harmony`
- **自己创建**：理论上可以，但不推荐（复杂且没必要）
- **推荐做法**：直接使用 Bannerlord.Harmony 模组

---

**参考资源：**
- Harmony 官方文档：https://harmony.pardeike.net/
- Bannerlord.Harmony（Nexus Mods）：https://www.nexusmods.com/mountandblade2bannerlord/mods/2006
- Bannerlord.Harmony（GitHub）：https://github.com/BUTR/Bannerlord.Harmony
- Bannerlord 模组开发社区：https://github.com/BUTR/Bannerlord.BUTRLoader
