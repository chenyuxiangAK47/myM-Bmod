# 为所有派系添加升级路径的脚本
# 根据troop_overview.md的兵种树结构

$ErrorActionPreference = "Stop"

# 帝国派系升级路径映射
$imperialUpgrades = @{
    "imperial_navy_infantry_t2" = @("imperial_navy_spearman_t3")
    "imperial_navy_spearman_t3" = @("imperial_navy_veteran_spearman_t4")
    "imperial_navy_veteran_spearman_t4" = @("imperial_navy_hardened_spearman_t5")
    "imperial_navy_archer_t3" = @("imperial_navy_veteran_archer_t4")
    "imperial_navy_veteran_archer_t4" = @("imperial_navy_hardened_archer_t5")
    "imperial_legion_infantry_t2" = @("imperial_legion_regular_t3")
    "imperial_legion_regular_t3" = @("imperial_legion_vanguard_t4")
    "imperial_legion_vanguard_t4" = @("imperial_legion_service_veteran_t5")
    "imperial_aux_bowman_t2" = @("imperial_regular_archer_t3")
    "imperial_regular_archer_t3" = @("imperial_veteran_archer_t4")
    "imperial_veteran_archer_t4" = @("imperial_hardened_archer_t5")
    "imperial_regular_crossbowman_t3" = @("imperial_heavy_crossbowman_t4")
    "imperial_heavy_crossbowman_t4" = @("imperial_hardened_crossbowman_t5")
    "imperial_aux_cavalry_t2" = @("imperial_lancer_t3", "imperial_horse_archer_t3", "imperial_crossbow_cavalry_t3")
    "imperial_lancer_t3" = @("imperial_veteran_lancer_t4")
    "imperial_veteran_lancer_t4" = @("imperial_heavy_lancer_t5")
    "imperial_horse_archer_t3" = @("imperial_veteran_horse_archer_t4")
    "imperial_veteran_horse_archer_t4" = @("imperial_hardened_horse_archer_t5")
    "imperial_crossbow_cavalry_t3" = @("imperial_heavy_crossbow_cavalry_t4")
    "imperial_heavy_crossbow_cavalry_t4" = @("imperial_hardened_crossbow_cavalry_t5")
    "imperial_noble_t2_noble_cavalry" = @("imperial_noble_t3_heavy_noble_cavalry")
    "imperial_noble_t3_heavy_noble_cavalry" = @("imperial_noble_t4_royal_heavy_cavalry")
    "imperial_noble_t4_royal_heavy_cavalry" = @("imperial_noble_t5_palace_heavy_cavalry")
    "imperial_noble_t2_noble_bow_lancer" = @("imperial_noble_t3_heavy_bow_cavalry")
    "imperial_noble_t3_heavy_bow_cavalry" = @("imperial_noble_t4_elite_bow_lancer")
    "imperial_noble_t4_elite_bow_lancer" = @("imperial_noble_t5_palace_bow_lancer")
    "imperial_noble_t2_eagle_legion_recruit" = @("imperial_noble_t3_eagle_legionary")
    "imperial_noble_t3_eagle_legionary" = @("imperial_noble_t4_eagle_heavy_legionary")
    "imperial_noble_t4_eagle_heavy_legionary" = @("imperial_noble_t5_eagle_guard_legionary")
    "imperial_noble_t2_guard_archer_trainee" = @("imperial_noble_t3_guard_archer")
    "imperial_noble_t3_guard_archer" = @("imperial_noble_t4_heavy_guard_archer")
    "imperial_noble_t4_heavy_guard_archer" = @("imperial_noble_t5_palace_guard_archer")
}

Write-Host "开始处理帝国派系升级路径..."

$file = "imperial_troops_new.xml"
$content = Get-Content $file -Raw -Encoding UTF8

foreach ($troopId in $imperialUpgrades.Keys) {
    $targets = $imperialUpgrades[$troopId]
    $pattern = "id=`"$troopId`"[\s\S]*?<upgrade_targets>\s*</upgrade_targets>"
    
    if ($content -match $pattern) {
        $replacement = "id=`"$troopId`"`$1<upgrade_targets>`n"
        foreach ($target in $targets) {
            $replacement += "`t`t`t<upgrade_target`n`t`t`t`tid=`"NPCCharacter.$target`" />`n"
        }
        $replacement += "`t`t</upgrade_targets>"
        
        $content = $content -replace $pattern, $replacement
        Write-Host "已为 $troopId 添加升级路径"
    }
}

Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
Write-Host "帝国派系处理完成！"
