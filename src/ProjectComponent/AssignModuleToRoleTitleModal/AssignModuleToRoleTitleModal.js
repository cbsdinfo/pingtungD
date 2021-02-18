import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text, TitleModal, globalContextService, OldTable, Tooltip, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem, Checkbox } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isEqual, isUndefined } from 'lodash';
import { OrgsTree } from '../../ProjectComponent/OrgsTree/OrgsTree';
import { Tree } from 'antd';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 組織樹遍歷
const AssignModuleToRoleTitleModalBase = (props) => {

    const [Step, setStep] = useState(0); // 0 分配模塊 ， 1 分配菜單
    const [UpdateComponent, setUpdateComponent] = useState(false);

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列

    useEffect(() => {
        if (EscapeFristRender.current > 0) {

            setExpandedKeys((props?.Allmodules?.result ?? []).map((item) => { return item?.id }))
            // setCheckedKeys(["069475e3-c997-487a-9f29-e6a864c5c1d4"])
            setCheckedKeys((props?.SelectedModules ?? []).map((item) => { return item?.id }))

            setCheckedRowData(props?.SelectedModules ?? []);

            // console.log("props?.SelectedModules ", props?.SelectedModules)
            let checkedFunctionByModuleIdObj = {};
            (props?.SelectedModules ?? []).map((item) => { return item?.id }).forEach((moudleId, index) => {
                checkedFunctionByModuleIdObj[`${moudleId}`] = (props?.SelectedMenus ?? [])
                    .filter((it) => (it?.moduleId === moudleId))
                    .map((i) => { return (i.id) })
            })
            // console.log("checkedFunctionByModuleIdObj", checkedFunctionByModuleIdObj)
            setCheckedFunction(checkedFunctionByModuleIdObj);

            //#region 處理有沒有全選
            let AllcheckedFunctionByModuleIdObj = {}; // 全部選項
            (CheckedKeys ?? [])
                .forEach((moudleid, index) => {
                    AllcheckedFunctionByModuleIdObj[`${moudleid}`] = (props?.AllMenus?.result ?? [])
                        .filter((it) => (it?.moduleId === moudleid))
                        .map((i) => { return (i.id) })
                })
            setCheckAll(Object.values({ ...checkedFunctionByModuleIdObj }).flat().length === Object.values(AllcheckedFunctionByModuleIdObj).flat().length)

            setIndeterminate((!!Object.values({ ...checkedFunctionByModuleIdObj }).flat().length) && (Object.values({ ...checkedFunctionByModuleIdObj }).flat().length < Object.values(AllcheckedFunctionByModuleIdObj).flat().length))

            //#endregion
        }

        EscapeFristRender.current = EscapeFristRender.current + 1;
        setUpdateComponent(u => !u)//更新彈窗組件，以更新所選用戶文字

    }, [props.Allmodules, props.AllmodulesTree, props.SelectedModules, props.SelectedMenus])

    //#region Tree  !!!此為未規範組件，不適合大範圍使用
    const [ExpandedKeys, setExpandedKeys] = useState([]);
    const [CheckedKeys, setCheckedKeys] = useState([]); // 勾選列
    const [CheckedRowData, setCheckedRowData] = useState([]); // 勾選列資料
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
    };

    const onCheck = (checkedKeys, checkedRowData) => {
        // console.log('onCheck', checkedKeys, checkedRowData);
        setCheckedKeys(checkedKeys);
        setCheckedRowData(checkedRowData?.checkedNodes);
    };

    //#endregion

    //#region 第二頁 勾選菜單處理
    const [CheckedFunction, setCheckedFunction] = useState([]); // 勾選列資料
    useEffect(() => {
        let checkedFunctionByModuleIdObj = {};
        CheckedKeys.forEach((moudleid, index) => {
            checkedFunctionByModuleIdObj[`${moudleid}`] = (props?.SelectedMenus ?? [])
                .filter((it) => (it?.moduleId === moudleid))
                .map((i) => { return (i.id) })
        })
        setCheckedFunction(checkedFunctionByModuleIdObj);
    }, [CheckedKeys])

    const [Indeterminate, setIndeterminate] = useState(true); // 勾選列資料
    const [CheckAll, setCheckAll] = useState(false); // 勾選列資料

    const onCheckAllChange = (e) => {
        setCheckAll(e.target.checked);
        setIndeterminate(false)

        setCheckedFunction(c => {
            let checkedFunctionByModuleIdObj = {};
            //拿目前的所有 module 去作項目全選
            let res = (e.target.checked) ?
                (CheckedKeys ?? [])
                    // .map((item) => { return item?.id })
                    .forEach((moudleid, index) => {
                        checkedFunctionByModuleIdObj[`${moudleid}`] = (props?.AllMenus?.result ?? [])
                            .filter((it) => (it?.moduleId === moudleid))
                            .map((i) => { return (i.id) })
                    })
                :
                {}

            res = checkedFunctionByModuleIdObj;
            return res
        })
    }
    //#endregion
    return (
        <>
            <TitleModal
                //id: "top1",
                title={"為角色分配模塊"}
                yes={true}
                yesText={Step === 0 ? "下一步" : "上一步"}
                no={true}
                noText={"取消"}
                otherBtn={Step === 1 ? true : false}
                otherBtnText={"完成"}
                // autoClose={ true},
                backgroundClose={false}
                noOnClick={(e) => {
                    props.controllGCS("AssignModuleModalClose")
                    props.setOpenAssign("");
                }}
                yesOnClick={(e) => {
                    setStep(s => (s === 0 ? 1 : 0))
                }}
                otherBtnOnClick={(e) => {
                    //完成...
                    let checkedRowsData = globalContextService.get("RoleManagerPage", "CheckedRowsData");
                    let rowData = { ...checkedRowsData[0] };
                    let roleId = rowData.id; // 取得要分配角色ID
                    // console.log(props?.roleRowData);

                    globalContextService.set("RoleManagerPage", "CloseAssignModalState", props.setOpenAssign);

                    // roleId: "bd094755-3d3d-4cab-ac6e-e6169ca35637"
                    // userIds: ["49df1602-f5f3-4d52-afb7-3802da619558", "229f3a49-ab27-49ce-b383-9f10ca23a9d5",…]
                    props.UnassignModuleAndElementToRoleExecute({
                        roleId,
                        moduleSecIds: [...CheckedKeys],
                        elementSecIds: Object.values(CheckedFunction).flat()
                    })

                    // props.AssignModuleAndElementToRoleExecute({
                    //     roleId,
                    //     moduleSecIds: [...CheckedKeys],
                    //     elementSecIds: [Object.values(CheckedFunction).flat()]
                    // })
                }}
                closeIconOnClick={(e) => {
                    props.setOpenAssign("");
                    props.controllGCS("AssignModuleModalClose")
                }}
                content={(
                    <>
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme({ ...props, step: Step }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "leftMenuSubContainer") }}
                        >
                            {/* 左側選單容器 ScrollBar */}
                            <ScrollBar
                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "leftMenuSubScrollBar") }}
                            >
                                {/* !!!此為未規範組件，不適合大範圍使用 */}
                                <Tree
                                    checkable
                                    onExpand={onExpand}
                                    autoExpandParent={false}
                                    expandedKeys={ExpandedKeys}
                                    selectable={false}
                                    checkedKeys={CheckedKeys}
                                    onCheck={onCheck}
                                    treeData={props.AllmodulesTree}
                                />
                            </ScrollBar>
                        </BasicContainer>
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme({ ...props, step: (Step === 0 ? 1 : 0) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "leftMenuSubContainer") }}
                        >
                            {/* 左側選單容器 ScrollBar */}
                            <ScrollBar
                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "leftMenuSubScrollBar") }}
                            >
                                <BasicContainer theme={switchDefaultTheme(props.baseDefaultTheme)?.allChecked}>
                                    <CheckboxItem
                                        indeterminate={Indeterminate}
                                        onChange={onCheckAllChange}
                                        checked={CheckAll}
                                    >
                                        全選
                                    </CheckboxItem>
                                </BasicContainer>
                                <FormContainer>
                                    <FormRow>
                                        {/* 每一種模組下功能 ModuleFunctions */}
                                        {CheckedRowData.map((moudleItem, index) => {
                                            return (
                                                <Checkbox
                                                    key={index}
                                                    // viewType
                                                    // checked={(props?.SelectedMenus ?? [])
                                                    //     .filter((it) => (it?.moduleId === moudleItem?.id))
                                                    //     .map((i) => { return (i.id) })
                                                    // }
                                                    checked={CheckedFunction?.[`${moudleItem?.id}`]}
                                                    // disable
                                                    topLabel={`${moudleItem?.parentName} -> ${moudleItem?.name}`}
                                                    onChange={(e, value, onInitial) => {
                                                        // console.log(value)
                                                        // globalContextService.set("CarsAddPage", "ModuleFunctions", value);
                                                        if (!isEqual(value, CheckedFunction?.[`${moudleItem?.id}`])) {
                                                            setCheckedFunction(cf => ({ ...cf, [moudleItem.id]: value }));

                                                            //#region 處理全選
                                                            let checkedFunctionByModuleIdObj = {};
                                                            (CheckedKeys ?? [])
                                                                .forEach((moudleid, index) => {
                                                                    checkedFunctionByModuleIdObj[`${moudleid}`] = (props?.AllMenus?.result ?? [])
                                                                        .filter((it) => (it?.moduleId === moudleid))
                                                                        .map((i) => { return (i.id) })
                                                                })
                                                            setCheckAll(Object.values({ ...CheckedFunction, [moudleItem.id]: value }).flat().length === Object.values(checkedFunctionByModuleIdObj).flat().length)

                                                            setIndeterminate((!!Object.values({ ...CheckedFunction, [moudleItem.id]: value }).flat().length) && (Object.values({ ...CheckedFunction, [moudleItem.id]: value }).flat().length < Object.values(checkedFunctionByModuleIdObj).flat().length))

                                                            // indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
                                                            //#endregion
                                                        }
                                                        // console.log(globalContextService.get("CarsAddPage", "ModuleFunctions"));
                                                    }}
                                                    theme={switchDefaultTheme(props.baseDefaultTheme)?.moduleFunctions}
                                                >
                                                    {/* 每一種模組下功能 ModuleFunctions  選項 */}
                                                    {(props?.AllMenus?.result ?? [])
                                                        .filter((it) => (it?.moduleId === moudleItem?.id))
                                                        .map((i) => {
                                                            return (
                                                                <CheckboxItem key={i.id} value={i.id} >{i.name}</CheckboxItem>
                                                            )
                                                        })
                                                    }
                                                </Checkbox>
                                            )
                                        })}
                                    </FormRow>
                                </FormContainer>
                            </ScrollBar>
                        </BasicContainer>
                    </>
                )}
                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignModal") }}

            />
        </>

    )
}
//#endregion

//只給 RoleManagerPage 使用
export const AssignModuleToRoleTitleModal = styled(AssignModuleToRoleTitleModalBase).attrs((props) => ({}))`
`
//#endregion









