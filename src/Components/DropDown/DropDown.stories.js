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
import { NativeLineButton } from './NativeLineButton'
//#endregion
//#region 引入說明檔案
import NativeLineButtonNote from './NativeLineButtonNote.md'
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

//#region NativeLineButton 組件
export const NativeLineButton_ = (props) => {

  const themeselect = select(
    "選擇預設樣式",
    {
      DefaultTheme: 'DefaultTheme',
      PrimaryTheme: 'PrimaryTheme',
      SecondaryTheme: 'SecondaryTheme',
    },
    "DefaultTheme"
  );

  let [DefaultThemebasicbackgroundColor, DefaultThemebasicborder, DefaultThemebasicborderRadius, DefaultThemebasiccolor, DefaultThemebasicfontSize, DefaultThemebasicpadding, DefaultThemebasicfontWeight, DefaultThemebasicoutline, DefaultThemebasiccursor, DefaultThemebasicuserSelect, DefaultThemebasicotherStyle, DefaultThemehoverbackgroundColor, DefaultThemehoverotherStyle, DefaultThemefocusboxShadow, DefaultThemefocusotherStyle, PrimaryThemebasicbackgroundColor, PrimaryThemebasicborder, PrimaryThemebasicborderRadius, PrimaryThemebasiccolor, PrimaryThemebasicfontSize, PrimaryThemebasicpadding, PrimaryThemebasicfontWeight, PrimaryThemebasicoutline, PrimaryThemebasiccursor, PrimaryThemebasicuserSelect, PrimaryThemebasicotherStyle, PrimaryThemehoverbackgroundColor, PrimaryThemehoverotherStyle, PrimaryThemefocusboxShadow, PrimaryThemefocusotherStyle, SecondaryThemebasicbackgroundColor, SecondaryThemebasicborder, SecondaryThemebasicborderRadius, SecondaryThemebasiccolor, SecondaryThemebasicfontSize, SecondaryThemebasicpadding, SecondaryThemebasicfontWeight, SecondaryThemebasicoutline, SecondaryThemebasiccursor, SecondaryThemebasicuserSelect, SecondaryThemebasicotherStyle, SecondaryThemehoverbackgroundColor, SecondaryThemehoverotherStyle, SecondaryThemefocusboxShadow, SecondaryThemefocusotherStyle, exportCode] = [];
  const switchDefaultTheme = (themeName) => {
    switch (themeName) {
      case "SecondaryTheme":
        SecondaryThemebasicbackgroundColor = color("SecondaryTheme_basic_backgroundColor", SecondaryTheme.basic.backgroundColor)
        SecondaryThemebasicborder = text("SecondaryTheme_basic_border", SecondaryTheme.basic.border)
        SecondaryThemebasicborderRadius = text("SecondaryTheme_basic_borderRadius", SecondaryTheme.basic.borderRadius)
        SecondaryThemebasiccolor = color("SecondaryTheme_basic_color", SecondaryTheme.basic.color)
        SecondaryThemebasicfontSize = text("SecondaryTheme_basic_fontSize", SecondaryTheme.basic.fontSize)
        SecondaryThemebasicpadding = text("SecondaryTheme_basic_padding", SecondaryTheme.basic.padding)
        SecondaryThemebasicfontWeight = text("SecondaryTheme_basic_fontWeight", SecondaryTheme.basic.fontWeight)
        SecondaryThemebasicoutline = text("SecondaryTheme_basic_outline", SecondaryTheme.basic.outline)
        SecondaryThemebasiccursor = text("SecondaryTheme_basic_cursor", SecondaryTheme.basic.cursor)
        SecondaryThemebasicuserSelect = text("SecondaryTheme_basic_userSelect", SecondaryTheme.basic.userSelect)
        SecondaryThemebasicotherStyle = object("SecondaryTheme_basic屬性其他樣式", {})
        SecondaryThemehoverbackgroundColor = color("SecondaryTheme_hover_backgroundColor", SecondaryTheme.hover.backgroundColor)
        SecondaryThemehoverotherStyle = object("SecondaryTheme_hover屬性其他樣式", {})
        SecondaryThemefocusboxShadow = text("SecondaryTheme_focus_boxShadow", SecondaryTheme.focus.boxShadow)
        SecondaryThemefocusotherStyle = object("SecondaryTheme_focus屬性其他樣式", {})
        exportCode = button("複製SecondaryTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <NativeLineButton
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${SecondaryThemebasicbackgroundColor}",
                          border: "${SecondaryThemebasicborder}",
                          borderRadius: "${SecondaryThemebasicborderRadius}",
                          color: "${SecondaryThemebasiccolor}",
                          fontSize: "${SecondaryThemebasicfontSize}",
                          padding: "${SecondaryThemebasicpadding}",
                          fontWeight: "${SecondaryThemebasicfontWeight}",
                          outline: "${SecondaryThemebasicoutline}",
                          cursor: "${SecondaryThemebasiccursor}",
                          userSelect: "${SecondaryThemebasicuserSelect}",
                          //#endregion
                          ${JSON.stringify(SecondaryThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${SecondaryThemehoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(SecondaryThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        focus: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxShadow: "${SecondaryThemefocusboxShadow}",
                          //#endregion
                          ${JSON.stringify(SecondaryThemefocusotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
        });
        return { basic: { backgroundColor: SecondaryThemebasicbackgroundColor, border: SecondaryThemebasicborder, borderRadius: SecondaryThemebasicborderRadius, color: SecondaryThemebasiccolor, fontSize: SecondaryThemebasicfontSize, padding: SecondaryThemebasicpadding, fontWeight: SecondaryThemebasicfontWeight, outline: SecondaryThemebasicoutline, cursor: SecondaryThemebasiccursor, userSelect: SecondaryThemebasicuserSelect, ...SecondaryThemebasicotherStyle }, hover: { backgroundColor: SecondaryThemehoverbackgroundColor, ...SecondaryThemehoverotherStyle }, focus: { boxShadow: SecondaryThemefocusboxShadow, ...SecondaryThemefocusotherStyle }, };
      case "PrimaryTheme":
        PrimaryThemebasicbackgroundColor = color("PrimaryTheme_basic_backgroundColor", PrimaryTheme.basic.backgroundColor)
        PrimaryThemebasicborder = text("PrimaryTheme_basic_border", PrimaryTheme.basic.border)
        PrimaryThemebasicborderRadius = text("PrimaryTheme_basic_borderRadius", PrimaryTheme.basic.borderRadius)
        PrimaryThemebasiccolor = color("PrimaryTheme_basic_color", PrimaryTheme.basic.color)
        PrimaryThemebasicfontSize = text("PrimaryTheme_basic_fontSize", PrimaryTheme.basic.fontSize)
        PrimaryThemebasicpadding = text("PrimaryTheme_basic_padding", PrimaryTheme.basic.padding)
        PrimaryThemebasicfontWeight = text("PrimaryTheme_basic_fontWeight", PrimaryTheme.basic.fontWeight)
        PrimaryThemebasicoutline = text("PrimaryTheme_basic_outline", PrimaryTheme.basic.outline)
        PrimaryThemebasiccursor = text("PrimaryTheme_basic_cursor", PrimaryTheme.basic.cursor)
        PrimaryThemebasicuserSelect = text("PrimaryTheme_basic_userSelect", PrimaryTheme.basic.userSelect)
        PrimaryThemebasicotherStyle = object("PrimaryTheme_basic屬性其他樣式", {})
        PrimaryThemehoverbackgroundColor = color("PrimaryTheme_hover_backgroundColor", PrimaryTheme.hover.backgroundColor)
        PrimaryThemehoverotherStyle = object("PrimaryTheme_hover屬性其他樣式", {})
        PrimaryThemefocusboxShadow = text("PrimaryTheme_focus_boxShadow", PrimaryTheme.focus.boxShadow)
        PrimaryThemefocusotherStyle = object("PrimaryTheme_focus屬性其他樣式", {})
        exportCode = button("複製PrimaryTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <NativeLineButton
                      baseDefaultTheme={"${themeselect}"}
                      theme={{
                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${PrimaryThemebasicbackgroundColor}",
                          border: "${PrimaryThemebasicborder}",
                          borderRadius: "${PrimaryThemebasicborderRadius}",
                          color: "${PrimaryThemebasiccolor}",
                          fontSize: "${PrimaryThemebasicfontSize}",
                          padding: "${PrimaryThemebasicpadding}",
                          fontWeight: "${PrimaryThemebasicfontWeight}",
                          outline: "${PrimaryThemebasicoutline}",
                          cursor: "${PrimaryThemebasiccursor}",
                          userSelect: "${PrimaryThemebasicuserSelect}",
                          //#endregion
                          ${JSON.stringify(PrimaryThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${PrimaryThemehoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(PrimaryThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        focus: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxShadow: "${PrimaryThemefocusboxShadow}",
                          //#endregion
                          ${JSON.stringify(PrimaryThemefocusotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
        });
        return { basic: { backgroundColor: PrimaryThemebasicbackgroundColor, border: PrimaryThemebasicborder, borderRadius: PrimaryThemebasicborderRadius, color: PrimaryThemebasiccolor, fontSize: PrimaryThemebasicfontSize, padding: PrimaryThemebasicpadding, fontWeight: PrimaryThemebasicfontWeight, outline: PrimaryThemebasicoutline, cursor: PrimaryThemebasiccursor, userSelect: PrimaryThemebasicuserSelect, ...PrimaryThemebasicotherStyle }, hover: { backgroundColor: PrimaryThemehoverbackgroundColor, ...PrimaryThemehoverotherStyle }, focus: { boxShadow: PrimaryThemefocusboxShadow, ...PrimaryThemefocusotherStyle }, };
      default:
        DefaultThemebasicbackgroundColor = color("DefaultTheme_basic_backgroundColor", DefaultTheme.basic.backgroundColor)
        DefaultThemebasicborder = text("DefaultTheme_basic_border", DefaultTheme.basic.border)
        DefaultThemebasicborderRadius = text("DefaultTheme_basic_borderRadius", DefaultTheme.basic.borderRadius)
        DefaultThemebasiccolor = color("DefaultTheme_basic_color", DefaultTheme.basic.color)
        DefaultThemebasicfontSize = text("DefaultTheme_basic_fontSize", DefaultTheme.basic.fontSize)
        DefaultThemebasicpadding = text("DefaultTheme_basic_padding", DefaultTheme.basic.padding)
        DefaultThemebasicfontWeight = text("DefaultTheme_basic_fontWeight", DefaultTheme.basic.fontWeight)
        DefaultThemebasicoutline = text("DefaultTheme_basic_outline", DefaultTheme.basic.outline)
        DefaultThemebasiccursor = text("DefaultTheme_basic_cursor", DefaultTheme.basic.cursor)
        DefaultThemebasicuserSelect = text("DefaultTheme_basic_userSelect", DefaultTheme.basic.userSelect)
        DefaultThemebasicotherStyle = object("DefaultTheme_basic屬性其他樣式", {})
        DefaultThemehoverbackgroundColor = color("DefaultTheme_hover_backgroundColor", DefaultTheme.hover.backgroundColor)
        DefaultThemehoverotherStyle = object("DefaultTheme_hover屬性其他樣式", {})
        DefaultThemefocusboxShadow = text("DefaultTheme_focus_boxShadow", DefaultTheme.focus.boxShadow)
        DefaultThemefocusotherStyle = object("DefaultTheme_focus屬性其他樣式", {})
        exportCode = button("複製DefaultTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <NativeLineButton
                      baseDefaultTheme={"${themeselect}"}
                      theme={{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${DefaultThemebasicbackgroundColor}",
                          border: "${DefaultThemebasicborder}",
                          borderRadius: "${DefaultThemebasicborderRadius}",
                          color: "${DefaultThemebasiccolor}",
                          fontSize: "${DefaultThemebasicfontSize}",
                          padding: "${DefaultThemebasicpadding}",
                          fontWeight: "${DefaultThemebasicfontWeight}",
                          outline: "${DefaultThemebasicoutline}",
                          cursor: "${DefaultThemebasiccursor}",
                          userSelect: "${DefaultThemebasicuserSelect}",
                          //#endregion
                          ${JSON.stringify(DefaultThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          backgroundColor: "${DefaultThemehoverbackgroundColor}",
                          //#endregion
                          ${JSON.stringify(DefaultThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        focus: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxShadow: "${DefaultThemefocusboxShadow}",
                          //#endregion
                          ${JSON.stringify(DefaultThemefocusotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
        });
        return { basic: { backgroundColor: DefaultThemebasicbackgroundColor, border: DefaultThemebasicborder, borderRadius: DefaultThemebasicborderRadius, color: DefaultThemebasiccolor, fontSize: DefaultThemebasicfontSize, padding: DefaultThemebasicpadding, fontWeight: DefaultThemebasicfontWeight, outline: DefaultThemebasicoutline, cursor: DefaultThemebasiccursor, userSelect: DefaultThemebasicuserSelect, ...DefaultThemebasicotherStyle }, hover: { backgroundColor: DefaultThemehoverbackgroundColor, ...DefaultThemehoverotherStyle }, focus: { boxShadow: DefaultThemefocusboxShadow, ...DefaultThemefocusotherStyle }, };

    }
  }

  return <NativeLineButton
    theme={(switchDefaultTheme(themeselect))}
    baseDefaultTheme={themeselect} >按鈕</NativeLineButton>;
};

NativeLineButton_.story = {
  parameters: {
    notes: { "NativeLineButtonNote": NativeLineButtonNote },
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