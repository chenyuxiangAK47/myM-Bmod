# 编译指南

## 问题
没有 .NET SDK，无法使用 `dotnet build` 编译。

## 解决方案

### 方案 1：安装 Visual Studio Build Tools（推荐）

1. **下载**
   - 访问：https://visualstudio.microsoft.com/downloads/
   - 点击 "Tools for Visual Studio" → "Build Tools for Visual Studio"
   - 下载安装程序（约 1-2MB）

2. **安装**
   - 运行安装程序
   - 选择 "C++ build tools" 或 ".NET desktop build tools"
   - 确保勾选 ".NET Framework 4.7.2 SDK"
   - 安装（约 1-2GB）

3. **编译**
   ```powershell
   # 设置环境变量
   $env:BANNERLORD_INSTALL_DIR = "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord"
   
   # 找到 MSBuild（通常在以下位置之一）
   # C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe
   # C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\MSBuild.exe
   
   # 编译简化版本（不需要 Harmony）
   & "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\MSBuild.exe" MyModSimple.csproj /p:Configuration=Release
   
   # 或编译完整版本（需要 Harmony）
   & "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\MSBuild.exe" MyMod.csproj /p:Configuration=Release
   ```

### 方案 2：使用简化版本（不需要 Harmony）

如果你暂时无法安装 Build Tools，可以使用简化版本：

1. **使用 `MyModSimple.csproj`**
   - 这个版本不依赖 Harmony
   - 只实现自动给金币功能
   - 编译更简单

2. **编译步骤**
   ```powershell
   # 设置环境变量
   $env:BANNERLORD_INSTALL_DIR = "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord"
   
   # 使用 MSBuild 编译
   msbuild MyModSimple.csproj /p:Configuration=Release
   ```

### 方案 3：使用 Visual Studio（如果有）

如果你有 Visual Studio（任何版本）：
1. 打开 Visual Studio
2. 打开 `MyMod.csproj` 或 `MyModSimple.csproj`
3. 设置环境变量 `BANNERLORD_INSTALL_DIR`
4. 构建项目

### 方案 4：在线编译（不推荐）

- 需要上传源代码
- 需要手动配置引用
- 不推荐用于 Bannerlord 模组

## 推荐流程

1. **先尝试方案 1**：安装 Build Tools
2. **如果不行，使用方案 2**：简化版本
3. **编译成功后**：
   - DLL 会在 `bin\Win64_Shipping_Client\NordThrowingAxeMod.dll`
   - 取消注释 `SubModule.xml` 中的 `SubModuleClass` 行
   - 启动游戏测试

## 文件说明

- `MyMod.csproj`：完整版本（需要 Harmony）
- `MyModSimple.csproj`：简化版本（不需要 Harmony，只给金币）
- `WelcomeMessage.cs`：完整版本代码
- `WelcomeMessageSimple.cs`：简化版本代码


