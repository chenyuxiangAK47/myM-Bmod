# 快速开始按钮间距修复

## 问题
"快速开始"按钮和"载入游戏"按钮卡在一起，没有足够的间距。

## 修复方案

### 1. 更新按钮结构
- 使用与原版菜单项完全一致的结构
- 添加左右两个 `ImageWidget`（HoverIndicatorBrush）
- 使用 `InitialMenuButtonBrush` 而不是 `InitialMenu.Option.Text`

### 2. 增加间距
- 将 `MarginTop` 从 `16` 增加到 `48`
- 保持 `MarginBottom="16"` 与其他菜单项一致

## 修改的文件
- `SubModule\QuickStartUIExtension.cs`

## 需要重新编译
修改后需要重新编译 DLL：
```powershell
cd "d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod"
msbuild MyModWithHarmony.csproj /p:Configuration=Release
```

## 测试
重新编译并启动游戏后，检查：
1. "快速开始"按钮是否显示在菜单顶部
2. 与"载入游戏"按钮之间是否有足够的间距（至少 48px）
3. 按钮样式是否与其他菜单项一致（包括左右箭头指示器）

