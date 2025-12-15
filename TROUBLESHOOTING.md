# MyMod 问题排查与解决方案

本文档记录了在开发 MyMod 过程中遇到的所有问题和解决方案，以避免将来再次遇到相同的问题。

## 问题1: XML 解析错误 - 缺少 culture 属性

### 问题描述
游戏崩溃，日志显示：
```
Error: The required attribute 'culture' is missing. Node: NPCCharacter Value: Line: X XML Path:
```

### 原因
`NPCCharacter` 节点定义不完整，虽然包含了 `culture` 属性，但缺少其他必需的属性（如 `default_group`、`level`、`name`、`occupation` 等），导致 XML 验证失败。

### 解决方案
参考 DRM (DeReMilitari) 的格式，确保每个 `NPCCharacter` 节点包含所有必需的属性：

```xml
<NPCCharacter id="nord_youngling"
  default_group="Infantry"
  level="6"
  name="{=BylR8JFS}Nord Youngling"
  occupation="Soldier"
  is_basic_troop="true"
  culture="Culture.nord"
  is_hidden_encyclopedia="true">
  <face>
    <face_key_template value="BodyProperty.fighter_nord" />
  </face>
  <skills>
    <!-- 技能定义 -->
  </skills>
  <upgrade_targets>
    <!-- 升级路径 -->
  </upgrade_targets>
  <Equipments>
    <!-- 装备定义 -->
  </Equipments>
</NPCCharacter>
```

### 必需属性列表
- `id`: 兵种唯一标识符
- `default_group`: 默认分组（Infantry, Cavalry, Ranged, HorseArcher）
- `level`: 兵种等级
- `name`: 兵种名称（必须使用本地化字符串格式）
- `occupation`: 职业（通常是 "Soldier"）
- `culture`: 文化（Culture.nord, Culture.empire 等）
- `is_basic_troop`: 是否为基础兵种（可选，布尔值）
- `is_hidden_encyclopedia`: 是否在百科中隐藏（可选，布尔值）

### 必需子元素
- `<face>`: 面部模板
- `<skills>`: 技能定义
- `<upgrade_targets>`: 升级路径（可以为空）
- `<Equipments>`: 装备定义（可以为空）

---

## 问题2: name 属性使用直接中文字符

### 问题描述
`NPCCharacter` 的 `name` 属性使用了直接的中文字符，例如：
```xml
name="诺德新兵"
```

### 原因
Bannerlord 的 XML 解析器要求 `name` 属性使用本地化字符串格式，而不是直接的中文字符。

### 解决方案
使用本地化字符串格式：
```xml
name="{=nord_youth}Nord Youth"
```

格式说明：
- `{=KEY}`: 本地化键，用于在语言文件中查找翻译
- `Text`: 默认显示文本（通常是英文）

### 修复方法
将所有直接的中文字符替换为本地化字符串格式：
```xml
<!-- 错误 -->
name="诺德新兵"

<!-- 正确 -->
name="{=nord_youth}Nord Youth"
```

---

## 问题3: XML 注释中的中文乱码

### 问题描述
XML 文件中的中文注释在保存后变成乱码，例如：
```xml
<!-- 闅愯棌鏃х殑Nord鍏电锛堟寜鐓DRM鏂瑰紡锛屼娇鐢╥s_hidden_encyclopedia锛屽寘鍚墍鏈夊繀闇€灞炴€э級 -->
```

### 原因
文件编码问题。当使用某些工具编辑 XML 文件时，如果编码处理不当，中文字符可能会被错误解释。

### 解决方案
**方法1：使用英文注释（推荐）**
```xml
<!-- Hide old Nord troops (DRM style, using is_hidden_encyclopedia, including all required attributes) -->
```

**方法2：确保文件使用 UTF-8 编码**
- 在文件开头声明：`<?xml version="1.0" encoding="utf-8"?>`
- 使用支持 UTF-8 的编辑器
- 保存时确保选择 UTF-8 编码（无 BOM）

