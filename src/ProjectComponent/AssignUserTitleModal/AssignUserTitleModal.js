import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isUndefined } from 'lodash';
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
const AssignUserTitleModalBase = (props) => {

    const [UpdateComponent, setUpdateComponent] = useState(false);

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列

    useEffect(() => {
        // console.log(globalContextService.get("OrgManagerPage", "AssignCheckedRowKeys")?.length)
        if (EscapeFristRender.current > 0) {
            if (!(globalContextService.get("OrgManagerPage", "AssignCheckedRowKeys")?.length > 0)) { // 為 undefine、陣列長度為0
                globalContextService.set("OrgManagerPage", "AssignCheckedRowKeys", (props.UsersLoadByOrg?.data ?? []).map((item) => { return item.id }));
                globalContextService.set("OrgManagerPage", "AssignCheckedRowsData", (props.UsersLoadByOrg?.data ?? []));

                globalContextService.set("OrgManagerPage", "IdOfAllUsersLoadByOrg", (props.AllUsersLoadByOrg?.data ?? []).map((item) => { return item.id }));
            }
        }

        EscapeFristRender.current = EscapeFristRender.current + 1;
        setUpdateComponent(u => !u)//更新彈窗組件，以更新所選用戶文字

    }, [props.UsersLoadByOrg, props.AllUsersLoadByOrg])

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
                    let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");
                    let rowData = { ...checkedRowsData[0] };
                    let orgId = rowData.id; // 取得要分配用戶的組織ID

                    globalContextService.set("OrgManagerPage", "CloseAssignModalState", props.setOpenAssign);

                    props.AssignOrgUsersExecute({
                        orgId,
                        userIds: [
                            ...globalContextService.get("OrgManagerPage", "AssignCheckedRowKeys")
                        ]
                    })
                }}
                closeIconOnClick={(e) => {
                    props.setOpenAssign(false);
                    props.controllGCS("AssignModalClose")
                }}
                content={(
                    <>
                        <FormContainer
                            baseDefaultTheme={"DefaultTheme"}
                            onSubmit={(e) => {
                                e.preventDefault();
                                //#region 自單位管理右方Table，取的選中的Orgid並重新查詢
                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");
                                let rowData = { ...checkedRowsData[0] };

                                props.GetUsersLoadByOrgExecute(rowData.id);
                                props.GetAllUsersLoadByOrgExecute("", 99999, 1, globalContextService.get("OrgManagerPage", "AssignKeyword"));
                                //#endregion
                            }}
                            theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignFormContainer") }}
                        >
                            <FormRow baseDefaultTheme={"DefaultTheme"}>

                                {/* 分配用戶彈窗 - 關鍵字 AssignKeyword  */}
                                <TextInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignKeyword") }}
                                    type="text"
                                    placeholder={"請輸入關鍵字"}
                                    rightIcon={
                                        <Search
                                            style={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignKeywordRightIcon")['basic'] }}
                                            onClick={() => {
                                                //#region 自單位管理右方Table，取的選中的Orgid並重新查詢
                                                let checkedRowsData = globalContextService.get("OrgManagerPage", "CheckedRowsData");
                                                let rowData = { ...checkedRowsData[0] };

                                                props.GetUsersLoadByOrgExecute(rowData.id);
                                                props.GetAllUsersLoadByOrgExecute("", 99999, 1, globalContextService.get("OrgManagerPage", "AssignKeyword"));
                                                //#endregion
                                            }}
                                        />
                                    }
                                    value={globalContextService.get("OrgManagerPage", "AssignKeyword") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("OrgManagerPage", "AssignKeyword", value);
                                    }}
                                />

                                {/* 選中的用戶資訊容器*/}
                                <SubContainer
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "selectUserContainer") }}
                                >
                                    {/* 選中的用戶資訊文字 */}
                                    <Text
                                        bascDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "selectUserText") }}
                                    >
                                        選中用戶 :
                                        {
                                            (globalContextService.get("OrgManagerPage", "AssignCheckedRowsData") ?? [])
                                                // .filter((item0) => {
                                                //     // 過濾掉不存在查詢條件內的資料
                                                //     // console.log(globalContextService.get("OrgManagerPage", "IdOfAllUsersLoadByOrg"))
                                                //     return (globalContextService.get("OrgManagerPage", "IdOfAllUsersLoadByOrg") ?? []).includes(item0.id)
                                                // })
                                                .map((item) => {
                                                    return item.name
                                                }).join()
                                        }
                                    </Text>
                                </SubContainer>
                            </FormRow>
                        </FormContainer>

                        {/* 分配用戶彈窗 下方表格 */}
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "assignTableSubContainer") }}
                        >
                            <OldTable
                                checkbox={true}
                                checked={globalContextService.get("OrgManagerPage", "AssignCheckedRowKeys") && globalContextService.get("OrgManagerPage", "AssignCheckedRowKeys")} // 放入資料庫已勾選項
                                checkedRowKeyName={"id"}
                                checkboxOnChecked={
                                    (checkedRowKeys, checkedRows) => {
                                        // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                        globalContextService.set("OrgManagerPage", "AssignCheckedRowKeys", checkedRowKeys);
                                        globalContextService.set("OrgManagerPage", "AssignCheckedRowsData", checkedRows);
                                        setUpdateComponent(u => !u)//更新彈窗組件，以更新所選用戶文字
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
                                            title: '姓名',
                                            width: "120px",
                                            dataIndex: 'name',
                                            sorter: (a, b) => a.name.length - b.name.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '帳號',
                                            width: "120px",
                                            dataIndex: 'account',
                                            // sorter: (a, b) => a.account.length - b.account.length,
                                            // fixed: 'left',
                                        },
                                        {
                                            title: '服務單位',
                                            width: "600px",
                                            dataIndex: 'organizations',
                                            // sorter: (a, b) => a.unit.length - b.unit.length,
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
                                data={props.AllUsersLoadByOrg.data}
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

//只給 OrgManagerPage 使用
export const AssignUserTitleModal = styled(AssignUserTitleModalBase).attrs((props) => ({}))`
`
//#endregion









