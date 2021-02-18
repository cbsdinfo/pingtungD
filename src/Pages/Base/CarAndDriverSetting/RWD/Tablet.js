import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { carAndDriverSetting: { rwd: { tablet } } } } = Theme;
    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("CarAndDriverSettingPage", "IdDescribe") ?? false);

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"司機車輛設定"}
                            theme={tablet.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
                        >

                        </MainPageTitleBar>

                    </>
                }
                theme={tablet.mainPageContainer}
            >
                {/* 頁面外層容器 */}
                <Container>

                    {/* 車輛司機設定卡片 - 司機保險 */}
                    <CarAndDriverSettingCard
                        titleText={"司機保險"}
                        pageName={"CarAndDriverSettingPage"}
                        addInputKeyName={"add"}
                        addbuttonOnclick={() => { }}
                        listNameIndex={"name"}
                        listDelIndex={"del"}
                        listData={[
                            { id: 0, name: "勞保", del: () => { console.log("1") } },
                            { id: 1, name: "其他保", del: () => { console.log("2") } },
                            { id: 2, name: "薪保", del: () => { console.log("3") } },
                        ]}
                        theme={tablet.carAndDriverSettingCard}
                    />

                    {/* 車輛司機設定卡片 - 專業證照 */}
                    <CarAndDriverSettingCard
                        titleText={"專業證照"}
                        pageName={"CarAndDriverSettingPage"}
                        addInputKeyName={"add"}
                        addbuttonOnclick={() => { }}
                        listNameIndex={"name"}
                        listDelIndex={"del"}
                        listData={[
                            { id: 0, name: "計程車執業登記證", del: () => { console.log("1") } },
                            { id: 1, name: "計程車執業登記證1", del: () => { console.log("2") } },
                            { id: 2, name: "計程車執業登記證2", del: () => { console.log("3") } },
                        ]}
                        theme={tablet.carAndDriverSettingCard}
                    />

                    {/* 車輛司機設定卡片 - 駕照類型 */}
                    <CarAndDriverSettingCard
                        titleText={"駕照類型"}
                        pageName={"CarAndDriverSettingPage"}
                        addInputKeyName={"add"}
                        addbuttonOnclick={() => { }}
                        listNameIndex={"name"}
                        listDelIndex={"del"}
                        listData={[
                            { id: 0, name: "駕照", del: () => { console.log("1") } },
                            { id: 1, name: "駕照1", del: () => { console.log("2") } },
                            { id: 2, name: "駕照2", del: () => { console.log("3") } },
                        ]}
                        theme={tablet.carAndDriverSettingCard}
                    />

                    {/* 車輛司機設定卡片 - 車輛設備 */}
                    <CarAndDriverSettingCard
                        titleText={"車輛設備"}
                        pageName={"CarAndDriverSettingPage"}
                        addInputKeyName={"add"}
                        addbuttonOnclick={() => { }}
                        listNameIndex={"name"}
                        listDelIndex={"del"}
                        listData={[
                            { id: 0, name: "車輛設備1", del: () => { console.log("1") } },
                            { id: 1, name: "車輛設備2", del: () => { console.log("2") } },
                            { id: 2, name: "車輛設備3", del: () => { console.log("3") } },
                        ]}
                        theme={tablet.carAndDriverSettingCard}
                    />

                    {/* 車輛司機設定卡片 - 車輛保險 */}
                    <CarAndDriverSettingCard
                        titleText={"車輛保險"}
                        pageName={"CarAndDriverSettingPage"}
                        addInputKeyName={"add"}
                        addbuttonOnclick={() => { }}
                        listNameIndex={"name"}
                        listDelIndex={"del"}
                        listData={[
                            { id: 0, name: "車輛保險1", del: () => { console.log("1") } },
                            { id: 1, name: "車輛保險2", del: () => { console.log("2") } },
                            { id: 2, name: "車輛保險3", del: () => { console.log("3") } },
                        ]}
                        theme={tablet.carAndDriverSettingCard}
                    />

                    {/* 車輛司機設定卡片 - 車輛來源 */}
                    <CarAndDriverSettingCard
                        titleText={"車輛來源"}
                        pageName={"CarAndDriverSettingPage"}
                        addInputKeyName={"add"}
                        addbuttonOnclick={() => { }}
                        listNameIndex={"name"}
                        listDelIndex={"del"}
                        listData={[
                            { id: 0, name: "車輛來源1", del: () => { console.log("1") } },
                            { id: 1, name: "車輛來源2", del: () => { console.log("2") } },
                            { id: 2, name: "車輛來源3", del: () => { console.log("3") } },
                        ]}
                        theme={tablet.carAndDriverSettingCard}
                    />
                </Container>

            </MainPageContainer>

        </>

    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
