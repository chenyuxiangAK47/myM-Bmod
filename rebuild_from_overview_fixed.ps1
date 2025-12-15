# Rebuild XML files from troop_overview.md - Fixed Version
# This script parses the markdown file and generates properly formatted XML

param(
    [string]$OverviewFile = "troop_overview.md",
    [string]$OutputDir = "ModuleData"
)

$overviewPath = Join-Path (Get-Location) $OverviewFile
$outputPath = Join-Path (Get-Location) $OutputDir

Write-Host "Reading overview file: $overviewPath"
$content = Get-Content $overviewPath -Raw -Encoding UTF8

# Culture mapping
$cultures = @{
    "Empire" = "Culture.empire"
    "Vlandia" = "Culture.vlandia"
    "Battania" = "Culture.battania"
    "Sturgia" = "Culture.sturgia"
    "Khuzait" = "Culture.khuzait"
    "Aserai" = "Culture.aserai"
    "Nord" = "Culture.nord"
}

# Face template mapping
$faceTemplates = @{
    "Empire" = "BodyProperty.fighter_empire"
    "Vlandia" = "BodyProperty.fighter_vlandia"
    "Battania" = "BodyProperty.fighter_battania"
    "Sturgia" = "BodyProperty.fighter_sturgia"
    "Khuzait" = "BodyProperty.fighter_khuzait"
    "Aserai" = "BodyProperty.fighter_aserai"
    "Nord" = "BodyProperty.fighter_nord"
}

# Parse each culture section
$cultureSections = $content -split '(?m)(?=^## )' | Where-Object { $_ -match '(?m)^## (Empire|Vlandia|Battania|Sturgia|Khuzait|Aserai|Nord)' }

foreach ($section in $cultureSections) {
    if ($section -match '(?m)^## (\w+)') {
        $cultureName = $matches[1]
        $cultureId = $cultures[$cultureName]
        $faceTemplate = $faceTemplates[$cultureName]
        
        Write-Host "Processing culture: $cultureName"
        
        # Extract table rows (skip header lines)
        $rows = $section -split "`r?`n" | Where-Object { 
            $_ -match '^\| ' -and $_ -notmatch '^\| id \|' -and $_ -notmatch '^\|-' 
        }
        
        Write-Host "  Found $($rows.Count) data rows"
        
        $xmlLines = @()
        $xmlLines += '<?xml version="1.0" encoding="utf-8"?>'
        $xmlLines += '<NPCCharacters>'
        $xmlLines += "	<!-- ================================================= -->"
        $xmlLines += "	<!-- =============== $cultureName Troops =============== -->"
        $xmlLines += "	<!-- ================================================= -->"
        $xmlLines += ""
        
        foreach ($row in $rows) {
            # Parse row: | id | name | group | level | Skills | Equip |
            $row = $row.Trim()
            if ($row -match '^\| ([^|]+) \| ([^|]+) \| ([^|]+) \| (\d+) \| ([^|]+) \| ([^|]+) \|$') {
                $id = $matches[1].Trim()
                $name = $matches[2].Trim()
                $group = $matches[3].Trim()
                $level = $matches[4].Trim()
                $skillsStr = $matches[5].Trim()
                $equipStr = $matches[6].Trim()
                
                # Parse skills: Ath/Rid/1H/2H/Pole/Bow/Xbow/Thr
                $skillValues = $skillsStr -split '/'
                $athletics = if ($skillValues[0]) { $skillValues[0].Trim() } else { "0" }
                $riding = if ($skillValues[1]) { $skillValues[1].Trim() } else { "0" }
                $oneHanded = if ($skillValues[2]) { $skillValues[2].Trim() } else { "0" }
                $twoHanded = if ($skillValues[3]) { $skillValues[3].Trim() } else { "0" }
                $polearm = if ($skillValues[4]) { $skillValues[4].Trim() } else { "0" }
                $bow = if ($skillValues[5]) { $skillValues[5].Trim() } else { "0" }
                $crossbow = if ($skillValues[6]) { $skillValues[6].Trim() } else { "0" }
                $throwing = if ($skillValues[7]) { $skillValues[7].Trim() } else { "0" }
                
                # Determine if basic troop
                $isBasic = ($level -eq "6")
                
                # Parse equipment
                $equipments = @()
                $equipParts = $equipStr -split ','
                foreach ($part in $equipParts) {
                    $part = $part.Trim()
                    if ($part -match '(\w+)=([\w_]+)') {
                        $slot = $matches[1]
                        $itemId = $matches[2]
                        $equipments += @{ Slot = $slot; Item = $itemId }
                    }
                }
                
                # Generate XML for this troop
                $xmlLines += "	<!-- $name -->"
                $xmlLines += "	<NPCCharacter"
                $xmlLines += "		id=`"$id`""
                $xmlLines += "		default_group=`"$group`""
                $xmlLines += "		level=`"$level`""
                $xmlLines += "		name=`"{=$id}$name`""
                $xmlLines += "		occupation=`"Soldier`""
                if ($isBasic) {
                    $xmlLines += "		is_basic_troop=`"true`""
                }
                $xmlLines += "		culture=`"$cultureId`">"
                $xmlLines += "		<face>"
                $xmlLines += "			<face_key_template"
                $xmlLines += "				value=`"$faceTemplate`" />"
                $xmlLines += "		</face>"
                $xmlLines += "		<skills>"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"Athletics`""
                $xmlLines += "				value=`"$athletics`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"Riding`""
                $xmlLines += "				value=`"$riding`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"OneHanded`""
                $xmlLines += "				value=`"$oneHanded`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"TwoHanded`""
                $xmlLines += "				value=`"$twoHanded`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"Polearm`""
                $xmlLines += "				value=`"$polearm`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"Bow`""
                $xmlLines += "				value=`"$bow`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"Crossbow`""
                $xmlLines += "				value=`"$crossbow`" />"
                $xmlLines += "			<skill"
                $xmlLines += "				id=`"Throwing`""
                $xmlLines += "				value=`"$throwing`" />"
                $xmlLines += "		</skills>"
                $xmlLines += "		<upgrade_targets>"
                $xmlLines += "		</upgrade_targets>"
                $xmlLines += "		<Equipments>"
                $xmlLines += "			<EquipmentRoster>"
                foreach ($equip in $equipments) {
                    $xmlLines += "				<equipment"
                    $xmlLines += "					slot=`"$($equip.Slot)`""
                    $xmlLines += "					id=`"Item.$($equip.Item)`" />"
                }
                $xmlLines += "			</EquipmentRoster>"
                $xmlLines += "		</Equipments>"
                $xmlLines += "	</NPCCharacter>"
                $xmlLines += ""
            }
        }
        
        $xmlLines += "</NPCCharacters>"
        
        # Write to file
        $cultureLower = $cultureName.ToLower()
        $outputFile = Join-Path $outputPath "${cultureLower}_troops_new.xml"
        $xmlLines | Set-Content -Path $outputFile -Encoding UTF8
        Write-Host "Generated: $outputFile ($($xmlLines.Count) lines)"
    }
}

Write-Host "Done!"