### 修复方法
使用 PowerShell 脚本修复注释：
```powershell
$lines = Get-Content "nord_hide_old_troops.xml" -Encoding UTF8
$lines[2] = '<!-- Hide old Nord troops (DRM style, using is_hidden_encyclopedia, including all required attributes) -->'
$lines[4] = '<!-- Basic Troops -->'
$lines | Set-Content "nord_hide_old_troops.xml" -Encoding UTF8
```

---

## 问题4: XML 文件格式被破坏（单行格式）

### 问题描述
XML 文件被压缩成单行，虽然 XML 解析器可以读取，但格式不一致，可能导致问题。

### 原因
使用某些工具（如 PowerShell 的 `Set-Content` 配合 `-NoNewline` 参数）保存文件时，可能会破坏原有的换行格式。

### 解决方案
**方法1：使用正确的 PowerShell 命令**
```powershell
# 错误 - 会破坏格式
$lines | Set-Content "file.xml" -Encoding UTF8 -NoNewline

# 正确 - 保持格式
$lines | Set-Content "file.xml" -Encoding UTF8
```

**方法2：使用 XML 格式化工具**
使用支持 XML 格式化的编辑器（如 VS Code、Notepad++）重新格式化文件。

**方法3：参考 DRM 的格式**
DRM 使用以下格式：
- 使用 tab 对齐属性
- 每个属性单独一行
- 适当的缩进

---

## 问题5: 升级路径引用错误

### 问题描述
`upgrade_targets` 中引用的兵种 ID 不存在，导致游戏崩溃或兵种无法升级。

### 原因
- 引用的兵种 ID 拼写错误
- 引用的兵种在另一个文件中定义，但加载顺序有问题
- 引用的兵种被删除或重命名

### 解决方案
1. **检查所有引用的 ID 是否存在**
   ```powershell
   # 提取所有 upgrade_target 引用的 ID
   Select-String -Path "*.xml" -Pattern 'upgrade_target id="NPCCharacter\.([^"]+)"' | ForEach-Object { $_.Matches.Groups[1].Value }
   
   # 提取所有定义的 NPCCharacter id
   Select-String -Path "*.xml" -Pattern 'NPCCharacter id="([^"]+)"' | ForEach-Object { $_.Matches.Groups[1].Value }
   ```

2. **确保加载顺序正确**
   在 `SubModule.xml` 中，确保被引用的兵种文件在被引用之前加载。

3. **使用完整的 ID 格式**
   ```xml
   <!-- 正确 -->
   <upgrade_target id="NPCCharacter.nord_t2_shieldman" />
   
   <!-- 错误 -->
   <upgrade_target id="nord_t2_shieldman" />
   ```

---

## 问题6: 文件加载顺序问题

### 问题描述
某些文件在日志中没有出现，或者加载顺序不正确。

### 原因
`SubModule.xml` 中的 `<XmlNode>` 顺序决定了文件的加载顺序。

### 解决方案
确保加载顺序正确：
1. **隐藏旧兵种的文件**应该在**新兵种文件**之前加载
2. **升级路径修改文件**应该在**新兵种文件**之后加载
3. **文化设置文件**应该在最后加载

示例顺序：
```xml
<Xmls>
  <!-- 1. 隐藏旧兵种 -->
  <XmlNode>
    <XmlName id="NPCCharacters" path="nord_hide_old_troops"/>
  </XmlNode>
  
  <!-- 2. 新兵种定义 -->
  <XmlNode>
    <XmlName id="NPCCharacters" path="nord_troops_new"/>
  </XmlNode>
  
  <!-- 3. 修改升级路径 -->
  <XmlNode>
    <XmlName id="NPCCharacters" path="nord_upgrade_paths" type="XSLT"/>
  </XmlNode>
  
  <!-- 4. 文化设置 -->
  <XmlNode>
    <XmlName id="SPCultures" path="nord_culture_setting"/>
  </XmlNode>
</Xmls>
```

