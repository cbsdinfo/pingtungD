import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { cssifyObject } from 'css-in-js-utils'
import { themeBeUsed } from '../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { Resizable as ResizableExtend } from 're-resizable';
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

const ResizableBase = React.forwardRef((props, ref) => {
    //#region 在要使用滾動事件的組件使用下面這段，並且在Resizable上綁定 ref
    // const ref = useRef();
    const [Width, setWidth] = useState(300);
    const [Height, setHeight] = useState(200);

    useEffect(() => {
        props.width && setWidth(props.width)
        props.height && setHeight(props.height)
    }, [props.width, props.height])
    // useEffect(() => {
    //     ref.current.recalculate();
    //     console.log(ref.current.getScrollElement().offsetHeight); // <- the root element you applied SimpleBar on
    //     ref.current.getScrollElement().onscroll = (e) => { console.log(e) }
    //     ref.current.getScrollElement().scrollTop = 200
    // })
    //#endregion

    return (
        <ResizableExtend
            {...props}
            ref={ref}
            // enable={{ top: true, right: false, bottom: false, left: false, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
            style={themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "basic")}
            // defaultSize={{ width: props.width, height: props.height }}
            size={{ width: Width, height: Height }}
            minHeight={props.minHeight}
            maxHeight={props.maxHeight}
            onResizeStop={(e, direction, ref, d) => {
                setWidth(Width + d.width);
                setHeight(Height + d.height);
                // !((props.fixedWidth) ? true : false) && setWidth(width + d.width);
                // !((props.fixedHeight) ? true : false) && setHeight(height + d.height);
            }}
        >
            {props.children}
        </ResizableExtend>
    )
})

// & {
//     ${props => cssifyObject(themeBeUsed(props.basedefaulttheme, switchDefaultTheme, props.theme ?? switchDefaultTheme(props.basedefaulttheme), "basic"))};
// }
export const Resizable = styled(ResizableBase).attrs((props) => ({}))`

`
