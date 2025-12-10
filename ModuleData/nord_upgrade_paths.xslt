<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 修改Nord农民（villager_nord）的升级路径，使其可以升级到新的T1兵种 -->
	<xsl:template match="NPCCharacter[@id='villager_nord']/upgrade_targets">
		<upgrade_targets>
			<upgrade_target
				id="NPCCharacter.nord_youth" />
		</upgrade_targets>
	</xsl:template>
	
	<!-- 修改Nord农民（fighter_nord）的升级路径，使其可以升级到新的T1兵种 -->
	<xsl:template match="NPCCharacter[@id='fighter_nord']/upgrade_targets">
		<upgrade_targets>
			<upgrade_target
				id="NPCCharacter.nord_youth" />
		</upgrade_targets>
	</xsl:template>
</xsl:stylesheet>


