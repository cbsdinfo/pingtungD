import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
// import { ReactComponent as Search } from '../../../../Assets/img/CarUsedPage/Search.svg'
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { carUsed: { rwd: { tablet } } } } = Theme;

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車輛使用狀況"}
                            theme={tablet.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }
                            }
                        >

                            {/* 查詢日期區間 DateTimeRange  */}
                            <RangeDateTimePicker
                                topLabel={<></>}
                                // type={"time"} time、date、week、month、quarter、year
                                type={"date"}
                                format={"YYYY-MM-DD"}
                                bascDefaultTheme={"DefaultTheme"}
                                // viewType
                                isSearchable
                                placeholder={""}
                                value={
                                    (globalContextService.get("CarUsedPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("CarUsedPage", "DateTimeRange")[0]), moment(globalContextService.get("CarUsedPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("CarUsedPage", "DateTimeRange", value);
                                }}
                                theme={tablet.dateTimeRange}
                            />

                            {/* 單選下拉選單 請選擇用戶身份 UserCaseType */}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇用戶身份"}
                                // isMulti
                                // hideSelectedOptions={false}
                                value={globalContextService.get("CarUsedPage", "UserCaseType") ?? null}
                                //value={globalContextService.get("CarUsedPage", "UserCaseType") ?? [{ value: '1', label: '長照個案' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarUsedPage", "UserCaseType", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇用戶身份", isDisabled: true },
                                    { value: '1', label: '長照個案' },
                                    { value: '2', label: '日照個案' },
                                    { value: '3', label: '偏鄉運能不足' },
                                    { value: '4', label: '白牌車' },
                                    { value: '5', label: '噗噗共乘' },
                                    { value: '6', label: '幸福巴士' },
                                    { value: '7', label: 'DRTS' }
                                ]}
                                theme={tablet.userId}

                            />

                            {/* 匯出檔案按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>

                                {/* 匯出檔案按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.exportButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                    }}
                                >
                                    匯出檔案
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                        <FormContainer
                            theme={tablet.secondTitleBar}
                        >
                            <FormRow>
                                {/* 單選下拉選單 請選擇服務單位 Unit */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇服務單位"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    value={globalContextService.get("CarUsedPage", "Unit") ?? null}
                                    //value={globalContextService.get("CarUsedPage", "Unit") ?? [{ value: '1', label: '長照個案' }]}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("CarUsedPage", "Unit", value);
                                    }}

                                    options={[
                                        { value: '0', label: "請選擇服務單位", isDisabled: true },
                                        { value: '1', label: 'A單位' },
                                        { value: '2', label: 'B單位' },
                                    ]}
                                    theme={tablet.unit}

                                />
                            </FormRow>
                        </FormContainer>


                    </>
                }
            // theme={tablet.mainPageContainer}
            >
                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={tablet.tableContainer}
                >
                    <OldTable
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CarUsedPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CarUsedPage", "CheckedRowsData", checkedRows);
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
                                    title: '車牌號碼',
                                    width: "104px",
                                    dataIndex: 'carNo',
                                    sorter: (a, b) => a.carNo.length - b.carNo.length,
                                    fixed: 'left',
                                },
                                {
                                    title: '車行',
                                    width: "337px",
                                    dataIndex: 'OrgName',
                                    // sorter: (a, b) => a.uid.length - b.uid.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '完成趟次',
                                    width: "84px",
                                    dataIndex: 'finishTimes',
                                    // sorter: (a, b) => a.sex.length - b.sex.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '完成總里程數',
                                    width: "110px",
                                    dataIndex: 'totalLong',
                                    // sorter: (a, b) => a.cellphone.length - b.cellphone.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '使用率％',
                                    width: "84px",
                                    dataIndex: 'useRate',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
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
                        data={([
                            { id: 0, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 1, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 2, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 3, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 4, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 5, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 6, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 7, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 8, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 9, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 10, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 11, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 12, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 13, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 14, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 15, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 16, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 17, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 18, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 19, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 20, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                            { id: 21, carNo: "M8N-5410", OrgName: "XXXXXXXXXXXX股份有限公司", finishTimes: 5000, totalLong: 10000, useRate: "50%" },
                        ])}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        // data={props.SubOrgs.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>
            </MainPageContainer>

        </>

    )
}

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
