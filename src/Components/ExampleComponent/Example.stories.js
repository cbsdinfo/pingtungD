//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import DefaultTheme from './Theme/DefaultTheme';
import Default1Theme from './Theme/Default1Theme';
//#endregion
//#region 引入組件
import { Example } from './Example'
//#endregion
//#region 引入說明檔案
import ExampleNote from './ExampleNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../Handlers/ThemeHandler';
//#endregion

//#region Menu 基本配置
export default {
    title: 'Example',// 顯示於左方Menu，標題名稱
    decorators: [withKnobs],// withKnobs 配置Knobs
    excludeStories: /.*Data$/,
    parameters: {
        knobs: {
            escapeHTML: false,
        },
    },
};
//#endregion

//#region 組件基本配置，實際使用的並非此組件
export const Example_ = (props) => {

    const themeselect = select(
        "選擇預設樣式",
        {
            DefaultTheme: 'DefaultTheme',
            Default1Theme: 'Default1Theme',
        },
        "DefaultTheme"
    );

    let [a, aStyleColor, aOnClick, b, bStyleColor, exportCode] = [];
    const switchDefaultTheme = (themeName) => {
        switch (themeName) {
            case "Default1Theme":
                //console.log("switchDefaultTheme", themeName);
                aStyleColor = color("Default1Theme_a_字體顏色", Default1Theme.a.color);
                a = object("Default1Theme_a_屬性其他樣式 (style)=>{ ...style}", {});
                aOnClick = text("Default1Theme_a_點擊事件", `()=>{console.log("點了一下")}`)
                bStyleColor = color("Default1Theme_b_字體顏色", Default1Theme.b.color);
                b = object("Default1Theme_b_屬性其他樣式 (style)=>{ ...style}", {});
                exportCode = button("Default1Theme_產生Theme程式碼", () => {
                    codeExportAndCopy(`
                    <Example
                    baseDefaultTheme={"${themeselect}"}
                    onClick={${aOnClick}}
                    theme={{
                        a: (style) => ({
                            ...style,
                            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                            color: "${aStyleColor}",
                            //#endregion
                            ${JSON.stringify(a).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        b: (style) => ({
                            ...style,
                            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                            color: "${bStyleColor}",
                            //#endregion
                            ${JSON.stringify(b).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        })
                    }}/>
                    `)
                });
                return { a: { color: aStyleColor, ...a }, b: { color: bStyleColor, ...b } };

            default:
                //console.log("switchDefaultTheme", themeName);
                aStyleColor = color("DefaultTheme_a_字體顏色", DefaultTheme.a.color);
                a = object("DefaultTheme_a_屬性其他樣式 (style)=>{ ...style}", {});
                aOnClick = text("DefaultTheme_a_點擊事件", `()=>{console.log("點了一下")}`)
                bStyleColor = color("DefaultTheme_b_字體顏色", DefaultTheme.b.color);
                b = object("DefaultTheme_b_屬性其他樣式 (style)=>{ ...style}", {});
                exportCode = button("DefaultTheme_產生Theme程式碼", () => {
                    codeExportAndCopy(`
                    <Example
                    baseDefaultTheme={"${themeselect}"}
                    onClick={${aOnClick}}
                    theme={{
                        a: (style) => ({
                            ...style,
                            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                            color: "${aStyleColor}",
                            //#endregion
                            ${JSON.stringify(a).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        b: (style) => ({
                            ...style,
                            //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                            color: "${bStyleColor}",
                            //#endregion
                            ${JSON.stringify(b).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        })
                    }}/>
                    `)
                });
                return { a: { color: aStyleColor, ...a }, b: { color: bStyleColor, ...b } };
        }
    }

    return <Example
        onClick={() => { const onClickName = new Function('return ' + aOnClick)(); onClickName(); }}
        theme={(switchDefaultTheme(themeselect))}
        baseDefaultTheme={themeselect} />;
};

Example_.story = {
    parameters: {
        notes: { "sad": ExampleNote },
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