import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem } from '../../Components';
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
const BUnitTitleModalBase = (props) => {

    const [UpdateComponent, setUpdateComponent] = useState(false);
    const [ChooseBUnit, setChooseBUnit] = useState([]);

    const EscapeFristRender = useRef(0); // 過濾初次渲染，跳過不執行，因為 上一次 AssignCheckedRowKeys若不為空，會直接吃到上一次的陣列


    return (
        <>
            <TitleModal
                //id: "top1",
                title={"B單位 (限選三項)"}
                yes={true}
                yesText={"確認"}
                no={true}
                noText={"取消"}
                // autoClose={ true},
                backgroundClose={false}
                noOnClick={(e) => {
                    props.setAllBUnits([]);
                    props.setChooseBUnits([]);
                    props.controllGCS("bUnitModalClose")
                    props.setOpenBUnitModal(false);
                }}
                yesOnClick={(e) => {

                    globalContextService.set("CasePage", "ClosBUnitModalState", props.setOpenBUnitModal);


                    [].reduce((a, b) => (a[b] = '', a), {})

                    props.UpdateBUnitExecute({
                        ...props?.ChooseBUnits,
                        ...(
                            ["orgBId1", "orgBId2", "orgBId3"]
                                .reduce((accumulator, currentValue, currentIndex) => (
                                    (accumulator[currentValue] = globalContextService.get("CasePage", "BUnits")?.[currentIndex]), accumulator), {})
                        )
                    })
                    props.setAllBUnits([]);
                    props.setChooseBUnits([]);
                }}
                closeIconOnClick={(e) => {
                    props.setAllBUnits([]);
                    props.setChooseBUnits([]);
                    props.controllGCS("bUnitModalClose")
                    props.setOpenBUnitModal(false);
                }}
                content={(
                    <>
                        <FormContainer>
                            <FormRow>
                                <Checkbox
                                    // viewType
                                    checked={
                                        props?.ChooseBUnits?.id ?
                                            globalContextService.get("CasePage", "BUnits") ??
                                            [
                                                props?.ChooseBUnits?.orgBId1,
                                                props?.ChooseBUnits?.orgBId2,
                                                props?.ChooseBUnits?.orgBId3
                                            ].filter(i => !isNil(i))
                                            :
                                            null
                                    }
                                    // disable
                                    topLabel={""}
                                    onChange={(e, value, onInitial) => {
                                        // console.log(value)
                                        if (value?.length !== globalContextService.get("CasePage", "BUnits")?.length) {
                                            setUpdateComponent(u => !u)//更新彈窗組件，
                                            setChooseBUnit(value)
                                        }
                                        globalContextService.set("CasePage", "BUnits", value);

                                        // console.log(globalContextService.get("CasePage", "BUnits"));
                                    }}
                                    theme={switchDefaultTheme(props.baseDefaultTheme)?.bUnits}
                                >
                                    <Container>
                                        {/* B單位 BUnits  選項 */}
                                        {props?.AllBUnits.map(d => {
                                            return (
                                                <SubContainer
                                                    key={d?.id}
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    theme={{
                                                        basic: (style, props) => ({
                                                            ...style,
                                                            ...style.occupy(6),
                                                            margin: "0 0 16px 0"
                                                        })
                                                    }}
                                                >
                                                    <CheckboxItem
                                                        key={d?.id}
                                                        value={d?.id}
                                                        disable={
                                                            (globalContextService.get("CasePage", "BUnits") ?? []).includes(d?.id)
                                                                ?
                                                                false
                                                                :
                                                                (
                                                                    (globalContextService.get("CasePage", "BUnits") ?? []).length > 2
                                                                )
                                                                    ?
                                                                    true
                                                                    :
                                                                    false
                                                        }
                                                    >
                                                        {d?.name}
                                                    </CheckboxItem>
                                                </SubContainer>
                                            )
                                        })}
                                    </Container>
                                    {/* <CheckboxItem value={0} >GPS</CheckboxItem>
                                    <CheckboxItem value={1} >車機</CheckboxItem>
                                    <CheckboxItem value={2} >攝影機</CheckboxItem>
                                    <CheckboxItem value={3} >滅火器</CheckboxItem> */}
                                </Checkbox>
                            </FormRow>
                        </FormContainer>
                    </>
                )}
                theme={{ ...iterateTheme({ ...props }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "bUnitModal") }}

            />
        </>

    )
}
//#endregion

//只給 OrgManagerPage 使用
export const BUnitTitleModal = styled(BUnitTitleModalBase).attrs((props) => ({}))`
`
//#endregion









