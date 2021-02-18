import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as Plus } from '../../../Assets/img/QAndA/Plus.svg'
import { ReactComponent as Edit } from '../../../Assets/img/QAndA/Edit.svg'
import { useHistory } from 'react-router-dom';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { qAndA: { rwd: { laptop } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"常見問題"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 新增按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.titleAddButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開新增 Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "新增",
                                            yes: true,
                                            yesText: "確認",
                                            no: true,
                                            noText: "取消",
                                            // autoClose: true,
                                            backgroundClose: false,
                                            noOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                //#region 表單驗證
                                                let validMsg = "";

                                                //#endregion

                                                //#region 表單驗證後動作
                                                if (validMsg !== "") {
                                                    // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                    close();
                                                }
                                                //#endregion
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            content: (
                                                <FormContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    theme={laptop.addFormContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>

                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: laptop.addModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    {/* 新增司機按鈕 圖標 */}
                                    <Plus style={laptop.titleAddButtonIcon} />
                                新增
                            </NativeLineButton>

                                {/* 編輯按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.titleEditButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開新增 Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "編輯",
                                            yes: true,
                                            yesText: "確認",
                                            no: true,
                                            noText: "取消",
                                            // autoClose: true,
                                            backgroundClose: false,
                                            noOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                //#region 表單驗證
                                                let validMsg = "";

                                                //#endregion

                                                //#region 表單驗證後動作
                                                if (validMsg !== "") {
                                                    // console.log(validMsg, globalContextService.get("OperatingUnitSettingPage"))
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
                                                    close();
                                                }
                                                //#endregion
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
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

                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: laptop.editModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    {/* 編輯按鈕 圖標 */}
                                    <Edit style={laptop.titleEditButtonIcon} />
                                編輯
                            </NativeLineButton>

                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >

            </MainPageContainer>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`