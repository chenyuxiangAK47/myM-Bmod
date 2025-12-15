# Format Converter Script - Fixed Version
# Converts XML files to match test unit format (each attribute on separate line)

param(
    [string]$FilePath
)

Write-Host "Converting: $FilePath"

$content = Get-Content $FilePath -Raw -Encoding UTF8

# Convert <skill id="X" value="Y" /> to multi-line format
# Use simple string replacement with proper escaping
$content = $content -replace '<skill id="([^"]+)" value="([^"]+)" />', @'
<skill
				id="$1"
				value="$2" />
'@

# Convert <face_key_template value="X" /> to multi-line format
$content = $content -replace '<face_key_template value="([^"]+)" />', @'
<face_key_template
				value="$1" />
'@

# Convert <equipment slot="X" id="Y" /> to multi-line format
$content = $content -replace '<equipment slot="([^"]+)" id="([^"]+)" />', @'
<equipment
				slot="$1"
				id="$2" />
'@

# Convert <upgrade_target id="X" /> to multi-line format
$content = $content -replace '<upgrade_target id="([^"]+)" />', @'
<upgrade_target
				id="$1" />
'@

# Save the converted content
$fullPath = (Resolve-Path $FilePath -ErrorAction SilentlyContinue).Path
if (-not $fullPath) {
    $fullPath = Join-Path (Get-Location) $FilePath
}
[System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)

Write-Host "Converted: $FilePath"



