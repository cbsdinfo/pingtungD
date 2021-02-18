import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { BUnitSort, MainPageContainer, Map8Canvas, map8Controll, Map8Input } from '../../../../ProjectComponent';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, Tag, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { isEqual, isNil } from 'lodash';
import { valid } from '../../../../Handlers';
import { toString } from 'lodash/lang';
import { ReactComponent as NoData } from '../../../../Assets/img/SystemNewsComponentPage/NoData.svg'

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { news: { component: { systemNewsComponent: { rwd: { tablet } } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    return (
        <>
            {/* Table 容器 */}
            <BasicContainer
                bascDefaultTheme={"DefaultTheme"}
                theme={tablet.tableContainer}
            >
                {props.data.length === 0
                    ?
                    <>
                        {/* 無資料表單區容器 */}
                        < BasicContainer
                            baseDefaultTheme={"DefaultTheme"}
                            theme={tablet.noDataContainer}
                        >
                            <NoData style={tablet.noDataSvg} />
                        </BasicContainer>
                    </>
                    :
                    <>
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
                                        dataIndex: 'identity',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            const statusMapping = (status, getTheme = false) => {
                                                switch (toString(status)) {
                                                    case "1":
                                                        return (getTheme ? tablet.newsIdentityTag.caseNews : "長照");
                                                    case "2":
                                                        return (getTheme ? tablet.newsIdentityTag.whiteNews : "共享車隊");
                                                    case "3":
                                                        return (getTheme ? tablet.newsIdentityTag.busNews : "巴士");
                                                    default:
                                                        return (getTheme ? tablet.newsIdentityTag.unknownNews : "無此身份");
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
                                        dataIndex: 'date',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                    },
                                    {
                                        title: '公告',
                                        width: "496px",
                                        dataIndex: 'announce',
                                        // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                        // fixed: 'left',
                                        render: (rowData, allRowData) => {
                                            return (
                                                <>
                                                    <BasicContainer theme={tablet.newsContentContainer}>
                                                        <Text
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            onClick={() => {
                                                                modalsService.titleModal.normal({
                                                                    //id: "top1",
                                                                    title: "公告",
                                                                    yes: true,
                                                                    yesText: "確認",
                                                                    no: false,
                                                                    noText: "取消",
                                                                    // autoClose: true,
                                                                    backgroundClose: false,
                                                                    noOnClick: (e) => {
                                                                    },
                                                                    yesOnClick: (e, close) => {
                                                                        close();
                                                                    },
                                                                    closeIconOnClick: (e) => {
                                                                    },
                                                                    content: (
                                                                        <Text theme={tablet.newsContentModalText}>
                                                                            {rowData ?? "武漢肺炎》明年Q1疫苗可望施打！莊人祥透露優先施打順序順序順序順序順序順序順序順序順序順序順序順..."}
                                                                        </Text>
                                                                    ),
                                                                    theme: tablet.newsModal
                                                                })
                                                            }}
                                                            theme={tablet.newsContentText}
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
                            data={props.data}
                            // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                            // data={props.AllClient.data}
                            clickPage={(currentPage, pageSize) => {
                            }}
                        />
                    </>

                }
            </BasicContainer>

        </>
    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`