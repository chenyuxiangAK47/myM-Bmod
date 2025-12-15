<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output omit-xml-declaration="yes"/>
	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:copy>
	</xsl:template>
	
	<!-- 完全删除旧的Aserai兵种 -->
	<xsl:template match="NPCCharacter[@id='aserai_recruit']"/>
	<xsl:template match="NPCCharacter[@id='aserai_tribesman']"/>
	<xsl:template match="NPCCharacter[@id='aserai_footman']"/>
	<xsl:template match="NPCCharacter[@id='aserai_infantry']"/>
	<xsl:template match="NPCCharacter[@id='aserai_veteran_infantry']"/>
	<xsl:template match="NPCCharacter[@id='aserai_skirmisher']"/>
	<xsl:template match="NPCCharacter[@id='aserai_archer']"/>
	<xsl:template match="NPCCharacter[@id='aserai_master_archer']"/>
	<xsl:template match="NPCCharacter[@id='aserai_mameluke']"/>
	<xsl:template match="NPCCharacter[@id='aserai_mameluke_heavy']"/>
	<xsl:template match="NPCCharacter[@id='aserai_faris']"/>
	<xsl:template match="NPCCharacter[@id='aserai_vanguard_faris']"/>
</xsl:stylesheet>

































