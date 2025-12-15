# Workshop 模组错误修复

## 问题描述

游戏启动时出现错误：
```
Module with dir: D:\SteamLibrary\steamapps\workshop\content\261550\3483463349 can't be loaded
System.IO.DirectoryNotFoundException: Could not find a part of the path '...\SubModule.xml'
```

## 原因

Steam Workshop 模组 **3483463349** 被用户用 Ctrl+X 剪切到了本地 `Modules\3483463349\` 文件夹，导致 Workshop 文件夹中缺少 `SubModule.xml` 文件。

## 解决方案

✅ **已解决**：用户已取消订阅该 Workshop 模组，问题已解决。

## 当前状态

- ✅ Workshop 订阅已取消
- ✅ 模组文件已移动到本地：`Modules\3483463349\`
- ✅ 游戏应该可以正常启动

## 注意事项

如果将来需要将 Workshop 模组移动到本地：

1. **推荐方法**：使用 **复制（Ctrl+C）** 而不是剪切（Ctrl+X）
   - 这样 Workshop 文件夹中仍然保留文件
   - 游戏可以正常加载 Workshop 版本
   - 本地版本可以独立修改

2. **如果必须剪切**：
   - 记得在 Steam 中取消订阅该模组
   - 或者重命名 Workshop 文件夹（如 `_3483463349_disabled`）让游戏忽略它

## 相关模组

- Harmony (2859188632) - 之前也出现过类似问题，已修复

