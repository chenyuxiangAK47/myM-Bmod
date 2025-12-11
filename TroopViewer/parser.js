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
                    const troops = this.extractTroops(xmlDoc);
                    resolve(troops);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    extractTroops(xmlDoc) {
        const troops = [];
        const npcCharacters = xmlDoc.getElementsByTagName('NPCCharacter');

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
            this.troopMap.set(troop.id, troop);
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






