<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 清除所有旧兵种的upgrade_targets，确保完全取代 -->
	<!-- 使用更简单的方法：直接匹配所有旧兵种的upgrade_targets -->
	<!-- 帝国旧兵种 -->
	<xsl:template match="NPCCharacter[@id='imperial_recruit' or @id='imperial_infantryman' or @id='imperial_veteran_infantryman' or @id='imperial_legionary' or @id='imperial_archer' or @id='imperial_trained_archer' or @id='imperial_veteran_archer' or @id='imperial_crossbowman' or @id='imperial_sergeant_crossbowman' or @id='imperial_menavliaton' or @id='imperial_elite_menavliaton' or @id='imperial_horseman' or @id='imperial_cataphract' or @id='imperial_elite_cataphract' or @id='imperial_palatine_guard' or @id='imperial_vigla_recruit' or @id='bucellarii']/upgrade_targets"/>
	<!-- Sturgia旧兵种 -->
	<xsl:template match="NPCCharacter[@id='sturgian_recruit' or @id='sturgian_spearman' or @id='sturgian_warrior' or @id='sturgian_veteran_warrior' or @id='sturgian_ulfhednar' or @id='sturgian_hunter' or @id='sturgian_bowman' or @id='sturgian_veteran_bowman' or @id='sturgian_raider' or @id='sturgian_horse_raider' or @id='druzhinnik' or @id='druzhinnik_champion']/upgrade_targets"/>
	<!-- Vlandia旧兵种 -->
	<xsl:template match="NPCCharacter[@id='vlandian_recruit' or @id='vlandian_footman' or @id='vlandian_sergeant' or @id='vlandian_voulgier' or @id='vlandian_billman' or @id='vlandian_peasant' or @id='vlandian_archer' or @id='vlandian_crossbowman' or @id='vlandian_sharpshooter' or @id='vlandian_vanguard' or @id='vlandian_champion']/upgrade_targets"/>
	<!-- Battania旧兵种 -->
	<xsl:template match="NPCCharacter[@id='battanian_recruit' or @id='battanian_wildling' or @id='battanian_skirmisher' or @id='battanian_oath_sworn' or @id='battanian_oathsworn' or @id='battanian_fian' or @id='battanian_fian_champion' or @id='battanian_raider' or @id='battanian_mounted_skirmisher']/upgrade_targets"/>
	<!-- Khuzait旧兵种 -->
	<xsl:template match="NPCCharacter[@id='khuzait_nomad' or @id='khuzait_tribesman' or @id='khuzait_spearman' or @id='khuzait_hunter' or @id='khuzait_horse_archer' or @id='khuzait_raider' or @id='khuzait_heavy_horse_archer' or @id='khuzait_darkhan' or @id='khuzait_lancer' or @id='khuzait_heavy_lancer']/upgrade_targets"/>
	<!-- Aserai旧兵种 -->
	<xsl:template match="NPCCharacter[@id='aserai_recruit' or @id='aserai_tribesman' or @id='aserai_footman' or @id='aserai_infantry' or @id='aserai_veteran_infantry' or @id='aserai_skirmisher' or @id='aserai_archer' or @id='aserai_master_archer' or @id='aserai_mameluke' or @id='aserai_mameluke_heavy' or @id='aserai_faris' or @id='aserai_vanguard_faris']/upgrade_targets"/>
	<!-- Nord旧兵种 -->
	<xsl:template match="NPCCharacter[@id='nord_youngling' or @id='nord_drengr' or @id='nord_huntsman' or @id='nord_axe_warrior' or @id='nord_spear_warrior' or @id='nord_freeman_archer' or @id='nord_vargr']/upgrade_targets"/>
</xsl:stylesheet>


