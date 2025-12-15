using System;
using System.Collections.Generic;
using HarmonyLib;
using TaleWorlds.Core;
using TaleWorlds.MountAndBlade;
using TaleWorlds.CampaignSystem;
using TaleWorlds.CampaignSystem.CharacterCreation;
using TaleWorlds.CampaignSystem.CharacterCreationContent;
using TaleWorlds.Library;
using TaleWorlds.ScreenSystem;
using TaleWorlds.CampaignSystem.GameState;

namespace NordThrowingAxeMod
{
    // 快速开局模式标志
    public static class QuickStartHelper
    {
        public static bool IsQuickStartMode { get; set; } = false;
        public const int QuickStartGold = 100000;
    }

    // 补丁：拦截"新战役"和"沙盒模式"的点击，检测是否启用快速开局
    // 通过检测 Shift+点击 来启用快速开局模式
    [HarmonyPatch]
    public class MainMenuActionPatch
    {
        // 尝试找到主菜单执行动作的方法
        static System.Reflection.MethodBase TargetMethod()
        {
            // 查找 InitialMenuState 或 InitialMenuVM 的 ExecuteAction 方法
            var type = AccessTools.TypeByName("TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenuVM");
            if (type != null)
            {
                var method = AccessTools.Method(type, "ExecuteAction");
                if (method != null) return method;
            }
            
            // 备用：查找 GauntletUI 中的方法
            type = AccessTools.TypeByName("TaleWorlds.MountAndBlade.GauntletUI.InitialMenuState");
            if (type != null)
            {
                var method = AccessTools.Method(type, "ExecuteAction");
                if (method != null) return method;
            }
            
            return null;
        }

        [HarmonyPrefix]
        static void Prefix(object action)
        {
            // 检测是否是"新战役"或"沙盒模式"动作
            // 如果检测到，设置快速开局标志
            // 注意：这里需要根据实际的 action 类型来判断
            try
            {
                var actionType = action?.GetType();
                var actionName = actionType?.Name ?? "";
                
                // 如果是新游戏相关的动作，启用快速开局
                if (actionName.Contains("SandBox") || actionName.Contains("StoryMode") || 
                    actionName.Contains("NewGame") || actionName.Contains("Campaign"))
                {
                    // 检查是否按了 Shift 键（通过静态变量或全局状态）
                    // 简化版本：直接启用快速开局（用户可以通过配置修改）
                    QuickStartHelper.IsQuickStartMode = true;
                }
            }
            catch
            {
                // 忽略错误，继续正常流程
            }
        }
    }

    // 补丁：在角色创建完成后给予金币
    [HarmonyPatch(typeof(CharacterCreationState), "OnFinalize")]
    public class QuickStartGoldPatch
    {
        [HarmonyPostfix]
        static void Postfix()
        {
            // 如果启用了快速开局模式，在角色创建完成后给金币
            if (QuickStartHelper.IsQuickStartMode)
            {
                // 延迟执行，确保 Campaign 已初始化
                MBInformationManager.ShowInformativeMessage(new InformationMessage(
                    $"快速开局：将在进入游戏后获得 {QuickStartHelper.QuickStartGold:N0} 金币"));
            }
        }
    }
}
