<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 修改Imperial农民的升级路径 -->
	<xsl:template match="NPCCharacter[@id='villager_empire']/upgrade_targets">
		<upgrade_targets>
			<upgrade_target
				id="NPCCharacter.imperial_t1_tirones" />
		</upgrade_targets>
	</xsl:template>
	
	<xsl:template match="NPCCharacter[@id='fighter_empire']/upgrade_targets">
		<upgrade_targets>
			<upgrade_target
				id="NPCCharacter.imperial_t1_tirones" />
		</upgrade_targets>
	</xsl:template>
</xsl:stylesheet>

