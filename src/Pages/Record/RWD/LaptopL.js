import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../ProjectComponent';
import { Container, RangeDateTimePicker, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

import { AllRecordComponent } from '../AllRecordComponent/AllRecordComponent'
import { isEqual } from 'lodash';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { record: { rwd: { laptopL } } } } = Theme;
    let history = useHistory()
    const [Width, Height] = useWindowSize();

    //#region 分頁映射
    const tabMap = (key) => {
        switch (key) {
            case "長照":
                return props.CaseRecord
            case "共享車隊":
                return props.WhiteRecord
            case "巴士":
                return props.BusRecord
            default:
                return props.AllTabs
        }

    }
    //#endregion
    // console.log(props.nowTab)
    // console.log(props.CaseRecord)
    // console.log(props.WhiteRecord)
    // console.log(props.BusRecord)
    return (
        <>
            <MainPageContainer
                theme={laptopL.mainPageContainer}
                height={Height}
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <BasicContainer
                            theme={laptopL.whiteContainer}
                        >
                            <BasicContainer
                                theme={laptopL.tabsContainer}
                            >
                                {
                                    // <BasicContainer>

                                    tabMap().map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <Text
                                                    onClick={() => { props.setNowTab(item) }}
                                                    isActive={props.nowTab === item}
                                                    theme={laptopL.titleBarRecordTab}
                                                >
                                                    {item}
                                                </Text>
                                            </React.Fragment>
                                        )
                                    })

                                    // </BasicContainer>
                                }
                            </BasicContainer>
                        </BasicContainer>
                    </>
                }
            >
                {/* 切換使用的組件 */}
                {/* {tabMap("tabUseComponent")?.[props.nowTab]} */}
                <AllRecordComponent
                    data={tabMap(props.nowTab)
                        .filter(X => {
                            // console.log(X)
                            if (isEqual(globalContextService.get("RecordPage", "OrderTime")?.value ?? '2', '2') && (X.status === 9 || X.status === 5)) {
                                return false
                            }
                            else if (isEqual(globalContextService.get("RecordPage", "OrderTime")?.value, '1') && (X.status !== 9 && X.status !== 5)) {
                                return false
                            }
                            return true
                        })
                    }
                    nowTab={props.nowTab}
                    GetRecordsExecute={props.GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={props.GetRecordsPending}
                />
            </MainPageContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`