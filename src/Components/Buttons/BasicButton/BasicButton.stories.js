//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import DefaultTheme from './Theme/DefaultTheme';
import PrimaryTheme from './Theme/PrimaryTheme';
import SecondaryTheme from './Theme/SecondaryTheme';
//#endregion
//#region 引入組件
import { BasicButton } from './BasicButton'
//#endregion
//#region 引入說明檔案
import BasicButtonNote from './BasicButtonNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../../Handlers/ThemeHandler';
//#endregion


//#region Menu 基本配置
export default {
    title: 'Button',// 顯示於左方Menu，標題名稱
    decorators: [withKnobs],// withKnobs 配置Knobs
    excludeStories: /.*Data$/,
    parameters: {
        knobs: {
            escapeHTML: false,
        },
    },
};
//#endregion


//#region BasicButton 組件
export const BasicButton_ = (props) => {

    const themeselect = select(
        "選擇預設樣式",
        {
            DefaultTheme: 'DefaultTheme',
            PrimaryTheme: 'PrimaryTheme',
            SecondaryTheme: 'SecondaryTheme',
        },
        "DefaultTheme"
    );

    let [SecondaryThemetextbasicfontFamily, PrimaryThemetextbasicfontFamily, DefaultThemetextbasicfontFamily, SecondaryThemecontainerbasicboxSizing, SecondaryThemecontainerbasicposition, SecondaryThemecontainerbasicminWidth, SecondaryThemecontainerbasicbackgroundImage, SecondaryThemecontainerbasicbackgroundPosition, SecondaryThemecontainerbasicbackgroundRepeat, SecondaryThemecontainerbasicbackgroundSize, SecondaryThemecontainerbasicwhiteSpace, SecondaryThemecontainerbasicbackgroundColor, SecondaryThemecontainerbasiccolor, SecondaryThemecontainerbasicborderRadius, SecondaryThemecontainerbasictextAlign, SecondaryThemecontainerbasicfontSize, SecondaryThemecontainerbasiccursor, SecondaryThemecontainerbasicfontWeight, SecondaryThemecontainerbasicwidth, SecondaryThemecontainerbasicheight, SecondaryThemecontainerbasiclineHeight, SecondaryThemecontainerbasicuserSelect, SecondaryThemecontainerbasicdisplay, SecondaryThemecontainerbasicotherStyle, SecondaryThemecontainerhoverbackgroundColor, SecondaryThemecontainerhoverotherStyle, SecondaryThemetextbasicboxSizing, SecondaryThemetextbasicposition, SecondaryThemetextbasicwidth, SecondaryThemetextbasicminWidth, SecondaryThemetextbasicheight, SecondaryThemetextbasiclineHeight, SecondaryThemetextbasicwhiteSpace, SecondaryThemetextbasictextAlign, SecondaryThemetextbasicfontSize, SecondaryThemetextbasicfontWeight, SecondaryThemetextbasicletterSpacing, SecondaryThemetextbasicdisplay, SecondaryThemetextbasiccolor, SecondaryThemetextbasicotherStyle, SecondaryThemetexthoverotherStyle, PrimaryThemecontainerbasicboxSizing, PrimaryThemecontainerbasicposition, PrimaryThemecontainerbasicminWidth, PrimaryThemecontainerbasicbackgroundImage, PrimaryThemecontainerbasicbackgroundPosition, PrimaryThemecontainerbasicbackgroundRepeat, PrimaryThemecontainerbasicbackgroundSize, PrimaryThemecontainerbasicwhiteSpace, PrimaryThemecontainerbasicbackgroundColor, PrimaryThemecontainerbasiccolor, PrimaryThemecontainerbasicborderRadius, PrimaryThemecontainerbasictextAlign, PrimaryThemecontainerbasicfontSize, PrimaryThemecontainerbasiccursor, PrimaryThemecontainerbasicfontWeight, PrimaryThemecontainerbasicwidth, PrimaryThemecontainerbasicheight, PrimaryThemecontainerbasiclineHeight, PrimaryThemecontainerbasicuserSelect, PrimaryThemecontainerbasicdisplay, PrimaryThemecontainerbasicotherStyle, PrimaryThemecontainerhoverbackgroundColor, PrimaryThemecontainerhoverotherStyle, PrimaryThemetextbasicboxSizing, PrimaryThemetextbasicposition, PrimaryThemetextbasicwidth, PrimaryThemetextbasicminWidth, PrimaryThemetextbasicheight, PrimaryThemetextbasiclineHeight, PrimaryThemetextbasicwhiteSpace, PrimaryThemetextbasictextAlign, PrimaryThemetextbasicfontSize, PrimaryThemetextbasicfontWeight, PrimaryThemetextbasicletterSpacing, PrimaryThemetextbasicdisplay, PrimaryThemetextbasiccolor, PrimaryThemetextbasicotherStyle, PrimaryThemetexthoverotherStyle, DefaultThemecontainerbasicboxSizing, DefaultThemecontainerbasicposition, DefaultThemecontainerbasicminWidth, DefaultThemecontainerbasicbackgroundImage, DefaultThemecontainerbasicbackgroundPosition, DefaultThemecontainerbasicbackgroundRepeat, DefaultThemecontainerbasicbackgroundSize, DefaultThemecontainerbasicwhiteSpace, DefaultThemecontainerbasicbackgroundColor, DefaultThemecontainerbasiccolor, DefaultThemecontainerbasicborderRadius, DefaultThemecontainerbasictextAlign, DefaultThemecontainerbasicfontSize, DefaultThemecontainerbasiccursor, DefaultThemecontainerbasicfontWeight, DefaultThemecontainerbasicwidth, DefaultThemecontainerbasicheight, DefaultThemecontainerbasiclineHeight, DefaultThemecontainerbasicuserSelect, DefaultThemecontainerbasicdisplay, DefaultThemecontainerbasicotherStyle, DefaultThemecontainerhoverbackgroundColor, DefaultThemecontainerhoverotherStyle, DefaultThemetextbasicboxSizing, DefaultThemetextbasicposition, DefaultThemetextbasicwidth, DefaultThemetextbasicminWidth, DefaultThemetextbasicheight, DefaultThemetextbasiclineHeight, DefaultThemetextbasicwhiteSpace, DefaultThemetextbasictextAlign, DefaultThemetextbasicfontSize, DefaultThemetextbasicfontWeight, DefaultThemetextbasicletterSpacing, DefaultThemetextbasicdisplay, DefaultThemetextbasiccolor, DefaultThemetextbasicotherStyle, DefaultThemetexthoverotherStyle, exportCode] = [];
    const switchDefaultTheme = (themeName) => {
        switch (themeName) {
            case "SecondaryTheme":
                SecondaryThemecontainerbasicboxSizing = text("SecondaryTheme_container_basic_boxSizing", SecondaryTheme.container.basic.boxSizing)
                SecondaryThemecontainerbasicposition = text("SecondaryTheme_container_basic_position", SecondaryTheme.container.basic.position)
                SecondaryThemecontainerbasicminWidth = text("SecondaryTheme_container_basic_minWidth", SecondaryTheme.container.basic.minWidth)
                SecondaryThemecontainerbasicbackgroundImage = text("SecondaryTheme_container_basic_backgroundImage", SecondaryTheme.container.basic.backgroundImage)
                SecondaryThemecontainerbasicbackgroundPosition = text("SecondaryTheme_container_basic_backgroundPosition", SecondaryTheme.container.basic.backgroundPosition)
                SecondaryThemecontainerbasicbackgroundRepeat = text("SecondaryTheme_container_basic_backgroundRepeat", SecondaryTheme.container.basic.backgroundRepeat)
                SecondaryThemecontainerbasicbackgroundSize = text("SecondaryTheme_container_basic_backgroundSize", SecondaryTheme.container.basic.backgroundSize)
                SecondaryThemecontainerbasicwhiteSpace = text("SecondaryTheme_container_basic_whiteSpace", SecondaryTheme.container.basic.whiteSpace)
                SecondaryThemecontainerbasicbackgroundColor = color("SecondaryTheme_container_basic_backgroundColor", SecondaryTheme.container.basic.backgroundColor)
                SecondaryThemecontainerbasiccolor = color("SecondaryTheme_container_basic_color", SecondaryTheme.container.basic.color)
                SecondaryThemecontainerbasicborderRadius = text("SecondaryTheme_container_basic_borderRadius", SecondaryTheme.container.basic.borderRadius)
                SecondaryThemecontainerbasictextAlign = text("SecondaryTheme_container_basic_textAlign", SecondaryTheme.container.basic.textAlign)
                SecondaryThemecontainerbasicfontSize = text("SecondaryTheme_container_basic_fontSize", SecondaryTheme.container.basic.fontSize)
                SecondaryThemecontainerbasiccursor = text("SecondaryTheme_container_basic_cursor", SecondaryTheme.container.basic.cursor)
                SecondaryThemecontainerbasicfontWeight = text("SecondaryTheme_container_basic_fontWeight", SecondaryTheme.container.basic.fontWeight)
                SecondaryThemecontainerbasicwidth = text("SecondaryTheme_container_basic_width", SecondaryTheme.container.basic.width)
                SecondaryThemecontainerbasicheight = text("SecondaryTheme_container_basic_height", SecondaryTheme.container.basic.height)
                SecondaryThemecontainerbasiclineHeight = text("SecondaryTheme_container_basic_lineHeight", SecondaryTheme.container.basic.lineHeight)
                SecondaryThemecontainerbasicuserSelect = text("SecondaryTheme_container_basic_userSelect", SecondaryTheme.container.basic.userSelect)
                SecondaryThemecontainerbasicdisplay = text("SecondaryTheme_container_basic_display", SecondaryTheme.container.basic.display)
                SecondaryThemecontainerbasicotherStyle = object("SecondaryTheme_container_basic屬性其他樣式", {})
                SecondaryThemecontainerhoverbackgroundColor = color("SecondaryTheme_container_hover_backgroundColor", SecondaryTheme.container.hover.backgroundColor)
                SecondaryThemecontainerhoverotherStyle = object("SecondaryTheme_container_hover屬性其他樣式", {})
                SecondaryThemetextbasicboxSizing = text("SecondaryTheme_text_basic_boxSizing", SecondaryTheme.text.basic.boxSizing)
                SecondaryThemetextbasicposition = text("SecondaryTheme_text_basic_position", SecondaryTheme.text.basic.position)
                SecondaryThemetextbasicwidth = text("SecondaryTheme_text_basic_width", SecondaryTheme.text.basic.width)
                SecondaryThemetextbasicminWidth = text("SecondaryTheme_text_basic_minWidth", SecondaryTheme.text.basic.minWidth)
                SecondaryThemetextbasicheight = text("SecondaryTheme_text_basic_height", SecondaryTheme.text.basic.height)
                SecondaryThemetextbasiclineHeight = text("SecondaryTheme_text_basic_lineHeight", SecondaryTheme.text.basic.lineHeight)
                SecondaryThemetextbasicwhiteSpace = text("SecondaryTheme_text_basic_whiteSpace", SecondaryTheme.text.basic.whiteSpace)
                SecondaryThemetextbasictextAlign = text("SecondaryTheme_text_basic_textAlign", SecondaryTheme.text.basic.textAlign)
                SecondaryThemetextbasicfontSize = text("SecondaryTheme_text_basic_fontSize", SecondaryTheme.text.basic.fontSize)
                SecondaryThemetextbasicfontWeight = text("SecondaryTheme_text_basic_fontWeight", SecondaryTheme.text.basic.fontWeight)
                SecondaryThemetextbasicletterSpacing = text("SecondaryTheme_text_basic_letterSpacing", SecondaryTheme.text.basic.letterSpacing)
                SecondaryThemetextbasicdisplay = text("SecondaryTheme_text_basic_display", SecondaryTheme.text.basic.display)
                SecondaryThemetextbasiccolor = color("SecondaryTheme_text_basic_color", SecondaryTheme.text.basic.color)
                SecondaryThemetextbasicfontFamily = text("SecondaryTheme_text_basic_fontFamily", SecondaryTheme.text.basic.fontFamily)
                SecondaryThemetextbasicotherStyle = object("SecondaryTheme_text_basic屬性其他樣式", {})
                SecondaryThemetexthoverotherStyle = object("SecondaryTheme_text_hover屬性其他樣式", {})

                exportCode = button("複製SecondaryTheme樣式程式碼至剪貼簿", () => {
                    codeExportAndCopy(`
                      <BasicButton
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${SecondaryThemecontainerbasicboxSizing}",
                          position: "${SecondaryThemecontainerbasicposition}",
                          minWidth: "${SecondaryThemecontainerbasicminWidth}",
                          backgroundImage: "${SecondaryThemecontainerbasicbackgroundImage}",
                          backgroundPosition: "${SecondaryThemecontainerbasicbackgroundPosition}",
                          backgroundRepeat: "${SecondaryThemecontainerbasicbackgroundRepeat}",
                          backgroundSize: "${SecondaryThemecontainerbasicbackgroundSize}",
                          whiteSpace: "${SecondaryThemecontainerbasicwhiteSpace}",
                          backgroundColor: "${SecondaryThemecontainerbasicbackgroundColor}",
                          color: "${SecondaryThemecontainerbasiccolor}",
                          borderRadius: "${SecondaryThemecontainerbasicborderRadius}",
                          textAlign: "${SecondaryThemecontainerbasictextAlign}",
                          fontSize: "${SecondaryThemecontainerbasicfontSize}",
                          cursor: "${SecondaryThemecontainerbasiccursor}",
                          fontWeight: "${SecondaryThemecontainerbasicfontWeight}",
                          width: "${SecondaryThemecontainerbasicwidth}",
                          height: "${SecondaryThemecontainerbasicheight}",
                          lineHeight: "${SecondaryThemecontainerbasiclineHeight}",
                          userSelect: "${SecondaryThemecontainerbasicuserSelect}",
                          display: "${SecondaryThemecontainerbasicdisplay}",
                          //#endregion
                          ${JSON.stringify(SecondaryThemecontainerbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${SecondaryThemecontainerhoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(SecondaryThemecontainerhoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                        text:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${SecondaryThemetextbasicboxSizing}",
                          position: "${SecondaryThemetextbasicposition}",
                          width: "${SecondaryThemetextbasicwidth}",
                          minWidth: "${SecondaryThemetextbasicminWidth}",
                          height: "${SecondaryThemetextbasicheight}",
                          lineHeight: "${SecondaryThemetextbasiclineHeight}",
                          whiteSpace: "${SecondaryThemetextbasicwhiteSpace}",
                          textAlign: "${SecondaryThemetextbasictextAlign}",
                          fontSize: "${SecondaryThemetextbasicfontSize}",
                          fontWeight: "${SecondaryThemetextbasicfontWeight}",
                          letterSpacing: "${SecondaryThemetextbasicletterSpacing}",
                          display: "${SecondaryThemetextbasicdisplay}",
                          color: "${SecondaryThemetextbasiccolor}",
                          fontFamily: '${SecondaryThemetextbasicfontFamily}',
                          //#endregion
                          ${JSON.stringify(SecondaryThemetextbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(SecondaryThemetexthoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
                });
                return { container: { basic: { boxSizing: SecondaryThemecontainerbasicboxSizing, position: SecondaryThemecontainerbasicposition, minWidth: SecondaryThemecontainerbasicminWidth, backgroundImage: SecondaryThemecontainerbasicbackgroundImage, backgroundPosition: SecondaryThemecontainerbasicbackgroundPosition, backgroundRepeat: SecondaryThemecontainerbasicbackgroundRepeat, backgroundSize: SecondaryThemecontainerbasicbackgroundSize, whiteSpace: SecondaryThemecontainerbasicwhiteSpace, backgroundColor: SecondaryThemecontainerbasicbackgroundColor, color: SecondaryThemecontainerbasiccolor, borderRadius: SecondaryThemecontainerbasicborderRadius, textAlign: SecondaryThemecontainerbasictextAlign, fontSize: SecondaryThemecontainerbasicfontSize, cursor: SecondaryThemecontainerbasiccursor, fontWeight: SecondaryThemecontainerbasicfontWeight, width: SecondaryThemecontainerbasicwidth, height: SecondaryThemecontainerbasicheight, lineHeight: SecondaryThemecontainerbasiclineHeight, userSelect: SecondaryThemecontainerbasicuserSelect, display: SecondaryThemecontainerbasicdisplay, ...SecondaryThemecontainerbasicotherStyle }, hover: { backgroundColor: SecondaryThemecontainerhoverbackgroundColor, ...SecondaryThemecontainerhoverotherStyle }, }, text: { basic: { boxSizing: SecondaryThemetextbasicboxSizing, position: SecondaryThemetextbasicposition, width: SecondaryThemetextbasicwidth, minWidth: SecondaryThemetextbasicminWidth, height: SecondaryThemetextbasicheight, lineHeight: SecondaryThemetextbasiclineHeight, whiteSpace: SecondaryThemetextbasicwhiteSpace, textAlign: SecondaryThemetextbasictextAlign, fontSize: SecondaryThemetextbasicfontSize, fontWeight: SecondaryThemetextbasicfontWeight, letterSpacing: SecondaryThemetextbasicletterSpacing, display: SecondaryThemetextbasicdisplay, color: SecondaryThemetextbasiccolor, fontFamily: SecondaryThemetextbasicfontFamily, ...SecondaryThemetextbasicotherStyle }, hover: { ...SecondaryThemetexthoverotherStyle }, }, };
            case "PrimaryTheme":
                PrimaryThemecontainerbasicboxSizing = text("PrimaryTheme_container_basic_boxSizing", PrimaryTheme.container.basic.boxSizing)
                PrimaryThemecontainerbasicposition = text("PrimaryTheme_container_basic_position", PrimaryTheme.container.basic.position)
                PrimaryThemecontainerbasicminWidth = text("PrimaryTheme_container_basic_minWidth", PrimaryTheme.container.basic.minWidth)
                PrimaryThemecontainerbasicbackgroundImage = text("PrimaryTheme_container_basic_backgroundImage", PrimaryTheme.container.basic.backgroundImage)
                PrimaryThemecontainerbasicbackgroundPosition = text("PrimaryTheme_container_basic_backgroundPosition", PrimaryTheme.container.basic.backgroundPosition)
                PrimaryThemecontainerbasicbackgroundRepeat = text("PrimaryTheme_container_basic_backgroundRepeat", PrimaryTheme.container.basic.backgroundRepeat)
                PrimaryThemecontainerbasicbackgroundSize = text("PrimaryTheme_container_basic_backgroundSize", PrimaryTheme.container.basic.backgroundSize)
                PrimaryThemecontainerbasicwhiteSpace = text("PrimaryTheme_container_basic_whiteSpace", PrimaryTheme.container.basic.whiteSpace)
                PrimaryThemecontainerbasicbackgroundColor = color("PrimaryTheme_container_basic_backgroundColor", PrimaryTheme.container.basic.backgroundColor)
                PrimaryThemecontainerbasiccolor = color("PrimaryTheme_container_basic_color", PrimaryTheme.container.basic.color)
                PrimaryThemecontainerbasicborderRadius = text("PrimaryTheme_container_basic_borderRadius", PrimaryTheme.container.basic.borderRadius)
                PrimaryThemecontainerbasictextAlign = text("PrimaryTheme_container_basic_textAlign", PrimaryTheme.container.basic.textAlign)
                PrimaryThemecontainerbasicfontSize = text("PrimaryTheme_container_basic_fontSize", PrimaryTheme.container.basic.fontSize)
                PrimaryThemecontainerbasiccursor = text("PrimaryTheme_container_basic_cursor", PrimaryTheme.container.basic.cursor)
                PrimaryThemecontainerbasicfontWeight = text("PrimaryTheme_container_basic_fontWeight", PrimaryTheme.container.basic.fontWeight)
                PrimaryThemecontainerbasicwidth = text("PrimaryTheme_container_basic_width", PrimaryTheme.container.basic.width)
                PrimaryThemecontainerbasicheight = text("PrimaryTheme_container_basic_height", PrimaryTheme.container.basic.height)
                PrimaryThemecontainerbasiclineHeight = text("PrimaryTheme_container_basic_lineHeight", PrimaryTheme.container.basic.lineHeight)
                PrimaryThemecontainerbasicuserSelect = text("PrimaryTheme_container_basic_userSelect", PrimaryTheme.container.basic.userSelect)
                PrimaryThemecontainerbasicdisplay = text("PrimaryTheme_container_basic_display", PrimaryTheme.container.basic.display)
                PrimaryThemecontainerbasicotherStyle = object("PrimaryTheme_container_basic屬性其他樣式", {})
                PrimaryThemecontainerhoverbackgroundColor = color("PrimaryTheme_container_hover_backgroundColor", PrimaryTheme.container.hover.backgroundColor)
                PrimaryThemecontainerhoverotherStyle = object("PrimaryTheme_container_hover屬性其他樣式", {})
                PrimaryThemetextbasicboxSizing = text("PrimaryTheme_text_basic_boxSizing", PrimaryTheme.text.basic.boxSizing)
                PrimaryThemetextbasicposition = text("PrimaryTheme_text_basic_position", PrimaryTheme.text.basic.position)
                PrimaryThemetextbasicwidth = text("PrimaryTheme_text_basic_width", PrimaryTheme.text.basic.width)
                PrimaryThemetextbasicminWidth = text("PrimaryTheme_text_basic_minWidth", PrimaryTheme.text.basic.minWidth)
                PrimaryThemetextbasicheight = text("PrimaryTheme_text_basic_height", PrimaryTheme.text.basic.height)
                PrimaryThemetextbasiclineHeight = text("PrimaryTheme_text_basic_lineHeight", PrimaryTheme.text.basic.lineHeight)
                PrimaryThemetextbasicwhiteSpace = text("PrimaryTheme_text_basic_whiteSpace", PrimaryTheme.text.basic.whiteSpace)
                PrimaryThemetextbasictextAlign = text("PrimaryTheme_text_basic_textAlign", PrimaryTheme.text.basic.textAlign)
                PrimaryThemetextbasicfontSize = text("PrimaryTheme_text_basic_fontSize", PrimaryTheme.text.basic.fontSize)
                PrimaryThemetextbasicfontWeight = text("PrimaryTheme_text_basic_fontWeight", PrimaryTheme.text.basic.fontWeight)
                PrimaryThemetextbasicletterSpacing = text("PrimaryTheme_text_basic_letterSpacing", PrimaryTheme.text.basic.letterSpacing)
                PrimaryThemetextbasicdisplay = text("PrimaryTheme_text_basic_display", PrimaryTheme.text.basic.display)
                PrimaryThemetextbasiccolor = color("PrimaryTheme_text_basic_color", PrimaryTheme.text.basic.color)
                PrimaryThemetextbasicfontFamily = text("PrimaryTheme_text_basic_fontFamily", PrimaryTheme.text.basic.fontFamily)
                PrimaryThemetextbasicotherStyle = object("PrimaryTheme_text_basic屬性其他樣式", {})
                PrimaryThemetexthoverotherStyle = object("PrimaryTheme_text_hover屬性其他樣式", {})

                exportCode = button("複製PrimaryTheme樣式程式碼至剪貼簿", () => {
                    codeExportAndCopy(`
                      <BasicButton
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${PrimaryThemecontainerbasicboxSizing}",
                          position: "${PrimaryThemecontainerbasicposition}",
                          minWidth: "${PrimaryThemecontainerbasicminWidth}",
                          backgroundImage: "${PrimaryThemecontainerbasicbackgroundImage}",
                          backgroundPosition: "${PrimaryThemecontainerbasicbackgroundPosition}",
                          backgroundRepeat: "${PrimaryThemecontainerbasicbackgroundRepeat}",
                          backgroundSize: "${PrimaryThemecontainerbasicbackgroundSize}",
                          whiteSpace: "${PrimaryThemecontainerbasicwhiteSpace}",
                          backgroundColor: "${PrimaryThemecontainerbasicbackgroundColor}",
                          color: "${PrimaryThemecontainerbasiccolor}",
                          borderRadius: "${PrimaryThemecontainerbasicborderRadius}",
                          textAlign: "${PrimaryThemecontainerbasictextAlign}",
                          fontSize: "${PrimaryThemecontainerbasicfontSize}",
                          cursor: "${PrimaryThemecontainerbasiccursor}",
                          fontWeight: "${PrimaryThemecontainerbasicfontWeight}",
                          width: "${PrimaryThemecontainerbasicwidth}",
                          height: "${PrimaryThemecontainerbasicheight}",
                          lineHeight: "${PrimaryThemecontainerbasiclineHeight}",
                          userSelect: "${PrimaryThemecontainerbasicuserSelect}",
                          display: "${PrimaryThemecontainerbasicdisplay}",
                          //#endregion
                          ${JSON.stringify(PrimaryThemecontainerbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${PrimaryThemecontainerhoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(PrimaryThemecontainerhoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                        text:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${PrimaryThemetextbasicboxSizing}",
                          position: "${PrimaryThemetextbasicposition}",
                          width: "${PrimaryThemetextbasicwidth}",
                          minWidth: "${PrimaryThemetextbasicminWidth}",
                          height: "${PrimaryThemetextbasicheight}",
                          lineHeight: "${PrimaryThemetextbasiclineHeight}",
                          whiteSpace: "${PrimaryThemetextbasicwhiteSpace}",
                          textAlign: "${PrimaryThemetextbasictextAlign}",
                          fontSize: "${PrimaryThemetextbasicfontSize}",
                          fontWeight: "${PrimaryThemetextbasicfontWeight}",
                          letterSpacing: "${PrimaryThemetextbasicletterSpacing}",
                          display: "${PrimaryThemetextbasicdisplay}",
                          color: "${PrimaryThemetextbasiccolor}",
                          fontFamily: '${PrimaryThemetextbasicfontFamily}',
                          //#endregion
                          ${JSON.stringify(PrimaryThemetextbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(PrimaryThemetexthoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
                });
                return { container: { basic: { boxSizing: PrimaryThemecontainerbasicboxSizing, position: PrimaryThemecontainerbasicposition, minWidth: PrimaryThemecontainerbasicminWidth, backgroundImage: PrimaryThemecontainerbasicbackgroundImage, backgroundPosition: PrimaryThemecontainerbasicbackgroundPosition, backgroundRepeat: PrimaryThemecontainerbasicbackgroundRepeat, backgroundSize: PrimaryThemecontainerbasicbackgroundSize, whiteSpace: PrimaryThemecontainerbasicwhiteSpace, backgroundColor: PrimaryThemecontainerbasicbackgroundColor, color: PrimaryThemecontainerbasiccolor, borderRadius: PrimaryThemecontainerbasicborderRadius, textAlign: PrimaryThemecontainerbasictextAlign, fontSize: PrimaryThemecontainerbasicfontSize, cursor: PrimaryThemecontainerbasiccursor, fontWeight: PrimaryThemecontainerbasicfontWeight, width: PrimaryThemecontainerbasicwidth, height: PrimaryThemecontainerbasicheight, lineHeight: PrimaryThemecontainerbasiclineHeight, userSelect: PrimaryThemecontainerbasicuserSelect, display: PrimaryThemecontainerbasicdisplay, ...PrimaryThemecontainerbasicotherStyle }, hover: { backgroundColor: PrimaryThemecontainerhoverbackgroundColor, ...PrimaryThemecontainerhoverotherStyle }, }, text: { basic: { boxSizing: PrimaryThemetextbasicboxSizing, position: PrimaryThemetextbasicposition, width: PrimaryThemetextbasicwidth, minWidth: PrimaryThemetextbasicminWidth, height: PrimaryThemetextbasicheight, lineHeight: PrimaryThemetextbasiclineHeight, whiteSpace: PrimaryThemetextbasicwhiteSpace, textAlign: PrimaryThemetextbasictextAlign, fontSize: PrimaryThemetextbasicfontSize, fontWeight: PrimaryThemetextbasicfontWeight, letterSpacing: PrimaryThemetextbasicletterSpacing, display: PrimaryThemetextbasicdisplay, color: PrimaryThemetextbasiccolor, fontFamily: PrimaryThemetextbasicfontFamily, ...PrimaryThemetextbasicotherStyle }, hover: { ...PrimaryThemetexthoverotherStyle }, }, };
            default:
                DefaultThemecontainerbasicboxSizing = text("DefaultTheme_container_basic_boxSizing", DefaultTheme.container.basic.boxSizing)
                DefaultThemecontainerbasicposition = text("DefaultTheme_container_basic_position", DefaultTheme.container.basic.position)
                DefaultThemecontainerbasicminWidth = text("DefaultTheme_container_basic_minWidth", DefaultTheme.container.basic.minWidth)
                DefaultThemecontainerbasicbackgroundImage = text("DefaultTheme_container_basic_backgroundImage", DefaultTheme.container.basic.backgroundImage)
                DefaultThemecontainerbasicbackgroundPosition = text("DefaultTheme_container_basic_backgroundPosition", DefaultTheme.container.basic.backgroundPosition)
                DefaultThemecontainerbasicbackgroundRepeat = text("DefaultTheme_container_basic_backgroundRepeat", DefaultTheme.container.basic.backgroundRepeat)
                DefaultThemecontainerbasicbackgroundSize = text("DefaultTheme_container_basic_backgroundSize", DefaultTheme.container.basic.backgroundSize)
                DefaultThemecontainerbasicwhiteSpace = text("DefaultTheme_container_basic_whiteSpace", DefaultTheme.container.basic.whiteSpace)
                DefaultThemecontainerbasicbackgroundColor = color("DefaultTheme_container_basic_backgroundColor", DefaultTheme.container.basic.backgroundColor)
                DefaultThemecontainerbasiccolor = color("DefaultTheme_container_basic_color", DefaultTheme.container.basic.color)
                DefaultThemecontainerbasicborderRadius = text("DefaultTheme_container_basic_borderRadius", DefaultTheme.container.basic.borderRadius)
                DefaultThemecontainerbasictextAlign = text("DefaultTheme_container_basic_textAlign", DefaultTheme.container.basic.textAlign)
                DefaultThemecontainerbasicfontSize = text("DefaultTheme_container_basic_fontSize", DefaultTheme.container.basic.fontSize)
                DefaultThemecontainerbasiccursor = text("DefaultTheme_container_basic_cursor", DefaultTheme.container.basic.cursor)
                DefaultThemecontainerbasicfontWeight = text("DefaultTheme_container_basic_fontWeight", DefaultTheme.container.basic.fontWeight)
                DefaultThemecontainerbasicwidth = text("DefaultTheme_container_basic_width", DefaultTheme.container.basic.width)
                DefaultThemecontainerbasicheight = text("DefaultTheme_container_basic_height", DefaultTheme.container.basic.height)
                DefaultThemecontainerbasiclineHeight = text("DefaultTheme_container_basic_lineHeight", DefaultTheme.container.basic.lineHeight)
                DefaultThemecontainerbasicuserSelect = text("DefaultTheme_container_basic_userSelect", DefaultTheme.container.basic.userSelect)
                DefaultThemecontainerbasicdisplay = text("DefaultTheme_container_basic_display", DefaultTheme.container.basic.display)
                DefaultThemecontainerbasicotherStyle = object("DefaultTheme_container_basic屬性其他樣式", {})
                DefaultThemecontainerhoverbackgroundColor = color("DefaultTheme_container_hover_backgroundColor", DefaultTheme.container.hover.backgroundColor)
                DefaultThemecontainerhoverotherStyle = object("DefaultTheme_container_hover屬性其他樣式", {})
                DefaultThemetextbasicboxSizing = text("DefaultTheme_text_basic_boxSizing", DefaultTheme.text.basic.boxSizing)
                DefaultThemetextbasicposition = text("DefaultTheme_text_basic_position", DefaultTheme.text.basic.position)
                DefaultThemetextbasicwidth = text("DefaultTheme_text_basic_width", DefaultTheme.text.basic.width)
                DefaultThemetextbasicminWidth = text("DefaultTheme_text_basic_minWidth", DefaultTheme.text.basic.minWidth)
                DefaultThemetextbasicheight = text("DefaultTheme_text_basic_height", DefaultTheme.text.basic.height)
                DefaultThemetextbasiclineHeight = text("DefaultTheme_text_basic_lineHeight", DefaultTheme.text.basic.lineHeight)
                DefaultThemetextbasicwhiteSpace = text("DefaultTheme_text_basic_whiteSpace", DefaultTheme.text.basic.whiteSpace)
                DefaultThemetextbasictextAlign = text("DefaultTheme_text_basic_textAlign", DefaultTheme.text.basic.textAlign)
                DefaultThemetextbasicfontSize = text("DefaultTheme_text_basic_fontSize", DefaultTheme.text.basic.fontSize)
                DefaultThemetextbasicfontWeight = text("DefaultTheme_text_basic_fontWeight", DefaultTheme.text.basic.fontWeight)
                DefaultThemetextbasicletterSpacing = text("DefaultTheme_text_basic_letterSpacing", DefaultTheme.text.basic.letterSpacing)
                DefaultThemetextbasicdisplay = text("DefaultTheme_text_basic_display", DefaultTheme.text.basic.display)
                DefaultThemetextbasiccolor = color("DefaultTheme_text_basic_color", DefaultTheme.text.basic.color)
                DefaultThemetextbasicfontFamily = text("DefaultTheme_text_basic_fontFamily", DefaultTheme.text.basic.fontFamily)
                DefaultThemetextbasicotherStyle = object("DefaultTheme_text_basic屬性其他樣式", {})
                DefaultThemetexthoverotherStyle = object("DefaultTheme_text_hover屬性其他樣式", {})

                exportCode = button("複製DefaultTheme樣式程式碼至剪貼簿", () => {
                    codeExportAndCopy(`
                      <BasicButton
                      baseDefaultTheme={"${themeselect}"}
                      theme={{                        
container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${DefaultThemecontainerbasicboxSizing}",
                          position: "${DefaultThemecontainerbasicposition}",
                          minWidth: "${DefaultThemecontainerbasicminWidth}",
                          backgroundImage: "${DefaultThemecontainerbasicbackgroundImage}",
                          backgroundPosition: "${DefaultThemecontainerbasicbackgroundPosition}",
                          backgroundRepeat: "${DefaultThemecontainerbasicbackgroundRepeat}",
                          backgroundSize: "${DefaultThemecontainerbasicbackgroundSize}",
                          whiteSpace: "${DefaultThemecontainerbasicwhiteSpace}",
                          backgroundColor: "${DefaultThemecontainerbasicbackgroundColor}",
                          color: "${DefaultThemecontainerbasiccolor}",
                          borderRadius: "${DefaultThemecontainerbasicborderRadius}",
                          textAlign: "${DefaultThemecontainerbasictextAlign}",
                          fontSize: "${DefaultThemecontainerbasicfontSize}",
                          cursor: "${DefaultThemecontainerbasiccursor}",
                          fontWeight: "${DefaultThemecontainerbasicfontWeight}",
                          width: "${DefaultThemecontainerbasicwidth}",
                          height: "${DefaultThemecontainerbasicheight}",
                          lineHeight: "${DefaultThemecontainerbasiclineHeight}",
                          userSelect: "${DefaultThemecontainerbasicuserSelect}",
                          display: "${DefaultThemecontainerbasicdisplay}",
                          //#endregion
                          ${JSON.stringify(DefaultThemecontainerbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${DefaultThemecontainerhoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(DefaultThemecontainerhoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },                        
text:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${DefaultThemetextbasicboxSizing}",
                          position: "${DefaultThemetextbasicposition}",
                          width: "${DefaultThemetextbasicwidth}",
                          minWidth: "${DefaultThemetextbasicminWidth}",
                          height: "${DefaultThemetextbasicheight}",
                          lineHeight: "${DefaultThemetextbasiclineHeight}",
                          whiteSpace: "${DefaultThemetextbasicwhiteSpace}",
                          textAlign: "${DefaultThemetextbasictextAlign}",
                          fontSize: "${DefaultThemetextbasicfontSize}",
                          fontWeight: "${DefaultThemetextbasicfontWeight}",
                          letterSpacing: "${DefaultThemetextbasicletterSpacing}",
                          display: "${DefaultThemetextbasicdisplay}",
                          color: "${DefaultThemetextbasiccolor}",
                          fontFamily: '${DefaultThemetextbasicfontFamily}',
                          //#endregion
                          ${JSON.stringify(DefaultThemetextbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(DefaultThemetexthoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
                });
                return { container: { basic: { boxSizing: DefaultThemecontainerbasicboxSizing, position: DefaultThemecontainerbasicposition, minWidth: DefaultThemecontainerbasicminWidth, backgroundImage: DefaultThemecontainerbasicbackgroundImage, backgroundPosition: DefaultThemecontainerbasicbackgroundPosition, backgroundRepeat: DefaultThemecontainerbasicbackgroundRepeat, backgroundSize: DefaultThemecontainerbasicbackgroundSize, whiteSpace: DefaultThemecontainerbasicwhiteSpace, backgroundColor: DefaultThemecontainerbasicbackgroundColor, color: DefaultThemecontainerbasiccolor, borderRadius: DefaultThemecontainerbasicborderRadius, textAlign: DefaultThemecontainerbasictextAlign, fontSize: DefaultThemecontainerbasicfontSize, cursor: DefaultThemecontainerbasiccursor, fontWeight: DefaultThemecontainerbasicfontWeight, width: DefaultThemecontainerbasicwidth, height: DefaultThemecontainerbasicheight, lineHeight: DefaultThemecontainerbasiclineHeight, userSelect: DefaultThemecontainerbasicuserSelect, display: DefaultThemecontainerbasicdisplay, ...DefaultThemecontainerbasicotherStyle }, hover: { backgroundColor: DefaultThemecontainerhoverbackgroundColor, ...DefaultThemecontainerhoverotherStyle }, }, text: { basic: { boxSizing: DefaultThemetextbasicboxSizing, position: DefaultThemetextbasicposition, width: DefaultThemetextbasicwidth, minWidth: DefaultThemetextbasicminWidth, height: DefaultThemetextbasicheight, lineHeight: DefaultThemetextbasiclineHeight, whiteSpace: DefaultThemetextbasicwhiteSpace, textAlign: DefaultThemetextbasictextAlign, fontSize: DefaultThemetextbasicfontSize, fontWeight: DefaultThemetextbasicfontWeight, letterSpacing: DefaultThemetextbasicletterSpacing, display: DefaultThemetextbasicdisplay, color: DefaultThemetextbasiccolor, fontFamily: DefaultThemetextbasicfontFamily, ...DefaultThemetextbasicotherStyle }, hover: { ...DefaultThemetexthoverotherStyle }, }, };

        }
    }

    return <BasicButton
        theme={(switchDefaultTheme(themeselect))}
        baseDefaultTheme={themeselect} />;
};

BasicButton_.story = {
    parameters: {
        notes: { "BasicButtonNote": BasicButtonNote },
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