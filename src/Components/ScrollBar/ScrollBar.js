import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import SimpleBarReact from 'simplebar-react'
import "simplebar/src/simplebar.css";
import { mediaQuery } from '../../MediaQuery/MediaQuery';
import { cssifyObject } from 'css-in-js-utils'
import { themeBeUsed } from '../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "Default1Theme":
        //     return Default1Theme;
        default:
            return DefaultTheme;
    }
}
//#endregion

const ScrollBarBase = React.forwardRef((props, ref) => {
    //#region 在要使用滾動事件的組件使用下面這段，並且在ScrollBar上綁定 ref
    // const ref = useRef();

    // useEffect(() => {
    //     ref.current.recalculate();
    //     console.log(ref.current.getScrollElement().offsetHeight); // <- the root element you applied SimpleBar on
    //     ref.current.getScrollElement().onscroll = (e) => { console.log(e) }
    //     ref.current.getScrollElement().scrollTop = 200
    // })
    //#endregion

    return (
        <SimpleBarReact  {...props} ref={ref} style={themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "basic")} />
    )
})

// & {
//     ${props => cssifyObject(themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "basic"))};
// }
export const ScrollBar = styled(ScrollBarBase).attrs((props) => ({}))`

// x 方向  
.simplebar-horizontal {
   ${props => cssifyObject(themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "scrollbarTrackX"))};

   .simplebar-scrollbar {
        top: 0px;
   }
   .simplebar-visible:before {
        ${props => cssifyObject(themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "scrollbarThumbX"))};
    }
    .simplebar-scrollbar:before {
        transition: opacity 0s linear;
    }
}

// y 方向
.simplebar-vertical {
    ${props => cssifyObject(themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "scrollbarTrackY"))};

    .simplebar-scrollbar {
        width: 7px;        
    }
    .simplebar-visible:before {
        ${props => cssifyObject(themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "scrollbarThumbY"))};
    }
    .simplebar-scrollbar:before {
        transition: opacity 0s linear;
    }
}
`