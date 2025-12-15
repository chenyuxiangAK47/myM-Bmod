# 崩溃分析报告 - 2025-12-15_15.45.01

## 崩溃类型

**ExceptionCode: 0xE0434352** - .NET CLR Exception（托管代码异常）

## 主要问题

### 1. 版本依赖不匹配（从图片警告可见）

**ButterLib 和 UIExtenderEx 的依赖冲突：**
- **需要**：`Bannerlord.Harmony(v2.2.2.0)`
- **实际加载**：`Bannerlord.Harmony(v2.3.6.220)`

**NordThrowingAxeMod 的依赖：**
- 依赖核心模组版本为 `i-1.-1.-1.-1`（通配符，应该没问题）

### 2. 模组重复加载

从日志中看到加载顺序：
```
*Bannerlord.Harmony*Bannerlord.UIExtenderEx*Bannerlord.UIExtenderEx*Bannerlord.Harmony*...
```

**发现的模组文件夹：**
1. `Bannerlord.Harmony` - 官方版本（v2.3.6.220）
2. `Bannerlord.UIExtenderEx` - 官方版本
3. `maybeHarmony` - 实际是 UIExtenderEx v2.13.2
4. `maybeUi` - 实际是 Harmony v2.4.2.0

**问题**：游戏同时加载了多个 Harmony 和 UIExtenderEx 版本，导致冲突。

### 3. 崩溃发生时机

从日志看，崩溃发生在：
- Harmony DLL 加载成功
- UIExtenderEx DLL 加载成功
- 开始解析 `MonoMod.Utils` 时崩溃

最后一行日志：
```
[23:44:59.189] Resolving: MonoMod.Utils, Version=25.0.8.0, Culture=neutral, PublicKeyToken=null
```

## 解决方案

### 方案 1：禁用多余的模组文件夹（推荐）

**删除或重命名以下文件夹，只保留一个版本：**

1. **Harmony**：只保留 `Bannerlord.Harmony`（官方版本）
   - 删除或重命名 `maybeUi` 文件夹（因为它也是 Harmony）

2. **UIExtenderEx**：只保留 `Bannerlord.UIExtenderEx`（官方版本）
   - 删除或重命名 `maybeHarmony` 文件夹（因为它也是 UIExtenderEx）

### 方案 2：统一版本依赖

更新 `SubModule.xml` 中的依赖版本，使其与实际加载的版本匹配：

```xml
<DependedModule Id="Bannerlord.Harmony" DependentVersion="v2.3.6"/>
```

### 方案 3：使用 maybeUi 和 maybeHarmony（如果它们是最新版本）

如果 `maybeUi` (Harmony v2.4.2.0) 和 `maybeHarmony` (UIExtenderEx v2.13.2) 是最新版本：

1. 删除 `Bannerlord.Harmony` 和 `Bannerlord.UIExtenderEx` 文件夹
2. 重命名：
   - `maybeUi` → `Bannerlord.Harmony`
   - `maybeHarmony` → `Bannerlord.UIExtenderEx`
3. 更新 `SubModule.xml` 中的依赖版本

## 当前状态

- ✅ `NordThrowingAxeMod.dll` 已编译成功
- ❌ 游戏在加载模组时崩溃（版本冲突）
- ❌ 多个 Harmony/UIExtenderEx 版本同时加载

## 建议的修复步骤

1. **立即修复**：重命名或删除 `maybeHarmony` 和 `maybeUi` 文件夹
2. **检查版本**：确认 `Bannerlord.Harmony` 和 `Bannerlord.UIExtenderEx` 的版本
3. **更新依赖**：在 `SubModule.xml` 中更新版本号以匹配实际版本
4. **重新测试**：启动游戏看是否还有崩溃

