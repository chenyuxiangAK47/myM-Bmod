# 全派系兵种与升级树重做Mod

为《骑马与砍杀2：霸主》全面重做所有派系的兵种和升级树的大型mod项目。

## 项目概述

这是一个全面的兵种系统重做项目，将重新设计：
- **帝国（Empire）**派系的兵种和升级树
- **诺德（Nord）**派系的兵种和升级树
- **斯特吉亚（Sturgian）**派系的兵种和升级树
- **其他所有派系**的兵种和升级树

## 当前状态

### 第一阶段：基础框架 ✅
- [x] Mod基础结构搭建
- [x] SubModule.xml配置
- [x] XSLT和XML文件框架

### 第二阶段：兵种和升级树重做 🚧
- [ ] 创建新兵种定义文件
- [ ] 设计并实现各派系升级树
- [ ] 修改现有兵种的升级路径
- [ ] 添加语言文件支持

## 功能规划

### 兵种系统
- 重新设计所有派系的兵种
- 创建全新的兵种升级树
- 优化兵种装备配置
- 平衡兵种属性和技能

### 升级树系统
- 重新设计各派系的升级路径
- 添加分支升级选项
- 优化升级体验

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
│   ├── nord_throwing_axe.xslt       # XSLT转换文件（当前用于装备替换）
│   ├── spnpccharacters.xml         # XML覆盖文件（当前用于装备替换）
│   ├── troops_new.xml              # 新兵种定义文件（待创建）
│   ├── upgrade_trees.xslt          # 升级树修改文件（待创建）
│   └── ...                         # 其他待添加的文件
└── README.md                        # 本说明文件
```

## 依赖

- Native（必需）
- SandBoxCore（必需）
- Sandbox（必需）
- StoryMode（必需）
- NavalDLC（可选，如果安装了NavalDLC，会支持其中的兵种）

## 开发计划

### Phase 1: 基础框架 ✅
- Mod结构搭建
- 基础配置文件

### Phase 2: 兵种重做 🚧
- 创建新兵种定义
- 设计升级树结构
- 实现装备系统

### Phase 3: 平衡与优化
- 兵种属性平衡
- 升级树优化
- 游戏体验测试

### Phase 4: 完善与发布
- 语言文件支持
- 文档完善
- 最终测试

## 技术说明

此mod使用以下技术：
- **XSLT转换**：用于修改现有兵种的升级路径和属性
- **XML覆盖**：用于创建新兵种和完全替换兵种定义
- **模块化设计**：各派系兵种独立文件，便于维护

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License
