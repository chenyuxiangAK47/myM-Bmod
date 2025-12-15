# 重要路径参考文档

## 📁 Workshop 模组下载位置

**路径：** `D:\SteamLibrary\steamapps\workshop\content\261550`

**说明：**
- Steam 创意工坊下载的 Bannerlord 模组存储位置
- 游戏 ID：`261550`（Mount & Blade II: Bannerlord）
- 每个模组以 Workshop ID 命名（数字文件夹）

**当前已下载的模组：**
- `2859188632` - **Harmony** (v2.4.2.0) ✅
- `2859222409` - **UIExtenderEx** (v2.13.2) ✅
- `2859232415` - **ButterLib** (v2.10.3)
- `2859238197` - **Mod Configuration Menu v5** (v5.11.3)

**用途：**
- 验证 Harmony 和 UIExtenderEx 是否已下载
- 检查模组版本和文件结构
- 排查模组冲突问题

**如何确认模组：**
1. 进入对应 ID 文件夹
2. 查看 `SubModule.xml` 中的 `<Id>` 或 `<Name>` 标签
3. 或查看文件夹内的 `ModuleData` 结构

**快速检查命令：**
```powershell
cd "D:\SteamLibrary\steamapps\workshop\content\261550"
Get-ChildItem -Directory | ForEach-Object {
    $subModule = Join-Path $_.FullName "SubModule.xml"
    if (Test-Path $subModule) {
        $xml = [xml](Get-Content $subModule)
        Write-Host "$($_.Name): $($xml.Module.Name.value) v$($xml.Module.Version.value)"
    }
}
```

---

## 📁 日志和崩溃日志位置

**路径：** `C:\ProgramData\Mount and Blade II Bannerlord`

**说明：**
- 游戏日志文件存储位置
- 崩溃日志（crashes）存储位置
- 错误日志（errorlog）存储位置

**常见子目录：**
- `logs/` - 游戏运行日志
- `crashes/` - 崩溃转储文件（.dmp, .xml, .sav）
- `errorlog/` - 错误日志

**用途：**
- 诊断游戏崩溃原因
- 查看模组加载错误
- 排查 Harmony/UIExtenderEx 版本冲突
- 分析游戏启动失败问题

**如何查看最新崩溃：**
1. 进入 `crashes/` 文件夹
2. 按修改时间排序
3. 查看最新的 `.xml` 或 `.dmp` 文件

---

## 📁 本地模组位置

**路径：** `D:\SteamLibrary\steamapps\common\Mount & Blade II Bannerlord\Modules`

**说明：**
- 本地安装的模组存储位置
- 包括原版模组（Native, SandBox, StoryMode 等）
- 包括手动安装的模组（如 MyMod）

**当前状态：**
- ✅ 本地 Harmony 和 UIExtenderEx 已删除
- ✅ 依赖 Workshop 版本

---

## 🔍 快速检查清单

### 检查 Workshop 模组是否下载：
```powershell
# 检查 Harmony
Get-ChildItem "D:\SteamLibrary\steamapps\workshop\content\261550" -Directory | 
    ForEach-Object { 
        $subModule = Join-Path $_.FullName "SubModule.xml"
        if (Test-Path $subModule) {
            $xml = [xml](Get-Content $subModule)
            Write-Host "$($_.Name): $($xml.Module.Id)"
        }
    }
```

### 查看最新崩溃日志：
```powershell
# 查看最新的崩溃文件夹
Get-ChildItem "C:\ProgramData\Mount and Blade II Bannerlord\crashes" -Directory | 
    Sort-Object LastWriteTime -Descending | 
    Select-Object -First 1
```

### 查看最新日志：
```powershell
# 查看最新的日志文件
Get-ChildItem "C:\ProgramData\Mount and Blade II Bannerlord\logs" -File | 
    Sort-Object LastWriteTime -Descending | 
    Select-Object -First 5
```

---

## 📝 注意事项

1. **Workshop 模组路径**：
   - 模组下载后会自动出现在 `workshop\content\261550\` 下
   - 游戏启动器会自动识别并加载
   - 不需要手动复制到 `Modules` 文件夹

2. **日志文件**：
   - 崩溃日志通常包含详细的堆栈跟踪
   - 查找 `ExceptionCode` 和 `ExceptionMessage` 字段
   - 注意版本冲突信息（如 Harmony 版本不匹配）

3. **路径权限**：
   - `C:\ProgramData\` 可能需要管理员权限访问
   - Workshop 路径通常不需要特殊权限

---

## 🔗 相关文档

- `WORKSHOP_DOWNLOAD_GUIDE.md` - Workshop 模组下载指南
- `CRASH_ANALYSIS.md` - 崩溃分析示例
- `CLEANUP_COMPLETE.md` - 模组清理完成报告

