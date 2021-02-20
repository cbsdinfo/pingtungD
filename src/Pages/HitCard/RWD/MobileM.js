import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, TaskCard, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, BasicButton, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../Components';
import { ReactComponent as User } from '../../../Assets/img/TodayTaskPage/User.svg'
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { fmt } from '../../../Handlers/DateHandler';
import { SystemNewsComponent } from '../SystemNewsComponent/SystemNewsComponent'
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { hitCard: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion

    return (
        <>
            <TitleBar
                returnIcon
                customTitleText={<Text theme={mobileM.titleBar}>打卡列表</Text>}
            />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
                {/* 日期 */}
                <Text
                    theme={mobileM.nowDateText}
                >
                    {fmt(moment(), "YYYY / MM / DD")}
                </Text>

                {/* 打卡紀錄 容器*/}
                <BasicContainer
                    theme={mobileM.hitCardList}
                >
                    {/* 列表標題 容器 */}
                    <SubContainer
                        theme={mobileM.listTitleContainer}
                    >
                        {/* 打卡 標題 */}
                        <Text
                            theme={mobileM.hitCardTitle}
                        >
                            打卡
                        </Text>

                        {/* 時間 標題 */}
                        <Text
                            theme={mobileM.timeTitle}
                        >
                            時間
                        </Text>

                    </SubContainer>

                    {/* 列表 容器 */}
                    <SubContainer
                        theme={mobileM.listContainer}
                    >

                    </SubContainer>

                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`