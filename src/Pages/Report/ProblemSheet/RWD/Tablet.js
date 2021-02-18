import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, OrgsTree, AssignUserTitleModal, CarAndDriverSettingCard } from '../../../../ProjectComponent';
import { globalContextService, FormContainer, TreeSelector, FormRow, OldList, Tooltip, Selector, Checkbox, Text, TextInput, SubContainer, NativeLineButton, Container, BasicContainer, ScrollBar, OldTable, Tag, modalsService, CheckboxX, TitleModal, RangeDateTimePicker } from '../../../../Components';
import { useHistory } from 'react-router-dom';

import moment from 'moment';


const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { problemSheet: { rwd: { tablet } } } } = Theme;

    const [IdDescribe, setIdDescribe] = useState(globalContextService.get("ProblemSheetPage", "IdDescribe") ?? false);

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
                            theme={tablet.titleBar}
                            onSubmit={(e) => {
                                console.log("目前不支援搜尋功能")
                                // props.GetSubOrgsExecute(true, "");
                            }}
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
                                theme={tablet.dateTimeRange}
                            />

                            {/* 系統操作問題單按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 各車行記點狀況按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.carDealerRecordStatusButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開新增 Modal
                                        modalsService.titleModal.normal({
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
                                                close()
                                            },
                                            closeIconOnClick: (e) => {
                                                // props.controllGCS("addClientModalClose")
                                            },
                                            content: (
                                                <>
                                                    {/* 各車行記點狀況彈窗 Content ScrollBar */}
                                                    <ScrollBar
                                                        basedefaulttheme={"DefaultTheme"}
                                                        theme={tablet.statusInModalContentScrollBar}
                                                    >
                                                        {/* 各車行記點狀況彈窗 ScrollBar 下容器 */}
                                                        <BasicContainer
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            theme={tablet.statusInModalMainContent}
                                                        >
                                                            {/* 各車行記點狀況 List */}
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
                                                                            //sorter: (a, b) => a.insuranceType.length - b.insuranceType.length,
                                                                        },
                                                                        {
                                                                            title: "違規點數",
                                                                            width: "84px",
                                                                            dataIndex: 'vioPoint',
                                                                            // sorter: (a, b) => a.insuranceExpiryDate.length - b.insuranceExpiryDate.length,
                                                                        },
                                                                        {
                                                                            title: "停權到期日",
                                                                            width: "103px",
                                                                            dataIndex: 'suspEndDate',
                                                                            // sorter: (a, b) => a.insuranceExpiryDate.length - b.insuranceExpiryDate.length,
                                                                        }
                                                                    ]
                                                                    //#endregion
                                                                }
                                                                hidePageFoot
                                                                data={[
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                    { id: "4ssd45asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "0", suspEndDate: "2022-11-30" },
                                                                    { id: "4ssd55asd", OrgName: "福倫交通股份有限公司 ", vioPoint: "1", suspEndDate: "無" },
                                                                ]} // 寫死項目
                                                            />
                                                        </BasicContainer>
                                                    </ScrollBar>


                                                </>


                                            ),
                                            theme: tablet.statusModal
                                        })
                                    }}
                                >各車行記點狀況
                                </NativeLineButton>

                                {/* 匯出報表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.exportButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};
                                        //#region 打開編輯 Modal
                                        modalsService.titleModal.normal({
                                            title: "匯出報表",
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
                                                close()
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
                                                    theme={tablet.exportContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* 新增彈窗 - 開始 - 結束日期 DateBetween */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>選擇日期</>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("ProblemSheetPage", "ExportDateBetween") ?? rowData.carDealerShipName}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("ProblemSheetPage", "ExportDateBetween", value);
                                                            }}
                                                            theme={tablet.exportDateBetween}
                                                        />
                                                        {/* 新增彈窗 - 車行 CarDealership */}
                                                        <Selector
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            topLabel={<>車行</>}
                                                            //viewType
                                                            isSearchable
                                                            placeholder={"請選擇車行"}
                                                            // isMulti
                                                            // hideSelectedOptions={false}
                                                            value={globalContextService.get("ProblemSheetPage", "exportCarDealership") ?? null}
                                                            onChange={(e, value, onInitial) => {
                                                                // console.log(value)
                                                                globalContextService.set("ProblemSheetPage", "exportCarDealership", value);
                                                            }}

                                                            options={[
                                                                { value: '0', label: "請選擇車行", isDisabled: true },
                                                                { value: '1', label: '車行A' },
                                                                { value: '2', label: '車行B' }
                                                            ]}
                                                            menuPosition={true}
                                                            theme={tablet.exportCarDealership}
                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: tablet.exportModal
                                        })
                                    }}
                                >
                                    匯出報表
                                </NativeLineButton>

                            </SubContainer>

                        </MainPageTitleBar>
                        <BasicContainer
                            baseDefaultTheme={"DefaultTheme"}>

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
                                value={globalContextService.get("ProblemSheetPage", "CarDealership") ?? [{ value: '0', label: '請選擇車行' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("ProblemSheetPage", "CarDealership", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇車行", isDisabled: true },
                                    { value: '1', label: '車行A' },
                                    { value: '2', label: '車行B' }
                                ]}
                                theme={tablet.carDealership}
                            />
                        </BasicContainer>

                    </>
                }
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
                                globalContextService.set("ProblemSheetPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("ProblemSheetPage", "CheckedRowsData", checkedRows);
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
                                                    theme={tablet.checkPassButton}
                                                // onClick={() => { }}
                                                >審核通過
                                            </NativeLineButton>

                                                {/* 審核不通過按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={tablet.checkNotPassButton}
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

export const Tablet = styled(TabletBase).attrs((props) => ({}))`
 
`
