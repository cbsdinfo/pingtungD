import React, { useContext, useState, useCallback } from 'react';
import { Context } from '../../Store/Store'
import { FormContainer } from '../../Components/Form/FormContainer/FormContainer';
import { FormRow } from '../../Components/Form/FormRow/FormRow';
import { SubContainer, globalContextService, Text, modalsService } from '../../Components';
import { TextInput } from '../../Components/Form/TextInput/TextInput';
import { ReactComponent as Eye } from '../../Components/Form/TextInput/Assets/img/Eye.svg'
import { clearLocalStorage, clearSession, setItemLocalStorage, setStringifyItemLocalStorage } from '../../Handlers/'
import { useAsync } from '../../SelfHooks/useAsync'
// import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
// import { Tablet } from './RWD/Tablet';
import { isNil } from 'lodash';
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { useHistory } from 'react-router-dom';

export const Login = (props) => {

    const { APIUrl, APIAppKey, Theme, Switch, History, Location } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [WhichForm, setWhichForm] = useState("Login"); // 切換 登入、忘記密碼、設定登入密碼 表單
    const [SendedAuthCode, setSendedAuthCode] = useState(false); // 紀錄是否已經發送過驗證碼 (要不要顯示重新發送驗證碼)
    const [WaitSecToZero, setWaitSecToZero] = useState(false); // 控制驗證碼倒數
    const [NowTab, setNowTab] = useState("車行公告"); // 目前公告頁面
    const [ForgetFlag, setForgetFlag] = useState(1); // 驗忘記密碼驗證步驟
    const [AuthCodeSuccess, setAuthCodeSuccess] = useState(true); // 驗證成功
    const [Width, Height] = useWindowSize();

    let history = useHistory();

    //#region 當頁 GlobalContextService (GCS) 值 控制
    const controllGCS = (type, payload) => {
        // console.log(type)
        switch (type) {
            case "Login":
                //#region 當 按下登入按紐時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("LoginPage", "Account");
                    globalContextService.remove("LoginPage", "Password");
                }
                //#endregion
                break;
            case "SignUp":
                //#region 當 按下註冊按紐時，要清除的資料
                if (payload === "API") {
                    globalContextService.remove("LoginPage", "CheckedRowKeys");
                    globalContextService.remove("LoginPage", "CheckedRowsData");
                }
                //#endregion
                break;
            case "Return":
                //#region 當 按下返回按紐時，要清除的資料
                globalContextService.remove("LoginPage");
                //#endregion
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region 登入 API
    const login = useCallback(async (account, password) => {
        let token = "";

        //#region 處理 所有左側欄父層 name 對應 子層 url 函數 ， { "父層名":["子層名", 子層路由... ] } (格式僅包含 父層及其子層 不包含孫層)
        const mapMenuNameAndSubUrl = (data, mapObj = {}, fatherName) => {

            if (data instanceof Array) {
                for (var item of data) {
                    mapMenuNameAndSubUrl(item, mapObj, fatherName);
                }
            } else {
                if (data.item.url.trim() !== "/") {
                    // 路由非為 "/" ，代表具真實路由
                    if (fatherName) {
                        mapObj[fatherName].push(data.item.url)
                    }
                    else {
                        mapObj[data.item.name] = [data.item.url];
                    }
                } else {
                    mapObj[data.item.name] = [];
                    if (!isNil(fatherName)) {
                        mapObj[fatherName].push(data.item.name)
                    }
                }

                if (data.children.length > 0) {
                    mapMenuNameAndSubUrl(data.children, mapObj, data.item.name);
                }
            }

            return mapObj;
        }
        //#endregion 

        //#region 將所有子孫路由加入父層 (by ref)
        const AddChildsToFather = (mapMenuNameAndSubUrlResult) => {
            // console.log(mapMenuNameAndSubUrlResult)
            let keys = Object.keys(mapMenuNameAndSubUrlResult);

            for (const [key, value] of Object.entries(mapMenuNameAndSubUrlResult)) {
                if (keys.containPart(value)) {
                    if (value instanceof Array) {
                        value.forEach((item, index) => {
                            if (keys.includes(item)) {
                                mapMenuNameAndSubUrlResult[key].splice(index, 1);// 移除父層名
                                mapMenuNameAndSubUrlResult[key] = [...value, ...mapMenuNameAndSubUrlResult[item]]
                            }
                        })
                    }
                }
            }
            return mapMenuNameAndSubUrlResult;
        }
        //#endregion

        //#region 取得token
        await fetch(`${APIUrl}check/login`,
            {
                headers: {
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({
                    // account: account,
                    // password: password,
                    Account: globalContextService.get("LoginPage", "Account"),// "System",
                    Password: globalContextService.get("LoginPage", "Password"), //"123456",
                    AppKey: APIAppKey
                })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得token
                    token = PreResult.token;
                } else {
                    throw PreResult.message;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    // theme: {
                    yesOnClick: (e, close) => {
                        close();
                    }
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
                throw Error;
            })
            .finally(() => {
            });
        //#endregion

        //#region 取得使用者名稱 與 ID
        await fetch(`${APIUrl}DriverInfos/GetByToken`, //Check/GetUserProfile
            {
                headers: {
                    "X-Token": token,
                }
            })
            .then(Result => {
                //portalService.clear();
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.code === 200) {
                    //成功取得使用者名稱 與 ID
                    setItemLocalStorage("UserName", JSON.stringify(PreResult.result?.name));
                    setItemLocalStorage("DAuth", JSON.stringify(token));
                    setItemLocalStorage("DriverID", JSON.stringify(PreResult.result?.id));
                    setItemLocalStorage("DriverAccount", JSON.stringify(PreResult.result?.account));
                    setItemLocalStorage("DriverPic", JSON.stringify(PreResult.result?.pic));
                    setItemLocalStorage("DriverOrg", JSON.stringify({ orgId: PreResult.result?.orgId, orgName: PreResult.result?.orgName }));
                    controllGCS("Login");
                } else {
                    throw PreResult.message;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    yesOnClick: (e, close) => {
                        close();
                    }
                })
                throw Error;
            })
            .finally(() => {
                // history.push("/UserInfo")
                Switch();
            });
        //#endregion

        //#region 取得左側欄資料 
        // await fetch(`${APIUrl}Check/GetModulesTree`,
        //     {
        //         headers: {
        //             "X-Token": token,
        //             "content-type": "application/json; charset=utf-8",
        //         }
        //     })
        //     .then(Result => {
        //         const ResultJson = Result.clone().json();//Respone.clone()
        //         return ResultJson;
        //     })
        //     .then((PreResult) => {
        //         if (PreResult.code === 200) {
        //             //成功取得左側欄資料
        //             setItemLocalStorage("ModulesTree", JSON.stringify(PreResult.result));
        //             // 所有左側欄父層 name 對應 子層 url
        //             setStringifyItemLocalStorage("MenuNameAndSubUrl", AddChildsToFather(mapMenuNameAndSubUrl(PreResult.result)))
        //         } else {
        //             throw PreResult.message;
        //         }
        //     })
        //     .catch((Error) => {

        //         console.log(Error)
        //         modalsService.infoModal.warn({
        //             iconRightText: Error,
        //             yes: true,
        //             yesText: "確認",
        //             // no: true,
        //             // autoClose: true,
        //             backgroundClose: true,
        //             yesOnClick: (e, close) => {
        //                 close();
        //             }
        //         })
        //         throw Error;
        //     })
        //     .finally(() => {
        //     });
        //#endregion

        //#region 取得組織資料
        // await fetch(`${APIUrl}Check/getorgs`,
        //     {
        //         headers: {
        //             "X-Token": token,
        //             "content-type": "application/json; charset=utf-8",
        //         }
        //     })
        //     .then(Result => {
        //         const ResultJson = Result.clone().json();//Respone.clone()
        //         return ResultJson;
        //     })
        //     .then((PreResult) => {
        //         if (PreResult.code === 200) {
        //             setItemLocalStorage("Orgs", JSON.stringify(PreResult.result));
        //             setStringifyItemLocalStorage("UseOrg", { id: PreResult.result?.[0]?.id, name: PreResult.result?.[0]?.name });
        //             setItemLocalStorage("DAuth", JSON.stringify(token));
        //         } else {
        //             throw PreResult.message;
        //         }
        //     })
        //     .catch((Error) => {
        //         modalsService.infoModal.warn({
        //             iconRightText: Error,
        //             yes: true,
        //             yesText: "確認",
        //             // no: true,
        //             // autoClose: true,
        //             backgroundClose: true,
        //             yesOnClick: (e, close) => {
        //                 close();
        //             }
        //         })
        //         throw Error;
        //     })
        //     .finally(() => {
        //         Switch();
        //     });
        //#endregion

    }, [APIUrl, APIAppKey, Switch])

    const [LoginExecute, LoginPending] = useAsync(login, false);
    //#endregion 

    //#region 註冊 API (待調整)
    const singUp = useCallback(async (account, password) => {
        let token = "";

        //#region 取得token
        await fetch(`${APIUrl}check/login`,
            {
                headers: {
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({
                    // account: account,
                    // password: password,
                    Account: globalContextService.get("LoginPage", "Account"),// "System",
                    Password: globalContextService.get("LoginPage", "Password"), //"123456",
                    AppKey: APIAppKey
                })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得token
                    token = PreResult.token;
                } else {
                    throw PreResult.message;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    // theme: {
                    yesOnClick: (e, close) => {
                        close();
                    }
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
                throw Error;
            })
            .finally(() => {
            });
        //#endregion

        //#region 取得使用者名稱 與 ID
        await fetch(`${APIUrl}check/GetUserProfile`, //Check/GetUserProfile
            {
                headers: {
                    "X-Token": token,
                }
            })
            .then(Result => {
                //portalService.clear();
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {
                if (PreResult.code === 200) {
                    //成功取得使用者名稱 與 ID
                    setItemLocalStorage("UserName", JSON.stringify(PreResult.result?.name));
                    setItemLocalStorage("DAuth", JSON.stringify(token));
                    setItemLocalStorage("DriverID", JSON.stringify(PreResult.result?.id));
                } else {
                    throw PreResult.message;
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    yesOnClick: (e, close) => {
                        close();
                    }
                })
                throw Error;
            })
            .finally(() => {
                // history.push("/UserInfo")
                Switch();
            });
        //#endregion

    }, [APIUrl, APIAppKey, Switch])

    const [singUpExecute, singUpPending] = useAsync(singUp, false);
    //#endregion 

    //#region 發送驗證碼 API (待調整)
    const sendAuthCode = useCallback(async (account) => {

        //#region 發送驗證碼
        fetch(`${APIUrl}Users/AddMobileVerification?UserAcc=${account}`,
            {
                headers: {
                    "content-type": "application/json; charset=utf-8",
                },
                method: "GET",
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功取得token

                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    // theme: {
                    yesOnClick: (e, close) => {
                        close();
                    }
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
                throw Error;
            })
            .finally(() => {
            });
        //#endregion

    }, [APIUrl, APIAppKey, Switch])

    const [SendAuthCodeExecute, SendAuthCodePending] = useAsync(sendAuthCode, false);
    //#endregion 

    //#region 驗證 API (待調整)
    const confirmAuthCode = useCallback(async (account, vCode) => {

        //#region 驗證
        await fetch(`${APIUrl}Users/CheckMobileVerification?UserAcc=${account}&VerificationCode=${vCode}`,
            {
                headers: {
                    "content-type": "application/json; charset=utf-8",
                },
                method: "GET",
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 驗證成功
                    setForgetFlag(2);
                    setWhichForm("ResetPass");
                } else {
                    setAuthCodeSuccess(false);
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    // theme: {
                    yesOnClick: (e, close) => {
                        close();
                    }
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
                throw Error;
            })
            .finally(() => {
            });
        //#endregion

    }, [APIUrl, APIAppKey, Switch])

    const [ConfirmAuthCodeExecute, ConfirmAuthCodePending] = useAsync(confirmAuthCode, false);
    //#endregion 

    //#region 設置新密碼 API 
    const setNewPwd = useCallback(async (setNewPwdData) => {

        //#region 設置新密碼
        await fetch(`${APIUrl}Users/SetNewPassword`,
            {
                headers: {
                    "content-type": "application/json; charset=utf-8",
                },
                method: "POST",
                body: JSON.stringify({ ...setNewPwdData })
            })
            .then(Result => {
                const ResultJson = Result.clone().json();//Respone.clone()
                return ResultJson;
            })
            .then((PreResult) => {

                if (PreResult.code === 200) {
                    // 成功設置新密碼
                    setForgetFlag(3);
                }
            })
            .catch((Error) => {
                modalsService.infoModal.warn({
                    iconRightText: Error,
                    yes: true,
                    yesText: "確認",
                    // no: true,
                    // autoClose: true,
                    backgroundClose: true,
                    // theme: {
                    yesOnClick: (e, close) => {
                        close();
                    }
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
                throw Error;
            })
            .finally(() => {
            });
        //#endregion

    }, [APIUrl, APIAppKey, Switch])

    const [SetNewPwdExecute, SetNewPwdPending] = useAsync(setNewPwd, false);
    //#endregion 

    return (
        <>
            {/* {
                1440 <= Width &&
                <LaptopL
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    loginExecute={LoginExecute}
                    loginPending={LoginPending}
                />
            } */}
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    loginExecute={LoginExecute}
                    loginPending={LoginPending}
                />
            } */}
            {/* {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    loginExecute={LoginExecute}
                    loginPending={LoginPending}
                />
            } */}
            {
                // Width < 768 &&
                <MobileM
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                    loginExecute={LoginExecute}
                    loginPending={LoginPending}
                    ForgetFlag={ForgetFlag} // 驗忘記密碼驗證步驟
                    setForgetFlag={setForgetFlag} // 設定驗忘記密碼驗證步驟
                    SendAuthCodeExecute={SendAuthCodeExecute} // 發送驗證碼
                    ConfirmAuthCodeExecute={ConfirmAuthCodeExecute} // 驗證
                    AuthCodeSuccess={AuthCodeSuccess} // 驗證成功
                    setAuthCodeSuccess={setAuthCodeSuccess} // 設定驗證成功
                    SetNewPwdExecute={SetNewPwdExecute} // 設置新密碼
                    controllGCS={controllGCS}
                />
            }
        </>
    )
}