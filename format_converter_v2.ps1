# Format Converter Script v2
# Converts XML files to match test unit format (each attribute on separate line)

param(
    [string]$FilePath
)

Write-Host "Converting: $FilePath"

$content = Get-Content $FilePath -Raw -Encoding UTF8

# Convert <skill id="X" value="Y" /> to multi-line format
# Match with proper indentation detection
$content = $content -replace '(?m)^(\s*)<skill id="([^"]+)" value="([^"]+)" />', {
    param($match)
    $indent = $match.Groups[1].Value
    $id = $match.Groups[2].Value
    $value = $match.Groups[3].Value
    "$indent<skill`n$indent`tid=`"$id`"`n$indent`tvalue=`"$value`" />"
}

# Convert <face_key_template value="X" /> to multi-line format
$content = $content -replace '(?m)^(\s*)<face_key_template value="([^"]+)" />', {
    param($match)
    $indent = $match.Groups[1].Value
    $value = $match.Groups[2].Value
    "$indent<face_key_template`n$indent`t`tvalue=`"$value`" />"
}

# Convert <equipment slot="X" id="Y" /> to multi-line format
$content = $content -replace '(?m)^(\s*)<equipment slot="([^"]+)" id="([^"]+)" />', {
    param($match)
    $indent = $match.Groups[1].Value
    $slot = $match.Groups[2].Value
    $id = $match.Groups[3].Value
    "$indent<equipment`n$indent`t`tslot=`"$slot`"`n$indent`t`tid=`"$id`" />"
}

# Convert <upgrade_target id="X" /> to multi-line format
$content = $content -replace '(?m)^(\s*)<upgrade_target id="([^"]+)" />', {
    param($match)
    $indent = $match.Groups[1].Value
    $id = $match.Groups[2].Value
    "$indent<upgrade_target`n$indent`t`tid=`"$id`" />"
}

# Save the converted content
$fullPath = (Resolve-Path $FilePath -ErrorAction SilentlyContinue).Path
if (-not $fullPath) {
    $fullPath = Join-Path (Get-Location) $FilePath
}
[System.IO.File]::WriteAllText($fullPath, $content, [System.Text.Encoding]::UTF8)

Write-Host "Converted: $FilePath"



