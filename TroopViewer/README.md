# Bannerlord 兵种查看器

一个基于Web的兵种数据可视化工具，可以查看和浏览Mount & Blade II: Bannerlord的兵种信息。

## 功能特性

- 📁 **多文件加载**: 支持同时加载多个XML文件
- 🔍 **搜索和筛选**: 按名称、ID、文化、等级筛选兵种
- 📊 **详细信息**: 查看兵种的完整信息
  - 基本信息（ID、等级、文化、类型）
  - 技能属性（8种技能）
  - 装备详情（所有装备方案）
  - 升级路径
  - 特性
- 🌳 **兵种树**: 可视化显示兵种的升级树
- 📈 **统计信息**: 显示总技能点数、平均技能、装备数量等

## 使用方法

1. 打开 `index.html` 文件（使用现代浏览器，如Chrome、Firefox、Edge）

2. 点击"加载XML文件"按钮，选择要查看的兵种XML文件
   - 可以多选文件（按住Ctrl或Cmd键）
   - 支持的文件：`*_troops_new.xml` 等

3. 在左侧列表中选择兵种查看详情

4. 使用搜索框和筛选器快速找到目标兵种

5. 点击"查看兵种树"按钮查看升级路径

## 支持的XML格式

工具会自动解析以下XML结构：

```xml
<NPCCharacter id="troop_id" level="6" culture="Culture.empire" default_group="Infantry">
    <name>{=TroopName}Troop Name</name>
    <skills>
        <skill id="Athletics" value="20" />
        ...
    </skills>
    <Equipments>
        <EquipmentRoster>
            <equipment slot="Item0" id="Item.weapon_id" />
            ...
        </EquipmentRoster>
    </Equipments>
    <upgrade_targets>
        <upgrade_target id="NPCCharacter.target_troop_id" />
    </upgrade_targets>
</NPCCharacter>
```

## 文件结构

```
TroopViewer/
├── index.html      # 主页面
├── style.css      # 样式文件
├── parser.js      # XML解析器
├── viewer.js      # 视图管理器
└── README.md      # 说明文档
```

## 技术说明

- 纯前端实现，无需服务器
- 使用原生JavaScript，无依赖
- 支持现代浏览器（Chrome、Firefox、Edge、Safari）
- 数据完全在本地处理，不会上传到服务器

## 注意事项

- 由于浏览器安全限制，无法直接读取文件夹，需要手动选择文件
- 大型XML文件（>10MB）可能加载较慢
- 建议使用Chrome或Edge浏览器以获得最佳体验

## 未来改进

- [ ] 支持导出数据为CSV/JSON
- [ ] 支持比较两个兵种
- [ ] 支持批量编辑
- [ ] 添加装备图标显示
- [ ] 支持拖拽文件加载

