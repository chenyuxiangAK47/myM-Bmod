# Format Converter Script
# Converts XML files to match test unit format (each attribute on separate line)

param(
    [string]$FilePath
)

$lines = Get-Content $FilePath -Encoding UTF8
$output = @()

foreach ($line in $lines) {
    # Convert <skill id="X" value="Y" /> to multi-line format
    if ($line -match '^\s*<skill id="([^"]+)" value="([^"]+)" />') {
        $indent = $line -replace '^(\s*).*', '$1'
        $output += "$indent<skill"
        $output += "$indent`tid=`"$($matches[1])`""
        $output += "$indent`tvalue=`"$($matches[2])`" />"
        continue
    }
    
    # Convert <face_key_template value="X" /> to multi-line format
    if ($line -match '^\s*<face_key_template value="([^"]+)" />') {
        $indent = $line -replace '^(\s*).*', '$1'
        $output += "$indent<face_key_template"
        $output += "$indent`t`tvalue=`"$($matches[1])`" />"
        continue
    }
    
    # Convert <equipment slot="X" id="Y" /> to multi-line format
    if ($line -match '^\s*<equipment slot="([^"]+)" id="([^"]+)" />') {
        $indent = $line -replace '^(\s*).*', '$1'
        $output += "$indent<equipment"
        $output += "$indent`t`tslot=`"$($matches[1])`""
        $output += "$indent`t`tid=`"$($matches[2])`" />"
        continue
    }
    
    # Convert <upgrade_target id="X" /> to multi-line format
    if ($line -match '^\s*<upgrade_target id="([^"]+)" />') {
        $indent = $line -replace '^(\s*).*', '$1'
        $output += "$indent<upgrade_target"
        $output += "$indent`t`tid=`"$($matches[1])`" />"
        continue
    }
    
    # Keep other lines as-is
    $output += $line
}

# Save the converted content
$output | Set-Content -Path $FilePath -Encoding UTF8

Write-Host "Converted: $FilePath"



