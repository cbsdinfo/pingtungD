import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Assign } from '../../../../Assets/img/OrgManagerPage/Assign.svg'
import { ReactComponent as Del } from '../../../../Assets/img/OrgManagerPage/Del.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/OrgManagerPage/Edit.svg'
import { ReactComponent as CaretDown } from '../../../../Assets/img/OrgManagerPage/CaretDown.svg'
import { ReactComponent as Refresh } from '../../../../Assets/img/OrgManagerPage/Refresh.svg'
import { ReactComponent as TableDisable } from '../../../../Assets/img/OrgManagerPage/TableDisable.svg'
import { ReactComponent as TableEdit } from '../../../../Assets/img/OrgManagerPage/TableEdit.svg'
import { ReactComponent as TableEnable } from '../../../../Assets/img/OrgManagerPage/TableEnable.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { orgManager: { rwd: { tablet } } } } = Theme;
    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("OrgManagerPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* ????????? */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"????????????"}
                            theme={tablet.titleBar}
                            onSubmit={(e) => {
                                console.log("???????????????????????????")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            {/* ?????????????????? */}
                            {
                                // ????????????
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnAdd") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* ???????????? */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // ????????????
                                            theme={tablet.addButton}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                let rowData = {};

                                                //#region ???????????? Modal
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
                                                        props.controllGCS("addModalClose")
                                                    },
                                                    yesOnClick: (e, close) => {
                                                        //#region ????????????
                                                        let validMsg = "";
                                                        if (valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["??????????????????????????????"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["??????????????????????????????"])[1]
                                                        }
                                                        else if (valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                            validMsg = valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                        }
                                                        else if (valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null???", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                            validMsg = valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null???", ["^.{1,}$"], ["?????????????????????"])[1]
                                                        }
                                                        //#endregion

                                                        //#region ?????????????????????
                                                        if (validMsg !== "") {
                                                            console.log(validMsg, globalContextService.get("OrgManagerPage"))
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
                                                            props.orgsAddExecute({
                                                                cascadeId: "",
                                                                name: globalContextService.get("OrgManagerPage", "UnitName"),
                                                                uidRequired: globalContextService.get("OrgManagerPage", "Uid"),
                                                                firstContact: globalContextService.get("OrgManagerPage", "FirstContact"),
                                                                firstContactTelephone: globalContextService.get("OrgManagerPage", "FirstContactTelephone"),
                                                                firstContacCellhone: globalContextService.get("OrgManagerPage", "FirstContacCellhone"),
                                                                status: globalContextService.get("OrgManagerPage", "Status")?.value,
                                                                parentId: globalContextService.get("OrgManagerPage", "UpperOrg")?.value,
                                                                parentName: globalContextService.get("OrgManagerPage", "UpperOrg")?.label,
                                                            })
                                                            close();
                                                        }
                                                        //#endregion
                                                    },
                                                    closeIconOnClick: (e) => {
                                                        props.controllGCS("addModalClose")
                                                    },
                                                    content: (
                                                        <FormContainer
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                            }}
                                                            theme={tablet.editFormContainer}
                                                        >
                                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                {/* ???????????? - ???????????? UnitName */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>????????????<Text theme={tablet.unitNameRequired}>(??????)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "UnitName") ?? rowData.name}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "UnitName", value);
                                                                    }}
                                                                    theme={tablet.unitName}
                                                                />
                                                                {/* ???????????? - ???????????? Uid */}
                                                                <TextInput
                                                                    // viewType
                                                                    topLabel={<>????????????<Text theme={tablet.uidRequired}>(??????)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "Uid") ?? rowData.uid}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "Uid", value);
                                                                    }}
                                                                    theme={tablet.uid}
                                                                />
                                                                {/* ???????????? - ??????????????? FirstContact */}
                                                                <TextInput
                                                                    topLabel={<>???????????????<Text theme={tablet.firstContactRequired}>(??????)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "FirstContact") ?? rowData.firstContact}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "FirstContact", value);
                                                                    }}
                                                                    theme={tablet.firstContact}
                                                                />
                                                                {/* ???????????? - ????????????????????? FirstContactTelephone */}
                                                                <TextInput
                                                                    topLabel={<>?????????????????????<Text theme={tablet.firstContactTelephoneRequired}>(??????)</Text></>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? rowData.firstContactTelephone}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "FirstContactTelephone", value);
                                                                    }}
                                                                    theme={tablet.firstContactTelephone}
                                                                />
                                                                {/* ???????????? - ????????????????????? FirstContacCellhone */}
                                                                <TextInput
                                                                    topLabel={<>?????????????????????</>}
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    type="text"
                                                                    placeholder={""}
                                                                    value={globalContextService.get("OrgManagerPage", "FirstContacCellhone") ?? rowData.firstContacCellhone}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "FirstContacCellhone", value);
                                                                    }}
                                                                    theme={tablet.firstContacCellhone}
                                                                />
                                                                {/* ???????????? - ?????? Status */}
                                                                <Selector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>??????<Text theme={tablet.statusRequired}>(??????)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"?????????????????????"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("OrgManagerPage", "Status") ?? {}}
                                                                    onChange={(e, value, onInitial) => {
                                                                        // console.log(value)
                                                                        globalContextService.set("OrgManagerPage", "Status", value);
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "???????????????", isDisabled: true },
                                                                        { value: 0, label: '??????' },
                                                                        { value: 1, label: '??????' }
                                                                    ]}
                                                                    menuPosition={true}
                                                                    theme={tablet.status}
                                                                />
                                                                {/* ???????????? - ???????????? UpperOrg */}
                                                                <TreeSelector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>????????????<Text theme={tablet.upperOrgRequired}>(??????)</Text></>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"?????????????????????"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
                                                                    onChange={(e, value, onInitial) => {
                                                                        globalContextService.set("OrgManagerPage", "UpperOrg", value);
                                                                    }}
                                                                    options={props.OrgsTree}
                                                                    addHeadOptions={[{ value: null, label: "?????????" }]}
                                                                    optionsValueKeyName={"id"}
                                                                    optionsLabelKeyName={"name"}
                                                                    menuPosition={true}
                                                                    theme={tablet.upperOrg}
                                                                />
                                                            </FormRow>
                                                        </FormContainer>
                                                    ),
                                                    theme: tablet.editModal
                                                })
                                                //#endregion
                                            }}
                                        >
                                            {/* ???????????? ?????? */}
                                            <Plus style={tablet.addButtonIcon} />
                                        ??????
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* ???????????????????????? */}
                            {
                                // ????????????
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnAssignOrgUser") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* ?????????????????? */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // ????????????
                                            theme={tablet.assignButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("OrgManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");

                                                //#region ???????????????????????????
                                                if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
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
                                                    let rowData = { ...checkedRowsData[0] };

                                                    props.GetUsersLoadByOrgExecute(rowData.id);
                                                    props.GetAllUsersLoadByOrgExecute("");
                                                    //#region ?????????????????? Modal
                                                    props.setOpenAssign(true);// ??????????????????
                                                    //#endregion
                                                }
                                                //#endregion

                                            }}
                                        >
                                            {/* ?????????????????? ?????? */}
                                            <Assign style={tablet.assignButtonIcon} />
                                            ????????????
                                        </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* ?????????????????? */}
                            {
                                // ????????????
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnEdit") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* ???????????? */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // ????????????
                                            theme={tablet.editButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // let checkedRowKeys = globalContextService.get("OrgManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");

                                                //#region ???????????????????????????
                                                if ((checkedRowsData?.length ?? 0) === 0 || checkedRowsData?.length > 1) {
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
                                                    let rowData = { ...checkedRowsData[0] };
                                                    //#region ???????????? Modal
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
                                                            props.controllGCS("editModalClose")
                                                        },
                                                        yesOnClick: (e, close) => {
                                                            //#region ????????????
                                                            let validMsg = "";
                                                            if (valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["??????????????????????????????"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["??????????????????????????????"])[1]
                                                            }
                                                            else if (valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                validMsg = valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                            }
                                                            else if (valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null???", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                validMsg = valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null???", ["^.{1,}$"], ["?????????????????????"])[1]
                                                            }
                                                            //#endregion

                                                            //#region ?????????????????????
                                                            if (validMsg !== "") {
                                                                console.log(validMsg, globalContextService.get("OrgManagerPage"))
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
                                                                props.orgsAddExecute({
                                                                    cascadeId: "",
                                                                    name: globalContextService.get("OrgManagerPage", "UnitName"),
                                                                    uidRequired: globalContextService.get("OrgManagerPage", "Uid"),
                                                                    firstContact: globalContextService.get("OrgManagerPage", "FirstContact"),
                                                                    firstContactTelephone: globalContextService.get("OrgManagerPage", "FirstContactTelephone"),
                                                                    firstContacCellhone: globalContextService.get("OrgManagerPage", "FirstContacCellhone"),
                                                                    status: globalContextService.get("OrgManagerPage", "Status")?.value,
                                                                    parentId: globalContextService.get("OrgManagerPage", "UpperOrg")?.value,
                                                                    parentName: globalContextService.get("OrgManagerPage", "UpperOrg")?.label,
                                                                })
                                                                close();
                                                            }
                                                            //#endregion
                                                        },
                                                        closeIconOnClick: (e) => {
                                                            props.controllGCS("editModalClose")
                                                        },
                                                        content: (
                                                            <FormContainer
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                }}
                                                                theme={tablet.editFormContainer}
                                                            >
                                                                <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                    {/* ???????????? - ???????????? UnitName */}
                                                                    <TextInput
                                                                        viewType
                                                                        topLabel={<>????????????<Text theme={tablet.unitNameRequired}>(??????)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "UnitName") ?? rowData.name}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "UnitName", value);
                                                                        }}
                                                                        theme={tablet.unitName}
                                                                    />
                                                                    {/* ???????????? - ???????????? Uid */}
                                                                    <TextInput
                                                                        viewType
                                                                        topLabel={<>????????????<Text theme={tablet.uidRequired}>(??????)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "Uid") ?? rowData.uid}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "Uid", value);
                                                                        }}
                                                                        theme={tablet.uid}
                                                                    />
                                                                    {/* ???????????? - ??????????????? FirstContact */}
                                                                    <TextInput
                                                                        topLabel={<>???????????????<Text theme={tablet.firstContactRequired}>(??????)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "FirstContact") ?? rowData.firstContact}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "FirstContact", value);
                                                                        }}
                                                                        theme={tablet.firstContact}
                                                                    />
                                                                    {/* ???????????? - ????????????????????? FirstContactTelephone */}
                                                                    <TextInput
                                                                        topLabel={<>?????????????????????<Text theme={tablet.firstContactTelephoneRequired}>(??????)</Text></>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? rowData.firstContactTelephone}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "FirstContactTelephone", value);
                                                                        }}
                                                                        theme={tablet.firstContactTelephone}
                                                                    />
                                                                    {/* ???????????? - ????????????????????? FirstContacCellhone */}
                                                                    <TextInput
                                                                        topLabel={<>?????????????????????</>}
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        type="text"
                                                                        placeholder={""}
                                                                        value={globalContextService.get("OrgManagerPage", "FirstContacCellhone") ?? rowData.firstContacCellhone}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "FirstContacCellhone", value);
                                                                        }}
                                                                        theme={tablet.firstContacCellhone}
                                                                    />
                                                                    {/* ???????????? - ?????? Status */}
                                                                    <Selector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>??????<Text theme={tablet.statusRequired}>(??????)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={"?????????????????????"}
                                                                        // isMulti
                                                                        // hideSelectedOptions={false}
                                                                        value={globalContextService.get("OrgManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '??????' : '??????' }}
                                                                        onChange={(e, value, onInitial) => {
                                                                            // console.log(value)
                                                                            globalContextService.set("OrgManagerPage", "Status", value);
                                                                        }}

                                                                        options={[
                                                                            { value: 'hint', label: "???????????????", isDisabled: true },
                                                                            { value: 0, label: '??????' },
                                                                            { value: 1, label: '??????' }
                                                                        ]}
                                                                        menuPosition={true}
                                                                        theme={tablet.status}
                                                                    />
                                                                    {/* ???????????? - ???????????? UpperOrg */}
                                                                    <TreeSelector
                                                                        bascDefaultTheme={"DefaultTheme"}
                                                                        topLabel={<>????????????<Text theme={tablet.upperOrgRequired}>(??????)</Text></>}
                                                                        //viewType
                                                                        isSearchable
                                                                        placeholder={"?????????????????????"}
                                                                        // isMulti
                                                                        // hideSelectedOptions={false}
                                                                        value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
                                                                        onChange={(e, value, onInitial) => {
                                                                            globalContextService.set("OrgManagerPage", "UpperOrg", value);
                                                                        }}
                                                                        options={props.OrgsTree}
                                                                        addHeadOptions={[{ value: null, label: "?????????" }]}
                                                                        optionsValueKeyName={"id"}
                                                                        optionsLabelKeyName={"name"}
                                                                        menuPosition={true}
                                                                        theme={tablet.upperOrg}
                                                                    />
                                                                </FormRow>
                                                            </FormContainer>
                                                        ),
                                                        theme: tablet.editModal
                                                    })
                                                    //#endregion
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* ???????????? ?????? */}
                                            <Edit style={tablet.editButtonIcon} />
                                ??????
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* ?????????????????? */}
                            {
                                // ????????????
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnDel") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* ???????????? */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // ????????????
                                            theme={tablet.delButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let checkedRowKeys = globalContextService.get("OrgManagerPage", "CheckedRowKeys");
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");

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
                                                            props.orgsDelExecute(checkedRowKeys);
                                                            close();
                                                        }
                                                    })
                                                }
                                                //#endregion
                                            }}
                                        >
                                            {/* ???????????? ?????? */}
                                            <Del style={tablet.delButtonIcon} />
                                ??????
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* ?????????????????? */}
                            {
                                // ????????????
                                (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnRefresh") &&
                                (
                                    <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                        {/* ???????????? */}
                                        <NativeLineButton
                                            baseDefaultTheme={"DefaultTheme"}
                                            disable={false}
                                            type="button" // ????????????
                                            theme={tablet.refreshButton}
                                            onClick={(e) => {
                                                props.controllGCS("Refresh", "API");
                                                props.GetSubOrgsExecute(true, "");
                                                globalContextService.set("OrgManagerPage", "orgId", "");
                                                // globalContextService.get("OrgManagerPage", "setSelectStateForTreeSelector")("");
                                            }}
                                        >
                                            {/* ???????????? ?????? */}
                                            <Refresh style={tablet.refreshButtonIcon} />
                                ??????
                                </NativeLineButton>
                                    </SubContainer>
                                )
                            }

                            {/* id/?????? ????????? IdDescribe*/}
                            <CheckboxX
                                baseDefaultTheme={"DefaultTheme"}
                                text={"id/??????"}
                                theme={tablet.idDescribe}
                                checked={globalContextService.get("OrgManagerPage", "IdDescribe") ?? false}
                                onChange={(e, checked, onInitial) => {
                                    setIdDescribe(checked)
                                    globalContextService.set("OrgManagerPage", "IdDescribe", checked);
                                }}
                            />
                        </MainPageTitleBar>

                        <FormContainer
                            theme={tablet.formContainer}
                            onSubmit={(e) => {
                                console.log("???????????????????????????")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >
                            <FormRow>
                                {/* ???????????? SelectOrg */}
                                <TreeSelector
                                    bascDefaultTheme={"DefaultTheme"}
                                    isSearchable
                                    placeholder={"???????????????"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        globalContextService.get("OrgManagerPage", "orgId") ?
                                            { value: globalContextService.get("OrgManagerPage", "orgId"), label: globalContextService.get("OrgManagerPage", "orgNameForTreeSelector") }
                                            :
                                            { value: "", label: "????????????" }
                                    }
                                    onChange={(e, value, onInitial) => {
                                        if (globalContextService.get("OrgManagerPage", "orgId") !== value.value) {
                                            globalContextService.set("OrgManagerPage", "orgId", value.value) // ????????????orgId?????????????????????API???????????????
                                            globalContextService.set("OrgManagerPage", "orgNameForTreeSelector", value.name)
                                            props.GetSubOrgsExecute(true, value.value);
                                            // console.log("???????????????????????????")
                                            // props.GetSubOrgsExecute(true, "");
                                        }
                                    }}
                                    options={props.OrgsTree}
                                    addHeadOptions={[{ value: "", label: "????????????" }]}
                                    optionsValueKeyName={"id"}
                                    optionsLabelKeyName={"name"}
                                    menuPosition={true}
                                    theme={tablet.selectOrg}
                                />
                                {/* ??????????????? ??????????????????  */}
                                <TextInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={tablet.keyword}
                                    type="text"
                                    placeholder={"??????????????????"}
                                    rightIcon={
                                        <Search
                                            style={tablet.keywordRightIcon}
                                            onClick={(e) => {
                                                console.log("???????????????????????????")
                                                // props.GetSubOrgsExecute(true, "");
                                            }
                                            }
                                        />
                                    }
                                    value={globalContextService.get("OrgManagerPage", "Keyword") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("OrgManagerPage", "Keyword", value);
                                    }}
                                />
                            </FormRow>
                        </FormContainer>

                    </>
                }
            >

                {/* ????????????????????? Table ?????? */}
                <Container
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.leftMenuRightTableContainer}
                >


                    {/* ?????? Table ?????? */}
                    <SubContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.rightTableContainer}
                    >
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.rightTableSubContainer}
                        >
                            <OldTable
                                dataChangeClearChecked={true} //???Data????????? ????????????????????????
                                dataChangeClearCheckedToDo={() => { //???Data????????? ???????????????????????????????????????
                                    if (globalContextService.get("OrgManagerPage", "orgId") !== globalContextService.get("OrgManagerPage", "TableCheckedClearKey")) {
                                        globalContextService.remove("OrgManagerPage", "CheckedRowKeys");
                                        globalContextService.remove("OrgManagerPage", "CheckedRowsData");
                                    }
                                }}
                                checkbox={true}
                                checked={globalContextService.get("OrgManagerPage", "CheckedRowKeys") && globalContextService.get("OrgManagerPage", "CheckedRowKeys")}
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("OrgManagerPage", "CheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("OrgManagerPage", "CheckedRowsData", checkedRows);
                                        //#region ?????????????????????"?????????"????????????????????????????????????????????"??????????????????"????????????
                                        globalContextService.set("OrgManagerPage", "TableCheckedClearKey", globalContextService.get("OrgManagerPage", "orgId"));
                                        //#endregion
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
                                            title: '????????????',
                                            width: "600px",
                                            dataIndex: 'name',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '????????????',
                                            width: "120px",
                                            dataIndex: 'uid',
                                            // sorter: (a, b) => a.uid.length - b.uid.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '???????????????',
                                            width: "97px",
                                            dataIndex: 'firstContact',
                                            // sorter: (a, b) => a.firstContact.length - b.firstContact.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '?????????????????????',
                                            width: "123px",
                                            dataIndex: 'firstContactTelephone ',
                                            // sorter: (a, b) => a.firstContactTelephone.length - b.firstContactTelephone.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '?????????????????????',
                                            width: "123px",
                                            dataIndex: 'firstContacCellhone',
                                            // sorter: (a, b) => a.firstContacCellhone.length - b.firstContacCellhone.length,
                                            // fixed: 'left',
                                        },
                                        (IdDescribe &&
                                        {
                                            title: 'Id',
                                            width: "360px",
                                            dataIndex: 'id',
                                            sorter: (a, b) => a.id.length - b.id.length,
                                            // fixed: 'left',
                                        }
                                        ),
                                        {
                                            title: '????????????',
                                            width: "120px",
                                            dataIndex: 'cascadeId',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '????????????',
                                            width: "600px",
                                            dataIndex: 'parentName',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '???????????????',
                                            width: "176px",
                                            // dataIndex: 'parentName',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            fixed: 'right',
                                            render: (rowData) => {
                                                return (
                                                    <>
                                                        {rowData.status === 1 ?
                                                            <Tag
                                                                baseDefaultTheme={"SecondaryTheme"}
                                                                theme={{
                                                                    container: {
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            margin: "0",
                                                                            padding: "0px 7px",
                                                                            fontSize: "12px",
                                                                            lineHeight: "20px"
                                                                        }),
                                                                        hover: {}
                                                                    }
                                                                }}
                                                                text={"??????"}
                                                            />
                                                            :
                                                            <Tag
                                                                baseDefaultTheme={"SuccessTheme"}
                                                                theme={{
                                                                    container: {
                                                                        basic: (style, props) => ({
                                                                            ...style,
                                                                            margin: "0",
                                                                            padding: "0px 7px",
                                                                            fontSize: "12px",
                                                                            lineHeight: "20px"
                                                                        }),
                                                                        hover: {}
                                                                    }
                                                                }}
                                                                text={"??????"}
                                                            />
                                                        }

                                                        {/* ???????????? */}
                                                        {
                                                            // ????????????
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnEdit") &&
                                                            (

                                                                < NativeLineButton
                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                    disable={false}
                                                                    type="button" // ????????????
                                                                    theme={tablet.tableEditButton}
                                                                    onClick={() => {
                                                                        //#region ???????????? Modal
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
                                                                                props.controllGCS("editModalClose")
                                                                            },
                                                                            yesOnClick: (e, close) => {
                                                                                //#region ????????????
                                                                                let validMsg = "";
                                                                                if (valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "UnitName") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "Uid") ?? "", ["^.{1,}$"], ["?????????????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContact") ?? "", ["^.{1,}$"], ["????????????????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["??????????????????????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? "", ["^.{1,}$"], ["??????????????????????????????"])[1]
                                                                                }
                                                                                else if (valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]) {
                                                                                    validMsg = valid(globalContextService.get("OrgManagerPage", "Status")?.value ?? "", ["^.{1,}$"], ["???????????????"])[1]
                                                                                }
                                                                                else if (valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null???", ["^.{1,}$"], ["?????????????????????"])[1]) {
                                                                                    validMsg = valid(isUndefined(globalContextService.get("OrgManagerPage", "UpperOrg")?.value) ? "" : "null???", ["^.{1,}$"], ["?????????????????????"])[1]
                                                                                }
                                                                                //#endregion

                                                                                //#region ?????????????????????
                                                                                if (validMsg !== "") {
                                                                                    console.log(validMsg, globalContextService.get("OrgManagerPage"))
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
                                                                                    props.orgsAddExecute({
                                                                                        cascadeId: "",
                                                                                        name: globalContextService.get("OrgManagerPage", "UnitName"),
                                                                                        uidRequired: globalContextService.get("OrgManagerPage", "Uid"),
                                                                                        firstContact: globalContextService.get("OrgManagerPage", "FirstContact"),
                                                                                        firstContactTelephone: globalContextService.get("OrgManagerPage", "FirstContactTelephone"),
                                                                                        firstContacCellhone: globalContextService.get("OrgManagerPage", "FirstContacCellhone"),
                                                                                        status: globalContextService.get("OrgManagerPage", "Status")?.value,
                                                                                        parentId: globalContextService.get("OrgManagerPage", "UpperOrg")?.value,
                                                                                        parentName: globalContextService.get("OrgManagerPage", "UpperOrg")?.label,
                                                                                    })
                                                                                    close();
                                                                                }
                                                                                //#endregion
                                                                            },
                                                                            closeIconOnClick: (e) => {
                                                                                props.controllGCS("editModalClose")
                                                                            },
                                                                            content: (
                                                                                <FormContainer
                                                                                    baseDefaultTheme={"DefaultTheme"}
                                                                                    onSubmit={(e) => {
                                                                                        e.preventDefault();
                                                                                    }}
                                                                                    theme={tablet.editFormContainer}
                                                                                >
                                                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                                        {/* ???????????? - ???????????? UnitName */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>????????????<Text theme={tablet.unitNameRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "UnitName") ?? rowData.name}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "UnitName", value);
                                                                                            }}
                                                                                            theme={tablet.unitName}
                                                                                        />
                                                                                        {/* ???????????? - ???????????? Uid */}
                                                                                        <TextInput
                                                                                            viewType
                                                                                            topLabel={<>????????????<Text theme={tablet.uidRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "Uid") ?? rowData.uid}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "Uid", value);
                                                                                            }}
                                                                                            theme={tablet.uid}
                                                                                        />
                                                                                        {/* ???????????? - ??????????????? FirstContact */}
                                                                                        <TextInput
                                                                                            topLabel={<>???????????????<Text theme={tablet.firstContactRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "FirstContact") ?? rowData.firstContact}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "FirstContact", value);
                                                                                            }}
                                                                                            theme={tablet.firstContact}
                                                                                        />
                                                                                        {/* ???????????? - ????????????????????? FirstContactTelephone */}
                                                                                        <TextInput
                                                                                            topLabel={<>?????????????????????<Text theme={tablet.firstContactTelephoneRequired}>(??????)</Text></>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "FirstContactTelephone") ?? rowData.firstContactTelephone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "FirstContactTelephone", value);
                                                                                            }}
                                                                                            theme={tablet.firstContactTelephone}
                                                                                        />
                                                                                        {/* ???????????? - ????????????????????? FirstContacCellhone */}
                                                                                        <TextInput
                                                                                            topLabel={<>?????????????????????</>}
                                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                                            type="text"
                                                                                            placeholder={""}
                                                                                            value={globalContextService.get("OrgManagerPage", "FirstContacCellhone") ?? rowData.firstContacCellhone}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "FirstContacCellhone", value);
                                                                                            }}
                                                                                            theme={tablet.firstContacCellhone}
                                                                                        />
                                                                                        {/* ???????????? - ?????? Status */}
                                                                                        <Selector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>??????<Text theme={tablet.statusRequired}>(??????)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"?????????????????????"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("OrgManagerPage", "Status") ?? { value: rowData.status, label: rowData.status === 0 ? '??????' : '??????' }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                // console.log(value)
                                                                                                globalContextService.set("OrgManagerPage", "Status", value);
                                                                                            }}

                                                                                            options={[
                                                                                                { value: 'hint', label: "???????????????", isDisabled: true },
                                                                                                { value: 0, label: '??????' },
                                                                                                { value: 1, label: '??????' }
                                                                                            ]}
                                                                                            menuPosition={true}
                                                                                            theme={tablet.status}
                                                                                        />
                                                                                        {/* ???????????? - ???????????? UpperOrg */}
                                                                                        <TreeSelector
                                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                                            topLabel={<>????????????<Text theme={tablet.upperOrgRequired}>(??????)</Text></>}
                                                                                            //viewType
                                                                                            isSearchable
                                                                                            placeholder={"?????????????????????"}
                                                                                            // isMulti
                                                                                            // hideSelectedOptions={false}
                                                                                            value={globalContextService.get("OrgManagerPage", "UpperOrg") ?? { value: rowData.parentId, label: rowData.parentName }}
                                                                                            onChange={(e, value, onInitial) => {
                                                                                                globalContextService.set("OrgManagerPage", "UpperOrg", value);
                                                                                            }}
                                                                                            options={props.OrgsTree}
                                                                                            addHeadOptions={[{ value: null, label: "?????????" }]}
                                                                                            optionsValueKeyName={"id"}
                                                                                            optionsLabelKeyName={"name"}
                                                                                            menuPosition={true}
                                                                                            theme={tablet.upperOrg}
                                                                                        />
                                                                                    </FormRow>
                                                                                </FormContainer>
                                                                            ),
                                                                            theme: tablet.editModal
                                                                        })
                                                                        //#endregion
                                                                    }}
                                                                >
                                                                    ??????
                                                                </NativeLineButton>
                                                            )
                                                        }

                                                        {
                                                            // ????????????
                                                            (getParseItemLocalStorage("Functions") ?? []).includes("/Base/OrgManager/btnEnableAndDisable") &&
                                                            (rowData.status !== 1 ?
                                                                <>
                                                                    {/* ???????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={tablet.disableButton}
                                                                        onClick={() => {
                                                                            props.OrgsUpdateExecute({ ...rowData, status: 1 })
                                                                        }}
                                                                    >
                                                                        ??????
                                                                    </NativeLineButton>
                                                                </>
                                                                :
                                                                <>
                                                                    {/* ???????????? */}
                                                                    <NativeLineButton
                                                                        baseDefaultTheme={"DefaultTheme"}
                                                                        disable={false}
                                                                        type="button" // ????????????
                                                                        theme={tablet.enableButton}
                                                                        onClick={() => {
                                                                            props.OrgsUpdateExecute({ ...rowData, status: 0 })
                                                                        }}
                                                                    >
                                                                        ??????
                                                                    </NativeLineButton>
                                                                </>
                                                            )
                                                        }
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
                                data={props.SubOrgs.data}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>
                    </SubContainer>
                </Container>

            </MainPageContainer>

            {/* ?????????????????? */}
            {props.OpenAssign &&
                <AssignUserTitleModal
                    setOpenAssign={props.setOpenAssign}
                    AllUsersLoadByOrg={props.AllUsersLoadByOrg}
                    UsersLoadByOrg={props.UsersLoadByOrg}
                    GetUsersLoadByOrgExecute={props.GetUsersLoadByOrgExecute}
                    GetAllUsersLoadByOrgExecute={props.GetAllUsersLoadByOrgExecute}
                    controllGCS={props.controllGCS}
                    AssignOrgUsersExecute={props.AssignOrgUsersExecute}
                    AssignOrgUsersPending={props.AssignOrgUsersPending}
                />
            }
        </>

    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
