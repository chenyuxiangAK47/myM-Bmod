// 装备验证器
class EquipmentValidator {
    constructor() {
        // 武器类型关键词
        this.weaponKeywords = {
            sword: ['sword', 'blade', 'sabre'],
            axe: ['axe', 'hatchet'],
            mace: ['mace', 'club', 'hammer'],
            polearm: ['spear', 'lance', 'pike', 'polearm', 'glaive', 'billhook'],
            bow: ['bow', 'longbow', 'shortbow', 'composite', 'yew'],
            crossbow: ['crossbow'],
            throwing: ['javelin', 'throwing', 'knife'],
            twoHanded: ['2h', 'two_handed', '2hsword', '2haxe']
        };
        
        // 箭矢类型
        this.ammoKeywords = {
            arrows: ['arrow', 'arrows'],
            bolts: ['bolt', 'bolts']
        };
        
        // 装备槽位类型
        this.slotTypes = {
            weapon: ['Item0', 'Item1', 'Item2', 'Item3'],
            armor: ['Head', 'Body', 'Leg', 'Gloves', 'Cape'],
            mount: ['Horse', 'HorseHarness']
        };
    }

    // 验证所有兵种
    validateAllTroops(troops) {
        const results = [];
        
        for (let troop of troops) {
            const issues = this.validateTroop(troop);
            if (issues.length > 0) {
                results.push({
                    troop: troop,
                    issues: issues
                });
            }
        }
        
        return results;
    }

    // 验证单个兵种
    validateTroop(troop) {
        const issues = [];
        
        if (!troop.equipment || troop.equipment.length === 0) {
            issues.push({
                type: 'error',
                message: '没有装备配置'
            });
            return issues;
        }

        // 检查第一个装备配置（主要配置）
        const mainEquipment = troop.equipment[0];
        const items = mainEquipment.items || [];
        
        // 按槽位组织装备
        const equipmentBySlot = {};
        items.forEach(item => {
            if (!equipmentBySlot[item.slot]) {
                equipmentBySlot[item.slot] = [];
            }
            equipmentBySlot[item.slot].push(item.id);
        });

        // 1. 检查骑兵是否有马
        if (this.isCavalry(troop)) {
            if (!equipmentBySlot['Horse']) {
                issues.push({
                    type: 'error',
                    slot: 'Horse',
                    message: '骑兵缺少坐骑'
                });
            }
        }

        // 2. 检查步兵是否有鞋子
        if (this.isInfantry(troop)) {
            if (!equipmentBySlot['Leg']) {
                issues.push({
                    type: 'warning',
                    slot: 'Leg',
                    message: '步兵缺少腿部装备（鞋子）'
                });
            }
        }

        // 3. 检查是否有武器
        const hasWeapon = this.hasWeapon(equipmentBySlot);
        if (!hasWeapon) {
            issues.push({
                type: 'error',
                slot: 'Item0-3',
                message: '缺少武器'
            });
        }

        // 4. 检查远程单位
        if (this.isRanged(troop)) {
            const rangedIssues = this.validateRangedEquipment(equipmentBySlot);
            issues.push(...rangedIssues);
        }

        // 5. 检查是否有头部装备
        if (!equipmentBySlot['Head']) {
            issues.push({
                type: 'warning',
                slot: 'Head',
                message: '缺少头部装备（头盔）'
            });
        }

        // 6. 检查是否有身体装备
        if (!equipmentBySlot['Body']) {
            issues.push({
                type: 'error',
                slot: 'Body',
                message: '缺少身体装备（护甲）'
            });
        }

        return issues;
    }

    // 判断是否为骑兵
    isCavalry(troop) {
        return troop.defaultGroup === 'Cavalry' || 
               troop.defaultGroup === 'HorseArcher' ||
               (troop.skills && troop.skills.Riding > 50);
    }

    // 判断是否为步兵
    isInfantry(troop) {
        return troop.defaultGroup === 'Infantry' || 
               (troop.defaultGroup !== 'Cavalry' && 
                troop.defaultGroup !== 'HorseArcher' &&
                (!troop.skills || troop.skills.Riding <= 50));
    }

