<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>

<!-- Skolder Veteran Broda - 把标枪替换成飞斧 -->
	<xsl:template match="NPCCharacter[@id='skolderbrotva_tier_3']/Equipments">
		<Equipments>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.sturgia_2haxe_1_t4" />
				<equipment slot="Item1"
				           id="Item.heavy_round_shield" />
				<equipment slot="Item2"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Item3"
				           id="Item.sturgia_sword_4_t4" />
				<equipment slot="Head"
				           id="Item.goggled_helmet_over_full_mail" />
				<equipment slot="Body"
				           id="Item.nordic_hauberk" />
				<equipment slot="Leg"
				           id="Item.mail_chausses" />
				<equipment slot="Gloves"
				           id="Item.highland_gloves" />
				<equipment slot="Cape"
				           id="Item.bearskin" />
			</EquipmentRoster>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.sturgia_2haxe_1_t4" />
				<equipment slot="Item1"
				           id="Item.heavy_round_shield" />
				<equipment slot="Item2"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Item3"
				           id="Item.sturgia_sword_4_t4" />
				<equipment slot="Head"
				           id="Item.closed_goggled_helmet" />
				<equipment slot="Body"
				           id="Item.sturgian_chainmale_shortsleeve" />
				<equipment slot="Leg"
				           id="Item.strapped_mail_chausses" />
				<equipment slot="Gloves"
				           id="Item.guarded_armwraps" />
				<equipment slot="Cape"
				           id="Item.battania_shoulder_furr" />
			</EquipmentRoster>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.sturgia_2haxe_1_t4" />
				<equipment slot="Item1"
				           id="Item.heavy_round_shield" />
				<equipment slot="Item2"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Item3"
				           id="Item.sturgia_sword_4_t4" />
				<equipment slot="Head"
				           id="Item.nordic_helmet" />
				<equipment slot="Body"
				           id="Item.decorated_nordic_hauberk" />
				<equipment slot="Leg"
				           id="Item.northern_plated_boots" />
				<equipment slot="Gloves"
				           id="Item.rough_tied_bracers" />
				<equipment slot="Cape"
				           id="Item.mail_shoulders" />
			</EquipmentRoster>
			<EquipmentSet
				id="sturgia_troop_civilian_template_t2"
				civilian="true" />
			<EquipmentSet
				id="sturgia_troop_civilian_template_t3"
				civilian="true" />
		</Equipments>
	</xsl:template>

<!-- Sturgian Spearman (斯特吉亚矛兵) - 把标枪替换成飞斧 -->
	<xsl:template match="NPCCharacter[@id='sturgian_spearman']/Equipments">
		<Equipments>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.northern_spear_2_t3" />
				<equipment slot="Item1"
				           id="Item.reinforced_horsemans_kite_shield" />
				<equipment slot="Item2"
				           id="Item.sturgia_sword_2_t3" />
				<equipment slot="Item3"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Head"
				           id="Item.sturgian_helmet_open" />
				<equipment slot="Body"
				           id="Item.sturgian_chainmale_shortsleeve" />
				<equipment slot="Leg"
				           id="Item.strapped_mail_chausses" />
				<equipment slot="Gloves"
				           id="Item.northern_brass_bracers" />
			</EquipmentRoster>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.northern_spear_2_t3" />
				<equipment slot="Item1"
				           id="Item.reinforced_horsemans_kite_shield" />
				<equipment slot="Item2"
				           id="Item.sturgia_sword_2_t3" />
				<equipment slot="Item3"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Head"
				           id="Item.sturgian_helmet_open" />
				<equipment slot="Body"
				           id="Item.sturgian_chainmale_shortsleeve" />
				<equipment slot="Leg"
				           id="Item.strapped_mail_chausses" />
				<equipment slot="Gloves"
				           id="Item.northern_brass_bracers" />
			</EquipmentRoster>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.northern_spear_2_t3" />
				<equipment slot="Item1"
				           id="Item.reinforced_horsemans_kite_shield" />
				<equipment slot="Item2"
				           id="Item.sturgia_sword_2_t3" />
				<equipment slot="Item3"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Head"
				           id="Item.sturgian_helmet_open" />
				<equipment slot="Body"
				           id="Item.sturgian_chainmale_shortsleeve" />
				<equipment slot="Leg"
				           id="Item.strapped_mail_chausses" />
				<equipment slot="Gloves"
				           id="Item.northern_brass_bracers" />
			</EquipmentRoster>
			<EquipmentSet
				id="sturgia_troop_civilian_template_t2"
				civilian="true" />
			<EquipmentSet
				id="sturgia_troop_civilian_template_t3"
				civilian="true" />
		</Equipments>
	</xsl:template>

<!-- Nord Spear Warrior (诺德持矛勇士) - 把标枪替换成飞斧 -->
	<xsl:template match="NPCCharacter[@id='nord_spear_warrior']/Equipments">
		<Equipments>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.nord_shield_tier_3_b" />
				<equipment slot="Item1"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Item2"
				           id="Item.nord_sword_2_t3" />
				<equipment slot="Item3"
				           id="Item.nord_spear_1_t3" />
				<equipment slot="Body"
				           id="Item.double_belted_leather_armor" />
				<equipment slot="Leg"
				           id="Item.northman_raider_boot" />
				<equipment slot="Cape"
				           id="Item.nord_fur_shoulder" />
				<equipment slot="Head"
				           id="Item.nasalhelm_over_leather" />
				<equipment slot="Gloves"
				           id="Item.studded_arm_guards" />
			</EquipmentRoster>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.nord_shield_tier_3_b" />
				<equipment slot="Item1"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Item2"
				           id="Item.nord_sword_2_t3" />
				<equipment slot="Item3"
				           id="Item.nord_spear_1_t3" />
				<equipment slot="Head"
				           id="Item.nasalhelm_over_leather" />
				<equipment slot="Cape"
				           id="Item.scarf" />
				<equipment slot="Body"
				           id="Item.double_belted_leather_armor" />
				<equipment slot="Leg"
				           id="Item.northman_raider_boot" />
				<equipment slot="Gloves"
				           id="Item.studded_arm_guards" />
			</EquipmentRoster>
			<EquipmentRoster>
				<equipment slot="Item0"
				           id="Item.nord_shield_tier_3_a" />
				<equipment slot="Item1"
				           id="Item.northern_throwing_axe_1_t1" />
				<equipment slot="Item2"
				           id="Item.nord_sword_2_t3" />
				<equipment slot="Item3"
				           id="Item.nord_spear_2_t3" />
				<equipment slot="Body"
				           id="Item.double_belted_leather_armor" />
				<equipment slot="Head"
				           id="Item.nasal_helmet" />
				<equipment slot="Leg"
				           id="Item.northman_raider_boot" />
				<equipment slot="Cape"
				           id="Item.nord_casual_cloak" />
				<equipment slot="Gloves"
				           id="Item.studded_arm_guards" />
			</EquipmentRoster>
			<EquipmentSet
				id="nord_troop_civilian_template_t2"
				civilian="true" />
		</Equipments>
	</xsl:template>

</xsl:stylesheet>

