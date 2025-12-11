<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 修改Imperial文化的基础兵种设置 -->
	<xsl:template match="Culture[@id='empire']/@basic_troop">
		<xsl:attribute name="basic_troop">NPCCharacter.imperial_t1_tirones</xsl:attribute>
	</xsl:template>
	
	<!-- 修改Imperial文化的贵族兵种设置 -->
	<xsl:template match="Culture[@id='empire']/@elite_basic_troop">
		<xsl:attribute name="elite_basic_troop">NPCCharacter.imperial_t1_wealthy_citizen</xsl:attribute>
	</xsl:template>
</xsl:stylesheet>






