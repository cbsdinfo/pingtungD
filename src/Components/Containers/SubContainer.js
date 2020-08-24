import styled from 'styled-components'
import { BaseLevelTheme } from '../../Handlers/ThemeHandler';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/SubContainer/DefaultTheme'
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

/* 
   Date   : 2020-05-18 15:07:21
   Author : Arhua Ho
   Content: 作為Flex次層容器組件使用，
            選用斷點:
                none
*/
export const SubContainer = styled.div.attrs((props) => ({}))`

${props => BaseLevelTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme))}

`