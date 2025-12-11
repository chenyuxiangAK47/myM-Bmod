// 视图管理器和UI交互
class TroopViewer {
    constructor() {
        this.currentTroop = null;
        this.init();
    }

    init() {
        document.getElementById('loadBtn').addEventListener('click', () => this.loadFiles());
        document.getElementById('loadFolderBtn').addEventListener('click', () => this.loadFolder());
        document.getElementById('xmlFileInput').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.loadFiles();
            }
        });
        document.getElementById('searchInput').addEventListener('input', () => this.updateTroopList());
        document.getElementById('cultureFilter').addEventListener('change', () => this.updateTroopList());
        document.getElementById('tierFilter').addEventListener('change', () => this.updateTroopList());
        document.getElementById('closeTreeBtn').addEventListener('click', () => {
            document.getElementById('troopTreePanel').style.display = 'none';
        });
    }

    async loadFiles() {
        const input = document.getElementById('xmlFileInput');
        const files = Array.from(input.files);

        if (files.length === 0) {
            alert('请选择XML文件');
            return;
        }

        try {
            const troopPromises = files.map(file => troopParser.parseXMLFile(file));
            const troopArrays = await Promise.all(troopPromises);
            
            troopArrays.forEach(troops => troopParser.addTroops(troops));
            
            this.updateTroopList();
            alert(`成功加载 ${files.length} 个文件，共 ${troopParser.getAllTroops().length} 个兵种`);
        } catch (error) {
            alert('加载文件时出错: ' + error.message);
            console.error(error);
        }
    }

    async loadFolder() {
        // 注意：浏览器无法直接读取文件夹，需要用户选择文件
        alert('由于浏览器限制，请使用"加载XML文件"按钮选择多个文件（按住Ctrl或Cmd键多选）');
    }

    updateTroopList() {
        const searchTerm = document.getElementById('searchInput').value;
        const culture = document.getElementById('cultureFilter').value;
        const tier = document.getElementById('tierFilter').value;

        const filteredTroops = troopParser.filterTroops(searchTerm, culture, tier);
        const listContainer = document.getElementById('troopList');

        listContainer.innerHTML = '';

        // 按等级和文化排序
        filteredTroops.sort((a, b) => {
            if (a.culture !== b.culture) {
                return a.culture.localeCompare(b.culture);
            }
            if (a.tier !== b.tier) {
                return a.tier - b.tier;
            }
            return a.level - b.level;
        });

        filteredTroops.forEach(troop => {
            const item = document.createElement('div');
            item.className = 'troop-item';
            item.dataset.troopId = troop.id;
            
            item.innerHTML = `
                <div class="troop-item-name">${this.escapeHtml(troop.name)}</div>
                <div class="troop-item-id">${troop.id}</div>
                <div>
                    <span class="troop-item-tier">T${troop.tier}</span>
                    <span style="margin-left: 8px; font-size: 11px; color: #666;">
                        ${troop.culture} | Lv.${troop.level}
                    </span>
                </div>
            `;

            item.addEventListener('click', () => this.showTroopDetail(troop.id));
            listContainer.appendChild(item);
        });

        if (filteredTroops.length === 0) {
            listContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">没有找到匹配的兵种</p>';
        }
    }

    showTroopDetail(troopId) {
        const troop = troopParser.getTroopById(troopId);
        if (!troop) return;

        this.currentTroop = troop;

        // 更新列表选中状态
        document.querySelectorAll('.troop-item').forEach(item => {
            item.classList.remove('selected');
            if (item.dataset.troopId === troopId) {
                item.classList.add('selected');
            }
        });

        const detailContainer = document.getElementById('troopDetail');
        detailContainer.innerHTML = this.renderTroopDetail(troop);
        detailContainer.classList.add('active');
    }

    renderTroopDetail(troop) {
        const skillsHtml = this.renderSkills(troop.skills);
        const equipmentHtml = this.renderEquipment(troop.equipment);
        const upgradeTargetsHtml = this.renderUpgradeTargets(troop.upgradeTargets);
        const statsHtml = this.renderStats(troop);

        return `
            <div class="detail-header">
                <h2 class="detail-title">${this.escapeHtml(troop.name)}</h2>
                <div class="detail-meta">
                    <span class="meta-badge">ID: ${troop.id}</span>
                    <span class="meta-badge">等级: ${troop.level}</span>
                    <span class="meta-badge">Tier: T${troop.tier}</span>
                    <span class="meta-badge">文化: ${troop.culture}</span>
                    <span class="meta-badge">类型: ${troop.defaultGroup}</span>
                    ${troop.isBasicTroop ? '<span class="meta-badge" style="background: #28a745;">基础兵种</span>' : ''}
                </div>
            </div>

            ${statsHtml}

            <div class="detail-section">
                <h3>📊 技能属性</h3>
                <div class="skills-grid">
                    ${skillsHtml}
                </div>
            </div>

            <div class="detail-section">
                <h3>⚔️ 装备</h3>
                <div class="equipment-list">
                    ${equipmentHtml || '<p style="color: #999;">无装备数据</p>'}
                </div>
            </div>

            ${troop.traits.length > 0 ? `
            <div class="detail-section">
                <h3>🎯 特性</h3>
                <div>
                    ${troop.traits.map(t => `<span class="meta-badge" style="background: #17a2b8;">${t.id}: ${t.value}</span>`).join(' ')}
                </div>
            </div>
            ` : ''}

            <div class="detail-section">
                <h3>⬆️ 升级路径</h3>
                <div class="upgrade-targets">
                    ${upgradeTargetsHtml || '<p style="color: #999;">无升级路径（顶级兵种）</p>'}
                </div>
            </div>

            <div class="detail-section">
                <button onclick="viewer.showTroopTree('${troop.id}')" 
                        style="background: #17a2b8; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;">
                    查看兵种树
                </button>
            </div>
        `;
    }

    renderSkills(skills) {
        const skillNames = {
            'Athletics': '🏃 跑动',
            'Riding': '🐴 骑术',
            'OneHanded': '⚔️ 单手',
            'TwoHanded': '🗡️ 双手',
            'Polearm': '🔱 长杆',
            'Bow': '🏹 弓',
            'Crossbow': '🏹 弩',
            'Throwing': '🎯 投掷'
        };

        return Object.entries(skills)
            .map(([skill, value]) => `
                <div class="skill-item">
                    <span class="skill-name">${skillNames[skill] || skill}</span>
                    <span class="skill-value">${value}</span>
                </div>
            `).join('');
    }

    renderEquipment(equipment) {
        if (!equipment || equipment.length === 0) {
            return '<p style="color: #999;">无装备数据</p>';
        }

        const slotNames = {
            'Item0': '主武器',
            'Item1': '副武器',
            'Item2': '第三武器',
            'Item3': '第四武器',
            'Item4': '第五武器',
            'Head': '头部',
            'Body': '身体',
            'Leg': '腿部',
            'Gloves': '手部',
            'Cape': '披风',
            'Horse': '坐骑',
            'HorseHarness': '马具'
        };

        return equipment.map((roster, index) => `
            <div class="equipment-roster">
                <h4>装备方案 ${index + 1}</h4>
                <div class="equipment-items">
                    ${roster.items.map(item => `
                        <div class="equipment-item">
                            <div class="equipment-slot">${slotNames[item.slot] || item.slot}</div>
                            <div class="equipment-id">${item.id}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderUpgradeTargets(targets) {
        if (!targets || targets.length === 0) {
            return null;
        }

        return targets.map(targetId => {
            const targetTroop = troopParser.getTroopById(targetId);
            const name = targetTroop ? targetTroop.name : targetId;
            return `
                <a class="upgrade-link" onclick="viewer.showTroopDetail('${targetId}'); return false;">
                    ${this.escapeHtml(name)}
                </a>
            `;
        }).join('');
    }

    renderStats(troop) {
        const totalSkills = Object.values(troop.skills).reduce((a, b) => a + b, 0);
        const avgSkill = Object.keys(troop.skills).length > 0 
            ? Math.round(totalSkills / Object.keys(troop.skills).length) 
            : 0;
        const equipmentCount = troop.equipment.reduce((sum, roster) => sum + roster.items.length, 0);

        return `
            <div class="stats-summary">
                <div class="stat-card">
                    <div class="stat-label">总技能点数</div>
                    <div class="stat-value">${totalSkills}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">平均技能</div>
                    <div class="stat-value">${avgSkill}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">装备方案数</div>
                    <div class="stat-value">${troop.equipment.length}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">装备总数</div>
                    <div class="stat-value">${equipmentCount}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">可升级到</div>
                    <div class="stat-value">${troop.upgradeTargets.length} 个兵种</div>
                </div>
            </div>
        `;
    }

    showTroopTree(startTroopId) {
        const tree = troopParser.buildTroopTree(startTroopId);
        if (!tree) {
            alert('无法构建兵种树');
            return;
        }

        const treeContainer = document.getElementById('troopTree');
        treeContainer.innerHTML = this.renderTree(tree);

        document.getElementById('troopTreePanel').style.display = 'block';
    }

    renderTree(node) {
        if (!node) return '';

        let html = `
            <div class="tree-node ${node.troop.id === this.currentTroop?.id ? 'selected' : ''}" 
                 onclick="viewer.showTroopDetail('${node.troop.id}'); viewer.showTroopTree('${node.troop.id}');">
                <div style="font-weight: bold; margin-bottom: 5px;">${this.escapeHtml(node.troop.name)}</div>
                <div style="font-size: 11px; color: #666;">${node.troop.id}</div>
                <div style="margin-top: 5px;">
                    <span style="background: #28a745; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px;">
                        T${node.troop.tier} Lv.${node.troop.level}
                    </span>
                </div>
            </div>
        `;

        if (node.children.length > 0) {
            html += '<div class="tree-arrow">↓</div>';
            html += '<div style="display: flex; flex-wrap: wrap; justify-content: center;">';
            node.children.forEach(child => {
                html += this.renderTree(child);
            });
            html += '</div>';
        }

        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 初始化查看器
const viewer = new TroopViewer();

