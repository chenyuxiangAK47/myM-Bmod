# Workshop 模组下载指南

## ✅ 已完成的准备工作

1. **已禁用本地模组**：
   - `Bannerlord.Harmony` → `_Bannerlord.Harmony_OLD`（已重命名，游戏会忽略）
   - `Bannerlord.UIExtenderEx` → `_Bannerlord.UIExtenderEx_OLD`（已重命名，游戏会忽略）

2. **已更新 SubModule.xml**：
   - 移除了具体版本号，使用通配符匹配
   - 依赖关系已配置好

## 📥 从 Workshop 下载模组

### 步骤 1：在 Steam 中订阅模组

1. 打开 Steam
2. 进入 **库** → **Mount & Blade II: Bannerlord**
3. 点击 **创意工坊**（Workshop）
4. 搜索并订阅以下模组：

   **Harmony**：
   - 搜索："Harmony" 或 "Bannerlord.Harmony"
   - Workshop ID: 2859188632（如果知道的话）
   - 点击"订阅"

   **UIExtenderEx**：
   - 搜索："UIExtenderEx" 或 "Bannerlord.UIExtenderEx"
   - 点击"订阅"

### 步骤 2：等待下载完成

Steam 会自动下载模组到：
```
D:\SteamLibrary\steamapps\workshop\content\261550\<模组ID>\
```

### 步骤 3：验证下载

下载完成后，检查以下路径是否存在：
- `workshop\content\261550\<Harmony_ID>\SubModule.xml`
- `workshop\content\261550\<UIExtenderEx_ID>\SubModule.xml`

## 🔧 下载后需要做的

### 选项 A：让游戏自动识别（推荐）

Workshop 模组下载后，游戏启动器会自动识别并加载。**通常不需要额外配置**。

### 选项 B：如果需要编译时引用 DLL

如果编译代码时找不到 DLL，需要更新 `MyModWithHarmony.csproj` 中的路径。

**但通常不需要**，因为：
- Workshop 模组会自动被游戏识别
- 游戏运行时会自动加载 Workshop 版本的 DLL
- 编译时如果找不到，可以暂时忽略（运行时能加载就行）

## 🧪 测试步骤

1. ✅ 订阅 Workshop 模组
2. ✅ 等待下载完成
3. ✅ 启动游戏，检查模组列表
4. ✅ 确认 Harmony 和 UIExtenderEx 已加载
5. ✅ 测试快速开始功能

## 📝 注意事项

- Workshop 模组会自动更新，保持最新版本
- 如果下载后游戏仍报错，告诉我具体的错误信息
- 如果编译时找不到 DLL，告诉我 Workshop 模组的实际路径，我会更新项目文件

## 🗑️ 清理旧文件（可选）

下载并测试成功后，可以删除旧文件夹：
```
_Bannerlord.Harmony_OLD
_Bannerlord.UIExtenderEx_OLD
```

**注意**：删除前确保 Workshop 版本工作正常！

