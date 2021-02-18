import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text, TitleModal, globalContextService, OldTable, Tag } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
// import { ReactComponent as CaretDown } from './Assets/img/CaretDown.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
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
const AssignRoleToUserTitleModalBase = (props) => {

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列

    useEffect(() => {
        if (EscapeFristRender.current > 0) {
            globalContextService.set("UserManagerPage", "AssignCheckedRowKeys", props.RolesLoadByUser?.result);

            let assignCheckedRowsData = [];

            (props.RolesLoadByUser?.result ?? []).forEach(element => {
                assignCheckedRowsData.push((props.AllRolesLoadByUser?.result ?? []).filter(i => element === i.id));
            });

            globalContextService.set("UserManagerPage", "AssignCheckedRowsData", assignCheckedRowsData);
        }
        EscapeFristRender.current = EscapeFristRender.current + 1;

    }, [props.RolesLoadByUser, props.AllRolesLoadByUser])

    return (
        <>
            <TitleModal
                //id: "top1",
                title={"分配用戶"}
                yes={true}
                yesText={"確認"}
                no={true}
                noText={"取消"}
                // autoClose={ true},
                backgroundClose={false}
                noOnClick={(e) => {
                    props.controllGCS("AssignModalClose")
                    props.setOpenAssign(false);
                }}
                yesOnClick={(e) => {
                    let checkedRowsData = globalContextService.get("UserManagerPage", "CheckedRowsData");
                    let rowData = { ...checkedRowsData[0] };
                    let firstId = rowData.id; // 取得要分配角色的用戶ID

                    globalContextService.set("UserManagerPage", "CloseAssignModalState", props.setOpenAssign);

                    props.AssignUserRolesExecute({
                        firstId,
                        secIds: [
                            ...globalContextService.get("UserManagerPage", "AssignCheckedRowKeys")
                        ]
                    })
                }}
                closeIconOnClick={(e) => {
                    props.setOpenAssign(false);
                    props.controllGCS("AssignModalClose")
                }}
                content={(
                    <>
                        {/* 分配用戶彈窗 下方表格 */}
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignTableSubContainer") }}
                        >
                            <OldTable
                                checkbox={true}
                                checked={globalContextService.get("UserManagerPage", "AssignCheckedRowKeys")} // 放入資料庫已勾選項
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("UserManagerPage", "AssignCheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("UserManagerPage", "AssignCheckedRowsData", checkedRows);

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
                                            title: '',
                                            width: "0px",
                                            dataIndex: 'leftOccupy',
                                            fixed: 'left',
                                            sorter: false
                                        },
                                        {
                                            title: '角色名稱',
                                            width: "120px",
                                            dataIndex: 'name',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '狀態',
                                            width: "72px",
                                            dataIndex: 'status',
                                            // sorter: (a, b) => a.status.length - b.status.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return (
                                                    <>
                                                        {rowData.status === 1 ?
                                                            <Tag
                                                                baseDefaultTheme={"SecondaryTheme"}
                                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignDisable") }}
                                                                text={"停用"}
                                                            />
                                                            :
                                                            <Tag
                                                                baseDefaultTheme={"SuccessTheme"}
                                                                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignEnable") }}
                                                                text={"正常"}
                                                            />
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
                                data={props.AllRolesLoadByUser.result}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>
                    </>
                )}
                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignModal") }}

            />
        </>

    )
}
//#endregion

//只給 UserManagerPage 使用
export const AssignRoleToUserTitleModal = styled(AssignRoleToUserTitleModalBase).attrs((props) => ({}))`
`
//#endregion









