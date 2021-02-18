import React from 'react';
import styled from 'styled-components';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import SecondaryTheme from './Theme/SecondaryTheme'
import { BasicContainer } from '../Containers/BasicContainer';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { Dropdown as DropdownA } from 'antd';
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        case "SecondaryTheme":
            return SecondaryTheme;
        case "DisableTheme":
            return DisableTheme;
        case "PrimaryTheme":
            return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region Dropdown Extend antd
const DropDownExtend = styled(DropdownA).attrs((props) => ({}))`

`
//#endregion

//#region DropDown 
const DropDownBase = (props) => {
    // trigger={['click']}
    return (
        <>
            <DropDownExtend overlay={props?.dropDownItem ?? <></>} placement={props?.placement ?? "bottomLeft"}>
                {props.children}
            </DropDownExtend>
        </>
    )
}
//#endregion


export const DropDown = styled(DropDownBase).attrs((props) => ({}))`

`