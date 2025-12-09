# 诺德飞斧Mod (NordThrowingAxeMod)

为《骑马与砍杀2：霸主》中诺德（Nord）和斯特吉亚（Sturgian）派系兵种将标枪替换为飞斧的mod。

## 功能

- 将诺德和斯特吉亚派系兵种的标枪替换为飞斧（northern_throwing_axe_1_t1 - 掠袭者飞斧）
- 使用XSLT和XML双重覆盖确保兼容性
- 支持原版游戏和NavalDLC中的兵种

## 安装

1. 将整个 `MyMod` 文件夹复制到游戏的Modules目录：
   ```
   D:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod\
   ```

2. 在游戏启动器的Mod选项中启用此mod

3. 确保mod加载顺序正确：
   - 基础mod（Native、SandBoxCore、Sandbox、StoryMode）要在前面
   - 此mod会在WarlordsBattlefield和NavalDLC之后加载

## 文件结构

```
MyMod/
├── SubModule.xml                    # Mod配置文件
├── ModuleData/
│   ├── nord_throwing_axe.xslt       # XSLT转换文件（主要修改方式）
│   └── spnpccharacters.xml         # XML覆盖文件（备用）
└── README.md                        # 本说明文件
```

## 修改的兵种

### 斯特吉亚（Sturgian）派系
- `sturgian_spearman` (斯特吉亚矛兵) - 将 `Item.northern_javelin_2_t3` 替换为 `Item.northern_throwing_axe_1_t1`

### 诺德（Nord）派系
- `skolderbrotva_tier_3` (Skolder Veteran Broda) - 将 `Item.northern_javelin_3_t4` 替换为 `Item.northern_throwing_axe_1_t1`
- `nord_spear_warrior` (诺德持矛勇士，来自NavalDLC) - 将 `Item.nord_spear_javelin_1_t3` 替换为 `Item.northern_throwing_axe_1_t1`

## 依赖

- Native（必需）
- SandBoxCore（必需）
- Sandbox（必需）
- StoryMode（必需）
- NavalDLC（可选，如果安装了NavalDLC，会修改其中的诺德兵种）

## 技术说明

此mod使用XSLT和XML双重覆盖方式修改兵种装备：
- XSLT文件会完全替换目标兵种的Equipments部分，确保只保留飞斧版本
- XML文件作为备用覆盖，提供额外的兼容性保障
- 所有引用的物品ID都来自原版游戏，确保兼容性

## 许可证

MIT License
