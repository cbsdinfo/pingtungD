import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/DayCareAddPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/DayCareAddPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/DayCareAddPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService, Container, NewSelector } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, caseListSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption, notDistributableReasonSelectOption, weekDayChMapping } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';
import { fmt } from '../../../../Handlers/DateHandler';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { dayCareAdd: { rwd: { tablet } } } } } = Theme;
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();
    return (
        <>
            <MainPageContainer
                theme={tablet.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"日照個案基本資料新增"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.returnButton}
                                    onClick={() => {
                                        history.push("/Case");
                                        props.controllGCS("return")
                                    }}
                                >
                                    回列表
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

                {/* 新增頁面表單區容器 */}
                <BasicContainer
                    baseDefaultTheme={"DefaultTheme"}
                    theme={tablet.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={tablet.driverBaseSubTitleBar}
                    >

                        {/*  儲存並接續新增身分按鈕 (基本資料編輯 子標題列右方) 容器 FastCreat有值才顯示 */}
                        {props?.FastCreat &&
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 儲存並接續新增身分按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存並接續新增身分"}
                                    theme={tablet.saveAndAddCaseListButton}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]
                                        }
                                        else if (
                                            (
                                                valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                                &&
                                                valid(globalContextService.get("DayCareAddPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                        }
                                        // 經緯度 未來再檢核
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("CaseAddPage"))
                                            modalsService.infoModal.error({
                                                id: "top1", //注意 這裡要加上固定id
                                                iconRightText: validMsg,
                                                yes: true,
                                                yesText: "確認",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        else {
                                            //#region 再次跳出 接續新增身分的彈窗
                                            let rowData = { id: props.UserId }

                                            modalsService.titleModal.normal({
                                                //id: "top1",
                                                title: "接續新增身份",
                                                yes: true,
                                                yesText: "確認",
                                                no: true,
                                                noText: "取消",
                                                // autoClose: true,
                                                backgroundClose: false,
                                                noOnClick: (e) => {
                                                    props.controllGCS("selectCaseListModalClose")
                                                },
                                                yesOnClick: (e, close) => {
                                                    //#region 表單驗證
                                                    let validMsg = "";
                                                    if (valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["請選擇用戶身份"])[1]) {
                                                        validMsg = valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["請選擇用戶身份"])[1]
                                                    }
                                                    //#endregion

                                                    //#region 表單驗證後動作
                                                    if (validMsg !== "") {
                                                        // console.log(validMsg, globalContextService.get("CasePage"))
                                                        modalsService.infoModal.error({
                                                            id: "top1", //注意 這裡要加上固定id
                                                            iconRightText: validMsg,
                                                            yes: true,
                                                            yesText: "確認",
                                                            // no: true,
                                                            // autoClose: true,
                                                            backgroundClose: false,
                                                            yesOnClick: (e, close) => {
                                                                close();
                                                            }
                                                        })
                                                    }
                                                    else {
                                                        // 前往對應身份路由
                                                        // 注意，因為下拉選單的Valu 包含了 _caseId ，所以要將它split過濾掉
                                                        switch (globalContextService.get("CasePage", "CaseListSelect")?.value.split('_')[0]) {
                                                            case "caseuser":
                                                                //#region 打新增日照身分API ，並夾帶下一個新增長照身分分頁的路由
                                                                props.AddOrUpdateDayCareUserExecute({
                                                                    userId: props.UserId,
                                                                    // ... API 未開通，欄位先不帶
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/Add?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "selfpayuser":
                                                                //#region 打新增日照身分API ，並夾帶下一個新增白牌身分分頁的路由
                                                                props.AddOrUpdateDayCareUserExecute({
                                                                    userId: props.UserId,
                                                                    // ... API 未開通，欄位先不帶
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "countrySide":
                                                                //#region 打新增日照身分API ，並夾帶下一個新增偏鄉運能不足身分分頁的路由
                                                                props.AddOrUpdateDayCareUserExecute({
                                                                    userId: props.UserId,
                                                                    // ... API 未開通，欄位先不帶
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "bususer":
                                                                //#region 打新增日照身分API ，並夾帶下一個新增幸福巴士身分分頁的路由
                                                                props.AddOrUpdateDayCareUserExecute({
                                                                    userId: props.UserId,
                                                                    // ... API 未開通，欄位先不帶
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/BusAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "daycare":
                                                                //#region 打新增日照身分API ，並夾帶下一個新增日照身分分頁的路由
                                                                props.AddOrUpdateDayCareUserExecute({
                                                                    userId: props.UserId,
                                                                    // ... API 未開通，欄位先不帶
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/DayCareAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
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
                                                        theme={tablet.editFormContainer}
                                                    >
                                                        <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                            {/* 選擇欲新增身份彈窗 - 用戶身份 caseList */}
                                                            <Selector
                                                                bascDefaultTheme={"DefaultTheme"}
                                                                topLabel={<>用戶身份</>}
                                                                //viewType
                                                                isSearchable
                                                                placeholder={"請選擇用戶身份"}
                                                                // isMulti
                                                                // hideSelectedOptions={false}
                                                                value={globalContextService.get("CasePage", "CaseListSelect") ?? null}
                                                                onChange={(e, value, onInitial) => {
                                                                    // console.log(value)
                                                                    globalContextService.set("CasePage", "CaseListSelect", value);
                                                                }}

                                                                options={[
                                                                    { value: 'hint', label: "請選擇用戶身份", isDisabled: true },
                                                                    ...caseListSelectOption
                                                                ]}
                                                                menuPosition={true}
                                                                theme={tablet.caseListSelect}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: tablet.caseListSelectModal
                                            })
                                            //#endregion
                                        }
                                        //#endregion
                                    }}
                                />
                            </SubContainer>
                        }

                        {/*  儲存按鈕 (基本資料編輯 子標題列右方) 容器 */}
                        <SubContainer baseDefaultTheme={"DefaultTheme"}>
                            {/* 儲存按鈕 */}
                            <BasicButton
                                baseDefaultTheme={"PrimaryTheme"}
                                text={"儲存"}
                                theme={tablet.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    if (valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]
                                    }
                                    else if (
                                        (
                                            valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            &&
                                            valid(globalContextService.get("DayCareAddPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        )
                                    ) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]
                                    }
                                    else if (valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                        validMsg = valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("DayCareAddPage"))
                                        modalsService.infoModal.error({
                                            id: "top1", //注意 這裡要加上固定id
                                            iconRightText: validMsg,
                                            yes: true,
                                            yesText: "確認",
                                            // no: true,
                                            // autoClose: true,
                                            backgroundClose: false,
                                            yesOnClick: (e, close) => {
                                                close();
                                            }
                                        })
                                    }
                                    else {

                                    }
                                    //#endregion
                                }}
                            />
                        </SubContainer>
                    </MainPageSubTitleBar>

                    {/* 基本資料表單區域容器 */}
                    <BasicContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.baseContainer}
                    >

                        {/* 基本資料容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.baseFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    viewType
                                    topLabel={<>姓名</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCareAddPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareAddPage", "Name", value);
                                    }}
                                    theme={tablet.name}
                                />

                                {/* 生日 Birthday */}
                                <DateTimePicker
                                    topLabel={<>生日</>}
                                    // type={"time"} // time、date、week、month、quarter、year
                                    type={"date"}
                                    format={"YYYY-MM-DD"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        // (globalContextService.get("DayCareAddPage", `Birthday`) ?
                                        //     moment(globalContextService.get("DayCareAddPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "Birthday", value);
                                    }}
                                    theme={tablet.birthday}
                                />

                                {/* 性別 Sex */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>性別</>}
                                    viewType
                                    isSearchable
                                    placeholder={""}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={
                                        // globalContextService.get("DayCareAddPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        //console.log("value", value)
                                        globalContextService.set("DayCareAddPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 1, label: '男' },
                                        { value: 0, label: '女' }
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.sex}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    viewType
                                    topLabel={<>身分證字號</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCareAddPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareAddPage", "Uid", value);
                                    }}
                                    theme={tablet.uid}
                                />

                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={<>手機</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("DayCareAddPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DayCareAddPage", "Cellphone", value);
                                    }}
                                    theme={tablet.cellphone}
                                />
                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 日照個案資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"日照個案資料"}
                        theme={tablet.dayCareDataSubTitleBar}
                    />

                    {/* 日照個案資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.dayCareDataContainer}
                    >
                        <FormRow>

                            {/* 案號 CaseNumber */}
                            <TextInput
                                topLabel={<>案號<Text theme={tablet.caseNumberRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "CaseNumber") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "CaseNumber", value);
                                }}
                                theme={tablet.caseNumber}
                            />

                            {/* 市話 Telephone */}
                            <TextInput
                                topLabel={<>市話<Text theme={tablet.telephoneRequired}>(手機、市話擇一輸入)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("DayCareAddPage", "Telephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "Telephone", value);
                                }}
                                theme={tablet.telephone}
                            />

                            {/* 日照中心 DayCareCenter */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>日照中心<Text theme={tablet.dayCareCenterRequired}>(必填)</Text></>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇日照中心"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareAddPage", "DayCareCenter") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "DayCareCenter", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇日照中心", isDisabled: true },
                                    { value: '1', label: "A中心" },
                                    { value: '2', label: "B中心" },
                                    { value: '3', label: "C中心" },
                                ]}
                                // menuPosition={true}
                                theme={tablet.dayCareCenter}
                            />

                        </FormRow>

                        <FormRow>
                            {/* 居住地(縣市) County */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>居住地<Text theme={tablet.countyRequired}>(必填)</Text></>}
                                // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                //viewType
                                isSearchable
                                placeholder={"選擇居住縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareAddPage", "County") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    if (!isEqual(value, globalContextService.get("DayCareAddPage", "County"))) {
                                        globalContextService.set("DayCareAddPage", "County", value);
                                        globalContextService.set("DayCareAddPage", "District", { value: 'hint', label: "選擇區域", isDisabled: true });
                                        setForceUpdate(f => !f);
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                    ...Counties
                                ]}
                                // menuPosition={true}
                                theme={tablet.county}
                            />

                            {/* 居住地(區域) District */}
                            <NewSelector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={
                                    <Text theme={tablet.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={tablet.convertContainerIcon} />
                                            轉換經緯度
                                         </Text>
                                }
                                //viewType
                                isSearchable
                                placeholder={"選擇居住區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareAddPage", "District") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "District", value);
                                }}

                                options={[
                                    { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                    ...(
                                        !isNil(globalContextService.get("DayCareAddPage", "County")) ?
                                            cityAndCountiesLite[globalContextService.get("DayCareAddPage", "County")?.value]
                                            :
                                            []
                                    )
                                ]}
                                // menuPosition={true}
                                theme={tablet.district}
                            />

                            {/* 經度 Longitude */}
                            <TextInput
                                // viewType
                                // topLabel={"經度"}
                                topLabel={<>經度<Text theme={tablet.longitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "Longitude0", value);
                                }}
                                theme={tablet.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                // viewType
                                // topLabel={"緯度"}
                                topLabel={<>緯度<Text theme={tablet.latitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "Latitude0", value);
                                }}
                                theme={tablet.latitude}
                            />

                            {/* 居住地(地址) Address */}
                            <TextInput
                                topLabel={""}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                placeholder={"請輸入居住地址"}
                                value={globalContextService.get("DayCareAddPage", "Address") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "Address", value);
                                }}
                                theme={tablet.address}
                            />

                        </FormRow>
                    </FormContainer>

                    {/* 輪住地址區域表單組件 */}
                    {/*<TurnAddressComponents />*/}

                    {/* 包月服務 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"包月服務"}
                        theme={tablet.monthlySubscriptionSubTitleBar}
                    />

                    {/* 包月服務區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.monthlySubscriptionContainer}
                    >
                        <FormRow>

                            {/* 當趟費用 TripFee */}
                            <TextInput
                                // viewType
                                // topLabel={"緯度"}
                                topLabel={<>當趟費用</>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "TripFee") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "TripFee", value);
                                }}
                                theme={tablet.tripFee}
                            />

                            {/* 首次乘車日 FirstTravelDate */}
                            <DateTimePicker
                                topLabel={<>首次乘車日<Text theme={tablet.firstTracelDateRequired}>(必填)</Text></>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("DayCareAddPage", "FirstTravelDate")) ?
                                        moment(globalContextService.get("DayCareAddPage", "FirstTravelDate"), "YYYY-MM-DD HH:mm:ss")
                                        :
                                        null
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("DayCareAddPage", "FirstTravelDate", value);
                                }}
                                theme={tablet.firstTravelDate}
                            />

                            {/* 是否需要踏板 PedalReview */}
                            <Radio
                                // viewType
                                // disable
                                topLabel={"是否需要踏板"}
                                value={globalContextService.get("DayCareAddPage", "PedalReview") ?? 1}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "PedalReview", value);
                                    // console.log(globalContextService.get("DayCareAddPage", "CarReview"));
                                }}
                                theme={tablet.pedalReview}
                            >
                                {/* 是否需要踏板 PedalReview   選項 */}
                                <RadioItem value={1} >是</RadioItem>
                                <RadioItem value={0} >否</RadioItem>
                            </Radio>

                            {/* 輪椅選擇 Wheelchair */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>輪椅選擇<Text theme={tablet.wheelchairRequired}>(必填)</Text></>}
                                bottomLabel={""}
                                //viewType
                                isSearchable
                                placeholder={"請選擇輪椅"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("DayCareAddPage", "Wheelchair") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("DayCareAddPage", "Wheelchair", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇輪椅", isDisabled: true },
                                    { value: '1', label: "A輪椅" },
                                    { value: '2', label: "B輪椅" },
                                    { value: '3', label: "C輪椅" },
                                ]}
                                // menuPosition={true}
                                theme={tablet.wheelchair}
                            />

                            {/* 前往日照容器 */}
                            <Container>
                                {/* 前往日照 GoToCenterReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"前往日照"}
                                    value={globalContextService.get("DayCareAddPage", "GoToCenterReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "GoToCenterReview", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarReview"));
                                    }}
                                    theme={tablet.goToCenterReview}
                                >
                                    {/* 前往日照 GoToCenterReview  選項 */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 前往日照 日期選擇 GoDateChoiceEquipment */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("DayCareAddPage", "GoDateChoiceEquipment") ?? []}
                                    // disable
                                    topLabel={"日期選擇"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "GoDateChoiceEquipment", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarEquipment"));
                                    }}
                                    theme={tablet.goDateChoiceEquipment}
                                >

                                    {/* 日期選擇 GoDateChoiceEquipment  選項 */}
                                    {Object.keys(weekDayChMapping).map((key) => {
                                        return (
                                            <CheckboxItem key={key} value={weekDayChMapping[key]} >{weekDayChMapping[key]}</CheckboxItem>
                                        )
                                    })}
                                </Checkbox>

                                {/* 前往日照 車趟出發時間 GoDepartureTime */}
                                <DateTimePicker
                                    topLabel={<>車趟出發時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "GoDepartureTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "GoDepartureTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "GoDepartureTime", value);
                                    }}
                                    theme={tablet.goDepartureTime}
                                />

                                {/* 個案上車時間 BoardingTime */}
                                <DateTimePicker
                                    topLabel={<>個案上車時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "BoardingTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "BoardingTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "BoardingTime", value);
                                    }}
                                    theme={tablet.boardingTime}
                                />

                                {/* 去程車號 GoCarNumber */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>去程車號</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇車號"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DayCareAddPage", "GoCarNumber") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "GoCarNumber", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車號", isDisabled: true },
                                        { value: '1', label: "ABC-1111" },
                                        { value: '2', label: "ZZZ-8888" },
                                        { value: '3', label: "XXX-123" },
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.goCarNumber}
                                />

                            </Container>

                            {/* 返回住家容器 */}
                            <Container>
                                {/* 返回住家 BackToHomeReview */}
                                <Radio
                                    // viewType
                                    // disable
                                    topLabel={"返回住家"}
                                    value={globalContextService.get("DayCareAddPage", "BackToHomeReview") ?? 1}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "BackToHomeReview", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarReview"));
                                    }}
                                    theme={tablet.backToHomeReview}
                                >
                                    {/* 返回住家 BackToHome */}
                                    <RadioItem value={1} >是</RadioItem>
                                    <RadioItem value={0} >否</RadioItem>
                                </Radio>

                                {/* 返回住家 日期選擇 BackDateChoiceEquipment */}
                                <Checkbox
                                    // viewType
                                    checked={globalContextService.get("DayCareAddPage", "BackDateChoiceEquipment") ?? []}
                                    // disable
                                    topLabel={"日期選擇"}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "BackDateChoiceEquipment", value);
                                        // console.log(globalContextService.get("DayCareAddPage", "CarEquipment"));
                                    }}
                                    theme={tablet.backDateChoiceEquipment}
                                >
                                    {/* 日期選擇 BackDateChoiceEquipment  選項 */}
                                    {Object.keys(weekDayChMapping).map((key) => {
                                        return (
                                            <CheckboxItem key={key} value={weekDayChMapping[key]} >{weekDayChMapping[key]}</CheckboxItem>
                                        )
                                    })}
                                </Checkbox>

                                {/* 返回住家 車趟出發時間 BackDepartureTime */}
                                <DateTimePicker
                                    topLabel={<>車趟出發時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "BackDepartureTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "BackDepartureTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "BackDepartureTime", value);
                                    }}
                                    theme={tablet.backDepartureTime}
                                />

                                {/* 預計抵達住家時間 ArrivalTime */}
                                <DateTimePicker
                                    topLabel={<>預計抵達住家時間</>}
                                    // type={"time"} time、date、week、month、quarter、year
                                    type={"time"}
                                    format={"HH:mm"}
                                    bascDefaultTheme={"DefaultTheme"}
                                    // viewType
                                    isSearchable
                                    placeholder={""}
                                    value={
                                        (globalContextService.get("DayCareAddPage", "ArrivalTime")) ?
                                            moment(globalContextService.get("DayCareAddPage", "ArrivalTime"), "HH:mm")
                                            :
                                            null
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("DayCareAddPage", "ArrivalTime", value);
                                    }}
                                    theme={tablet.arrivalTime}
                                />

                                {/* 回程車號 BackCarNumber */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    topLabel={<>回程車號</>}
                                    bottomLabel={""}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇車號"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("DayCareAddPage", "BackCarNumber") ?? null}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        globalContextService.set("DayCareAddPage", "BackCarNumber", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇車號", isDisabled: true },
                                        { value: '1', label: "ABC-1111" },
                                        { value: '2', label: "ZZZ-8888" },
                                        { value: '3', label: "XXX-123" },
                                    ]}
                                    // menuPosition={true}
                                    theme={tablet.backCarNumber}
                                />

                            </Container>
                        </FormRow>
                    </FormContainer>

                    {/* 備註 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={tablet.driverNoteSubTitleBar}
                    />

                    {/* 備註表單區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.driverNoteContainer}
                    >
                        <FormRow>
                            {/* 備註 DriverNote */}
                            <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={tablet.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 緊急聯絡人資訊 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={tablet.emergencyContactSubTitleBar}
                    />

                    {/* 緊急聯絡人資訊 區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.emergencyContactContainer}
                    >
                        <FormRow>
                            {/* 聯絡人姓名 ContactName */}
                            <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "ContactName", value);
                                }}
                                theme={tablet.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("DayCareAddPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "Relationship", value);
                                }}
                                theme={tablet.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("DayCareAddPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "ContactCellphone", value);
                                }}
                                theme={tablet.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("DayCareAddPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("DayCareAddPage", "ContactTelephone", value);
                                }}
                                theme={tablet.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>

                    {/* 底部儲存按鈕 外層容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.bottomSaveButtonContainer}
                    >
                        {/* 底部儲存按鈕 列容器 */}
                        <FormRow
                            bascDefaultTheme={"DefaultTheme"}
                            theme={tablet.bottomSaveButtonRowContainer}
                        >

                            {/* 底部儲存並接續新增身分按鈕 容器 FastCreat有值才顯示 */}
                            {props?.FastCreat &&
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 底部儲存並接續新增身分按鈕 */}
                                    <BasicButton
                                        baseDefaultTheme={"PrimaryTheme"}
                                        text={"儲存並接續新增身分"}
                                        theme={tablet.bottomSaveAndAddCaseListButton}
                                        onClick={() => {
                                            //#region 表單驗證
                                            let validMsg = "";
                                            if (valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]
                                            }
                                            else if (
                                                (
                                                    valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                                    &&
                                                    valid(globalContextService.get("DayCareAddPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                                )
                                            ) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]
                                            }
                                            else if (valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                                validMsg = valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                            }
                                            // 經緯度 未來再檢核
                                            //#endregion

                                            //#region 表單驗證後動作
                                            if (validMsg !== "") {
                                                // console.log(validMsg, globalContextService.get("CaseAddPage"))
                                                modalsService.infoModal.error({
                                                    id: "top1", //注意 這裡要加上固定id
                                                    iconRightText: validMsg,
                                                    yes: true,
                                                    yesText: "確認",
                                                    // no: true,
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    yesOnClick: (e, close) => {
                                                        close();
                                                    }
                                                })
                                            }
                                            else {
                                                //#region 再次跳出 接續新增身分的彈窗
                                                let rowData = { id: props.UserId }

                                                modalsService.titleModal.normal({
                                                    //id: "top1",
                                                    title: "接續新增身份",
                                                    yes: true,
                                                    yesText: "確認",
                                                    no: true,
                                                    noText: "取消",
                                                    // autoClose: true,
                                                    backgroundClose: false,
                                                    noOnClick: (e) => {
                                                        props.controllGCS("selectCaseListModalClose")
                                                    },
                                                    yesOnClick: (e, close) => {
                                                        //#region 表單驗證
                                                        let validMsg = "";
                                                        if (valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["請選擇用戶身份"])[1]) {
                                                            validMsg = valid(globalContextService.get("CasePage", "CaseListSelect")?.value ?? "", ["^.{1,}$"], ["請選擇用戶身份"])[1]
                                                        }
                                                        //#endregion

                                                        //#region 表單驗證後動作
                                                        if (validMsg !== "") {
                                                            // console.log(validMsg, globalContextService.get("CasePage"))
                                                            modalsService.infoModal.error({
                                                                id: "top1", //注意 這裡要加上固定id
                                                                iconRightText: validMsg,
                                                                yes: true,
                                                                yesText: "確認",
                                                                // no: true,
                                                                // autoClose: true,
                                                                backgroundClose: false,
                                                                yesOnClick: (e, close) => {
                                                                    close();
                                                                }
                                                            })
                                                        }
                                                        else {
                                                            // 前往對應身份路由
                                                            // 注意，因為下拉選單的Valu 包含了 _caseId ，所以要將它split過濾掉
                                                            switch (globalContextService.get("CasePage", "CaseListSelect")?.value.split('_')[0]) {
                                                                case "caseuser":
                                                                    //#region 打新增日照身分API ，並夾帶下一個新增長照身分分頁的路由
                                                                    props.AddOrUpdateDayCareUserExecute({
                                                                        userId: props.UserId,
                                                                        // ... API 未開通，欄位先不帶
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/Add?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "selfpayuser":
                                                                    //#region 打新增日照身分API ，並夾帶下一個新增白牌身分分頁的路由
                                                                    props.AddOrUpdateDayCareUserExecute({
                                                                        userId: props.UserId,
                                                                        // ... API 未開通，欄位先不帶
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "countrySide":
                                                                    //#region 打新增日照身分API ，並夾帶下一個新增偏鄉運能不足身分分頁的路由
                                                                    props.AddOrUpdateDayCareUserExecute({
                                                                        userId: props.UserId,
                                                                        // ... API 未開通，欄位先不帶
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "bususer":
                                                                    //#region 打新增日照身分API ，並夾帶下一個新增幸福巴士身分分頁的路由
                                                                    props.AddOrUpdateDayCareUserExecute({
                                                                        userId: props.UserId,
                                                                        // ... API 未開通，欄位先不帶
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/BusAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "daycare":
                                                                    //#region 打新增日照身分API ，並夾帶下一個新增日照身分分頁的路由
                                                                    props.AddOrUpdateDayCareUserExecute({
                                                                        userId: props.UserId,
                                                                        // ... API 未開通，欄位先不帶
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/DayCareAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
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
                                                            theme={tablet.editFormContainer}
                                                        >
                                                            <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                {/* 選擇欲新增身份彈窗 - 用戶身份 caseList */}
                                                                <Selector
                                                                    bascDefaultTheme={"DefaultTheme"}
                                                                    topLabel={<>用戶身份</>}
                                                                    //viewType
                                                                    isSearchable
                                                                    placeholder={"請選擇用戶身份"}
                                                                    // isMulti
                                                                    // hideSelectedOptions={false}
                                                                    value={globalContextService.get("CasePage", "CaseListSelect") ?? null}
                                                                    onChange={(e, value, onInitial) => {
                                                                        // console.log(value)
                                                                        globalContextService.set("CasePage", "CaseListSelect", value);
                                                                    }}

                                                                    options={[
                                                                        { value: 'hint', label: "請選擇用戶身份", isDisabled: true },
                                                                        ...caseListSelectOption
                                                                    ]}
                                                                    menuPosition={true}
                                                                    theme={tablet.caseListSelect}
                                                                />

                                                            </FormRow>
                                                        </FormContainer>
                                                    ),
                                                    theme: tablet.caseListSelectModal
                                                })
                                                //#endregion
                                            }
                                            //#endregion
                                        }}
                                    />
                                </SubContainer>
                            }

                            {/*  底部儲存按鈕 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 底部儲存按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存"}
                                    theme={tablet.bottomSaveButton}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "CaseNumber") ?? "", ["^.{1,}$"], ["請輸入案號"])[1]
                                        }
                                        else if (
                                            (
                                                valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                                &&
                                                valid(globalContextService.get("DayCareAddPage", "Telephone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                            )
                                        ) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Cellphone") ?? "", ["^.{1,}$"], ["請輸入手機或市話"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "DayCareCenter")?.value ?? "", ["^.{1,}$"], ["請選擇日照中心"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "FirstTravelDate") ?? "", ["^.{1,}$"], ["請輸入首次乘車日"])[1]
                                        }
                                        else if (valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]) {
                                            validMsg = valid(globalContextService.get("DayCareAddPage", "Wheelchair")?.value ?? "", ["^.{1,}$"], ["請選擇輪椅"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("DayCareAddPage"))
                                            modalsService.infoModal.error({
                                                id: "top1", //注意 這裡要加上固定id
                                                iconRightText: validMsg,
                                                yes: true,
                                                yesText: "確認",
                                                // no: true,
                                                // autoClose: true,
                                                backgroundClose: false,
                                                yesOnClick: (e, close) => {
                                                    close();
                                                }
                                            })
                                        }
                                        else {

                                        }
                                        //#endregion
                                    }}
                                />
                            </SubContainer>
                        </FormRow>
                    </FormContainer>
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`

//#region 輪住地址區域表單組件
const TurnAddressComponents = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { tablet } } } } } = Theme;

    const [TurnAddressArray, setTurnAddressArray] = useState([]);
    const [CheckList, setCheckList] = useState([]);

    return (
        <>
            <CheckboxGroup
                // viewType
                checked={CheckList}
                // disable
                onChange={(value) => {
                    // console.log(value)
                    globalContextService.set("DayCareAddPage", "TurnAddressDefault", [value?.[value.length - 1]] ?? null);
                    console.log(globalContextService.get("DayCareAddPage", "TurnAddressDefault"));
                    setCheckList(c => [value?.[value.length - 1]] ?? [])
                }}
                theme={tablet.turnAddressCheckboxGroup}
            >
                {/* 基本資料下方容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.turnAddressFormContainer}
                >
                    <FormRow>
                        {/* 輪住地址(縣市) TurnCounty */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <>輪住地址
                                    <CheckboxItem
                                        value={0}
                                        theme={tablet.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("DayCareAddPage", "TurnCounty0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("DayCareAddPage", "TurnCounty0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                { value: 0, label: 'XX縣' },
                                { value: 1, label: 'XX市' }
                            ]}
                            // menuPosition={true}
                            theme={tablet.turnCounty}
                        />

                        {/* 輪住地址(區域) TurnDistrict */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"居住區域"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("DayCareAddPage", "TurnDistrict0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("DayCareAddPage", "TurnDistrict0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                { value: 0, label: 'XX區' },
                                { value: 1, label: 'XX區' }
                            ]}
                            // menuPosition={true}
                            theme={tablet.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        <TextInput
                            topLabel={
                                <Text theme={tablet.convertContainer}
                                    onClick={() => { console.log("轉換經緯度") }}
                                >
                                    <Convert style={tablet.convertContainerIcon} />
                                    轉換經緯度
                                </Text>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("DayCareAddPage", "TurnAddress0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("DayCareAddPage", "TurnAddress0", value);
                            }}
                            theme={tablet.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        <TextInput
                            // viewType
                            // topLabel={"經度"}
                            topLabel={<>經度<Text theme={tablet.longitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("DayCareAddPage", "Longitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("DayCareAddPage", "Longitude0", value);
                            }}
                            theme={tablet.longitude}
                        />

                        {/* 緯度 Latitude */}
                        <TextInput
                            // viewType
                            // topLabel={"緯度"}
                            topLabel={<>緯度<Text theme={tablet.latitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("DayCareAddPage", "Latitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("DayCareAddPage", "Latitude0", value);
                            }}
                            theme={tablet.latitude}
                        />

                        <MoreTurnAddress TurnAddressArray={TurnAddressArray} setTurnAddressArray={setTurnAddressArray} setCheckList={setCheckList} />

                        <SubContainer theme={tablet.addTurnAddressButtonContainer}>
                            {/* 新增輪住地址按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={tablet.addTurnAddressButton}
                                onClick={() => { setTurnAddressArray(t => [...t, 0]); /*console.log(CheckList)*/ }}
                            >
                                <Plus style={tablet.addTurnAddressButtonIcon} />
                                新增輪住地址
                            </NativeLineButton>
                        </SubContainer>

                    </FormRow>
                </FormContainer>
            </CheckboxGroup>
        </>
    )
}
//#endregion

//#region 渲染新增的輪住地址組件
const MoreTurnAddress = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { tablet } } } } } = Theme;

    return (
        <>
            {(props.TurnAddressArray ?? []).map((item, index) => {
                if (item === null) {
                    return null;
                }

                return (
                    <React.Fragment key={index + 1}>
                        {/* 輪住地址(縣市) TurnCounty */}
                        < Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <> 輪住地址
                                    < CheckboxItem
                                        value={index + 1}
                                        theme={tablet.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("DayCareAddPage", `TurnCounty${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("DayCareAddPage", `TurnCounty${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                    { value: 0, label: 'XX縣' },
                                    { value: 1, label: 'XX市' }
                                ]}
                            // menuPosition={true}
                            theme={tablet.turnCounty}
                        />

                        {/* 輪住地址(區域) TurnDistrict */}
                        < Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={""}
                            //viewType
                            isSearchable
                            placeholder={"居住區域"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("DayCareAddPage", `TurnDistrict${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("DayCareAddPage", `TurnDistrict${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                    { value: 0, label: 'XX區' },
                                    { value: 1, label: 'XX區' }
                                ]}
                            // menuPosition={true}
                            theme={tablet.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        < TextInput
                            topLabel={
                                <>
                                    <Text theme={tablet.delContainer}
                                        onClick={() => {
                                            props?.setTurnAddressArray && props.setTurnAddressArray(t => {
                                                let delRes = [...t]
                                                delRes[index] = null;
                                                return delRes;
                                            })
                                            props?.setCheckList && props.setCheckList(c => {
                                                if (c?.[0] === index + 1) {
                                                    return []
                                                }
                                                else {
                                                    return c;
                                                }
                                            })
                                        }}
                                    >
                                        <Delete style={tablet.delContainerIcon} />
                                        刪除
                                    </Text>
                                    <Text theme={tablet.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={tablet.convertContainerIcon} />
                                        轉換經緯度
                                    </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("DayCareAddPage", `TurnAddress${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("DayCareAddPage", `TurnAddress${index + 1}`, value);
                            }}
                            theme={tablet.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        < TextInput
                            // viewType
                            topLabel={"經度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("DayCareAddPage", `Longitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("DayCareAddPage", `Longitude${index + 1}`, value);
                            }}
                            theme={tablet.longitude}
                        />

                        {/* 緯度 Latitude */}
                        < TextInput
                            // viewType
                            topLabel={"緯度"}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("DayCareAddPage", `Latitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("DayCareAddPage", `Latitude${index + 1}`, value);
                            }}
                            theme={tablet.latitude}
                        />
                    </React.Fragment>
                )
            })
            }
        </>
    )
}
//#endregion