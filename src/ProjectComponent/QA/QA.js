import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Close } from './Assets/img/Close.svg'
import { ReactComponent as Open } from './Assets/img/Open.svg'
import { ReactComponent as Q } from './Assets/img/Q.svg'
import { ReactComponent as A } from './Assets/img/A.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 基礎按鈕
export const QABase = (props) => {

    const [OpenQuestion, setOpenQuestion] = useState([]);

    const dataOfQAndA = [
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
    ]

    return (
        <>
            <BasicContainer
                className={props.className}
                baseDefaultTheme={"DefaultTheme"}
                theme={{
                    ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "container")
                }} //吃theme
            >
                {((props.data ?? dataOfQAndA) ?? []).map((item, index) => {
                    return (
                        <>
                            {/* 問題容器樣式 */}
                            <BasicContainer
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{
                                    ...iterateTheme({ ...props, actived: OpenQuestion.includes(item?.id) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "questionContainer")
                                }} //吃theme
                                onClick={() => {
                                    if (!OpenQuestion.includes(item?.id)) {
                                        setOpenQuestion(r => ([...r, item?.id]));
                                    } else {
                                        setOpenQuestion(r => ([...r].filter(i => i !== item?.id)));
                                    }
                                }}
                            >
                                {/* 問題文字 */}
                                <Text
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{
                                        ...iterateTheme({ ...props, actived: OpenQuestion.includes(item?.id) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "questionText")
                                    }} //吃theme
                                >

                                    <Q style={{ ...switchDefaultTheme(props.baseDefaultTheme)["questionHeadIcon"] }} />

                                    {item.question}

                                    {OpenQuestion.includes(item?.id)
                                        ?
                                        <Close style={{ ...switchDefaultTheme(props.baseDefaultTheme)["questionOpenIcon"] }} />
                                        :
                                        <Open style={{ ...switchDefaultTheme(props.baseDefaultTheme)["questionCloseIcon"] }} />
                                    }

                                </Text>

                            </BasicContainer>

                            {/* 答案容器樣式 */}
                            <BasicContainer
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${OpenQuestion.includes(item?.id) && "expand"}`}
                                theme={{
                                    ...iterateTheme({ ...props, actived: OpenQuestion.includes(item?.id) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "answerContainer")
                                }} //吃theme
                            >
                                {/* 答案文字 */}
                                <Text
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={{
                                        ...iterateTheme({ ...props, actived: OpenQuestion.includes(item?.id) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "answerText")
                                    }} //吃theme
                                >
                                    <A style={{ ...switchDefaultTheme(props.baseDefaultTheme)["answerHeadIcon"] }} />


                                    {item.answer}
                                </Text>

                            </BasicContainer>
                        </>
                    )
                })}

            </BasicContainer>
        </>
    )
}

export const QA = styled(QABase).attrs((props) => ({}))`
.expand {
    max-height: 800px !important;
}

`
//#endregion