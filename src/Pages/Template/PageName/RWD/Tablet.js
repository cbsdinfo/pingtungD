import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/CasePage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CasePage/Plus.svg'
import { ReactComponent as Assign } from '../../../../Assets/img/OrgManagerPage/Assign.svg'
import { ReactComponent as Del } from '../../../../Assets/img/OrgManagerPage/Del.svg'
import { ReactComponent as Edit } from '../../../../Assets/img/OrgManagerPage/Edit.svg'
import { ReactComponent as CaretDown } from '../../../../Assets/img/OrgManagerPage/CaretDown.svg'
import { ReactComponent as Refresh } from '../../../../Assets/img/OrgManagerPage/Refresh.svg'
import { ReactComponent as TableDisable } from '../../../../Assets/img/OrgManagerPage/TableDisable.svg'
import { ReactComponent as TableEdit } from '../../../../Assets/img/OrgManagerPage/TableEdit.svg'
import { ReactComponent as TableEnable } from '../../../../Assets/img/OrgManagerPage/TableEnable.svg'
import { useHistory } from 'react-router-dom';
import { getParseItemLocalStorage, valid } from '../../../../Handlers/'
import Select from 'react-select'
import { treeSelectorTransducer } from '../../../../Components/Form/TreeSelector/TreeSelector';
import isUndefined from 'lodash/isUndefined';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { orgManager: { rwd: { tablet } } } } = Theme;
    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("OrgManagerPage", "IdDescribe") ?? false);

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
            >

            </MainPageContainer>

        </>

    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
