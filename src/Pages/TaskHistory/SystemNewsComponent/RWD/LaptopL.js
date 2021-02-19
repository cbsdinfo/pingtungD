import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, TextEditor, RangeDateTimePicker, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/SystemNewsComponentPage/NoData.svg'
import isUndefined from 'lodash/isUndefined';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';
import { fmt } from '../../../../Handlers/DateHandler';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { component: { systemNewsComponent: { rwd: { laptopL } } } } } } = Theme;

    const [Width, Height] = useWindowSize();
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    let history = useHistory()
    return (
        <>
            {/* 日期區間容器 */}
            <BasicContainer theme={laptopL.dateTimeRangeContainer}>
                {/* 日期區間 DateTimeRange  */}
                <DateTimePicker
                    topLabel={<>日期區間</>}
                    // type={"time"} time、date、week、month、quarter、year
                    type={"month"}
                    format={"YYYY-MM"}
                    bascDefaultTheme={"DefaultTheme"}
                    // viewType
                    isSearchableSystemNewsComponentPage
                    placeholder={""}
                    value={
                        (globalContextService.get("SystemNewsComponentPage", "DateTimeRange")) ?
                            moment(globalContextService.get("SystemNewsComponentPage", "DateTimeRange"), "YYYY-MM")
                            :
                            moment()
                    }
                    onChange={(value, momentObj, OnInitial) => {
                        if (!isEqual(value, globalContextService.get("SystemNewsComponentPage", "DateTimeRange"))) {
                            // console.log("undefined", isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType")))
                            // 阻擋第一次渲染即觸發
                            if (!isUndefined(globalContextService.get("NewsPage", "firstUseAPIgetNewsType"))) {
                                props.GetNewsTypeExecute(true, props.NowTab?.value, value)
                            }
                            globalContextService.set("SystemNewsComponentPage", "DateTimeRange", value);
                            setForceUpdate(f => !f)
                        }
                    }}
                    theme={laptopL.dateTimeRange}
                />
            </BasicContainer>

            {/* Table 外側容器 */}
            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                height={Height}
                theme={laptopL.tableOutsideContainer}
            >

                {props.AllNews.length === 0
                    ?
                    <>
                        {/* 無資料表單區容器 */}
                        < BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            height={Height}
                            theme={laptopL.noDataContainer}
                        >
                            <NoData style={laptopL.noDataSvg} />
                        </BasicContainer>
                    </>
                    :
                    <>
                        {/* Table 容器 */}
                        <BasicContainer
                            bascDefaultTheme={"DefaultTheme"}
                            length={props?.AllNews?.length ?? 0}
                            theme={laptopL.tableContainer}
                        >
                            <OldTable
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
                                            width: "0px",
                                            dataIndex: 'leftOccupy',
                                            fixed: 'left',
                                            sorter: false
                                        },
                                        {
                                            title: '身份',
                                            width: "96px",
                                            dataIndex: 'newsCategoryName',
                                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                            // fixed: 'left',
                                            render: (rowData, allRowData) => {
                                                const statusMapping = (status, getTheme = false) => {
                                                    switch (toString(status)) {
                                                        case "長照":
                                                            return (getTheme ? laptopL.newsIdentityTag.caseNews : "長照");
                                                        case "共享車隊":
                                                            return (getTheme ? laptopL.newsIdentityTag.whiteNews : "共享車隊");
                                                        case "巴士":
                                                            return (getTheme ? laptopL.newsIdentityTag.busNews : "巴士");
                                                        case "系統公告":
                                                            return (getTheme ? laptopL.newsIdentityTag.systemNews : "系統公告");
                                                        default:
                                                            return (getTheme ? laptopL.newsIdentityTag.unknownNews : "無此身份");
                                                    }
                                                }

                                                return (
                                                    <>
                                                        <Tag
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={statusMapping(rowData, true)}
                                                            text={statusMapping(rowData)}
                                                        />
                                                    </>
                                                )
                                            }
                                        },
                                        {
                                            title: '日期',
                                            width: "111px",
                                            dataIndex: 'releaseDate',
                                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                            // fixed: 'left',
                                            render: (rowData) => {
                                                return (
                                                    <>
                                                        {rowData.split(" ")[0]}
                                                    </>
                                                )
                                            }
                                        },
                                        {
                                            title: '公告',
                                            width: "496px",
                                            dataIndex: 'title',
                                            // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                            // fixed: 'left',
                                            render: (rowData, allRowData) => {
                                                return (
                                                    <>
                                                        <BasicContainer theme={laptopL.newsContentContainer}>
                                                            <Text
                                                                baseDefaultTheme={"DefaultTheme"}
                                                                onClick={() => {
                                                                    // console.log(allRowData)
                                                                    props.setCheckDetail((({ title, contents }) => ({ title, contents }))(allRowData))
                                                                }}
                                                                theme={laptopL.newsContentText}
                                                            >
                                                                {rowData}
                                                            </Text>
                                                        </BasicContainer>
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
                                //showHeader={false}
                                data={props?.AllNews ?? []}
                                // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                                // data={props.AllClient.data}
                                clickPage={(currentPage, pageSize) => {
                                }}
                            />
                        </BasicContainer>
                    </>
                }

            </BasicContainer>
        </>
    )
}

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`