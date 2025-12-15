## Troop overview (equipment / skills)

Source: MyMod/ModuleData/*_troops_new.xml
Design rules: MyMod/鏂囨槑鍏电璁捐钃濆浘.md

**Status (Latest Update):**
- 鉁?All upgrade paths completed (all troops have upgrade targets defined, except top-tier units)
- 鉁?All lowest-tier noble troops have been upgraded with well-equipped gear
- 鉁?T1 recruit troops (khuzait_t1_nomad_levy, sturgia_t1_conscript, battania_t1_tribesman, vlandia_t1_serf_levy) have randomized equipment pools


Columns:
- level: internal troop level (common mapping: 6/11/16/21/26/31 ~= T1..T6)
- Skills: Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr (missing => 0)
- Equip(first): only the first EquipmentRoster key slots

---

## Empire

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| imperial_t1_tirones | 帝国新兵 | Infantry | 6 | 20/0/20/10/15/5/5/5 | Item0=empire_sword_1_t2, Item1=old_kite_shield, Body=sackcloth_tunic |
| imperial_navy_infantry_t2 | 帝国海军步兵 | Infantry | 11 | 45/0/55/15/45/10/0/10 | Item0=empire_sword_1_t2, Item1=worn_kite_shield, Item2=imperial_spear_t2, Head=padded_cap, Body=imperial_padded_cloth |
| imperial_navy_spearman_t3 | 帝国海军长矛兵 | Infantry | 16 | 60/0/65/15/90/10/0/10 | Item0=imperial_spear_t2, Item1=reinforced_kite_shield, Item2=empire_sword_2_t3, Head=arming_coif, Body=imperial_mail_vest |
| imperial_navy_veteran_spearman_t4 | 帝国海军老练长矛兵 | Infantry | 21 | 85/0/80/20/120/10/0/10 | Item0=military_fork_pike_t3, Item1=reinforced_kite_shield, Item2=empire_sword_2_t3, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_navy_hardened_spearman_t5 | 帝国海军历战长矛兵 | Infantry | 26 | 110/0/100/25/150/10/0/10 | Item0=fine_pike_t4, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Head=imperial_nasal_helm, Body=imperial_lamellar |
| imperial_navy_archer_t3 | 帝国海军弓箭手 | Ranged | 16 | 55/0/40/10/10/95/0/10 | Item0=hunting_bow, Item1=default_arrows, Item2=empire_sword_1_t2, Head=open_padded_coif, Body=imperial_padded_cloth |
| imperial_navy_veteran_archer_t4 | 帝国海军老练弓箭手 | Ranged | 21 | 75/0/50/10/10/125/0/10 | Item0=composite_bow, Item1=bodkin_arrows_a, Item2=empire_sword_2_t3, Head=imperial_mail_coif, Body=imperial_mail_vest |
| imperial_navy_hardened_archer_t5 | 帝国海军历战弓箭手 | Ranged | 26 | 95/0/60/10/10/155/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Head=imperial_nasal_helm, Body=imperial_mail_over_leather |
| imperial_legion_infantry_t2 | 帝国军团步兵 | Infantry | 11 | 45/0/70/15/20/10/10/10 | Item0=empire_sword_2_t3, Item1=reinforced_kite_shield, Head=open_padded_coif, Body=imperial_padded_cloth |
| imperial_legion_regular_t3 | 帝国正规军团步兵 | Infantry | 16 | 65/0/95/20/25/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_legion_vanguard_t4 | 帝国先锋军团步兵 | Infantry | 21 | 85/0/120/25/30/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_nasal_helm, Body=imperial_lamellar |
| imperial_legion_service_veteran_t5 | 帝国留任老兵 | Infantry | 26 | 110/0/150/30/35/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_aux_bowman_t2 | 帝国辅助弓箭手 | Ranged | 11 | 45/0/30/10/10/75/10/10 | Item0=hunting_bow, Item1=default_arrows, Item2=empire_sword_1_t2, Head=padded_cap, Body=sackcloth_tunic |
| imperial_regular_archer_t3 | 帝国正规弓箭手 | Ranged | 16 | 60/0/40/10/10/105/0/10 | Item0=composite_bow, Item1=bodkin_arrows_a, Item2=empire_sword_2_t3, Head=open_padded_coif, Body=imperial_padded_cloth |
| imperial_veteran_archer_t4 | 帝国老练弓箭手 | Ranged | 21 | 80/0/50/10/10/135/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_2_t3, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_hardened_archer_t5 | 帝国历战弓箭手 | Ranged | 26 | 95/0/60/10/10/165/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Head=imperial_nasal_helm, Body=imperial_lamellar_over_leather |
| imperial_regular_crossbowman_t3 | 帝国正规弩兵 | Ranged | 16 | 55/0/45/10/10/0/105/10 | Item0=crossbow_a, Item1=bolt_d, Item2=empire_sword_1_t2, Item3=worn_kite_shield, Head=arming_coif, Body=imperial_mail_vest |
| imperial_heavy_crossbowman_t4 | 帝国重装弩兵 | Ranged | 21 | 70/0/55/10/10/0/135/10 | Item0=crossbow_b, Item1=bolt_e, Item2=empire_sword_2_t3, Item3=worn_kite_shield, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_hardened_crossbowman_t5 | 帝国历战弩兵 | Ranged | 26 | 85/0/65/10/10/0/165/10 | Item0=crossbow_b, Item1=bolt_e, Item2=empire_sword_3_t3, Item3=reinforced_kite_shield, Head=imperial_nasal_helm, Body=imperial_lamellar |
| imperial_aux_cavalry_t2 | 帝国辅助骑兵 | Cavalry | 11 | 25/80/55/10/60/20/20/10 | Item0=imperial_spear_t2, Item1=worn_kite_shield, Item2=empire_sword_1_t2, Horse=t2_empire_horse, HorseHarness=half_scale_barding, Head=open_padded_coif, Body=imperial_mail_vest |
| imperial_lancer_t3 | 帝国长枪骑兵 | Cavalry | 16 | 30/105/70/10/120/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_2_t3, Horse=t2_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_veteran_lancer_t4 | 帝国老练长枪骑兵 | Cavalry | 21 | 40/125/90/10/150/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Horse=t3_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_nasal_helm, Body=imperial_lamellar |
| imperial_heavy_lancer_t5 | 帝国重装长枪骑兵 | Cavalry | 26 | 45/150/110/10/180/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Horse=t3_empire_horse, HorseHarness=mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_horse_archer_t3 | 帝国弓骑兵 | HorseArcher | 16 | 30/115/55/10/20/130/0/10 | Item0=composite_bow, Item1=bodkin_arrows_a, Item2=empire_sword_2_t3, Item3=worn_kite_shield, Horse=t2_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_veteran_horse_archer_t4 | 帝国老练弓骑兵 | HorseArcher | 21 | 35/135/65/10/25/160/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Item3=worn_kite_shield, Horse=t3_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_nasal_helm, Body=imperial_lamellar_over_leather |
| imperial_hardened_horse_archer_t5 | 帝国历战弓骑兵 | HorseArcher | 26 | 40/160/75/10/25/190/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Item3=reinforced_kite_shield, Horse=t3_empire_horse, HorseHarness=half_mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_mail_over_leather |
| imperial_crossbow_cavalry_t3 | 帝国弩骑兵 | HorseArcher | 16 | 30/115/55/10/20/0/130/10 | Item0=crossbow_a, Item1=bolt_d, Item2=empire_sword_2_t3, Item3=worn_kite_shield, Horse=t2_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_heavy_crossbow_cavalry_t4 | 帝国重装弩骑兵 | HorseArcher | 21 | 35/135/65/10/20/0/160/10 | Item0=crossbow_a, Item1=bolt_d, Item2=empire_sword_3_t3, Item3=worn_kite_shield, Horse=t3_empire_horse, HorseHarness=half_mail_and_plate_barding, Head=imperial_nasal_helm, Body=imperial_lamellar |
| imperial_hardened_crossbow_cavalry_t5 | 帝国历战弩骑兵 | HorseArcher | 26 | 40/160/75/10/20/0/190/10 | Item0=crossbow_a, Item1=bolt_d, Item2=empire_sword_3_t3, Item3=reinforced_kite_shield, Horse=t3_empire_horse, HorseHarness=mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t1_wealthy_citizen | 帝国富裕公民兵 | Infantry | 6 | 25/15/35/10/25/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_goggled_helmet, Body=imperial_lamellar, Cape=imperial_lamellar_shoulders, Gloves=decorated_imperial_gauntlets, Leg=decorated_imperial_boots |
| imperial_noble_t2_noble_cavalry | 帝国贵族骑兵 | Cavalry | 11 | 25/110/65/10/110/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Horse=t2_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_nasal_helm, Body=imperial_mail_over_leather |
| imperial_noble_t3_heavy_noble_cavalry | 帝国重装贵族骑兵 | Cavalry | 16 | 30/135/85/10/145/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Horse=t3_empire_horse, HorseHarness=half_mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_lamellar |
| imperial_noble_t4_royal_heavy_cavalry | 帝国皇家重骑兵 | Cavalry | 21 | 35/160/110/10/170/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Horse=t3_empire_horse, HorseHarness=mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t5_palace_heavy_cavalry | 帝国宫廷重骑兵 | Cavalry | 26 | 40/200/140/10/220/20/0/10 | Item0=empire_lance_1_t3, Item1=reinforced_kite_shield, Item2=empire_sword_3_t3, Horse=t3_empire_horse, HorseHarness=mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t2_noble_bow_lancer | 帝国贵族弓骑兵 | HorseArcher | 11 | 25/120/55/10/90/120/0/10 | Item0=composite_bow, Item1=bodkin_arrows_a, Item2=empire_lance_1_t3, Item3=worn_kite_shield, Horse=t2_empire_horse, HorseHarness=imperial_scale_barding, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_noble_t3_heavy_bow_cavalry | 帝国重装弓骑兵 | HorseArcher | 16 | 30/145/65/10/110/150/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_lance_1_t3, Item3=worn_kite_shield, Horse=t3_empire_horse, HorseHarness=half_mail_and_plate_barding, Head=imperial_nasal_helm, Body=imperial_lamellar_over_leather |
| imperial_noble_t4_elite_bow_lancer | 帝国精锐弓枪骑兵 | HorseArcher | 21 | 35/170/75/10/135/185/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_lance_1_t3, Item3=reinforced_kite_shield, Horse=t3_empire_horse, HorseHarness=mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_lamellar |
| imperial_noble_t5_palace_bow_lancer | 帝国宫廷弓枪骑兵 | HorseArcher | 26 | 40/200/90/10/160/220/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_lance_1_t3, Item3=reinforced_kite_shield, Horse=t3_empire_horse, HorseHarness=mail_and_plate_barding, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t2_eagle_legion_recruit | 帝国鹰旗军团新兵 | Infantry | 11 | 55/0/85/10/20/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_noble_t3_eagle_legionary | 帝国鹰旗军团兵 | Infantry | 16 | 75/0/110/10/25/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_nasal_helm, Body=imperial_lamellar |
| imperial_noble_t4_eagle_heavy_legionary | 帝国鹰旗重装军团兵 | Infantry | 21 | 90/0/140/10/30/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t5_eagle_guard_legionary | 帝国鹰旗禁卫军团兵 | Infantry | 26 | 110/0/175/10/35/10/10/10 | Item0=empire_sword_3_t3, Item1=reinforced_kite_shield, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t2_guard_archer_trainee | 帝国禁卫射手学员 | Ranged | 11 | 55/0/60/10/10/135/0/10 | Item0=composite_bow, Item1=bodkin_arrows_a, Item2=empire_sword_2_t3, Item3=worn_kite_shield, Head=imperial_mail_coif, Body=imperial_mail_over_leather |
| imperial_noble_t3_guard_archer | 帝国禁卫射手 | Ranged | 16 | 70/0/70/10/10/165/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Item3=worn_kite_shield, Head=imperial_nasal_helm, Body=imperial_lamellar_over_leather |
| imperial_noble_t4_heavy_guard_archer | 帝国重装禁卫射手 | Ranged | 21 | 85/0/80/10/10/195/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Item3=reinforced_kite_shield, Head=imperial_goggled_helmet, Body=imperial_scale_armor |
| imperial_noble_t5_palace_guard_archer | 帝国皇宫禁卫射手 | Ranged | 26 | 95/0/90/10/10/225/0/10 | Item0=composite_bow, Item1=bodkin_arrows_b, Item2=empire_sword_3_t3, Item3=reinforced_kite_shield, Head=imperial_goggled_helmet, Body=imperial_scale_armor |

---

## Vlandia

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| vlandia_t1_serf_levy | 瓦兰农奴征召兵 | Infantry | 6 | 20/5/20/10/20/5/5/5 | Item0=peasant_hatchet_1_t1, Item1=strapped_round_shield, Head=head_wrapping, Body=sackcloth_tunic, Cape=hood |
| vlandia_t2_foot_peasant | 瓦兰农奴剑盾兵 | Infantry | 11 | 40/10/55/20/25/5/10/10 | Item0=vlandia_sword_1_t2, Item1=strapped_round_shield, Head=kettle_hat_over_padded_cloth, Body=aketon |
| vlandia_t2_serf_spearman | 瓦兰农奴长矛兵 | Infantry | 11 | 40/10/10/15/70/0/0/0 | Item0=western_spear_2_t2, Head=head_wrapping, Body=sackcloth_tunic |
| vlandia_t3_footman | 瓦兰正式步兵 | Infantry | 16 | 70/15/85/25/20/10/10/10 | Item0=vlandia_sword_2_t3, Item1=studded_round_shield, Head=nasal_cervelliere_over_padded_cap, Body=sleeveless_padded_short_coat |
| vlandia_t3_billman | 瓦兰农奴戟兵 | Infantry | 16 | 70/15/10/35/110/0/0/0 | Item0=billhook_polearm_t2, Head=nasal_cervelliere_over_padded_cap, Body=sleeveless_padded_short_coat |
| vlandia_t2_peasant_archer | 瓦兰农奴长弓手 | Ranged | 11 | 40/10/20/10/10/60/0/10 | Item0=hunting_bow, Item1=default_arrows, Item2=peasant_hatchet_1_t1, Head=head_wrapping, Body=sackcloth_tunic |
| vlandia_t2_serf_crossbowman | 瓦兰农奴弩兵 | Ranged | 11 | 40/10/20/10/10/0/60/10 | Item0=crossbow_h, Item1=bolt_d, Item2=peasant_hatchet_1_t1, Head=head_wrapping, Body=sackcloth_tunic |
| vlandia_t3_yeoman_archer | 瓦兰农奴熟练弓手 | Ranged | 16 | 70/15/30/10/10/110/0/10 | Item0=mountain_hunting_bow, Item1=bodkin_arrows_a, Item2=peasant_hatchet_1_t1, Head=head_wrapping, Body=aketon |
| vlandia_t3_crossbow_levy | 瓦兰农奴熟练弩兵 | Ranged | 16 | 60/15/30/10/10/0/110/10 | Item0=crossbow_a, Item1=bolt_d, Item2=peasant_hatchet_1_t1, Head=head_wrapping, Body=aketon |
| vlandia_noble_t1_page | 瓦兰贵族侍从 | Infantry | 6 | 30/30/45/10/25/10/10/10 | Item0=vlandia_sword_2_t3, Item1=steel_round_shield, Head=arming_coif, Body=aketon |
| vlandia_noble_t2_squire | 瓦兰贵族扈从骑士 | Cavalry | 11 | 30/90/60/10/70/10/0/10 | Item0=vlandia_lance_1_t3, Item1=vlandia_sword_2_t3, Item2=steel_round_shield, Horse=t2_vlandia_horse, HorseHarness=light_harness, Head=kettle_hat_over_padded_cloth, Body=mail_shirt |
| vlandia_noble_t3_knight | 瓦兰骑士 | Cavalry | 16 | 35/120/90/20/120/10/0/10 | Item0=vlandia_lance_1_t3, Item1=vlandia_sword_3_t4, Item2=steel_round_shield, Horse=t3_vlandia_horse, HorseHarness=chain_horse_harness, Head=great_helm, Body=coat_of_plates_over_mail, Cape=noble_pauldron_with_cape, Gloves=knight_gauntlets, Leg=knight_greaves |
| vlandia_noble_t4_champion_knight | 瓦兰冠军骑士 | Cavalry | 21 | 40/150/120/25/150/10/0/10 | Item0=vlandia_lance_2_t4, Item1=vlandia_sword_3_t4, Item2=steel_round_shield, Horse=t3_vlandia_horse, HorseHarness=chain_horse_harness, Head=kettle_hat_over_mail_coif, Body=coat_of_plates_over_mail, Cape=noble_pauldron_with_cape |
| vlandia_noble_t5_foot_commander_knight | 瓦兰领军骑士（步战） | Infantry | 26 | 140/40/140/160/60/10/0/10 | Item0=northern_2hsword_t4, Item1=vlandia_sword_3_t4, Item2=steel_round_shield, Head=full_helm_over_padded_cap, Body=coat_of_plates_over_mail, Cape=noble_pauldron_with_cape |
| vlandia_noble_t5_champion_vanguard_knight | 瓦兰冠军先锋骑士 | Cavalry | 26 | 50/200/160/30/220/10/0/10 | Item0=vlandia_lance_3_t5, Item1=vlandia_sword_3_t4, Item2=steel_round_shield, Horse=t3_vlandia_horse, HorseHarness=halfchain_barding, Head=full_helm_over_padded_cap, Body=coat_of_plates_over_mail, Cape=pauldron_over_scale_armor |

---

## Battania

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| battania_t1_tribesman | 巴丹新兵 | Infantry | 6 | 25/5/20/15/20/10/0/15 | Item0=battania_sword_1_t2, Item1=battania_shield_targe_a, Body=cloth_tunic |
| battania_t2_woods_bowman | 巴丹弓箭手 | Ranged | 11 | 50/10/35/20/30/70/0/30 | Item0=woodland_longbow, Item1=bodkin_arrows_a, Item2=battania_sword_1_t2, Body=northern_leather_vest |
| battania_t3_wild_marksman | 巴丹资深弓箭手 | Ranged | 16 | 80/15/50/30/40/100/0/50 | Item0=woodland_yew_bow, Item1=bodkin_arrows_b, Item2=battania_sword_2_t3, Body=northern_leather_vest |
| battania_t2_wildfighter | 巴丹双手战士 | Infantry | 11 | 70/10/40/70/40/10/0/30 | Item0=battania_2hsword_1_t2, Body=battanian_savage_armor |
| battania_t3_berserker | 巴丹狂战士 | Infantry | 16 | 100/15/40/90/40/15/0/30 | Item0=battania_2hsword_2_t3, Body=battanian_savage_armor |
| battania_t2_spear_warrior | 巴丹盾牌战士 | Infantry | 11 | 50/20/40/20/50/10/0/40 | Item0=battania_sword_1_t2, Item1=battania_shield_targe_a, Head=thinhide_coif, Body=northern_leather_vest |
| battania_t3_shield_warrior | 巴丹氏族勇士 | Infantry | 16 | 80/20/70/30/80/15/0/10 | Item0=battania_sword_2_t3, Item1=battania_large_shield_a, Head=leather_studdedhelm, Body=sleeveless_studded_fur_armor |
| battania_t3_javelin_raider | 巴丹氏族突袭者 | Infantry | 16 | 100/15/60/40/50/10/0/90 | Item0=battania_sword_2_t3, Item1=battania_shield_targe_a, Item2=northern_javelin_2_t3, Body=northern_leather_vest |
| battania_t3_horse_raider | 巴丹狂野骑兵 | Cavalry | 16 | 60/100/20/80/90/0/0/0 | Item0=battania_2hsword_2_t3, Horse=t3_battania_horse, HorseHarness=battania_horse_harness, Head=battania_fur_helmet, Body=battanian_savage_armor, Cape=battania_shoulder_furr |
| battania_noble_t2_bloodline | 巴丹贵族血脉 | Infantry | 11 | 70/10/90/80/40/60/0/30 | Item0=battania_sword_2_t3, Item1=battania_large_shield_a, Head=leather_studdedhelm_over_roughscale, Body=battania_noble_armor, Cape=battania_shoulder_furr, Gloves=battania_noble_bracers, Leg=battania_fur_boots |
| battania_noble_t3_hunter_hero | 巴丹弓手豪杰 | Ranged | 16 | 90/10/50/120/30/160/0/30 | Item0=woodland_longbow, Item1=bodkin_arrows_b, Item2=battania_2hsword_2_t3, Head=leather_studdedhelm_over_headcloth, Body=battania_light_armor_d |
| battania_noble_t4_veteran_hunter_hero | 巴丹资深弓手豪杰 | Ranged | 21 | 110/10/55/150/30/200/0/35 | Item0=woodland_yew_bow, Item1=bodkin_arrows_b, Item2=battania_2hsword_4_t4, Head=battania_earmuff_helmet_c, Body=battania_noble_armor, Cape=battania_shoulder_furr |
| battania_noble_t5_legendary_hunter_hero | 巴丹传奇弓手豪杰 | Ranged | 26 | 130/10/60/180/30/240/0/40 | Item0=woodland_yew_bow, Item1=bodkin_arrows_b, Item2=battania_2hsword_5_t5, Head=battania_earmuff_helmet_c_brnz, Body=battania_warlord_armor, Cape=battania_shoulder_furr |
| battania_noble_t3_slaughter_hero | 巴丹厮杀豪杰 | Infantry | 16 | 110/10/30/180/30/10/0/30 | Item0=black_heart_2haxe_t3, Head=battania_fur_helmet, Body=battania_mercenary_armor, Cape=battania_shoulder_furr |
| battania_noble_t4_veteran_slaughter_hero | 巴丹资深厮杀豪杰 | Infantry | 21 | 130/10/35/220/30/10/0/35 | Item0=sturgia_2haxe_1_t4, Head=battania_earmuff_helmet_d, Body=battania_warlord_armor, Cape=battania_shoulder_furr |
| battania_noble_t5_legendary_slaughter_hero | 巴丹传奇厮杀豪杰 | Infantry | 26 | 150/10/40/260/30/10/0/40 | Item0=sturgia_2haxe_2_t5, Head=battania_earmuff_helmet_d_brnz, Body=battania_brass_plate_armor, Cape=armored_bearskin |
| battania_noble_t3_oath_hero | 巴丹誓言豪杰 | Infantry | 16 | 90/10/150/40/40/10/0/20 | Item0=battania_sword_2_t3, Item1=battania_large_shield_a, Head=leather_studdedhelm, Body=battania_noble_armor |
| battania_noble_t4_veteran_oath_hero | 巴丹资深誓言豪杰 | Infantry | 21 | 110/10/190/50/50/10/0/20 | Item0=battania_sword_4_t4, Item1=battania_large_shield_b, Head=leather_studdedhelm_over_roughscale, Body=battania_warlord_armor, Cape=battania_shoulder_furr |
| battania_noble_t5_oath_guardian | 巴丹誓言守护者 | Infantry | 26 | 130/10/240/60/60/10/0/20 | Item0=battania_sword_5_t5, Item1=battania_large_shield_c, Head=battania_earmuff_helmet_d_brnz, Body=battania_brass_plate_armor, Cape=mail_shoulders |

---

## Sturgia

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| sturgia_t1_conscript | 斯特吉亚新兵 | Infantry | 6 | 25/0/15/10/20/5/0/5 | Item0=western_spear_1_t2, Item1=worn_kite_shield, Head=nordic_fur_cap, Body=fur_trimmed_short_tunic |
| sturgia_t2_spearwarden | 斯特吉亚盾矛兵 | Infantry | 11 | 40/0/45/10/60/5/0/10 | Item0=western_spear_1_t2, Item1=leather_bound_kite_shield, Item2=peasant_hatchet_1_t1, Head=nordic_leather_cap, Body=heavy_nordic_tunic |
| sturgia_t2_hunter | 斯特吉亚弓箭手 | Ranged | 11 | 40/0/20/10/15/70/0/10 | Item0=nordic_shortbow, Item1=default_arrows, Item2=western_spear_1_t2, Body=heavy_nordic_tunic |
| sturgia_t3_shield_guard | 斯特吉亚护阵者 | Infantry | 16 | 60/0/90/20/90/10/0/20 | Item0=sturgia_sword_1_t3, Item1=reinforced_kite_shield, Item2=western_javelin_1_t2, Head=nordic_helmet, Body=sturgian_chainmale_shortsleeve |
| sturgia_t3_shieldbreaker | 斯特吉亚破阵者 | Infantry | 16 | 70/0/40/100/40/5/0/10 | Item0=battle_axe_t4, Head=nordic_helmet, Body=sturgian_chainmale_shortsleeve |
| sturgia_t2_raider_cavalry | 斯特吉亚轻骑兵 | Cavalry | 11 | 30/60/50/20/60/20/0/20 | Item0=western_spear_1_t2, Item1=reinforced_kite_shield, Item2=peasant_hatchet_1_t1, Horse=t2_sturgia_horse, HorseHarness=northern_ring_barding, Head=nordic_leather_cap, Body=sturgian_chainmale_shortsleeve |
| sturgia_t3_mounted_hunter | 斯特吉亚骑射手 | HorseArcher | 16 | 40/90/40/20/40/110/0/20 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=sturgia_sword_1_t3, Horse=t2_sturgia_horse, HorseHarness=northern_ring_barding, Head=nordic_helmet, Body=sturgian_chainmale_shortsleeve |
| sturgia_noble_t2_retainer | 斯特吉亚贵族随从 | Cavalry | 16 | 35/80/90/20/40/20/0/20 | Item0=sturgia_sword_1_t3, Item1=sturgia_infantry_shield_a, Horse=t3_sturgia_horse, HorseHarness=chain_barding, Head=sturgian_helmet_closed, Body=sturgian_lamellar_base, Cape=scale_shoulder_armor, Gloves=plated_strip_gauntlets, Leg=plated_strip_boots |
| sturgia_noble_t3_boyar_guard | 波耶侍卫 | Cavalry | 21 | 55/95/110/120/110/20/0/90 | Item0=northern_spear_2_t3, Item1=sturgia_infantry_shield_a, Item2=western_javelin_2_t3, Item3=black_heart_2haxe_t3, Horse=t3_sturgia_horse, HorseHarness=northern_ring_barding, Head=sturgian_helmet_closed, Body=sturgian_chainmale_longsleeve |
| sturgia_noble_t4_boyar_heavy_shield_guard | 波耶重盾侍卫 | Cavalry | 26 | 70/110/130/140/130/20/0/110 | Item0=northern_spear_3_t4, Item1=sturgia_infantry_shield_b, Item2=western_javelin_3_t4, Item3=battle_axe_t4, Horse=t3_sturgia_horse, HorseHarness=chain_barding, Head=sturgia_heavy_cavalary_helmet, Body=sturgian_fortified_armor |
| sturgia_noble_t3_druzhinnik_heavy_horse_archer | 德纳鲁日重型弓骑兵 | HorseArcher | 21 | 45/110/90/20/30/160/0/30 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=sturgia_mace_1_t3, Item3=sturgia_infantry_shield_a, Horse=t3_sturgia_horse, HorseHarness=northern_ring_barding, Head=sturgian_helmet_open, Body=sturgian_lamellar_base |
| sturgia_noble_t4_druzhinnik_noble_horse_archer | 德纳鲁日贵族弓骑兵 | HorseArcher | 26 | 55/130/110/20/35/190/0/30 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=sturgia_mace_2_t4, Item3=sturgia_infantry_shield_b, Horse=t3_sturgia_horse, HorseHarness=chain_barding, Head=sturgia_heavy_cavalary_helmet, Body=sturgian_lamellar_fortified |

---

## Khuzait

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| khuzait_t1_nomad_levy | 库吉特游牧新兵 | Infantry | 6 | 20/10/20/10/15/20/0/10 | Item0=simple_sabre_sword_t2, Item1=tribal_steppe_shield, Body=sackcloth_tunic |
| khuzait_t2_mixed_militia | 库吉特近战步兵 | Infantry | 11 | 40/20/45/10/25/0/0/10 | Item0=simple_sabre_sword_t2, Item1=tribal_steppe_shield, Body=khuzait_sturdy_armor |
| khuzait_t2_foot_archer | 库吉特游牧弓箭步兵 | Ranged | 11 | 40/20/25/10/10/80/0/10 | Item0=composite_steppe_bow, Item1=default_arrows, Item2=simple_sabre_sword_t2, Item3=tribal_steppe_shield, Body=khuzait_sturdy_armor |
| khuzait_t3_foot_veteran_archer | 库吉特资深游牧弓箭步兵 | Ranged | 16 | 65/40/55/10/10/130/0/10 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=ridged_sabre_sword_t4, Item3=decorated_steppe_shield, Head=steppe_helmet, Body=khuzait_heavy_armor |
| khuzait_t2_steppe_rider | 库吉特轻骑兵 | Cavalry | 11 | 20/80/40/10/40/20/0/30 | Item0=western_javelin_1_t2, Item1=simple_sabre_sword_t2, Item2=tribal_steppe_shield, Horse=t2_khuzait_horse, HorseHarness=steppe_harness, Body=khuzait_sturdy_armor |
| khuzait_t3_horse_archer | 库吉特骑射手 | HorseArcher | 16 | 30/110/50/10/20/140/0/10 | Item0=composite_steppe_bow, Item1=bodkin_arrows_a, Item2=simple_sabre_sword_t2, Horse=t2_khuzait_horse, HorseHarness=studded_steppe_barding, Body=khuzait_heavy_armor |
| khuzait_t4_veteran_horse_archer | 库吉特资深骑射手 | HorseArcher | 21 | 35/140/70/10/20/175/0/10 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=ridged_sabre_sword_t4, Horse=t3_khuzait_horse, HorseHarness=studded_steppe_barding, Body=khuzait_fortified_armor |
| khuzait_t3_mounted_javelin_raider | 库吉特标枪突袭骑兵 | Cavalry | 16 | 30/110/60/10/20/10/0/120 | Item0=western_javelin_1_t2, Item1=western_javelin_1_t2, Item2=simple_sabre_sword_t2, Horse=t2_khuzait_horse, HorseHarness=steppe_half_barding, Body=khuzait_heavy_armor |
| khuzait_t4_veteran_mounted_javelin_raider | 库吉特资深标枪突袭骑兵 | Cavalry | 21 | 35/140/80/10/20/10/0/150 | Item0=western_javelin_1_t2, Item1=western_javelin_1_t2, Item2=ridged_sabre_sword_t4, Horse=t3_khuzait_horse, HorseHarness=studded_steppe_barding, Body=khuzait_fortified_armor |
| khuzait_t3_shock_lancer | 库吉特重装枪骑兵 | Cavalry | 16 | 30/110/70/10/150/0/0/0 | Item0=khuzait_lance_1_t3, Item1=simple_sabre_sword_t2, Item2=steppe_guardian_shield, Horse=t2_khuzait_horse, HorseHarness=steppe_half_barding, Head=steppe_helmet, Body=khuzait_heavy_armor |
| khuzait_t4_veteran_shock_lancer | 库吉特资深重装枪骑兵 | Cavalry | 21 | 35/140/90/10/185/0/0/0 | Item0=khuzait_lance_2_t4, Item1=ridged_sabre_sword_t4, Item2=steppe_guardian_shield, Horse=t3_khuzait_horse, HorseHarness=studded_steppe_barding, Head=steppe_helmet, Body=khuzait_fortified_armor |
| khuzait_noble_t2_youth | 库吉特贵族子弟 | Infantry | 11 | 40/60/70/40/40/60/0/20 | Item0=ridged_sabre_sword_t4, Item1=steppe_guardian_shield, Head=khuzait_noble_helmet_with_feathers, Body=khuzait_heavy_armor, Cape=fur_cloak_b, Gloves=eastern_plated_leather_vambraces, Leg=plated_strip_boots |
| khuzait_noble_t3_tent_guard_glaive | 库吉特帐卫关刀兵 | Infantry | 16 | 75/30/50/90/140/120/0/20 | Item0=composite_steppe_bow, Item1=bodkin_arrows_a, Item2=khuzait_polearm_1_t4, Head=spiked_helmet_with_facemask, Body=khuzait_fortified_armor |
| khuzait_noble_t4_veteran_tent_guard_glaive | 库吉特资深帐卫关刀兵 | Infantry | 21 | 95/30/60/110/170/150/0/20 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=khuzait_polearm_1_t4, Head=spiked_helmet_with_facemask, Body=khuzait_fortified_armor, Cape=fur_cloak_b |
| khuzait_noble_t3_shock_cavalry | 库吉特陷阵骑兵 | Cavalry | 16 | 30/120/90/20/150/20/0/10 | Item0=khuzait_lance_1_t3, Item1=simple_sabre_sword_t2, Horse=t2_khuzait_horse, HorseHarness=steppe_harness, Head=steppe_helmet, Body=khuzait_sturdy_armor |
| khuzait_noble_t4_veteran_shock_cavalry | 库吉特资深陷阵骑兵 | Cavalry | 21 | 35/150/110/20/180/20/0/10 | Item0=khuzait_lance_2_t4, Item1=ridged_sabre_sword_t4, Horse=t3_khuzait_horse, HorseHarness=studded_steppe_barding, Head=khuzait_noble_helmet_with_feathers, Body=khuzait_heavy_armor |
| khuzait_noble_t5_heavy_shock_cavalry | 库吉特重装陷阵骑兵 | Cavalry | 26 | 40/180/140/20/220/20/0/10 | Item0=khuzait_lance_3_t5, Item1=khuzait_noble_sword_1_t5, Horse=t3_khuzait_horse, HorseHarness=mail_and_plate_barding, Head=khuzait_noble_helmet_with_neckguard, Body=khuzait_fortified_armor |
| khuzait_noble_t3_khans_court_horse_archer | 库吉特汗廷骑射 | HorseArcher | 16 | 30/140/80/20/30/170/0/10 | Item0=composite_steppe_bow, Item1=bodkin_arrows_b, Item2=simple_sabre_sword_t2, Horse=t2_khuzait_horse, HorseHarness=studded_steppe_barding, Head=khuzait_noble_helmet_with_fur, Body=khuzait_heavy_armor |
| khuzait_noble_t4_veteran_khans_court_horse_archer | 库吉特资深汗廷骑射 | HorseArcher | 21 | 35/165/95/20/30/200/0/10 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=ridged_sabre_sword_t4, Horse=t3_khuzait_horse, HorseHarness=half_mail_and_plate_barding, Head=khuzait_noble_helmet_with_feathers, Body=khuzait_fortified_armor |
| khuzait_noble_t5_elite_khans_court_horse_archer | 库吉特精锐汗廷骑射 | HorseArcher | 26 | 40/190/120/20/30/230/0/10 | Item0=steppe_heavy_bow, Item1=bodkin_arrows_b, Item2=khuzait_noble_sword_2_t5, Horse=t3_khuzait_horse, HorseHarness=mail_and_plate_barding, Head=khuzait_noble_helmet_with_neckguard, Body=khuzait_fortified_armor |

---

## Aserai

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| aserai_t1_desert_levy | 沙漠征召兵 | Infantry | 6 | 20/0/20/10/15/5/0/25 | Item0=western_spear_1_t2, Item1=old_kite_shield, Item2=desert_throwing_knife, Head=head_wrapping, Body=sackcloth_tunic |
| aserai_t2_shield_warrior | 沙漠持盾战士 | Infantry | 11 | 45/0/55/10/20/5/0/40 | Item0=aserai_sword_1_t2, Item1=leather_bound_kite_shield, Item2=desert_throwing_knife, Head=wrapped_headcloth, Body=aserai_armor_02 |
| aserai_t2_bowman | 沙漠弓手 | Ranged | 11 | 40/0/25/10/10/75/0/35 | Item0=nomad_bow, Item1=default_arrows, Item2=falchion_sword_t2, Item3=desert_throwing_knife, Head=head_wrapping, Body=aserai_archer_armor |
| aserai_t2_light_rider | 沙漠轻骑手 | Cavalry | 11 | 25/65/55/10/20/15/0/40 | Item0=aserai_sword_1_t2, Item1=old_kite_shield, Item2=desert_throwing_knife, Horse=t2_aserai_horse, Head=head_scarf, Body=aserai_horseman_armor |
| aserai_t3_line_warrior | 沙漠阵线战士 | Infantry | 16 | 65/0/85/20/30/5/0/70 | Item0=aserai_sword_1_t2, Item1=reinforced_kite_shield, Item2=western_javelin_2_t3, Head=open_desert_helmet, Body=southern_lamellar_armor |
| aserai_t3_veteran_bowman | 沙漠老练弓手 | Ranged | 16 | 60/0/35/10/10/120/0/55 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=falchion_sword_t2, Item3=western_javelin_2_t3, Head=wrapped_headcloth, Body=southern_lamellar_armor |
| aserai_t3_javelin_rider | 沙漠标枪骑手 | Cavalry | 16 | 30/95/90/20/25/20/0/110 | Item0=aserai_sword_1_t2, Item1=leather_bound_kite_shield, Item2=western_javelin_2_t3, Horse=t3_aserai_horse, HorseHarness=steppe_half_barding, Head=open_desert_helmet, Body=aserai_horseman_armor |
| aserai_t3_bow_rider | 沙漠弓骑手 | HorseArcher | 16 | 30/95/70/10/10/120/0/20 | Item0=nomad_bow, Item1=bodkin_arrows_b, Item2=falchion_sword_t2, Item3=leather_bound_kite_shield, Horse=t3_aserai_horse, HorseHarness=steppe_half_barding, Head=wrapped_headcloth, Body=aserai_horseman_armor |
| aserai_t3_camel_anti_cavalry | 沙漠骆驼反骑手 | Cavalry | 16 | 35/90/45/10/110/10/0/90 | Item0=southern_spear_3_t4, Item1=leather_bound_kite_shield, Item2=western_javelin_2_t3, Horse=war_camel, HorseHarness=camel_saddle, Head=open_desert_helmet, Body=aserai_armor_02_b |
| aserai_t4_city_guard | 沙漠城邦卫士 | Infantry | 21 | 80/0/120/30/35/10/0/120 | Item0=aserai_sword_1_t2, Item1=reinforced_kite_shield, Item2=western_javelin_3_t4, Head=open_desert_helmet, Body=aserai_scale_armor_on_chain |
| aserai_noble_t2_faris_retainer | 沙漠法里斯随骑 | Cavalry | 16 | 25/90/90/10/20/30/0/100 | Item0=aserai_sword_1_t2, Item1=reinforced_kite_shield, Item2=western_javelin_2_t3, Horse=t3_aserai_horse, HorseHarness=chain_barding, Head=open_desert_helmet, Body=aserai_scale_armor_on_chain, Cape=aserai_scale_shoulder_b, Gloves=sturgian_splint_brancers, Leg=sturgian_plated_boots |
| aserai_noble_t3_faris_javelin | 沙漠投矛法里斯 | Cavalry | 21 | 30/110/120/10/25/30/0/150 | Item0=aserai_sword_1_t2, Item1=reinforced_kite_shield, Item2=western_javelin_2_t3, Horse=t3_aserai_horse, HorseHarness=steppe_half_barding, Head=open_desert_helmet, Body=southern_lamellar_armor |
| aserai_noble_t3_faris_bow | 沙漠弓骑法里斯 | HorseArcher | 21 | 30/120/110/10/15/170/0/90 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=aserai_sword_1_t2, Item3=western_javelin_2_t3, Horse=t3_aserai_horse, HorseHarness=steppe_half_barding, Head=open_desert_helmet, Body=southern_lamellar_armor |
| aserai_noble_t4_faris_vanguard | 沙漠先锋法里斯 | Cavalry | 26 | 35/140/140/10/20/40/0/200 | Item0=aserai_sword_1_t2, Item1=reinforced_kite_shield, Item2=western_javelin_3_t4, Item3=western_javelin_3_t4, Horse=t3_aserai_horse, HorseHarness=half_scale_barding, Head=open_desert_helmet, Body=aserai_scale_armor_on_chain |
| aserai_noble_t4_faris_court | 沙漠宫廷法里斯 | HorseArcher | 26 | 40/145/140/10/20/190/0/120 | Item0=steppe_war_bow, Item1=bodkin_arrows_b, Item2=aserai_sword_1_t2, Item3=western_javelin_3_t4, Horse=t3_aserai_horse, HorseHarness=chain_barding, Head=open_desert_helmet, Body=aserai_full_scale_armor_on_chain |

---

## Nord

| id | name | group | level | Skills(Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr) | Equip(first) |
|---|---|---:|---:|---|---|
| nord_youth | 诺德新兵 | Infantry | 6 | 25/0/25/10/25/5/0/10 | Item0=peasant_hatchet_1_t1, Item1=northern_round_shield, Body=fur_trimmed_short_tunic |
| nord_t2_shieldman | 诺德盾兵 | Infantry | 11 | 60/0/80/20/20/10/0/10 | Item0=sturgia_axe_2_t2, Item1=heavy_round_shield, Head=nordic_leather_cap, Body=heavy_nordic_tunic |
| nord_t2_throwing_axeman | 诺德投斧战士 | Infantry | 11 | 70/0/70/20/10/10/0/100 | Item0=northern_throwing_axe_1_t1, Item1=sturgia_axe_2_t2, Head=nordic_fur_cap, Body=northern_leather_vest |
| nord_t2_shortbow_warrior | 诺德短弓战士 | Infantry | 11 | 65/0/70/20/20/70/0/10 | Item0=nordic_shortbow, Item1=default_arrows, Item2=northern_round_shield, Item3=sturgia_axe_2_t2, Head=nordic_leather_cap, Body=northern_leather_vest |
| nord_t2_longbowman | 诺德长弓手 | Ranged | 11 | 60/0/35/10/10/95/0/0 | Item0=woodland_longbow, Item1=default_arrows, Item2=peasant_hatchet_1_t1, Head=nordic_fur_cap, Body=northern_leather_vest |
| nord_t3_shieldwall_veteran | 诺德盾墙老兵 | Infantry | 16 | 100/0/120/40/30/10/0/10 | Item0=sturgia_axe_3_t3, Item1=heavy_round_shield, Head=nasal_helmet, Body=sturgian_chainmale_shortsleeve |
| nord_t3_berserker | 诺德狂战士 | Infantry | 16 | 110/0/40/120/20/10/0/90 | Item0=black_heart_2haxe_t3, Item1=northern_throwing_axe_1_t1, Body=sleeveless_studded_fur_armor |
| nord_t3_veteran_shortbow_warrior | 诺德短弓老兵 | Infantry | 16 | 90/0/95/30/20/90/0/10 | Item0=nordic_shortbow, Item1=barbed_arrows, Item2=heavy_round_shield, Item3=sturgia_axe_3_t3, Head=nasal_helmet, Body=sturgian_chainmale_shortsleeve |
| nord_t3_veteran_longbowman | 诺德资深长弓手 | Ranged | 16 | 80/0/45/10/10/130/0/0 | Item0=woodland_longbow, Item1=bodkin_arrows_a, Item2=sturgia_axe_2_t2, Head=nasal_helmet, Body=heavy_nordic_tunic |
| nord_noble_t1_scion | 诺德贵胄之子 | Infantry | 6 | 70/0/90/50/50/30/0/60 | Item0=sturgia_axe_3_t3, Item1=heavy_round_shield, Head=nordic_helmet, Body=nordic_hauberk, Cape=scale_shoulder_armor, Gloves=plated_strip_gauntlets, Leg=plated_strip_boots |
| nord_noble_t2_shield_guard | 盾卫 | Infantry | 11 | 90/0/120/50/50/30/0/60 | Item0=sturgia_axe_3_t3, Item1=northern_round_shield, Head=nasalhelm_over_leather, Body=sturgian_chainmale_shortsleeve |
| nord_noble_t3_veteran_shield_guard | 百战盾卫 | Infantry | 16 | 110/0/150/60/60/35/0/70 | Item0=sturgia_axe_3_t3, Item1=heavy_round_shield, Head=nasal_helmet, Body=nordic_hauberk |
| nord_noble_t4_vanguard_shield_guard | 先锋盾卫 | Infantry | 21 | 130/0/180/70/70/40/0/80 | Item0=sturgia_sword_4_t4, Item1=heavy_round_shield, Head=nordic_helmet, Body=decorated_nordic_hauberk |
| nord_noble_t5_chosen_shield_guard | 首领亲选 | Infantry | 26 | 150/0/220/90/80/40/0/90 | Item0=sturgia_sword_4_t4, Item1=heavy_round_shield, Head=nordic_helmet, Body=sturgian_fortified_armor |
| nord_noble_t2_hound_attendant | 犬神侍从 | Infantry | 11 | 90/0/30/120/30/20/0/30 | Item0=black_heart_2haxe_t3, Head=nasalhelm_over_leather, Body=heavy_nordic_tunic |
| nord_noble_t3_hound_devotee | 犬神眷徒 | Infantry | 16 | 110/0/35/160/35/20/0/35 | Item0=sturgia_2haxe_1_t4, Head=nasal_helmet, Body=nordic_hauberk |
| nord_noble_t4_hound_zealot | 犬神狂信者 | Infantry | 21 | 130/0/40/200/40/20/0/40 | Item0=avalanche_2haxe, Head=nordic_helmet, Body=decorated_nordic_hauberk |
| nord_noble_t5_hound_chosen | 犬神神选 | Infantry | 26 | 150/0/45/240/45/20/0/45 | Item0=sturgia_2haxe_2_t5, Head=nordic_helmet, Body=sturgian_fortified_armor |
| nord_noble_t2_longship_warrior | 龙船战士 | Infantry | 11 | 95/0/120/40/30/20/0/90 | Item0=sturgia_axe_2_t2, Item1=northern_round_shield, Item2=northern_throwing_axe_1_t1, Head=nordic_fur_cap, Body=heavy_nordic_tunic |
| nord_noble_t3_longship_raider | 龙船突击者 | Infantry | 16 | 115/0/150/50/35/20/0/120 | Item0=sturgia_axe_3_t3, Item1=heavy_round_shield, Item2=northern_throwing_axe_1_t1, Head=nasal_helmet, Body=nordic_hauberk |
| nord_noble_t4_longship_vanguard | 龙船先锋 | Infantry | 21 | 135/0/180/60/40/20/0/160 | Item0=sturgia_axe_3_t3, Item1=heavy_round_shield, Item2=northern_throwing_axe_1_t1, Item3=northern_throwing_axe_1_t1, Head=nordic_helmet, Body=decorated_nordic_hauberk |
| nord_noble_t5_longship_champion | 龙船冠军 | Infantry | 26 | 150/0/220/70/40/20/0/200 | Item0=sturgia_sword_4_t4, Item1=heavy_round_shield, Item2=northern_throwing_axe_1_t1, Item3=northern_throwing_axe_1_t1, Head=nordic_helmet, Body=sturgian_fortified_armor |

