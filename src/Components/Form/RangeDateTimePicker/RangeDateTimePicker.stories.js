//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import DefaultTheme from './Theme/DefaultTheme';
import DisableTheme from './Theme/DisableTheme';
//#endregion
//#region 引入組件
import { RangeDateTimePicker } from './RangeDateTimePicker'
//#endregion
//#region 引入說明檔案
import RangeDateTimePickerNote from './RangeDateTimePickerNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../../Handlers/ThemeHandler';
//#endregion

//#region Menu 基本配置
export default {
    title: 'Form',// 顯示於左方Menu，標題名稱
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
export const RangeDateTimePicker_ = (props) => {

    return "RangeDateTimePicker 尚未提供實時展示功能，請直接閱讀 Note";
};

RangeDateTimePicker_.story = {
    parameters: {
        notes: { "RangeDateTimePicker": RangeDateTimePickerNote },
    }
};
//#endregion
