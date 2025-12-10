<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 完全删除旧的Nord兵种（参考3619068840 mod的方式） -->
	<xsl:template match="NPCCharacter[@id='nord_youngling']"/>
	<xsl:template match="NPCCharacter[@id='nord_drengr']"/>
	<xsl:template match="NPCCharacter[@id='nord_huntsman']"/>
	<xsl:template match="NPCCharacter[@id='nord_axe_warrior']"/>
	<xsl:template match="NPCCharacter[@id='nord_spear_warrior']"/>
	<xsl:template match="NPCCharacter[@id='nord_freeman_archer']"/>
	<xsl:template match="NPCCharacter[@id='nord_vargr']"/>
</xsl:stylesheet>