---

## 最佳实践

### 1. 文件格式
- 使用 UTF-8 编码（无 BOM）
- 使用 2 个空格缩进（或 tab，但要保持一致）
- 每个属性单独一行
- 使用英文注释

### 2. name 属性
- **永远**使用本地化字符串格式：`name="{=KEY}Text"`
- **不要**使用直接的中文字符
- 确保语言文件中有对应的翻译

### 3. 属性完整性
- 确保所有 `NPCCharacter` 节点包含所有必需的属性
- 参考 DRM 或其他成功的 mod 作为模板

### 4. 测试
- 每次修改后，检查 XML 文件是否有效
- 使用 PowerShell 验证：
  ```powershell
  [xml](Get-Content "file.xml" -Raw -Encoding UTF8) | Out-Null
  if ($?) { Write-Host "XML is valid" } else { Write-Host "XML is invalid" }
  ```

### 5. 日志检查
- 检查 `rgl_log_*.txt` 文件，确认所有文件都已加载
- 查找错误信息（Error, Exception, Crash 等）
- 确认文件加载顺序正确

---

## 参考资源

### 参考 Mod
- **DeReMilitari (DRM)**: 使用完整的 XML 格式，隐藏旧兵种
- **True Levies (3483463349)**: 简单的兵种定义
- **CJ's Empire Troops (3617725143)**: 使用 XSLT 修改兵种
- **VanillaTroopsTweaks (3619068840)**: 使用 XSLT 删除兵种

### 文件位置
- Mod 根目录: `d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod\`
- 崩溃日志: `d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\crashes\YYYY-MM-DD_HH.MM.SS\`
- 参考 Mod: `d:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\DeReMilitari\`

---

## 问题7: nord_troops_new.xml 中的中文乱码注释导致崩溃

### 问题描述
游戏在加载 `nord_troops_new.xml` 后崩溃，日志显示文件已加载但没有错误信息。

### 原因
`nord_troops_new.xml` 文件中存在多处中文乱码注释，例如：
```xml
<!-- T2: 璇哄痉鐭紦鎴樺＋ -->
<!-- T3: 璇哄痉鐩惧鑰佸叺 -->
<!-- T5: 棣栭浜查€?-->
```

这些乱码注释可能导致 XML 解析器出现问题，特别是在文件加载后的验证阶段。

### 解决方案
将所有乱码注释替换为英文注释：

```xml
<!-- T2: Nord Shortbow Warrior -->
<!-- T3: Nord Shieldwall Veteran -->
<!-- T5: Chosen Shield Guard -->
```

### 修复方法
使用 PowerShell 脚本修复：
```powershell
$lines = Get-Content "nord_troops_new.xml" -Encoding UTF8
$lines[113] = '  <!-- T2: Nord Shortbow Warrior -->'
$lines[184] = '  <!-- T3: Nord Shieldwall Veteran -->'
$lines[250] = '  <!-- T3: Nord Veteran Shortbow Warrior -->'
$lines[465] = '  <!-- T5: Chosen Shield Guard -->'
$lines[499] = '  <!-- T2: Hound Attendant -->'
$lines[533] = '  <!-- T3: Hound Devotee -->'
$lines[567] = '  <!-- T4: Hound Zealot -->'
$lines[601] = '  <!-- T5: Hound Chosen -->'
$lines | Set-Content "nord_troops_new.xml" -Encoding UTF8
```

### 检查方法
使用 grep 查找所有乱码注释：
```powershell
Select-String -Path "nord_troops_new.xml" -Pattern "璇哄痉|鐭紦|鐘|棣栭|浜查|绁為"
```

---

## 问题8: 所有文化 troops_new.xml 文件中的 name 属性使用直接中文字符

### 问题描述
除了 `nord_troops_new.xml` 外，其他所有文化的 `troops_new.xml` 文件（`imperial_troops_new.xml`、`vlandia_troops_new.xml`、`aserai_troops_new.xml`、`sturgia_troops_new.xml`、`khuzait_troops_new.xml`）中的 `name` 属性都使用了直接的中文字符，而不是本地化字符串格式。

### 原因
这些文件在创建时直接使用了中文字符作为 `name` 属性值，没有遵循 Bannerlord 的本地化字符串格式要求。

### 解决方案
将所有直接的中文字符替换为本地化字符串格式 `{=KEY}Text`。

### 修复统计
- `imperial_troops_new.xml`: 46 个 name 属性需要修复
- `vlandia_troops_new.xml`: 5 个 name 属性需要修复
- `aserai_troops_new.xml`: 15 个 name 属性需要修复
- `sturgia_troops_new.xml`: 15 个 name 属性需要修复
- `khuzait_troops_new.xml`: 20 个 name 属性需要修复

### 修复方法
使用 PowerShell 脚本批量替换所有 name 属性，将中文字符改为本地化字符串格式。每个兵种的本地化键基于其 `id` 属性生成。

---

## 问题9: Nord 兵种属于 NavalDLC，但依赖关系配置错误

### 问题描述
游戏在加载 `nord_troops_new.xml` 后崩溃，日志显示文件已加载但没有错误信息。

### 原因
Nord 兵种（如 `nord_youngling`、`nord_drengr`、`nord_huntsman`）是在 NavalDLC 的 `naval_characters.xml` 中定义的，而不是在原版游戏中。但是 `SubModule.xml` 中将 NavalDLC 设置为可选依赖（`Optional="true"`），并且还在 `ModulesToLoadAfterThis` 中指定 NavalDLC 要在 MyMod 之后加载，这可能导致：
1. 如果用户没有 NavalDLC，Nord 兵种定义不存在
2. 即使有 NavalDLC，加载顺序问题可能导致依赖项未准备好

### 解决方案
将 NavalDLC 从可选依赖改为必需依赖，并移除 `ModulesToLoadAfterThis` 中的 NavalDLC：

```xml
<!-- 修改前 -->
<DependedModule Id="NavalDLC" Optional="true"/>
<ModulesToLoadAfterThis>
    <Module Id="WarlordsBattlefield"/>
    <Module Id="NavalDLC"/>
