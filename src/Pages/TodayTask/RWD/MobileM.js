import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as User } from '../../../Assets/img/TodayTaskPage/User.svg'
import { ReactComponent as Clock } from '../../../Assets/img/TodayTaskPage/Clock.svg'
import { ReactComponent as Arrow } from '../../../Assets/img/TodayTaskPage/Arrow.svg'
import { ReactComponent as Start } from '../../../Assets/img/TodayTaskPage/Start.svg'
import { ReactComponent as End } from '../../../Assets/img/TodayTaskPage/End.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';
import { getParseItemLocalStorage } from '../../../Handlers';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { todayTask: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();

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
                        {getParseItemLocalStorage("DUserName")}
                    </Text>

                    {/* 打卡按鈕 */}
                    <BasicButton
                        baseDefaultTheme={"PrimaryTheme"}
                        text={"打卡"}
                        theme={mobileM.TickBtn}
                        onClick={() => {
                            props.AddDriverPunchExecute({
                                driverId: getParseItemLocalStorage("DriverID"),
                                punchType: 3
                            })
                        }}
                    />
                </BasicContainer>

                <BasicContainer
                    theme={mobileM.cardOutContainer}
                >
                    {props?.TodayTask?.map((item, index) => {
                        return (
                            <TaskCard
                                key={index}

                                data={item?.despatchOfCaseOrderDayViews} // 調度單資料
                                // nameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                timeNameType // timeNameType、nameType 顯示名字、或顯示時間與名字
                                needAction // 是否需要點即後，文字變成執行中
                                nameKeyName={"name"} // nameKeyName 對應資料 名字 的 key 名
                                TimeKeyName={"reserveDate"} // TimeKeyName 對應資料 時間 的 key 名
                                // callBackKeyName 有需要回調 則在資料中補上回調，並指定 key名
                                primaryKey={"orderId"}// primaryKey 對應資料 唯一鍵 的 key 名
                                // defaultUsePrimaryKey={props?.defaultPrimary} // 初始要使用的分頁 (值要對應到 primaryKey)

                                topContent={(data) => {
                                    // console.log(data)
                                    return (
                                        <>
                                            {/* 乘車時間 */}
                                            <Text
                                                theme={mobileM.reserveDateText}
                                            >
                                                <Clock style={mobileM.clockSvg} />

                                                {`${data.reserveDate.split(' ')[1].substring(0, 5)}`}
                                            </Text>
                                        </>
                                    )
                                }}
                                bottomContent={(data) => {
                                    // console.log(data)
                                    return (
                                        <>
                                            <Container
                                                onClick={() => {
                                                    history.push(`/PerDespatch?despatch=${data.despatchNo}&defaultPrimary=${data.orderId}`)
                                                }}
                                            >
                                                {/* 上方容器 */}
                                                <Container>

                                                    {/* 乘客名稱 容器 */}
                                                    <SubContainer
                                                        theme={mobileM.nameContainer}
                                                    >
                                                        {/* 乘客名稱 */}
                                                        <Text
                                                            theme={mobileM.nameText}
                                                        // onClick={() => {
                                                        //     history.push(`/PerDespatch?despatch=${data.despatchNo}&defaultPrimary=${data.orderId}`)
                                                        // }}
                                                        >
                                                            {data.name}

                                                            <Arrow style={mobileM.arrowSvg} />

                                                            {/* 輪椅 */}
                                                            <Text
                                                                theme={mobileM.wheelchairTypeText}
                                                            >
                                                                {data.wheelchairType}
                                                            </Text>
                                                        </Text>

                                                    </SubContainer>

                                                    {/* 陪同人數 容器 */}
                                                    <SubContainer
                                                        theme={mobileM.withContainer}
                                                    >
                                                        {/* 陪同人數 */}
                                                        <Text
                                                            theme={mobileM.withCount}
                                                        >
                                                            {data.familyWith}

                                                            {/* 預估陪同 */}
                                                            <Text
                                                                theme={mobileM.withText}
                                                            >
                                                                {"預估陪同"}
                                                            </Text>
                                                        </Text>

                                                    </SubContainer>

                                                </Container>

                                                {/* 下方容器 */}
                                                <SubContainer
                                                    theme={mobileM.addrContainer}
                                                >
                                                    {/* 起點 */}
                                                    <Text
                                                        theme={mobileM.fromAddrText}
                                                    >
                                                        {/* 起點圖標 */}
                                                        <Start style={mobileM.startSvg} />

                                                        {data.fromAddr}

                                                        {/* 起點備註 */}
                                                        <Text
                                                            theme={mobileM.fromAddrRemarkText}
                                                        >
                                                            {`(${data.fromAddrRemark})`}
                                                        </Text>
                                                    </Text>

                                                    {/* 迄點 */}
                                                    <Text
                                                        theme={mobileM.toAddrText}
                                                    >

                                                        {/* 迄點圖標 */}
                                                        <End style={mobileM.EndSvg} />

                                                        {data.toAddr}

                                                        {/* 迄點備註 */}
                                                        <Text
                                                            theme={mobileM.toAddrRemarkText}
                                                        >
                                                            {`(${data.toAddrRemark})`}
                                                        </Text>
                                                    </Text>

                                                </SubContainer>

                                            </Container>
                                        </>
                                    )
                                }}
                            />
                        )
                    })}


                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`