import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../Store/Store'
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem, NewSelector, modalsService } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Convert } from '../../Assets/img/UserInfoPage/Convert.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined, isEqual } from 'lodash';
import { Counties, cityAndCountiesLite } from '../../Mappings/Mappings';
import { valid } from '../../Handlers';
import { MapGoogleInput } from '../MapGoogle/MapGoogle';
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
const WhiteSingUpModalBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const [UpdateComponent, setUpdateComponent] = useState(false);
    const [ChooseBUnit, setChooseBUnit] = useState([]);
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列


    return (
        <>
            <TitleModal
                // id={"top1"}
                title={"註冊共享車隊"}
                yes={true}
                yesText={"確認"}
                no={true}
                noText={"取消"}
                // autoClose={ true},
                backgroundClose={false}
                noOnClick={(e) => {
                    // props.setAllBUnits([]);
                    // props.setChooseBUnits([]);
                    // props.controllGCS("bUnitModalClose")
                    props.setOpenWhiteModal(false);

                    props.controllGCS("whiteModalClose")
                }}
                yesOnClick={(e) => {

                    // globalContextService.set("UserInfoPage", "ClosWhiteModalState", props.setOpenWhiteModal);


                    //#region 表單驗證
                    let validMsg = "";
                    if (valid(globalContextService.get("UserInfoPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]) {
                        validMsg = valid(globalContextService.get("UserInfoPage", "County")?.value ?? "", ["^.{1,}$"], ["請選擇居住縣市"])[1]
                    }
                    else if (valid(globalContextService.get("UserInfoPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]) {
                        validMsg = valid(globalContextService.get("UserInfoPage", "District")?.value ?? "", ["^.{1,}$"], ["請選擇居住區域"])[1]
                    }
                    else if (valid(globalContextService.get("UserInfoPage", "SendAddress") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入或選擇居住地址", "地址不可含空白"])[1]) {
                        validMsg = valid(globalContextService.get("UserInfoPage", "SendAddress") ?? "", ["^.{1,}$", "^[^ 　]+$"], ["請輸入或選擇居住地址", "地址不可含空白"])[1]
                    }
                    // else if (valid(globalContextService.get("UserInfoPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]) {
                    //     validMsg = valid(globalContextService.get("UserInfoPage", "Longitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入經度", "請輸入正確的經度"])[1]
                    // }
                    // else if (valid(globalContextService.get("UserInfoPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]) {
                    //     validMsg = valid(globalContextService.get("UserInfoPage", "Latitude0") ?? "", ["^.{1,}$", "^[0-9]+(.[0-9]+)?$"], ["請輸入緯度", "請輸入正確的緯度"])[1]
                    // }
                    //#endregion

                    //#region 表單驗證後動作
                    if (validMsg !== "") {
                        // console.log(validMsg, globalContextService.get("UserInfoPage"))
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
                            county: globalContextService.get("UserInfoPage", "County")?.value,
                            district: globalContextService.get("UserInfoPage", "District")?.value,
                            addr: globalContextService.get("UserInfoPage", "SendAddress"),
                            urgentName: globalContextService.get("UserInfoPage", "ContactName"),
                            urgentRelationship: globalContextService.get("UserInfoPage", "Relationship"),
                            urgentPhone: globalContextService.get("UserInfoPage", "ContactCellphone"),
                            urgentTel: globalContextService.get("UserInfoPage", "ContactTelephone"),
                            lat: globalContextService.get("UserInfoPage", "UserAddrLatLng")?.lat ?? "",
                            lon: globalContextService.get("UserInfoPage", "UserAddrLatLng")?.lng ?? "",
                            remark: globalContextService.get("UserInfoPage", "DriverNote") ?? "",
                            // 畫面無對應欄位	id	白牌個案ID，新增不須上送此欄位
                        })
                        props.setOpenWhiteModal(false);
                    }
                    //#endregion
                }}
                closeIconOnClick={(e) => {
                    props.controllGCS("whiteModalClose")
                    props.setOpenWhiteModal(false);
                }}
                content={(
                    <>
                        <>
                            {/* 白牌車資料容器 */}
                            <FormContainer
                                bascDefaultTheme={"DefaultTheme"}
                                // theme={switchDefaultTheme(props.baseDefaultTheme)?.whiteCaseDataContainer}
                                theme={switchDefaultTheme(props.baseDefaultTheme)?.whiteCaseDataContainer}
                            >
                                <FormRow>
                                    {/* 居住地(縣市) County */}
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        topLabel={<>居住地<Text theme={switchDefaultTheme(props.baseDefaultTheme)?.countyRequired}>(必填)</Text></>}
                                        bottomLabel={""}
                                        //viewType
                                        isSearchable
                                        placeholder={"選擇縣市"}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("UserInfoPage", "County") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(value)
                                            if (!isEqual(value, globalContextService.get("UserInfoPage", "County"))) {
                                                globalContextService.set("UserInfoPage", "County", value);
                                                globalContextService.set("UserInfoPage", "District", { value: 'hint', label: "選擇區域", isDisabled: true });
                                                setForceUpdate(f => !f);
                                            }

                                        }}

                                        options={[
                                            { value: 'hint', label: "選擇縣市", isDisabled: true },
                                            ...Counties
                                        ]}
                                        // menuPosition={true}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.county}
                                    />

                                    {/* 居住地(區域) District */}
                                    <NewSelector
                                        bascDefaultTheme={"DefaultTheme"}
                                        // topLabel={
                                        //     <Text theme={switchDefaultTheme(props.baseDefaultTheme)?.convertContainer}
                                        //         onClick={() => {
                                        //             props.GetGeocodeExecute(`${globalContextService.get("UserInfoPage", "County")?.value}${globalContextService.get("UserInfoPage", "District")?.value}${globalContextService.get("UserInfoPage", "Address")}`)
                                        //         }}
                                        //     >
                                        //         <Convert style={switchDefaultTheme(props.baseDefaultTheme)?.convertContainerIcon} />
                                        //         轉換經緯度
                                        //     </Text>
                                        // }
                                        topLabel={""}
                                        //viewType
                                        isSearchable
                                        placeholder={"選擇區域"}
                                        // isMulti
                                        // hideSelectedOptions={false}
                                        value={globalContextService.get("UserInfoPage", "District") ?? null}
                                        onChange={(e, value, onInitial) => {
                                            // console.log(value)
                                            globalContextService.set("UserInfoPage", "District", value);
                                        }}

                                        options={[
                                            { value: 'hint', label: "選擇區域", isDisabled: true },
                                            ...(
                                                !isNil(globalContextService.get("UserInfoPage", "County")) ?
                                                    cityAndCountiesLite[globalContextService.get("UserInfoPage", "County")?.value]
                                                    :
                                                    []
                                            )
                                        ]}
                                        // menuPosition={true}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.district}
                                    />

                                    {/* 居住地(地址) Address */}
                                    <MapGoogleInput
                                        placeholder={"請輸入通訊地址(XX路XX號)"}
                                        placeDetailUrl={`${APIUrl}Maps/PlaceDetail`} // 接後端的API
                                        // viewType 
                                        // disable
                                        // topLabel={<>通訊地址<Text theme={laptopL.singUpFormUserAddrRequired}></Text></>}
                                        // bottomLabel={"為避免無法成功預約訂車，門牌號碼及巷弄請使用半形數字，且勿填寫樓層及備註"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        value={globalContextService.get("UserInfoPage", "Address") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "Address", value);
                                            globalContextService.remove("UserInfoPage", "SendAddress");
                                            globalContextService.remove("UserInfoPage", "UserAddrLatLng");
                                        }}
                                        onSelect={(e, option, onInitial, posInfo) => {
                                            globalContextService.set("UserInfoPage", "Address", option.label);
                                            globalContextService.set("UserInfoPage", "SendAddress", option.label);
                                            globalContextService.set("UserInfoPage", "UserAddrLatLng", { lat: posInfo?.lat, lng: posInfo?.lon });
                                        }}

                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.address}
                                    />

                                    {/* 經度 Longitude */}
                                    {/* <TextInput
                                        // viewType
                                        // topLabel={"經度"}
                                        topLabel={<>經度<Text theme={switchDefaultTheme(props.baseDefaultTheme)?.longitudeRequired}>(必填)</Text></>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={""}
                                        value={globalContextService.get("UserInfoPage", "Longitude0") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "Longitude0", value);
                                        }}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.longitude}
                                    /> */}

                                    {/* 緯度 Latitude */}
                                    {/* <TextInput
                                        // viewType
                                        // topLabel={"緯度"}
                                        topLabel={<>緯度<Text theme={switchDefaultTheme(props.baseDefaultTheme)?.latitudeRequired}>(必填)</Text></>}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={""}
                                        value={globalContextService.get("UserInfoPage", "Latitude0") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "Latitude0", value);
                                        }}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.latitude}
                                    /> */}

                                    {/* 聯絡人姓名 ContactName */}
                                    <TextInput
                                        topLabel={"聯絡人姓名"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={""}
                                        value={globalContextService.get("UserInfoPage", "ContactName") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "ContactName", value);
                                        }}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.contactName}
                                    />

                                    {/* 關係 Relationship */}
                                    <TextInput
                                        topLabel={"關係"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={""}
                                        value={globalContextService.get("UserInfoPage", "Relationship") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "Relationship", value);
                                        }}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.relationship}
                                    />

                                    {/* 聯絡人手機 ContactCellphone */}
                                    <TextInput
                                        topLabel={"聯絡人手機"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"格式：0987654321"}
                                        value={globalContextService.get("UserInfoPage", "ContactCellphone") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "ContactCellphone", value);
                                        }}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.contactCellphone}
                                    />

                                    {/* 聯絡人市話 ContactTelephone */}
                                    <TextInput
                                        topLabel={"聯絡人市話"}
                                        baseDefaultTheme={"DefaultTheme"}
                                        type="text"
                                        placeholder={"格式：0287654321"}
                                        value={globalContextService.get("UserInfoPage", "ContactTelephone") ?? ""}
                                        onChange={(e, value, onInitial) => {
                                            globalContextService.set("UserInfoPage", "ContactTelephone", value);
                                        }}
                                        theme={switchDefaultTheme(props.baseDefaultTheme)?.contactTelephone}
                                    />

                                </FormRow>
                            </FormContainer>
                        </>
                    </>
                )}
                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "whiteModal") }}

            />
        </>

    )
}
//#endregion

//只給 OrgManagerPage 使用
export const WhiteSingUp = styled(WhiteSingUpModalBase).attrs((props) => ({}))`
`
//#endregion









