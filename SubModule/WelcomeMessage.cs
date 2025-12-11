using System;
using TaleWorlds.Core;
using TaleWorlds.Library;
using TaleWorlds.MountAndBlade;

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
        }

        public override void OnGameInitializationFinished(Game game)
        {
            base.OnGameInitializationFinished(game);
            
            // 显示欢迎消息（简单版本 - 只在消息栏显示）
            InformationManager.DisplayMessage(new InformationMessage(
                "欢迎使用 Nord Throwing Axe Mod！",
                Colors.Green
            ));
        }
    }
}
