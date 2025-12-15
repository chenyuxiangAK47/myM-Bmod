# Rebuild XML files from troop_overview.md
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
$cultureSections = $content -split '(?=^## )' | Where-Object { $_ -match '^## (Empire|Vlandia|Battania|Sturgia|Khuzait|Aserai|Nord)' }

foreach ($section in $cultureSections) {
    if ($section -match '^## (\w+)') {
        $cultureName = $matches[1]
        $cultureId = $cultures[$cultureName]
        $faceTemplate = $faceTemplates[$cultureName]
        
        Write-Host "Processing culture: $cultureName"
        
        # Extract table rows (skip header lines)
        $rows = $section -split "`n" | Where-Object { 
            $_ -match '^\|\| ' -and $_ -notmatch '^\| id \|' -and $_ -notmatch '^\|-' 
        }
        
        $xmlContent = @"
<?xml version="1.0" encoding="utf-8"?>
<NPCCharacters>
	<!-- ================================================= -->
	<!-- =============== $cultureName Troops =============== -->
	<!-- ================================================= -->
	
"@
        
        foreach ($row in $rows) {
            # Parse row: | id | name | group | level | Skills | Equip |
            if ($row -match '\|\| ([^|]+) \| ([^|]+) \| ([^|]+) \| (\d+) \| ([^|]+) \| ([^|]+) \|') {
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
                $basicAttr = if ($isBasic) { "`n`t`tis_basic_troop=`"true`"" } else { "" }
                
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
                
                # Determine upgrade targets (simplified - would need more logic)
                $upgradeTargets = @()
                
                # Generate XML for this troop
                $xmlContent += @"
	<!-- $name -->
	<NPCCharacter
		id="$id"
		default_group="$group"
		level="$level"
		name="{=$id}$name"
		occupation="Soldier"$basicAttr
		culture="$cultureId">
		<face>
			<face_key_template
				value="$faceTemplate" />
		</face>
		<skills>
			<skill
				id="Athletics"
				value="$athletics" />
			<skill
				id="Riding"
				value="$riding" />
			<skill
				id="OneHanded"
				value="$oneHanded" />
			<skill
				id="TwoHanded"
				value="$twoHanded" />
			<skill
				id="Polearm"
				value="$polearm" />
			<skill
				id="Bow"
				value="$bow" />
			<skill
				id="Crossbow"
				value="$crossbow" />
			<skill
				id="Throwing"
				value="$throwing" />
		</skills>
		<upgrade_targets>
$($upgradeTargets -join "`n")
		</upgrade_targets>
		<Equipments>
			<EquipmentRoster>
$(
    $equipments | ForEach-Object {
				"`t`t`t`t<equipment`n`t`t`t`t`tslot=`"$($_.Slot)`"`n`t`t`t`t`tid=`"Item.$($_.Item)`" />"
    } | Out-String
)
			</EquipmentRoster>
		</Equipments>
	</NPCCharacter>
	
"@
            }
        }
        
        $xmlContent += "</NPCCharacters>`n"
        
        # Write to file
        $outputFile = Join-Path $outputPath "${cultureName.ToLower()}_troops_new.xml"
        [System.IO.File]::WriteAllText($outputFile, $xmlContent, [System.Text.Encoding]::UTF8)
        Write-Host "Generated: $outputFile"
    }
}

Write-Host "Done!"



