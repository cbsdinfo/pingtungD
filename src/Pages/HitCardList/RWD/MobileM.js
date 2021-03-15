import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { hitCard: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion

    return (
        <>
            <TitleBar
                returnIcon
                returnIconOnClick={(e) => {
                    e.preventDefault();
                    props.controllGCS("return")
                    history.goBack()
                }}
                customTitleText={<Text theme={mobileM.titleBar}>打卡列表</Text>}
            />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
                {/* 日期 */}
                <Text
                    theme={mobileM.nowDateText}
                >
                    {fmt(moment(), "YYYY / MM / DD")}
                </Text>

                {/* 打卡紀錄 容器*/}
                <BasicContainer
                    height={Height}
                    theme={mobileM.hitCardList}
                >
                    {/* 列表標題 容器 */}
                    <SubContainer
                        theme={mobileM.listTitleContainer}
                    >
                        {/* 打卡 標題 */}
                        <Text
                            theme={mobileM.hitCardTitle}
                        >
                            打卡
                        </Text>

                        {/* 時間 標題 */}
                        <Text
                            theme={mobileM.timeTitle}
                        >
                            時間
                        </Text>

                    </SubContainer>

                    {/* 列表內文外側 容器 */}
                    <SubContainer
                        theme={mobileM.listOutContainer}
                    >

                        {
                            (props?.DriverPunch ?? []).map((item, index) => {
                                return (
                                    <>
                                        {/* 列表內文 容器 */}
                                        <SubContainer
                                            theme={mobileM.listContainer}
                                        >
                                            {/* 打卡 內文 */}
                                            <Text
                                                theme={mobileM.hitCardText}
                                            >
                                                {(index + 1).toString().length < 2 ? "0" + (index + 1) : (index + 1)}
                                            </Text>

                                            {/* 時間 內文 */}
                                            <Text
                                                theme={mobileM.timeText}
                                            >
                                                {item.punchTime.split(' ')[1].substring(0, 5)}
                                            </Text>
                                        </SubContainer>
                                    </>
                                )
                            })
                        }


                    </SubContainer>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`