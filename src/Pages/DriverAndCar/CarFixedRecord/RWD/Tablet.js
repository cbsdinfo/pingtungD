import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, DateTimePicker, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, Radio, RadioItem, Textarea } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/CarsPage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/CarsPage/Plus.svg'
import { useHistory } from 'react-router-dom';
import { valid } from '../../../../Handlers/';
import moment from 'moment';

const TabletBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { carFixedRecord: { rwd: { tablet } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"車輛保養紀錄"}
                            theme={tablet.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 單選下拉選單 請選擇車行 CarDealership*/}
                            <Selector
                                bascDefaultTheme={"DefaultTheme"}
                                //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                //viewType
                                isSearchable
                                placeholder={"請選擇車行"}
                                // isMulti
                                // hideSelectedOptions={false}
                                // value={globalContextService.get("DriversPage", "CarDealership") ?? { value: '1', label: '車行A' }}
                                value={globalContextService.get("CarFixedRecordPage", "CarDealership") ?? [{ value: '0', label: '請選擇車行' }]}
                                onChange={(e, value, onInitial) => {
                                    globalContextService.set("CarFixedRecordPage", "CarDealership", value);
                                }}

                                options={[
                                    { value: '0', label: "請選擇車行", isDisabled: true },
                                    { value: '1', label: '車行A' },
                                    { value: '2', label: '車行B' }
                                ]}
                                theme={tablet.carDealership}

                            />
                            {/* 匯出報表按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 匯出報表按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.exportButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >
                                    匯出報表
                                </NativeLineButton>
                                {/* 新增按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={tablet.addButton}
                                    onClick={(e) => {
                                        e.preventDefault();

                                        let rowData = {};

                                        //#region 打開新增 Modal
                                        modalsService.titleModal.normal({
                                            //id: "top1",
                                            title: "新增",
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
                                                //#region 表單驗證
                                                let validMsg = "";
                                                if (valid(globalContextService.get("CarFixedRecordPage", "AddCar") ?? "", ["^.{1,}$"], ["請輸入車輛"])[1]) {
                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "AddCar") ?? "", ["^.{1,}$"], ["請輸入車輛"])[1]
                                                }
                                                else if (valid(globalContextService.get("CarFixedRecordPage", "AddDate") ?? "", ["^.{1,}$"], ["請輸入日期"])[1]) {
                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "AddDate") ?? "", ["^.{1,}$"], ["請輸入日期"])[1]
                                                }
                                                else if (valid(globalContextService.get("CarFixedRecordPage", "AddSrvChoose") ?? "", ["^.{1,}$"], ["請輸入服務選擇"])[1]) {
                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "AddSrvChoose") ?? "", ["^.{1,}$"], ["請輸入服務選擇"])[1]
                                                }
                                                else if (valid(globalContextService.get("CarFixedRecordPage", "AddMileage") ?? "", ["^.{1,}$"], ["請輸入里程"])[1]) {
                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "AddMileage") ?? "", ["^.{1,}$"], ["請輸入里程"])[1]
                                                }
                                                else if (valid(globalContextService.get("CarFixedRecordPage", "AddProject") ?? "", ["^.{1,}$"], ["請輸入施作項目"])[1]) {
                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "AddProject") ?? "", ["^.{1,}$"], ["請輸入施作項目"])[1]
                                                }
                                                //#endregion

                                                //#region 表單驗證後動作
                                                if (validMsg !== "") {
                                                    // console.log(validMsg, globalContextService.get("CarFixedRecordPage"))
                                                    modalsService.infoModal.error({
                                                        id: "top1", //注意 這裡要加上固定id
                                                        iconRightText: validMsg,
                                                        yes: true,
                                                        yesText: "確認",
                                                        // no: true,
                                                        // autoClose: true,
                                                        backgroundClose: false,
                                                        yesOnClick: (e, close) => {
                                                            close();
                                                        }
                                                    })
                                                }
                                                else {
                                                    close();
                                                }
                                                //#endregion
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
                                                    theme={tablet.addFormContainer}
                                                >
                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                        {/* 新增彈窗 - 車輛 AddCar */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>車輛<Text theme={tablet.modalCarRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("CarFixedRecordPage", "AddCar") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("CarFixedRecordPage", "AddCar", value);
                                                            }}
                                                            theme={tablet.modalCar}
                                                        />

                                                        {/* 新增彈窗 - 日期 AddDate */}
                                                        <DateTimePicker
                                                            topLabel={<>日期<Text theme={tablet.modalDateRequired}>(必填)</Text></>}
                                                            // type={"time"} time、date、week、month、quarter、year
                                                            type={"date"}
                                                            format={"YYYY-MM-DD"}
                                                            bascDefaultTheme={"DefaultTheme"}
                                                            // viewType
                                                            isSearchable
                                                            placeholder={""}
                                                            value={
                                                                (globalContextService.get("CarFixedRecordPage", "AddDate") ?
                                                                    moment(globalContextService.get("CarFixedRecordPage", "AddDate"), "YYYY-MM-DD")
                                                                    :
                                                                    null
                                                                )
                                                            }
                                                            onChange={(value, momentObj) => {
                                                                globalContextService.set("CarFixedRecordPage", "AddDate", value);
                                                            }}
                                                            theme={tablet.modalDate}
                                                        />

                                                        {/* 新增彈窗 - 服務選擇 AddSrvChoose */}
                                                        <Radio
                                                            // viewType
                                                            // disable
                                                            topLabel={<>服務選擇<Text theme={tablet.modalSrvChooseRequired}>(必填)</Text></>}
                                                            value={globalContextService.get("CarFixedRecordPage", "AddSrvChoose") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                // console.log(value)
                                                                globalContextService.set("CarFixedRecordPage", "AddSrvChoose", value);
                                                                // console.log(globalContextService.get("CarFixedRecordPage", "AddSrvChoose"));
                                                            }}
                                                            theme={tablet.modalSrvChoose}
                                                        >
                                                            {/* 車輛審核 CarReview  選項 */}
                                                            <RadioItem value={1} >維修</RadioItem>
                                                            <RadioItem value={0} >保養</RadioItem>
                                                        </Radio>

                                                        {/* 新增彈窗 - 里程 AddMileage */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={<>里程<Text theme={tablet.modalMileageRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("CarFixedRecordPage", "AddMileage") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("CarFixedRecordPage", "AddMileage", value);
                                                            }}
                                                            theme={tablet.modalMileage}
                                                        />

                                                        {/* 新增彈窗 - 金額 AddAmount */}
                                                        <TextInput
                                                            // viewType
                                                            topLabel={"金額"}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            type="text"
                                                            placeholder={""}
                                                            value={globalContextService.get("CarFixedRecordPage", "AddAmount") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("CarFixedRecordPage", "AddAmount", value);
                                                            }}
                                                            theme={tablet.modalAmount}
                                                        />

                                                        {/* 新增彈窗 - 施作項目 AddProject */}
                                                        <Textarea
                                                            topLabel={<>施作項目<Text theme={tablet.modalProjectRequired}>(必填)</Text></>}
                                                            baseDefaultTheme={"DefaultTheme"}
                                                            placeholder={""}
                                                            value={globalContextService.get("CarFixedRecordPage", "AddProject") ?? ""}
                                                            onChange={(e, value, onInitial) => {
                                                                globalContextService.set("CarFixedRecordPage", "AddProject", value);
                                                                // console.log(value)
                                                            }}
                                                            theme={tablet.modalProject}
                                                        />
                                                    </FormRow>
                                                </FormContainer>
                                            ),
                                            theme: tablet.addModal
                                        })
                                        //#endregion
                                    }}
                                >
                                    {/* 新增車輛按鈕 圖標 */}
                                    <Plus style={tablet.addButtonIcon} />
                                新增
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                        
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
                                globalContextService.set("CarFixedRecordPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("CarFixedRecordPage", "CheckedRowsData", checkedRows);
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
                                    title: '車輛',
                                    width: "117px",
                                    dataIndex: 'car',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '日期',
                                    width: "104px",
                                    dataIndex: 'date',
                                    // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '里程',
                                    width: "100px",
                                    dataIndex: 'mileage',
                                    // sorter: (a, b) => a.carType.length - b.carType.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '服務選擇',
                                    width: "84px",
                                    dataIndex: 'srvChoose',
                                    // sorter: (a, b) => a.brandModel.length - b.brandModel.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '施作項目',
                                    width: "551px",
                                    dataIndex: 'project',
                                    // sorter: (a, b) => a.wheelchairCount.length - b.wheelchairCount.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '金額',
                                    width: "100px",
                                    dataIndex: 'amount',
                                    // sorter: (a, b) => a.seat.length - b.seat.length,
                                    // fixed: 'left',
                                },
                                {
                                    title: '狀態控制台',
                                    width: "97px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {/* 編輯按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={tablet.editButton}
                                                    onClick={(e) => {
                                                        e.preventDefault();

                                                        // let rowData = {};
                                                        console.log(rowData.value)
                                                        //#region 打開新增 Modal
                                                        modalsService.titleModal.normal({
                                                            //id: "top1",
                                                            title: "編輯",
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
                                                                //#region 表單驗證
                                                                let validMsg = "";
                                                                if (valid(globalContextService.get("CarFixedRecordPage", "EditCar") ?? "", ["^.{1,}$"], ["請輸入車輛"])[1]) {
                                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "EditCar") ?? "", ["^.{1,}$"], ["請輸入車輛"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("CarFixedRecordPage", "EditDate") ?? "", ["^.{1,}$"], ["請輸入日期"])[1]) {
                                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "EditDate") ?? "", ["^.{1,}$"], ["請輸入日期"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("CarFixedRecordPage", "EditSrvChoose") ?? "", ["^.{1,}$"], ["請輸入服務選擇"])[1]) {
                                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "EditSrvChoose") ?? "", ["^.{1,}$"], ["請輸入服務選擇"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("CarFixedRecordPage", "EditMileage") ?? "", ["^.{1,}$"], ["請輸入里程"])[1]) {
                                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "EditMileage") ?? "", ["^.{1,}$"], ["請輸入里程"])[1]
                                                                }
                                                                else if (valid(globalContextService.get("CarFixedRecordPage", "EditProject") ?? "", ["^.{1,}$"], ["請輸入施作項目"])[1]) {
                                                                    validMsg = valid(globalContextService.get("CarFixedRecordPage", "EditProject") ?? "", ["^.{1,}$"], ["請輸入施作項目"])[1]
                                                                }
                                                                //#endregion

                                                                //#region 表單驗證後動作
                                                                if (validMsg !== "") {
                                                                    // console.log(validMsg, globalContextService.get("CarFixedRecordPage"))
                                                                    modalsService.infoModal.error({
                                                                        id: "top1", //注意 這裡要加上固定id
                                                                        iconRightText: validMsg,
                                                                        yes: true,
                                                                        yesText: "確認",
                                                                        // no: true,
                                                                        // autoClose: true,
                                                                        backgroundClose: false,
                                                                        yesOnClick: (e, close) => {
                                                                            close();
                                                                        }
                                                                    })
                                                                }
                                                                else {
                                                                    // props.AddOrUpdateClientExecute({
                                                                    //     name: globalContextService.get("CarFixedRecordPage", `Name`),
                                                                    //     longitude: globalContextService.get("CarFixedRecordPage", "Longitude"),
                                                                    //     latitude: globalContextService.get("CarFixedRecordPage", "Latitude"),
                                                                    //     counties: globalContextService.get("CarFixedRecordPage", "Counties").value,
                                                                    //     district: globalContextService.get("CarFixedRecordPage", "District")?.value,
                                                                    //     road: globalContextService.get("CarFixedRecordPage", "Road"),
                                                                    // })
                                                                    close();
                                                                }
                                                                //#endregion
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
                                                                    theme={tablet.addFormContainer}
                                                                >
                                                                    <FormRow baseDefaultTheme={"DefaultTheme"}>
                                                                        {/* 編輯彈窗 - 車輛 EditCar */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>車輛<Text theme={tablet.modalCarRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("CarFixedRecordPage", "EditCar") ?? ""}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("CarFixedRecordPage", "EditCar", value);
                                                                            }}
                                                                            theme={tablet.modalCar}
                                                                        />

                                                                        {/* 編輯彈窗 - 日期 EditDate */}
                                                                        <DateTimePicker
                                                                            topLabel={<>日期<Text theme={tablet.modalDateRequired}>(必填)</Text></>}
                                                                            // type={"time"} time、date、week、month、quarter、year
                                                                            type={"date"}
                                                                            format={"YYYY-MM-DD"}
                                                                            bascDefaultTheme={"DefaultTheme"}
                                                                            // viewType
                                                                            isSearchable
                                                                            placeholder={""}
                                                                            value={
                                                                                (globalContextService.get("CarFixedRecordPage", "EditDate") ?
                                                                                    moment(globalContextService.get("CarFixedRecordPage", "EditDate"), "YYYY-MM-DD")
                                                                                    :
                                                                                    null
                                                                                )
                                                                            }
                                                                            onChange={(value, momentObj) => {
                                                                                globalContextService.set("CarFixedRecordPage", "EditDate", value);
                                                                            }}
                                                                            theme={tablet.modalDate}
                                                                        />

                                                                        {/* 編輯彈窗 - 服務選擇 EditSrvChoose */}
                                                                        <Radio
                                                                            // viewType
                                                                            // disable
                                                                            topLabel={<>服務選擇<Text theme={tablet.modalSrvChooseRequired}>(必填)</Text></>}
                                                                            value={globalContextService.get("CarFixedRecordPage", "EditSrvChoose") ?? ""}
                                                                            onChange={(e, value, onInitial) => {
                                                                                // console.log(value)
                                                                                globalContextService.set("CarFixedRecordPage", "EditSrvChoose", value);
                                                                                // console.log(globalContextService.get("CarFixedRecordPage", "SrvChoose"));
                                                                            }}
                                                                            theme={tablet.modalSrvChoose}
                                                                        >
                                                                            {/* 車輛審核 CarReview  選項 */}
                                                                            <RadioItem value={1} >維修</RadioItem>
                                                                            <RadioItem value={0} >保養</RadioItem>
                                                                        </Radio>

                                                                        {/* 新增彈窗 - 里程 EditMileage */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={<>里程<Text theme={tablet.modalMileageRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("CarFixedRecordPage", "EditMileage") ?? ""}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("CarFixedRecordPage", "EditMileage", value);
                                                                            }}
                                                                            theme={tablet.modalMileage}
                                                                        />

                                                                        {/* 新增彈窗 - 金額 EditAmount */}
                                                                        <TextInput
                                                                            // viewType
                                                                            topLabel={"金額"}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            type="text"
                                                                            placeholder={""}
                                                                            value={globalContextService.get("CarFixedRecordPage", "EditAmount") ?? ""}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("CarFixedRecordPage", "EditAmount", value);
                                                                            }}
                                                                            theme={tablet.modalAmount}
                                                                        />

                                                                        {/* 新增彈窗 - 施作項目 EditProject */}
                                                                        <Textarea
                                                                            topLabel={<>施作項目<Text theme={tablet.modalProjectRequired}>(必填)</Text></>}
                                                                            baseDefaultTheme={"DefaultTheme"}
                                                                            placeholder={""}
                                                                            value={globalContextService.get("CarFixedRecordPage", "EditProject") ?? ""}
                                                                            onChange={(e, value, onInitial) => {
                                                                                globalContextService.set("CarFixedRecordPage", "EditProject", value);
                                                                                // console.log(value)
                                                                            }}
                                                                            theme={tablet.modalProject}
                                                                        />
                                                                    </FormRow>
                                                                </FormContainer>
                                                            ),
                                                            theme: tablet.addModal
                                                        })
                                                        //#endregion
                                                    }}
                                                >編輯
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
                        data={[{ id: "asdasd-415asd1sa5d-asd", car: "A", date: "2019-08-02", mileage: 12, srvChoose: "保養", project: "項目一二三項目一二三項目一二三項目一二三項目一二一二一二一二一二一二二......", amount: 100 },
                        { id: "asdasd-415a4d1sa5d-asd", car: "B", date: "2019-04-02", mileage: 15, srvChoose: "維修", project: "項目一二三項目一二三項目一二三項目一二三項目一二一二一二一二一二一二二......", amount: 100 }]}
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