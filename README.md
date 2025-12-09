# 诺德飞斧Mod (NordThrowingAxeMod)

为《骑马与砍杀2：霸主》中所有诺德（Nord）派系兵种添加飞斧装备的简单mod。

## 功能

- 自动为所有诺德派系兵种添加飞斧（northern_throwing_axe_1_t1）
- 如果兵种已有飞斧，则保持不变
- 如果四个装备格子满了，会优先替换标枪为飞斧
- 如果没有标枪，会替换Item3或Item2槽位

## 安装

1. 将整个 `MyMod` 文件夹复制到游戏的Modules目录：
   ```
   D:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules\MyMod\
   ```

2. 在游戏启动器的Mod选项中启用此mod

3. 确保mod加载顺序正确（Native、SandBoxCore等基础mod要在前面）

## 文件结构

```
MyMod/
├── SubModule.xml              # Mod配置文件
├── ModuleData/
│   └── spnpccharacters.xml    # 兵种装备覆盖文件
└── README.md                  # 本说明文件
```

## 修改的兵种

- `skolderbrotva_tier_1` (Skolder Recruit) - 已有飞斧，保持不变
- `skolderbrotva_tier_2` (Skolder Warrior Broda) - 已有飞斧，保持不变  
- `skolderbrotva_tier_3` (Skolder Veteran Broda) - 将标枪替换为飞斧

## 开发说明

此mod使用XML覆盖方式修改兵种装备，无需编译代码。

所有引用的物品ID都来自原版游戏，确保兼容性。

## 许可证

MIT License
