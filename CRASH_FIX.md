# 崩溃修复方案

## 问题根源

1. **版本依赖不匹配**：
   - ButterLib 和 UIExtenderEx 需要 Harmony v2.2.2.0
   - 实际加载的是 Harmony v2.3.6.220（来自 `Bannerlord.Harmony`）

2. **模组重复加载**：
   - `Bannerlord.Harmony` (v2.3.6.220)
   - `maybeUi` (Harmony v2.4.2.0) ← 重复！
   - `Bannerlord.UIExtenderEx` (v2.12.0)
   - `maybeHarmony` (UIExtenderEx v2.13.2) ← 重复！

## 快速修复（推荐）

### 步骤 1：禁用多余的模组文件夹

重命名 `maybeHarmony` 和 `maybeUi`，让游戏忽略它们：

```powershell
# 在 Modules 文件夹中执行
Rename-Item "maybeHarmony" "_maybeHarmony_disabled"
Rename-Item "maybeUi" "_maybeUi_disabled"
```

### 步骤 2：更新依赖版本

修改 `MyMod\SubModule.xml`，将 Harmony 依赖版本改为实际加载的版本：

```xml
<DependedModule Id="Bannerlord.Harmony" DependentVersion="v2.3.6"/>
```

## 或者：使用新版本（如果兼容）

如果你想使用新版本（maybeUi 和 maybeHarmony）：

1. 删除旧版本：
   - 删除 `Bannerlord.Harmony` 文件夹
   - 删除 `Bannerlord.UIExtenderEx` 文件夹

2. 重命名新版本：
   - `maybeUi` → `Bannerlord.Harmony`
   - `maybeHarmony` → `Bannerlord.UIExtenderEx`

3. 更新 `SubModule.xml`：
   ```xml
   <DependedModule Id="Bannerlord.Harmony" DependentVersion="v2.4.2"/>
   <DependedModule Id="Bannerlord.UIExtenderEx" DependentVersion="v2.13.2"/>
   ```

## 当前建议

**先禁用 maybeHarmony 和 maybeUi**，使用官方版本测试，看是否还有崩溃。

