import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { clearLogoutLocalStorage, clearLogoutSession, getParseItemLocalStorage } from '../../../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';

export const BusStopAdd = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    const [Width, Height] = useWindowSize();
    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        switch (type) {
            case "return":
                //#region 當點擊 回列表 按鈕時，要清除的資料
                globalContextService.remove("BusStopAddPage", "CStopName");
                globalContextService.remove("BusStopAddPage", "EStopName");
                globalContextService.remove("BusStopAddPage", "StopLongitude");
                globalContextService.remove("BusStopAddPage", "StopLatitude");
                break;
            case "Save":
                //#region 當點擊 儲存 按鈕時，要清除的資料
                globalContextService.remove("BusStopAddPage", "CStopName");
                globalContextService.remove("BusStopAddPage", "EStopName");
                globalContextService.remove("BusStopAddPage", "StopLongitude");
                globalContextService.remove("BusStopAddPage", "StopLatitude");
                break;
            //#endregion
            default:
                break;
        }
    }
    //#endregion

    //#region 新增巴士站牌 API 
    const addBusStation = useCallback(async (addOrUpdateRowdata) => {

        // console.log(updateRowdata)
        //#region 新增巴士站牌 API 
        fetch(`${APIUrl}busStationss/add`,
            {
                headers: {
                    "X-Token": getParseItemLocalStorage("DAuth"),
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...addOrUpdateRowdata })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功新增新增巴士站牌 API 
                    controllGCS("Save", "API");
                    history.push("/BusRouteAndStop/BusStop");
                }
                else {
                    throw PreResult;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error.code === 401 ? "請重新登入。" : Error.message,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: false,
                    yesOnClick: (e, close) => {
                        if (Error.code === 401) {
                            clearLogoutSession();
                            clearLogoutLocalStorage();
                            globalContextService.clear();
                            Switch();
                        }
                        close();
                    }
                })
                throw Error.message;
            })
            .finally(() => {
            });
        //#endregion
    }, [APIUrl, Switch])

    const [AddBusStationExecute, AddBusStationPending] = useAsync(addBusStation, false);
    //#endregion 

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    AddBusStationExecute={AddBusStationExecute}
                    AddBusStationPending={AddBusStationPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    AddBusStationExecute={AddBusStationExecute}
                    AddBusStationPending={AddBusStationPending}
                    controllGCS={controllGCS}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    AddBusStationExecute={AddBusStationExecute}
                    AddBusStationPending={AddBusStationPending}
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