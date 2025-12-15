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
        
        // 原版装备ID集合（从原版XML文件中加载）
        this.vanillaItemIds = new Set();
        this.itemIdValidationEnabled = false;
    }
    
    // 加载原版装备ID列表（从XML文件）
    async loadVanillaItems(xmlFile) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(e.target.result, 'text/xml');
                    
                    const parseError = xmlDoc.querySelector('parsererror');
                    if (parseError) {
                        reject(new Error('XML解析失败: ' + parseError.textContent));
                        return;
                    }
                    
                    // 查找所有Item节点
                    const items = xmlDoc.getElementsByTagName('Item');
                    this.vanillaItemIds.clear();
                    
                    for (let item of items) {
                        const id = item.getAttribute('id');
                        if (id) {
                            // 存储ID（去掉Item.前缀，因为我们的装备ID已经去掉了）
                            const cleanId = id.replace(/^Item\./, '');
                            this.vanillaItemIds.add(cleanId);
                        }
                    }
                    
                    this.itemIdValidationEnabled = true;
                    console.log(`已加载 ${this.vanillaItemIds.size} 个原版装备ID`);
                    resolve(this.vanillaItemIds.size);
                } catch (error) {
                    console.error('加载原版装备ID时出错:', error);
                    reject(error);
                }
            };
            reader.onerror = (error) => {
                reject(new Error('读取文件失败: ' + error));
            };
            reader.readAsText(xmlFile, 'UTF-8');
        });
    }
    
    // 检查装备ID是否存在
    checkItemExists(itemId) {
        if (!this.itemIdValidationEnabled) {
            return null; // 未启用验证，返回null表示未知
        }
        return this.vanillaItemIds.has(itemId);
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

        // 7. 检查装备ID是否在原版数据库中存在
        if (this.itemIdValidationEnabled) {
            for (let slot in equipmentBySlot) {
                for (let itemId of equipmentBySlot[slot]) {
                    if (!this.checkItemExists(itemId)) {
                        issues.push({
                            type: 'error',
                            slot: slot,
                            message: `装备ID不存在于原版数据库: ${itemId}`
                        });
                    }
                }
            }
        }

        return issues;
    }

    // 判断是否为骑兵
    isCavalry(troop) {
        // 如果 defaultGroup 明确是骑兵，直接返回 true
        if (troop.defaultGroup === 'Cavalry' || troop.defaultGroup === 'HorseArcher') {
            return true;
        }
        // 否则需要检查装备中是否有马，以及技能是否足够高
        // 避免误判（比如步兵有 Riding=60 但没有马）
        if (troop.skills && troop.skills.Riding > 50) {
            // 需要检查装备中是否真的有马
            if (troop.equipment && troop.equipment.length > 0) {
                const mainEquipment = troop.equipment[0];
                const items = mainEquipment.items || [];
                for (let item of items) {
                    if (item.slot === 'Horse') {
                        return true;
                    }
                }
            }
        }
        return false;
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
        // 如果 defaultGroup 明确是远程单位，直接返回 true
        if (troop.defaultGroup === 'Ranged' || troop.defaultGroup === 'HorseArcher') {
            return true;
        }
        // 否则需要检查装备中是否有弓或弩，以及技能是否足够高
        // 避免误判（比如步兵有 Bow=60 但没有弓）
        if (troop.skills && (troop.skills.Bow > 50 || troop.skills.Crossbow > 50)) {
            // 需要检查装备中是否真的有弓或弩
            if (troop.equipment && troop.equipment.length > 0) {
                const mainEquipment = troop.equipment[0];
                const items = mainEquipment.items || [];
                for (let item of items) {
                    const lowerId = item.id.toLowerCase();
                    if (this.weaponKeywords.bow.some(k => lowerId.includes(k)) ||
                        this.weaponKeywords.crossbow.some(k => lowerId.includes(k))) {
                        return true;
                    }
                }
            }
        }
        return false;
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

        // 优先检查弩手（因为弩手不会同时有弓）
        if (hasCrossbow && !hasBolts) {
            issues.push({
                type: 'error',
                slot: 'Item1',
                message: '弩手缺少弩箭'
            });
        }

        // 检查弓手（只有在没有弩的情况下才检查）
        if (hasBow && !hasCrossbow && !hasArrows) {
            issues.push({
                type: 'error',
                slot: 'Item1',
                message: '弓箭手缺少箭矢'
            });
        }

        // 检查是否有远程武器（只有在既没有弓也没有弩的情况下才报错）
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
