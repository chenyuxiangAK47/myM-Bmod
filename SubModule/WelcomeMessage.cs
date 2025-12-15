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
            
            // 如果是新游戏，给玩家10万金币（快速开局）
            if (game.GameType is CampaignGameManager campaignGame)
            {
                Campaign.Current?.AddMoneyToPlayerParty(100000);
                InformationManager.DisplayMessage(new InformationMessage("快速开局：已获得 100,000 金币"));
            }
        }
    }
}
