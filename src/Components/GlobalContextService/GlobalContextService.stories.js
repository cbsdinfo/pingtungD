//#region 引入 React
import React from 'react';
//#endregion
//#region 引入說明檔案
import GlobalContextServiceNote from './GlobalContextServiceNote.md'
//#endregion

//#region Menu 基本配置
export default {
    title: 'GlobalContextService',// 顯示於左方Menu，標題名稱
};
//#endregion

export const GlobalContextService_ = () => {
    return "可以達成跨組件通信並且不觸發重新渲染，詳見 Note";
}

GlobalContextService_.story = {
    parameters: {
        notes: { "GlobalContextServiceNote": GlobalContextServiceNote },
    }
};
//#endregion
