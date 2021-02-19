import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input, CardTable } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, TextEditor, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, NativeLineButton } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/SystemNewsComponentPage/NoData.svg'
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { component: { systemNewsComponent: { rwd: { mobileM } } } } } } = Theme;

    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    const statusMapping = (status, getTheme = false) => {
        switch (toString(status)) {
            case "長照":
                return (getTheme ? mobileM.newsIdentityTag.caseNews : "長照");
            case "共享車隊":
                return (getTheme ? mobileM.newsIdentityTag.whiteNews : "共享車隊");
            case "巴士":
                return (getTheme ? mobileM.newsIdentityTag.busNews : "巴士");
            case "系統公告":
                return (getTheme ? mobileM.newsIdentityTag.systemNews : "系統公告");
            default:
                return (getTheme ? mobileM.newsIdentityTag.unknownNews : "無此身份");
        }
    }

    let history = useHistory()

    return (
        <>
            {/* 公告外層 容器 */}
            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                height={Height}
                theme={mobileM.newsContainer}
            >
                {props.AllNews.length === 0
                    ?
                    <>
                        {/* 無資料表單區容器 */}
                        < BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            height={Height}
                            theme={mobileM.noDataContainer}
                        >
                            <NoData style={mobileM.noDataSvg} />
                        </BasicContainer>
                    </>
                    :
                    <CardTable
                        dataChangeClearChecked={true} //當Data變動時 是否清空已勾選項
                        dataChangeClearCheckedToDo={() => { //當Data變動時 要清空已勾選項時執行的函數
                            globalContextService.remove("SystemNewsComponentPage", "CheckedRowKeys");
                            globalContextService.remove("SystemNewsComponentPage", "CheckedRowsData");
                        }}
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("SystemNewsComponentPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("SystemNewsComponentPage", "CheckedRowsData", checkedRows);
                            }
                        }
                        setPerCheckBoxDisabled={(record) => {
                            return {
                                // ...record, // 對應CheckBox當列資料
                                // disabled: record.name === 'Edrward 11',
                            }
                        }}
                        //scrollAreaWidth={"calc( 1900px - 300px )"} // 不用傳 會自適應寬度
                        //scrollAreaHeight={"calc( 100% - 55px )"}
                        columnsAttr={
                            //#region 資料欄設定
                            [
                                {
                                    title: '',
                                    width: "100%",
                                    dataIndex: '',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                    render: (rowData, allRowData) => {

                                        return (
                                            <>
                                                {/* 公告容器 */}
                                                <Container theme={mobileM.newsCardContainer}>

                                                    {/* 公告Tag容器 */}
                                                    <SubContainer theme={mobileM.newsCardTagContainer}>
                                                        {/* 公告Tag */}
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={statusMapping(props?.tag ?? toString(rowData.newsCategoryName), true)}
                                                            text={statusMapping(props?.tag ?? toString(rowData.newsCategoryName))}
                                                        />
                                                    </SubContainer >

                                                    {/* 公告日期容器 */}
                                                    <SubContainer theme={mobileM.newsCardDateContainer}>
                                                        {/* 公告日期文字 */}
                                                        <Text theme={mobileM.newsCardDateText}>
                                                            {rowData?.releaseDate.split(" ")[0] ?? "2020-12-31"}
                                                        </Text>
                                                    </SubContainer>

                                                    {/* 公告內容容器 */}
                                                    <SubContainer theme={mobileM.newsCardContentContainer}>
                                                        {/* 公告內容文字 */}
                                                        <Text
                                                            theme={mobileM.newsCardContentText}
                                                            onClick={() => {
                                                                props.setCheckDetail((({ title, contents }) => ({ title, contents }))(allRowData))
                                                            }}
                                                        >
                                                            {rowData.title}
                                                        </Text>
                                                    </SubContainer>

                                                </Container>

                                            </>
                                        )
                                    }
                                },
                                {
                                    title: '',
                                    width: "0px",
                                    dataIndex: 'rightOccupy',
                                    fixed: 'right',
                                    sorter: false
                                },
                            ]
                            //#endregion
                        }
                        //sort
                        showHeader={false}
                        data={props.AllNews}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.AllClient.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                }
                {(props.AllNews.length > 0 && props.AllNews.length <= 10)
                    &&
                    <>
                        {/* 沒有更多公告 提醒 */}
                        <Text
                            theme={mobileM.noDataTip}
                        >
                            沒有更多公告
                        </Text>
                    </>
                }
            </BasicContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`