import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/RecordPage/NoData.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordPage/Share.svg'
import { ReactComponent as Start } from '../../../../Assets/img/RecordPage/Start.svg'
import { ReactComponent as End } from '../../../../Assets/img/RecordPage/End.svg'
import { ReactComponent as Case } from '../../../../Assets/img/RecordPage/CaseMobileM.svg'
import { ReactComponent as Fleet } from '../../../../Assets/img/RecordPage/FleetMobileM.svg'
import { ReactComponent as Bus } from '../../../../Assets/img/RecordPage/BusMobileM.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, RangeDateTimePicker, Tag, Tooltip, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { CardTable } from '../../../../ProjectComponent'
import moment from 'moment';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { fmt } from '../../../../Handlers/DateHandler';
import { isEqual, isEmpty, toString, isUndefined } from 'lodash';
import { getParseItemLocalStorage } from '../../../../Handlers';


const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { allRecordComponent: { rwd: { mobileM } } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();


    const switchCase = (key) => {
        switch (key) {
            case "長照":
                return (
                    <>
                        <Case style={mobileM.caseSvg} />
                    </>
                );
            case "共享車隊":
                return (
                    <>
                        <Fleet style={mobileM.caseSvg} />
                    </>
                );
            case "巴士":
                return (
                    <>
                        <Bus style={mobileM.caseSvg} />
                    </>
                );
            default:
                return undefined
        }

    }
    //#endregion

    return (
        <>
            {props.data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        theme={mobileM.noDataContainer}
                    >
                        <NoData style={mobileM.noDataSvg} />
                    </BasicContainer>
                </>
                :
                <>
                    <Container>
                        <CardTable
                            dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                            dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                                if (globalContextService.get("RecordPage", "orgId") !== globalContextService.get("RecordPage", "TableCheckedClearKey")) {
                                    globalContextService.remove("RecordPage", "CheckedRowKeys");
                                    globalContextService.remove("RecordPage", "CheckedRowsData");
                                }
                            }}
                            checkbox={false}
                            checked={globalContextService.get("RecordPage", "CheckedRowKeys") && globalContextService.get("RecordPage", "CheckedRowKeys")}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("RecordPage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("RecordPage", "CheckedRowsData", checkedRows);
                                    //#region 必須要在勾選項"有異動"之後除˙存一個可判斷值，以保持"已異動勾選項"不被重置
                                    //#endregion
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // 對應CheckBox當列資料
                                    // disabled: record.name === 'Edrward 11',
                                }
                            }}
                            //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                            //scrollAreaHeight={"calc( 100% - 55px )"}
                            columnsAttr={
                                //#region 資料欄設定
                                [
                                    {
                                        // title: '用戶列表',
                                        width: "100%",
                                        dataIndex: '',
                                        // sorter: (a, b) => a.carType.length - b.carType.length,
                                        // fixed: 'left',
                                        render: (rowData) => {
                                            const cancelStatus = (status) => {
                                                switch (toString(status)) {
                                                    case "SYS_ORDERCANCEL_REMARK_ADMIN":
                                                        return "單位取消";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT":
                                                        return "個案取消";
                                                    case "SYS_ORDERCANCEL_REMARK_DRIVER":
                                                        return "空趟";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT_NOTARRIVED":
                                                        return "司機未到";
                                                    case "SYS_ORDERCANCEL_REMARK_CLIENT_NOORG":
                                                        return "無派車";
                                                    default:
                                                        return "已取消";
                                                }
                                            }

                                            const statusMapping = (status, getTheme = false, cancelReamrk = "") => {
                                                switch (toString(status)) {
                                                    case "1":
                                                        return (getTheme ? mobileM.statusTag.newOrder : "新訂單");
                                                    case "2":
                                                        return (getTheme ? mobileM.statusTag.assignedOrder : "已排班");
                                                    case "3":
                                                        return (getTheme ? mobileM.statusTag.arrivalOrder : "抵達搭車地點");
                                                    case "4":
                                                        return (getTheme ? mobileM.statusTag.customUpOrder : "客上");
                                                    case "5":
                                                        return (getTheme ? mobileM.statusTag.finishedOrder : "已完成");
                                                    case "9":
                                                        return (getTheme ? mobileM.statusTag.unitCancleOrder : cancelStatus(cancelReamrk));
                                                    default:
                                                        return (getTheme ? {} : "無此狀態");
                                                }
                                            }

                                            return (
                                                <>
                                                    {/* 卡片資料表單區容器 */}
                                                    < BasicContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={mobileM.cardContainer}
                                                    >
                                                        <Container>

                                                            {/* 第一區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.firstAreaContainer}
                                                            >
                                                                {
                                                                    switchCase(props.nowTab)
                                                                }

                                                                {/* 使用者名稱 UserName*/}
                                                                <Text
                                                                    theme={mobileM.userName}
                                                                >
                                                                    {rowData?.userName ?? getParseItemLocalStorage("DUserName")}


                                                                    {props.nowTab === "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 案號 標題*/}
                                                                            <Text
                                                                                theme={mobileM.caseNumberTitle}
                                                                            >
                                                                                案號
                                                                            {/* 案號 內文*/}
                                                                                <Text
                                                                                    theme={mobileM.caseNumberText}
                                                                                >
                                                                                    {rowData?.caseNumber}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }


                                                                </Text>

                                                                {props.nowTab !== "巴士"
                                                                    &&
                                                                    <>
                                                                        {/* 已共乘  ShareText*/}
                                                                        < Text
                                                                            theme={mobileM.shareText}
                                                                        >
                                                                            <Share
                                                                                style={mobileM.shareSvg}
                                                                            />
                                                                                已共乘
                                                                            </Text>
                                                                    </>
                                                                }

                                                                <Tag
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    theme={statusMapping(rowData.status, true)}
                                                                    text={statusMapping(rowData.status, false, rowData.cancelReamrk)}
                                                                />



                                                            </SubContainer>


                                                            {/* 第二區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.secondAreaContainer}
                                                            >
                                                                {/* 訂單編號 標題 */}
                                                                <Text
                                                                    theme={mobileM.orderNumberTitle}
                                                                >
                                                                    訂單編號

                                                                        {/* 訂單編號 內文 */}
                                                                    <Text
                                                                        theme={mobileM.orderNumberText}
                                                                    >
                                                                        {rowData?.orderNo}
                                                                    </Text>
                                                                </Text>

                                                                {/* 預約搭乘時間 標題 */}
                                                                <Text
                                                                    theme={mobileM.bookRideTitle}
                                                                >
                                                                    預約搭乘時間

                                                                    {/* 預約搭乘時間 內文 */}
                                                                    <Text
                                                                        theme={mobileM.bookRideText}
                                                                    >
                                                                        {rowData?.reserveDate}
                                                                    </Text>
                                                                </Text>

                                                                {/* 司機 標題 */}
                                                                <Text
                                                                    theme={mobileM.driverTitle}
                                                                >
                                                                    司機

                                                                    {/* 司機 內文 */}
                                                                    <Text
                                                                        theme={mobileM.driverText}
                                                                    >
                                                                        {rowData?.driverInfoName ?? "未排班"}
                                                                    </Text>
                                                                </Text>

                                                                {/* 車牌 標題 */}
                                                                <Text
                                                                    theme={mobileM.licensePlateTitle}
                                                                >
                                                                    車牌

                                                                    {/* 車牌 內文 */}
                                                                    <Text
                                                                        theme={mobileM.licensePlateText}
                                                                    >
                                                                        {rowData?.carNo ?? "未排班"}
                                                                    </Text>
                                                                </Text>



                                                            </SubContainer>


                                                            {/* 第三區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.thirdAreaContainer}
                                                            >
                                                                {/* 第三區塊上層 容器 */}
                                                                <Container
                                                                    theme={mobileM.thirdAreaTopContainer}
                                                                >

                                                                    {props.nowTab === "共享車隊"
                                                                        &&
                                                                        <>
                                                                            {/* 可否共乘 特別版 標題 */}
                                                                            <Text
                                                                                theme={mobileM.specialCanShareTitle}
                                                                            >
                                                                                可否共乘

                                                                                {/* 可否共乘 特別版 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.specialCanShareText}
                                                                                >
                                                                                    {rowData?.canShared ? "願意共乘" : "不願共乘"}
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }

                                                                    {props.nowTab !== "長照"
                                                                        &&
                                                                        <>
                                                                            {/* 人數 特別版 標題 */}
                                                                            <Text
                                                                                theme={mobileM.specialNumberOfPeopleTitle}
                                                                            >
                                                                                人數

                                                                            {/* 人數 特別版 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.specialNumberOfPeopleText}
                                                                                >
                                                                                    {rowData?.passengerNum}人
                                                                                </Text>
                                                                            </Text>
                                                                        </>
                                                                    }

                                                                    {props.nowTab !== "共享車隊"
                                                                        &&
                                                                        <>
                                                                            {/* 車資總額 標題 */}
                                                                            <Text
                                                                                theme={mobileM.totalFareTitle}
                                                                            >
                                                                                車資總額

                                                                                {/* 車資總額 內文 */}
                                                                                <Text
                                                                                    theme={mobileM.totalFareText}
                                                                                >
                                                                                    ${rowData?.totalAmt ?? 0}
                                                                                </Text>
                                                                            </Text>

                                                                            {props.nowTab === "長照"
                                                                                &&
                                                                                <>
                                                                                    {/* 政府補助 標題 */}
                                                                                    <Text
                                                                                        theme={mobileM.govSubsidyTitle}
                                                                                    >
                                                                                        政府補助

                                                                                    {/* 政府補助 內文 */}
                                                                                        <Text
                                                                                            theme={mobileM.govSubsidyText}
                                                                                        >
                                                                                            ${rowData?.govSubsidy ?? 0}
                                                                                        </Text>
                                                                                    </Text>

                                                                                    {/* 陪同金額 標題 */}
                                                                                    <Text
                                                                                        theme={mobileM.accompanyingAmountTitle}
                                                                                    >
                                                                                        陪同金額

                                                                                {/* 陪同金額 內文 */}
                                                                                        <Text
                                                                                            theme={mobileM.accompanyingAmountText}
                                                                                        >
                                                                                            ${rowData?.withAmt ?? 0}
                                                                                        </Text>
                                                                                    </Text>
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                    {/* 個案負擔 標題 */}
                                                                    <Text
                                                                        theme={mobileM.caseBurdenTitle}
                                                                    >
                                                                        {props.nowTab === "長照"
                                                                            ?
                                                                            "個案負擔"
                                                                            :
                                                                            "用戶負擔"
                                                                        }

                                                                        {/* 個案負擔 內文 */}
                                                                        <Text
                                                                            theme={mobileM.caseBurdenText}
                                                                        >
                                                                            ${rowData?.caseBurden ?? 0}
                                                                        </Text>
                                                                    </Text>

                                                                </Container>

                                                                {props.nowTab === "長照"
                                                                    &&
                                                                    <>
                                                                        {/* 可否共乘 標題 */}
                                                                        <Text
                                                                            theme={mobileM.canShareTitle}
                                                                        >
                                                                            可否共乘

                                                                                {/* 可否共乘 內文 */}
                                                                            <Text
                                                                                theme={mobileM.canShareText}
                                                                            >
                                                                                {rowData?.canShared ? "願意共乘" : "不願共乘"}
                                                                            </Text>
                                                                        </Text>



                                                                        {/* 人數 標題 */}
                                                                        <Text
                                                                            theme={mobileM.numberOfPeopleTitle}
                                                                        >
                                                                            人數

                                                                        {/* 人數 內文 */}
                                                                            <Text
                                                                                theme={mobileM.numberOfPeopleText}
                                                                            >
                                                                                {rowData?.familyWith}人
                                                                            </Text>
                                                                        </Text>
                                                                    </>
                                                                }


                                                                {/* 服務單位 標題 */}
                                                                <Text
                                                                    theme={mobileM.serviceUnitTitle}
                                                                >
                                                                    服務單位

                                                                    {/* 服務單位 內文 */}
                                                                    <Tooltip placement="top" title={rowData?.orgName ?? "未排班"}>

                                                                        <Text
                                                                            theme={mobileM.serviceUnitText}
                                                                        >
                                                                            {rowData?.orgName ?? "未排班"}
                                                                        </Text>
                                                                    </Tooltip>

                                                                </Text>

                                                                {props.nowTab !== "長照"
                                                                    &&
                                                                    <Container>

                                                                        {/* 乘客 標題 */}
                                                                        <Text
                                                                            theme={mobileM.passengerTitle}
                                                                        >
                                                                            乘客
                                                                        </Text>

                                                                        {/* 乘客 內文 容器*/}
                                                                        <Text
                                                                            theme={mobileM.passengerContainer}
                                                                        >
                                                                            <Container>
                                                                                {
                                                                                    (JSON.parse(isEmpty(rowData?.remark) ? "[]" : rowData.remark)).map((passenger, index) => {
                                                                                        return (
                                                                                            <React.Fragment key={index}>
                                                                                                {/* 乘客 內文 */}
                                                                                                <Text
                                                                                                    theme={mobileM.passengerText}
                                                                                                >
                                                                                                    {passenger.name}

                                                                                                </Text>
                                                                                            </React.Fragment>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </Container>
                                                                        </Text>

                                                                    </Container>
                                                                }

                                                                <Container
                                                                    theme={mobileM.startToEndContainer}
                                                                >
                                                                    {/* 起點 標題 */}
                                                                    <Text
                                                                        theme={mobileM.startPointTitle}
                                                                    >

                                                                        <Start style={mobileM.startPointSvg} />
                                                                            起點
                                                                    </Text>

                                                                    {/* 起點 內文 */}
                                                                    <Text
                                                                        theme={mobileM.startPointText}
                                                                    >
                                                                        {props.nowTab === "巴士" ? rowData?.fromStationName : rowData?.fromAddr}
                                                                    </Text>

                                                                    {/* 迄點 標題 */}
                                                                    <Text
                                                                        theme={mobileM.endPointTitle}
                                                                    >

                                                                        <End style={mobileM.endPointSvg} />
                                                                            迄點
                                                                    </Text>

                                                                    {/* 迄點 內文 */}
                                                                    <Text
                                                                        theme={mobileM.endPointText}
                                                                    >
                                                                        {props.nowTab === "巴士" ? rowData?.toStationName : rowData?.toAddr}
                                                                    </Text>

                                                                </Container>

                                                            </SubContainer>

                                                            {/* 第四區塊 容器 */}
                                                            <SubContainer
                                                                theme={mobileM.forthAreaContainer}
                                                            >
                                                                {/* 司機未到按鈕 */}
                                                                <NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // 防止提交
                                                                    theme={mobileM.noExecuteButton}
                                                                    onClick={() => {
                                                                        //#region 打開司機未到警示 Modal
                                                                        modalsService.infoModal.warn({
                                                                            iconRightText: "確定司機未到?",
                                                                            yes: true,
                                                                            yesText: "確認",
                                                                            no: true,
                                                                            noText: "取消",
                                                                            // autoClose: true,
                                                                            backgroundClose: false,
                                                                            yesOnClick: (e, close) => { close(); },
                                                                            noOnClick: (e, close) => { },
                                                                        })
                                                                        // endregion
                                                                    }}
                                                                >
                                                                    司機未到
                                                                </NativeLineButton>


                                                                {props.nowTab !== "巴士"
                                                                    &&
                                                                    <>
                                                                        {/* 再叫一次按鈕 */}
                                                                        <NativeLineButton
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            disable={false}
                                                                            type="button" // 防止提交
                                                                            theme={mobileM.againButton}
                                                                            onClick={() => {
                                                                                // history.push("/Order/WhiteOrder");
                                                                                // props.controllGCS("return")
                                                                            }}
                                                                        >
                                                                            再叫一次
                                                                            </NativeLineButton>
                                                                    </>
                                                                }

                                                                {/* 乘車明細按鈕 */}
                                                                <NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // 防止提交
                                                                    theme={mobileM.rideDetailsButton}
                                                                    onClick={() => {
                                                                        history.push(`/Record/Detail?CaseId=${rowData.id}&&case=${props.nowTab}`);
                                                                    }}
                                                                >
                                                                    乘車明細
                                                                    </NativeLineButton>

                                                                {/* 填寫問卷按鈕 */}
                                                                <NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // 防止提交
                                                                    theme={mobileM.questionnaireButton}
                                                                    onClick={() => {
                                                                        // history.push("/Order/WhiteOrder");
                                                                        // props.controllGCS("return")
                                                                    }}
                                                                >
                                                                    填寫問卷
                                                                        </NativeLineButton>

                                                            </SubContainer>

                                                        </Container>
                                                    </BasicContainer>
                                                </>
                                            )
                                        }
                                    },

                                ]
                                //#endregion
                            }
                            //sort
                            showHeader={false}
                            data={props.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </Container>

                    {props.data.length <= 10
                        &&
                        <>
                            {/* 沒有更多訂單檢視 提醒 */}
                            <Text
                                theme={mobileM.noDataTip}
                            >
                                沒有更多訂單檢視
                            </Text>
                        </>
                    }
                </>

            }
        </>

    )
}


export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
