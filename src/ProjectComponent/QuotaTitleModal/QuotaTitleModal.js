import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem, OldList } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined } from 'lodash';
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
const QuotaTitleModalBase = (props) => {

    const [UpdateComponent, setUpdateComponent] = useState(false);
    const [ChooseQuota, setChooseQuota] = useState([]);

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列


    return (
        <>
            <TitleModal
                //id: "top1",
                title={"可用額度"}
                yes={true}
                yesText={"確認"}
                no={true}
                noText={"取消"}
                // autoClose={ true},
                backgroundClose={false}
                noOnClick={(e) => {
                    props.controllGCS("QuotaModalClose")
                    props.setOpenQuotaModal(false);
                }}
                yesOnClick={(e) => {

                    globalContextService.set("CasePage", "ClosQuotaModalState", props.setOpenQuotaModal);


                    [].reduce((a, b) => (a[b] = '', a), {})

                    props.UpdateQuotaExecute({
                        // id: props?.QuotaInfo?.id ?? globalContextService.get("CasePage", "APIError"), // 因應目前後端api 沒有回傳id錯誤
                        id: props?.QuotaInfo?.id ,
                        amt: globalContextService.get("CasePage", "NewQuota") ?? 0
                    })

                }}
                closeIconOnClick={(e) => {
                    props.controllGCS("QuotaModalClose")
                    props.setOpenQuotaModal(false);
                }}
                content={(
                    <>
                        {/* 可用額度表單容器 */}
                        <FormContainer
                            baseDefaultTheme={"DefaultTheme"}
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                            theme={switchDefaultTheme(props.baseDefaultTheme)?.quotaFormContainer}
                        >
                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                {/* 使用額度 UsedQuota */}
                                <BasicContainer
                                    theme={switchDefaultTheme(props.baseDefaultTheme)?.usedQuota}
                                >
                                    {/* 使用額度 標題 */}
                                    <Text theme={switchDefaultTheme(props.baseDefaultTheme)?.usedQuotaTitle}>
                                        使用額度
                                    </Text>
                                    <Text>
                                        ${props?.QuotaInfo?.useDiscount}
                                    </Text>
                                </BasicContainer>

                                {/* 剩餘餘額容器 RemainAmt */}
                                <BasicContainer
                                    theme={switchDefaultTheme(props.baseDefaultTheme)?.remainAmt}
                                >
                                    {/* 剩餘餘額容器 標題 */}
                                    <Text theme={switchDefaultTheme(props.baseDefaultTheme)?.remainAmtTitle}>
                                        剩餘餘額
                                    </Text>
                                    <Text>
                                        ${props?.QuotaInfo?.lastDiscount}
                                    </Text>
                                </BasicContainer>

                                {/* 本月可用額度容器 CanUseQuota */}
                                <BasicContainer
                                    theme={switchDefaultTheme(props.baseDefaultTheme)?.canUseQuota}
                                >
                                    {/* 本月可用額度容器 標題 */}
                                    <Text theme={switchDefaultTheme(props.baseDefaultTheme)?.canUseQuotaTitle}>
                                        本月可用額度
                                    </Text>
                                    <Text>
                                        ${props?.QuotaInfo?.totalDiscount}
                                    </Text>
                                </BasicContainer >

                                {/* 新增彈窗 - 新增額度 NewQuota */}
                                <TextInput
                                    // viewType
                                    topLabel={"新增額度"}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("CasePage", "NewQuota") ?? 0}
                                    onChange={
                                        (e, value, onInitial) => {
                                            globalContextService.set("CasePage", "NewQuota", value);
                                        }
                                    }
                                    theme={switchDefaultTheme(props.baseDefaultTheme)?.newQuata}
                                />
                            </FormRow >


                            {/*  可用額度彈窗 Table容器 */}
                            <BasicContainer
                                baseDefaultTheme={"DefaultTheme"}
                                theme={switchDefaultTheme(props.baseDefaultTheme)?.modalTableContainer}
                            >
                                <OldList
                                    checkbox={false}
                                    checkedRowKeyName={"id"}
                                    columnsAttr={
                                        //#region 資料欄設定
                                        [
                                            {
                                                title: '修改紀錄',
                                                width: "460px",
                                                dataIndex: 'editRecord',
                                                // sorter: (a, b) => a.workDate.length - b.workDate.length,
                                            },
                                        ]
                                        //#endregion
                                    }
                                    // hidePageFoot
                                    data={
                                        [
                                            { id: "1", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "2", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "3", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "4", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "5", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "6", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "7", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "8", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "9", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "10", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                            { id: "11", editRecord: "系統新增1599461865 $1840 日期：2020-09-01" },
                                        ]
                                    } // 寫死項目
                                />
                            </BasicContainer >
                        </FormContainer >
                    </>
                )}
                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "quotaModal") }}
            />
        </>

    )
}
//#endregion

//只給 OrgManagerPage 使用
export const QuotaTitleModal = styled(QuotaTitleModalBase).attrs((props) => ({}))`
`
//#endregion









