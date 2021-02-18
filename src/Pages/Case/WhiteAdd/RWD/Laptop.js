import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageSubTitleBar, MainPageTitleBar } from '../../../../ProjectComponent';
import { ReactComponent as Plus } from '../../../../Assets/img/WhiteAddPage/Plus.svg'
import { ReactComponent as Convert } from '../../../../Assets/img/WhiteAddPage/Convert.svg'
import { ReactComponent as Delete } from '../../../../Assets/img/WhiteAddPage/Delete.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BasicButton, CheckboxGroup, NumberInput, Checkbox, CheckboxItem, DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, OldList, Selector, SubContainer, Text, Textarea, TextInput, Upload, Radio, RadioItem, modalsService } from '../../../../Components';
import { isEqual, isNil, isUndefined } from 'lodash';
import { boonTypeSelectOption, caseListSelectOption, cityAndCountiesLite, Counties, disabilityLevelSelectOption } from '../../../../Mappings/Mappings';
import { valid } from '../../../../Handlers';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { whiteAdd: { rwd: { laptop } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                theme={laptop.mainPageContainer}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"白牌車基本資料新增"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/*  回列表按鈕 (標題列右方) 容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 回列表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.returnButton}
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
                    theme={laptop.AddPageContainer}
                >

                    {/* 基本資料編輯 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"基本資料"}
                        theme={laptop.driverBaseSubTitleBar}
                    >

                        {/*  儲存並接續新增身分按鈕 (基本資料編輯 子標題列右方) 容器 FastCreat有值才顯示 */}
                        {props?.FastCreat &&
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 儲存並接續新增身分按鈕 */}
                                <BasicButton
                                    baseDefaultTheme={"PrimaryTheme"}
                                    text={"儲存並接續新增身分"}
                                    theme={laptop.saveAndAddCaseListButton}
                                    onClick={() => {
                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
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
                                                                //#region 打新增白牌身分API ，並夾帶下一個新增長照身分分頁的路由
                                                                props.AddWhiteUserExecute({
                                                                    userId: props.UserId,
                                                                    county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                    district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                    addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                    urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                    urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                    urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                    urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                    lat: 0,// 畫面無對應欄位	lat	緯度
                                                                    lon: 0,  // 畫面無對應欄位	lon	經度
                                                                    remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/Add?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "selfpayuser":
                                                                //#region 打新增白牌身分API ，並夾帶下一個新增白牌身分分頁的路由
                                                                props.AddWhiteUserExecute({
                                                                    userId: props.UserId,
                                                                    county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                    district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                    addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                    urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                    urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                    urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                    urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                    lat: 0,// 畫面無對應欄位	lat	緯度
                                                                    lon: 0,  // 畫面無對應欄位	lon	經度
                                                                    remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "countrySide":
                                                                //#region 打新增白牌身分API ，並夾帶下一個新增偏鄉運能不足身分分頁的路由
                                                                props.AddWhiteUserExecute({
                                                                    userId: props.UserId,
                                                                    county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                    district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                    addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                    urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                    urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                    urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                    urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                    lat: 0,// 畫面無對應欄位	lat	緯度
                                                                    lon: 0,  // 畫面無對應欄位	lon	經度
                                                                    remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "bususer":
                                                                //#region 打新增白牌身分API ，並夾帶下一個新增幸福巴士身分分頁的路由
                                                                props.AddWhiteUserExecute({
                                                                    userId: props.UserId,
                                                                    county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                    district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                    addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                    urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                    urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                    urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                    urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                    lat: 0,// 畫面無對應欄位	lat	緯度
                                                                    lon: 0,  // 畫面無對應欄位	lon	經度
                                                                    remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                    // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                    historyPush: `/Case/BusAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                })
                                                                //#endregion
                                                                break;
                                                            case "daycare":
                                                                //#region 打新增白牌身分API ，並夾帶下一個新增日照身分分頁的路由
                                                                props.AddWhiteUserExecute({
                                                                    userId: props.UserId,
                                                                    county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                    district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                    addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                    urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                    urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                    urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                    urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                    lat: 0,// 畫面無對應欄位	lat	緯度
                                                                    lon: 0,  // 畫面無對應欄位	lon	經度
                                                                    remark: globalContextService.get("WhiteAddPage", "DriverNote"),
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
                                                        theme={laptop.editFormContainer}
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
                                                                theme={laptop.caseListSelect}
                                                            />

                                                        </FormRow>
                                                    </FormContainer>
                                                ),
                                                theme: laptop.caseListSelectModal
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
                                theme={laptop.saveButton}
                                onClick={() => {
                                    //#region 表單驗證
                                    let validMsg = "";
                                    if (valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                    }
                                    else if (valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                        validMsg = valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                    }
                                    //#endregion

                                    //#region 表單驗證後動作
                                    if (validMsg !== "") {
                                        // console.log(validMsg, globalContextService.get("WhiteAddPage"))
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
                                        props.AddWhiteUserExecute({
                                            userId: props.UserId,
                                            county: globalContextService.get("WhiteAddPage", "County")?.value,
                                            district: globalContextService.get("WhiteAddPage", "District")?.value,
                                            addr: globalContextService.get("WhiteAddPage", "Address"),
                                            urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                            urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                            urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                            urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                            lat: 0,// 畫面無對應欄位	lat	緯度
                                            lon: 0,  // 畫面無對應欄位	lon	經度
                                            remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                            // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位
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
                        theme={laptop.baseContainer}
                    >

                        {/* 基本資料容器 */}
                        <FormContainer
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.baseFormContainer}
                        >
                            <FormRow>

                                {/* 姓名 Name */}
                                <TextInput
                                    viewType
                                    topLabel={<>姓名</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("WhiteAddPage", "Name") ?? props.Client?.name}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteAddPage", "Name", value);
                                    }}
                                    theme={laptop.name}
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
                                        // (globalContextService.get("WhiteAddPage", `Birthday`) ?
                                        //     moment(globalContextService.get("WhiteAddPage", `Birthday`), "YYYY-MM-DD")
                                        //     :
                                        (props.Client?.birthday) ?
                                            moment(props.Client.birthday, "YYYY-MM-DD HH:mm:ss")
                                            :
                                            null
                                        // )
                                    }
                                    onChange={(value, momentObj) => {
                                        globalContextService.set("WhiteAddPage", `Birthday`, value);
                                    }}
                                    theme={laptop.birthday}
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
                                        // globalContextService.get("WhiteAddPage", "Sex") ?? { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                        (!isNil(props.Client?.sex)) ?
                                            { value: props.Client.sex, label: props.Client.sex === 1 ? '男' : '女' }
                                            :
                                            null
                                    }
                                    onChange={(e, value, onInitial) => {
                                        // console.log("value", value)
                                        globalContextService.set("WhiteAddPage", "Sex", value);
                                    }}

                                    options={[
                                        { value: 'hint', label: "請選擇性別", isDisabled: true },
                                        { value: 1, label: '男' },
                                        { value: 0, label: '女' }
                                    ]}
                                    // menuPosition={true}
                                    theme={laptop.sex}
                                />

                                {/* 身分證字號 Uid */}
                                <TextInput
                                    viewType
                                    topLabel={<>身分證字號</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("WhiteAddPage", "Uid") ?? props.Client?.uid}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteAddPage", "Uid", value);
                                    }}
                                    theme={laptop.uid}
                                />

                                {/* 手機 Cellphone */}
                                <TextInput
                                    viewType
                                    topLabel={<>手機</>}
                                    baseDefaultTheme={"DefaultTheme"}
                                    type="text"
                                    placeholder={""}
                                    value={globalContextService.get("WhiteAddPage", "Cellphone") ?? props.Client?.phone}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("WhiteAddPage", "Cellphone", value);
                                    }}
                                    theme={laptop.cellPhone}
                                />

                            </FormRow>
                        </FormContainer>
                    </BasicContainer>

                    {/* 白牌車資料 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"白牌車資料"}
                        theme={laptop.whiteCaseDataSubTitleBar}
                    />

                    {/* 白牌車資料容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.whiteCaseDataContainer}
                    >
                        <FormRow>
                            {/* 居住地(縣市) County */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={<>居住地<Text theme={laptop.countyRequired}>(必填)</Text></>}
                                // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                //viewType
                                isSearchable
                                placeholder={"居住縣市"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("WhiteAddPage", "County") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    if (!isEqual(value, globalContextService.get("WhiteAddPage", "County"))) {
                                        globalContextService.set("WhiteAddPage", "County", value);
                                        setForceUpdate(f => !f);
                                    }
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住縣市", isDisabled: true },
                                    ...Counties
                                ]}
                                // menuPosition={true}
                                theme={laptop.county}
                            />

                            {/* 居住地(區域) District */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                topLabel={
                                    <Text theme={laptop.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={laptop.convertContainerIcon} />
                                            轉換經緯度
                                        </Text>
                                }
                                //viewType
                                isSearchable
                                placeholder={"居住區域"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("WhiteAddPage", "District") ?? null}
                                onChange={(e, value, onInitial) => {
                                    // console.log(value)
                                    globalContextService.set("WhiteAddPage", "District", value);
                                }}

                                options={[
                                    { value: 'hint', label: "請選擇居住區域", isDisabled: true },
                                    ...(
                                        !isNil(globalContextService.get("WhiteAddPage", "County")) ?
                                            cityAndCountiesLite[globalContextService.get("WhiteAddPage", "County")?.value]
                                            :
                                            []
                                    )
                                ]}
                                // menuPosition={true}
                                theme={laptop.district}
                            />

                            {/* 經度 Longitude */}
                            <TextInput
                                // viewType
                                // topLabel={"經度"}
                                topLabel={<>經度<Text theme={laptop.longitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("WhiteAddPage", "Longitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "Longitude0", value);
                                }}
                                theme={laptop.longitude}
                            />

                            {/* 緯度 Latitude */}
                            <TextInput
                                // viewType
                                // topLabel={"緯度"}
                                topLabel={<>緯度<Text theme={laptop.latitudeRequired}>(必填)</Text></>}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("WhiteAddPage", "Latitude0") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "Latitude0", value);
                                }}
                                theme={laptop.latitude}
                            />

                            {/* 居住地(地址) Address */}
                            <TextInput
                                topLabel={""}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"請輸入居住地址"}
                                bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                value={globalContextService.get("WhiteAddPage", "Address") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "Address", value);
                                }}
                                theme={laptop.address}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 輪住地址區域表單組件 !! 暫時不用 */}
                    {/* <TurnAddressComponents /> */}

                    {/* 備註 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"備註"}
                        theme={laptop.driverNoteSubTitleBar}
                    />

                    {/* 備註表單區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.driverNoteContainer}
                    >
                        <FormRow>
                            {/* 備註 DriverNote */}
                            <Textarea
                                baseDefaultTheme={"DefaultTheme"}
                                placeholder={""}
                                value={globalContextService.get("WhiteAddPage", "DriverNote") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "DriverNote", value);
                                    // console.log(value)
                                }}
                                theme={laptop.driverNote}
                            />
                        </FormRow>
                    </FormContainer>

                    {/* 緊急聯絡人資訊 子標題列 */}
                    <MainPageSubTitleBar
                        bascDefaultTheme={"DefaultTheme"}
                        titleText={"緊急聯絡人資訊"}
                        theme={laptop.emergencyContactSubTitleBar}
                    />

                    {/* 緊急聯絡人資訊 區域容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.emergencyContactContainer}
                    >
                        <FormRow>
                            {/* 聯絡人姓名 ContactName */}
                            <TextInput
                                topLabel={"聯絡人姓名"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("WhiteAddPage", "ContactName") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "ContactName", value);
                                }}
                                theme={laptop.contactName}
                            />

                            {/* 關係 Relationship */}
                            <TextInput
                                topLabel={"關係"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={""}
                                value={globalContextService.get("WhiteAddPage", "Relationship") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "Relationship", value);
                                }}
                                theme={laptop.relationship}
                            />

                            {/* 聯絡人手機 ContactCellphone */}
                            <TextInput
                                topLabel={"聯絡人手機"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0987654321"}
                                value={globalContextService.get("WhiteAddPage", "ContactCellphone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "ContactCellphone", value);
                                }}
                                theme={laptop.contactCellphone}
                            />

                            {/* 聯絡人市話 ContactTelephone */}
                            <TextInput
                                topLabel={"聯絡人市話"}
                                baseDefaultTheme={"DefaultTheme"}
                                type="text"
                                placeholder={"格式：0287654321"}
                                value={globalContextService.get("WhiteAddPage", "ContactTelephone") ?? ""}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("WhiteAddPage", "ContactTelephone", value);
                                }}
                                theme={laptop.contactTelephone}
                            />


                        </FormRow>
                    </FormContainer>

                    {/* 底部儲存按鈕 外層容器 */}
                    <FormContainer
                        bascDefaultTheme={"DefaultTheme"}
                        theme={laptop.bottomSaveButtonContainer}
                    >
                        {/* 底部儲存按鈕 列容器 */}
                        <FormRow
                            bascDefaultTheme={"DefaultTheme"}
                            theme={laptop.bottomSaveButtonRowContainer}
                        >

                            {/*  底部儲存並接續新增身分按鈕 容器 FastCreat有值才顯示 */}
                            {props?.FastCreat &&
                                <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                    {/* 底部儲存並接續新增身分按鈕 */}
                                    <BasicButton
                                        baseDefaultTheme={"PrimaryTheme"}
                                        text={"儲存並接續新增身分"}
                                        theme={laptop.bottomSaveAndAddCaseListButton}
                                        onClick={() => {
                                            //#region 表單驗證
                                            let validMsg = "";
                                            if (valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                            }
                                            else if (valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                                validMsg = valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
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
                                                                    //#region 打新增白牌身分API ，並夾帶下一個新增長照身分分頁的路由
                                                                    props.AddWhiteUserExecute({
                                                                        userId: props.UserId,
                                                                        county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                        district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                        addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                        urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                        urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                        urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                        urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                        lat: 0,// 畫面無對應欄位	lat	緯度
                                                                        lon: 0,  // 畫面無對應欄位	lon	經度
                                                                        remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/Add?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "selfpayuser":
                                                                    //#region 打新增白牌身分API ，並夾帶下一個新增白牌身分分頁的路由
                                                                    props.AddWhiteUserExecute({
                                                                        userId: props.UserId,
                                                                        county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                        district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                        addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                        urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                        urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                        urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                        urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                        lat: 0,// 畫面無對應欄位	lat	緯度
                                                                        lon: 0,  // 畫面無對應欄位	lon	經度
                                                                        remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/WhiteAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "countrySide":
                                                                    //#region 打新增白牌身分API ，並夾帶下一個新增偏鄉運能不足身分分頁的路由
                                                                    props.AddWhiteUserExecute({
                                                                        userId: props.UserId,
                                                                        county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                        district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                        addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                        urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                        urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                        urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                        urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                        lat: 0,// 畫面無對應欄位	lat	緯度
                                                                        lon: 0,  // 畫面無對應欄位	lon	經度
                                                                        remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/RuralAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "bususer":
                                                                    //#region 打新增白牌身分API ，並夾帶下一個新增幸福巴士身分分頁的路由
                                                                    props.AddWhiteUserExecute({
                                                                        userId: props.UserId,
                                                                        county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                        district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                        addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                        urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                        urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                        urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                        urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                        lat: 0,// 畫面無對應欄位	lat	緯度
                                                                        lon: 0,  // 畫面無對應欄位	lon	經度
                                                                        remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                                        // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位

                                                                        historyPush: `/Case/BusAdd?userId=${rowData.id}&fastCreat=1`,  // 夾帶  fastCreat 參數
                                                                        // 畫面無對應欄位	id	長照個案ID，新增不須上送此欄位
                                                                    })
                                                                    //#endregion
                                                                    break;
                                                                case "daycare":
                                                                    //#region 打新增白牌身分API ，並夾帶下一個新增日照身分分頁的路由
                                                                    props.AddWhiteUserExecute({
                                                                        userId: props.UserId,
                                                                        county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                                        district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                                        addr: globalContextService.get("WhiteAddPage", "Address"),
                                                                        urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                                        urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                                        urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                                        urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                                        lat: 0,// 畫面無對應欄位	lat	緯度
                                                                        lon: 0,  // 畫面無對應欄位	lon	經度
                                                                        remark: globalContextService.get("WhiteAddPage", "DriverNote"),
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
                                                            theme={laptop.editFormContainer}
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
                                                                    theme={laptop.caseListSelect}
                                                                />

                                                            </FormRow>
                                                        </FormContainer>
                                                    ),
                                                    theme: laptop.caseListSelectModal
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
                                    theme={laptop.bottomSaveButton}
                                    onClick={() => {
                                        // 同 上方 儲存按鈕

                                        //#region 表單驗證
                                        let validMsg = "";
                                        if (valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Name") ?? "", ["^.{1,}$"], ["請輸入姓名"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Birthday") ?? "", ["^.{1,}$"], ["請輸入出生年月日"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Sex")?.value ?? "", ["^.{1,}$"], ["請選擇性別"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Uid") ?? "", ["^.{1,}$"], ["請輸入身分證字號"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Address") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入居住地址", "地址不可含空白"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                                        }
                                        else if (valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                                            validMsg = valid(globalContextService.get("WhiteAddPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                                        }
                                        //#endregion

                                        //#region 表單驗證後動作
                                        if (validMsg !== "") {
                                            // console.log(validMsg, globalContextService.get("WhiteAddPage"))
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
                                            props.AddWhiteUserExecute({
                                                userId: props.UserId,
                                                county: globalContextService.get("WhiteAddPage", "County")?.value,
                                                district: globalContextService.get("WhiteAddPage", "District")?.value,
                                                addr: globalContextService.get("WhiteAddPage", "Address"),
                                                urgentName: globalContextService.get("WhiteAddPage", "ContactName"),
                                                urgentRelationship: globalContextService.get("WhiteAddPage", "Relationship"),
                                                urgentPhone: globalContextService.get("WhiteAddPage", "ContactCellphone"),
                                                urgentTel: globalContextService.get("WhiteAddPage", "ContactTelephone"),
                                                lat: 0,// 畫面無對應欄位	lat	緯度
                                                lon: 0,  // 畫面無對應欄位	lon	經度
                                                remark: globalContextService.get("WhiteAddPage", "DriverNote"),
                                                // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位
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

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`

//#region 輪住地址區域表單組件
const TurnAddressComponents = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { cases: { caseAdd: { rwd: { laptop } } } } } = Theme;

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
                    globalContextService.set("WhiteAddPage", "TurnAddressDefault", [value?.[value.length - 1]] ?? null);
                    console.log(globalContextService.get("WhiteAddPage", "TurnAddressDefault"));
                    setCheckList(c => [value?.[value.length - 1]] ?? [])
                }}
                theme={laptop.turnAddressCheckboxGroup}
            >
                {/* 基本資料下方容器 */}
                <FormContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptop.turnAddressFormContainer}
                >
                    <FormRow>
                        {/* 輪住地址(縣市) TurnCounty */}
                        <Selector
                            bascDefaultTheme={"DefaultTheme"}
                            topLabel={
                                <>輪住地址
                                    <CheckboxItem
                                        value={0}
                                        theme={laptop.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteAddPage", "TurnCounty0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteAddPage", "TurnCounty0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                { value: 0, label: 'XX縣' },
                                { value: 1, label: 'XX市' }
                            ]}
                            // menuPosition={true}
                            theme={laptop.turnCounty}
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
                            value={globalContextService.get("WhiteAddPage", "TurnDistrict0") ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteAddPage", "TurnDistrict0", value);
                            }}

                            options={[
                                { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                { value: 0, label: 'XX區' },
                                { value: 1, label: 'XX區' }
                            ]}
                            // menuPosition={true}
                            theme={laptop.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        <TextInput
                            topLabel={
                                <Text theme={laptop.convertContainer}
                                    onClick={() => { console.log("轉換經緯度") }}
                                >
                                    <Convert style={laptop.convertContainerIcon} />
                                    轉換經緯度
                                </Text>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("WhiteAddPage", "TurnAddress0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteAddPage", "TurnAddress0", value);
                            }}
                            theme={laptop.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        <TextInput
                            // viewType
                            // topLabel={"經度"}
                            topLabel={<>經度<Text theme={laptop.longitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteAddPage", "Longitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteAddPage", "Longitude0", value);
                            }}
                            theme={laptop.longitude}
                        />

                        {/* 緯度 Latitude */}
                        <TextInput
                            // viewType
                            // topLabel={"緯度"}
                            topLabel={<>緯度<Text theme={laptop.latitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteAddPage", "Latitude0") ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteAddPage", "Latitude0", value);
                            }}
                            theme={laptop.latitude}
                        />

                        <MoreTurnAddress TurnAddressArray={TurnAddressArray} setTurnAddressArray={setTurnAddressArray} setCheckList={setCheckList} />

                        <SubContainer theme={laptop.addTurnAddressButtonContainer}>
                            {/* 新增輪住地址按鈕 */}
                            <NativeLineButton
                                baseDefaultTheme={"DefaultTheme"}
                                disable={false}
                                type="button" // 防止提交
                                theme={laptop.addTurnAddressButton}
                                onClick={() => { setTurnAddressArray(t => [...t, 0]); /*console.log(CheckList)*/ }}
                            >
                                <Plus style={laptop.addTurnAddressButtonIcon} />
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
    const { pages: { cases: { caseAdd: { rwd: { laptop } } } } } = Theme;

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
                                        theme={laptop.turnAddressCheckboxItem}
                                    >  </CheckboxItem>
                                </>}
                            bottomLabel={"每月分配之額度1840/2400以居住地為主，若輪住至平區或偏區導致額度不同時，需請個管修改居住地資料。"}
                            //viewType
                            isSearchable
                            placeholder={"居住縣市"}
                            // isMulti
                            // hideSelectedOptions={false}
                            value={globalContextService.get("WhiteAddPage", `TurnCounty${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteAddPage", `TurnCounty${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住縣市", isDisabled: true },
                                    { value: 0, label: 'XX縣' },
                                    { value: 1, label: 'XX市' }
                                ]}
                            // menuPosition={true}
                            theme={laptop.turnCounty}
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
                            value={globalContextService.get("WhiteAddPage", `TurnDistrict${index + 1}`) ?? null}
                            onChange={(e, value, onInitial) => {
                                // console.log(value)
                                globalContextService.set("WhiteAddPage", `TurnDistrict${index + 1}`, value);
                            }}

                            options={
                                [
                                    { value: 'hint', label: "選擇居住區域", isDisabled: true },
                                    { value: 0, label: 'XX區' },
                                    { value: 1, label: 'XX區' }
                                ]}
                            // menuPosition={true}
                            theme={laptop.turnDistrict}
                        />

                        {/* 輪住地址(地址) TurnAddress */}
                        < TextInput
                            topLabel={
                                <>
                                    <Text theme={laptop.delContainer}
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
                                        <Delete style={laptop.delContainerIcon} />
                                        刪除
                                    </Text>
                                    <Text theme={laptop.convertContainer}
                                        onClick={() => { console.log("轉換經緯度") }}
                                    >
                                        <Convert style={laptop.convertContainerIcon} />
                                        轉換經緯度
                                    </Text>
                                </>
                            }
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={"請輸入居住地址"}
                            value={globalContextService.get("WhiteAddPage", `TurnAddress${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteAddPage", `TurnAddress${index + 1}`, value);
                            }}
                            theme={laptop.turnAddress}
                        />

                        {/* 經度 Longitude */}
                        < TextInput
                            // viewType
                            // topLabel={"經度"}
                            topLabel={<>經度<Text theme={laptop.longitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteAddPage", `Longitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteAddPage", `Longitude${index + 1}`, value);
                            }}
                            theme={laptop.longitude}
                        />

                        {/* 緯度 Latitude */}
                        < TextInput
                            // viewType
                            // topLabel={"緯度"}
                            topLabel={<>緯度<Text theme={laptop.latitudeRequired}>(必填)</Text></>}
                            baseDefaultTheme={"DefaultTheme"}
                            type="text"
                            placeholder={""}
                            value={globalContextService.get("WhiteAddPage", `Latitude${index + 1}`) ?? ""}
                            onChange={(e, value, onInitial) => {
                                globalContextService.set("WhiteAddPage", `Latitude${index + 1}`, value);
                            }}
                            theme={laptop.latitude}
                        />
                    </React.Fragment>
                )
            })
            }
        </>
    )
}
//#endregion

