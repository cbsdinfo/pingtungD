import React from 'react'
import { Routers } from '../../Routers/Routers'
import { Layout } from '../../ProjectComponent/Layout/Layout'
import { Modals, Container, BackstagePageTabBar, SubContainer, BasicContainer, ScrollBar, BasicButton, LineButton, Text, NativeBasicButton, NativeLineButton } from '../';
import styled from 'styled-components'
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

    //const { Theme, setTheme } = useContext(Context);
    //const { } = Theme;

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
