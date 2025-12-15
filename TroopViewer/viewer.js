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
        document.getElementById('validateBtn').addEventListener('click', () => this.validateEquipment());
        document.getElementById('closeValidationBtn').addEventListener('click', () => {
            document.getElementById('validationPanel').style.display = 'none';
        });
        document.getElementById('copyReportBtn').addEventListener('click', () => this.copyReport());
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

    // 验证装备
    validateEquipment() {
        const troops = troopParser.getAllTroops();
        
        if (troops.length === 0) {
            alert('请先加载XML文件');
            return;
        }

        // 运行验证
        const validationResults = equipmentValidator.validateAllTroops(troops);
        
        // 显示验证面板
        this.showValidationResults(validationResults, troops.length);
    }

    // 显示验证结果
    showValidationResults(validationResults, totalTroops) {
        const panel = document.getElementById('validationPanel');
        const summaryDiv = document.getElementById('validationSummary');
        const resultsDiv = document.getElementById('validationResults');
        const reportTextarea = document.getElementById('validationReport');

        // 生成报告
        const report = equipmentValidator.generateReport(validationResults);
        reportTextarea.value = report;

        // 显示摘要
        let errorCount = 0;
        let warningCount = 0;
        for (let result of validationResults) {
            for (let issue of result.issues) {
                if (issue.type === 'error') errorCount++;
                else warningCount++;
            }
        }

        summaryDiv.innerHTML = `
            <h3>验证摘要</h3>
            <div class="summary-stats">
                <div class="summary-stat">
                    <div class="summary-stat-value">${totalTroops}</div>
                    <div class="summary-stat-label">总兵种数</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-stat-value" style="color: #e74c3c;">${validationResults.length}</div>
                    <div class="summary-stat-label">存在问题</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-stat-value" style="color: #e74c3c;">${errorCount}</div>
                    <div class="summary-stat-label">错误</div>
                </div>
                <div class="summary-stat">
                    <div class="summary-stat-value" style="color: #f39c12;">${warningCount}</div>
                    <div class="summary-stat-label">警告</div>
                </div>
            </div>
        `;

        // 显示详细结果
        resultsDiv.innerHTML = '';
        
        if (validationResults.length === 0) {
            resultsDiv.innerHTML = '<p style="text-align: center; color: #28a745; font-size: 18px; padding: 40px;">✅ 所有兵种装备检查通过！</p>';
        } else {
            for (let result of validationResults) {
                const troop = result.troop;
                const hasErrors = result.issues.some(i => i.type === 'error');
                const itemClass = hasErrors ? 'validation-result-item' : 'validation-result-item has-warnings';
                
                const itemDiv = document.createElement('div');
                itemDiv.className = itemClass;
                
                let issuesHtml = '';
                for (let issue of result.issues) {
                    const issueClass = issue.type === 'error' ? 'error' : 'warning';
                    const icon = issue.type === 'error' ? '❌' : '⚠️';
                    issuesHtml += `
                        <div class="validation-issue ${issueClass}">
                            <span class="issue-icon">${icon}</span>
                            <span class="issue-slot">${issue.slot || 'N/A'}</span>
                            <span class="issue-message">${this.escapeHtml(issue.message)}</span>
                        </div>
                    `;
                }
                
                itemDiv.innerHTML = `
                    <div class="validation-result-item-header">
                        <h4>${this.escapeHtml(troop.name)}</h4>
                        <span style="font-size: 12px; color: #666;">${result.issues.length} 个问题</span>
                    </div>
                    <div class="validation-result-item-meta">
                        ID: <code>${troop.id}</code> | 
                        类型: ${troop.defaultGroup} | 
                        等级: T${troop.tier} | 
                        文化: ${troop.culture}
                    </div>
                    <div class="validation-issues">
                        ${issuesHtml}
                    </div>
                `;
                
                resultsDiv.appendChild(itemDiv);
            }
        }

        // 显示面板
        panel.style.display = 'block';
    }

    // 复制报告
    copyReport() {
        const reportTextarea = document.getElementById('validationReport');
        reportTextarea.select();
        reportTextarea.setSelectionRange(0, 99999); // 移动设备支持
        
        try {
            document.execCommand('copy');
            alert('报告已复制到剪贴板！');
        } catch (err) {
            // 使用现代API
            navigator.clipboard.writeText(reportTextarea.value).then(() => {
                alert('报告已复制到剪贴板！');
            }).catch(() => {
                alert('复制失败，请手动选择文本复制');
            });
        }
    }
}

// 初始化查看器
const viewer = new TroopViewer();

