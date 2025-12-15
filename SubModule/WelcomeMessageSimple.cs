using System;
using TaleWorlds.Core;
using TaleWorlds.MountAndBlade;
using TaleWorlds.CampaignSystem;
using TaleWorlds.Library;
using TaleWorlds.CampaignSystem.Actions;

namespace NordThrowingAxeMod
{
    // 简化版本：不依赖 Harmony，只实现自动给金币功能
    public class WelcomeMessageSubModule : MBSubModuleBase
    {
        private static bool _hasGivenQuickStartGold = false;

        protected override void OnSubModuleLoad()
        {
            base.OnSubModuleLoad();
        }

        public override void OnCampaignStart(Game game, object starterObject)
        {
            base.OnCampaignStart(game, starterObject);
            
            // 快速开局模式：给玩家10万金币
            if (Campaign.Current != null && !_hasGivenQuickStartGold)
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

        // 这个方法会在角色创建完成后调用
        public override void OnNewGameCreated(Game game, object initializerObject)
        {
            base.OnNewGameCreated(game, initializerObject);
            
            // 重置标志，以便下次新游戏时再次给金币
            _hasGivenQuickStartGold = false;
        }
    }
}
