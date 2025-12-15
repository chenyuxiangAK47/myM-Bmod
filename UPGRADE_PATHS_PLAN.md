# 兵种升级路径和装备升级计划

## 任务概述
1. 为所有派系添加完整的升级路径
2. 升级所有最低级贵族兵种的装备为精良装备

## 各派系空升级路径统计
- 帝国 (imperial): 46个
- 诺德 (nord): 待统计
- 巴丹 (battania): 待统计
- 斯特吉亚 (sturgia): 待统计
- 库吉特 (khuzait): 待统计
- 阿塞莱 (aserai): 待统计
- 瓦兰 (vlandia): 已完成部分

## 最低级贵族兵种（需要升级装备）
根据culture_setting.xml和troop_overview.md：

1. **帝国**: `imperial_noble_t1_wealthy_citizen` (T1步兵)
2. **瓦兰**: `vlandia_noble_t3_knight` (T3骑兵) ✅ 已完成
3. **巴丹**: `battania_noble_t2_bloodline` (T2步兵)
4. **斯特吉亚**: `sturgia_noble_t2_retainer` (T2骑兵)
5. **库吉特**: `khuzait_noble_t2_youth` (T2步兵)
6. **阿塞莱**: `aserai_noble_t2_faris_retainer` (T2骑兵)
7. **诺德**: `nord_noble_t1_scion` (T1步兵)

## 处理顺序
1. 帝国 (imperial_troops_new.xml)
2. 诺德 (nord_troops_new.xml)
3. 巴丹 (battania_troops_new.xml)
4. 斯特吉亚 (sturgia_troops_new.xml)
5. 库吉特 (khuzait_troops_new.xml)
6. 阿塞莱 (aserai_troops_new.xml)

## 升级路径规则
- T1基础兵种 → 可升级到多个T2分支
- T2兵种 → 升级到对应的T3兵种
- T3兵种 → 升级到对应的T4兵种（如果有）
- T4兵种 → 升级到对应的T5兵种（如果有）
- 贵族兵种按各自升级树进行

## 装备升级标准
最低级贵族兵种应装备：
- 精良头盔（如great_helm, imperial_goggled_helmet等）
- 板甲或精良链甲（如coat_of_plates, imperial_scale_armor等）
- 精良马甲（如chain_barding, halfchain_barding等，如果是骑兵）
- 精良护手和护腿（如knight_gauntlets, knight_greaves等）



