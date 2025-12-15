using System;
using HarmonyLib;
using Bannerlord.UIExtenderEx;
using TaleWorlds.Core;
using TaleWorlds.MountAndBlade;
using TaleWorlds.CampaignSystem;
using TaleWorlds.Library;
using TaleWorlds.CampaignSystem.Actions;

namespace NordThrowingAxeMod
{
    public class WelcomeMessageSubModule : MBSubModuleBase
    {
        private static bool _hasGivenQuickStartGold = false;
        private static Harmony _harmony = null;
        private UIExtender _uiExtender = null;

        protected override void OnSubModuleLoad()
        {
            base.OnSubModuleLoad();
            
            // 初始化 UIExtenderEx（用于添加主菜单按钮）
            try
            {
                _uiExtender = new UIExtender("NordThrowingAxeMod");
                _uiExtender.Register(typeof(WelcomeMessageSubModule).Assembly);
                _uiExtender.Enable();
                System.Diagnostics.Debug.WriteLine("UIExtenderEx v2.13.2 已启用");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"UIExtenderEx 加载失败: {ex.Message}");
            }
            
            // 初始化 Harmony 补丁（用于快速开始功能）
            try
            {
                _harmony = new Harmony("com.nordthrowingaxe.quickstart");
                _harmony.PatchAll();
                System.Diagnostics.Debug.WriteLine("Harmony v2.4.2.0 补丁已启用");
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Harmony 补丁加载失败: {ex.Message}");
            }
        }

        protected override void OnSubModuleUnloaded()
        {
            base.OnSubModuleUnloaded();
            
            // 清理 UIExtenderEx
            _uiExtender?.Disable();
            _uiExtender = null;
            
            // 清理 Harmony 补丁
            _harmony?.UnpatchAll();
            _harmony = null;
        }


        protected override void OnGameStart(Game game, IGameStarter gameStarterObject)
        {
            base.OnGameStart(game, gameStarterObject);
        }

        public override void OnCampaignStart(Game game, object starterObject)
        {
            base.OnCampaignStart(game, starterObject);
            
            // 快速开局模式：给玩家10万金币
            if (Campaign.Current != null)
            {
                // 检查是否启用了快速开局模式（通过 Harmony 补丁设置）
                if (QuickStartHelper.IsQuickStartMode && !_hasGivenQuickStartGold)
                {
                    var hero = Hero.MainHero;
                    if (hero != null)
                    {
                        GiveGoldAction.ApplyBetweenCharacters(null, hero, QuickStartHelper.QuickStartGold, false);
                        InformationManager.DisplayMessage(new InformationMessage(
                            $"快速开局：已获得 {QuickStartHelper.QuickStartGold:N0} 金币用于测试"));
                        _hasGivenQuickStartGold = true;
                        QuickStartHelper.IsQuickStartMode = false; // 重置标志
                    }
                }
                // 兼容旧版本：如果没有通过 Harmony 设置，使用原来的逻辑
                else if (!_hasGivenQuickStartGold && !QuickStartHelper.IsQuickStartMode)
                {
                    var hero = Hero.MainHero;
                    if (hero != null)
                    {
                        GiveGoldAction.ApplyBetweenCharacters(null, hero, 100000, false);
                        InformationManager.DisplayMessage(new InformationMessage("快速开局：已获得 100,000 金币用于测试"));
                        _hasGivenQuickStartGold = true;
                    }
                }
            }
        }

        // 这个方法会在角色创建完成后调用
        public override void OnNewGameCreated(Game game, object initializerObject)
        {
            base.OnNewGameCreated(game, initializerObject);
            
            // 重置标志，以便下次新游戏时再次给金币
            _hasGivenQuickStartGold = false;
        }
    }
}
