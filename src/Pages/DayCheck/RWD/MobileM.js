import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, Sign, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, Checkbox, CheckboxItem } from '../../../Components';
import { ReactComponent as Warning } from '../../../Assets/img/DayCheckPage/Warning.svg'
import { ReactComponent as Cross } from '../../../Assets/img/DayCheckPage/Cross.svg'
import { ReactComponent as Check } from '../../../Assets/img/DayCheckPage/Check.svg'
import { ReactComponent as Note } from '../../../Assets/img/DayCheckPage/Note.svg'
import { ReactComponent as Heart } from '../../../Assets/img/DayCheckPage/Heart.svg'
import { ReactComponent as GrayCheck } from '../../../Assets/img/DayCheckPage/GrayCheck.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { dayCheck: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion

    const carCheckMapping = {
        "引擎": [
            "汽油",
            "機油",
            "變速箱油",
            "煞車油",
            "方向盤動力油",
            "副水箱",
            "雨刷水箱",
            "電瓶水",
            "水箱",
        ],
        "車前方": [
            "汽油",
            "機油",
            "變速箱油",
            "煞車油",
            "方向盤動力油",
            "副水箱",
            "雨刷水箱",
            "電瓶水",
            "水箱",
        ]
    }

    return (
        <>
            <TitleBar
                returnIcon={props.CarCheckDetail || props.BodyCheckDetail}
                returnIconOnClick={(e) => {
                    props.setCarCheckDetail(false);
                    props.setBodyCheckDetail(false);
                }}
            />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
                {/* 檢查 文字 */}
                <Text
                    changeText={props.CarCheckDetail || props.BodyCheckDetail}
                    theme={mobileM.checkText}
                >
                    {
                        !props.CarCheckDetail && !props.BodyCheckDetail
                        &&
                        <Warning style={mobileM.warningSvg} />
                    }

                    {
                        props.CarCheckDetail
                            ?
                            "每日車輛檢查"
                            :
                            (props.BodyCheckDetail
                                ?
                                "每日身心檢查"
                                :
                                `${true ? "您今日已完成所有檢查" : "您今日尚未完成檢查"}`
                            )
                    }
                </Text>

                {
                    !props.CarCheckDetail && !props.BodyCheckDetail
                    &&
                    <>
                        {/* 檢查 容器 */}
                        <BasicContainer
                            theme={mobileM.checkContainer}
                        >
                            {/* 車輛 */}
                            <Text
                                theme={mobileM.carCheckText}
                            >
                                {true ? <Check style={mobileM.checkSvg} /> : <Cross style={mobileM.crossSvg} />}
                                {`車輛`}
                            </Text>

                            {/* 身心 */}
                            <Text
                                theme={mobileM.bodyCheckText}
                            >
                                {true ? <Check style={mobileM.checkSvg} /> : <Cross style={mobileM.crossSvg} />}
                                {`身心`}
                            </Text>

                        </BasicContainer>

                        {/* 按鈕 容器 */}
                        <BasicContainer
                            height={Height}
                            theme={mobileM.buttonContainer}
                        >
                            {
                                true
                                    ?
                                    <>
                                        {/* 車輛檢查 按鈕 */}
                                        <NativeLineButton
                                            theme={mobileM.carCheckButton}
                                            onClick={() => {
                                                props.setCarCheckDetail(true);
                                            }}
                                        >
                                            <Note style={mobileM.noteSvg} />
                                            {`車輛檢查`}
                                        </NativeLineButton>

                                        {/* 身心檢查 按鈕 */}
                                        <NativeLineButton
                                            theme={mobileM.bodyCheckButton}
                                            onClick={() => {
                                                props.setBodyCheckDetail(true);
                                            }}
                                        >
                                            <Heart style={mobileM.heartSvg} />
                                            {`身心檢查`}
                                        </NativeLineButton>

                                    </>
                                    :
                                    <>
                                        <GrayCheck />

                                        {/* OK */}
                                        <Text
                                            theme={mobileM.okText}
                                        >
                                            {`OK`}
                                        </Text>

                                        {/* 今日檢查已完成 */}
                                        <Text
                                            theme={mobileM.checkCompleteText}
                                        >
                                            {`今日檢查已完成`}
                                        </Text>
                                    </>
                            }

                        </BasicContainer>

                    </>
                }

                {
                    props.CarCheckDetail
                    &&
                    Object.keys(carCheckMapping).map((key) => {
                        return (
                            <>
                                {/* 車輛檢查 容器 */}
                                <BasicContainer
                                    theme={mobileM.carCheckContainer}
                                >
                                    {/* 項目 標題 */}
                                    <Text
                                        theme={mobileM.itemTitle}
                                    >
                                        {key}
                                    </Text>

                                    {/* 項目 內容 */}
                                    <Checkbox
                                        // viewType
                                        checked={globalContextService.get("DayCheckPage", "ItemDate")}
                                        // disable
                                        long={carCheckMapping[key].length}
                                        topLabel={""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("DayCheckPage", "WorkDate", value);
                                            console.log(globalContextService.get("DayCheckPage", "ItemDate"))
                                        }}
                                        theme={mobileM.itemData}
                                    >
                                        <Container>
                                            {/* 項目 內容  選項 */}
                                            {
                                                carCheckMapping[key].map((item) => {
                                                    console.log(item)
                                                    return (
                                                        <SubContainer theme={mobileM.checkBoxItemContainer}>
                                                            <CheckboxItem key={`${item}_${key}`} value={`${item}_${key}`} >{item}</CheckboxItem>
                                                        </SubContainer>
                                                    )
                                                })
                                            }
                                        </Container>
                                        {/* <CheckboxItem value={"1"} >星期一</CheckboxItem>
                                        <CheckboxItem value={"2"} >星期二</CheckboxItem>
                                        <CheckboxItem value={"3"} >星期三</CheckboxItem>
                                        <CheckboxItem value={"4"} >星期四</CheckboxItem>
                                        <CheckboxItem value={"5"} >星期五</CheckboxItem>
                                        <CheckboxItem value={"6"} >星期六</CheckboxItem>
                                        <CheckboxItem value={"7"} >星期日</CheckboxItem> */}
                                    </Checkbox>
                                </BasicContainer>
                            </>
                        )
                    })
                }

                {
                    props.BodyCheckDetail
                    &&
                    <>
                        {/* 提醒 容器 */}
                        <BasicContainer
                            theme={mobileM.bodyCheckTipContainer}
                        >
                            {/* 提醒 */}
                            <Text
                                theme={mobileM.bodyCheckTip}
                            >
                                {`根據自己的感受和體會`}
                            </Text>

                            {/* 提醒 */}
                            <Text
                                theme={mobileM.bodyCheckTip}
                            >
                                {`對您現在的身心情況進行評估並點選適當欄位`}
                            </Text>
                        </BasicContainer>

                        {/* 酒測 容器 */}
                        <BasicContainer
                            theme={mobileM.wineTestContainer}
                        >
                            {/* 酒測值 */}
                            <Text
                                theme={mobileM.testText}
                            >
                                {`酒測值`}

                                {/* 酒測值  */}
                                <TextInput
                                    topLabel={""}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCheckPage", "WineTest") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCheckPage", "WineTest", value);
                                    }}
                                    theme={mobileM.testInput}
                                />

                                {/* 是否正常 */}
                                <Text
                                    isTrue={false}
                                    theme={mobileM.correctOrErrorText}
                                >
                                    {false ? "正常" : "超出範圍"}
                                </Text>
                            </Text>

                            {/* 血壓值 */}
                            <Text
                                theme={mobileM.testText}
                            >
                                {`血壓值`}

                                {/* 血壓值  */}
                                <TextInput
                                    topLabel={""}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCheckPage", "BloodPressure") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCheckPage", "BloodPressure", value);
                                    }}
                                    theme={mobileM.testInput}
                                />

                                {/* 是否正常 */}
                                <Text
                                    isTrue={false}
                                    theme={mobileM.correctOrErrorText}
                                >
                                    {false ? "正常" : "超出範圍"}
                                </Text>
                            </Text>

                            {/* 額溫值 */}
                            <Text
                                theme={mobileM.testText}
                            >
                                {`額溫值`}

                                {/* 額溫值  */}
                                <TextInput
                                    topLabel={""}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCheckPage", "Temperature") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCheckPage", "Temperature", value);
                                    }}
                                    theme={mobileM.testInput}
                                />

                                {/* 是否正常 */}
                                <Text
                                    isTrue={false}
                                    theme={mobileM.correctOrErrorText}
                                >
                                    {false ? "正常" : "超出範圍"}
                                </Text>
                            </Text>

                            {/* 心率值 */}
                            <Text
                                theme={mobileM.testText}
                            >
                                {`心率值`}

                                {/* 心率值  */}
                                <TextInput
                                    topLabel={""}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCheckPage", "HeartRate") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCheckPage", "HeartRate", value);
                                    }}
                                    theme={mobileM.testInput}
                                />

                                {/* 是否正常 */}
                                <Text
                                    isTrue={false}
                                    theme={mobileM.correctOrErrorText}
                                >
                                    {false ? "正常" : "超出範圍"}
                                </Text>
                            </Text>

                        </BasicContainer>

                        {
                            [
                                "胸口灼熱（胃食道逆流）或者噁心",
                                "睡眠不足"
                            ].map((item) => {
                                return (
                                    <>
                                        {/* 其他問題 容器 */}
                                        <BasicContainer
                                            theme={mobileM.otherProblemContainer}
                                        >
                                            {/* 其他問題 文字 */}
                                            <Text
                                                theme={mobileM.otherProblemText}
                                            >
                                                {item}
                                            </Text>
                                        </BasicContainer>
                                    </>
                                )
                            })
                        }
                    </>
                }
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`