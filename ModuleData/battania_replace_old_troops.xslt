<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 完全删除旧的Battania兵种 -->
	<xsl:template match="NPCCharacter[@id='battanian_recruit']"/>
	<xsl:template match="NPCCharacter[@id='battanian_wildling']"/>
	<xsl:template match="NPCCharacter[@id='battanian_skirmisher']"/>
	<xsl:template match="NPCCharacter[@id='battanian_veteran_skirmisher']"/>
	<xsl:template match="NPCCharacter[@id='battanian_oath_sworn']"/>
	<xsl:template match="NPCCharacter[@id='battanian_oathsworn']"/>
	<xsl:template match="NPCCharacter[@id='battanian_fian']"/>
	<xsl:template match="NPCCharacter[@id='battanian_fian_champion']"/>
	<xsl:template match="NPCCharacter[@id='battanian_raider']"/>
	<xsl:template match="NPCCharacter[@id='battanian_mounted_skirmisher']"/>
	<!-- 删除原版弓箭手和民兵 -->
	<xsl:template match="NPCCharacter[@id='battanian_militia_archer']"/>
	<xsl:template match="NPCCharacter[@id='battanian_militia_veteran_archer']"/>
	<xsl:template match="NPCCharacter[@id='battanian_militia_spearman']"/>
	<xsl:template match="NPCCharacter[@id='battanian_militia_veteran_spearman']"/>
	<!-- 删除原版基础兵种（志愿者） -->
	<xsl:template match="NPCCharacter[@id='battanian_volunteer']"/>
</xsl:stylesheet>




