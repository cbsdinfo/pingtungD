import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { useHistory, useLocation } from 'react-router-dom';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../../Handlers';
import { useAsync } from '../../../SelfHooks/useAsync';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';

export const SystemNewsComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);

    const [Width, Height] = useWindowSize();
    let history = useHistory();
    let urlParams = new URLSearchParams(useLocation().search);//取得參數
    // let userId = urlParams.get("userId"); //會是最新的值

    // console.log(props.type)

    return (
        <>
            {
                768 <= Width &&
                <LaptopL
                    AllNews={props.AllNews} // 類別下所有最新消息
                    NowTab={props.NowTab} // 目前使用的頁籤資訊
                    GetNewsTypeExecute={props.GetNewsTypeExecute} // 選單更新值調用，取得特定類別所有最新消
                    CheckDetail={props.CheckDetail} // 詳細資料
                    setCheckDetail={props.setCheckDetail} // 設定詳細資料
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    UserId={urlParams.get("userId")}
                    CaseUserId={urlParams.get("caseUserId")}
                    UserName={urlParams.get("caseName")}
                    data={data}
                    controllGCS={controllGCS}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    AllNews={props.AllNews} // 類別下所有最新消息
                    NowTab={props.NowTab} // 目前使用的頁籤資訊
                    CheckDetail={props.CheckDetail} // 詳細資料
                    setCheckDetail={props.setCheckDetail} // 設定詳細資料
                />
            }
        </>
    )
}