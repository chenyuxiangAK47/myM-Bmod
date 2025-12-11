<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 完全删除旧的Imperial兵种 -->
	<xsl:template match="NPCCharacter[@id='imperial_recruit']"/>
	<xsl:template match="NPCCharacter[@id='imperial_infantryman']"/>
	<xsl:template match="NPCCharacter[@id='imperial_veteran_infantryman']"/>
	<xsl:template match="NPCCharacter[@id='imperial_legionary']"/>
	<xsl:template match="NPCCharacter[@id='imperial_archer']"/>
	<xsl:template match="NPCCharacter[@id='imperial_trained_archer']"/>
	<xsl:template match="NPCCharacter[@id='imperial_veteran_archer']"/>
	<xsl:template match="NPCCharacter[@id='imperial_crossbowman']"/>
	<xsl:template match="NPCCharacter[@id='imperial_sergeant_crossbowman']"/>
	<xsl:template match="NPCCharacter[@id='imperial_menavliaton']"/>
	<xsl:template match="NPCCharacter[@id='imperial_elite_menavliaton']"/>
	<xsl:template match="NPCCharacter[@id='imperial_horseman']"/>
	<xsl:template match="NPCCharacter[@id='imperial_cataphract']"/>
	<xsl:template match="NPCCharacter[@id='imperial_elite_cataphract']"/>
	<xsl:template match="NPCCharacter[@id='bucellarii']"/>
</xsl:stylesheet>

