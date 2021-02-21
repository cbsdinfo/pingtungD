import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, Silder, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as User } from '../../../Assets/img/TodayTaskPage/User.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { todayTask: { rwd: { mobileM } } } } = Theme;
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
            <TitleBar />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
                {/* 司機名、打卡按鈕列 */}
                <BasicContainer
                    theme={mobileM.driverNameAndTickContainer}
                >
                    <User style={mobileM.driverNameIcon} />

                    {/* 司機名 */}
                    <Text theme={mobileM.driverNameText}  >
                        楊銘輝
                    </Text>

                    {/* 打卡按鈕 */}
                    <BasicButton
                        baseDefaultTheme={"PrimaryTheme"}
                        text={"打卡"}
                        theme={mobileM.TickBtn}
                        onClick={() => {

                        }}
                    />
                </BasicContainer>

                <BasicContainer
                    theme={{
                        basic: (style, props) => ({
                            ...style,
                            padding: "60px 0 0 0",
                            width: "100%"
                        })
                    }}
                >
                    {props?.TodayTask?.map((item, index) => {
                        return (
                            <TaskCard
                                data={item?.despatchOfCaseOrderDayViews}
                                // nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                needAction // 是否需要點即後，文字變成執行中
                                nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                                TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                                // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                                primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名

                                topContent={(data) => {
                                    console.log(data)
                                    return (
                                        <>
                                            {`${data.name}`}
                                        </>
                                    )
                                }}
                                bottomContent={(data) => {
                                    console.log(data)
                                    return (
                                        <>
                                            {/* <div style={{ height: "300px" }}>asdfsdf</div> */}
                                            {`${data.fromAddr}`}
                                        </>
                                    )
                                }}
                            />
                        )
                    })}
                    <BasicContainer>
                        <Silder text={"asd"} onToRight={() => { console.log("right") }} />
                    </BasicContainer>


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`