# 编译替代方案

由于没有 .NET SDK，这里提供几个替代方案来编译 DLL 或实现快速开局功能。

## 方案 1：使用 Visual Studio Build Tools（推荐）

### 步骤：
1. **下载 Visual Studio Build Tools**
   - 访问：https://visualstudio.microsoft.com/downloads/
   - 下载 "Build Tools for Visual Studio"
   - 安装时选择 ".NET Framework 4.7.2 开发工具"

2. **编译项目**
   ```powershell
   # 找到 MSBuild 路径（通常在）
   # C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe
   
   # 设置环境变量
   $env:BANNERLORD_INSTALL_DIR = "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord"
   
   # 编译
   & "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe" MyMod.csproj /p:Configuration=Release
   ```

## 方案 2：使用在线编译服务

### 选项 A：使用 .NET Fiddle 或类似服务
- 不推荐，因为需要引用 Bannerlord DLL

### 选项 B：使用 GitHub Actions（如果有 GitHub 仓库）
- 可以设置自动编译

## 方案 3：简化实现（临时方案）

暂时不使用 Harmony 补丁，只保留自动给金币的功能：
- 当前 `WelcomeMessage.cs` 已经实现了自动给金币
- 只需要取消注释 `SubModule.xml` 中的 `SubModuleClass` 行
- 但需要先编译生成 DLL

## 方案 4：手动编译指导

如果你有 Visual Studio（任何版本）：
1. 打开 Visual Studio
2. 打开 `MyMod.csproj`
3. 设置 `BANNERLORD_INSTALL_DIR` 环境变量
4. 构建项目

## 方案 5：使用预编译的 DLL（如果可用）

如果有其他 Bannerlord 模组开发者可以帮忙编译，可以：
1. 提供源代码
2. 让他们编译
3. 获取编译好的 DLL

## 当前状态

- ✅ 代码已完成
- ❌ 需要编译生成 DLL
- ⚠️ 没有 .NET SDK 或 Visual Studio

## 建议

**最快方案**：安装 Visual Studio Build Tools（只安装 MSBuild，约 1-2GB）
**临时方案**：暂时只使用自动给金币功能（不需要 Harmony 补丁）


