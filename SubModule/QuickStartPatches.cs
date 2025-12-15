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

    // 补丁：处理快速开始按钮的点击事件
    // 注意：按钮本身由 UIExtenderEx 添加，这里只处理点击事件
    [HarmonyPatch]
    public class QuickStartButtonClickPatch
    {
        static MethodBase TargetMethod()
        {
            // 查找 InitialMenuVM 的 ExecuteQuickStart 方法（由 UIExtenderEx 添加）
            var type = AccessTools.TypeByName("TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenuVM");
            if (type != null)
            {
                var method = AccessTools.Method(type, "ExecuteQuickStart");
                if (method != null) return method;
            }
            return null;
        }

        [HarmonyPrefix]
        static bool Prefix()
        {
            // 处理快速开始逻辑
            try
            {
                QuickStartHelper.IsQuickStartMode = true;
                System.Diagnostics.Debug.WriteLine("快速开始: 按钮被点击");

                // 通过反射调用 StartNewGame
                var gameType = AccessTools.TypeByName("TaleWorlds.Core.Game");
                if (gameType != null)
                {
                    var currentProperty = AccessTools.Property(gameType, "Current");
                    var game = currentProperty?.GetValue(null);
                    if (game != null)
                    {
                        var startNewGameMethod = AccessTools.Method(gameType, "StartNewGame", new[] { typeof(bool) });
                        if (startNewGameMethod != null)
                        {
                            startNewGameMethod.Invoke(game, new object[] { false }); // false = 沙盒模式
                            return false; // 阻止原方法执行（如果存在）
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"快速开始执行失败: {ex.Message}");
            }
            return true;
        }
    }

    // 补丁：在主菜单添加"快速开始"按钮（备用方案，如果 UIExtenderEx 失败）
    // 使用更简单的方法：直接查找并修改菜单选项
    [HarmonyPatch]
    public class MainMenuQuickStartButtonPatch
    {
        static MethodBase TargetMethod()
        {
            // 尝试多种可能的类名和方法名
            string[] typeNames = {
                "TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenuVM",
                "TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenu.InitialMenuVM"
            };
            
            string[] methodNames = { "RefreshMenuOptions", "InitializeMenuOptions", "OnRefreshMenuOptions" };
            
            foreach (var typeName in typeNames)
            {
                var type = AccessTools.TypeByName(typeName);
                if (type != null)
                {
                    foreach (var methodName in methodNames)
                    {
                        var method = AccessTools.Method(type, methodName);
                        if (method != null)
                        {
                            System.Diagnostics.Debug.WriteLine($"快速开始: 找到目标方法 {typeName}.{methodName}");
                            return method;
                        }
                    }
                }
            }
            
            System.Diagnostics.Debug.WriteLine("快速开始: 未找到目标方法");
            return null;
        }

        [HarmonyPostfix]
        static void Postfix(object __instance)
        {
            try
            {
                System.Diagnostics.Debug.WriteLine($"快速开始: Postfix 被调用，类型: {__instance.GetType().Name}");
                
                // 使用反射获取 MenuOptions
                var menuOptionsProperty = AccessTools.Property(__instance.GetType(), "MenuOptions");
                if (menuOptionsProperty == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 找不到 MenuOptions 属性");
                    return;
                }
                
                var menuOptions = menuOptionsProperty.GetValue(__instance);
                if (menuOptions == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: MenuOptions 为 null");
                    return;
                }
                
                // 检查是否已经添加过（通过检查选项数量）
                var countProperty = AccessTools.Property(menuOptions.GetType(), "Count");
                int currentCount = 0;
                if (countProperty != null)
                {
                    currentCount = (int)countProperty.GetValue(menuOptions);
                    System.Diagnostics.Debug.WriteLine($"快速开始: 当前菜单选项数量: {currentCount}");
                    
                    // 如果已经有9个或更多选项，可能已经添加过了（原版通常有8个）
                    if (currentCount >= 9)
                    {
                        System.Diagnostics.Debug.WriteLine("快速开始: 菜单选项数量 >= 9，可能已添加，跳过");
                        return;
                    }
                }
                
                // 获取 Add 方法
                var addMethod = AccessTools.Method(menuOptions.GetType(), "Add");
                if (addMethod == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 找不到 Add 方法");
                    return;
                }
                
                // 查找 InitialMenuOptionVM 类型
                var optionVMType = AccessTools.TypeByName("TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenu.InitialMenuOptionVM");
                if (optionVMType == null)
                {
                    optionVMType = AccessTools.TypeByName("TaleWorlds.MountAndBlade.ViewModelCollection.InitialMenuOptionVM");
                }
                
                if (optionVMType == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 找不到 InitialMenuOptionVM 类型");
                    return;
                }
                
                // 查找 InitialStateOption 类型
                var stateOptionType = AccessTools.TypeByName("TaleWorlds.MountAndBlade.InitialStateOption");
                if (stateOptionType == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 找不到 InitialStateOption 类型");
                    return;
                }
                
                // 创建快速开始动作
                Action quickStartAction = () =>
                {
                    QuickStartHelper.IsQuickStartMode = true;
                    System.Diagnostics.Debug.WriteLine("快速开始: 按钮被点击，设置快速开始模式");
                    ExecuteQuickStart();
                };
                
                // 创建 InitialStateOption
                var stateOption = Activator.CreateInstance(
                    stateOptionType,
                    "快速开始",
                    quickStartAction,
                    new Func<bool>(() => true)
                );
                
                if (stateOption == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 创建 InitialStateOption 失败");
                    return;
                }
                
                // 创建 InitialMenuOptionVM
                var optionVM = Activator.CreateInstance(optionVMType, stateOption);
                if (optionVM == null)
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 创建 InitialMenuOptionVM 失败");
                    return;
                }
                
                // 添加到菜单选项列表（插入到"新沙盒"之后）
                addMethod.Invoke(menuOptions, new[] { optionVM });
                System.Diagnostics.Debug.WriteLine("快速开始: 按钮已添加到主菜单");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"快速开始按钮添加失败: {ex.GetType().Name}: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"堆栈跟踪: {ex.StackTrace}");
            }
        }
        
        private static void ExecuteQuickStart()
        {
            try
            {
                System.Diagnostics.Debug.WriteLine("快速开始: 执行快速开始逻辑");
                
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
                            System.Diagnostics.Debug.WriteLine("快速开始: 调用 StartNewGame(false)");
                            startNewGameMethod.Invoke(game, new object[] { false }); // false = 沙盒模式
                        }
                        else
                        {
                            System.Diagnostics.Debug.WriteLine("快速开始: 找不到 StartNewGame 方法");
                        }
                    }
                    else
                    {
                        System.Diagnostics.Debug.WriteLine("快速开始: Game.Current 为 null");
                    }
                }
                else
                {
                    System.Diagnostics.Debug.WriteLine("快速开始: 找不到 Game 类型");
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"快速开始执行失败: {ex.GetType().Name}: {ex.Message}");
                System.Diagnostics.Debug.WriteLine($"堆栈跟踪: {ex.StackTrace}");
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


