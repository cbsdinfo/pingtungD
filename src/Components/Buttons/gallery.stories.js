//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color } from "@storybook/addon-knobs";
import { BasicButton } from './BasicButton/BasicButton';
import { LineButton } from './LineButton/LineButton'
import { NativeLineButton } from './NativeLineButton/NativeLineButton'
import { NativeBasicButton } from './NativeBasicButton/NativeBasicButton'
import { CopyBlock } from "react-code-blocks";
import HomeIcon from '@material-ui/icons/Home';
//#endregion
//#region 引入 Theme檔
// import DefaultTheme from './Theme/DefaultTheme';
// import PrimaryTheme from './Theme/PrimaryTheme';
// import SecondaryTheme from './Theme/SecondaryTheme';
//#endregion
//#region 引入組件
// import { BasicButton } from './BasicButton'
//#endregion
//#region 引入說明檔案
// import BasicButtonNote from './BasicButtonNote.md'
//#endregion
//#region 引入匯出樣式處理函數
// import { codeExportAndCopy } from '../../../Handlers/ThemeHandler';
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
export const 展示廊_ = (props) => {


    return (
        <>
            
            <BasicButton
                baseDefaultTheme={"BasicButtonDefaultTheme"}
                theme={{ container: { basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) } }}
                icon={<HomeIcon style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "relative",
                    right: "0.2rem",
                    top: "0.3rem",
                }} />} ></BasicButton>
            <BasicButton baseDefaultTheme={"BasicButtonPrimaryTheme"} text={"請按"} theme={{ container: { basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) } }} icon={""} ></BasicButton>
            <BasicButton baseDefaultTheme={"BasicButtonSecondaryTheme"} theme={{ container: { basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) } }} icon={""} ></BasicButton>
            <BasicButton baseDefaultTheme={"BasicButtonDefaultTheme"} theme={{}} icon={""} disable></BasicButton>
            <br />
            <CopyBlock
                language={"jsx"}
                text={`<BasicButton
baseDefaultTheme={"BasicButtonDefaultTheme"}
theme={{}}
icon={<HomeIcon style={{
    width: "1.5rem",
    height: "1.5rem",
    position: "relative",
    right: "0.2rem",
    top: "0.3rem",
}} />} ></BasicButton>
<BasicButton baseDefaultTheme={"BasicButtonPrimaryTheme"} text={"請按"} theme={{}} icon={""} ></BasicButton>
<BasicButton baseDefaultTheme={"BasicButtonSecondaryTheme"} theme={{}} icon={""} ></BasicButton>
<BasicButton baseDefaultTheme={"BasicButtonDefaultTheme"} theme={{}} icon={""} disable></BasicButton>`}
                showLineNumbers={true}
                theme={"Atom One Light"}
                wrapLines={true}
                codeBlock
            ></CopyBlock>

            <LineButton baseDefaultTheme={"LineButtonDefaultTheme"} theme={{ container: { basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) } }} icon={<HomeIcon style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "relative",
                right: "0.2rem",
                top: "0.3rem",
            }} />} ></LineButton>
            <LineButton baseDefaultTheme={"LineButtonPrimaryTheme"} text={"請按"} theme={{ container: { basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) } }} icon={""} ></LineButton>
            <LineButton baseDefaultTheme={"LineButtonSecondaryTheme"} theme={{ container: { basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) } }} icon={""} ></LineButton>
            <LineButton baseDefaultTheme={"LineButtonDefaultTheme"} theme={{}} icon={""} disable></LineButton>
            <br />
            <CopyBlock
                language={"jsx"}
                text={`<LineButton baseDefaultTheme={"LineButtonDefaultTheme"} theme={{ }} icon={<HomeIcon style={{
    width: "1.5rem",
    height: "1.5rem",
    position: "relative",
    right: "0.2rem",
    top: "0.3rem",
}} />} ></LineButton>
<LineButton baseDefaultTheme={"LineButtonPrimaryTheme"} text={"請按"} theme={{}} icon={""} ></LineButton>
<LineButton baseDefaultTheme={"LineButtonSecondaryTheme"} theme={{}} icon={""} ></LineButton>
<LineButton baseDefaultTheme={"LineButtonDefaultTheme"} theme={{}} icon={""} disable></LineButton>`}
                showLineNumbers={true}
                theme={"Atom One Light"}
                wrapLines={true}
                codeBlock
            ></CopyBlock>

            <NativeBasicButton baseDefaultTheme={"DefaultTheme"} theme={{ basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) }} >按鈕</NativeBasicButton>
            <NativeBasicButton baseDefaultTheme={"PrimaryTheme"} theme={{ basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) }} >按鈕</NativeBasicButton>
            <NativeBasicButton baseDefaultTheme={"SecondaryTheme"} theme={{ basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) }} >按鈕</NativeBasicButton>
            <NativeBasicButton baseDefaultTheme={"DefaultTheme"} theme={{}} disable>按鈕</NativeBasicButton>
            <br />
            <CopyBlock
                language={"jsx"}
                text={`<NativeBasicButton baseDefaultTheme={"DefaultTheme"} theme={{}} >按鈕</NativeBasicButton>
<NativeBasicButton baseDefaultTheme={"PrimaryTheme"} theme={{}} >按鈕</NativeBasicButton>
<NativeBasicButton baseDefaultTheme={"SecondaryTheme"} theme={{}} >按鈕</NativeBasicButton>
<NativeBasicButton baseDefaultTheme={"DefaultTheme"} theme={{}} disable>按鈕</NativeBasicButton>`}
                showLineNumbers={true}
                theme={"Atom One Light"}
                wrapLines={true}
                codeBlock
            ></CopyBlock>

            <NativeLineButton baseDefaultTheme={"DefaultTheme"} theme={{ basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) }} >按鈕</NativeLineButton>
            <NativeLineButton baseDefaultTheme={"PrimaryTheme"} theme={{ basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) }} >按鈕</NativeLineButton>
            <NativeLineButton baseDefaultTheme={"SecondaryTheme"} theme={{ basic: (style) => ({ ...style, margin: "0 1rem 1rem 0" }) }} >按鈕</NativeLineButton>
            <NativeLineButton baseDefaultTheme={"DefaultTheme"} theme={{}} disable>按鈕</NativeLineButton>
            <br />
            <CopyBlock
                language={"jsx"}
                text={`<NativeLineButton baseDefaultTheme={"DefaultTheme"} theme={{}} >按鈕</NativeLineButton>
<NativeLineButton baseDefaultTheme={"PrimaryTheme"} theme={{}} >按鈕</NativeLineButton>
<NativeLineButton baseDefaultTheme={"SecondaryTheme"} theme={{}} >按鈕</NativeLineButton>
<NativeLineButton baseDefaultTheme={"DefaultTheme"} theme={{}} disable>按鈕</NativeLineButton>`}
                showLineNumbers={true}
                theme={"Atom One Light"}
                wrapLines={true}
                codeBlock
            ></CopyBlock>

        </>
    );
};

展示廊_.story = {
    parameters: {
        //notes: { "BasicButtonNote": BasicButtonNote },
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