import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard, CarOrder, MainPageSubTitleBar, DispatchTable, WhiteOrderEditTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker, NewSelector } from '../../../../Components';
import { ReactComponent as OrderCarType } from '../../../../Assets/img/WhiteConsolePage/OrderCarType.svg'
import { ReactComponent as OrderCanShare } from '../../../../Assets/img/WhiteConsolePage/OrderCanShare.svg'
import { ReactComponent as OrderNoShare } from '../../../../Assets/img/WhiteConsolePage/OrderNoShare.svg'
import { ReactComponent as OrderEnd } from '../../../../Assets/img/WhiteConsolePage/OrderEnd.svg'
import { ReactComponent as OrderStart } from '../../../../Assets/img/WhiteConsolePage/OrderStart.svg'
import { ReactComponent as TableEnd } from '../../../../Assets/img/WhiteConsolePage/TableEnd.svg'
import { ReactComponent as TableStart } from '../../../../Assets/img/WhiteConsolePage/TableStart.svg'
import { ReactComponent as TakeNum } from '../../../../Assets/img/WhiteConsolePage/TakeNum.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import { isNil, toString } from 'lodash/lang';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { whiteConsole: { rwd: { laptopL } } } } = Theme;

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
                            titleText={"??????????????????"}
                            theme={laptopL.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  ???????????? (???????????????) ?????? */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* ???????????? */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptopL.shareButton}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let checkedRowKeys = globalContextService.get("WhiteConsolePage", "CheckedRowKeys");
                                        let checkedRowsData = globalContextService.get("WhiteConsolePage", "CheckedRowsData");

                                        let hasDespatchNo = !((checkedRowsData ?? []).map(item => item.despatchNo).every((currentValue) => (currentValue === null)))
                                        let hasDriverInfoId = !((checkedRowsData ?? []).map(item => item.driverInfoId).every((currentValue) => (currentValue === null)))
                                        let hasNoShare = !((checkedRowsData ?? []).map(item => item.canShared).every((currentValue) => (currentValue === true)))

                                        //#region ?????????????????????
                                        if (((checkedRowsData?.length ?? 0) === 0) || ((checkedRowsData?.length ?? 0) < 2)) {
                                            modalsService.infoModal.error({
                                                iconRightText: "??????????????????????????????????????????",
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
                                        //#region ??????????????????????????? ???????????? ?????????
                                        else if (hasNoShare) {
                                            modalsService.infoModal.error({
                                                iconRightText: "?????????????????????????????????????????????",
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
                                        //#region ??????????????????????????? ????????? ??? ????????? ?????????
                                        else if (hasDespatchNo || hasDriverInfoId) {
                                            modalsService.infoModal.error({
                                                iconRightText: "?????????????????????????????????????????????",
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
                                            //#region ?????? ?????? Modal
                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "??????",
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
                                                    if (valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("WhiteConsolePage", "MulRosterOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                    }
                                                    //#endregion

                                                    //#region ?????????????????????
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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
                                                            carId: globalContextService.get("WhiteConsolePage", `MulRosterOrderCar`)?.value,
                                                            carNo: globalContextService.get("WhiteConsolePage", `MulRosterOrderCar`)?.data?.carNo,
                                                            driverInfoId: globalContextService.get("WhiteConsolePage", `MulRosterOrderDriver`)?.value,
                                                            driverInfoName: globalContextService.get("WhiteConsolePage", `MulRosterOrderDriver`)?.data?.userName,
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
                                                        theme={laptopL.editFormContainer}
                                                    >
                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                            {/* ?????? - ?????? MulRosterOrderDriver */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"??????"}
                                                                bottomLabel={""}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"???????????????"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("WhiteConsolePage", `MulRosterOrderDriver`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("WhiteConsolePage", `MulRosterOrderDriver`, value)
                                                                    // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                    ...props.DriverInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptopL.mulRosterOrderDriver}
                                                            />

                                                            {/* ?????? - ?????? MulRosterOrderCar */}
                                                            <NewSelector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={"??????"}
                                                                bottomLabel={""}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={"???????????????"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("WhiteConsolePage", `MulRosterOrderCar`) ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("WhiteConsolePage", `MulRosterOrderCar`, value)
                                                                    // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                    ...props.CarInfos
                                                                    // ...Counties
                                                                ]}

                                                                theme={laptopL.mulRosterOrderCar}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptopL.mulRosterModal
                                            })
                                            //#endregion

                                        }
                                        //#endregion

                                    }}
                                >
                                    ??????
                                </NativeLineButton>
                            </SubContainer>

                            {/*  ?????????????????? (???????????????) ?????? */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* ?????????????????? */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptopL.delOrderButton}
                                    onClick={() => {
                                        let checkedRowKeys = globalContextService.get("WhiteConsolePage", "CheckedRowKeys");
                                        let checkedRowsData = globalContextService.get("WhiteConsolePage", "CheckedRowsData");

                                        //#region ???????????????????????????
                                        if ((checkedRowsData?.length ?? 0) === 0) {
                                            modalsService.infoModal.error({
                                                iconRightText: "??????????????????????????????",
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
                                        //#region ?????????
                                        else {
                                            modalsService.infoModal.warn({
                                                iconRightText: "???????????????????????????",
                                                yes: true,
                                                yesText: "??????",
                                                no: true,
                                                noText: "??????",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    props.DelOrderReqExecute([...checkedRowKeys])
                                                    close();
                                                }
                                            })
                                        }
                                        //#endregion
                                    }}
                                >
                                    ????????????
                                </NativeLineButton>
                            </SubContainer>

                            {/*  ??????????????? (???????????????) ?????? */}
                            {/* <SubContainer baseDefaultTheme={"DefaultTheme"}> */}
                            {/* ??????????????? */}
                            {/* <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // ????????????
                                    theme={laptopL.returnButton}
                                    onClick={() => {
                                        history.push("/Case");
                                        props.controllGCS("return")
                                    }}
                                >
                                    ?????????
                            </NativeLineButton>
                            </SubContainer> */}
                        </MainPageTitleBar>
                    </>
                }
                theme={laptopL.mainPageContainer}
            >
                {/* ?????????????????? */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={laptopL.newOrderContainer}
                >

                    {/* ????????? ???????????? */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"?????????"}
                        theme={laptopL.newOrderSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    {/* ???????????? */}
                    <Container theme={laptopL.orderContainer} >

                        {/* ??????????????? */}
                        {props.NoOrgOrder.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {/* ???????????? */}
                                    <CarOrder
                                        mainColor={"#fa8c16"}
                                        title={
                                            <>
                                                {/* ???????????? */}
                                                <Text
                                                    theme={laptopL.carOrderCarType}
                                                >
                                                    <OrderCarType style={laptopL.carOrderCarTypeSvg} />
                                                    {item.carCategoryName}
                                                </Text>

                                                {/* ???????????? */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // ????????????
                                                    theme={laptopL.takeOrderBtn}
                                                    onClick={() => {
                                                        props.UpdateOrgIdExecute(
                                                            {
                                                                id: item.id,
                                                                orgId: getParseItemLocalStorage("UseOrg")?.id
                                                            }
                                                        )
                                                    }}
                                                >
                                                    ??????
                                                </NativeLineButton>
                                            </>
                                        }
                                        theme={laptopL.carOrder}
                                    >
                                        {/* ?????????????????? */}
                                        <BasicContainer
                                            theme={laptopL.carOrderContent}
                                        >
                                            {/* ?????????????????????????????????????????? */}
                                            <BasicContainer
                                                theme={laptopL.carOrderNameSContainer}
                                            >

                                                {/* ???????????? */}
                                                <Text
                                                    theme={laptopL.carOrderName}
                                                >
                                                    {item.userName}
                                                </Text>

                                                {/* ?????????????????? */}
                                                <Text
                                                    theme={laptopL.carOrderCanShare}
                                                >
                                                    {item.canShared ?
                                                        <>
                                                            <OrderCanShare style={laptopL.carOrderCanShareSvg} />
                                                            ?????????
                                                        </>
                                                        :
                                                        <>
                                                            <OrderNoShare style={laptopL.carOrderNoShareSvg} />
                                                            ????????????
                                                        </>
                                                    }
                                                </Text>

                                                {/* ?????????????????? */}
                                                <Text
                                                    theme={laptopL.carOrderManCount}
                                                >
                                                    <TakeNum style={laptopL.carOrderManCountSvg} />
                                                    {item.passengerNum}?????????
                                                </Text>
                                            </BasicContainer>

                                            {/* ???????????? */}
                                            <Text
                                                theme={laptopL.carOrderPhone}
                                            >
                                                ???????????? : {item.noticePhone}
                                            </Text>

                                            {/* ???????????? */}
                                            <Text
                                                theme={laptopL.carOrderDate}
                                            >
                                                ???????????? : {item.reserveDate}
                                            </Text>

                                            {/* ???????????? */}
                                            <Text
                                                theme={laptopL.carOrderStartPos}
                                            >
                                                <OrderStart style={laptopL.carOrderStartPosSvg} />
                                                {item.fromAddr}
                                            </Text>

                                            {/* ???????????? */}
                                            <Text
                                                theme={laptopL.carOrderTo}
                                            >
                                                :
                                            </Text>

                                            {/* ???????????? */}
                                            <Text
                                                theme={laptopL.carOrderEndPos}
                                            >
                                                <OrderEnd style={laptopL.carOrderEndPosSvg} />
                                                {item.toAddr}
                                            </Text>

                                        </BasicContainer>
                                    </CarOrder>
                                </React.Fragment >
                            )
                        })}

                    </Container>

                </BasicContainer>

                {/* ??????????????? */}
                <BasicContainer theme={laptopL.dispatchContainer} >

                    {/* ????????? ???????????? */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"?????????"}
                        theme={laptopL.dispatchSubTitleBar}
                    >

                    </MainPageSubTitleBar>

                    {/* ????????????????????? */}
                    <BasicContainer
                        theme={laptopL.dispatchTableContainer}
                    >

                        <DispatchTable
                            dataChangeClearChecked={true} //???Data????????? ????????????????????????
                            dataChangeClearCheckedToDo={() => { //???Data????????? ???????????????????????????????????????
                                globalContextService.remove("WhiteConsolePage", "CheckedRowKeys");
                                globalContextService.remove("WhiteConsolePage", "CheckedRowsData");
                            }}
                            checkbox={true}
                            // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                            checkedRowKeyName={"id"}
                            checkboxOnChecked={
                                (checkedRowKeys, checkedRows) => {
                                    // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                    globalContextService.set("WhiteConsolePage", "CheckedRowKeys", checkedRowKeys);
                                    globalContextService.set("WhiteConsolePage", "CheckedRowsData", checkedRows);
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
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ?????? ????????? */}
                                                                                <Text theme={laptopL.dispatchUserNameOne} >
                                                                                    {it?.userName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ?????? ????????? */}
                                                                                <Text theme={laptopL.dispatchUserNameTwo} >
                                                                                    {it?.userName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ?????? ?????? */}
                                                                <Text theme={laptopL.dispatchUserNameOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                        return (getTheme ? laptopL.dispatchStatusTag.newOrder : "?????????");
                                                    case "2":
                                                        return (getTheme ? laptopL.dispatchStatusTag.assignedOrder : "?????????");
                                                    case "3":
                                                        return (getTheme ? laptopL.dispatchStatusTag.arrivalOrder : "??????????????????");
                                                    case "4":
                                                        return (getTheme ? laptopL.dispatchStatusTag.customUpOrder : "??????");
                                                    case "5":
                                                        return (getTheme ? laptopL.dispatchStatusTag.finishedOrder : "?????????");
                                                    case "9":
                                                        return (getTheme ? laptopL.dispatchStatusTag.unitCancleOrder : "?????????");
                                                    default:
                                                        return (getTheme ? {} : "????????????");
                                                }
                                            }

                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchStatusOne} >
                                                                                    <Tag
                                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                                        theme={statusMapping(it?.status, true)}
                                                                                        text={statusMapping(it?.status)}
                                                                                    />
                                                                                </Text>
                                                                            </>
                                                                        )

                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchStatusTwo} >
                                                                                    <Tag
                                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                                        theme={statusMapping(it?.status, true)}
                                                                                        text={statusMapping(it?.status)}
                                                                                    />
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ???????????? ?????? */}
                                                                <Text theme={laptopL.dispatchStatusOnly} >
                                                                    <Tag
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        theme={statusMapping(rowData, true)}
                                                                        text={statusMapping(rowData)}
                                                                    />
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ?????????????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchReserveDateOne} >
                                                                                    {it?.reserveDate}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ?????????????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchReserveDateTwo} >
                                                                                    {it?.reserveDate}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ?????????????????? ?????? */}
                                                                <Text theme={laptopL.dispatchReserveDateOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ?????????
                                    {
                                        title: '?????????',
                                        width: "400px",
                                        // dataIndex: 'driverInfoName', // fromAddr  toAddr
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? rowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {rowData?.isShare
                                                            ?
                                                            <>
                                                                {rowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchFromAndToAddrOne} >

                                                                                    {/* ????????? ???????????? */}
                                                                                    <Text theme={laptopL.dispatchFromAddr}>

                                                                                        {/* ?????? ?????? */}
                                                                                        <TableStart style={laptopL.dispatchFromAddrIcon} />
                                                                                        {it?.fromAddr}
                                                                                    </Text>

                                                                                    {/* ????????? ???????????? */}
                                                                                    <Text theme={laptopL.dispatchToAddr} >

                                                                                        {/* ?????? ?????? */}
                                                                                        <TableEnd style={laptopL.dispatchToAddrIcon} />
                                                                                        {it?.toAddr}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ????????? ????????? */}
                                                                                <Text
                                                                                    theme={laptopL.dispatchFromAndToAddrTwo}
                                                                                >
                                                                                    {/* ????????? ???????????? */}
                                                                                    <Text theme={laptopL.dispatchFromAddr}>

                                                                                        {/* ?????? ?????? */}
                                                                                        <TableStart style={laptopL.dispatchFromAddrIcon} />
                                                                                        {it?.fromAddr}
                                                                                    </Text>

                                                                                    {/* ????????? ???????????? */}
                                                                                    <Text theme={laptopL.dispatchToAddr} >

                                                                                        {/* ?????? ?????? */}
                                                                                        <TableEnd style={laptopL.dispatchToAddrIcon} />
                                                                                        {it?.toAddr}
                                                                                    </Text>
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ????????? ?????? */}
                                                                <Text theme={laptopL.dispatchFromAndToAddrOnly} >

                                                                    {/* ????????? ???????????? */}
                                                                    <Text theme={laptopL.dispatchFromAddr}>

                                                                        {/* ?????? ?????? */}
                                                                        <TableStart style={laptopL.dispatchFromAddrIcon} />
                                                                        {rowData?.fromAddr}
                                                                    </Text>

                                                                    {/* ????????? ???????????? */}
                                                                    <Text theme={laptopL.dispatchToAddr} >

                                                                        {/* ?????? ?????? */}
                                                                        <TableEnd style={laptopL.dispatchToAddrIcon} />
                                                                        {rowData?.toAddr}
                                                                    </Text>
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ??????
                                    {
                                        title: '??????',
                                        width: "112px",
                                        dataIndex: 'canShared',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchCanSharedOne} >
                                                                                    {it?.canShared ? "???" : "???"}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchCanSharedTwo} >
                                                                                    {it?.canShared ? "???" : "???"}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ???????????? ?????? */}
                                                                <Text theme={laptopL.dispatchCanSharedOnly} >
                                                                    {rowData ? "???" : "???"}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ????????????
                                    {
                                        title: '????????????',
                                        width: "112px",
                                        dataIndex: 'carCategoryName',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchCarCategoryNameOne} >
                                                                                    {it?.carCategoryName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchCarCategoryNameTwo} >
                                                                                    {it?.carCategoryName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ???????????? ?????? */}
                                                                <Text theme={laptopL.dispatchCarCategoryNameOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchPassengerNumOne} >
                                                                                    {it?.passengerNum}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchPassengerNumTwo} >
                                                                                    {it?.passengerNum}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ???????????? ?????? */}
                                                                <Text theme={laptopL.dispatchPassengerNumOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
                                            )
                                        }
                                    },
                                    //#endregion

                                    //#region ????????????
                                    {
                                        title: '????????????',
                                        width: "112px",
                                        dataIndex: 'orgName',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <React.Fragment key={rowData?.id ?? allRowData?.isShare?.[0]?.id}>
                                                    <BasicContainer>
                                                        {allRowData?.isShare
                                                            ?
                                                            <>
                                                                {allRowData.isShare.map((it, ind) => {
                                                                    if (ind === 0) {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchOrgNameOne} >
                                                                                    {it?.orgName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                {/* ????????? ???????????? ????????? */}
                                                                                <Text theme={laptopL.dispatchOrgNameTwo} >
                                                                                    {it?.orgName}
                                                                                </Text>
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                                }
                                                            </>
                                                            :
                                                            <>
                                                                {/* ????????? ???????????? ?????? */}
                                                                <Text theme={laptopL.dispatchOrgNameOnly} >
                                                                    {rowData}
                                                                </Text>
                                                            </>
                                                        }
                                                    </BasicContainer>
                                                </React.Fragment>
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
                                                        {/* ??????????????? */}
                                                        {rowData?.isShare
                                                            ?
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
                                                                    {props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => `?????? : ${item?.data?.userName} / ${item?.data?.phone}`)}
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
                                                                    {props.CarInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.carId).map(item => `?????? : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}?????? / ${item?.data?.carNo}`)}
                                                                </Text>
                                                            </>
                                                            :
                                                            <>
                                                                {/* ?????????????????????????????????????????????????????? ?????????????????????*/}
                                                                {((isNil(rowData.driverInfoName) && rowData.status !== 9)) ?
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
                                                                            value={globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`) ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("WhiteConsolePage", `OrderDriver_${rowData.id}`, value)
                                                                                // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                            }}

                                                                            options={[
                                                                                { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                ...props.DriverInfos
                                                                                // ...Counties
                                                                            ]}

                                                                            theme={laptopL.dispatchOrderDriver}
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
                                                                            value={globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`) ?? null}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("WhiteConsolePage", `OrderCar_${rowData.id}`, value)
                                                                                // console.log(globalContextService.get("WhiteConsolePage", "PassengerNumCount"))
                                                                            }}

                                                                            options={[
                                                                                { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                ...props.CarInfos
                                                                                // ...Counties
                                                                            ]}

                                                                            theme={laptopL.dispatchOrderCar}
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
                                                                        theme={laptopL.dispatchRosterBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            //#region ????????????
                                                                            let validMsg = "";

                                                                            if (valid(globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]) {
                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]
                                                                            }
                                                                            else if (valid(globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]) {
                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.value ?? "", ["^.{1,}$"], ["???????????????????????????????????????"])[1]
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
                                                                                    carId: globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.value,
                                                                                    carNo: globalContextService.get("WhiteConsolePage", `OrderCar_${rowData.id}`)?.data?.carNo,
                                                                                    driverInfoId: globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.value,
                                                                                    driverInfoName: globalContextService.get("WhiteConsolePage", `OrderDriver_${rowData.id}`)?.data?.userName,
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
                                                                        theme={laptopL.dispatchEditOrderBtn}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();

                                                                            // props.GetStationOnRouteExecute(rowData?.stationLineId) // ?????????????????????????????????
                                                                            globalContextService.set("WhiteConsolePage", "EditOrderrowData", { ...rowData });
                                                                            //#region ?????????????????? Modal
                                                                            props.setOpenWhiteOrderEditTitleModal(true);// ??????????????????
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
                                                                        theme={laptopL.dispatchECancleOrderBtn}
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

                                                        {/* ??????????????? */}
                                                        {rowData?.isShare
                                                            ?
                                                            <>
                                                                {/* ?????????????????? 2 ????????? ?????????????????? */}
                                                                {rowData?.isShare?.[0]?.status === 2 &&
                                                                    <>
                                                                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                            {/* ???????????????????????? */}
                                                                            <NativeLineButton
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                disable={false}
                                                                                type="button" // ????????????
                                                                                theme={laptopL.dispatchChangeDriveAndCarBtn}
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
                                                                                            if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                            }
                                                                                            else if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                            }
                                                                                            //#endregion

                                                                                            //#region ?????????????????????
                                                                                            if (validMsg !== "") {
                                                                                                // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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
                                                                                                    id: [...rowData?.isShare?.map(isShareItem => isShareItem?.id)],
                                                                                                    carId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.value,
                                                                                                    carNo: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.data?.carNo,
                                                                                                    driverInfoId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.value,
                                                                                                    driverInfoName: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.data?.userName,
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
                                                                                                theme={laptopL.editFormContainer}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`) ??
                                                                                                        {
                                                                                                            value: rowData?.isShare?.[0]?.driverInfoId,
                                                                                                            label: props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => `?????? : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                            data: props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`, value)
                                                                                                            // console.log(props.DriverInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.driverInfoId).map(item => item?.data)?.[0])
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                            ...props.DriverInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderDriver}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`) ??
                                                                                                        {
                                                                                                            value: rowData?.isShare?.[0]?.carId,
                                                                                                            label: props.CarInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.carId).map(item => `?????? : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}?????? / ${item?.data?.carNo}`),
                                                                                                            data: props.CarInfos.filter(d => d?.data?.id === rowData?.isShare?.[0]?.carId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderCar`, value)
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                            ...props.CarInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderCar}
                                                                                                    />

                                                                                                </FormRow>
                                                                                            </FormContainer>
                                                                                        ),
                                                                                        theme: laptopL.changeDriveAndCarModal
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
                                                                                theme={laptopL.dispatchECancleRosterBtn}
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
                                                                                            props.CancelDespatchExecute([rowData?.isShare?.[0]?.despatchNo]);
                                                                                            // props.CancelDespatchExecute([...rowData?.isShare?.map(isShareItem => isShareItem?.id)]);
                                                                                            // props.CancelDespatchExecute({ id: rowData?.isShare?.[0]?.id, cancelRemark: "SYS_ORDERCANCEL_REMARK_ADMIN" });
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
                                                            </>
                                                            :
                                                            <>
                                                                {/* ?????????????????? 2 ????????? ?????????????????? */}
                                                                {rowData.status === 2 &&
                                                                    <>
                                                                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                                                            {/* ???????????????????????? */}
                                                                            <NativeLineButton
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                disable={false}
                                                                                type="button" // ????????????
                                                                                theme={laptopL.dispatchChangeDriveAndCarBtn}
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
                                                                                            if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderDriver")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                            }
                                                                                            else if (valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                                validMsg = valid(globalContextService.get("WhiteConsolePage", "ChangeDriveAndCarOrderCar")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                            }
                                                                                            //#endregion

                                                                                            //#region ?????????????????????
                                                                                            if (validMsg !== "") {
                                                                                                // console.log(validMsg, globalContextService.get("WhiteConsolePage"))
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
                                                                                                    carId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.value,
                                                                                                    carNo: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`)?.data?.carNo,
                                                                                                    driverInfoId: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.value,
                                                                                                    driverInfoName: globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`)?.data?.userName,
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
                                                                                                theme={laptopL.editFormContainer}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`) ??
                                                                                                        {
                                                                                                            value: rowData.driverInfoId,
                                                                                                            label: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `?????? : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                            data: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            console.log("Vvalue", value)

                                                                                                            console.log("GETGI", {
                                                                                                                value: rowData.driverInfoId,
                                                                                                                label: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => `?????? : ${item?.data?.userName} / ${item?.data?.phone}`),
                                                                                                                data: props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0]
                                                                                                            })
                                                                                                            console.log(globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`))
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderDriver`, value)
                                                                                                            // console.log(props.DriverInfos.filter(d => d?.data?.id === rowData.driverInfoId).map(item => item?.data)?.[0])
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                            ...props.DriverInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderDriver}
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
                                                                                                        value={globalContextService.get("WhiteConsolePage", `ChangeDriveAndCarOrderCar`) ??
                                                                                                        {
                                                                                                            value: rowData.carId,
                                                                                                            label: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => `?????? : ${item?.data?.carCategoryName} / ${item?.data?.seatNum}?????? / ${item?.data?.carNo}`),
                                                                                                            data: props.CarInfos.filter(d => d?.data?.id === rowData.carId).map(item => item?.data)?.[0]
                                                                                                        }
                                                                                                        }
                                                                                                        onChange={(e, value, onInitial) => {
                                                                                                            globalContextService.set("WhiteConsolePage", `ChangeDriveAndCarOrderCar`, value)
                                                                                                        }}

                                                                                                        options={[
                                                                                                            { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                            ...props.CarInfos
                                                                                                            // ...Counties
                                                                                                        ]}

                                                                                                        theme={laptopL.changeDriveAndCarOrderCar}
                                                                                                    />

                                                                                                </FormRow>
                                                                                            </FormContainer>
                                                                                        ),
                                                                                        theme: laptopL.changeDriveAndCarModal
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
                                                                                theme={laptopL.dispatchECancleRosterBtn}
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
                                                                                            props.CancelDespatchExecute([rowData.despatchNo]);
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
                            data={props.OrgOrder.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />

                    </BasicContainer>

                </BasicContainer>

            </MainPageContainer>

            {/* ?????????????????? */}
            {props.OpenWhiteOrderEditTitleModal &&
                <WhiteOrderEditTitleModal
                    // theme={{}}
                    setOpenWhiteOrderEditTitleModal={props.setOpenWhiteOrderEditTitleModal}
                    AllCarType={props.AllCarType}
                    rowData={globalContextService.get("WhiteConsolePage", "EditOrderrowData")}

                    UpdateEditOrderExecute={props.UpdateEditOrderExecute} // ????????????
                    UpdateEditOrderPending={props.UpdateEditOrderPending} // ????????????
                    controllGCS={props.controllGCS}
                />
            }
        </>

    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`

`

