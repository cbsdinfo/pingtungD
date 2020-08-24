//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import TextDefaultTheme from './Theme/DefaultTheme';
//#endregion
//#region 引入組件
import { Text } from './Text'
//#endregion
//#region 引入說明檔案
import TextNote from './TextNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../../Handlers/ThemeHandler'
//#endregion

//#region Menu 基本配置
export default {
    title: 'Texts',// 顯示於左方Menu，標題名稱
    decorators: [withKnobs],// withKnobs 配置Knobs
    excludeStories: /.*Data$/,
    parameters: {
        knobs: {
            escapeHTML: false,
        },
    },
};
//#endregion


//#region Text 組件
export const Text_ = (props) => {

    const themeselect = select(
        "選擇預設樣式",
        {
            TextDefaultTheme: 'TextDefaultTheme'
        },
        "TextDefaultTheme"
    );

    let [TextDefaultThemebasicboxSizing, TextDefaultThemebasicposition, TextDefaultThemebasicwidth, TextDefaultThemebasicminWidth, TextDefaultThemebasicheight, TextDefaultThemebasiclineHeight, TextDefaultThemebasicwhiteSpace, TextDefaultThemebasictextAlign, TextDefaultThemebasicfontSize, TextDefaultThemebasiccolor, TextDefaultThemebasicfontFamily, TextDefaultThemebasicfontWeight, TextDefaultThemebasicletterSpacing, TextDefaultThemebasicotherStyle, TextDefaultThemehoverotherStyle, exportCode] = [];
    const switchDefaultTheme = (themeName) => {
        switch (themeName) {
            default:
                TextDefaultThemebasicboxSizing = text("TextDefaultTheme_basic_boxSizing", TextDefaultTheme.basic.boxSizing)
                TextDefaultThemebasicposition = text("TextDefaultTheme_basic_position", TextDefaultTheme.basic.position)
                TextDefaultThemebasicwidth = text("TextDefaultTheme_basic_width", TextDefaultTheme.basic.width)
                TextDefaultThemebasicminWidth = text("TextDefaultTheme_basic_minWidth", TextDefaultTheme.basic.minWidth)
                TextDefaultThemebasicheight = text("TextDefaultTheme_basic_height", TextDefaultTheme.basic.height)
                TextDefaultThemebasiclineHeight = text("TextDefaultTheme_basic_lineHeight", TextDefaultTheme.basic.lineHeight)
                TextDefaultThemebasicwhiteSpace = text("TextDefaultTheme_basic_whiteSpace", TextDefaultTheme.basic.whiteSpace)
                TextDefaultThemebasictextAlign = text("TextDefaultTheme_basic_textAlign", TextDefaultTheme.basic.textAlign)
                TextDefaultThemebasicfontSize = text("TextDefaultTheme_basic_fontSize", TextDefaultTheme.basic.fontSize)
                TextDefaultThemebasiccolor = color("TextDefaultTheme_basic_color", TextDefaultTheme.basic.color)
                TextDefaultThemebasicfontFamily = text("TextDefaultTheme_basic_fontFamily", TextDefaultTheme.basic.fontFamily)
                TextDefaultThemebasicfontWeight = text("TextDefaultTheme_basic_fontWeight", TextDefaultTheme.basic.fontWeight)
                TextDefaultThemebasicletterSpacing = text("TextDefaultTheme_basic_letterSpacing", TextDefaultTheme.basic.letterSpacing)
                TextDefaultThemebasicotherStyle = object("TextDefaultTheme_basic屬性其他樣式", {})
                TextDefaultThemehoverotherStyle = object("TextDefaultTheme_hover屬性其他樣式", {})
                exportCode = button("複製TextDefaultTheme樣式程式碼至剪貼簿", () => {
                    codeExportAndCopy(`
                      <Text
                      baseDefaultTheme={"${themeselect}"}
                      theme={{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${TextDefaultThemebasicboxSizing}",
                          position: "${TextDefaultThemebasicposition}",
                          width: "${TextDefaultThemebasicwidth}",
                          minWidth: "${TextDefaultThemebasicminWidth}",
                          height: "${TextDefaultThemebasicheight}",
                          lineHeight: "${TextDefaultThemebasiclineHeight}",
                          whiteSpace: "${TextDefaultThemebasicwhiteSpace}",
                          textAlign: "${TextDefaultThemebasictextAlign}",
                          fontSize: "${TextDefaultThemebasicfontSize}",
                          color: "${TextDefaultThemebasiccolor}",
                          fontFamily: "${TextDefaultThemebasicfontFamily}",
                          fontWeight: "${TextDefaultThemebasicfontWeight}",
                          letterSpacing: "${TextDefaultThemebasicletterSpacing}",
                          //#endregion
                          ${JSON.stringify(TextDefaultThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(TextDefaultThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
                });
                return { basic: { boxSizing: TextDefaultThemebasicboxSizing, position: TextDefaultThemebasicposition, width: TextDefaultThemebasicwidth, minWidth: TextDefaultThemebasicminWidth, height: TextDefaultThemebasicheight, lineHeight: TextDefaultThemebasiclineHeight, whiteSpace: TextDefaultThemebasicwhiteSpace, textAlign: TextDefaultThemebasictextAlign, fontSize: TextDefaultThemebasicfontSize, color: TextDefaultThemebasiccolor, fontFamily: TextDefaultThemebasicfontFamily, fontWeight: TextDefaultThemebasicfontWeight, letterSpacing: TextDefaultThemebasicletterSpacing, ...TextDefaultThemebasicotherStyle }, hover: { ...TextDefaultThemehoverotherStyle }, };

        }
    }

    return <Text
        theme={(switchDefaultTheme(themeselect))}
        baseDefaultTheme={themeselect} >
        測試文字
        </Text>;
};

Text_.story = {
    parameters: {
        notes: { "TextNote": TextNote },
    }
};
//#endregion

