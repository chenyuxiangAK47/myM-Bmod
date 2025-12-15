using System;
using TaleWorlds.Core;
using TaleWorlds.MountAndBlade;
using TaleWorlds.CampaignSystem;
using TaleWorlds.Library;

namespace NordThrowingAxeMod
{
    public class WelcomeMessageSubModule : MBSubModuleBase
    {
        private static bool _hasGivenQuickStartGold = false;

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
            
            // 在新战役开始时给玩家10万金币（快速开局）
            if (Campaign.Current != null && !_hasGivenQuickStartGold)
            {
                Campaign.Current.AddMoneyToPlayerParty(100000);
                InformationManager.DisplayMessage(new InformationMessage("快速开局：已获得 100,000 金币"));
                _hasGivenQuickStartGold = true;
            }
        }
    }
}
