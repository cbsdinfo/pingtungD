//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color, boolean } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import DefaultTheme from './Theme/DefaultTheme'
import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
import SuccessTheme from './Theme/SuccessTheme'
import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion
//#region 引入組件
import { Tag } from './Tag'
//#endregion
//#region 引入說明檔案
import TagNote from './TagNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../../Handlers/ThemeHandler';
//#endregion

//#region Menu 基本配置
export default {
  title: 'Tag',// 顯示於左方Menu，標題名稱
  decorators: [withKnobs],// withKnobs 配置Knobs
  excludeStories: /.*Data$/,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
//#endregion


//#region Tag 組件
export const Tag_ = (props) => {

  const themeselect = select(
    "選擇預設樣式",
    {
      DefaultTheme: 'DefaultTheme',
      PrimaryTheme: 'PrimaryTheme',
      SecondaryTheme: 'SecondaryTheme',
      SuccessTheme: 'SuccessTheme',
    },
    "DefaultTheme"
  );

  let [PropsonClose, Propstext, SuccessThemecontainerbasicboxSizing, SuccessThemecontainerbasicminWidth, SuccessThemecontainerbasicwhiteSpace, SuccessThemecontainerbasictextAlign, SuccessThemecontainerbasicdisplay, SuccessThemecontainerbasicposition, SuccessThemecontainerbasiccolor, SuccessThemecontainerbasicfontSize, SuccessThemecontainerbasicfontWeight, SuccessThemecontainerbasiclineHeight, SuccessThemecontainerbasicoutline, SuccessThemecontainerbasicuserSelect, SuccessThemecontainerbasicbackgroundColor, SuccessThemecontainerbasicborder, SuccessThemecontainerbasicborderRadius, SuccessThemecontainerbasicmargin, SuccessThemecontainerbasicpadding, SuccessThemecontainerbasicfontFamily, SuccessThemecontainerbasicotherStyle, SuccessThemecontainerhoverbackgroundColor, SuccessThemecontainerhoverotherStyle, SuccessThemecloseIconbasicposition, SuccessThemecloseIconbasicheight, SuccessThemecloseIconbasicwidth, SuccessThemecloseIconbasicright, SuccessThemecloseIconbasictop, SuccessThemecloseIconbasiccolor, SuccessThemecloseIconbasicotherStyle, SecondaryThemecontainerbasicboxSizing, SecondaryThemecontainerbasicminWidth, SecondaryThemecontainerbasicwhiteSpace, SecondaryThemecontainerbasictextAlign, SecondaryThemecontainerbasicdisplay, SecondaryThemecontainerbasicposition, SecondaryThemecontainerbasiccolor, SecondaryThemecontainerbasicfontSize, SecondaryThemecontainerbasicfontWeight, SecondaryThemecontainerbasiclineHeight, SecondaryThemecontainerbasicoutline, SecondaryThemecontainerbasicuserSelect, SecondaryThemecontainerbasicbackgroundColor, SecondaryThemecontainerbasicborder, SecondaryThemecontainerbasicborderRadius, SecondaryThemecontainerbasicmargin, SecondaryThemecontainerbasicpadding, SecondaryThemecontainerbasicfontFamily, SecondaryThemecontainerbasicotherStyle, SecondaryThemecontainerhoverbackgroundColor, SecondaryThemecontainerhoverotherStyle, SecondaryThemecloseIconbasicposition, SecondaryThemecloseIconbasicheight, SecondaryThemecloseIconbasicwidth, SecondaryThemecloseIconbasicright, SecondaryThemecloseIconbasictop, SecondaryThemecloseIconbasiccolor, SecondaryThemecloseIconbasicotherStyle, PrimaryThemecontainerbasicboxSizing, PrimaryThemecontainerbasicminWidth, PrimaryThemecontainerbasicwhiteSpace, PrimaryThemecontainerbasictextAlign, PrimaryThemecontainerbasicdisplay, PrimaryThemecontainerbasicposition, PrimaryThemecontainerbasiccolor, PrimaryThemecontainerbasicfontSize, PrimaryThemecontainerbasicfontWeight, PrimaryThemecontainerbasiclineHeight, PrimaryThemecontainerbasicoutline, PrimaryThemecontainerbasicuserSelect, PrimaryThemecontainerbasicbackgroundColor, PrimaryThemecontainerbasicborder, PrimaryThemecontainerbasicborderRadius, PrimaryThemecontainerbasicmargin, PrimaryThemecontainerbasicpadding, PrimaryThemecontainerbasicfontFamily, PrimaryThemecontainerbasicotherStyle, PrimaryThemecontainerhoverbackgroundColor, PrimaryThemecontainerhoverotherStyle, PrimaryThemecloseIconbasicposition, PrimaryThemecloseIconbasicheight, PrimaryThemecloseIconbasicwidth, PrimaryThemecloseIconbasicright, PrimaryThemecloseIconbasictop, PrimaryThemecloseIconbasiccolor, PrimaryThemecloseIconbasicotherStyle, DefaultThemecontainerbasicboxSizing, DefaultThemecontainerbasicminWidth, DefaultThemecontainerbasicwhiteSpace, DefaultThemecontainerbasictextAlign, DefaultThemecontainerbasicdisplay, DefaultThemecontainerbasicposition, DefaultThemecontainerbasiccolor, DefaultThemecontainerbasicfontSize, DefaultThemecontainerbasicfontWeight, DefaultThemecontainerbasiclineHeight, DefaultThemecontainerbasicoutline, DefaultThemecontainerbasicuserSelect, DefaultThemecontainerbasicbackgroundColor, DefaultThemecontainerbasicborder, DefaultThemecontainerbasicborderRadius, DefaultThemecontainerbasicmargin, DefaultThemecontainerbasicpadding, DefaultThemecontainerbasicfontFamily, DefaultThemecontainerbasicotherStyle, DefaultThemecontainerhoverbackgroundColor, DefaultThemecontainerhoverotherStyle, DefaultThemecloseIconbasicposition, DefaultThemecloseIconbasicheight, DefaultThemecloseIconbasicwidth, DefaultThemecloseIconbasicright, DefaultThemecloseIconbasictop, DefaultThemecloseIconbasiccolor, DefaultThemecloseIconbasicotherStyle, exportCode] = [];
  const switchDefaultTheme = (themeName) => {
    switch (themeName) {
      case "SuccessTheme":
        PropsonClose = boolean("Props_onClose", false)
        Propstext = text("Props_text", "標籤文字")
        SuccessThemecontainerbasicboxSizing = text("SuccessTheme_container_basic_boxSizing", SuccessTheme.container.basic(null, props).boxSizing)
        SuccessThemecontainerbasicminWidth = text("SuccessTheme_container_basic_minWidth", SuccessTheme.container.basic(null, props).minWidth)
        SuccessThemecontainerbasicwhiteSpace = text("SuccessTheme_container_basic_whiteSpace", SuccessTheme.container.basic(null, props).whiteSpace)
        SuccessThemecontainerbasictextAlign = text("SuccessTheme_container_basic_textAlign", SuccessTheme.container.basic(null, props).textAlign)
        SuccessThemecontainerbasicdisplay = text("SuccessTheme_container_basic_display", SuccessTheme.container.basic(null, props).display)
        SuccessThemecontainerbasicposition = text("SuccessTheme_container_basic_position", SuccessTheme.container.basic(null, props).position)
        SuccessThemecontainerbasiccolor = color("SuccessTheme_container_basic_color", SuccessTheme.container.basic(null, props).color)
        SuccessThemecontainerbasicfontSize = text("SuccessTheme_container_basic_fontSize", SuccessTheme.container.basic(null, props).fontSize)
        SuccessThemecontainerbasicfontWeight = text("SuccessTheme_container_basic_fontWeight", SuccessTheme.container.basic(null, props).fontWeight)
        SuccessThemecontainerbasiclineHeight = text("SuccessTheme_container_basic_lineHeight", SuccessTheme.container.basic(null, props).lineHeight)
        SuccessThemecontainerbasicoutline = text("SuccessTheme_container_basic_outline", SuccessTheme.container.basic(null, props).outline)
        SuccessThemecontainerbasicuserSelect = text("SuccessTheme_container_basic_userSelect", SuccessTheme.container.basic(null, props).userSelect)
        SuccessThemecontainerbasicbackgroundColor = color("SuccessTheme_container_basic_backgroundColor", SuccessTheme.container.basic(null, props).backgroundColor)
        SuccessThemecontainerbasicborder = text("SuccessTheme_container_basic_border", SuccessTheme.container.basic(null, props).border)
        SuccessThemecontainerbasicborderRadius = text("SuccessTheme_container_basic_borderRadius", SuccessTheme.container.basic(null, props).borderRadius)
        SuccessThemecontainerbasicmargin = text("SuccessTheme_container_basic_margin", SuccessTheme.container.basic(null, props).margin)
        //SuccessThemecontainerbasicpadding = text("SuccessTheme_container_basic_padding", SuccessTheme.container.basic(null, props).padding)
        SuccessThemecontainerbasicfontFamily = text("SuccessTheme_container_basic_fontFamily", SuccessTheme.container.basic(null, props).fontFamily)
        SuccessThemecontainerbasicotherStyle = object("SuccessTheme_container_basic屬性其他樣式", {})
        SuccessThemecontainerhoverbackgroundColor = color("SuccessTheme_container_hover_backgroundColor", SuccessTheme.container.hover.backgroundColor)
        SuccessThemecontainerhoverotherStyle = object("SuccessTheme_container_hover屬性其他樣式", {})
        SuccessThemecloseIconbasicposition = text("SuccessTheme_closeIcon_basic_position", SuccessTheme.closeIcon.basic.position)
        SuccessThemecloseIconbasicheight = text("SuccessTheme_closeIcon_basic_height", SuccessTheme.closeIcon.basic.height)
        SuccessThemecloseIconbasicwidth = text("SuccessTheme_closeIcon_basic_width", SuccessTheme.closeIcon.basic.width)
        SuccessThemecloseIconbasicright = text("SuccessTheme_closeIcon_basic_right", SuccessTheme.closeIcon.basic.right)
        SuccessThemecloseIconbasictop = text("SuccessTheme_closeIcon_basic_top", SuccessTheme.closeIcon.basic.top)
        SuccessThemecloseIconbasiccolor = color("SuccessTheme_closeIcon_basic_color", SuccessTheme.closeIcon.basic.color)
        SuccessThemecloseIconbasicotherStyle = object("SuccessTheme_closeIcon_basic屬性其他樣式", {})
        //PropsonClose = boolean("Props_onClose", false)

        exportCode = button("複製SuccessTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <Tag
                      ${PropsonClose && `onClose={()=>{console.log("關閉標籤")}}`}
                      text={"${Propstext}"}
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${SuccessThemecontainerbasicboxSizing}",
                          minWidth: "${SuccessThemecontainerbasicminWidth}",
                          whiteSpace: "${SuccessThemecontainerbasicwhiteSpace}",
                          textAlign: "${SuccessThemecontainerbasictextAlign}",
                          display: "${SuccessThemecontainerbasicdisplay}",
                          position: "${SuccessThemecontainerbasicposition}",
                          color: "${SuccessThemecontainerbasiccolor}",
                          fontSize: "${SuccessThemecontainerbasicfontSize}",
                          fontWeight: "${SuccessThemecontainerbasicfontWeight}",
                          lineHeight: "${SuccessThemecontainerbasiclineHeight}",
                          outline: "${SuccessThemecontainerbasicoutline}",
                          userSelect: "${SuccessThemecontainerbasicuserSelect}",
                          backgroundColor: "${SuccessThemecontainerbasicbackgroundColor}",
                          border: "${SuccessThemecontainerbasicborder}",
                          borderRadius: "${SuccessThemecontainerbasicborderRadius}",
                          margin: "${SuccessThemecontainerbasicmargin}",
                          padding: \`0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem\`,
                          fontFamily: '${SuccessThemecontainerbasicfontFamily}',
                          //#endregion
                          ${JSON.stringify(SuccessThemecontainerbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${SuccessThemecontainerhoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(SuccessThemecontainerhoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                        closeIcon:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          position: "${SuccessThemecloseIconbasicposition}",
                          height: "${SuccessThemecloseIconbasicheight}",
                          width: "${SuccessThemecloseIconbasicwidth}",
                          right: "${SuccessThemecloseIconbasicright}",
                          top: "${SuccessThemecloseIconbasictop}",
                          color: "${SuccessThemecloseIconbasiccolor}",
                          //#endregion
                          ${JSON.stringify(SuccessThemecloseIconbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
        });
        return { container: { basic: { boxSizing: SuccessThemecontainerbasicboxSizing, minWidth: SuccessThemecontainerbasicminWidth, whiteSpace: SuccessThemecontainerbasicwhiteSpace, textAlign: SuccessThemecontainerbasictextAlign, display: SuccessThemecontainerbasicdisplay, position: SuccessThemecontainerbasicposition, color: SuccessThemecontainerbasiccolor, fontSize: SuccessThemecontainerbasicfontSize, fontWeight: SuccessThemecontainerbasicfontWeight, lineHeight: SuccessThemecontainerbasiclineHeight, outline: SuccessThemecontainerbasicoutline, userSelect: SuccessThemecontainerbasicuserSelect, backgroundColor: SuccessThemecontainerbasicbackgroundColor, border: SuccessThemecontainerbasicborder, borderRadius: SuccessThemecontainerbasicborderRadius, margin: SuccessThemecontainerbasicmargin, padding: `0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem`, fontFamily: SuccessThemecontainerbasicfontFamily, ...SuccessThemecontainerbasicotherStyle }, hover: { backgroundColor: SuccessThemecontainerhoverbackgroundColor, ...SuccessThemecontainerhoverotherStyle }, }, closeIcon: { basic: { position: SuccessThemecloseIconbasicposition, height: SuccessThemecloseIconbasicheight, width: SuccessThemecloseIconbasicwidth, right: SuccessThemecloseIconbasicright, top: SuccessThemecloseIconbasictop, color: SuccessThemecloseIconbasiccolor, ...SuccessThemecloseIconbasicotherStyle }, }, };
      case "SecondaryTheme":
        PropsonClose = boolean("Props_onClose", false)
        Propstext = text("Props_text", "標籤文字")
        SecondaryThemecontainerbasicboxSizing = text("SecondaryTheme_container_basic_boxSizing", SecondaryTheme.container.basic(null, props).boxSizing)
        SecondaryThemecontainerbasicminWidth = text("SecondaryTheme_container_basic_minWidth", SecondaryTheme.container.basic(null, props).minWidth)
        SecondaryThemecontainerbasicwhiteSpace = text("SecondaryTheme_container_basic_whiteSpace", SecondaryTheme.container.basic(null, props).whiteSpace)
        SecondaryThemecontainerbasictextAlign = text("SecondaryTheme_container_basic_textAlign", SecondaryTheme.container.basic(null, props).textAlign)
        SecondaryThemecontainerbasicdisplay = text("SecondaryTheme_container_basic_display", SecondaryTheme.container.basic(null, props).display)
        SecondaryThemecontainerbasicposition = text("SecondaryTheme_container_basic_position", SecondaryTheme.container.basic(null, props).position)
        SecondaryThemecontainerbasiccolor = color("SecondaryTheme_container_basic_color", SecondaryTheme.container.basic(null, props).color)
        SecondaryThemecontainerbasicfontSize = text("SecondaryTheme_container_basic_fontSize", SecondaryTheme.container.basic(null, props).fontSize)
        SecondaryThemecontainerbasicfontWeight = text("SecondaryTheme_container_basic_fontWeight", SecondaryTheme.container.basic(null, props).fontWeight)
        SecondaryThemecontainerbasiclineHeight = text("SecondaryTheme_container_basic_lineHeight", SecondaryTheme.container.basic(null, props).lineHeight)
        SecondaryThemecontainerbasicoutline = text("SecondaryTheme_container_basic_outline", SecondaryTheme.container.basic(null, props).outline)
        SecondaryThemecontainerbasicuserSelect = text("SecondaryTheme_container_basic_userSelect", SecondaryTheme.container.basic(null, props).userSelect)
        SecondaryThemecontainerbasicbackgroundColor = color("SecondaryTheme_container_basic_backgroundColor", SecondaryTheme.container.basic(null, props).backgroundColor)
        SecondaryThemecontainerbasicborder = text("SecondaryTheme_container_basic_border", SecondaryTheme.container.basic(null, props).border)
        SecondaryThemecontainerbasicborderRadius = text("SecondaryTheme_container_basic_borderRadius", SecondaryTheme.container.basic(null, props).borderRadius)
        SecondaryThemecontainerbasicmargin = text("SecondaryTheme_container_basic_margin", SecondaryTheme.container.basic(null, props).margin)
        //SecondaryThemecontainerbasicpadding = text("SecondaryTheme_container_basic_padding", SecondaryTheme.container.basic(null, props).padding)
        SecondaryThemecontainerbasicfontFamily = text("SecondaryTheme_container_basic_fontFamily", SecondaryTheme.container.basic(null, props).fontFamily)
        SecondaryThemecontainerbasicotherStyle = object("SecondaryTheme_container_basic屬性其他樣式", {})
        SecondaryThemecontainerhoverbackgroundColor = color("SecondaryTheme_container_hover_backgroundColor", SecondaryTheme.container.hover.backgroundColor)
        SecondaryThemecontainerhoverotherStyle = object("SecondaryTheme_container_hover屬性其他樣式", {})
        SecondaryThemecloseIconbasicposition = text("SecondaryTheme_closeIcon_basic_position", SecondaryTheme.closeIcon.basic.position)
        SecondaryThemecloseIconbasicheight = text("SecondaryTheme_closeIcon_basic_height", SecondaryTheme.closeIcon.basic.height)
        SecondaryThemecloseIconbasicwidth = text("SecondaryTheme_closeIcon_basic_width", SecondaryTheme.closeIcon.basic.width)
        SecondaryThemecloseIconbasicright = text("SecondaryTheme_closeIcon_basic_right", SecondaryTheme.closeIcon.basic.right)
        SecondaryThemecloseIconbasictop = text("SecondaryTheme_closeIcon_basic_top", SecondaryTheme.closeIcon.basic.top)
        SecondaryThemecloseIconbasiccolor = color("SecondaryTheme_closeIcon_basic_color", SecondaryTheme.closeIcon.basic.color)
        SecondaryThemecloseIconbasicotherStyle = object("SecondaryTheme_closeIcon_basic屬性其他樣式", {})
        //PropsonClose = boolean("Props_onClose", false)

        exportCode = button("複製SecondaryTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <Tag
                      ${PropsonClose && `onClose={()=>{console.log("關閉標籤")}}`}
                      text={"${Propstext}"}
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${SecondaryThemecontainerbasicboxSizing}",
                          minWidth: "${SecondaryThemecontainerbasicminWidth}",
                          whiteSpace: "${SecondaryThemecontainerbasicwhiteSpace}",
                          textAlign: "${SecondaryThemecontainerbasictextAlign}",
                          display: "${SecondaryThemecontainerbasicdisplay}",
                          position: "${SecondaryThemecontainerbasicposition}",
                          color: "${SecondaryThemecontainerbasiccolor}",
                          fontSize: "${SecondaryThemecontainerbasicfontSize}",
                          fontWeight: "${SecondaryThemecontainerbasicfontWeight}",
                          lineHeight: "${SecondaryThemecontainerbasiclineHeight}",
                          outline: "${SecondaryThemecontainerbasicoutline}",
                          userSelect: "${SecondaryThemecontainerbasicuserSelect}",
                          backgroundColor: "${SecondaryThemecontainerbasicbackgroundColor}",
                          border: "${SecondaryThemecontainerbasicborder}",
                          borderRadius: "${SecondaryThemecontainerbasicborderRadius}",
                          margin: "${SecondaryThemecontainerbasicmargin}",
                          padding: \`0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem\`,
                          fontFamily: '${SecondaryThemecontainerbasicfontFamily}',
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
                        closeIcon:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          position: "${SecondaryThemecloseIconbasicposition}",
                          height: "${SecondaryThemecloseIconbasicheight}",
                          width: "${SecondaryThemecloseIconbasicwidth}",
                          right: "${SecondaryThemecloseIconbasicright}",
                          top: "${SecondaryThemecloseIconbasictop}",
                          color: "${SecondaryThemecloseIconbasiccolor}",
                          //#endregion
                          ${JSON.stringify(SecondaryThemecloseIconbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
        });
        return { container: { basic: { boxSizing: SecondaryThemecontainerbasicboxSizing, minWidth: SecondaryThemecontainerbasicminWidth, whiteSpace: SecondaryThemecontainerbasicwhiteSpace, textAlign: SecondaryThemecontainerbasictextAlign, display: SecondaryThemecontainerbasicdisplay, position: SecondaryThemecontainerbasicposition, color: SecondaryThemecontainerbasiccolor, fontSize: SecondaryThemecontainerbasicfontSize, fontWeight: SecondaryThemecontainerbasicfontWeight, lineHeight: SecondaryThemecontainerbasiclineHeight, outline: SecondaryThemecontainerbasicoutline, userSelect: SecondaryThemecontainerbasicuserSelect, backgroundColor: SecondaryThemecontainerbasicbackgroundColor, border: SecondaryThemecontainerbasicborder, borderRadius: SecondaryThemecontainerbasicborderRadius, margin: SecondaryThemecontainerbasicmargin, padding: `0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem`, fontFamily: SecondaryThemecontainerbasicfontFamily, ...SecondaryThemecontainerbasicotherStyle }, hover: { backgroundColor: SecondaryThemecontainerhoverbackgroundColor, ...SecondaryThemecontainerhoverotherStyle }, }, closeIcon: { basic: { position: SecondaryThemecloseIconbasicposition, height: SecondaryThemecloseIconbasicheight, width: SecondaryThemecloseIconbasicwidth, right: SecondaryThemecloseIconbasicright, top: SecondaryThemecloseIconbasictop, color: SecondaryThemecloseIconbasiccolor, ...SecondaryThemecloseIconbasicotherStyle }, }, };
      case "PrimaryTheme":
        PropsonClose = boolean("Props_onClose", false)
        Propstext = text("Props_text", "標籤文字")
        PrimaryThemecontainerbasicboxSizing = text("PrimaryTheme_container_basic_boxSizing", PrimaryTheme.container.basic(null, props).boxSizing)
        PrimaryThemecontainerbasicminWidth = text("PrimaryTheme_container_basic_minWidth", PrimaryTheme.container.basic(null, props).minWidth)
        PrimaryThemecontainerbasicwhiteSpace = text("PrimaryTheme_container_basic_whiteSpace", PrimaryTheme.container.basic(null, props).whiteSpace)
        PrimaryThemecontainerbasictextAlign = text("PrimaryTheme_container_basic_textAlign", PrimaryTheme.container.basic(null, props).textAlign)
        PrimaryThemecontainerbasicdisplay = text("PrimaryTheme_container_basic_display", PrimaryTheme.container.basic(null, props).display)
        PrimaryThemecontainerbasicposition = text("PrimaryTheme_container_basic_position", PrimaryTheme.container.basic(null, props).position)
        PrimaryThemecontainerbasiccolor = color("PrimaryTheme_container_basic_color", PrimaryTheme.container.basic(null, props).color)
        PrimaryThemecontainerbasicfontSize = text("PrimaryTheme_container_basic_fontSize", PrimaryTheme.container.basic(null, props).fontSize)
        PrimaryThemecontainerbasicfontWeight = text("PrimaryTheme_container_basic_fontWeight", PrimaryTheme.container.basic(null, props).fontWeight)
        PrimaryThemecontainerbasiclineHeight = text("PrimaryTheme_container_basic_lineHeight", PrimaryTheme.container.basic(null, props).lineHeight)
        PrimaryThemecontainerbasicoutline = text("PrimaryTheme_container_basic_outline", PrimaryTheme.container.basic(null, props).outline)
        PrimaryThemecontainerbasicuserSelect = text("PrimaryTheme_container_basic_userSelect", PrimaryTheme.container.basic(null, props).userSelect)
        PrimaryThemecontainerbasicbackgroundColor = color("PrimaryTheme_container_basic_backgroundColor", PrimaryTheme.container.basic(null, props).backgroundColor)
        PrimaryThemecontainerbasicborder = text("PrimaryTheme_container_basic_border", PrimaryTheme.container.basic(null, props).border)
        PrimaryThemecontainerbasicborderRadius = text("PrimaryTheme_container_basic_borderRadius", PrimaryTheme.container.basic(null, props).borderRadius)
        PrimaryThemecontainerbasicmargin = text("PrimaryTheme_container_basic_margin", PrimaryTheme.container.basic(null, props).margin)
        //PrimaryThemecontainerbasicpadding = text("PrimaryTheme_container_basic_padding", PrimaryTheme.container.basic(null, props).padding)
        PrimaryThemecontainerbasicfontFamily = text("PrimaryTheme_container_basic_fontFamily", PrimaryTheme.container.basic(null, props).fontFamily)
        PrimaryThemecontainerbasicotherStyle = object("PrimaryTheme_container_basic屬性其他樣式", {})
        PrimaryThemecontainerhoverbackgroundColor = color("PrimaryTheme_container_hover_backgroundColor", PrimaryTheme.container.hover.backgroundColor)
        PrimaryThemecontainerhoverotherStyle = object("PrimaryTheme_container_hover屬性其他樣式", {})
        PrimaryThemecloseIconbasicposition = text("PrimaryTheme_closeIcon_basic_position", PrimaryTheme.closeIcon.basic.position)
        PrimaryThemecloseIconbasicheight = text("PrimaryTheme_closeIcon_basic_height", PrimaryTheme.closeIcon.basic.height)
        PrimaryThemecloseIconbasicwidth = text("PrimaryTheme_closeIcon_basic_width", PrimaryTheme.closeIcon.basic.width)
        PrimaryThemecloseIconbasicright = text("PrimaryTheme_closeIcon_basic_right", PrimaryTheme.closeIcon.basic.right)
        PrimaryThemecloseIconbasictop = text("PrimaryTheme_closeIcon_basic_top", PrimaryTheme.closeIcon.basic.top)
        PrimaryThemecloseIconbasiccolor = color("PrimaryTheme_closeIcon_basic_color", PrimaryTheme.closeIcon.basic.color)
        PrimaryThemecloseIconbasicotherStyle = object("PrimaryTheme_closeIcon_basic屬性其他樣式", {})
        //PropsonClose = boolean("Props_onClose", false)

        exportCode = button("複製PrimaryTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <Tag
                      ${PropsonClose && `onClose={()=>{console.log("關閉標籤")}}`}
                      text={"${Propstext}"}
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${PrimaryThemecontainerbasicboxSizing}",
                          minWidth: "${PrimaryThemecontainerbasicminWidth}",
                          whiteSpace: "${PrimaryThemecontainerbasicwhiteSpace}",
                          textAlign: "${PrimaryThemecontainerbasictextAlign}",
                          display: "${PrimaryThemecontainerbasicdisplay}",
                          position: "${PrimaryThemecontainerbasicposition}",
                          color: "${PrimaryThemecontainerbasiccolor}",
                          fontSize: "${PrimaryThemecontainerbasicfontSize}",
                          fontWeight: "${PrimaryThemecontainerbasicfontWeight}",
                          lineHeight: "${PrimaryThemecontainerbasiclineHeight}",
                          outline: "${PrimaryThemecontainerbasicoutline}",
                          userSelect: "${PrimaryThemecontainerbasicuserSelect}",
                          backgroundColor: "${PrimaryThemecontainerbasicbackgroundColor}",
                          border: "${PrimaryThemecontainerbasicborder}",
                          borderRadius: "${PrimaryThemecontainerbasicborderRadius}",
                          margin: "${PrimaryThemecontainerbasicmargin}",
                          padding: \`0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem\`,
                          fontFamily: '${PrimaryThemecontainerbasicfontFamily}',
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
                        closeIcon:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          position: "${PrimaryThemecloseIconbasicposition}",
                          height: "${PrimaryThemecloseIconbasicheight}",
                          width: "${PrimaryThemecloseIconbasicwidth}",
                          right: "${PrimaryThemecloseIconbasicright}",
                          top: "${PrimaryThemecloseIconbasictop}",
                          color: "${PrimaryThemecloseIconbasiccolor}",
                          //#endregion
                          ${JSON.stringify(PrimaryThemecloseIconbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
        });
        return { container: { basic: { boxSizing: PrimaryThemecontainerbasicboxSizing, minWidth: PrimaryThemecontainerbasicminWidth, whiteSpace: PrimaryThemecontainerbasicwhiteSpace, textAlign: PrimaryThemecontainerbasictextAlign, display: PrimaryThemecontainerbasicdisplay, position: PrimaryThemecontainerbasicposition, color: PrimaryThemecontainerbasiccolor, fontSize: PrimaryThemecontainerbasicfontSize, fontWeight: PrimaryThemecontainerbasicfontWeight, lineHeight: PrimaryThemecontainerbasiclineHeight, outline: PrimaryThemecontainerbasicoutline, userSelect: PrimaryThemecontainerbasicuserSelect, backgroundColor: PrimaryThemecontainerbasicbackgroundColor, border: PrimaryThemecontainerbasicborder, borderRadius: PrimaryThemecontainerbasicborderRadius, margin: PrimaryThemecontainerbasicmargin, padding: `0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem`, fontFamily: PrimaryThemecontainerbasicfontFamily, ...PrimaryThemecontainerbasicotherStyle }, hover: { backgroundColor: PrimaryThemecontainerhoverbackgroundColor, ...PrimaryThemecontainerhoverotherStyle }, }, closeIcon: { basic: { position: PrimaryThemecloseIconbasicposition, height: PrimaryThemecloseIconbasicheight, width: PrimaryThemecloseIconbasicwidth, right: PrimaryThemecloseIconbasicright, top: PrimaryThemecloseIconbasictop, color: PrimaryThemecloseIconbasiccolor, ...PrimaryThemecloseIconbasicotherStyle }, }, };
      default:
        PropsonClose = boolean("Props_onClose", false)
        Propstext = text("Props_text", "標籤文字")
        DefaultThemecontainerbasicboxSizing = text("DefaultTheme_container_basic_boxSizing", DefaultTheme.container.basic(null, props).boxSizing)
        DefaultThemecontainerbasicminWidth = text("DefaultTheme_container_basic_minWidth", DefaultTheme.container.basic(null, props).minWidth)
        DefaultThemecontainerbasicwhiteSpace = text("DefaultTheme_container_basic_whiteSpace", DefaultTheme.container.basic(null, props).whiteSpace)
        DefaultThemecontainerbasictextAlign = text("DefaultTheme_container_basic_textAlign", DefaultTheme.container.basic(null, props).textAlign)
        DefaultThemecontainerbasicdisplay = text("DefaultTheme_container_basic_display", DefaultTheme.container.basic(null, props).display)
        DefaultThemecontainerbasicposition = text("DefaultTheme_container_basic_position", DefaultTheme.container.basic(null, props).position)
        DefaultThemecontainerbasiccolor = color("DefaultTheme_container_basic_color", DefaultTheme.container.basic(null, props).color)
        DefaultThemecontainerbasicfontSize = text("DefaultTheme_container_basic_fontSize", DefaultTheme.container.basic(null, props).fontSize)
        DefaultThemecontainerbasicfontWeight = text("DefaultTheme_container_basic_fontWeight", DefaultTheme.container.basic(null, props).fontWeight)
        DefaultThemecontainerbasiclineHeight = text("DefaultTheme_container_basic_lineHeight", DefaultTheme.container.basic(null, props).lineHeight)
        DefaultThemecontainerbasicoutline = text("DefaultTheme_container_basic_outline", DefaultTheme.container.basic(null, props).outline)
        DefaultThemecontainerbasicuserSelect = text("DefaultTheme_container_basic_userSelect", DefaultTheme.container.basic(null, props).userSelect)
        DefaultThemecontainerbasicbackgroundColor = color("DefaultTheme_container_basic_backgroundColor", DefaultTheme.container.basic(null, props).backgroundColor)
        DefaultThemecontainerbasicborder = text("DefaultTheme_container_basic_border", DefaultTheme.container.basic(null, props).border)
        DefaultThemecontainerbasicborderRadius = text("DefaultTheme_container_basic_borderRadius", DefaultTheme.container.basic(null, props).borderRadius)
        DefaultThemecontainerbasicmargin = text("DefaultTheme_container_basic_margin", DefaultTheme.container.basic(null, props).margin)
        //DefaultThemecontainerbasicpadding = text("DefaultTheme_container_basic_padding", DefaultTheme.container.basic(null, props).padding)
        DefaultThemecontainerbasicfontFamily = text("DefaultTheme_container_basic_fontFamily", DefaultTheme.container.basic(null, props).fontFamily)
        DefaultThemecontainerbasicotherStyle = object("DefaultTheme_container_basic屬性其他樣式", {})
        DefaultThemecontainerhoverbackgroundColor = color("DefaultTheme_container_hover_backgroundColor", DefaultTheme.container.hover.backgroundColor)
        DefaultThemecontainerhoverotherStyle = object("DefaultTheme_container_hover屬性其他樣式", {})
        DefaultThemecloseIconbasicposition = text("DefaultTheme_closeIcon_basic_position", DefaultTheme.closeIcon.basic.position)
        DefaultThemecloseIconbasicheight = text("DefaultTheme_closeIcon_basic_height", DefaultTheme.closeIcon.basic.height)
        DefaultThemecloseIconbasicwidth = text("DefaultTheme_closeIcon_basic_width", DefaultTheme.closeIcon.basic.width)
        DefaultThemecloseIconbasicright = text("DefaultTheme_closeIcon_basic_right", DefaultTheme.closeIcon.basic.right)
        DefaultThemecloseIconbasictop = text("DefaultTheme_closeIcon_basic_top", DefaultTheme.closeIcon.basic.top)
        DefaultThemecloseIconbasiccolor = color("DefaultTheme_closeIcon_basic_color", DefaultTheme.closeIcon.basic.color)
        DefaultThemecloseIconbasicotherStyle = object("DefaultTheme_closeIcon_basic屬性其他樣式", {})
        //PropsonClose = boolean("Props_onClose", false)

        exportCode = button("複製DefaultTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <Tag
                      ${PropsonClose && `onClose={()=>{console.log("關閉標籤")}}`}
                      text={"${Propstext}"}
                      baseDefaultTheme={"${themeselect}"}
                      theme={{                        
container:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${DefaultThemecontainerbasicboxSizing}",
                          minWidth: "${DefaultThemecontainerbasicminWidth}",
                          whiteSpace: "${DefaultThemecontainerbasicwhiteSpace}",
                          textAlign: "${DefaultThemecontainerbasictextAlign}",
                          display: "${DefaultThemecontainerbasicdisplay}",
                          position: "${DefaultThemecontainerbasicposition}",
                          color: "${DefaultThemecontainerbasiccolor}",
                          fontSize: "${DefaultThemecontainerbasicfontSize}",
                          fontWeight: "${DefaultThemecontainerbasicfontWeight}",
                          lineHeight: "${DefaultThemecontainerbasiclineHeight}",
                          outline: "${DefaultThemecontainerbasicoutline}",
                          userSelect: "${DefaultThemecontainerbasicuserSelect}",
                          backgroundColor: "${DefaultThemecontainerbasicbackgroundColor}",
                          border: "${DefaultThemecontainerbasicborder}",
                          borderRadius: "${DefaultThemecontainerbasicborderRadius}",
                          margin: "${DefaultThemecontainerbasicmargin}",
                          padding: \`0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem\`,
                          fontFamily: '${DefaultThemecontainerbasicfontFamily}',
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
closeIcon:{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          position: "${DefaultThemecloseIconbasicposition}",
                          height: "${DefaultThemecloseIconbasicheight}",
                          width: "${DefaultThemecloseIconbasicwidth}",
                          right: "${DefaultThemecloseIconbasicright}",
                          top: "${DefaultThemecloseIconbasictop}",
                          color: "${DefaultThemecloseIconbasiccolor}",
                          //#endregion
                          ${JSON.stringify(DefaultThemecloseIconbasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),                        },
                      }}/>
                      `)
        });
        return { container: { basic: { boxSizing: DefaultThemecontainerbasicboxSizing, minWidth: DefaultThemecontainerbasicminWidth, whiteSpace: DefaultThemecontainerbasicwhiteSpace, textAlign: DefaultThemecontainerbasictextAlign, display: DefaultThemecontainerbasicdisplay, position: DefaultThemecontainerbasicposition, color: DefaultThemecontainerbasiccolor, fontSize: DefaultThemecontainerbasicfontSize, fontWeight: DefaultThemecontainerbasicfontWeight, lineHeight: DefaultThemecontainerbasiclineHeight, outline: DefaultThemecontainerbasicoutline, userSelect: DefaultThemecontainerbasicuserSelect, backgroundColor: DefaultThemecontainerbasicbackgroundColor, border: DefaultThemecontainerbasicborder, borderRadius: DefaultThemecontainerbasicborderRadius, margin: DefaultThemecontainerbasicmargin, padding: `0.25rem ${PropsonClose ? "1.3125rem" : "0.5rem"} 0.25rem 0.5rem`, fontFamily: DefaultThemecontainerbasicfontFamily, ...DefaultThemecontainerbasicotherStyle }, hover: { backgroundColor: DefaultThemecontainerhoverbackgroundColor, ...DefaultThemecontainerhoverotherStyle }, }, closeIcon: { basic: { position: DefaultThemecloseIconbasicposition, height: DefaultThemecloseIconbasicheight, width: DefaultThemecloseIconbasicwidth, right: DefaultThemecloseIconbasicright, top: DefaultThemecloseIconbasictop, color: DefaultThemecloseIconbasiccolor, ...DefaultThemecloseIconbasicotherStyle }, }, };

    }
  }

  return <Tag
    theme={(switchDefaultTheme(themeselect))}
    baseDefaultTheme={themeselect}
    text={Propstext}
    onClose={PropsonClose ? () => { const onClickName = new Function('return ' + `()=>{console.log("關閉標籤")}`)(); onClickName(); } : false}
  />;
};

Tag_.story = {
  parameters: {
    notes: { "TagNote": TagNote },
  }
};
            //#endregion

