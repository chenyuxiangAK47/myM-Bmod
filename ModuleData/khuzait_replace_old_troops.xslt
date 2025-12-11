<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 完全删除旧的Khuzait兵种 -->
	<xsl:template match="NPCCharacter[@id='khuzait_nomad']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_tribesman']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_spearman']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_hunter']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_horse_archer']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_raider']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_heavy_horse_archer']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_darkhan']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_lancer']"/>
	<xsl:template match="NPCCharacter[@id='khuzait_heavy_lancer']"/>
</xsl:stylesheet>







