import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { MainPageContainer, MainPageTitleBar } from '../../../../ProjectComponent';
import { Container, BasicContainer, TreeSelector, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService } from '../../../../Components';
import { ReactComponent as Search } from '../../../../Assets/img/DriversPage/Search.svg'
import { ReactComponent as Plus } from '../../../../Assets/img/DriversPage/Plus.svg'
import { useHistory } from 'react-router-dom';

const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { drivers: { rwd: { laptop } } } } = Theme;
    let history = useHistory()

    return (
        <>
            <MainPageContainer
                outSideTopComponent={
                    <>
                        {/* 標題列 */}
                        <MainPageTitleBar
                            bascDefaultTheme={"DefaultTheme"}
                            titleText={"司機資料"}
                            theme={laptop.titleBar}
                        // onSubmit={(e)=>console.log(e)}
                        >
                            {/* 司機車輛資料按鈕容器 */}
                            <SubContainer baseDefaultTheme={"DefaultTheme"}>
                                {/* 帳號解鎖按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.unlockButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >帳號解鎖
                                </NativeLineButton>

                                {/* 匯入司機車輛資料按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.importButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >匯入司機車輛資料
                                </NativeLineButton>

                                {/* 下載匯入範本按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.downloadButton}
                                // onClick={() => { history.push("/Case/Add") }}
                                >下載匯入範本
                                </NativeLineButton>

                                {/* 新增司機按鈕 */}
                                <NativeLineButton
                                    baseDefaultTheme={"DefaultTheme"}
                                    disable={false}
                                    type="button" // 防止提交
                                    theme={laptop.addButton}
                                    onClick={() => { history.push("/DriverAndCar/Drivers/Add") }}
                                >
                                    {/* 新增司機按鈕 圖標 */}
                                    <Plus style={laptop.addButtonIcon} />
                                新增司機
                                </NativeLineButton>
                            </SubContainer>
                        </MainPageTitleBar>
                        <FormContainer theme={laptop.formContainer}>
                            <FormRow>
                                {/* 單選下拉選單 請選擇單位 */}
                                <Selector
                                    bascDefaultTheme={"DefaultTheme"}
                                    //topLabel={<>超行咚咚<div style={{ display: "inline-block", color: "red" }}>sdf</div></>}
                                    //viewType
                                    isSearchable
                                    placeholder={"請選擇單位"}
                                    // isMulti
                                    // hideSelectedOptions={false}
                                    // value={globalContextService.get("CasePage", "CaseCapacity") ?? { value: '1', label: '車行A'' }}
                                    //value={globalContextService.get("CasePage", "CaseCapacity") ?? [{ value: '1', label: '公費個案' }]}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversPage", "CarDealership", value);
                                    }}

                                    options={[
                                        { value: '0', label: "請選擇單位", isDisabled: true },
                                        { value: '1', label: '車行A' },
                                        { value: '2', label: '車行B' }
                                    ]}
                                    theme={laptop.carDealership}

                                />
                                {/* 一般輸入框 請輸入關鍵字  */}
                                <TextInput
                                    bascDefaultTheme={"DefaultTheme"}
                                    theme={laptop.keyword}
                                    type="text"
                                    placeholder={"請輸入關鍵字"}
                                    rightIcon={
                                        <Search
                                            style={laptop.keywordRightIcon}
                                        />
                                    }
                                    value={globalContextService.get("DriversPage", "Keyword") ?? ""}
                                    onChange={(e, value, onInitial) => {
                                        globalContextService.set("DriversPage", "Keyword", value);
                                    }}
                                />
                            </FormRow>
                        </FormContainer>
                    </>
                }
            >
                {/* Table 容器 */}
                <BasicContainer
                    bascDefaultTheme={"DefaultTheme"}
                    theme={laptop.tableContainer}
                >
                    <OldTable
                        checkbox={true}
                        // checked={["08f41bf6-4388-4b1e-bd3e-2ff538b44b1b"]}
                        checkedRowKeyName={"id"}
                        checkboxOnChecked={
                            (checkedRowKeys, checkedRows) => {
                                // console.log(`checkedRowKeys: ${checkedRowKeys}`, 'checkedRowsData: ', checkedRows);
                                globalContextService.set("DriversPage", "CheckedRowKeys", checkedRowKeys);
                                globalContextService.set("DriversPage", "CheckedRowsData", checkedRows);
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
                                    title: '姓名',
                                    width: "140px",
                                    dataIndex: 'userName',
                                    sorter: (a, b) => a.userName.length - b.userName.length,
                                    fixed: 'left',
                                },
                                {
                                    title: '身份證字號',
                                    width: "110px",
                                    dataIndex: 'uid',
                                    // sorter: (a, b) => a.uid.length - b.uid.length,
                                    // fixed: 'left',
                                },
                                // {
                                //     title: '性別',
                                //     width: "74px",
                                //     dataIndex: 'sex',
                                //     // sorter: (a, b) => a.sex.length - b.sex.length,
                                //     // fixed: 'left',
                                // },
                                {
                                    title: '手機',
                                    width: "140px",
                                    dataIndex: 'phone',
                                    // sorter: (a, b) => a.phone.length - b.phone.length,
                                    // fixed: 'left',
                                },
                                // {
                                //     title: '車牌號碼',
                                //     width: "132px",
                                //     dataIndex: 'carNumber',
                                //     // sorter: (a, b) => a.carNumber.length - b.carNumber.length,
                                //     // fixed: 'left',
                                // },
                                {
                                    title: '狀態控制台',
                                    width: "256px",
                                    // dataIndex: 'parentName',
                                    // sorter: (a, b) => a.name.length - b.name.length,
                                    fixed: 'right',
                                    render: (rowData) => {
                                        return (
                                            <>
                                                {rowData.status === 0 ?
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
                                                        text={"不可派發"}
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
                                                                    color: "#FA8C16",
                                                                    lineHeight: "20px",
                                                                    backgroundColor: "#FFF7E6",
                                                                    borderColor: "#FFD591"

                                                                }),
                                                                hover: {}
                                                            }
                                                        }}
                                                        text={"可派發"}
                                                    />
                                                }
                                                {/* 編輯按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptop.editButton}
                                                    onClick={() => { history.push(`/DriverAndCar/Drivers/Edit?driversId=${rowData.id}`) }}
                                                >
                                                    編輯
                                                </NativeLineButton>

                                                {/* 檢視按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptop.toViewButton}
                                                    onClick={() => { history.push(`/DriverAndCar/Drivers/Information?driversId=${rowData.id}`) }}
                                                >
                                                    檢視
                                                </NativeLineButton>

                                                {/* 刪除按鈕 */}
                                                <NativeLineButton
                                                    baseDefaultTheme={"DefaultTheme"}
                                                    disable={false}
                                                    type="button" // 防止提交
                                                    theme={laptop.deleteButton}
                                                    onClick={() => {
                                                        modalsService.infoModal.warn({
                                                            iconRightText: "是否確定進行刪除。",
                                                            yes: true,
                                                            yesText: "確認",
                                                            no: true,
                                                            noText: "取消",
                                                            // autoClose: true,
                                                            backgroundClose: false,
                                                            yesOnClick: (e, close) => {
                                                                props.DriversDelExecute([rowData.id])
                                                                close();
                                                            }
                                                        })
                                                    }}
                                                >
                                                    刪除
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
                        // data={[{ id: "asdasd-415asd1sa5d-asd", carType: "一般車", seat: 6, brandModel: "BMW", wheelchairCount: 1, name: "名", uid: "G12312512", sex: "男", cellphone: "0987854555", carNumber: "N8N-6541", status: 1 },
                        // { id: "asdasd-425asd1sa5d-asd", carType: "一般車", seat: 4, brandModel: "HONDA", wheelchairCount: 2, name: "名", uid: "G12312512", sex: "女", cellphone: "0987854666", carNumber: "N8N-6542", status: 0 }]}
                        // data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                        data={props.AllDriver.data}
                        clickPage={(currentPage, pageSize) => {
                        }}
                    />
                </BasicContainer>

            </MainPageContainer>
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`