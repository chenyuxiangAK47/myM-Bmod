# 安装 .NET Framework Developer Pack

## 问题
编译时提示：找不到 .NETFramework,Version=v4.7.2 的引用程序集

## 解决方案

### 方法 1：安装 .NET Framework 4.7.2 Developer Pack（推荐）

1. **下载**
   - 访问：https://dotnet.microsoft.com/download/dotnet-framework/net472
   - 或直接下载：https://go.microsoft.com/fwlink/?linkid=863265
   - 下载 "Developer Pack"（不是 Runtime）

2. **安装**
   - 运行下载的安装程序
   - 按照提示完成安装

3. **重新编译**
   ```powershell
   cd "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod"
   $env:BANNERLORD_INSTALL_DIR = "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord"
   & "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe" MyModFramework.csproj /p:Configuration=Release /p:BANNERLORD_INSTALL_DIR="$env:BANNERLORD_INSTALL_DIR"
   ```

### 方法 2：使用 Visual Studio Installer 安装

如果你有 Visual Studio Installer：
1. 打开 Visual Studio Installer
2. 点击 "修改"
3. 在 "单个组件" 中搜索 ".NET Framework 4.7.2"
4. 勾选 ".NET Framework 4.7.2 targeting pack"
5. 点击 "修改" 安装

### 方法 3：修改项目使用已安装的 .NET Framework 版本

如果你已经安装了其他版本的 .NET Framework（如 4.8），可以修改项目文件：

1. 打开 `MyModFramework.csproj`
2. 将 `<TargetFrameworkVersion>v4.7.2</TargetFrameworkVersion>` 改为你已安装的版本（如 `v4.8`）
3. 重新编译

## 快速检查

运行以下命令检查已安装的 .NET Framework 版本：
```powershell
Get-ChildItem "HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full\" | Get-ItemPropertyValue -Name Release
```

版本对应关系：
- 461808 = .NET Framework 4.7.2
- 528040 = .NET Framework 4.8

## 推荐

**最简单的方法**：直接下载并安装 .NET Framework 4.7.2 Developer Pack
- 下载链接：https://go.microsoft.com/fwlink/?linkid=863265
- 安装后即可编译


