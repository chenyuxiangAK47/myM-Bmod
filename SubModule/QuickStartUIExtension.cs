using System.Xml;
using Bannerlord.UIExtenderEx.Attributes;
using Bannerlord.UIExtenderEx.Prefabs2;

namespace NordThrowingAxeMod
{
    // 使用 UIExtenderEx v2.13.2 在主菜单添加"快速开始"按钮
    // 参考：https://github.com/BUTR/Bannerlord.UIExtenderEx
    [PrefabExtension("InitialScreen", "descendant::NavigatableListPanel[@Id='MenuItems']")]
    internal class QuickStartMenuButtonExtension : PrefabExtensionInsertPatch
    {
        public override InsertType Type => InsertType.Prepend; // 添加到菜单顶部
        private XmlDocument _document;

        public QuickStartMenuButtonExtension()
        {
            _document = new XmlDocument();
            // 在 MenuItems 列表的开头添加快速开始按钮
            // 注意：按钮点击事件需要通过 Harmony 补丁处理
            // 使用与原版菜单项完全一致的结构，确保间距正确
            _document.LoadXml(@"
                <Widget WidthSizePolicy=""StretchToParent"" HeightSizePolicy=""CoverChildren"" HorizontalAlignment=""Center"" MarginTop=""48"" MarginBottom=""16"">
                    <Children>
                        <ButtonWidget DoNotPassEventsToChildren=""true"" UpdateChildrenStates=""true"" WidthSizePolicy=""StretchToParent"" HeightSizePolicy=""CoverChildren"" HorizontalAlignment=""Center"" VerticalAlignment=""Center"" Command.Click=""ExecuteQuickStart"" IsDisabled=""false"">
                            <Children>
                                <ListPanel UpdateChildrenStates=""true"" WidthSizePolicy=""CoverChildren"" HeightSizePolicy=""CoverChildren"" StackLayout.LayoutMethod=""HorizontalCentered"" HorizontalAlignment=""Center"" VerticalAlignment=""Center"">
                                    <Children>
                                        <ImageWidget WidthSizePolicy=""Fixed"" HeightSizePolicy=""Fixed"" SuggestedWidth=""46"" SuggestedHeight=""20"" HorizontalAlignment=""Left"" VerticalAlignment=""Center"" PositionYOffset=""-2"" Brush=""HoverIndicatorBrush"" />
                                        <TextWidget WidthSizePolicy=""CoverChildren"" HeightSizePolicy=""CoverChildren"" MaxWidth=""320"" HorizontalAlignment=""Center"" MarginLeft=""8"" MarginRight=""8"" Brush=""InitialMenuButtonBrush"" ClipContents=""false"" Text=""快速开始"" CanBreakWords=""false"" />
                                        <ImageWidget WidthSizePolicy=""Fixed"" HeightSizePolicy=""Fixed"" SuggestedWidth=""46"" SuggestedHeight=""20"" HorizontalAlignment=""Right"" VerticalAlignment=""Center"" PositionYOffset=""-2"" Brush=""HoverIndicatorBrushFlipped"" />
                                    </Children>
                                </ListPanel>
                            </Children>
                        </ButtonWidget>
                    </Children>
                </Widget>");
        }

        [PrefabExtensionXmlDocument]
        public XmlDocument GetPrefabExtension() => _document;
    }
}

