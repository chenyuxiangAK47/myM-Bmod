# Visual Studio Build Tools 安装指南

## 步骤 1：下载

1. 访问：https://visualstudio.microsoft.com/downloads/
2. 向下滚动到 "All downloads" 部分
3. 找到 "Tools for Visual Studio"
4. 点击 "Build Tools for Visual Studio" 的 "Free download" 按钮

## 步骤 2：安装

1. 运行下载的安装程序（`vs_buildtools.exe`）
2. 选择工作负载：
   - ✅ **勾选 ".NET desktop build tools"**
   - 这会自动包含 .NET Framework 4.7.2 SDK
3. 在右侧的 "Installation details" 中，确保包含：
   - ✅ .NET Framework 4.7.2 targeting pack
   - ✅ .NET Framework 4.7.2 SDK
4. 点击 "Install" 按钮
5. 等待安装完成（约 1-2GB，需要一些时间）

## 步骤 3：验证安装

安装完成后，MSBuild 通常位于：
- `C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\MSBuild.exe`
- 或 `C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe`

## 步骤 4：编译项目

打开 PowerShell，运行：

```powershell
# 设置环境变量
$env:BANNERLORD_INSTALL_DIR = "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord"

# 进入项目目录
cd "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod"

# 找到 MSBuild（根据你的安装路径调整）
$msbuild = "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\MSBuild\Current\Bin\MSBuild.exe"

# 如果上面的路径不存在，尝试这个：
if (-not (Test-Path $msbuild)) {
    $msbuild = "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\MSBuild\Current\Bin\MSBuild.exe"
}

# 编译简化版本（推荐先试这个）
& $msbuild MyModSimple.csproj /p:Configuration=Release /p:BANNERLORD_INSTALL_DIR="$env:BANNERLORD_INSTALL_DIR"
```

## 如果遇到问题

### 问题 1：找不到 MSBuild
- 检查安装路径
- 或者使用 `where.exe msbuild` 查找

### 问题 2：编译错误
- 确保环境变量 `BANNERLORD_INSTALL_DIR` 已设置
- 检查 Bannerlord 路径是否正确

### 问题 3：缺少引用
- 确保 Bannerlord 已正确安装
- 检查 DLL 文件是否存在

## 安装完成后

编译成功后，DLL 会在：
`d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod\bin\Win64_Shipping_Client\NordThrowingAxeMod.dll`

然后：
1. 取消注释 `SubModule.xml` 中的 `SubModuleClass` 行
2. 启动游戏测试