</ModulesToLoadAfterThis>

<!-- 修改后 -->
<DependedModule Id="NavalDLC" Optional="false"/>
<ModulesToLoadAfterThis>
    <Module Id="WarlordsBattlefield"/>
</ModulesToLoadAfterThis>
```

### 说明
- `Culture.nord` 在原版 `SandBoxCore` 中定义，所以文化本身不是 DLC 独有的
- 但是 Nord 兵种定义在 NavalDLC 中，所以如果使用 Nord 兵种，NavalDLC 必须是必需依赖
- `ModulesToLoadAfterThis` 用于指定在 MyMod **之后**加载的模块，但 NavalDLC 应该在 MyMod **之前**加载（因为它是依赖项）

---

## 更新记录

- **2025-12-14**: 创建文档，记录问题1-6
- **2025-12-14**: 修复 name 属性使用直接中文字符的问题
- **2025-12-14**: 修复 XML 注释中的中文乱码问题
- **2025-12-14**: 修复 nord_troops_new.xml 中的中文乱码注释（问题7）
- **2025-12-14**: 发现并记录所有文化 troops_new.xml 文件中的 name 属性问题（问题8）
- **2025-12-14**: 参考原版文件格式，修复所有文化 troops_new.xml 文件中的 name 属性（从直接中文字符改为本地化字符串格式 `{=KEY}Text`）
- **2025-12-14**: 发现 Nord 兵种属于 NavalDLC，将 NavalDLC 从可选依赖改为必需依赖（`Optional="false"`），并移除 `ModulesToLoadAfterThis` 中的 NavalDLC（问题9）




