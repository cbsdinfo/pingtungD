import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

import { CaseCallCarComponent } from '../CaseCallCarComponent/CaseCallCarComponent'
import { BusCallCarComponent } from '../BusCallCarComponent/BusCallCarComponent'
import { WhiteCallCarComponent } from '../WhiteCallCarComponent/WhiteCallCarComponent'

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { callCar: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "tabUseComponent":
                return (
                    {
                        "長照":
                            <CaseCallCarComponent
                                BasicInf={props.BasicInf}
                                CaseInf={props.CaseInf}
                                CaseUserId={props.CaseUserId}
                                Quota={props.Quota}
                                BUnits={props.BUnits}
                                CarType={props.CarType}
                                mapGoogleControll={props.mapGoogleControll}
                                GetPolylineRouteExecute={props.GetPolylineRouteExecute}
                            />,
                        "共享車隊":
                            <WhiteCallCarComponent
                                BasicInf={props.BasicInf}
                                WhiteUserId={props.WhiteUserId}
                                WhiteInf={props.WhiteInf}
                                CarType={props.CarType}
                                mapGoogleControll={props.mapGoogleControll}
                                GetPolylineRouteExecute={props.GetPolylineRouteExecute}
                            />,
                        "巴士":
                            <BusCallCarComponent
                                BasicInf={props.BasicInf}
                                BusInf={props.BusInf}
                                BusUserId={props.BusUserId}
                                AllRoute={props.AllRoute}
                                AllStation={props.AllStation}
                            />
                    }
                );

            default:
                return props.TabMenu
        }

    }
    //#endregion

    const tabPageMap =
    {
        "長照": "CaseCallCarComponentPage",
        "共享車隊": "WhiteCallCarComponentPage",
        "巴士": "BusCallCarComponentPage",
    }

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={mobileM.titleBar}
                        >
                            {/* 預約訂車按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.preOrderButton}
                                onClick={() => {

                                }}
                            >
                                預約訂車
                            </NativeLineButton>

                            {/* 快速叫車按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={mobileM.fastOrderButton}
                                onClick={() => {
                                    history.push('/FastCallCar')
                                }}
                            >
                                快速叫車
                            </NativeLineButton>

                        </BasicContainer>

                        {/* 分頁 */}
                        <BasicContainer>
                            {tabMap().map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Text
                                            onClick={() => {
                                                props.setNowTab(item)
                                                props.controllGCS("deleteTabData", tabPageMap[props.nowTab])
                                            }}
                                            isActive={props.nowTab === item}
                                            theme={mobileM.titleBarCallCarTab}
                                        >
                                            {item}
                                        </Text>
                                    </React.Fragment>
                                )
                            })}
                        </BasicContainer>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {tabMap("tabUseComponent")?.[props.nowTab]}

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`