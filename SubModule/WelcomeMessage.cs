using System;
using TaleWorlds.Core;
using TaleWorlds.MountAndBlade;
using TaleWorlds.CampaignSystem;
using TaleWorlds.Library;
using TaleWorlds.CampaignSystem.GameComponents;
using TaleWorlds.CampaignSystem.CharacterCreationContent;
using TaleWorlds.CampaignSystem.CharacterCreation;

namespace NordThrowingAxeMod
{
    public class WelcomeMessageSubModule : MBSubModuleBase
    {
        private static bool _hasGivenQuickStartGold = false;
        private static bool _isQuickStartMode = false;

        protected override void OnSubModuleLoad()
        {
            base.OnSubModuleLoad();
        }

        protected override void OnBeforeInitialModuleScreenSetAsRoot()
        {
            base.OnBeforeInitialModuleScreenSetAsRoot();
        }

        protected override void OnGameStart(Game game, IGameStarter gameStarterObject)
        {
            base.OnGameStart(game, gameStarterObject);
        }

        protected override void OnCampaignStart(Game game, object starterObject)
        {
            base.OnCampaignStart(game, starterObject);
            
            // 快速开局模式：给玩家10万金币
            if (Campaign.Current != null)
            {
                // 检查是否是通过快速开局进入的
                // 如果是新游戏且没有角色创建流程，则认为是快速开局
                if (!_hasGivenQuickStartGold)
                {
                    Campaign.Current.AddMoneyToPlayerParty(100000);
                    InformationManager.DisplayMessage(new InformationMessage("快速开局：已获得 100,000 金币用于测试"));
                    _hasGivenQuickStartGold = true;
                }
            }
        }

        // 这个方法会在角色创建完成后调用
        protected override void OnNewGameCreated(Game game, object initializerObject)
        {
            base.OnNewGameCreated(game, initializerObject);
            
            // 重置标志，以便下次新游戏时再次给金币
            _hasGivenQuickStartGold = false;
        }
    }
}
