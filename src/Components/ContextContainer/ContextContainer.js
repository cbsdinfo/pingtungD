import React, { useLayoutEffect } from 'react'
import { Routers } from '../../Routers/Routers'
import { Layout } from '../../ProjectComponent/Layout/Layout'
import { Modals } from '../';
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router';
import { useAsync } from '../../SelfHooks/useAsync';
import { useContext } from 'react';
import { Context } from '../../Store/Store';
import { useCallback } from 'react';
import { clearLogoutLocalStorage, clearLogoutSession, setItemLocalStorage } from '../../Handlers';
import { globalContextService } from '../../Store/GlobalContext';
import { modalsService } from '../Modal/Modals/Modals';
import isNil from 'lodash/isNil';
//#region 引入預設字體
// import NotoSansTCBlackotf from '../../Assets/fonts/NotoSansTC/NotoSansTC-Black.otf'
// import NotoSansTCBoldotf from '../../Assets/fonts/NotoSansTC/NotoSansTC-Bold.otf'
// import NotoSansTCLightotf from '../../Assets/fonts/NotoSansTC/NotoSansTC-Light.otf'
// import NotoSansTCMediumotf from '../../Assets/fonts/NotoSansTC/NotoSansTC-Medium.otf'
// import NotoSansTCRegularotf from '../../Assets/fonts/NotoSansTC/NotoSansTC-Regular.otf'
// import NotoSansTCThinotf from '../../Assets/fonts/NotoSansTC/NotoSansTC-Thin.otf'
//#endregion

// import { Context } from '../../Store/Store'
// import { MenuBar } from '../Components/MenuBar'
// import { JumpAlert } from './JumpAlerts'
// import { Portal } from './Portal'


/* 
   Date   : 2020-06-09 14:40:41
   Author : Arhua Ho
   Content: 需要一層轉發Context
*/
export const ContextContainerBase = (props) => {

  const { APIUrl, Switch } = useContext(Context);
  //const { } = Theme;
  let urlParams = new URLSearchParams(useLocation().search);//取得參數
  let history = useHistory();
  let location = useLocation();

  useLayoutEffect(() => {
    let token = urlParams.get("token"); //會是最新的值

    console.log(token, location.pathname)

    if (!isNil(token)) {
      setItemLocalStorage("DAuth", JSON.stringify(token));
      setItemLocalStorage("DriverAccountStatus", JSON.stringify(""));
      LoginExecute(location.pathname)
    }
  }, [])

  //#region 登入 API
  const login = useCallback(async (pathname) => {
    let token = urlParams.get("token");


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
          setItemLocalStorage("DUserName", JSON.stringify(PreResult.result?.name));
          setItemLocalStorage("DAuth", JSON.stringify(token));
          setItemLocalStorage("DriverID", JSON.stringify(PreResult.result?.id));
          setItemLocalStorage("DriverAccount", JSON.stringify(PreResult.result?.account));
          setItemLocalStorage("DriverPic", JSON.stringify(PreResult.result?.pic));
          setItemLocalStorage("DriverOrg", JSON.stringify({ orgId: PreResult.result?.orgId, orgName: PreResult.result?.orgName }));

          globalContextService.remove("TodayTaskPage");
          globalContextService.remove("TaskHistoryPage");
          globalContextService.remove("IncomePage");
          globalContextService.remove("HitCardListPage");
          globalContextService.remove("HitCardPage");
          globalContextService.remove("ContactPage");
          globalContextService.remove("DayCheckPage");
          globalContextService.remove("PrivacyPage");
        } else {
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
              history.push("/Login")
            }
            close();
          }
        })
        throw Error.message;
      })
      .finally(() => {
        history.push(pathname)
      });
    //#endregion

  }, [APIUrl, Switch])

  const [LoginExecute, LoginPending] = useAsync(login, false);
  //#endregion 


  return (
    <>
      {/* 
              Date   : 2020-06-12 12:18:46
              Author : Arhua Ho
              Content: 不隨Router re-render的組件
            */}
      {/* <Layout /> */}
      {/* <BackstagePageTabBar /> */}
      {/* {(localStorage.getItem("DAuth") !== null) && */}
      <>
        <Layout />
        {/* <MenuBar />
          <JumpAlert />
          <Portal /> */}
      </>
      {/* } */}

      {/* 
              Date   : 2020-06-12 12:18:46
              Author : Arhua Ho
              Content: 寫死的路由
            */}
      <Routers />

      {/* 最底層Modal */}
      <Modals />
      {/* 次層Modal */}
      <Modals id="top1" />
      {/* 最上層Modal */}
      <Modals id="top2" />
    </>
  )
}

export const ContextContainer = styled(ContextContainerBase).attrs((props) => ({}))`

// @font-face {
//     font-family: 'Noto';
//     font-weight: 900;
//     src: local('Lato'), url(\${NotoSansTCBlackotf}) format('opentype');
// }

// @font-face {
//     font-family: 'Noto';
//     font-weight: 700;
//     src: local('Lato'), url(\${NotoSansTCBoldotf}) format('opentype');
// }

// @font-face {
//     font-family: 'Noto';
//     font-weight: 500;
//     src: local('Lato'), url(\${NotoSansTCMediumotf}) format('opentype');
// }

// @font-face {
//     font-family: 'Noto';
//     font-weight: 400;
//     src: local('Lato'), url(\${NotoSansTCRegularotf}) format('opentype');
// }

// @font-face {
//     font-family: 'Noto';
//     font-weight: 300;
//     src: local('Lato'), url(\${NotoSansTCLightotf}) format('opentype');
// }

// @font-face {
//     font-family: 'Noto';
//     font-weight: 100;
//     src: local('Lato'), url(\${NotoSansTCThinotf}) format('opentype');
// }
`
