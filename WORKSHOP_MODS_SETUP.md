# Workshop 模组设置指南

## 已删除的本地模组

✅ **已删除**：
- `Bannerlord.Harmony` 文件夹
- `Bannerlord.UIExtenderEx` 文件夹

## 下一步：从 Workshop 下载最新版本

### 1. 在 Steam Workshop 订阅模组

1. 打开 Steam
2. 进入 Bannerlord 的 Workshop
3. 搜索并订阅以下模组：
   - **Harmony** (ID: 2859188632 或搜索 "Bannerlord.Harmony")
   - **UIExtenderEx** (ID: 搜索 "Bannerlord.UIExtenderEx")

### 2. 等待下载完成

Steam 会自动下载模组到：
```
D:\SteamLibrary\steamapps\workshop\content\261550\<模组ID>\
```

### 3. 验证下载

下载完成后，检查以下路径是否存在：
- `workshop\content\261550\<Harmony_ID>\SubModule.xml`
- `workshop\content\261550\<UIExtenderEx_ID>\SubModule.xml`

## 当前配置状态

### SubModule.xml
- ✅ 已移除具体版本号，使用通配符匹配
- ✅ 依赖关系已配置：
  ```xml
  <DependedModule Id="Bannerlord.Harmony"/>
  <DependedModule Id="Bannerlord.UIExtenderEx"/>
  ```

### 项目文件 (MyModWithHarmony.csproj)
- ⚠️ DLL 路径仍指向已删除的本地文件夹
- **需要更新**：下载 Workshop 版本后，需要更新 DLL 路径

## 下载后需要做的

### 更新项目文件中的 DLL 路径

找到 Workshop 模组的实际路径后，更新 `MyModWithHarmony.csproj`：

```xml
<Reference Include="0Harmony">
  <HintPath>$(BANNERLORD_INSTALL_DIR)\Modules\Bannerlord.Harmony\bin\Win64_Shipping_Client\0Harmony.dll</HintPath>
  <Private>False</Private>
</Reference>
<Reference Include="Bannerlord.UIExtenderEx">
  <HintPath>$(BANNERLORD_INSTALL_DIR)\Modules\Bannerlord.UIExtenderEx\bin\Win64_Shipping_Client\Bannerlord.UIExtenderEx.dll</HintPath>
  <Private>False</Private>
</Reference>
```

**注意**：Workshop 模组下载后，游戏会自动识别并加载，DLL 路径应该会自动解析。如果编译时找不到 DLL，可能需要：
1. 检查 Workshop 模组是否已正确下载
2. 确认 Workshop 模组的文件夹结构
3. 或者暂时注释掉这些引用，等游戏加载时再测试

## 测试步骤

1. 订阅 Workshop 模组
2. 等待下载完成
3. 启动游戏，检查模组是否正确加载
4. 如果游戏能正常启动，说明 Workshop 版本兼容
5. 如果编译时找不到 DLL，告诉我 Workshop 模组的实际路径，我会更新项目文件

