<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 完全删除旧的Vlandia兵种 -->
	<xsl:template match="NPCCharacter[@id='vlandian_recruit']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_footman']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_sergeant']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_voulgier']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_billman']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_peasant']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_archer']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_crossbowman']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_sharpshooter']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_vanguard']"/>
	<xsl:template match="NPCCharacter[@id='vlandian_champion']"/>
</xsl:stylesheet>






