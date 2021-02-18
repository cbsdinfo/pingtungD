import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, OldList, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
import { useHistory } from 'react-router-dom';

import moment from 'moment';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { problemSheet: { rwd: { laptopL } } } } = Theme;

    let history = useHistory();

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"系統操作問題單"}
                            theme={laptopL.titleBar}
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
                                    (globalContextService.get("ProblemSheetPage", "DateTimeRange") ?
                                        [moment(globalContextService.get("ProblemSheetPage", "DateTimeRange")[0]), moment(globalContextService.get("ProblemSheetPage", "DateTimeRange")[1])]
                                        :
                                        [moment('2015-06-06', "YYYY-MM-DD"), moment('2015-06-06', "YYYY-MM-DD")]
                                    )
                                }
                                onChange={(value, momentObj) => {
                                    globalContextService.set("ProblemSheetPage", "DateTimeRange", value);
                                }}
                                theme={laptopL.dateTimeRange}
                            />

                            {/* 單選下拉選單 請選擇車行 CarDealership*/}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇車行"}
                                // isMulti
                                // hideSelectedOptions={false}
                                // value={globalContextService.get("CarAndDriverSettingPage", "CarDealership") ?? { value: '1', label: '車行A' }}
                                //value={globalContextService.get("CarAndDriverSettingPage", "CarDealership") ?? [{ value: '1', label: '車行B' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("ProblemSheetPage", "CarDealership", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇車行", isDisabled: true },
                                    { value: '1', label: '車行A' },
                                    { value: '2', label: '車行B' }
                                ]}
                                theme={laptopL.carDealership}

                            />
                            {/* 系統操作問題單按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 各車行記點狀況按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.carDealerRecordStatusButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開各車行記點狀況 Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "各車行記點狀況",
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
                                                close();
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            content: (
                                                <>
                                                    {/* 打卡記錄彈窗 Content ScrollBar */}
                                                    <ScrollBar
                                                        basedefaulttheme={"DefaultTheme"}
                                                        theme={laptopL.statusInModalContentScrollBar}
                                                    >
                                                        {/* 打卡記錄彈窗 ScrollBar 下容器 */}
                                                        <BasicContainer
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.statusInModalMainContent}
                                                        >
                                                            <OldList
                                                                checkbox={false}
                                                                checkedRowKeyName={"id"}
                                                                columnsAttr={
                                                                    //#region 資料欄設定
                                                                    [
                                                                        {
                                                                            title: '車行',
                                                                            width: "400px",
                                                                            dataIndex: 'OrgName',
                                                                            // sorter: (a, b) => a.OrgName.length - b.OrgName.length,
                                                                        },
                                                                        {
                                                                            title: "違規點數",
                                                                            width: "84px",
                                                                            dataIndex: 'vioPoint',
                                                                            // sorter: (a, b) => a.vioPoint.length - b.vioPoint.length,
                                                                        },
                                                                        {
                                                                            title: "停權到期日",
                                                                            width: "103px",
                                                                            dataIndex: 'suspEndDate',
                                                                            // sorter: (a, b) => a.suspEndDate.length - b.suspEndDate.length,
                                                                        }
                                                                    ]
                                                                    //#endregion
                                                                }
                                                                hidePageFoot
                                                                data={[
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                ]} // 寫死項目
                                                            />
                                                        </BasicContainer>
                                                    </ScrollBar>
                                                </>
                                            ),
                                            theme: laptopL.statusModal
                                        })
                                        //#endregion
                                    }}
                                >各車行記點狀況
                                </NativeLineButton>

                                {/* 匯出報表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptopL.exportButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開新增 Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "匯出報表",
                                            yes: true,
                                            yesText: "確認",
                                            no: true,
                                            noText: "取消",
                                            // autoClose: true,
                                            backgroundClose: false,
                                            noOnClick: (e) => {
                                                // props.controllGCS("addModalClose")
                                            },
                                            yesOnClick: (e, close) => {
                                                //#region 表單驗證
                                                // let validMsg = "";
                                                // if (valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]) {
                                                //     validMsg = valid(globalContextService.get("RoleManagerPage", "RoleName") ?? "", ["^.{1,}$"], ["請輸入角色名稱"])[1]
                                                // }
                                                // else if (valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]) {
                                                //     validMsg = valid(isUndefined(globalContextService.get("RoleManagerPage", "Status")?.value) ? "" : "null值", ["^.{1,}$"], ["請選擇狀態"])[1]
                                                // }
                                                //#region 表單驗證後動作
                                                // if (validMsg !== "") {
                                                //     console.log(validMsg, globalContextService.get("RoleManagerPage"))
                                                //     modalsService.infoModal.error({
                                                //         id: "top1", //注意 這裡要加上固定id
                                                //         iconRightText: validMsg,
                                                //         yes: true,
                                                //         yesText: "確認",
                                                //         // no: true,
                                                //         // autoClose: true,
                                                //         backgroundClose: false,
                                                //         yesOnClick: (e, close) => {
                                                //             close();
                                                //         }
                                                //     })
                                                // }
                                                // else {
                                                //     props.RolesAddExecute({
                                                //         name: globalContextService.get("RoleManagerPage", "RoleName"),
                                                //         status: globalContextService.get("RoleManagerPage", "Status")?.value,
                                                //         organizationIds: "",
                                                //         organizations: ""
                                                //     })
                                                close();
                                                // }
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addModalClose")
                                            },
                                            content: (
                                                <FormContainer
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                    theme={laptopL.exportContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* 新增彈窗 開始 - 結束日期 DateBetween  */}
                                                        <TextInput
                                                            topLabel={"選擇日期"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            theme={laptopL.exportDateBetween}
                                                            type="text"
                                                            placeholder={"暫時使用"}
                                                            value={globalContextService.get("ProblemSheetPage", "ExportDateBetween") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("ProblemSheetPage", "ExportDateBetween", value);
                                                            }}
                                                        />
                                                        {/* 新增彈窗 單選下拉選單 請選擇車行 CarDealership*/}
                                                        <Selector
                                                            topLabel={"車行"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇車行"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            // value={globalContextService.get("CarAndDriverSettingPage", "ExportCarDealership") ?? { value: '1', label: '車行A' }}
                                                            //value={globalContextService.get("CarAndDriverSettingPage", "ExportCarDealership") ?? [{ value: '1', label: '車行B' }]}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("exportCarDealership", "CarDealership", value);
                                                            }}

                                                            options={[
                                                                { value: '0', label: "請選擇車行", isDisabled: true },
                                                                { value: '1', label: '車行A' },
                                                                { value: '2', label: '車行B' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={laptopL.exportCarDealership}

                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: laptopL.exportModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    匯出報表
                                </NativeLineButton>

                            </SubContainer>
                        </MainPageTitleBar>
                    </>
                }
            >
                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptopL.tableContainer}
                >
                    <OldTable
                        checkbox={false}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("CarAndDriverSettingPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CarAndDriverSettingPage", "CheckedRowsData", checkedRows);
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
                                    title: '訂單編號',
                                    width: "183px",
                                    dataIndex: 'orderNumber',
                                    sorter: (a, b) => a.orderNumber.length - b.orderNumber.length,
                                    fixed: 'left',
                                },
                                {
                                    title: '狀態',
                                    width: "108px",
                                    dataIndex: 'status',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {rowData.status === 1 ?
                                                    <Tag
                                                        baseDefaultTheme={"SecondaryTheme"}
                                                        theme={{
                                                            container: {
                                                                basic: (style, props) => ({
                                                                    ...style,
                                                                    margin: "0",
                                                                    padding: "0px 7px",
                                                                    fontSize: "12px",
                                                                    lineHeight: "20px"
                                                                }),
                                                                hover: {}
                                                            }
                                                        }}
                                                        text={"審核不通過"}
                                                    />
                                                    :
                                                    <Tag
                                                        baseDefaultTheme={"DefaultTheme"}
                                                        theme={{
                                                            container: {
                                                                basic: (style, props) => ({
                                                                    ...style,
                                                                    margin: "0",
                                                                    padding: "0px 7px",
                                                                    fontSize: "12px",
                                                                    color: "#13C2C2",
                                                                    lineHeight: "20px",
                                                                    backgroundColor: "#E6FFFB",
                                                                    borderColor: "#87E8DE"

                                                                }),
                                                                hover: {}
                                                            }
                                                        }}
                                                        text={"未審核"}
                                                    />
                                                }
                                            </>
                                        )
                                    }
                                    // sorter: (a, b) => a.uid.length - b.uid.length,
                                    // fixed: 'left',

                                },
                                {
                                    title: '車行',
                                    width: "350px",
                                    dataIndex: 'carDealership',
                                    // sorter: (a, b) => a.sex.length - b.sex.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '變更狀態',
                                    width: "200px",
                                    dataIndex: 'changeStatus',
                                    // sorter: (a, b) => a.cellphone.length - b.cellphone.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '問題類型',
                                    width: "300px",
                                    dataIndex: 'proType',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '問題敘述',
                                    width: "120px",
                                    dataIndex: 'proDesc',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '申請變更時間',
                                    width: "150px",
                                    dataIndex: 'applyChangeTime',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '預約訂車時間',
                                    width: "150px",
                                    dataIndex: 'resTime',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "230px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {/* 審核通過按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptopL.checkPassButton}
                                                // onClick={() => { }}
                                                >審核通過
                                            </NativeLineButton>

                                                {/* 審核不通過按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptopL.checkNotPassButton}
                                                // onClick={() => { ) }}
                                                >審核不通過
                                            </NativeLineButton>
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
                        data={[{ id: "asdasd-415asd1sa5d-asd", orderNumber: "1548126", status: 1 },
                        { id: "asdasd-425asd1sa5d-asd", orderNumber: "1548526", status: 0 }]}
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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`

`

