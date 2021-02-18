import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, RangeDateTimePicker, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import { ScrollBar } from '../../../Components/ScrollBar/ScrollBar';
import moment from 'moment';
import { AllBusRouteAomponent } from '../AllBusRouteAomponent/AllBusRouteAomponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busRoute: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const data = [
        { township: "滿州鄉", routeName: ["綠線(龍口線)", "橘線(龍爪線)", "高士四林線", "旭海南線"] },
        { township: "牡丹鄉", routeName: ["藍線(龍脊線)", "紅線(龍尾線)", "牡丹東源線"] },
        { township: "貴州鄉", routeName: ["旭海北線"] },
    ]

    const list = ["全部路線"].concat(data.map(item => item.township));
    // console.log(list)

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "全部路線": <AllBusRouteAomponent />,
                    }
                );

            default:
                return list
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>

                        {/* 分頁 */}
                        <BasicContainer
                            theme={laptopL.whiteContainer}
                        >

                            <BasicContainer
                                theme={laptopL.tabsContainer}
                            >
                                <ScrollBar
                                    basedefaulttheme={"DefaultTheme"}
                                    autoHide={true}
                                    theme={laptopL.containerScrollBar}
                                >
                                    {tabMap().map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Text
                                                    onClick={() => { props.setNowTab(item) }}
                                                    isActive={props.nowTab === item}
                                                    theme={laptopL.titleBarBusRouteCallCarTab}
                                                >
                                                    {item}
                                                </Text>
                                            </React.Fragment>
                                        )
                                    })}
                                </ScrollBar>
                            </BasicContainer>
                        </BasicContainer>

                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                {/* {console.log(data.filter(X => X.township === props.nowTab || "全部路線" === props.nowTab).map(item => { return item.routeName }).flat())} */}
                <AllBusRouteAomponent
                    data={data.filter(X => X.township === props.nowTab || "全部路線" === props.nowTab).map(item => { return item.routeName }).flat()}
                    CheckDetail={props.CheckDetail}
                    setCheckDetail={props.setCheckDetail}
                />

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`