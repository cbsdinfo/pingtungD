import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { BUnitTitleModal, MainPageContainer, MainPageTitleBar, QuotaTitleModal } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NewSelector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, DateTimePicker } from '../../../Components';
import { ReactComponent as Search } from '../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/CasePage/Edit.svg'
import { ReactComponent as ToView } from '../../../Assets/img/CasePage/ToView.svg'
import { ReactComponent as TableEdit } from '../../../Assets/img/CasePage/TableEdit.svg'
import { ReactComponent as CallCar } from '../../../Assets/img/CasePage/CallCar.svg'
import { ReactComponent as Quota } from '../../../Assets/img/CasePage/Quota.svg'
import { ReactComponent as BUnit } from '../../../Assets/img/CasePage/BUnit.svg'
import { ReactComponent as Unlock } from '../../../Assets/img/CasePage/Unlock.svg'
import { ReactComponent as Lock } from '../../../Assets/img/CasePage/Lock.svg'
import { ReactComponent as Man } from '../../../Assets/img/CasePage/Man.svg'
import { ReactComponent as Woman } from '../../../Assets/img/CasePage/Woman.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../Handlers';
import { isEqual, isUndefined } from 'lodash';
import moment from 'moment';
import { allCaseListSelectOption, caseListMapping, caseListSelectOption } from '../../../Mappings/Mappings';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { rwd: { laptopL } } } } = Theme;
    const [UpdateComponent, setUpdateComponent] = useState(false); // ????????????
    let history = useHistory()

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
                            {/* ?????????????????? ????????????????????? */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>????????????<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"?????????????????????"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CasePage", "UserId") ?? null}
                                //value={globalContextService.get("CasePage", "UserId") ?? [{ value: '1', label: '????????????' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CasePage", "UserId", value);
                                }}

                                options={[
                                    { value: '0', label: "?????????????????????", isDisabled: true },
                                    ...allCaseListSelectOption
                                ]}
                                theme={laptopL.userId}

                            />

                            {/* ??????????????? ??????????????????  */}
                            <TextInput
                                bascDefaultTheme={"DefaultTheme"}
                                theme={laptopL.keyword}
                                type="text"
                                placeholder={"??????????????????"}
                                rightIcon={
                                    <Search
                                        style={laptopL.keywordRightIcon}
                                    />
                                }
                                value={globalContextService.get("CasePage", "Keyword") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CasePage", "Keyword", value);
                                }}
                            />

                            {/* ???????????????????????? */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* ?????????????????? */}
                                {/* ???????????? */}
                                {(getParseItemLocalStorage("Functions") ?? []).includes("/Case/btnUnlock")
                                    &&
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // ????????????
                                        theme={laptopL.unlockButton}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // let checkedRowKeys = globalContextService.get("CasePage", "CheckedRowKeys");
                                            let checkedRowsData = globalContextService.get("CasePage", "CheckedRowsData");

                                            //#region ???????????????????????????
                                            if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
                                                modalsService.infoModal.error({
                                                    iconRightText: "????????????????????????????????????",
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
                                                let rowData = { ...checkedRowsData[0] };

                                                //#region ???????????? Modal
                                                props.UnlockClientExecute({ id: rowData.id })
                                                //#endregion
                                            }
                                            //#endregion
                                        }}
                                    >
                                        ????????????
                                    </NativeLineButton>
                                }

                                {/* ?????????????????? */}
                                {/* ???????????? */}
                                {(getParseItemLocalStorage("Functions") ?? []).includes("/Case/AddUser")
                                    &&
                                    <NativeLineButton
                                        baseDefaultTheme={"DefaultTheme"}
                                        disable={false}
                                        type="button" // ????????????
                                        theme={laptopL.addUserButton}
                                        onClick={(e) => {
                                            e.preventDefault();

                                            let rowData = {};

                                            //#region ?????????????????? Modal
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
                                                    props.controllGCS("addClientModalClose")
                                                },
                                                yesOnClick: (e, close) => {
                                                    //#region ????????????
                                                    let validMsg = "";
                                                    if (valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                    }
                                                    else if (valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["???????????????", "??????????????????????????????"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["???????????????", "??????????????????????????????"])[1]
                                                    }
                                                    //#endregion

                                                    //#region ?????????????????????
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("CasePage"))
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
                                                        props.AddOrUpdateClientExecute({
                                                            account: globalContextService.get("CasePage", "Uid"), //??????????????????????????????
                                                            birthday: globalContextService.get("CasePage", `Birthday`),
                                                            name: globalContextService.get("CasePage", `Name`),
                                                            organizationIds: "", // ???????????????
                                                            password: globalContextService.get("CasePage", `Birthday`).replaceAll("-", ""),
                                                            phone: globalContextService.get("CasePage", "Cellphone"),
                                                            sex: globalContextService.get("CasePage", "Sex")?.value,
                                                            status: 1, // ??????
                                                            uid: globalContextService.get("CasePage", "Uid"),
                                                        })
                                                        close();
                                                    }
                                                    //#endregion
                                                },
                                                closeIconOnClick: (e) => {
                                                    props.controllGCS("addClientModalClose")
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
                                                            {/* ???????????? - ?????? Name */}
                                                            <TextInput
                                                                // viewType
                                                                topLabel={<>??????<Text theme={laptopL.nameRequired}>(??????)</Text></>}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={""}
                                                                value={globalContextService.get("CasePage", "Name") ?? rowData.name}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("CasePage", "Name", value);
                                                                }}
                                                                theme={laptopL.name}
                                                            />

                                                            {/* ???????????? - ??????????????? Birthday */}
                                                            <DateTimePicker
                                                                topLabel={<>???????????????<Text theme={laptopL.birthdayRequired}>(??????)</Text></>}
                                                                // type={"time"} time???date???week???month???quarter???year
                                                                type={"date"}
                                                                format={"YYYY-MM-DD"}
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                // viewType
                                                                isSearchable
                                                                placeholder={""}
                                                                value={
                                                                    (globalContextService.get("CasePage", `Birthday`) ?
                                                                        moment(globalContextService.get("CasePage", `Birthday`), "YYYY-MM-DD")
                                                                        :
                                                                        null
                                                                    )
                                                                }
                                                                onChange={(value, momentObj) => {
                                                                    globalContextService.set("CasePage", `Birthday`, value);
                                                                }}
                                                                theme={laptopL.birthday}
                                                            />

                                                            {/* ???????????? - ??????????????? Uid */}
                                                            <TextInput
                                                                // viewType
                                                                topLabel={<>???????????????<Text theme={laptopL.uidRequired}>(??????)</Text></>}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={""}
                                                                value={globalContextService.get("CasePage", "Uid") ?? rowData.uid}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("CasePage", "Uid", value);
                                                                }}
                                                                theme={laptopL.uid}
                                                            />

                                                            {/* ???????????? - ?????? Sex */}
                                                            <Selector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={<>??????<Text theme={laptopL.sexRequired}>(??????)</Text></>}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"???????????????"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("CasePage", "Sex") ?? {}}
                                                                onChange={(e, value, onInitial) => {
                                                                    // console.log(value)
                                                                    globalContextService.set("CasePage", "Sex", value);
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                    { value: 0, label: '???' },
                                                                    { value: 1, label: '???' }
                                                                ]}
                                                                menuPosition={true}
                                                                theme={laptopL.sex}
                                                            />

                                                            {/* ???????????? - ?????? Cellphone */}
                                                            <TextInput
                                                                // viewType
                                                                topLabel={<>??????<Text theme={laptopL.cellphoneRequired}>(??????)</Text></>}
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                type="text"
                                                                placeholder={""}
                                                                value={globalContextService.get("CasePage", "Cellphone") ?? rowData.cellphone}
                                                                onChange={(e, value, onInitial) => {
                                                                    globalContextService.set("CasePage", "Cellphone", value);
                                                                }}
                                                                theme={laptopL.cellphone}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptopL.editModal
                                            })
                                            //#endregion
                                        }}
                                    >
                                        {/* ?????????????????? ?????? */}
                                        <Plus style={laptopL.addButtonIcon} />
                                        ????????????
                                    </NativeLineButton>
                                }

                            </SubContainer>
                        </MainPageTitleBar>

                    </>
                }
            >
                {/* Table ?????? */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptopL.tableContainer}
                >
                    <OldTable
                        dataChangeClearChecked={true} //???Data????????? ????????????????????????
                        dataChangeClearCheckedToDo={() => { //???Data????????? ???????????????????????????????????????
                            globalContextService.remove("CasePage", "CheckedRowKeys");
                            globalContextService.remove("CasePage", "CheckedRowsData");
                        }}
                        checkbox={true}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CasePage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CasePage", "CheckedRowsData", checkedRows);
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

                                {
                                    title: '',
                                    width: "0px",
                                    dataIndex: 'leftOccupy',
                                    fixed: 'left',
                                    sorter: false
                                },
                                {
                                    title: '??????',
                                    width: "118px",
                                    dataIndex: 'name',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    fixed: 'left',
                                    render: (rowData, allRowData) => {
                                        // console.log("rowData", rowData, allRowData)
                                        // console.log(!moment(allRowData.unLockDate, "YYYY-MM-DD HH:mm:ss").isBefore(moment()))
                                        return (
                                            <>
                                                <Text theme={laptopL.nameContainer}>
                                                    {!(moment(allRowData.unLockDate, "YYYY-MM-DD HH:mm:ss").subtract(5, "seconds").isBefore(moment()) || allRowData.unLockDate === null) && <Lock style={laptopL.userlocked} />}
                                                    {rowData}

                                                    {/* ?????????????????????????????? */}
                                                    <NativeLineButton
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        disable={false}
                                                        type="button" // ????????????
                                                        theme={laptopL.editUserButton}
                                                        onClick={(e) => {
                                                            //#region ?????????????????? Modal
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
                                                                    props.controllGCS("editClientModalClose")
                                                                },
                                                                yesOnClick: (e, close) => {
                                                                    //#region ????????????
                                                                    let validMsg = "";
                                                                    if (valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                    }
                                                                    else if (valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["???????????????", "??????????????????????????????"])[1]) {
                                                                        validMsg = valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["???????????????", "??????????????????????????????"])[1]
                                                                    }
                                                                    //#endregion

                                                                    //#region ?????????????????????
                                                                    if (validMsg !== "") {
                                                                        // console.log(validMsg, globalContextService.get("CasePage"))
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
                                                                        props.AddOrUpdateClientExecute({
                                                                            id: allRowData.id,
                                                                            account: globalContextService.get("CasePage", "Uid"), //??????????????????????????????
                                                                            birthday: globalContextService.get("CasePage", `Birthday`),
                                                                            name: globalContextService.get("CasePage", `Name`),
                                                                            organizationIds: "", // ???????????????
                                                                            password: globalContextService.get("CasePage", `Birthday`).replaceAll("-", ""),
                                                                            phone: globalContextService.get("CasePage", "Cellphone"),
                                                                            sex: globalContextService.get("CasePage", "Sex")?.value,
                                                                            status: 1, // ??????
                                                                            uid: globalContextService.get("CasePage", "Uid"),
                                                                        }, true)
                                                                        close();
                                                                    }
                                                                    //#endregion
                                                                },
                                                                closeIconOnClick: (e) => {
                                                                    props.controllGCS("editClientModalClose")
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
                                                                            {/* ???????????? - ?????? Name */}
                                                                            <TextInput
                                                                                // viewType
                                                                                topLabel={<>??????<Text theme={laptopL.nameRequired}>(??????)</Text></>}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                type="text"
                                                                                placeholder={""}
                                                                                value={globalContextService.get("CasePage", "Name") ?? allRowData.name}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("CasePage", "Name", value);
                                                                                }}
                                                                                theme={laptopL.name}
                                                                            />

                                                                            {/* ???????????? - ??????????????? Birthday */}
                                                                            <DateTimePicker
                                                                                topLabel={<>???????????????<Text theme={laptopL.birthdayRequired}>(??????)</Text></>}
                                                                                // type={"time"} time???date???week???month???quarter???year
                                                                                type={"date"}
                                                                                format={"YYYY-MM-DD"}
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                // viewType
                                                                                isSearchable
                                                                                placeholder={""}
                                                                                value={moment(allRowData.birthday, "YYYY-MM-DD")}
                                                                                onChange={(value, momentObj) => {
                                                                                    globalContextService.set("CasePage", `Birthday`, value);
                                                                                }}
                                                                                theme={laptopL.birthday}
                                                                            />

                                                                            {/* ???????????? - ??????????????? Uid */}
                                                                            <TextInput
                                                                                // viewType
                                                                                topLabel={<>???????????????<Text theme={laptopL.uidRequired}>(??????)</Text></>}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                type="text"
                                                                                placeholder={""}
                                                                                value={globalContextService.get("CasePage", "Uid") ?? allRowData.uid}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("CasePage", "Uid", value);
                                                                                }}
                                                                                theme={laptopL.uid}
                                                                            />

                                                                            {/* ???????????? - ?????? Sex */}
                                                                            <Selector
                                                                                bascDefaultTheme={"DefaultTheme"}
                                                                                topLabel={<>??????<Text theme={laptopL.sexRequired}>(??????)</Text></>}
                                                                                //viewType
                                                                                isSearchable
                                                                                placeholder={"???????????????"}
                                                                                // isMulti
                                                                                // hideSelectedOptions={false}
                                                                                value={globalContextService.get("CasePage", "Sex") ?? { value: allRowData.sex, label: allRowData.label === 0 ? '???' : '???' }}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    // console.log(value)
                                                                                    globalContextService.set("CasePage", "Sex", value);
                                                                                }}

                                                                                options={[
                                                                                    { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                    { value: 0, label: '???' },
                                                                                    { value: 1, label: '???' }
                                                                                ]}
                                                                                menuPosition={true}
                                                                                theme={laptopL.sex}
                                                                            />

                                                                            {/* ???????????? - ?????? Cellphone */}
                                                                            <TextInput
                                                                                // viewType
                                                                                topLabel={<>??????<Text theme={laptopL.cellphoneRequired}>(??????)</Text></>}
                                                                                baseDefaultTheme={"DefaultTheme"}
                                                                                type="text"
                                                                                placeholder={""}
                                                                                value={globalContextService.get("CasePage", "Cellphone") ?? allRowData.phone}
                                                                                onChange={(e, value, onInitial) => {
                                                                                    globalContextService.set("CasePage", "Cellphone", value);
                                                                                }}
                                                                                theme={laptopL.cellphone}
                                                                            />

                                                                        </FormRow>
                                                                    </FormContainer>
                                                                ),
                                                                theme: laptopL.editModal
                                                            })

                                                            //#endregion

                                                        }}
                                                    >
                                                        {/* ?????????????????????????????? ?????? */}
                                                        <Edit style={laptopL.addButtonIcon} />
                                                    </NativeLineButton>
                                                </Text>
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '??????',
                                    width: "200px",
                                    dataIndex: 'caseList',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'right',
                                    render: (rowData, allRowData) => {
                                        // console.log("caseListrowData", rowData, allRowData)

                                        //#region ??????????????????
                                        let option = (rowData ?? []).map((item, index) => {
                                            return ({
                                                value: `${item.userType}_${item.caseId}`, // ?????????value ????????? caseId ???????????????
                                                label: `${caseListMapping[item.userType]}`
                                            })
                                            // caseId: "6718179154760081408"
                                            // caseUserNo: "4"
                                            // userId: "6717458163956228096"
                                            // userType: "caseuser"
                                        })

                                        if (option.length < 1) {
                                            option.push({ value: 'noCaseList', label: "???????????????????????????", isDisabled: true })
                                        }
                                        //#endregion

                                        return (
                                            <>
                                                <BasicContainer theme={laptopL.canUseCaseListTagContainer}>
                                                    {/* ???????????? Tag */}
                                                    {option.map(item => (
                                                        <Tag
                                                            key={item.value}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.canUseCaseListTag}
                                                            text={item.label}
                                                        />
                                                    ))}

                                                    {/* ?????????????????? */}
                                                    {/* ???????????? */}
                                                    {(getParseItemLocalStorage("Functions") ?? []).includes("/Case/AddCaseList")
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // ????????????
                                                            theme={laptopL.addIdentityButton}
                                                            onClick={(e) => {
                                                                e.preventDefault();

                                                                //#region ????????????????????????????????? Modal
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
                                                                        props.controllGCS("selectCaseListModalClose")
                                                                    },
                                                                    yesOnClick: (e, close) => {
                                                                        //#region ????????????
                                                                        let validMsg = "";
                                                                        if (valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                            validMsg = valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                                        }
                                                                        //#endregion

                                                                        //#region ?????????????????????
                                                                        if (validMsg !== "") {
                                                                            // console.log(validMsg, globalContextService.get("CasePage"))
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
                                                                            // ????????????????????????
                                                                            // ??????????????????????????????Valu ????????? _caseId ??????????????????split?????????
                                                                            switch (globalContextService.get("CasePage", "CaseListSelect")?.value.split('_')[0]) {
                                                                                case "caseuser":
                                                                                    //#region ?????????????????????????????????????????? userId
                                                                                    history.push(`/Case/Add?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "selfpayuser":
                                                                                    //#region ??????????????????????????????????????? userId
                                                                                    history.push(`/Case/WhiteAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "countrySide":
                                                                                    //#region ?????????????????????????????????????????????????????? userId
                                                                                    history.push(`/Case/RuralAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "bususer":
                                                                                    //#region ???????????????????????????????????????????????? userId
                                                                                    history.push(`/Case/BusAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                case "daycare":
                                                                                    //#region ?????????????????????????????????????????? userId
                                                                                    history.push(`/Case/DayCareAdd?userId=${allRowData.id}`)
                                                                                    //#endregion
                                                                                    break;
                                                                                default:
                                                                                    break;
                                                                            }
                                                                            props.controllGCS("selectCaseListModalClose")
                                                                            close();
                                                                        }
                                                                        //#endregion
                                                                    },
                                                                    closeIconOnClick: (e) => {
                                                                        props.controllGCS("selectCaseListModalClose")
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
                                                                                {/* ??????????????????????????? - ???????????? caseList */}
                                                                                <Selector
                                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                                    topLabel={<>????????????</>}
                                                                                    //viewType
                                                                                    isSearchable
                                                                                    placeholder={"?????????????????????"}
                                                                                    // isMulti
                                                                                    // hideSelectedOptions={false}
                                                                                    value={globalContextService.get("CasePage", "CaseListSelect") ?? null}
                                                                                    onChange={(e, value, onInitial) => {
                                                                                        // console.log(value)
                                                                                        globalContextService.set("CasePage", "CaseListSelect", value);
                                                                                    }}

                                                                                    options={[
                                                                                        { value: 'hint', label: "?????????????????????", isDisabled: true },
                                                                                        ...caseListSelectOption
                                                                                    ]}
                                                                                    menuPosition={true}
                                                                                    theme={laptopL.caseListSelect}
                                                                                />

                                                                            </FormRow>
                                                                        </FormContainer>
                                                                    ),
                                                                    theme: laptopL.caseListSelectModal
                                                                })
                                                                //#endregion


                                                                //#endregion
                                                            }}
                                                        >
                                                            {/* ?????????????????? ?????? */}
                                                            <Plus style={laptopL.addButtonIcon} />
                                                        </NativeLineButton>
                                                    }
                                                </BasicContainer>
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '???????????????',
                                    width: "112px",
                                    dataIndex: 'uid',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '???????????????',
                                    width: "125px",
                                    dataIndex: 'birthday',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        // console.log("rowData", rowData)
                                        return (
                                            <>
                                                {rowData.split(' ')[0]}
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '??????',
                                    width: "60px",
                                    dataIndex: 'sex',
                                    // sorter: (a, b) => a.wheelchairCount.length - b.wheelchairCount.length,
                                    // fixed: 'left',
                                    render: (rowData) => {
                                        // console.log("rowData", rowData)
                                        return (
                                            <>
                                                {rowData === 1 ?
                                                    <Man />
                                                    :
                                                    <Woman />
                                                }
                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '??????',
                                    width: "130px",
                                    dataIndex: 'phone',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '???????????????',
                                    width: "321px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        // !!!!!!! ----------         ?????? !! ?????????????????????  "XX?????? ?????? ???????????? ??????????????????????????????" ???????????????
                                        // ????????????     -- ???????????????
                                        // ????????????     -- ??????????????????????????????????????????B??????
                                        // ??????         -- ???????????????????????????B??????
                                        // ??????????????????  -- ???????????????????????????B??????
                                        // ??????         -- ????????????????????????
                                        // ??????         -- ???????????????

                                        let showCallCar = ["??????", "??????", "??????????????????", "????????????"]; // ?????? ?????? ?????????
                                        let showEditButton = ["????????????", "??????", "??????", "??????????????????", "????????????", "??????"]; // ?????? ?????? ?????????
                                        let showToViewButton = ["????????????", "??????", "??????", "??????????????????", "????????????", "??????"]; // ?????? ?????? ?????????
                                        let showQuotaButton = ["??????"]; // ?????? ???????????? ?????????
                                        let showBUnitButton = ["??????", "??????", "??????????????????"]; // ?????? B?????? ?????????

                                        //#region ??????????????????
                                        let option = (rowData?.caseList ?? []).map((item, index) => {
                                            return ({
                                                value: `${item.userType}_${item.caseId}`, // ?????????value ????????? caseId ???????????????
                                                label: `${caseListMapping[item.userType]}${item.caseUserNo !== "" ? `(${item.caseUserNo})` : ""}`
                                            })
                                            // caseId: "6718179154760081408"
                                            // caseUserNo: "4"
                                            // userId: "6717458163956228096"
                                            // userType: "caseuser"
                                        })

                                        if (option.length < 1) {
                                            option.push({ value: 'noCaseList', label: "???????????????????????????", isDisabled: true })
                                        }
                                        //#endregion

                                        return (
                                            <>
                                                <Container>

                                                    {/* ?????? CaseList */}
                                                    <NewSelector
                                                        bascDefaultTheme={"DefaultTheme"}
                                                        topLabel={""}
                                                        //viewType
                                                        disabled={isEqual(option?.[0], { value: 'noCaseList', label: "???????????????????????????", isDisabled: true })}
                                                        isSearchable
                                                        placeholder={"?????????????????????"}
                                                        // isMulti
                                                        // hideSelectedOptions={false}
                                                        value={globalContextService.get("CasePage", `CaseList_${rowData.id}`) ?? option?.[0]}// { value: 'baseInfo', label: "????????????", isDisabled: false }} // ?? {}}
                                                        onChange={(e, value, onInitial) => {
                                                            // console.log(value)
                                                            if (!isEqual(value, globalContextService.get("CasePage", `CaseList_${rowData.id}`))) {

                                                                setUpdateComponent(u => !u); // ????????????
                                                            }
                                                            globalContextService.set("CasePage", `CaseList_${rowData.id}`, value);
                                                        }}

                                                        options={[
                                                            // { value: 'baseInfo', label: "????????????", isDisabled: false },
                                                            ...option,
                                                            // ?????? ????????????????????????????????????????????????????????????API?????? ?????????
                                                            { value: "countrySide", label: "??????????????????", isDisabled: false },
                                                            { value: 'daycare', label: "??????", isDisabled: false }
                                                        ]}
                                                        menuPosition={true}
                                                        theme={laptopL.caseList}
                                                    />

                                                    {/* ???????????? */}
                                                    {/* ??????????????????????????????"??????", "??????", "????????????"??? ?????? */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Case/btnCallCar")
                                                            &&
                                                            showCallCar.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // ????????????
                                                            theme={laptopL.callCarButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)

                                                                //#region ?????????????????? Switch
                                                                // ??????????????????????????????Valu ????????? _caseId ??????????????????split?????????
                                                                switch (selectCaseList?.value.split("_")[0]) {
                                                                    case "caseuser": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/CallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (${selectCaseList.label})`)
                                                                        //#endregion
                                                                        break;
                                                                    case "selfpayuser": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/WhiteCallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (??????)`)
                                                                        //#endregion
                                                                        break;
                                                                    case "countrySide": // ??????????????????
                                                                        //#region ?????????????????????????????????????????????????????? userId
                                                                        history.push(`/Case/RuralCallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (??????????????????)`)
                                                                        //#endregion
                                                                        break;
                                                                    case "bususer": // ????????????
                                                                        //#region ???????????????????????????????????????????????? userId
                                                                        history.push(`/Case/BusCallCar?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}&caseName=${rowData.name} (????????????)`)
                                                                        //#endregion
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                //#endregion

                                                            }}
                                                        >
                                                            ??????
                                                        </NativeLineButton>
                                                    }


                                                    {/* ???????????? */}
                                                    {/* ??????????????????????????????"????????????", "??????", "??????", "????????????", "??????"??? ?????? */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Case/btnEdit")
                                                            &&
                                                            showEditButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // ????????????
                                                            theme={laptopL.editButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)
                                                                // console.log(rowData.birthday)
                                                                // console.log(moment(rowData.birthday, "YYYY-MM-DD"))

                                                                //#region ?????????????????? Switch
                                                                // ??????????????????????????????Valu ????????? _caseId ??????????????????split?????????
                                                                switch (selectCaseList?.value.split("_")[0]) {
                                                                    case "baseInfo": // ????????????
                                                                        //#region ?????????????????? Modal
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
                                                                                props.controllGCS("editClientModalClose")
                                                                            },
                                                                            yesOnClick: (e, close) => {
                                                                                //#region ????????????
                                                                                let validMsg = "";
                                                                                if (valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Name") ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Birthday") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Uid") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Sex")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["???????????????", "??????????????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("CasePage", "Cellphone") ?? "", ["^.{1,}$", "^0[0-9]{7,}$"], ["???????????????", "??????????????????????????????"])[1]
                                                                                }
                                                                                //#endregion

                                                                                //#region ?????????????????????
                                                                                if (validMsg !== "") {
                                                                                    // console.log(validMsg, globalContextService.get("CasePage"))
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
                                                                                    props.AddOrUpdateClientExecute({
                                                                                        id: rowData.id,
                                                                                        account: globalContextService.get("CasePage", "Uid"), //??????????????????????????????
                                                                                        birthday: globalContextService.get("CasePage", `Birthday`),
                                                                                        name: globalContextService.get("CasePage", `Name`),
                                                                                        organizationIds: "", // ???????????????
                                                                                        password: globalContextService.get("CasePage", `Birthday`).replaceAll("-", ""),
                                                                                        phone: globalContextService.get("CasePage", "Cellphone"),
                                                                                        sex: globalContextService.get("CasePage", "Sex")?.value,
                                                                                        status: 1, // ??????
                                                                                        uid: globalContextService.get("CasePage", "Uid"),
                                                                                    })
                                                                                    close();
                                                                                }
                                                                                //#endregion
                                                                            },
                                                                            closeIconOnClick: (e) => {
                                                                                props.controllGCS("editClientModalClose")
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
                                                                                        {/* ???????????? - ?????? Name */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>??????<Text theme={laptopL.nameRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Name") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Name", value);
                                                                                            }}
                                                                                            theme={laptopL.name}
                                                                                        />

                                                                                        {/* ???????????? - ??????????????? Birthday */}
                                                                                        <DateTimePicker
                                                                                            topLabel={<>???????????????<Text theme={laptopL.birthdayRequired}>(??????)</Text></>}
                                                                                            // type={"time"} time???date???week???month???quarter???year
                                                                                            type={"date"}
                                                                                            format={"YYYY-MM-DD"}
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            // viewType
                                                                                            isSearchable
                                                                                            placeholder={""}
                                                                                            value={moment(rowData.birthday, "YYYY-MM-DD")}
                                                                                            onChange={(value, momentObj) => {
                                                                                                globalContextService.set("CasePage", `Birthday`, value);
                                                                                            }}
                                                                                            theme={laptopL.birthday}
                                                                                        />

                                                                                        {/* ???????????? - ??????????????? Uid */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>???????????????<Text theme={laptopL.uidRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Uid") ?? rowData.uid}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Uid", value);
                                                                                            }}
                                                                                            theme={laptopL.uid}
                                                                                        />

                                                                                        {/* ???????????? - ?????? Sex */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>??????<Text theme={laptopL.sexRequired}>(??????)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"???????????????"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("CasePage", "Sex") ?? { value: rowData.sex, label: rowData.label === 0 ? '???' : '???' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("CasePage", "Sex", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                { value: 0, label: '???' },
                                                                                                { value: 1, label: '???' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={laptopL.sex}
                                                                                        />

                                                                                        {/* ???????????? - ?????? Cellphone */}
                                                                                        <TextInput
                                                                                            // viewType
                                                                                            topLabel={<>??????<Text theme={laptopL.cellphoneRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Cellphone") ?? rowData.phone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Cellphone", value);
                                                                                            }}
                                                                                            theme={laptopL.cellphone}
                                                                                        />

                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: laptopL.editModal
                                                                        })

                                                                        //#endregion
                                                                        break;
                                                                    case "caseuser": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/Edit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "selfpayuser": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/WhiteEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "countrySide": // ??????????????????
                                                                        //#region ?????????????????????????????????????????????????????? userId
                                                                        history.push(`/Case/RuralEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "bususer": // ????????????
                                                                        //#region ???????????????????????????????????????????????? userId
                                                                        history.push(`/Case/BusEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "daycare": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/DayCareEdit?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                //#endregion
                                                            }}
                                                        >
                                                            ??????
                                                        </NativeLineButton>
                                                    }

                                                    {/* ???????????? */}
                                                    {/* ??????????????????????????????"????????????", "??????", "??????", "????????????"??? ?????? */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Case/btnToView")
                                                            &&
                                                            showToViewButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // ????????????
                                                            theme={laptopL.toViewButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)
                                                                // console.log("selectCaseList??????", selectCaseList)
                                                                // console.log(moment(rowData.birthday, "YYYY-MM-DD"))

                                                                //#region ?????????????????? Switch
                                                                switch (selectCaseList?.value.split("_")[0]) {
                                                                    case "baseInfo": // ????????????
                                                                        //#region ?????????????????? Modal
                                                                        modalsService.titleModal.normal({
                                                                            //id: "top1",
                                                                            title: "????????????",
                                                                            yes: true,
                                                                            yesText: "??????",
                                                                            no: false,
                                                                            noText: "??????",
                                                                            // autoClose: true,
                                                                            backgroundClose: false,
                                                                            noOnClick: (e) => {
                                                                                props.controllGCS("viewClientModalClose")
                                                                            },
                                                                            yesOnClick: (e, close) => { close(); },
                                                                            closeIconOnClick: (e) => {
                                                                                props.controllGCS("viewClientModalClose")
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
                                                                                        {/* ???????????? - ?????? Name */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>??????<Text theme={laptopL.nameRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Name") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Name", value);
                                                                                            }}
                                                                                            theme={laptopL.name}
                                                                                        />

                                                                                        {/* ???????????? - ??????????????? Birthday */}
                                                                                        <DateTimePicker
                                                                                            topLabel={<>???????????????<Text theme={laptopL.birthdayRequired}>(??????)</Text></>}
                                                                                            // type={"time"} time???date???week???month???quarter???year
                                                                                            type={"date"}
                                                                                            format={"YYYY-MM-DD"}
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            viewType
                                                                                            isSearchable
                                                                                            placeholder={""}
                                                                                            value={moment(rowData.birthday, "YYYY-MM-DD")}
                                                                                            onChange={(value, momentObj) => {
                                                                                                globalContextService.set("CasePage", `Birthday`, value);
                                                                                            }}
                                                                                            theme={laptopL.birthday}
                                                                                        />

                                                                                        {/* ???????????? - ??????????????? Uid */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>???????????????<Text theme={laptopL.uidRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Uid") ?? rowData.uid}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Uid", value);
                                                                                            }}
                                                                                            theme={laptopL.uid}
                                                                                        />

                                                                                        {/* ???????????? - ?????? Sex */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>??????<Text theme={laptopL.sexRequired}>(??????)</Text></>}
                                                                                            viewType
                                                                                            isSearchable
                                                                                            placeholder={"???????????????"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("CasePage", "Sex") ?? { value: rowData.sex, label: rowData.label === 0 ? '???' : '???' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("CasePage", "Sex", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                { value: 0, label: '???' },
                                                                                                { value: 1, label: '???' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={laptopL.sex}
                                                                                        />

                                                                                        {/* ???????????? - ?????? Cellphone */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>??????<Text theme={laptopL.cellphoneRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("CasePage", "Cellphone") ?? rowData.phone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("CasePage", "Cellphone", value);
                                                                                            }}
                                                                                            theme={laptopL.cellphone}
                                                                                        />

                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: laptopL.editModal
                                                                        })

                                                                        //#endregion
                                                                        break;
                                                                    case "caseuser": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/Information?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "selfpayuser": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/WhiteInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "countrySide": // ??????????????????
                                                                        //#region ?????????????????????????????????????????????????????? userId
                                                                        history.push(`/Case/RuralInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "bususer": // ????????????
                                                                        //#region ???????????????????????????????????????????????? userId
                                                                        history.push(`/Case/BusInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    case "daycare": // ??????
                                                                        //#region ?????????????????????????????????????????? userId
                                                                        history.push(`/Case/DayCareInformation?userId=${rowData.id}&caseUserId=${selectCaseList?.value.split("_")[1]}`)
                                                                        //#endregion
                                                                        break;
                                                                    default:
                                                                        break;
                                                                }
                                                                //#endregion
                                                            }}
                                                        >
                                                            ??????
                                                        </NativeLineButton>
                                                    }

                                                    {/* ?????????????????? */}
                                                    {/* ??????????????????????????????"??????"??? ?????? */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Case/btnQuota")
                                                            &&
                                                            showQuotaButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // ????????????
                                                            theme={laptopL.quotaButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)
                                                                // globalContextService.set("CasePage", "APIError", selectCaseList?.value.split("_")[1]); // ??????????????????api ????????????id??????

                                                                props.GetCanUseQuotaExecute(selectCaseList?.value.split("_")[1]);
                                                                //#region ?????????????????? Modal
                                                                props.setOpenQuotaModal(true);
                                                                //#endregion
                                                            }}
                                                        >
                                                            ????????????
                                                        </NativeLineButton>
                                                    }

                                                    {/* B???????????? */}
                                                    {/* ??????????????????????????????"??????"??? ?????? */}
                                                    {
                                                        (
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Case/btnBUnit")
                                                            &&
                                                            showBUnitButton.some(c => globalContextService.get("CasePage", `CaseList_${rowData.id}`)?.label?.includes(c))
                                                        )
                                                        &&
                                                        <NativeLineButton
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            disable={false}
                                                            type="button" // ????????????
                                                            theme={laptopL.bUnitButton}
                                                            onClick={() => {
                                                                let selectCaseList = globalContextService.get("CasePage", `CaseList_${rowData.id}`)

                                                                props.GetAllBUnitsExecute();
                                                                props.GetChooseBUnitsExecute(selectCaseList?.value.split("_")[1]);
                                                                //#region ??????B?????? Modal
                                                                props.setOpenBUnitModal(true);
                                                                //#endregion
                                                            }}
                                                        >
                                                            B??????
                                                        </NativeLineButton>
                                                    }
                                                </Container>
                                            </>
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
                        // data={[{ id: "asdasd-415asd1sa5d-asd", carType: "?????????", seat: 6, brandModel: "BMW", wheelchairCount: 1, name: "???", uid: "G12312512", sex: "???", cellphone: "0987854555", carNumber: "N8N-6541" }]}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        data={props.AllClient.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>
            </MainPageContainer>

            {/* B???????????? */}
            {props.OpenBUnitModal &&
                <BUnitTitleModal
                    // theme={{}}
                    setOpenBUnitModal={props.setOpenBUnitModal}
                    AllBUnits={props.AllBUnits}
                    setAllBUnits={props.setAllBUnits}
                    ChooseBUnits={props.ChooseBUnits}
                    setChooseBUnits={props.setChooseBUnits}
                    UpdateBUnitExecute={props.UpdateBUnitExecute}


                    controllGCS={props.controllGCS}
                />
            }

            {/* ?????????????????? */}
            {props.OpenQuotaModal &&
                <QuotaTitleModal
                    // theme={{}}
                    setQuotaInfo={props.setQuotaInfo}
                    QuotaInfo={props.QuotaInfo}
                    UpdateQuotaExecute={props.UpdateQuotaExecute}
                    setOpenQuotaModal={props.setOpenQuotaModal}
                    controllGCS={props.controllGCS}
                />
            }
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`