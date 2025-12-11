# Mod 检查清单

## ✅ 已完成项目

### 1. 文件结构
- ✅ 所有新兵种XML文件已创建（7个文化）
- ✅ 所有XSLT删除旧兵种文件已创建（7个文化）
- ✅ 所有XSLT农民升级路径文件已创建（7个文化）
- ✅ 所有XSLT文化基础兵种文件已创建（7个文化）
- ✅ SubModule.xml已正确配置所有文件
- ✅ spnpccharacters.xml已清空，避免冲突

### 2. 兵种替换
- ✅ Nord: 完全替换，T1=level 11（相当于原版T2）
- ✅ Sturgia: 完全替换，T1-T4
- ✅ Vlandia: 完全替换，T1-T3（只有骑兵T4），装备已修正（T2钩镰，T3斧枪，无盾无单手）
- ✅ Battania: 完全替换，T1-T3
- ✅ Khuzait: 完全替换，步兵T2，骑兵T4
- ✅ Aserai: 完全替换，步兵T4，骑兵T4
- ✅ Imperial: 完全替换，T1-T5

### 3. 旧兵种删除
- ✅ 所有原版兵种ID已添加到删除列表
- ✅ 包括DLC兵种（imperial_vigla_recruit, imperial_palatine_guard）

### 4. 农民升级路径
- ✅ 所有文化的农民（villager_*和fighter_*）已重定向到新T1兵种

### 5. 文化基础兵种
- ✅ 所有文化的基础兵种（basic_troop）已设置为新T1兵种

## ⚠️ 需要注意的问题

### 1. 文件加载顺序
当前SubModule.xml的加载顺序：
1. 新兵种XML（所有文化）
2. 农民升级路径XSLT（所有文化）
3. 删除旧兵种XSLT（所有文化）
4. 文化基础兵种XSLT（所有文化）
5. nord_throwing_axe.xslt（旧兼容性文件）
6. spnpccharacters.xml（已清空）

**建议**: 这个顺序是正确的，XSLT会按顺序应用。

### 2. 平衡性检查

#### Nord（蛮族，T1=T2级别）
- T1 (nord_youth): level 11, skills 40/40/40 ✅
- T2 (nord_warrior/archer): level 16, skills 60-70 ✅
- T3 (nord_linebreaker/shieldwall): level 21, skills 80-100 ✅

#### Sturgia（有文化的蛮族，T1-T4）
- T1: level 6, skills 20-30 ✅
- T2: level 11, skills 40-50 ✅
- T3: level 16, skills 60-70 ✅
- T4: level 21, skills 80-100 ✅

#### Vlandia（封建，T1-T3，只有骑兵T4）
- T1: level 6, skills 20-30 ✅
- T2: level 11, skills 40-50 ✅
- T3: level 16, skills 70-90 ✅
- T4 (骑兵): level 21, skills 80-100 ✅
- **装备**: T2用钩镰（billhook），T3用斧枪（voulge），无盾无单手 ✅

#### Battania（进攻型蛮族，T1-T3）
- T1: level 6, skills 25-30 ✅
- T2: level 11, skills 40-50 ✅
- T3: level 16, skills 70-100 ✅

#### Khuzait（游牧，步兵T2，骑兵T4）
- T1: level 6, skills 25-30，Riding 30 ✅
- T2 (步兵): level 11, skills 40-50 ✅
- T2-T4 (骑兵): level 11-21, skills 60-140，强调骑射 ✅

#### Aserai（沙漠文明，步兵T4，骑兵T4）
- T1: level 6, skills 25-30 ✅
- T2-T4 (步兵): level 11-21, skills 40-100 ✅
- T2-T4 (骑兵): level 11-21, skills 60-120 ✅
- **装备**: 轻中甲，复合弓 ✅

#### Imperial（文明，T1-T5）
- T1: level 6, skills 20-30 ✅
- T2-T5: level 11-31, skills 40-150 ✅
- **装备**: 多元化，整齐，不一定精良 ✅
- **技能**: 一般熟练度，体现装备好但技术差 ✅

### 3. 与案例Mod对比

#### 3619068840 (VanillaTroopsTweaks)
- ✅ 使用相同的XSLT删除方式
- ✅ 文件结构类似

#### 3617725143 (CJ's Empire Troops)
- ✅ 使用相同的加载顺序（新兵种XML → XSLT修改）
- ✅ 使用相同的文化修改方式
- ✅ 我们的结构更完整（包含所有文化）

## 🔍 待测试项目

1. **游戏内测试**
   - [ ] 所有新兵种是否正常显示
   - [ ] 旧兵种是否完全消失
   - [ ] 农民是否能正常升级到新T1
   - [ ] 招募是否使用新T1兵种
   - [ ] 升级路径是否正确

2. **平衡性测试**
   - [ ] Nord T1是否相当于原版T2
   - [ ] 各文化兵种是否平衡
   - [ ] Vlandia装备是否正确（无盾无单手）

3. **兼容性测试**
   - [ ] 与NavalDLC的兼容性
   - [ ] 与其他mod的兼容性

## 📝 文件清单

### XML文件（新兵种定义）
- nord_troops_new.xml
- sturgia_troops_new.xml
- vlandia_troops_new.xml
- battania_troops_new.xml
- khuzait_troops_new.xml
- aserai_troops_new.xml
- imperial_troops_new.xml

### XSLT文件（删除旧兵种）
- nord_replace_old_troops.xslt
- sturgia_replace_old_troops.xslt
- vlandia_replace_old_troops.xslt
- battania_replace_old_troops.xslt
- khuzait_replace_old_troops.xslt
- aserai_replace_old_troops.xslt
- imperial_replace_old_troops.xslt

### XSLT文件（农民升级路径）
- nord_upgrade_paths.xslt
- sturgia_upgrade_paths.xslt
- vlandia_upgrade_paths.xslt
- battania_upgrade_paths.xslt
- khuzait_upgrade_paths.xslt
- aserai_upgrade_paths.xslt
- imperial_upgrade_paths.xslt

### XSLT文件（文化基础兵种）
- nord_culture_change.xslt
- sturgia_culture_change.xslt
- vlandia_culture_change.xslt
- battania_culture_change.xslt
- khuzait_culture_change.xslt
- aserai_culture_change.xslt
- imperial_culture_change.xslt

### 其他文件
- SubModule.xml（主配置文件）
- spnpccharacters.xml（已清空）
- nord_throwing_axe.xslt（旧兼容性文件，可考虑删除）

## ✅ 总结

所有文件已正确创建和配置，结构符合案例mod的标准。设计平衡性符合用户要求：
- Nord T1 = 原版T2级别
- 各文化特色鲜明
- Vlandia装备已修正
- 所有旧兵种已标记删除
- 农民升级路径已重定向
- 文化基础兵种已更新

**建议**: 现在可以进行游戏内测试，验证所有功能是否正常工作。





