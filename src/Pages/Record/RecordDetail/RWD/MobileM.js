import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../../Store/Store'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { MainPageContainer, MapGoogle } from '../../../../ProjectComponent';
import { BasicContainer, Container, globalContextService, modalsService, NativeLineButton, OldTable, SubContainer, Tag, Text, Tooltip } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { ReactComponent as CaseMobileM } from '../../../../Assets/img/RecordDetailPage/CaseMobileM.svg'
import { ReactComponent as FleetMobileM } from '../../../../Assets/img/RecordDetailPage/FleetMobileM.svg'
import { ReactComponent as BusMobileM } from '../../../../Assets/img/RecordDetailPage/BusMobileM.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordDetailPage/Share.svg'
import { toString, isNil, isEmpty } from 'lodash';
import { getParseItemLocalStorage } from '../../../../Handlers';
import { posRemarksSelectOption } from '../../../../Mappings/Mappings';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { detail: { rwd: { mobileM } } } } } = Theme;
    const [, Height] = useWindowSize();

    let history = useHistory();

    // let props.case = "長照"
    // "長照", "共享車隊", "巴士"

    //#region 取消狀態分類
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
    //#endregion

    //#region 狀態分類
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
    //#endregion

    //#region 案件類型分類
    const switchCase = (key) => {
        switch (key) {
            case "長照":
                return (
                    <>
                        <CaseMobileM style={mobileM.caseSvg} />
                    </>
                );
            case "共享車隊":
                return (
                    <>
                        <FleetMobileM style={mobileM.caseSvg} />
                    </>
                );
            case "巴士":
                return (
                    <>
                        <BusMobileM style={mobileM.caseSvg} />
                    </>
                );
            default:
                return undefined
        }

    }
    //#endregion

    return (
        <>
            <MainPageContainer
                theme={mobileM.mainPageContainer}
                vh={Height}
                outSideTopComponent={
                    <>
                        <Container>
                            {/* 案件類型容器 */}
                            <Container
                                theme={mobileM.caseTypeContainer}
                            >
                                {switchCase(props.case)}
                            </Container>

                            {/* 案件標籤容器 */}
                            <Container
                                theme={mobileM.tagContainer}
                            >
                                {
                                    props.case !== "巴士"
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

                                {/* 狀態標籤 */}
                                <Tag
                                    baseDefaultTheme={"DefaultTheme"}
                                    theme={statusMapping(props.data?.status ?? 9, true)}
                                    text={statusMapping(props.data?.status ?? 9, false, props.data?.cancelReamrk)}
                                />

                            </Container>
                        </Container>

                        {/* 訂單編號 容器 */}
                        <Container
                            theme={mobileM.orderNumContainer}
                        >
                            {/* 訂單編號 標題 */}
                            <Text
                                theme={mobileM.orderNoTitle}
                            >
                                訂單編號

                                {/* 訂單編號 內文 */}
                                <Text
                                    theme={mobileM.orderNoText}
                                >
                                    {props.data?.orderNo}
                                </Text>
                            </Text>

                            {/* 預約搭乘時間 標題 */}
                            <Text
                                theme={mobileM.reserveDateTitle}
                            >
                                預約搭乘時間

                                {/* 預約搭乘時間 內文 */}
                                <Text
                                    theme={mobileM.reserveDateText}
                                >
                                    {props.data?.reserveDate}
                                </Text>

                            </Text>

                        </Container>
                    </>
                }
            >
                {/* 乘車明細容器 */}
                <BasicContainer
                    theme={mobileM.detailContainer}
                >
                    {/* 案件明細內容器 */}
                    <Container
                        theme={mobileM.insideContainer}
                    >
                        {/* 使用者名稱 UserName*/}
                        <Text
                            theme={mobileM.userName}
                        >
                            {props.data?.userName ?? getParseItemLocalStorage("DUserName")}
                        </Text>

                        {/* 案號檢核 */}
                        {
                            props.case === "長照"
                            &&
                            <>
                                {/* 案號 標題*/}
                                < Text
                                    theme={mobileM.caseNumberTitle}
                                >
                                    案號

                                            {/* 案號 內文*/}
                                    <Text
                                        theme={mobileM.caseNumberText}
                                    >
                                        {props.data?.caseNumber}
                                    </Text>
                                </Text>

                            </>
                        }

                        {/* 共乘容器 */}
                        <Container
                            caseflag={props.case !== "長照"}
                            theme={mobileM.shareContainer}
                        >
                            {/* 可否共乘檢核 */}
                            {
                                props.case !== "巴士"
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
                                            {props.data?.canShared ? "願意共乘" : "不願共乘"}
                                        </Text>
                                    </Text>
                                </>
                            }

                            {/* 人數 標題 */}
                            <Text
                                theme={mobileM.numberOfPeopleTitle}
                            >
                                人數

                                    {/* 人數 內文 */}
                                <Text
                                    theme={mobileM.numberOfPeopleText}
                                >
                                    {props.case === "長照" ? props.data?.familyWith : props.data?.passengerNum ?? 0}人
                                    </Text>
                            </Text>
                        </Container>

                    </Container>

                    {/* 司機 標題 */}
                    <Text
                        theme={mobileM.driverTitle}
                    >
                        司機

                                {/* 司機 內文 */}
                        <Text
                            theme={mobileM.driverText}
                        >
                            {props.data?.driverInfoName ?? "未排班"}
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
                            {props.data?.carNo ?? "未排班"}
                        </Text>
                    </Text>

                    {/* 服務單位 標題 */}
                    <Text
                        theme={mobileM.serviceUnitTitle}
                    >
                        服務單位

                            {/* 服務單位 內文 */}
                        <Tooltip placement="top" title={props.data?.orgName ?? "未排班"}>

                            <Text
                                theme={mobileM.serviceUnitText}
                            >
                                {props.data?.orgName ?? "未排班"}
                            </Text>
                        </Tooltip>
                    </Text>

                </BasicContainer>

                {/* 按鈕容器 */}
                <Container
                    theme={mobileM.buttonContainer}
                >
                    {/* 司機未到按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={mobileM.noExecuteButton}
                        onClick={() => {
                            //#region 打開司機未執行警示 Modal
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

                    {/* 再次預約按鈕 */}
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
                        再次預約
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

                </Container>

                {/* 車資容器 */}
                <Container
                    theme={mobileM.fareContainer}
                >
                    {/* 車資檢核 */}
                    {
                        props.case !== "共享車隊"
                        &&
                        <>
                            {/* 車資總額 標題 */}
                            <Text
                                caseflag={props.case !== "長照"}
                                theme={mobileM.totalFareTitle}
                            >
                                車資總額

                                            {/* 車資總額 內文 */}
                                <Text
                                    theme={mobileM.totalFareText}
                                >
                                    ${props.data?.totalAmt}
                                </Text>
                            </Text>

                            {/* 政府補助檢核 */}
                            {
                                props.case === "長照"
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
                                            ${props.data?.govSubsidy}
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
                                            ${props.data?.withAmt}
                                        </Text>
                                    </Text>
                                </>
                            }
                        </>
                    }

                    {/* 個案負擔 標題 */}
                    <Text
                        caseflag={props.case !== "長照"}
                        theme={mobileM.caseBurdenTitle}
                    >
                        {props.case === "長照"
                            ?
                            "個案負擔"
                            :
                            "用戶負擔"
                        }

                        {/* 個案負擔 內文 */}
                        <Text
                            theme={mobileM.caseBurdenText}
                        >
                            ${props.data?.caseBurden}
                        </Text>
                    </Text>

                </Container>

                {/* 乘客檢核 */}
                {
                    props.case !== "長照"
                    &&
                    <>
                        {/* 乘客容器 */}
                        <Container
                            theme={mobileM.passengerContainer}
                        >
                            {/* 乘客標題 */}
                            <Text
                                theme={mobileM.passengerTitle}
                            >
                                乘客
                                </Text>

                            {/* 乘客內文容器 */}
                            <Text
                                theme={mobileM.passengerTextContainer}
                            >
                                <Container>
                                    {

                                        (JSON.parse(isEmpty(props.data?.remark) ? "[]" : props.data.remark)).map((passenger, index) => {
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
                    </>
                }

                {/* 行程一覽容器 */}
                <SubContainer
                    theme={mobileM.strokeContainer}
                >
                    {/* 行程一覽 */}
                    <Text
                        theme={mobileM.stroke}
                    >
                        行程一覽
                    </Text>

                    <Container
                        theme={mobileM.shadowContainer}
                    >
                        {/* 預估距離 標題 */}
                        <Text
                            theme={mobileM.distanceTitle}
                        >
                            預估距離

                                {/* 預估距離 內文 */}
                            <Text
                                theme={mobileM.distanceText}
                            >
                                {(props.data?.totalMileage / 1000)}km
                            </Text>
                        </Text>

                        {/* 預估時間 標題 */}
                        <Text
                            theme={mobileM.timingTitle}
                        >
                            預估時間

                                {/* 預估時間 內文 */}
                            <Text
                                theme={mobileM.timingText}
                            >
                                {props.data?.expectedMinute}分鐘
                            </Text>
                        </Text>
                    </Container>

                    {/* 起訖點容器 */}
                    <SubContainer
                        theme={mobileM.startToEndContainer}
                    >
                        <Container
                            theme={mobileM.addressContainer}
                        >
                            {/* 起點 標題 */}
                            <Text
                                caseflag={props.case !== "長照"}
                                theme={mobileM.startPointTitle}
                            >
                                起 {posRemarksSelectOption.some(V => V.value === props.data.fromAddrRemark) ? `(${props.data?.fromAddrRemark})` : ""}
                            </Text>

                            {/* 起點 內文 */}
                            <Text
                                caseflag={props.case !== "長照"}
                                theme={mobileM.startPointText}
                            >
                                {props.case === "巴士" ? props.data?.fromStationName : props.data?.fromAddr}
                            </Text>

                        </Container>

                        {/* 備註檢核 */}
                        {
                            props.case === "長照" && !(posRemarksSelectOption.some(V => V.value === props.data.fromAddrRemark))
                            &&
                            <>
                                {/* 起點 備註 */}
                                <Text
                                    theme={mobileM.startPointnote}
                                >
                                    備註：{props.data.fromStationName}
                                </Text>
                            </>
                        }

                        <Container
                            theme={mobileM.addressContainer}
                        >
                            {/* 迄點 標題 */}
                            <Text
                                caseflag={props.case !== "長照"}
                                theme={mobileM.endPointTitle}
                            >

                                {/* 迄 {props.fromAddr ?? "(復健診所)"} */}
                                迄 {posRemarksSelectOption.some(V => V.value === props.data.toAddrRemark) ? `(${props.data?.toAddrRemark})` : ""}
                            </Text>

                            {/* 迄點 內文 */}
                            <Text
                                caseflag={props.case !== "長照"}
                                theme={mobileM.endPointText}
                            >
                                {props.case === "巴士" ? props.data?.toStationName : props.data?.toAddr}
                            </Text>
                        </Container>

                        {/* 備註檢核 */}
                        {
                            props.case === "長照" && !(posRemarksSelectOption.some(V => V.value === props.data.toAddrRemark))
                            &&
                            <>
                                {/* 迄點 備註 */}
                                <Text
                                    theme={mobileM.endPointnote}
                                >
                                    備註：{props.data.toAddrRemark}
                                </Text>
                            </>
                        }
                    </SubContainer>


                </SubContainer>

                {/* 行程表格容器 */}
                <SubContainer
                    theme={mobileM.strokeTableContainer}
                >
                    <OldTable
                        pagination={false}
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CaseCallCarComponentPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CaseCallCarComponentPage", "CheckedRowsData", checkedRows);
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
                                    title: '總額',
                                    width: "20%",
                                    dataIndex: 'totalAmt',
                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return !isNil(rowData) ? `$${rowData}` : ""
                                    }
                                },
                                {
                                    title: '補助',
                                    width: "20%",
                                    dataIndex: 'subsidyAmt',
                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return !isNil(rowData) ? `$${rowData}` : ""
                                    }
                                },
                                {
                                    title: '自負',
                                    width: "20%",
                                    dataIndex: 'selfPayAmt',
                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return !isNil(rowData) ? `$${rowData}` : ""
                                    }
                                },
                                {
                                    title: '陪同',
                                    width: "20%",
                                    dataIndex: 'withAmt',
                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        return !isNil(rowData) ? `$${rowData}` : ""
                                    }
                                },
                                {
                                    title: '個案負擔',
                                    width: "20%",
                                    // dataIndex: 'seatNum',
                                    // sorter: (a, b) => a.seatNum.length - b.seatNum.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (

                                            <Text
                                                theme={mobileM.redText}
                                            >
                                                {!isNil(rowData?.withAmt) ? `$${rowData?.withAmt + rowData?.selfPayAmt}` : ""}
                                            </Text>

                                        )
                                    }
                                },
                                {
                                    title: '',
                                    width: "0px",
                                    dataIndex: 'rightOccupy',
                                    fixed: 'right',
                                    sorter: false
                                },
                            ]
                            //#endregion
                        }
                        //sort
                        //showHeader={false}
                        data={[
                            props.data
                        ]}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.CaseOrderAmt}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </SubContainer>

                {/* 地圖容器 */}
                <SubContainer
                    theme={mobileM.mapContainer}
                >
                    <MapGoogle
                        mapId={"test1"}
                        mapAttr={{
                            //   maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                            center: { lat: 25.012930, lng: 121.474708 }, // 初始中心座標，格式為 [lng, lat]  // 25.012930, 121.474708
                            zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                            //   minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                            //   maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                            //   pitch: 0, // 攝影機仰角, 可省略, [0-60] // default 50
                            //   bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
                            //   attributionControl: false,
                        }}

                        theme={mobileM.map}
                    />
                </SubContainer>

                {/*  回列表按鈕 (標題列右方) 容器 */}
                <SubContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={mobileM.returnContainer}
                >
                    {/* 回列表按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={mobileM.returnButton}
                        onClick={() => {
                            history.push("/Record")
                        }}
                    >
                        回列表
                    </NativeLineButton>
                </SubContainer>
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
