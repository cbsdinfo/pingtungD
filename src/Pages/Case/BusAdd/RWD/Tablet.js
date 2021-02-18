import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/BusAddPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/BusAddPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/BusAddPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, caseListSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { busAdd: { rwd: { tablet } } } } } = Theme;

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
                            titleText={"幸福巴士基本資料新增"}
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
                                        if (valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]) {
                                            validMsg = valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]
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
                                                                //#region 打新增幸福巴士身分API ，並夾帶下一個新增長照身分分頁的路由
                                                                props.AddBusUserExecute({
                                                                    userId: props.UserId,
                                                                    cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                    // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                    // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                    // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                    // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                    // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                    // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                    // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/Add?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "selfpayuser":
                                                                //#region 打新增幸福巴士身分API ，並夾帶下一個新增白牌身分分頁的路由
                                                                props.AddBusUserExecute({
                                                                    userId: props.UserId,
                                                                    cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                    // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                    // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                    // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                    // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                    // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                    // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                    // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "countrySide":
                                                                //#region 打新增幸福巴士身分API ，並夾帶下一個新增偏鄉運能不足身分分頁的路由
                                                                props.AddBusUserExecute({
                                                                    userId: props.UserId,
                                                                    cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                    // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                    // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                    // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                    // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                    // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                    // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                    // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "bususer":
                                                                //#region 打新增幸福巴士身分API ，並夾帶下一個新增幸福巴士身分分頁的路由
                                                                props.AddBusUserExecute({
                                                                    userId: props.UserId,
                                                                    cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                    // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                    // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                    // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                    // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                    // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                    // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                    // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/BusAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "daycare":
                                                                //#region 打新增幸福巴士身分API ，並夾帶下一個新增日照身分分頁的路由
                                                                props.AddBusUserExecute({
                                                                    userId: props.UserId,
                                                                    cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                    // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                    // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                    // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                    // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                    // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                    // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                    // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

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
                                    if (valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]) {
                                        validMsg = valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("BusAddPage"))
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
                                        props.AddBusUserExecute({
                                            userId: props.UserId,
                                            cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                            // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                            // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                            // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                            // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                            // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                            // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                            // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位
                                        })
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
                                    value={globalContextService.get("BusAddPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusAddPage", "Name", value);
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
                                        // (globalContextService.get("BusAddPage", `Birthday`) ?
                                        //     moment(globalContextService.get("BusAddPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("BusAddPage", `Birthday`, value);
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
                                        // globalContextService.get("BusAddPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("BusAddPage", "Sex", value);
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
                                    value={globalContextService.get("BusAddPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusAddPage", "Uid", value);
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
                                    value={globalContextService.get("BusAddPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("BusAddPage", "Cellphone", value);
                                    }}
                                    theme={tablet.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 幸福巴士資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"幸福巴士資料"}
                        theme={tablet.busDataSubTitleBar}
                    />

                    {/* 幸福巴士資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.busDataContainer}
                    >
                        <FormRow>

                            {/* 卡號 CardNumber */}
                            <TextInput
                                // viewType
                                topLabel={<>卡號<Text theme={tablet.cardNumberRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusAddPage", "CardNumber") ?? props.Client?.cardNumber}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusAddPage", "CardNumber", value);
                                }}
                                theme={tablet.cardNumber}
                            />

                        </FormRow>
                    </FormContainer>

                    {/* 備註 子標題列 */}
                    {/* <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={tablet.driverNoteSubTitleBar}
                    /> */}

                    {/* 備註表單區域容器 */}
                    {/* <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.driverNoteContainer}
                    >
                        <FormRow> */}
                    {/* 備註 DriverNote */}
                    {/* <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("BusAddPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusAddPage", "DriverNote", value); */}

                    {/* }}
                                theme={tablet.driverNote} */}
                    {/* /> */}
                    {/* </FormRow>
                    </FormContainer> */}

                    {/* 緊急聯絡人資訊 子標題列 */}
                    {/* <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={tablet.emergencyContactSubTitleBar}
                    /> */}

                    {/* 緊急聯絡人資訊 區域容器 */}
                    {/* <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={tablet.emergencyContactContainer}
                    >
                        <FormRow> */}
                    {/* 聯絡人姓名 ContactName */}
                    {/* <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusAddPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusAddPage", "ContactName", value);
                                }}
                                theme={tablet.contactName}
                            /> */}

                    {/* 關係 Relationship */}
                    {/* <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("BusAddPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusAddPage", "Relationship", value);
                                }}
                                theme={tablet.relationship}
                            /> */}

                    {/* 聯絡人手機 ContactCellphone */}
                    {/* <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("BusAddPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusAddPage", "ContactCellphone", value);
                                }}
                                theme={tablet.contactCellphone}
                            /> */}

                    {/* 聯絡人市話 ContactTelephone */}
                    {/* <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("BusAddPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("BusAddPage", "ContactTelephone", value);
                                }}
                                theme={tablet.contactTelephone}
                            /> */}


                    {/* </FormRow>
                    </FormContainer> */}

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

                            {/*  底部儲存並接續新增身分按鈕 容器 FastCreat有值才顯示 */}
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
                                            if (valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]) {
                                                validMsg = valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]
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
                                                                    //#region 打新增幸福巴士身分API ，並夾帶下一個新增長照身分分頁的路由
                                                                    props.AddBusUserExecute({
                                                                        userId: props.UserId,
                                                                        cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                        // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                        // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                        // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                        // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                        // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                        // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                        // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/Add?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "selfpayuser":
                                                                    //#region 打新增幸福巴士身分API ，並夾帶下一個新增白牌身分分頁的路由
                                                                    props.AddBusUserExecute({
                                                                        userId: props.UserId,
                                                                        cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                        // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                        // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                        // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                        // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                        // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                        // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                        // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "countrySide":
                                                                    //#region 打新增幸福巴士身分API ，並夾帶下一個新增偏鄉運能不足身分分頁的路由
                                                                    props.AddBusUserExecute({
                                                                        userId: props.UserId,
                                                                        cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                        // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                        // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                        // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                        // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                        // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                        // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                        // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "bususer":
                                                                    //#region 打新增幸福巴士身分API ，並夾帶下一個新增幸福巴士身分分頁的路由
                                                                    props.AddBusUserExecute({
                                                                        userId: props.UserId,
                                                                        cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                        // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                        // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                        // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                        // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                        // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                        // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                        // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/BusAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "daycare":
                                                                    //#region 打新增幸福巴士身分API ，並夾帶下一個新增日照身分分頁的路由
                                                                    props.AddBusUserExecute({
                                                                        userId: props.UserId,
                                                                        cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                                        // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                                        // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                                        // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                                        // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                                        // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                                        // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                                        // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位

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
                                        // 同 上方 儲存按鈕

                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]) {
                                            validMsg = valid(globalContextService.get("BusAddPage", "CardNumber") ?? "", ["^.{1,}$"], ["請輸入卡號"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("BusAddPage"))
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
                                            props.AddBusUserExecute({
                                                userId: props.UserId,
                                                cardNo: globalContextService.get("BusAddPage", "CardNumber"),
                                                // 派車地址	無對應欄位	本欄位暫訂不需要顯示於畫面上，亦暫不需要API欄位
                                                // remark: globalContextService.get("BusAddPage", "DriverNote"),
                                                // urgentName: globalContextService.get("BusAddPage", "ContactName"),
                                                // urgentRelationship: globalContextService.get("BusAddPage", "Relationship"),
                                                // urgentPhone: globalContextService.get("BusAddPage", "ContactCellphone"),
                                                // urgentTel: globalContextService.get("BusAddPage", "ContactTelephone"),

                                                // 畫面無對應欄位	id	幸福巴士個案ID，新增不須上送此欄位
                                            })
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

