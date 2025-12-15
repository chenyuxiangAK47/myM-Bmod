using System;
using System.Collections.Generic;
using System.Reflection;
using HarmonyLib;
using TaleWorlds.Core;
using TaleWorlds.MountAndBlade;
using TaleWorlds.CampaignSystem;
using TaleWorlds.Library;

namespace NordThrowingAxeMod
{
    // 快速开局模式标志
    public static class QuickStartHelper
    {
        public static bool IsQuickStartMode { get; set; } = false;
        public const int QuickStartGold = 100000;
    }

    // 补丁：在主菜单添加"快速开始"按钮
    [HarmonyPatch]
    public class MainMenuQuickStartButtonPatch
    {
        // 尝试找到 InitialMenuVM 的 RefreshMenuOptions 方法
        static MethodBase TargetMethod()
        {
            // 查找 InitialMenuVM 类
            var type = AccessTools.TypeByName("TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenuVM");
            if (type != null)
            {
                // 尝试找到 RefreshMenuOptions 方法
                var method = AccessTools.Method(type, "RefreshMenuOptions");
                if (method != null) return method;
                
                // 备用：查找 InitializeMenuOptions 方法
                method = AccessTools.Method(type, "InitializeMenuOptions");
                if (method != null) return method;
            }
            
            return null;
        }

        [HarmonyPostfix]
        static void Postfix(object __instance)
        {
            try
            {
                // 获取 MenuOptions 属性
                var menuOptionsProperty = AccessTools.Property(__instance.GetType(), "MenuOptions");
                if (menuOptionsProperty == null) return;
                
                var menuOptions = menuOptionsProperty.GetValue(__instance);
                if (menuOptions == null) return;
                
                // 获取 Add 方法
                var addMethod = AccessTools.Method(menuOptions.GetType(), "Add");
                if (addMethod == null) return;
                
                // 创建快速开始菜单选项
                // 需要创建 InitialMenuOptionVM 对象
                var optionVMType = AccessTools.TypeByName("TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenu.InitialMenuOptionVM");
                if (optionVMType == null) return;
                
                // 创建 InitialStateOption 对象
                var stateOptionType = AccessTools.TypeByName("TaleWorlds.MountAndBlade.InitialStateOption");
                if (stateOptionType == null) return;
                
                // 创建快速开始动作
                Action quickStartAction = () =>
                {
                    QuickStartHelper.IsQuickStartMode = true;
                    // 执行新沙盒游戏动作
                    ExecuteQuickStart();
                };
                
                // 创建 InitialStateOption
                var stateOption = Activator.CreateInstance(
                    stateOptionType,
                    "快速开始",
                    quickStartAction,
                    new Func<bool>(() => true)
                );
                
                // 创建 InitialMenuOptionVM
                var optionVM = Activator.CreateInstance(optionVMType, stateOption);
                
                // 添加到菜单选项列表
                addMethod.Invoke(menuOptions, new[] { optionVM });
            }
            catch (Exception ex)
            {
                // 记录错误但不影响游戏运行
                System.Diagnostics.Debug.WriteLine($"快速开始按钮添加失败: {ex.Message}");
            }
        }
        
        private static void ExecuteQuickStart()
        {
            try
            {
                // 直接启动新沙盒游戏
                var gameType = AccessTools.TypeByName("TaleWorlds.Core.Game");
                if (gameType != null)
                {
                    var currentProperty = AccessTools.Property(gameType, "Current");
                    var game = currentProperty?.GetValue(null);
                    
                    if (game != null)
                    {
                        // 调用 StartNewGame 方法
                        var startNewGameMethod = AccessTools.Method(gameType, "StartNewGame", new[] { typeof(bool) });
                        if (startNewGameMethod != null)
                        {
                            startNewGameMethod.Invoke(game, new object[] { false }); // false = 沙盒模式
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"快速开始执行失败: {ex.Message}");
                // 如果直接启动失败，至少设置标志，让后续流程处理
            }
        }
    }

    // 补丁：跳过角色创建流程（如果启用了快速开局）
    // 注意：CharacterCreationState 可能在不同的 DLL 中，使用反射查找
    [HarmonyPatch]
    public class SkipCharacterCreationPatch
    {
        static System.Reflection.MethodBase TargetMethod()
        {
            var type = AccessTools.TypeByName("TaleWorlds.CampaignSystem.CharacterCreation.CharacterCreationState");
            if (type != null)
            {
                return AccessTools.Method(type, "OnNextStage");
            }
            return null;
        }

        [HarmonyPrefix]
        static bool Prefix(object __instance)
        {
            if (!QuickStartHelper.IsQuickStartMode) return true;
            
            try
            {
                // 尝试直接完成角色创建
                var finalizeMethod = AccessTools.Method(__instance.GetType(), "OnFinalize");
                if (finalizeMethod != null)
                {
                    finalizeMethod.Invoke(__instance, null);
                    return false; // 阻止原方法执行
                }
            }
            catch
            {
                // 如果失败，继续正常流程
            }
            
            return true;
        }
    }

    // 补丁：在角色创建完成后给予金币
    // 注意：使用反射查找 CharacterCreationState
    [HarmonyPatch]
    public class QuickStartGoldPatch
    {
        static System.Reflection.MethodBase TargetMethod()
        {
            var type = AccessTools.TypeByName("TaleWorlds.CampaignSystem.CharacterCreation.CharacterCreationState");
            if (type != null)
            {
                return AccessTools.Method(type, "OnFinalize");
            }
            return null;
        }

        [HarmonyPostfix]
        static void Postfix()
        {
            // 金币会在 OnCampaignStart 中给予，这里只显示提示
            if (QuickStartHelper.IsQuickStartMode)
            {
                InformationManager.DisplayMessage(new InformationMessage(
                    $"快速开局：将在进入游戏后获得 {QuickStartHelper.QuickStartGold:N0} 金币"));
            }
        }
    }
}
