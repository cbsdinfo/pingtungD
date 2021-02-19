import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput, modalsService } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { clearLocalStorage, clearSession, getParseItemLocalStorage, valid } from '../../Handlers';
import { useHistory } from 'react-router-dom';
import { useAsync } from '../../SelfHooks/useAsync';
import { isUndefined } from 'lodash';
import { fmt } from '../../Handlers/DateHandler';
import moment from 'moment';

export const School = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [NowTab, setNowTab] = useState("系統公告"); // 目前公告頁面
    const [NewsType, setNewsType] = useState([]); //所有最新消息類別
    const [AllNews, setAllNews] = useState([]); // 類別下所有最新消息
    const [CheckDetail, setCheckDetail] = useState({}); // 詳細資料
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

    //#region 取得所有最新消息類別 選項 API
    const getNewsType = useCallback(async (useAPI = false, newsCategoryId = "", releaseDate = fmt(moment(), "YYYY-MM")) => {

        let defaultLoad;
        //#region 規避左側欄收合影響組件重新渲染 (渲染即觸發的每一個API都要有，useAPI (預設) = 0、globalContextService.set 第二個參數要隨API改變)
        if (isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType")) || useAPI) {
            //#endregion

            if (!useAPI) {
                // 代表初次調用
                //#region 取得所有最新消息類別 API
                await fetch(`${APIUrl}categorys/load?page=1&limit=99999&TypeId=SYS_NEWS`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE
                    {
                        headers: {
                            "X-Token": getParseItemLocalStorage("Auth"),
                            "content-type": "application/json; charset=utf-8",
                        },
                        method: "GET"
                    })
                    .then(Result => {
                        const ResultJson = Result.clone().json();//Respone.clone()
                        return ResultJson;
                    })
                    .then((PreResult) => {

                        if (PreResult.code === 200) {
                            // 成功取得司機 證照 API
                            // console.log(PreResult)
                            // console.log(PreResult?.data.sort((a, b) => {
                            //     return a.sortNo - b.sortNo;
                            // }).map(d => ({ data: { ...d }, value: d?.id, label: d?.name })))

                            let sortData = PreResult?.data.sort((a, b) => {
                                return a.sortNo - b.sortNo;
                            }).map(d => ({ data: { ...d }, value: d?.id, label: d?.name }));
                            defaultLoad = sortData?.[0]?.value ?? "沒有分類"
                            setNewsType(sortData);
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
                                    clearSession();
                                    clearLocalStorage();
                                    globalContextService.clear();
                                    Switch();
                                }
                                close();
                            }
                            // theme: {
                            //     yesButton: {
                            //         text: {
                            //             basic: (style, props) => {
                            //                 console.log(style)
                            //                 return {
                            //                     ...style,
                            //                     color: "red"
                            //                 }
                            //             },
                            //         }
                            //     }
                            // }
                        })
                        throw Error.message;
                    })
                    .finally(() => {
                        //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                        // globalContextService.set("NewsPage", "firstUseAPIgetNewsType", false);
                        //#endregion
                    });
                //#endregion
            }

            //#region 取得所有最新消息類別 API
            await fetch(`${APIUrl}Newss/Load?page=1&limit=99999&IsClient=true&NewsCategoryId=${defaultLoad ?? newsCategoryId}&ReleaseDate=${releaseDate}`, //categorys/load?page=1&limit=20&TypeId=SYS_DRIVER_LICENSE  
                {
                    headers: {
                        "X-Token": getParseItemLocalStorage("Auth"),
                        "content-type": "application/json; charset=utf-8",
                    },
                    method: "GET"
                })
                .then(Result => {
                    const ResultJson = Result.clone().json();//Respone.clone()
                    return ResultJson;
                })
                .then((PreResult) => {

                    if (PreResult.code === 200) {
                        // 成功取得司機 證照 API
                        console.log(PreResult)
                        setAllNews(PreResult.data)
                        setCheckDetail({})
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
                                clearSession();
                                clearLocalStorage();
                                globalContextService.clear();
                                Switch();
                            }
                            close();
                        }
                        // theme: {
                        //     yesButton: {
                        //         text: {
                        //             basic: (style, props) => {
                        //                 console.log(style)
                        //                 return {
                        //                     ...style,
                        //                     color: "red"
                        //                 }
                        //             },
                        //         }
                        //     }
                        // }
                    })
                    throw Error.message;
                })
                .finally(() => {
                    //#region 規避左側欄收合影響組件重新渲染 (每一個API都要有)
                    globalContextService.set("NewsPage", "firstUseAPIgetNewsType", false);
                    //#endregion
                });
            //#endregion

        }
    }, [APIUrl, Switch])

    const [GetNewsTypeExecute, GetNewsTypePending] = useAsync(getNewsType, true);
    //#endregion

    return (
        <>
            {
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
            }
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
                Width < 768 &&
                <MobileM
                    NowTab={NowTab} // 目前公告頁面
                    setNowTab={setNowTab} // 設定目前公告頁面
                    NewsType={NewsType} // 所有最新消息類別
                    AllNews={AllNews} // 類別下所有最新消息
                    CheckDetail={CheckDetail} // 詳細資料
                    setCheckDetail={setCheckDetail} // 設定詳細資料
                    GetNewsTypeExecute={GetNewsTypeExecute} // 選單更新值調用，取得特定類別所有最新消息
                />
            }
        </>
    )
}