    // 判断是否为远程单位
    isRanged(troop) {
        return troop.defaultGroup === 'Ranged' || 
               troop.defaultGroup === 'HorseArcher' ||
               (troop.skills && (troop.skills.Bow > 50 || troop.skills.Crossbow > 50));
    }

    // 检查是否有武器
    hasWeapon(equipmentBySlot) {
        for (let slot of this.slotTypes.weapon) {
            if (equipmentBySlot[slot]) {
                const items = equipmentBySlot[slot];
                for (let itemId of items) {
                    if (this.isWeapon(itemId)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // 判断是否为武器
    isWeapon(itemId) {
        const lowerId = itemId.toLowerCase();
        for (let type in this.weaponKeywords) {
            for (let keyword of this.weaponKeywords[type]) {
                if (lowerId.includes(keyword)) {
                    return true;
                }
            }
        }
        return false;
    }

    // 验证远程装备
    validateRangedEquipment(equipmentBySlot) {
        const issues = [];
        let hasBow = false;
        let hasCrossbow = false;
        let hasArrows = false;
        let hasBolts = false;

        // 检查所有槽位
        for (let slot in equipmentBySlot) {
            for (let itemId of equipmentBySlot[slot]) {
                const lowerId = itemId.toLowerCase();
                
                // 检查弓
                if (this.weaponKeywords.bow.some(k => lowerId.includes(k))) {
                    hasBow = true;
                }
                
                // 检查弩
                if (this.weaponKeywords.crossbow.some(k => lowerId.includes(k))) {
                    hasCrossbow = true;
                }
                
                // 检查箭矢
                if (this.ammoKeywords.arrows.some(k => lowerId.includes(k))) {
                    hasArrows = true;
                }
                
                // 检查弩箭
                if (this.ammoKeywords.bolts.some(k => lowerId.includes(k))) {
                    hasBolts = true;
                }
            }
        }

        // 检查弓手
        if (hasBow && !hasArrows) {
            issues.push({
                type: 'error',
                slot: 'Item1',
                message: '弓箭手缺少箭矢'
            });
        }

        // 检查弩手
        if (hasCrossbow && !hasBolts) {
            issues.push({
                type: 'error',
                slot: 'Item1',
                message: '弩手缺少弩箭'
            });
        }

        // 检查是否有远程武器
        if (!hasBow && !hasCrossbow) {
            issues.push({
                type: 'error',
                slot: 'Item0',
                message: '远程单位缺少弓或弩'
            });
        }

        return issues;
    }

    // 生成验证报告（文本格式，方便复制）
    generateReport(validationResults) {
        if (validationResults.length === 0) {
            return '✅ 所有兵种装备检查通过！没有发现问题。';
        }

        let report = `装备验证报告\n`;
        report += `发现 ${validationResults.length} 个兵种存在问题\n`;
        report += `生成时间: ${new Date().toLocaleString('zh-CN')}\n\n`;
        report += '='.repeat(60) + '\n\n';

        for (let result of validationResults) {
            const troop = result.troop;
            report += `兵种: ${troop.name}\n`;
            report += `ID: ${troop.id}\n`;
            report += `类型: ${troop.defaultGroup} | 等级: T${troop.tier} | 文化: ${troop.culture}\n`;
            report += `问题数量: ${result.issues.length}\n`;
            report += '-'.repeat(60) + '\n';
            
            for (let issue of result.issues) {
                const icon = issue.type === 'error' ? '❌' : '⚠️';
                report += `${icon} [${issue.slot || '未知'}] ${issue.message}\n`;
            }
            
            report += '\n';
        }

        report += '='.repeat(60) + '\n';
        report += `总计: ${validationResults.length} 个兵种存在问题\n`;
        
        // 统计问题类型
        let errorCount = 0;
        let warningCount = 0;
        for (let result of validationResults) {
            for (let issue of result.issues) {
                if (issue.type === 'error') errorCount++;
                else warningCount++;
            }
        }
        
        report += `错误: ${errorCount} 个 | 警告: ${warningCount} 个\n`;

        return report;
    }
}

// 全局验证器实例
const equipmentValidator = new EquipmentValidator();
