import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, MapGoogle, QA } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as CaseLaptopL } from '../../../../Assets/img/RecordDetailPage/CaseLaptopL.svg'
import { ReactComponent as FleetLaptopL } from '../../../../Assets/img/RecordDetailPage/FleetLaptopL.svg'
import { ReactComponent as BusLaptopL } from '../../../../Assets/img/RecordDetailPage/BusLaptopL.svg'
import { ReactComponent as Share } from '../../../../Assets/img/RecordDetailPage/Share.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { toString, isNil, isEmpty } from 'lodash';
import { getParseItemLocalStorage } from '../../../../Handlers';
import isUndefined from 'lodash/isUndefined';
import { posRemarksSelectOption } from '../../../../Mappings/Mappings'

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { detail: { rwd: { laptopL } } } } } = Theme;
    const [Width, Height] = useWindowSize();
    let history = useHistory()

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
                return (getTheme ? laptopL.statusTag.newOrder : "新訂單");
            case "2":
                return (getTheme ? laptopL.statusTag.assignedOrder : "已排班");
            case "3":
                return (getTheme ? laptopL.statusTag.arrivalOrder : "抵達搭車地點");
            case "4":
                return (getTheme ? laptopL.statusTag.customUpOrder : "客上");
            case "5":
                return (getTheme ? laptopL.statusTag.finishedOrder : "已完成");
            case "9":
                return (getTheme ? laptopL.statusTag.unitCancleOrder : cancelStatus(cancelReamrk));
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
                        <CaseLaptopL style={laptopL.caseSvg} />
                    </>
                );
            case "共享車隊":
                return (
                    <>
                        <FleetLaptopL style={laptopL.caseSvg} />
                    </>
                );
            case "巴士":
                return (
                    <>
                        <BusLaptopL style={laptopL.caseSvg} />
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
                height={Height}
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
                {/* 乘車紀錄容器 */}
                <BasicContainer
                    height={Height}
                    theme={laptopL.detailContainer}
                >
                    {/* 乘車紀錄標題容器 */}
                    <SubContainer
                        theme={laptopL.titleContainer}
                    >
                        {/* 案件類型圖標 */}
                        {switchCase(props.case)}

                        <Container>
                            {/* 訂單編號 標題 */}
                            <Text
                                theme={laptopL.orderNoTitle}
                            >
                                訂單編號

                                {/* 訂單編號 內文 */}
                                <Text
                                    theme={laptopL.orderNoText}
                                >
                                    {props.data?.orderNo}
                                </Text>
                            </Text>

                            {/* 預約搭乘時間 標題 */}
                            <Text
                                theme={laptopL.reserveDateTitle}
                            >
                                預約搭乘時間

                                {/* 預約搭乘時間 內文 */}
                                <Text
                                    theme={laptopL.reserveDateText}
                                >
                                    {props.data?.reserveDate}
                                </Text>

                            </Text>

                        </Container>

                        {/* 乘車紀錄標題 右方容器 */}
                        <SubContainer
                            theme={laptopL.rightTitleContainer}
                        >
                            {
                                props.case !== "巴士"
                                &&
                                <>
                                    {/* 已共乘  ShareText*/}
                                    < Text
                                        theme={laptopL.shareText}
                                    >
                                        <Share
                                            style={laptopL.shareSvg}
                                        />
                                            已共乘
                                        </Text>
                                </>
                            }

                            {/* 狀態標籤 */}
                            <Tag
                                baseDefaultTheme={"DefaultTheme"}
                                theme={statusMapping(props.data.status ?? 9, true)}
                                text={statusMapping(props.data.status ?? 9, false, props.data.cancelReamrk)}
                            />
                        </SubContainer>

                    </SubContainer>

                    <Container>
                        {/* 案件明細容器 */}
                        <SubContainer
                            theme={laptopL.caseDetailContainer}
                        >
                            {/* 案件明細內容器 */}
                            <Container
                                theme={laptopL.insideContainer}
                            >
                                {/* 使用者名稱 UserName*/}
                                <Text
                                    theme={laptopL.userName}
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
                                            theme={laptopL.caseNumberTitle}
                                        >
                                            案號

                                            {/* 案號 內文*/}
                                            <Text
                                                theme={laptopL.caseNumberText}
                                            >
                                                {props.data?.caseNumber}
                                            </Text>
                                        </Text>

                                    </>
                                }

                                {/* 可否共乘檢核 */}
                                {
                                    props.case !== "巴士"
                                    &&
                                    <>
                                        {/* 可否共乘 標題 */}
                                        <Text
                                            theme={laptopL.canShareTitle}
                                        >
                                            可否共乘
                                            {/* 可否共乘 內文 */}
                                            <Text
                                                theme={laptopL.canShareText}
                                            >
                                                {props.data?.canShared ? "願意共乘" : "不願共乘"}
                                            </Text>
                                        </Text>
                                    </>
                                }

                                {/* 人數 標題 */}
                                <Text
                                    theme={laptopL.numberOfPeopleTitle}
                                >
                                    人數

                                    {/* 人數 內文 */}
                                    <Text
                                        theme={laptopL.numberOfPeopleText}
                                    >
                                        {props.case === "長照" ? props.data?.familyWith : props.data?.passengerNum}人
                                    </Text>
                                </Text>

                            </Container>

                            {/* 司機 標題 */}
                            <Text
                                theme={laptopL.driverTitle}
                            >
                                司機

                                {/* 司機 內文 */}
                                <Text
                                    theme={laptopL.driverText}
                                >
                                    {props.data?.driverInfoName ?? "未排班"}
                                </Text>
                            </Text>

                            {/* 車牌 標題 */}
                            <Text
                                theme={laptopL.licensePlateTitle}
                            >
                                車牌

                                {/* 車牌 內文 */}
                                <Text
                                    theme={laptopL.licensePlateText}
                                >
                                    {props.data?.carNo ?? "未排班"}
                                </Text>
                            </Text>

                            {/* 服務單位 標題 */}
                            <Text
                                theme={laptopL.serviceUnitTitle}
                            >
                                服務單位

                            {/* 服務單位 內文 */}
                                <Tooltip placement="top" title={props.data?.orgName ?? "未排班"}>

                                    <Text
                                        theme={laptopL.serviceUnitText}
                                    >
                                        {props.data?.orgName ?? "未排班"}
                                    </Text>
                                </Tooltip>
                            </Text>


                        </SubContainer>

                        {/* 按鈕容器 */}
                        <SubContainer
                            theme={laptopL.buttonContainer}
                        >
                            {/* 分隔容器 */}
                            <Container
                                caseflag={props.case !== "長照"}
                                theme={laptopL.separateContainer}
                            >
                                {/* 按鈕內容器 */}
                                <Container
                                    theme={laptopL.buttonInsideContainer}
                                >
                                    {/* 司機未到按鈕 */}
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // 防止提交
                                        theme={laptopL.noExecuteButton}
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
                                        theme={laptopL.againButton}
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
                                        theme={laptopL.questionnaireButton}
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
                                    caseflag={props.case !== "長照"}
                                    theme={laptopL.fareContainer}
                                >
                                    {/* 車資檢核 */}
                                    {
                                        props.case !== "共享車隊"
                                        &&
                                        <>
                                            {/* 車資總額 標題 */}
                                            <Text
                                                caseflag={props.case !== "長照"}
                                                theme={laptopL.totalFareTitle}
                                            >
                                                車資總額

                                            {/* 車資總額 內文 */}
                                                <Text
                                                    theme={laptopL.totalFareText}
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
                                                        theme={laptopL.govSubsidyTitle}
                                                    >
                                                        政府補助

                                                        {/* 政府補助 內文 */}
                                                        <Text
                                                            theme={laptopL.govSubsidyText}
                                                        >
                                                            ${props.data?.govSubsidy}
                                                        </Text>
                                                    </Text>

                                                    {/* 陪同金額 標題 */}
                                                    <Text
                                                        theme={laptopL.accompanyingAmountTitle}
                                                    >
                                                        陪同金額

                                                        {/* 陪同金額 內文 */}
                                                        <Text
                                                            theme={laptopL.accompanyingAmountText}
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
                                        theme={laptopL.caseBurdenTitle}
                                    >
                                        {props.case === "長照"
                                            ?
                                            "個案負擔"
                                            :
                                            "用戶負擔"
                                        }

                                        {/* 個案負擔 內文 */}
                                        <Text
                                            theme={laptopL.caseBurdenText}
                                        >
                                            ${props.data?.caseBurden}
                                        </Text>
                                    </Text>

                                </Container>
                            </Container>

                            {/* 乘客檢核 */}
                            {
                                props.case !== "長照"
                                &&
                                <>
                                    {/* 乘客容器 */}
                                    <Container
                                        theme={laptopL.passengerContainer}
                                    >
                                        {/* 乘客標題 */}
                                        <Text
                                            theme={laptopL.passengerTitle}
                                        >
                                            乘客
                                        </Text>

                                        {/* 乘客內文容器 */}
                                        <Text
                                            theme={laptopL.passengerTextContainer}
                                        >
                                            {

                                                (JSON.parse(isEmpty(props.data?.remark) ? "[]" : props.data.remark)).map((passenger, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {/* 乘客 內文 */}
                                                            <Text
                                                                theme={laptopL.passengerText}
                                                            >
                                                                {passenger.name}

                                                            </Text>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }

                                        </Text>
                                    </Container>
                                </>
                            }

                        </SubContainer>

                    </Container>

                    {/* 行程一覽容器 */}
                    <SubContainer
                        theme={laptopL.strokeContainer}
                    >
                        {/* 行程一覽 */}
                        <Text
                            theme={laptopL.stroke}
                        >
                            行程一覽
                       </Text>

                        {/* 預估距離 標題 */}
                        <Text
                            theme={laptopL.distanceTitle}
                        >
                            預估距離

                                {/* 預估距離 內文 */}
                            <Text
                                theme={laptopL.distanceText}
                            >
                                {(props.data.totalMileage / 1000)}km
                            </Text>
                        </Text>

                        {/* 預估時間 標題 */}
                        <Text
                            theme={laptopL.timingTitle}
                        >
                            預估時間

                                {/* 預估時間 內文 */}
                            <Text
                                theme={laptopL.timingText}
                            >
                                {props.data?.expectedMinute}分鐘
                            </Text>
                        </Text>


                    </SubContainer>

                    <Container>
                        {/* 起訖點容器 */}
                        <SubContainer
                            theme={laptopL.startToEndContainer}
                        >
                            <Container
                                theme={laptopL.addressContainer}
                            >
                                {/* 起點 標題 */}
                                <Text
                                    theme={laptopL.startPointTitle}
                                >
                                    起 {posRemarksSelectOption.some(V => V.value === props.data.fromAddrRemark) ? `(${props.data?.fromAddrRemark})` : ""}
                                    {/* 起 */}
                                </Text>

                                {/* 起點 內文 */}
                                <Text
                                    theme={laptopL.startPointText}
                                >
                                    {props.case === "巴士" ? props.data.fromStationName : props.data.fromAddr}
                                </Text>

                            </Container>
                            {/* 備註檢核 */}
                            {
                                props.case === "長照" && !(posRemarksSelectOption.some(V => V.value === props.data.fromAddrRemark))
                                &&
                                <>
                                    {/* 起點 備註 */}
                                    <Text
                                        theme={laptopL.startPointnote}
                                    >
                                        備註：{props.data.fromStationName}
                                    </Text>
                                </>
                            }

                            <Container
                                theme={laptopL.addressContainer}
                            >
                                {/* 迄點 標題 */}
                                <Text
                                    theme={laptopL.endPointTitle}
                                >

                                    迄 {posRemarksSelectOption.some(V => V.value === props.data.toAddrRemark) ? `(${props.data?.toAddrRemark})` : ""}
                                    {/* 迄 */}
                                </Text>

                                {/* 迄點 內文 */}
                                <Text
                                    theme={laptopL.endPointText}
                                >
                                    {props.case === "巴士" ? props.data.toStationName : props.data.toAddr}
                                </Text>
                            </Container>

                            {/* 備註檢核 */}
                            {
                                props.case === "長照" && !(posRemarksSelectOption.some(V => V.value === props.data.toAddrRemark))
                                &&
                                <>
                                    {/* 迄點 備註 */}
                                    <Text
                                        theme={laptopL.endPointnote}
                                    >
                                        備註：{props.data.toAddrRemark}
                                    </Text>
                                </>
                            }
                        </SubContainer>

                        {/* 行程表格容器 */}
                        <SubContainer
                            theme={laptopL.strokeTableContainer}
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
                                                        theme={laptopL.redText}
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
                                data={[props.data]}
                                // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                // data={props.CaseOrderAmt}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </SubContainer>
                    </Container>

                    {/* 地圖容器 */}
                    <SubContainer
                        theme={laptopL.mapContainer}
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

                            theme={laptopL.map}
                        />
                    </SubContainer>

                </BasicContainer>

                {/*  回列表按鈕 (標題列右方) 容器 */}
                <SubContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.returnContainer}
                >
                    {/* 回列表按鈕 */}
                    <NativeLineButton
                        baseDefaultTheme={"DefaultTheme"}
                        disable={false}
                        type="button" // 防止提交
                        theme={laptopL.returnButton}
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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`