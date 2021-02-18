//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color, boolean } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import DefaultTheme from './Theme/DefaultTheme';
//#endregion
//#region 引入組件
import { ScrollBar } from './ScrollBar'
//#endregion
//#region 引入說明檔案
import ScrollBarNote from './ScrollBarNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../Handlers/ThemeHandler';
//#endregion

//#region Menu 基本配置
export default {
    title: 'ScrollBar',// 顯示於左方Menu，標題名稱
    decorators: [withKnobs],// withKnobs 配置Knobs
    excludeStories: /.*Data$/,
    parameters: {
        knobs: {
            escapeHTML: false,
        },
    },
};
//#endregion


//#region ScrollBar 組件
export const ScrollBar_ = (props) => {

    const themeselect = select(
        "選擇預設樣式",
        {
            DefaultTheme: 'DefaultTheme'
        },
        "DefaultTheme"
    );

    let [DefaultThemebasicmaxHeight, DefaultThemebasicmaxWidth, DefaultThemebasicotherStyle, DefaultThemescrollbarTrackXheight, DefaultThemescrollbarTrackXdisplay, DefaultThemescrollbarTrackXotherStyle, DefaultThemescrollbarThumbXbackgroundImage, DefaultThemescrollbarThumbXopacity, DefaultThemescrollbarThumbXtransition, DefaultThemescrollbarThumbXotherStyle, DefaultThemescrollbarTrackYwidth, DefaultThemescrollbarTrackYdisplay, DefaultThemescrollbarTrackYotherStyle, DefaultThemescrollbarThumbYbackgroundImage, DefaultThemescrollbarThumbYopacity, DefaultThemescrollbarThumbYtransition, DefaultThemescrollbarThumbYright, DefaultThemescrollbarThumbYleft, DefaultThemescrollbarThumbYotherStyle, exportCode] = [];
    const switchDefaultTheme = (themeName) => {
        switch (themeName) {
            default:
                DefaultThemebasicmaxHeight = text("DefaultTheme_basic_maxHeight", DefaultTheme.basic.maxHeight)
                DefaultThemebasicmaxWidth = text("DefaultTheme_basic_maxWidth", DefaultTheme.basic.maxWidth)
                DefaultThemebasicotherStyle = object("DefaultTheme_basic屬性其他樣式", {})
                DefaultThemescrollbarTrackXheight = text("DefaultTheme_scrollbarTrackX_height", DefaultTheme.scrollbarTrackX.height)
                DefaultThemescrollbarTrackXdisplay = text("DefaultTheme_scrollbarTrackX_display", DefaultTheme.scrollbarTrackX.display)
                DefaultThemescrollbarTrackXotherStyle = object("DefaultTheme_scrollbarTrackX屬性其他樣式", {})
                DefaultThemescrollbarThumbXbackgroundImage = text("DefaultTheme_scrollbarThumbX_backgroundImage", DefaultTheme.scrollbarThumbX.backgroundImage)
                DefaultThemescrollbarThumbXopacity = text("DefaultTheme_scrollbarThumbX_opacity", DefaultTheme.scrollbarThumbX.opacity)
                DefaultThemescrollbarThumbXtransition = text("DefaultTheme_scrollbarThumbX_transition", DefaultTheme.scrollbarThumbX.transition)
                DefaultThemescrollbarThumbXotherStyle = object("DefaultTheme_scrollbarThumbX屬性其他樣式", {})
                DefaultThemescrollbarTrackYwidth = text("DefaultTheme_scrollbarTrackY_width", DefaultTheme.scrollbarTrackY.width)
                DefaultThemescrollbarTrackYdisplay = text("DefaultTheme_scrollbarTrackY_display", DefaultTheme.scrollbarTrackY.display)
                DefaultThemescrollbarTrackYotherStyle = object("DefaultTheme_scrollbarTrackY屬性其他樣式", {})
                DefaultThemescrollbarThumbYbackgroundImage = text("DefaultTheme_scrollbarThumbY_backgroundImage", DefaultTheme.scrollbarThumbY.backgroundImage)
                DefaultThemescrollbarThumbYopacity = text("DefaultTheme_scrollbarThumbY_opacity", DefaultTheme.scrollbarThumbY.opacity)
                DefaultThemescrollbarThumbYtransition = text("DefaultTheme_scrollbarThumbY_transition", DefaultTheme.scrollbarThumbY.transition)
                DefaultThemescrollbarThumbYright = text("DefaultTheme_scrollbarThumbY_right", DefaultTheme.scrollbarThumbY.right)
                DefaultThemescrollbarThumbYleft = text("DefaultTheme_scrollbarThumbY_left", DefaultTheme.scrollbarThumbY.left)
                DefaultThemescrollbarThumbYotherStyle = object("DefaultTheme_scrollbarThumbY屬性其他樣式", {})
                exportCode = button("複製DefaultTheme樣式程式碼至剪貼簿", () => {
                    codeExportAndCopy(`
                      <ScrollBar
                      basedefaulttheme={"${themeselect}"}
                      autoHide={true}
                      theme={{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          maxHeight: "${DefaultThemebasicmaxHeight}",
                          maxWidth: "${DefaultThemebasicmaxWidth}",
                          //#endregion
                          ${JSON.stringify(DefaultThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        scrollbarTrackX: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          height: "${DefaultThemescrollbarTrackXheight}",
                          display: "${DefaultThemescrollbarTrackXdisplay}",
                          //#endregion
                          ${JSON.stringify(DefaultThemescrollbarTrackXotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        scrollbarThumbX: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundImage: "${DefaultThemescrollbarThumbXbackgroundImage}",
                          opacity: "${DefaultThemescrollbarThumbXopacity}",
                          transition: "${DefaultThemescrollbarThumbXtransition}",
                          //#endregion
                          ${JSON.stringify(DefaultThemescrollbarThumbXotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        scrollbarTrackY: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          width: "${DefaultThemescrollbarTrackYwidth}",
                          display: "${DefaultThemescrollbarTrackYdisplay}",
                          //#endregion
                          ${JSON.stringify(DefaultThemescrollbarTrackYotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        scrollbarThumbY: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundImage: "${DefaultThemescrollbarThumbYbackgroundImage}",
                          opacity: "${DefaultThemescrollbarThumbYopacity}",
                          transition: "${DefaultThemescrollbarThumbYtransition}",
                          right: "${DefaultThemescrollbarThumbYright}",
                          left: "${DefaultThemescrollbarThumbYleft}",
                          //#endregion
                          ${JSON.stringify(DefaultThemescrollbarThumbYotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
                });
                return { basic: { maxHeight: DefaultThemebasicmaxHeight, maxWidth: DefaultThemebasicmaxWidth, ...DefaultThemebasicotherStyle }, scrollbarTrackX: { height: DefaultThemescrollbarTrackXheight, display: DefaultThemescrollbarTrackXdisplay, ...DefaultThemescrollbarTrackXotherStyle }, scrollbarThumbX: { backgroundImage: DefaultThemescrollbarThumbXbackgroundImage, opacity: DefaultThemescrollbarThumbXopacity, transition: DefaultThemescrollbarThumbXtransition, ...DefaultThemescrollbarThumbXotherStyle }, scrollbarTrackY: { width: DefaultThemescrollbarTrackYwidth, display: DefaultThemescrollbarTrackYdisplay, ...DefaultThemescrollbarTrackYotherStyle }, scrollbarThumbY: { backgroundImage: DefaultThemescrollbarThumbYbackgroundImage, opacity: DefaultThemescrollbarThumbYopacity, transition: DefaultThemescrollbarThumbYtransition, right: DefaultThemescrollbarThumbYright, left: DefaultThemescrollbarThumbYleft, ...DefaultThemescrollbarThumbYotherStyle }, };

        }
    }

    return <ScrollBar
        theme={(switchDefaultTheme(themeselect))}
        basedefaulttheme={themeselect} >
        <div style={{ background: "aliceblue", height: "30rem", width: "30rem" }}>ScrollBar<br />範例</div>
    </ScrollBar>;
};

ScrollBar_.story = {
    parameters: {
        notes: { "ScrollBarNote": ScrollBarNote },
    }
};
//#endregion

