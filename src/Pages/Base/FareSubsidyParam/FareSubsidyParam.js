import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useAsync } from '../../../SelfHooks/useAsync';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { getParseItemLocalStorage, clearLocalStorage, clearSession } from '../../../Handlers';
import { isUndefined } from 'lodash';
import { useHistory } from 'react-router-dom';

export const FareSubsidyParam = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    // const [OrgsTree, setOrgsTree] = useState([]); // 組織樹狀圖
    // const [SubOrgs, setSubOrgs] = useState([]); // 透過 orgid 取得 組織的全部下級機構 API

    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "editModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("OrgManagerPage", "UnitName");
                globalContextService.remove("OrgManagerPage", "Uid");
                globalContextService.remove("OrgManagerPage", "FirstContact");
                globalContextService.remove("OrgManagerPage", "FirstContactTelephone");
                globalContextService.remove("OrgManagerPage", "FirstContacCellhone");
                globalContextService.remove("OrgManagerPage", "Status");
                globalContextService.remove("OrgManagerPage", "UpperOrg");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "addModalClose":
                //#region 當 編輯 Modal 關閉時，要清除的資料
                globalContextService.remove("OrgManagerPage", "UnitName");
                globalContextService.remove("OrgManagerPage", "Uid");
                globalContextService.remove("OrgManagerPage", "FirstContact");
                globalContextService.remove("OrgManagerPage", "FirstContactTelephone");
                globalContextService.remove("OrgManagerPage", "FirstContacCellhone");
                globalContextService.remove("OrgManagerPage", "Status");
                globalContextService.remove("OrgManagerPage", "UpperOrg");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "AssignModalClose":
                //#region 當 分配用戶 Modal 關閉時，要清除的資料
                globalContextService.remove("OrgManagerPage", "AssignKeyword");
                globalContextService.remove("OrgManagerPage", "AssignCheckedRowKeys");
                globalContextService.remove("OrgManagerPage", "AssignCheckedRowsData");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                // globalContextService.remove("OrgManagerPage", "IdOfAllUsersLoadByOrg"); 
                // globalContextService.remove("OrgManagerPage", "CloseAssignModalState"); 
                // console.log(globalContextService.get("OrgManagerPage"))
                //#endregion
                break;
            case "Refresh":
                //#region 當 按下刷新按紐時，要清除的資料
                globalContextService.remove("OrgManagerPage", "Keyword");
                if (payload === "API") {
                    globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                    globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                }
                //#endregion
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("OrgManagerPage", "firstUseAPIgetOrgs");
            globalContextService.remove("OrgManagerPage", "firstUseAPIgetSubOrgs");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    controllGCS={controllGCS}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}