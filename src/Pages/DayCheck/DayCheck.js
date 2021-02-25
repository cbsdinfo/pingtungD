import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
// import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';

export const DayCheck = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [CarCheckDetail, setCarCheckDetail] = useState(false); // 車輛檢查
    const [BodyCheckDetail, setBodyCheckDetail] = useState(false); // 身心檢查
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    //#region 路由監聽，清除API紀錄 (渲染即觸發的每一個API都要有)
    useEffect(() => {
        const historyUnlisten = history.listen((location, action) => {
            //console.log(location, action)
            globalContextService.remove("NewsPage", "firstUseAPIgetNewsType");
        });

        return () => {
            historyUnlisten();
        }
    }, [])
    //#endregion

    return (
        <>
            {/* {
                768 <= Width &&
                <LaptopL
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    NewsType={NewsType} // 所有最新消息類別
                    AllNews={AllNews} // 類別下所有最新消息
                    CheckDetail={CheckDetail} // 詳細資料
                    setCheckDetail={setCheckDetail} // 設定詳細資料
                    GetNewsTypeExecute={GetNewsTypeExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            } */}
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                // Width < 768 &&
                <MobileM
                    CarCheckDetail={CarCheckDetail} // 車輛檢查
                    setCarCheckDetail={setCarCheckDetail} // 車輛檢查
                    BodyCheckDetail={BodyCheckDetail} // 身心檢查
                    setBodyCheckDetail={setBodyCheckDetail} // 身心檢查
                />
            }
        </>
    )
}