//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color, boolean } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import DefaultTheme from './Theme/DefaultTheme';
// import PrimaryTheme from './Theme/PrimaryTheme';
// import SecondaryTheme from './Theme/SecondaryTheme';
//#endregion
//#region 引入組件
import { LeftSideDrawer } from './LeftSideDrawer'
//#endregion
//#region 引入說明檔案
import LeftSideDrawerNote from './LeftSideDrawerNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../../../Handlers/ThemeHandler';
//#endregion


//#region Menu 基本配置
export default {
    title: 'Drawer',// 顯示於左方Menu，標題名稱
    decorators: [withKnobs],// withKnobs 配置Knobs
    excludeStories: /.*Data$/,
    parameters: {
        knobs: {
            escapeHTML: false,
        },
    },
};
//#endregion


//#region LeftSideDrawer 組件
export const LeftSideDrawer_ = (props) => {

    const themeselect = select(
        "選擇預設樣式",
        {
            DefaultTheme: 'DefaultTheme',
        },
        "DefaultTheme"
    );

    let [Propscollapse, DefaultThemecontainerbasicwidth, DefaultThemecontainerbasicdisplay, DefaultThemecontainerbasicflexWrap, DefaultThemecontainerbasicboxSizing, DefaultThemecontainerbasicflexDirection, DefaultThemecontainerbasicjustifyContent, DefaultThemecontainerbasicalignItems, DefaultThemecontainerbasicminWidth, DefaultThemecontainerbasiccolor, DefaultThemecontainerbasicfontSize, DefaultThemecontainerbasicfontWeight, DefaultThemecontainerbasicoutline, DefaultThemecontainerbasicuserSelect, DefaultThemecontainerbasicposition, DefaultThemecontainerbasicheight, DefaultThemecontainerbasictop, DefaultThemecontainerbasicbackgroundColor, DefaultThemecontainerbasiczIndex, DefaultThemecontainerbasictransition, DefaultThemecontainerbasicotherStyle, DefaultThemecontentbasicboxSizing, DefaultThemecontentbasicminWidth, DefaultThemecontentbasiclineHeight, DefaultThemecontentbasicwhiteSpace, DefaultThemecontentbasictextAlign, DefaultThemecontentbasicposition, DefaultThemecontentbasicwidth, DefaultThemecontentbasicmaxWidth, DefaultThemecontentbasiccolor, DefaultThemecontentbasicfontSize, DefaultThemecontentbasicfontWeight, DefaultThemecontentbasicoutline, DefaultThemecontentbasicuserSelect, DefaultThemecontentbasicheight, DefaultThemecontentbasictop, DefaultThemecontentbasicbackgroundColor, DefaultThemecontentbasiczIndex, DefaultThemecontentbasictransition, DefaultThemecontentbasicboxShadow, DefaultThemecontentbasicotherStyle, exportCode] = [];
    const switchDefaultTheme = (themeName) => {
        switch (themeName) {
            default:
                Propscollapse = boolean("Props_collapse", false)
                DefaultThemecontainerbasicwidth = text("DefaultTheme_container_basic_width", DefaultTheme.container.basic(null, props).width)
                DefaultThemecontainerbasicboxSizing = text("DefaultTheme_container_basic_boxSizing", DefaultTheme.container.basic(null, props).boxSizing)
                DefaultThemecontainerbasicflexDirection = text("DefaultTheme_container_basic_flexDirection", DefaultTheme.container.basic(null, props).flexDirection)
                DefaultThemecontainerbasicjustifyContent = text("DefaultTheme_container_basic_justifyContent", DefaultTheme.container.basic(null, props).justifyContent)
                DefaultThemecontainerbasicalignItems = text("DefaultTheme_container_basic_alignItems", DefaultTheme.container.basic(null, props).alignItems)
                DefaultThemecontainerbasicminWidth = text("DefaultTheme_container_basic_minWidth", DefaultTheme.container.basic(null, props).minWidth)
                DefaultThemecontainerbasiccolor = color("DefaultTheme_container_basic_color", DefaultTheme.container.basic(null, props).color)
                DefaultThemecontainerbasicfontSize = text("DefaultTheme_container_basic_fontSize", DefaultTheme.container.basic(null, props).fontSize)
                DefaultThemecontainerbasicfontWeight = text("DefaultTheme_container_basic_fontWeight", DefaultTheme.container.basic(null, props).fontWeight)
                DefaultThemecontainerbasicoutline = text("DefaultTheme_container_basic_outline", DefaultTheme.container.basic(null, props).outline)
                DefaultThemecontainerbasicuserSelect = text("DefaultTheme_container_basic_userSelect", DefaultTheme.container.basic(null, props).userSelect)
                DefaultThemecontainerbasicposition = text("DefaultTheme_container_basic_position", DefaultTheme.container.basic(null, props).position)
                DefaultThemecontainerbasicheight = text("DefaultTheme_container_basic_height", DefaultTheme.container.basic(null, props).height)
                DefaultThemecontainerbasictop = text("DefaultTheme_container_basic_top", DefaultTheme.container.basic(null, props).top)
                DefaultThemecontainerbasicbackgroundColor = color("DefaultTheme_container_basic_backgroundColor", DefaultTheme.container.basic(null, props).backgroundColor)
                DefaultThemecontainerbasiczIndex = text("DefaultTheme_container_basic_zIndex", DefaultTheme.container.basic(null, props).zIndex)
                DefaultThemecontainerbasictransition = text("DefaultTheme_container_basic_transition", DefaultTheme.container.basic(null, props).transition)
                DefaultThemecontainerbasicotherStyle = object("DefaultTheme_container_basic屬性其他樣式", {})
                DefaultThemecontentbasicboxSizing = text("DefaultTheme_content_basic_boxSizing", DefaultTheme.content.basic(null, props).boxSizing)
                DefaultThemecontentbasicminWidth = text("DefaultTheme_content_basic_minWidth", DefaultTheme.content.basic(null, props).minWidth)
                DefaultThemecontentbasiclineHeight = text("DefaultTheme_content_basic_lineHeight", DefaultTheme.content.basic(null, props).lineHeight)
                DefaultThemecontentbasicwhiteSpace = text("DefaultTheme_content_basic_whiteSpace", DefaultTheme.content.basic(null, props).whiteSpace)
                DefaultThemecontentbasictextAlign = text("DefaultTheme_content_basic_textAlign", DefaultTheme.content.basic(null, props).textAlign)
                DefaultThemecontentbasicposition = text("DefaultTheme_content_basic_position", DefaultTheme.content.basic(null, props).position)
                DefaultThemecontentbasicwidth = text("DefaultTheme_content_basic_width", DefaultTheme.content.basic(null, props).width)
                DefaultThemecontentbasicmaxWidth = text("DefaultTheme_content_basic_maxWidth", DefaultTheme.content.basic(null, props).maxWidth)
                DefaultThemecontentbasiccolor = color("DefaultTheme_content_basic_color", DefaultTheme.content.basic(null, props).color)
                DefaultThemecontentbasicfontSize = text("DefaultTheme_content_basic_fontSize", DefaultTheme.content.basic(null, props).fontSize)
                DefaultThemecontentbasicfontWeight = text("DefaultTheme_content_basic_fontWeight", DefaultTheme.content.basic(null, props).fontWeight)
                DefaultThemecontentbasicoutline = text("DefaultTheme_content_basic_outline", DefaultTheme.content.basic(null, props).outline)
                DefaultThemecontentbasicuserSelect = text("DefaultTheme_content_basic_userSelect", DefaultTheme.content.basic(null, props).userSelect)
                DefaultThemecontentbasicheight = text("DefaultTheme_content_basic_height", DefaultTheme.content.basic(null, props).height)
                DefaultThemecontentbasictop = text("DefaultTheme_content_basic_top", DefaultTheme.content.basic(null, props).top)
                DefaultThemecontentbasicbackgroundColor = color("DefaultTheme_content_basic_backgroundColor", DefaultTheme.content.basic(null, props).backgroundColor)
                DefaultThemecontentbasiczIndex = text("DefaultTheme_content_basic_zIndex", DefaultTheme.content.basic(null, props).zIndex)
                DefaultThemecontentbasictransition = text("DefaultTheme_content_basic_transition", DefaultTheme.content.basic(null, props).transition)
                DefaultThemecontentbasicboxShadow = text("DefaultTheme_content_basic_boxShadow", DefaultTheme.content.basic(null, props).boxShadow)
                DefaultThemecontentbasicotherStyle = object("DefaultTheme_content_basic屬性其他樣式", {})

                exportCode = button("複製DefaultTheme樣式程式碼至剪貼簿", () => {
                    codeExportAndCopy(`
                      <LeftSideDrawer
                      baseDefaultTheme={"${themeselect}"}
                      collapse={${Propscollapse}}
                      containerEvent={{ onClick: () => { /* 點擊背景時要做的事 */ } }}
                      theme={{                        
                        container:{
                            basic: (style, props) => ({
                              ...style,
                              //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                              width: "${DefaultThemecontainerbasicwidth}",
                              display: "${DefaultThemecontainerbasicdisplay}",
                              flexWrap: "${DefaultThemecontainerbasicflexWrap}",
                              boxSizing: "${DefaultThemecontainerbasicboxSizing}",
                              flexDirection: "${DefaultThemecontainerbasicflexDirection}",
                              justifyContent: "${DefaultThemecontainerbasicjustifyContent}",
                              alignItems: "${DefaultThemecontainerbasicalignItems}",
                              minWidth: "${DefaultThemecontainerbasicminWidth}",
                              color: "${DefaultThemecontainerbasiccolor}",
                              fontSize: "${DefaultThemecontainerbasicfontSize}",
                              fontWeight: "${DefaultThemecontainerbasicfontWeight}",
                              outline: "${DefaultThemecontainerbasicoutline}",
                              userSelect: "${DefaultThemecontainerbasicuserSelect}",
                              position: "${DefaultThemecontainerbasicposition}",
                              height: "${DefaultThemecontainerbasicheight}",
                              left: \`\${props.collapse ? "-100%" : "0rem"}\`, //若有調整寬度請連帶調整
                              top: "${DefaultThemecontainerbasictop}",
                              backgroundColor: "${DefaultThemecontainerbasicbackgroundColor}",
                              zIndex: "${DefaultThemecontainerbasiczIndex}",
                              transition: "${DefaultThemecontainerbasictransition}",
                              //#endregion
                              ${JSON.stringify(DefaultThemecontainerbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                            }),
                        },                        
                        content:{
                            basic: (style, props) => ({
                              ...style,
                              //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                              boxSizing: "${DefaultThemecontentbasicboxSizing}",
                              minWidth: "${DefaultThemecontentbasicminWidth}",
                              lineHeight: "${DefaultThemecontentbasiclineHeight}",
                              whiteSpace: "${DefaultThemecontentbasicwhiteSpace}",
                              textAlign: "${DefaultThemecontentbasictextAlign}",
                              position: "${DefaultThemecontentbasicposition}",
                              width: "${DefaultThemecontentbasicwidth}",
                              maxWidth: "${DefaultThemecontentbasicmaxWidth}",
                              color: "${DefaultThemecontentbasiccolor}",
                              fontSize: "${DefaultThemecontentbasicfontSize}",
                              fontWeight: "${DefaultThemecontentbasicfontWeight}",
                              outline: "${DefaultThemecontentbasicoutline}",
                              userSelect: "${DefaultThemecontentbasicuserSelect}",
                              height: "${DefaultThemecontentbasicheight}",
                              left: \`\${props.collapse ? "-60%" : "0rem"}\`, //若有調整寬度請連帶調整
                              top: "${DefaultThemecontentbasictop}",
                              backgroundColor: "${DefaultThemecontentbasicbackgroundColor}",
                              zIndex: "${DefaultThemecontentbasiczIndex}",
                              transition: "${DefaultThemecontentbasictransition}",
                              boxShadow: "${DefaultThemecontentbasicboxShadow}",
                              //#endregion
                              ${JSON.stringify(DefaultThemecontentbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                            }),
                        },
                        }}/>
                      `)
                });
                return { container: { basic: { left: `${Propscollapse ? "-100%" : "0rem"}`, width: DefaultThemecontainerbasicwidth, display: DefaultThemecontainerbasicdisplay, flexWrap: DefaultThemecontainerbasicflexWrap, boxSizing: DefaultThemecontainerbasicboxSizing, flexDirection: DefaultThemecontainerbasicflexDirection, justifyContent: DefaultThemecontainerbasicjustifyContent, alignItems: DefaultThemecontainerbasicalignItems, minWidth: DefaultThemecontainerbasicminWidth, color: DefaultThemecontainerbasiccolor, fontSize: DefaultThemecontainerbasicfontSize, fontWeight: DefaultThemecontainerbasicfontWeight, outline: DefaultThemecontainerbasicoutline, userSelect: DefaultThemecontainerbasicuserSelect, position: DefaultThemecontainerbasicposition, height: DefaultThemecontainerbasicheight, top: DefaultThemecontainerbasictop, backgroundColor: DefaultThemecontainerbasicbackgroundColor, zIndex: DefaultThemecontainerbasiczIndex, transition: DefaultThemecontainerbasictransition, ...DefaultThemecontainerbasicotherStyle }, }, content: { basic: { left: `${Propscollapse ? "-60%" : "0rem"}`, boxSizing: DefaultThemecontentbasicboxSizing, minWidth: DefaultThemecontentbasicminWidth, lineHeight: DefaultThemecontentbasiclineHeight, whiteSpace: DefaultThemecontentbasicwhiteSpace, textAlign: DefaultThemecontentbasictextAlign, position: DefaultThemecontentbasicposition, width: DefaultThemecontentbasicwidth, maxWidth: DefaultThemecontentbasicmaxWidth, color: DefaultThemecontentbasiccolor, fontSize: DefaultThemecontentbasicfontSize, fontWeight: DefaultThemecontentbasicfontWeight, outline: DefaultThemecontentbasicoutline, userSelect: DefaultThemecontentbasicuserSelect, height: DefaultThemecontentbasicheight, top: DefaultThemecontentbasictop, backgroundColor: DefaultThemecontentbasicbackgroundColor, zIndex: DefaultThemecontentbasiczIndex, transition: DefaultThemecontentbasictransition, boxShadow: DefaultThemecontentbasicboxShadow, ...DefaultThemecontentbasicotherStyle }, }, };

        }
    }

    return <LeftSideDrawer
        theme={(switchDefaultTheme(themeselect))}
        baseDefaultTheme={themeselect}
        collapse={Propscollapse}
    //containerEvent={{ onClick: () => { console.log(Propscollapse) } }}
    >
        <div style={{ color: "#000" }}>這裡可以放你想要的內容，<br />並透過 collapse 控制 展開/收合</div>
    </LeftSideDrawer>;
};

LeftSideDrawer_.story = {
    parameters: {
        notes: { "LeftSideDrawerNote": LeftSideDrawerNote },
    }
};
            //#endregion



// // text(name: string, value: string, groupId?: string): string;
// boolean(name: string, value: boolean, groupId?: string): boolean;
// number(name: string, value: number, options?: NumberTypeKnobOptions, groupId?: string): number;
// color(name: string, value: string, groupId?: string): string;
// object<T>(name: string, value: T, groupId?: string): T;
// select<T extends SelectTypeKnobValue>(name: string, options: SelectTypeOptionsProp<T>, value: T, groupId?: string): T;
// radios<T extends RadiosTypeKnobValue>(name: string, options: RadiosTypeOptionsProp<T>, value: T, groupId?: string): T;
// array(name: string, value: ArrayTypeKnobValue, separator?: string, groupId?: string): string[];
// date(name: string, value?: Date, groupId?: string): number;
// button(name: string, callback: ButtonTypeOnClickProp, groupId?: string): undefined;
// files(name: string, accept: string, value?: string[], groupId?: string): string[];