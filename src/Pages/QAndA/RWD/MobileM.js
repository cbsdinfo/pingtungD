import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Store/Store'
import styled from 'styled-components';
import { MainPageContainer, QA } from '../../../ProjectComponent';
import { BasicContainer, Text } from '../../../Components';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { mobileM } } } } = Theme;
    const [, Height] = useWindowSize();

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                vh={Height}
                outSideTopComponent={
                    <>
                        <Text
                            theme={mobileM.titleText}
                        >
                            常見問題
                        </Text>
                    </>
                }
            >
                {/* 常見問題容器 */}
                <BasicContainer
                    theme={mobileM.qAContainer}
                    vh={Height}
                >

                    {/* 常見問題 */}
                    <QA
                        theme={{
                            container: {
                                basic: (style, props) => ({
                                    ...style,
                                    borderRadius: "0px",
                                })
                            },
                            questionContainer: {
                                basic: (style, props) => ({
                                    ...style,
                                    borderBottom: "#E5E4DB 2px solid",
                                })
                            }
                        }}
                        data={
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

                    <Text
                        theme={mobileM.noMoreData}
                    >
                        沒有更多問題
                    </Text>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
