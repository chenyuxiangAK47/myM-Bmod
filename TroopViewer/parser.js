// XML解析器和数据管理器
class TroopParser {
    constructor() {
        this.troops = [];
        this.troopMap = new Map();
    }

    async parseXMLFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(e.target.result, 'text/xml');
                    
                    // 检查XML解析错误
                    const parseError = xmlDoc.querySelector('parsererror');
                    if (parseError) {
                        console.error('XML解析错误:', parseError.textContent);
                        console.error('文件内容:', e.target.result.substring(0, 500));
                        reject(new Error('XML解析失败: ' + parseError.textContent));
                        return;
                    }
                    
                    const troops = this.extractTroops(xmlDoc);
                    
                    // 调试信息
                    if (troops.length === 0) {
                        console.warn('文件', file.name, '未找到兵种');
                        console.log('XML文档根节点:', xmlDoc.documentElement?.tagName);
                        console.log('NPCCharacter节点数:', xmlDoc.getElementsByTagName('NPCCharacter').length);
                    }
                    
                    resolve(troops);
                } catch (error) {
                    console.error('解析文件时出错:', file.name, error);
                    reject(error);
                }
            };
            reader.onerror = (error) => {
                console.error('读取文件时出错:', file.name, error);
                reject(error);
            };
            reader.readAsText(file, 'UTF-8');
        });
    }

    extractTroops(xmlDoc) {
        const troops = [];
        
        // 尝试多种方式查找 NPCCharacter 节点
        let npcCharacters = xmlDoc.getElementsByTagName('NPCCharacter');
        
        // 如果没找到，尝试使用 querySelectorAll
        if (npcCharacters.length === 0) {
            npcCharacters = xmlDoc.querySelectorAll('NPCCharacter');
        }
        
        // 如果还是没找到，尝试查找所有节点
        if (npcCharacters.length === 0) {
            console.warn('未找到NPCCharacter节点');
            const allNodes = xmlDoc.getElementsByTagName('*');
            const nodeNames = Array.from(allNodes).map(n => n.tagName);
            console.log('XML中的所有节点标签:', [...new Set(nodeNames)]);
            console.log('XML根节点:', xmlDoc.documentElement?.tagName);
            console.log('XML文档类型:', xmlDoc.documentElement?.namespaceURI);
        } else {
            console.log(`找到 ${npcCharacters.length} 个NPCCharacter节点`);
        }

        for (let npc of npcCharacters) {
            const troop = {
                id: npc.getAttribute('id'),
                name: this.getTextContent(npc, 'name') || npc.getAttribute('id'),
                level: parseInt(npc.getAttribute('level')) || 0,
                tier: this.extractTier(npc.getAttribute('id'), npc.getAttribute('level')),
                culture: this.extractCulture(npc.getAttribute('culture')),
                defaultGroup: npc.getAttribute('default_group') || 'Infantry',
                occupation: npc.getAttribute('occupation') || 'Soldier',
                isBasicTroop: npc.getAttribute('is_basic_troop') === 'true',
                skills: this.extractSkills(npc),
                equipment: this.extractEquipment(npc),
                upgradeTargets: this.extractUpgradeTargets(npc),
                traits: this.extractTraits(npc)
            };

            troops.push(troop);
            // 注意：不要在这里添加到 troopMap，应该由 addTroops 统一管理
        }

        return troops;
    }

    extractTier(id, level) {
        // 从ID中提取tier
        const tierMatch = id.match(/t(\d+)/i);
        if (tierMatch) {
            return parseInt(tierMatch[1]);
        }
        // 从level推断tier
        if (level <= 6) return 1;
        if (level <= 11) return 2;
        if (level <= 16) return 3;
        if (level <= 21) return 4;
        return 5;
    }

    extractCulture(cultureAttr) {
        if (!cultureAttr) return 'unknown';
        const match = cultureAttr.match(/Culture\.(\w+)/);
        return match ? match[1] : cultureAttr;
    }

    extractSkills(npc) {
        const skills = {};
        const skillElements = npc.getElementsByTagName('skill');
        for (let skill of skillElements) {
            const id = skill.getAttribute('id');
            const value = parseInt(skill.getAttribute('value')) || 0;
            skills[id] = value;
        }
        return skills;
    }

    extractEquipment(npc) {
        const equipment = [];
        const equipmentRosters = npc.getElementsByTagName('EquipmentRoster');

        for (let roster of equipmentRosters) {
            const rosterData = {
                items: []
            };
            const equipmentElements = roster.getElementsByTagName('equipment');
            for (let eq of equipmentElements) {
                const slot = eq.getAttribute('slot');
                const id = eq.getAttribute('id');
                if (slot && id) {
                    rosterData.items.push({
                        slot: slot,
                        id: id.replace('Item.', '')
                    });
                }
            }
            if (rosterData.items.length > 0) {
                equipment.push(rosterData);
            }
        }

        return equipment;
    }

    extractUpgradeTargets(npc) {
        const targets = [];
        const upgradeTargets = npc.getElementsByTagName('upgrade_target');
        for (let target of upgradeTargets) {
            const id = target.getAttribute('id');
            if (id) {
                targets.push(id.replace('NPCCharacter.', ''));
            }
        }
        return targets;
    }

    extractTraits(npc) {
        const traits = [];
        const traitElements = npc.getElementsByTagName('Trait');
        for (let trait of traitElements) {
            traits.push({
                id: trait.getAttribute('id'),
                value: parseInt(trait.getAttribute('value')) || 0
            });
        }
        return traits;
    }

    getTextContent(element, tagName) {
        const tag = element.getElementsByTagName(tagName)[0];
        if (tag) {
            let text = tag.textContent || tag.innerText;
            // 移除{=...}格式的本地化标记
            text = text.replace(/\{=[^}]+\}/g, '').trim();
            return text;
        }
        return null;
    }

    addTroops(newTroops) {
        for (let troop of newTroops) {
            if (!this.troopMap.has(troop.id)) {
                this.troops.push(troop);
                this.troopMap.set(troop.id, troop);
            }
        }
    }

    getAllTroops() {
        return this.troops;
    }

    getTroopById(id) {
        return this.troopMap.get(id);
    }

    filterTroops(searchTerm, culture, tier) {
        return this.troops.filter(troop => {
            const matchesSearch = !searchTerm || 
                troop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                troop.id.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCulture = !culture || 
                troop.culture.toLowerCase() === culture.toLowerCase();
            
            const matchesTier = !tier || troop.tier === parseInt(tier);

            return matchesSearch && matchesCulture && matchesTier;
        });
    }

    buildTroopTree(startTroopId) {
        const tree = [];
        const visited = new Set();

        const buildNode = (troopId, depth = 0) => {
            if (visited.has(troopId) || depth > 10) return null;
            visited.add(troopId);

            const troop = this.getTroopById(troopId);
            if (!troop) return null;

            const node = {
                troop: troop,
                children: [],
                depth: depth
            };

            for (let targetId of troop.upgradeTargets) {
                const child = buildNode(targetId, depth + 1);
                if (child) {
                    node.children.push(child);
                }
            }

            return node;
        };

        return buildNode(startTroopId);
    }
}

// 全局解析器实例
const troopParser = new TroopParser();
































