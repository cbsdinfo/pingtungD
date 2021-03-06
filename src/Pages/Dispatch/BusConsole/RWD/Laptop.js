import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, MainPageSubTitleBar, DispatchTable, CarOrder, BusOrderEditTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker, NewSelector, DateTimePicker } from '../../../../Components';
import { ReactComponent as OrderCarType } from '../../../../Assets/img/BusConsolePage/OrderCarType.svg'
import { ReactComponent as OrderCanShare } from '../../../../Assets/img/BusConsolePage/OrderCanShare.svg'
import { ReactComponent as OrderNoShare } from '../../../../Assets/img/BusConsolePage/OrderNoShare.svg'
import { ReactComponent as OrderEnd } from '../../../../Assets/img/BusConsolePage/OrderEnd.svg'
import { ReactComponent as OrderStart } from '../../../../Assets/img/BusConsolePage/OrderStart.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/BusConsolePage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/BusConsolePage/TableStart.svg'
import { ReactComponent as TakeNum } from '../../../../Assets/img/BusConsolePage/TakeNum.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import { isEqual, isNil, toString } from 'lodash/lang';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { busConsole: { rwd: { laptop } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("CarUsedPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* ????????? */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"?????????????????????"}
                            theme={laptop.titleBar}
                            onSubmit={(e) => {
                                console.log("???????????????????????????")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            {/*  ?????????????????? (???????????????) ?????? */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* ?????????????????? */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptop.mulRosterButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let checkedRowKeys = globalContextService.get("BusConsolePage", "CheckedRowKeys");
                                        let checkedRowsData = globalContextService.get("BusConsolePage", "CheckedRowsData");

                                        //#region ?????????????????????
                                        if (((checkedRowsData?.length ?? 0) === 0) || ((checkedRowsData?.length ?? 0) < 2)) {
                                            modalsService.infoModal.error({
                                                iconRightText: "????????????????????????????????????????????????",
                                                yes: true,
                                                yesText: "??????",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        //#endregion
                                        //#region ???????????????
                                        else {
                                            //#region ?????? ???????????? Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "????????????",
                                                yes: true,
                                                yesText: "??????",
                                                no: true,
                                                noText: "??????",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                noOnClick: (e) => {
                                                    props.controllGCS("mulRosterModalClose")
                                                },
                                                yesOnClick: (e, close) => {
                                                    //#region ????????????
                                                    let validMsg = "";
                                                    if (valid(globalContextService.get("BusConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("BusConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("BusConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("BusConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                    }
                                                    //#endregion

                                                    //#region ?????????????????????
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("BusConsolePage"))
                                                        modalsService.infoModal.error({
                                                            id: "top1", //?????? ?????????????????????id
                                                            iconRightText: validMsg,
                                                            yes: true,
                                                            yesText: "??????",
                                                            // no: true,
                                                            // autoClose: true,
                                                            backgroundClose: false,
                                                            yesOnClick: (e, close) => {
                                                                close();
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        props.RosterOrderExecute({
                                                            id: checkedRowKeys,
                                                            carId: globalContextService.get("BusConsolePage", `MulRosterOrderCar`)?.value,
                                                            carNo: globalContextService.get("BusConsolePage", `MulRosterOrderCar`)?.data?.carNo,
                                                            driverInfoId: globalContextService.get("BusConsolePage", `MulRosterOrderDriver`)?.value,
                                                            driverInfoName: globalContextService.get("BusConsolePage", `MulRosterOrderDriver`)?.data?.userName,
                                                        });
                                                        close();
                                                    }
                                                    //#endregion
                                                },
                                                closeIconOnClick: (e) => {
                                                    props.controllGCS("mulRosterModalClose")
                                                },
                                                content: (
                                                    <FormContainer
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                        theme={laptop.editFormContainer}
                                                    >
                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                            {/* ???????????? - ?????? MulRosterOrderDriver */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"??????"}
                                                                bottomLabel={""}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"???????????????"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("BusConsolePage", `MulRosterOrderDriver`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("BusConsolePage", `MulRosterOrderDriver`, value)
                                                                    // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                    ...props.DriverInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptop.mulRosterOrderDriver}
                                                            />

                                                            {/* ???????????? - ?????? MulRosterOrderCar */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"??????"}
                                                                bottomLabel={""}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={"???????????????"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("BusConsolePage", `MulRosterOrderCar`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("BusConsolePage", `MulRosterOrderCar`, value)
                                                                    // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                    ...props.CarInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptop.mulRosterOrderCar}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptop.mulRosterModal
                                            })
                                            //#endregion

                                        }
                                        //#endregion
                                    }}
                                >
                                    ????????????
                                </NativeLineButton>
                            </SubContainer>

                             {/* ??????????????? (???????????????) ??????
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* ??????????????? */}
                                {/* <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptop.returnButton}
                                    onClick={() => {
                                        // history.push("/Case");
                                        // props.controllGCS("return")
                                    }}
                                >
                                    ?????????
                                </NativeLineButton> 
                            </SubContainer> */}
                        </MainPageTitleBar>
                    </>
                }
                theme={laptop.mainPageContainer}
            >
                {/* ??????????????? */}
                <BasicContainer theme={laptop.dispatchContainer} >

                    {/* ????????? ???????????? */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"?????????"}
                        theme={laptop.dispatchSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    {/* ????????????????????? */}
                    <BasicContainer
                        theme={laptop.dispatchTableContainer}
                    >

                        <DispatchTable
                            dataChangeClearChecked={true} //???Data????????? ????????????????????????
                            dataChangeClearCheckedToDo={() => { //???Data????????? ???????????????????????????????????????
                                globalContextService.remove("BusConsolePage", "CheckedRowKeys");
                                globalContextService.remove("BusConsolePage", "CheckedRowsData");
                            }}
                            checkbox={true}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("BusConsolePage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("BusConsolePage", "CheckedRowsData", checkedRows);
                                }
                            }
                            setPerCheckBoxDisabled={(record) => {
                                return {
                                    // ...record, // ??????CheckBox????????????
                                    // disabled: record.name === 'Edrward 11',
                                }
                            }}
                            //scrollAreaWidth={"calc( 1900px - 300px )"} // ????????? ??????????????????
                            //scrollAreaHeight={"calc( 100% - 55px )"}
                            columnsAttr={
                                //#region ???????????????
                                [
                                    // {
                                    //     title: '',
                                    //     width: "0px",
                                    //     dataIndex: 'leftOccupy',
                                    //     fixed: 'left',
                                    //     sorter: false
                                    // },
                                    //#region ??????
                                    {
                                        title: '??????',
                                        width: "112px",
                                        dataIndex: 'userName',
                                        // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                        fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion 

                                    //#region ????????????
                                    {
                                        title: '????????????',
                                        width: "112px",
                                        dataIndex: 'status',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            const statusMapping = (status, getTheme = false) => {

                                                switch (toString(status)) {
                                                    case "1":
                                                        return (getTheme ? laptop.dispatchStatusTag.newOrder : "?????????");
                                                    case "2":
                                                        return (getTheme ? laptop.dispatchStatusTag.assignedOrder : "?????????");
                                                    case "3":
                                                        return (getTheme ? laptop.dispatchStatusTag.arrivalOrder : "??????????????????");
                                                    case "4":
                                                        return (getTheme ? laptop.dispatchStatusTag.customUpOrder : "??????");
                                                    case "5":
                                                        return (getTheme ? laptop.dispatchStatusTag.finishedOrder : "?????????");
                                                    case "9":
                                                        return (getTheme ? laptop.dispatchStatusTag.unitCancleOrder : "?????????");
                                                    default:
                                                        return (getTheme ? {} : "????????????");
                                                }
                                            }

                                            return (
                                                <>
                                                    <Tag
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={statusMapping(rowData, true)}
                                                        text={statusMapping(rowData)}
                                                    />
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ??????????????????
                                    {
                                        title: '??????????????????',
                                        width: "250px",
                                        dataIndex: 'reserveDate',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ????????????
                                    {
                                        title: '????????????',
                                        width: "112px",
                                        dataIndex: 'stationLineName',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ?????????
                                    {
                                        title: '?????????',
                                        width: "250px",
                                        // dataIndex: 'driverInfoName', // fromAddr  toAddr
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {/* ????????? ?????????  */}
                                                    <Text theme={laptop.dispatchFromAndToAddrOne} >

                                                        {/* ????????? ???????????? */}
                                                        <Text theme={laptop.dispatchFromAddr}>

                                                            {/* ?????? ?????? */}
                                                            <TableStart style={laptop.dispatchFromAddrIcon} />
                                                            {rowData?.fromStationName}
                                                        </Text>

                                                        {/* ????????? ???????????? */}
                                                        <Text theme={laptop.dispatchToAddr} >

                                                            {/* ?????? ?????? */}
                                                            <TableEnd style={laptop.dispatchToAddrIcon} />
                                                            {rowData?.toStationName}
                                                        </Text>
                                                    </Text>
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ????????????
                                    {
                                        title: '????????????',
                                        width: "112px",
                                        dataIndex: 'passengerNum',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    {rowData}
                                                </>
                                            )
                                        }
                                    },
                                    //#endregion

                                    {
                                        title: '???????????????',
                                        width: "321px",
                                        // dataIndex: 'parentName',
                                        // sorter: (a, b) => a.name.length - b.name.length,
                                        fixed: 'right',
                                        render: (rowData) => {

                                            return (
                                                <>
                                                    <Container>

                                                        {/* ?????????????????????????????????????????????????????? ?????????????????????*/}
                                                        {(isNil(rowData.driverInfoName) && rowData.status !== 9) ?
                                                            <>
                                                                <NewSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={""}
                                                                    bottomLabel={""}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"???????????????"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`) ?? null}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("BusConsolePage", `OrderDriver_${rowData.id}`, value)
                                                                        // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "???????????????", isDisabled: true },
                                                                        ...props.DriverInfos
                                                                        // ...Counties
                                                                    ]}

                                                                    theme={laptop.dispatchOrderDriver}
                                                                />

                                                                <NewSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={""}
                                                                    bottomLabel={""}
                                                                    // viewType
                                                                    isSearchable
                                                                    placeholder={"???????????????"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`) ?? null}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("BusConsolePage", `OrderCar_${rowData.id}`, value)
                                                                        // console.log(globalContextService.get("BusConsolePage", "PassengerNumCount"))
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "???????????????", isDisabled: true },
                                                                        ...props.CarInfos
                                                                        // ...Counties
                                                                    ]}

                                                                    theme={laptop.dispatchOrderCar}
                                                                />
                                                            </>
                                                            :
                                                            <>
                                                                {/* ??????????????? */}
                                                                <Text
                                                                    theme={{
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            width: "100%",
                                                                            padding: "0 0 0 8px",
                                                                            height: "40px",
                                                                            fontSize: "14px",
                                                                            lineHeight: "22px",
                                                                            color: "rgba(0, 0, 0, 0.65)"
                                                                        })
                                                                    }}
                                                                >
                                                                    {props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `?????? : ${item?.data?.userName} / ${item?.data?.phone}`)}
                                                                </Text>

                                                                {/* ??????????????? */}
                                                                <Text
                                                                    theme={{
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            width: "100%",
                                                                            padding: "0 0 0 8px",
                                                                            height: "40px",
                                                                            fontSize: "14px",
                                                                            lineHeight: "22px",
                                                                            color: "rgba(0, 0, 0, 0.65)"
                                                                        })
                                                                    }}
                                                                >
                                                                    {props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => `?????? : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}?????? / ${item?.data?.carNo}`)}
                                                                </Text>
                                                            </>
                                                        }

                                                        {/* ?????????????????? 1 ????????? ??????????????????*/}
                                                        {rowData.status === 1 &&
                                                            <>
                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* ???????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={laptop.dispatchRosterBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            //#region ????????????
                                                                            let validMsg = "";

                                                                            if (valid(globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]) {
                                                                                validMsg = valid(globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]
                                                                            }
                                                                            else if (valid(globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]) {
                                                                                validMsg = valid(globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]
                                                                            }
                                                                            //#endregion

                                                                            //#region ?????????????????????
                                                                            if (validMsg !== "") {
                                                                                // console.log(validMsg, globalContextService.get("CaseAddPage"))
                                                                                modalsService.infoModal.error({
                                                                                    id: "top1", //?????? ?????????????????????id
                                                                                    iconRightText: validMsg,
                                                                                    yes: true,
                                                                                    yesText: "??????",
                                                                                    // no: true,
                                                                                    // autoClose: true,
                                                                                    backgroundClose: false,
                                                                                    yesOnClick: (e, close) => {
                                                                                        close();
                                                                                    }
                                                                                })
                                                                            }
                                                                            else {
                                                                                props.RosterOrderExecute({
                                                                                    id: [rowData.id],
                                                                                    carId: globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.value,
                                                                                    carNo: globalContextService.get("BusConsolePage", `OrderCar_${rowData.id}`)?.data?.carNo,
                                                                                    driverInfoId: globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.value,
                                                                                    driverInfoName: globalContextService.get("BusConsolePage", `OrderDriver_${rowData.id}`)?.data?.userName,
                                                                                });
                                                                            }
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        ??????
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* ?????????????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={laptop.dispatchEditOrderBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            props.GetStationOnRouteExecute(rowData?.stationLineId) // ?????????????????????????????????
                                                                            globalContextService.set("BusConsolePage", "EditOrderrowData", { ...rowData });
                                                                            //#region ?????????????????? Modal
                                                                            props.setOpenBusOrderEditTitleModal(true);// ??????????????????
                                                                            //#endregion

                                                                        }}
                                                                    >
                                                                        ????????????
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* ?????????????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={laptop.dispatchECancleOrderBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            modalsService.infoModal.warn({
                                                                                iconRightText: "?????????????????????????????????",
                                                                                yes: true,
                                                                                yesText: "??????",
                                                                                no: true,
                                                                                noText: "??????",
                                                                                // autoClose: true,
                                                                                backgroundClose: false,
                                                                                yesOnClick: (e, close) => {
                                                                                    props.CancelOrderReqExecute({ id: rowData.id, cancelRemark: "SYS_ORDERCANCEL_REMARK_ADMIN" });
                                                                                    close();
                                                                                }
                                                                            })
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        ????????????
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                            </>
                                                        }

                                                        {/* ?????????????????? 2 ????????? ?????????????????? */}
                                                        {rowData.status === 2 &&
                                                            <>
                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* ???????????????????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={laptop.dispatchChangeDriveAndCarBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            //#region ?????? ?????????????????? Modal
                                                                            modalsService.titleModal.normal({
                                                                                //id: "top1",
                                                                                title: "??????????????????",
                                                                                yes: true,
                                                                                yesText: "??????",
                                                                                no: true,
                                                                                noText: "??????",
                                                                                // autoClose: true,
                                                                                backgroundClose: false,
                                                                                noOnClick: (e) => {
                                                                                    props.controllGCS("changeDriveAndCarModalClose")
                                                                                },
                                                                                yesOnClick: (e, close) => {
                                                                                    //#region ????????????
                                                                                    let validMsg = "";
                                                                                    if (valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                        validMsg = valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                    }
                                                                                    else if (valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                        validMsg = valid(globalContextService.get("BusConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                    }
                                                                                    //#endregion

                                                                                    //#region ?????????????????????
                                                                                    if (validMsg !== "") {
                                                                                        // console.log(validMsg, globalContextService.get("BusConsolePage"))
                                                                                        modalsService.infoModal.error({
                                                                                            id: "top1", //?????? ?????????????????????id
                                                                                            iconRightText: validMsg,
                                                                                            yes: true,
                                                                                            yesText: "??????",
                                                                                            // no: true,
                                                                                            // autoClose: true,
                                                                                            backgroundClose: false,
                                                                                            yesOnClick: (e, close) => {
                                                                                                close();
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                    else {
                                                                                        props.RosterOrderExecute({
                                                                                            id: [rowData.id],
                                                                                            carId: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderCar`)?.value,
                                                                                            carNo: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderCar`)?.data?.carNo,
                                                                                            driverInfoId: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderDriver`)?.value,
                                                                                            driverInfoName: globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderDriver`)?.data?.userName,
                                                                                        });
                                                                                        close();
                                                                                    }
                                                                                    //#endregion
                                                                                },
                                                                                closeIconOnClick: (e) => {
                                                                                    props.controllGCS("changeDriveAndCarModalClose")
                                                                                },
                                                                                content: (
                                                                                    <FormContainer
                                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                                        onSubmit={(e) => {
                                                                                            e.preventDefault();
                                                                                        }}
                                                                                        theme={laptop.editFormContainer}
                                                                                    >
                                                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                                                            {/* ???????????????????????? - ?????? ChangeDriveAndCarOrderDriver */}
                                                                                            <NewSelector
                                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                                topLabel={"??????"}
                                                                                                bottomLabel={""}
                                                                                                //viewType
                                                                                                isSearchable
                                                                                                placeholder={"???????????????"}
                                                                                                // isMulti
                                                                                                // hideSelectedOptions={false}
                                                                                                value={globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderDriver`) ??
                                                                                                {
                                                                                                    value: rowData.driverInfoId,
                                                                                                    label: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `?????? : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                    data: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0]
                                                                                                }
                                                                                                }
                                                                                                onChange={(e, value, onInitial) => {
                                                                                                    globalContextService.set("BusConsolePage", `ChangeDriveAndCarOrderDriver`, value)
                                                                                                    console.log(props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0])
                                                                                                }}

                                                                                                options={[
                                                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                    ...props.DriverInfos
                                                                                                    // ...Counties
                                                                                                ]}

                                                                                                theme={laptop.changeDriveAndCarOrderDriver}
                                                                                            />

                                                                                            {/* ???????????????????????? - ?????? ChangeDriveAndCarOrderCar */}
                                                                                            <NewSelector
                                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                                topLabel={"??????"}
                                                                                                bottomLabel={""}
                                                                                                // viewType
                                                                                                isSearchable
                                                                                                placeholder={"???????????????"}
                                                                                                // isMulti
                                                                                                // hideSelectedOptions={false}
                                                                                                value={globalContextService.get("BusConsolePage", `ChangeDriveAndCarOrderCar`) ??
                                                                                                {
                                                                                                    value: rowData.carId,
                                                                                                    label: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => `?????? : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}?????? / ${item?.data?.carNo}`),
                                                                                                    data: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => item?.data)?.[0]
                                                                                                }
                                                                                                }
                                                                                                onChange={(e, value, onInitial) => {
                                                                                                    globalContextService.set("BusConsolePage", `ChangeDriveAndCarOrderCar`, value)
                                                                                                }}

                                                                                                options={[
                                                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                    ...props.CarInfos
                                                                                                    // ...Counties
                                                                                                ]}

                                                                                                theme={laptop.changeDriveAndCarOrderCar}
                                                                                            />

                                                                                        </FormRow>
                                                                                    </FormContainer>
                                                                                ),
                                                                                theme: laptop.changeDriveAndCarModal
                                                                            })
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        ??????????????????
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* ?????????????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={laptop.dispatchECancleRosterBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            modalsService.infoModal.warn({
                                                                                iconRightText: "?????????????????????????????????",
                                                                                yes: true,
                                                                                yesText: "??????",
                                                                                no: true,
                                                                                noText: "??????",
                                                                                // autoClose: true,
                                                                                backgroundClose: false,
                                                                                yesOnClick: (e, close) => {
                                                                                    props.CancelDespatchExecute([rowData.id]);
                                                                                    // props.CancelDespatchExecute({ id: rowData.id, cancelRemark: "SYS_ORDERCANCEL_REMARK_ADMIN" });
                                                                                    close();
                                                                                }
                                                                            })
                                                                            //#endregion
                                                                        }}
                                                                    >
                                                                        ????????????
                                                                    </NativeLineButton>
                                                                </SubContainer>

                                                            </>
                                                        }

                                                    </Container>
                                                </>
                                            )
                                        }
                                    }
                                ]
                            }
                            //sort
                            //showHeader={false}
                            // data={[{ id: "asdasd-415asd1sa5d-asd", carType: "?????????", seat: 6, brandModel: "BMW", wheelchairCount: 1, name: "???", uid: "G12312512", sex: "???", cellphone: "0987854555", carNumber: "N8N-6541" }]}
                            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                            data={props.BusOrder.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </BasicContainer>

                </BasicContainer>

            </MainPageContainer>

            {/* B???????????? */}
            {props.OpenBusOrderEditTitleModal &&
                <BusOrderEditTitleModal
                    // theme={{}}
                    setOpenBusOrderEditTitleModal={props.setOpenBusOrderEditTitleModal}
                    StationOnRoute={props.StationOnRoute}
                    BusStationLines={props.BusStationLines}
                    BusStations={props.BusStations}
                    rowData={globalContextService.get("BusConsolePage", "EditOrderrowData")}

                    GetStationOnRouteExecute={props.GetStationOnRouteExecute} // ?????????????????????????????????
                    GetStationOnRoutePending={props.GetStationOnRoutePending} // ?????????????????????????????????

                    UpdateEditOrderExecute={props.UpdateEditOrderExecute} // ????????????
                    UpdateEditOrderPending={props.UpdateEditOrderPending} // ????????????
                    controllGCS={props.controllGCS}
                />
            }

        </>

    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

