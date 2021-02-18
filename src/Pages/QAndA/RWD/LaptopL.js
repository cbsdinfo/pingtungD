import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, QA } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { laptopL } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
            // outSideTopComponent={
            //     <>
            //         {/* 標題列 */}
            //         <MainPageTitleBar
            //             bascDefaultTheme={"DefaultTheme"}
            //             titleText={"常見問題"}
            //             theme={laptopL.titleBar}
            //         // onSubmit={(e)=>console.log(e)}
            //         >
            //         </MainPageTitleBar>
            //     </>
            // }
            >
                {/* 常見問題容器 */}
                <BasicContainer
                    height={Height}
                    theme={laptopL.qAContainer}
                >

                    {/* 常見問題 */}
                    <QA data={
                        [
                            {
                                id: "0",
                                question: "在交通平台系統最早可以預約訂車期間為何?",
                                answer: "預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "1",
                                question: "111在交通平台系統最早可以預約訂車期間為何?",
                                answer: "111預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "2",
                                question: "222在交通平台系統最早可以預約訂車期間為何?",
                                answer: "222預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "3",
                                question: "333在交通平台系統最早可以預約訂車期間為何?",
                                answer: "333預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "4",
                                question: "在交通平台系統最早可以預約訂車期間為何?",
                                answer: "預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "5",
                                question: "111在交通平台系統最早可以預約訂車期間為何?",
                                answer: "111預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "6",
                                question: "222在交通平台系統最早可以預約訂車期間為何?",
                                answer: "222預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "7",
                                question: "333在交通平台系統最早可以預約訂車期間為何?",
                                answer: "333預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "8",
                                question: "在交通平台系統最早可以預約訂車期間為何?",
                                answer: "預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "9",
                                question: "111在交通平台系統最早可以預約訂車期間為何?",
                                answer: "111預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "10",
                                question: "222在交通平台系統最早可以預約訂車期間為何?",
                                answer: "222預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                            {
                                id: "11",
                                question: "333在交通平台系統最早可以預約訂車期間為何?",
                                answer: "333預約時間10分鐘後若司機未抵達上車地點，該訂單上會顯示「司機未執行」，民眾可觸發此按鈕，即可將訂單取消，並歸還補助額度。也請通知您所屬個案管理師知曉。",
                            },
                        ]
                    } />

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`