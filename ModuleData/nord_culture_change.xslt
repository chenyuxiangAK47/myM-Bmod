<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 修改Nord文化的基础兵种设置 -->
	<xsl:template match="Culture[@id='nord']/@basic_troop">
		<xsl:attribute name="basic_troop">NPCCharacter.nord_youth</xsl:attribute>
	</xsl:template>
	
	<!-- 修改Nord文化的贵族兵种设置 -->
	<xsl:template match="Culture[@id='nord']/@elite_basic_troop">
		<xsl:attribute name="elite_basic_troop">NPCCharacter.nord_noble_t1_scion</xsl:attribute>
	</xsl:template>
</xsl:stylesheet>
