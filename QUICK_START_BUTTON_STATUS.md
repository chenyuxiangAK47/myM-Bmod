# 快速开始按钮状态

## 当前状态

### ❌ 主菜单按钮：**未实现**
- 当前编译的是**简化版本**（`WelcomeMessageSimple.cs`）
- 不包含 Harmony 补丁代码
- **没有主菜单按钮**

### ✅ 自动给金币：**已实现**
- 每次新游戏自动获得 100,000 金币
- 功能正常工作

---

## 为什么没有按钮？

### 原因
1. **编译的是简化版本**：`MyModFramework.csproj` 只编译 `WelcomeMessageSimple.cs`
2. **Harmony 补丁在完整版本**：`QuickStartPatches.cs` 需要编译 `MyMod.csproj`
3. **需要 .NET SDK**：`MyMod.csproj` 使用 `Microsoft.NET.Sdk`，需要 .NET SDK

---

## 如何实现主菜单按钮？

### 方案 1：编译完整版本（推荐）
1. 安装 .NET SDK
2. 编译 `MyMod.csproj`（包含 Harmony 补丁）
3. 启用 `SubModuleClass`

### 方案 2：修改项目文件
1. 将 `MyMod.csproj` 改为传统 MSBuild 格式
2. 添加 Harmony 引用
3. 编译包含 `QuickStartPatches.cs` 的版本

### 方案 3：使用 UIExtenderEx（如果已安装）
- 使用 UIExtenderEx 扩展主菜单 UI
- 可能比 Harmony 补丁更简单

---

## 当前功能

- ✅ 自动给金币（每次新游戏 100,000 金币）
- ❌ 主菜单按钮（需要编译完整版本）
- ❌ 跳过角色创建（需要 Harmony 补丁）

---

## 建议

**如果只需要自动给金币**：当前版本已经足够

**如果需要主菜单按钮**：需要编译完整版本或使用 UIExtenderEx


