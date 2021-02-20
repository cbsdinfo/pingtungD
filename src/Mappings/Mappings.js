import React from 'react';
import { Login } from '../Pages/Login/Login';
import { Error404 } from '../Pages/Error404/Error404';

import { ReactComponent as BarChartSvg } from '../Assets/img/BackstageLeftSideMenuBar/BarChart.svg'
import { ReactComponent as MessageSvg } from '../Assets/img/BackstageLeftSideMenuBar/Message.svg'
import { ReactComponent as ToolSvg } from '../Assets/img/BackstageLeftSideMenuBar/Tool.svg'
import { ReactComponent as CarSvg } from '../Assets/img/BackstageLeftSideMenuBar/Car.svg'
import { ReactComponent as ConsoleSvg } from '../Assets/img/BackstageLeftSideMenuBar/Console.svg'
import { ReactComponent as CaseSvg } from '../Assets/img/BackstageLeftSideMenuBar/Case.svg'
import { ReactComponent as DriverAndCarSvg } from '../Assets/img/BackstageLeftSideMenuBar/DriverAndCar.svg'
import { ReactComponent as OrderSvg } from '../Assets/img/BackstageLeftSideMenuBar/Order.svg'
import { ReactComponent as RouteAndStopSvg } from '../Assets/img/BackstageLeftSideMenuBar/RouteAndStop.svg'
import { ReactComponent as ContactSvg } from '../Assets/img/BackstageLeftSideMenuBar/Contact.svg'

import { TodayTask } from '../Pages/TodayTask/TodayTask';
import { PerDespatch } from '../Pages/PerDespatch/PerDespatch';
import { HitCard } from '../Pages/HitCard/HitCard';
import { TaskHistory } from '../Pages/TaskHistory/TaskHistory';
import { Income } from '../Pages/Income/Income';
import { Contact } from '../Pages/Contact/Contact';
import { School } from '../Pages/School/School';
import { DayCheck } from '../Pages/DayCheck/DayCheck';

//#region 快速叫車
// import { FastCallCar } from '../Pages/FastCallCar/FastCallCar';
// import { AddFastCallCar } from '../Pages/FastCallCar/AddFastCallCar/AddFastCallCar';
// import { EditFastCallCar } from '../Pages/FastCallCar/EditFastCallCar/EditFastCallCar';
//#endregion

//#region 
export const urlMapping = {

   // "/FastCallCar": <FastCallCar />,// 快速叫車
   // "/FastCallCar/Add": <AddFastCallCar />,// 新增常用路線
   // "/FastCallCar/Edit": <EditFastCallCar />,// 編輯常用路線

   // 忘記密碼 ForgetPass
   "/TodayTask": <TodayTask />, // 今日任務
   "/PerDespatch": <PerDespatch />, // 今日任務單張調度單
   "/HitCard": <HitCard />, // 打卡
   "/TaskHistory": <TaskHistory />, // 任務歷程
   "/Income": <Income />, // 收入列表
   "/Contact": <Contact />, // 聯繫行控
   "/School": <School />, // 司機學院
   "/DayCheck": <DayCheck />, // 每日檢查

   "/Login": < Login />,// 登入畫面
   "/404": <Error404 />,// 404錯誤畫面
}
//#endregion

//#region 
export const pageTabBarUrlMapping = {
   //#region 非OpenAuth路由

   //#region 系統資料管理
   "/Base/FareSubsidyParam": "補助車資參數",// 系統資料管理/補助車資參數
   "/Base/CarAndDriverSetting": "司機車輛設定",// 系統資料管理/司機車輛設定
   "/Base/OperatingUnitSetting": "營運單位設定",// 系統資料管理/營運單位設定
   "/Base/MedicalOrgManager": "醫療院所管理",// 系統資料管理/醫療院所管理
   "/Base/RoleManager": "權限管理",// 系統資料管理/權限管理
   "/Base/OrgManager": "單位管理",// 系統資料管理/單位管理
   "/Base/UserManager": "系統管理員設定",// 系統資料管理/系統管理員設定
   //#endregion

   //#region 派車調度
   "/Dispatch/OrderSearch": "調度單搜尋",// 派車調度/調度單搜尋
   "/Dispatch/DragConsole": "拖拉式調度台",// 派車調度/拖拉式調度台
   "/Dispatch/TableConsole": "表格式調度台",// 派車調度/表格式調度台
   "/Dispatch/WhiteConsole": "白牌車調度台",// 派車調度/白牌車調度台
   "/Dispatch/BusConsole": "幸福巴士調度台",// 派車調度/幸福巴士調度台
   //#endregion

   //#region 報表管理
   "/Report/PickUpData": "接送數據",// 報表管理/接送數據
   "/Report/Revenue": "營收報表",// 報表管理/營收報表
   "/Report/CarUsed": "車輛使用狀況",// 報表管理/車輛使用狀況
   "/Report/CarAreaRate": "車輛使用區域比例",// 報表管理/車輛使用區域比例
   "/Report/ServiceMonthlyReport": "服務使用區域月報表",// 報表管理/服務使用區域月報表
   "/Report/ProblemSheet": "系統操作問題單",// 報表管理/系統操作問題單
   "/Report/ExportReport": "匯出報表",// 報表管理/匯出報表
   //#endregion

   //#region 常見問題
   "/QAndA": "常見問題",// 常見問題
   //#endregion

   //#region 預約訂單
   //#region 白牌
   "/Order/WhiteOrder": "白牌車訂單",// 預約訂單/白牌車訂單
   //#endregion
   //#region 幸福巴士
   "/Order/BusOrder": "幸福巴士訂單",// 預約訂單/幸福巴士訂單
   //#endregion
   //#region 長照
   "/Order/CaseOrder": "長照訂單",// 預約訂單/長照訂單
   //#endregion
   //#region 日照
   "/Order/DayCareOrder": "日照訂單",// 預約訂單/日照訂單
   //#endregion
   //#region 偏鄉運能不足
   "/Order/RuralOrder": "偏鄉運能不足訂單",// 預約訂單/偏鄉運能不足訂單
   //#endregion
   //#endregion

   //#region 用戶資料
   "/Case": "用戶資料",// 用戶資料
   //#endregion

   //#region  路線及站牌管理
   "/BusRouteAndStop/BusRoute": "路線管理", // 路線及站牌管理/路線管理
   "/BusRouteAndStop/BusStop": "站牌管理", // 路線及站牌管理/站牌管理
   //#endregion

   //#region 司機車輛管理
   "/DriverAndCar/Drivers": "司機資料", // 司機車輛管理/司機資料
   "/DriverAndCar/Cars": "車輛資料", // 司機車輛管理/車輛資料
   "/DriverAndCar/CarFixedRecord": "車輛保養紀錄", // 司機車輛管理/車輛保養紀錄
   //#endregion

   //#region 其他
   "/": "歡迎頁",// 歡迎頁
   //"/404": "無此頁面",// 404錯誤畫面
   //#endregion

   //#endregion

   //#region openAuth 路由
   //#region 流程中心
   "/Flowinstances/Disposed": "已處理流程",// 流程中心/已處理流程
   "/Flowinstances/Wait": "待處理流程",// 流程中心/待處理流程
   "/FlowInstances/MyFlow": "我的流程",// 流程中心/我的流程
   //#endregion
   //#region 倉儲中心
   "/Warehouse/InboundOrder": "入庫訂單",// 倉儲中心/入庫訂單
   //#endregion
   //#region 基礎配置
   "/FlowSchemes/Index": "流程設計",// 基礎配置/流程設計
   "/OrgManager/Index": "部門管理",// 基礎配置/部門管理
   "/TimingJobs/Index": "定時任務",// 基礎配置/定時任務
   "/FormDesign/Index": "表單設計",// 基礎配置/表單設計
   "/DataPermission/Index": "數據權限",// 基礎配置/數據權限
   "/Categories/Index": "字典分類",// 基礎配置/字典分類
   "/ModuleManager/Index": "模塊管理",// 基礎配置/模塊管理 /Base/ModuleManager
   "/RoleManager/Index": "角色管理",// 基礎配置/角色管理
   "/ResourcesManager/Index": "資源管理",// 基礎配置/資源管理
   "/UserManager/Index": "用戶管理",// 基礎配置/用戶管理
   //#endregion 
   //#region 預約訂單
   "/Order/WeeklyOrder": "本週任務",// 預約訂單/本週任務
   "/Order/AllOrder": "全部資料",// 預約訂單/全部資料
   "/Order/YearOrder": "今年任務",// 預約訂單/今年任務
   "/Order/TodayOrder": "本日任務",// 預約訂單/本日任務
   "/Order/MonthlyOrder": "本月任務",// 預約訂單/本月任務
   //#endregion 
   //#region 消息日誌
   "/Log/SysLogs": "系統日誌",// 消息日誌/系統日誌
   "/Log/SysMessages": "我的消息",// 消息日誌/我的消息
   //#endregion 
   //#endregion

}
//#endregion

//#region 
export const pageTextUrlMapping = {
   //#region 非OpenAuth路由

   //#region 系統資料管理
   "/Base/FareSubsidyParam": "系統資料管理/補助車資參數",// 系統資料管理/補助車資參數
   "/Base/CarAndDriverSetting": "系統資料管理/司機車輛設定",// 系統資料管理/司機車輛設定
   "/Base/OperatingUnitSetting": "系統資料管理/營運單位設定",// 系統資料管理/營運單位設定
   "/Base/MedicalOrgManager": "系統資料管理/醫療院所管理",// 系統資料管理/醫療院所管理
   "/Base/RoleManager": "系統資料管理/權限管理",// 系統資料管理/權限管理
   "/Base/OrgManager": "系統資料管理/單位管理",// 系統資料管理/單位管理
   "/Base/UserManager": "系統資料管理/系統管理員設定",// 系統資料管理/系統管理員設定
   //#endregion

   //#region 派車調度
   "/Dispatch/OrderSearch": "派車調度/調度單搜尋",// 派車調度/調度單搜尋
   "/Dispatch/DragConsole": "派車調度/拖拉式調度台",// 派車調度/拖拉式調度台
   "/Dispatch/TableConsole": "派車調度/表格式調度台",// 派車調度/表格式調度台
   "/Dispatch/WhiteConsole": "派車調度/白牌車調度台",// 派車調度/白牌車調度台
   "/Dispatch/BusConsole": "派車調度/幸福巴士調度台",// 派車調度/幸福巴士調度台
   //#endregion

   //#region 報表管理
   "/Report/PickUpData": "報表管理/接送數據",// 報表管理/接送數據
   "/Report/Revenue": "報表管理/營收報表",// 報表管理/營收報表
   "/Report/CarUsed": "報表管理/車輛使用狀況",// 報表管理/車輛使用狀況
   "/Report/CarAreaRate": "報表管理/車輛使用區域比例",// 報表管理/車輛使用區域比例
   "/Report/ServiceMonthlyReport": "報表管理/服務使用區域月報表",// 報表管理/服務使用區域月報表
   "/Report/ProblemSheet": "報表管理/系統操作問題單",// 報表管理/系統操作問題單
   "/Report/ExportReport": "報表管理/匯出報表",// 報表管理/匯出報表
   //#endregion

   //#region 常見問題
   "/QAndA": "常見問題",// 常見問題
   //#endregion

   //#region 預約訂單
   //#region 白牌
   "/Order/WhiteOrder": "預約訂單/白牌車訂單",// 預約訂單/白牌車訂單
   //#endregion
   //#region 幸福巴士
   "/Order/BusOrder": "預約訂單/幸福巴士訂單",// 預約訂單/幸福巴士訂單
   //#endregion
   //#region 長照
   "/Order/CaseOrder": "預約訂單/長照訂單",// 預約訂單/長照訂單
   //#endregion
   //#region 日照
   "/Order/DayCareOrder": "預約訂單/日照訂單",// 預約訂單/日照訂單
   //#endregion
   //#region 偏鄉運能不足
   "/Order/RuralOrder": "預約訂單/偏鄉運能不足訂單",// 預約訂單/偏鄉運能不足訂單
   //#endregion
   //#endregion

   //#region 用戶資料
   "/Case": "用戶資料",// 用戶資料
   "/Case/Edit": "用戶資料",
   "/Case/Add": "用戶資料",
   "/Case/Information": "用戶資料",
   "/Case/CallCar": "用戶資料",
   //#region 巴士身份
   "/Case/BusEdit": "用戶資料",
   "/Case/BusAdd": "用戶資料",
   "/Case/BusInformation": "用戶資料",
   "/Case/BusCallCar": "用戶資料",
   //#endregion
   //#region 偏鄉身份
   "/Case/RuralEdit": "用戶資料",
   "/Case/RuralAdd": "用戶資料",
   "/Case/RuralInformation": "用戶資料",
   "/Case/RuralCallCar": "用戶資料",
   //#endregion
   //#region 白牌身份
   "/Case/WhiteEdit": "用戶資料",
   "/Case/WhiteAdd": "用戶資料",
   "/Case/WhiteInformation": "用戶資料",
   "/Case/WhiteCallCar": "用戶資料",
   //#endregion
   //#region 日照身份
   "/Case/DayCareEdit": "用戶資料",
   "/Case/DayCareAdd": "用戶資料",
   "/Case/DayCareInformation": "用戶資料",
   //#endregion
   //#endregion

   //#region  路線及站牌管理
   "/BusRouteAndStop/BusRoute": "路線及站牌管理/路線管理", // 路線及站牌管理/路線管理
   "/BusRouteAndStop/BusRoute/Add": "路線及站牌管理/路線管理",
   "/BusRouteAndStop/BusRoute/Edit": "路線及站牌管理/路線管理",
   "/BusRouteAndStop/BusStop": "路線及站牌管理/站牌管理", // 路線及站牌管理/站牌管理
   "/BusRouteAndStop/BusStop/Add": "路線及站牌管理/站牌管理",
   "/BusRouteAndStop/BusStop/Edit": "路線及站牌管理/站牌管理",
   //#endregion

   //#region 司機車輛管理
   "/DriverAndCar/Drivers": "司機車輛管理/司機資料", // 司機車輛管理/司機資料
   "/DriverAndCar/Drivers/Add": "司機車輛管理/司機資料",
   "/DriverAndCar/Drivers/Edit": "司機車輛管理/司機資料",
   "/DriverAndCar/Drivers/Information": "司機車輛管理/司機資料",
   "/DriverAndCar/Cars": "司機車輛管理/車輛資料", // 司機車輛管理/司機資料
   "/DriverAndCar/Cars/Add": "司機車輛管理/車輛資料",
   "/DriverAndCar/Cars/Edit": "司機車輛管理/車輛資料",
   "/DriverAndCar/Cars/Information": "司機車輛管理/車輛資料",
   "/DriverAndCar/CarFixedRecord": "車輛保養紀錄", // 司機車輛管理/車輛保養紀錄
   //#endregion

   //#region 其他
   "/": "歡迎頁",// 歡迎頁
   "/404": "無此頁面",// 404錯誤畫面
   //#endregion

   //#endregion

   //#region openAuth 路由
   //#region 流程中心
   "/Flowinstances/Disposed": "流程中心/已處理流程",// 流程中心/已處理流程
   "/Flowinstances/Wait": "流程中心/待處理流程",// 流程中心/待處理流程
   "/FlowInstances/MyFlow": "流程中心/我的流程",// 流程中心/我的流程
   //#endregion
   //#region 倉儲中心
   "/Warehouse/InboundOrder": "倉儲中心/入庫訂單",// 倉儲中心/入庫訂單
   //#endregion
   //#region 基礎配置
   "/FlowSchemes/Index": "基礎配置/流程設計",// 基礎配置/流程設計
   "/OrgManager/Index": "基礎配置/部門管理",// 基礎配置/部門管理
   "/TimingJobs/Index": "基礎配置/定時任務",// 基礎配置/定時任務
   "/FormDesign/Index": "基礎配置/表單設計",// 基礎配置/表單設計
   "/DataPermission/Index": "基礎配置/數據權限",// 基礎配置/數據權限
   "/Categories/Index": "基礎配置/字典分類",// 基礎配置/字典分類
   "/ModuleManager/Index": "基礎配置/模塊管理",// 基礎配置/模塊管理 /Base/ModuleManager
   "/RoleManager/Index": "基礎配置/角色管理",// 基礎配置/角色管理
   "/ResourcesManager/Index": "基礎配置/資源管理",// 基礎配置/資源管理
   "/UserManager/Index": "基礎配置/用戶管理",// 基礎配置/用戶管理
   //#endregion 
   //#region 預約訂單
   "/Order/WeeklyOrder": "預約訂單/本週任務",// 預約訂單/本週任務
   "/Order/AllOrder": "預約訂單/全部資料",// 預約訂單/全部資料
   "/Order/YearOrder": "預約訂單/今年任務",// 預約訂單/今年任務
   "/Order/TodayOrder": "預約訂單/本日任務",// 預約訂單/本日任務
   "/Order/MonthlyOrder": "預約訂單/本月任務",// 預約訂單/本月任務
   //#endregion 
   //#region 消息日誌
   "/Log/SysLogs": "消息日誌/系統日誌",// 消息日誌/系統日誌
   "/Log/SysMessages": "消息日誌/我的消息",// 消息日誌/我的消息
   //#endregion 
   //#endregion 

}
//#endregion

//#region 左側欄 icon 的映射關係
export const iconMap = {
   "系統資料管理": (style, props) => <ToolSvg style={style} {...props} />,
   "派車調度": (style, props) => <CarSvg style={style} {...props} />,
   "報表管理": (style, props) => <BarChartSvg style={style} {...props} />,
   "常見問題": (style, props) => <MessageSvg style={style} {...props} />,
   "控制台": (style, props) => <ConsoleSvg style={style} {...props} />,
   "用戶資料": (style, props) => <CaseSvg style={style} {...props} />,
   "司機車輛管理": (style, props) => <DriverAndCarSvg style={style} {...props} />,
   "預約訂單": (style, props) => <OrderSvg style={style} {...props} />,
   "路線及站牌管理": (style, props) => <RouteAndStopSvg style={style} {...props} />,
   "聯繫客服": (style, props) => <ContactSvg style={style} {...props} />,
}
//#endregion

//#region 專案內 下拉選單直

//#region 所有的用戶身份 (用在 "請選擇用戶身份" 的下拉選單) 的映射關係
export const allCaseListMapping = {
   "caseuser": "長照",
   "日照個案": "日照個案",
   "偏鄉運能不足": "偏鄉運能不足", // 未確定
   "selfpayuser": "共享車隊",
   "5": "噗噗共乘",
   "bususer": "巴士",
   "7": "DRTS"
}
//#endregion

//#region 所有的用戶身份 (用在 "請選擇用戶身份" 的下拉選單) 的下拉選項
export const allCaseListSelectOption = [
   { value: "caseuser", label: "長照個案" },
   { value: "daycare", label: "日照個案" },
   { value: "countrySide", label: "偏鄉運能不足" },
   { value: "selfpayuser", label: "白牌車" },
   { value: "5", label: "噗噗共乘" },
   { value: "bususer", label: "幸福巴士" },
   { value: "7", label: "DRTS" }
]
//#endregion

//#region 新增身份彈窗 個案身份 的映射關係
export const caseListMapping = {
   "caseuser": "長照",
   "daycare": "日照",
   "countrySide": "偏鄉運能不足", // 未確定
   "selfpayuser": "白牌",
   "bususer": "幸福巴士",
}
//#endregion

//#region 新增身份彈窗 的下拉選項
export const caseListSelectOption = [
   { value: "caseuser", label: "長照" },
   { value: "daycare", label: "日照" },
   { value: "countrySide", label: "偏鄉運能不足" }, // 未確定
   { value: "selfpayuser", label: "白牌" },
   { value: "bususer", label: "幸福巴士" },
]
//#endregion

//#region 不可派發原因 的映射關係
export const notDistributableReasonMapping = {
   "1": "結案 - 移出",
   "2": "結案 - 失能等級不符",
   "3": "結案 - 死亡",
   "4": "結案 - 其他",
}
//#endregion

//#region 不可派發原因 的下拉選項
export const notDistributableReasonSelectOption = [
   { value: '1', label: '結案 - 移出' },
   { value: '2', label: '結案 - 失能等級不符' },
   { value: '3', label: '結案 - 死亡' },
   { value: '4', label: '結案 - 其他' },
]
//#endregion

//#region 社會福利身份 的映射關係
export const boonTypeMapping = {
   "0": "低收入戶", // 未確定
   "1": "中低收入戶",
   "2": "一般戶" // 未確定
}
//#endregion

//#region 社會福利身份 的下拉選項
export const boonTypeSelectOption = [
   { value: "0", label: "低收入戶" },
   { value: "1", label: "中低收入戶" },
   { value: "2", label: "一般戶" }
]
//#endregion

//#region 車輛來源 的映射關係
export const carFromMapping = {
   "0": "獎助", // 未確定
   "1": "自購",
   "2": "捐贈" // 未確定
}
//#endregion

//#region 車輛來源 的下拉選項
export const carFromSelectOption = [
   { value: "0", label: '獎助' },
   { value: "1", label: '自購' },
   { value: "2", label: '捐贈' }
]
//#endregion

//#region 失能等級 的映射關係
export const disabilityLevelMapping = {
   1: '1級(無失能)',
   2: '2級',
   3: '3級',
   4: '4級',
   5: '5級',
   6: '6級',
   7: '7級',
   8: '8級',
}
//#endregion

//#region 失能等級 的下拉選項
export const disabilityLevelSelectOption = [
   { value: 1, label: "1級(無失能)" },
   { value: 2, label: "2級" },
   { value: 3, label: "3級" },
   { value: 4, label: "4級" },
   { value: 5, label: "5級" },
   { value: 6, label: "6級" },
   { value: 7, label: "7級" },
   { value: 8, label: "8級" },
]
//#endregion

//#region 起迄點備註 的下拉選項
export const posRemarksSelectOption = [
   { value: "醫院診所", label: "醫院診所" },
   { value: "洗腎中心", label: "洗腎中心" },
   { value: "復健診所", label: "復健診所" },
   { value: "住家", label: "住家" },
   { value: "其他", label: "其他" },
]
//#endregion

//#endregion

//#region 地區與轄下區域
export const cityAndCounties = {
   //#region 臺北市
   臺北市: [
      { value: "臺北市中正區", label: "中正區" },
      { value: "臺北市大同區", label: "大同區" },
      { value: "臺北市中山區", label: "中山區" },
      { value: "臺北市萬華區", label: "萬華區" },
      { value: "臺北市信義區", label: "信義區" },
      { value: "臺北市松山區", label: "松山區" },
      { value: "臺北市大安區", label: "大安區" },
      { value: "臺北市南港區", label: "南港區" },
      { value: "臺北市北投區", label: "北投區" },
      { value: "臺北市內湖區", label: "內湖區" },
      { value: "臺北市士林區", label: "士林區" },
      { value: "臺北市文山區", label: "文山區" },
   ],
   //#endregion
   //#region 新北市
   新北市: [
      { value: "新北市板橋區", label: "板橋區" },
      { value: "新北市新莊區", label: "新莊區" },
      { value: "新北市泰山區", label: "泰山區" },
      { value: "新北市林口區", label: "林口區" },
      { value: "新北市淡水區", label: "淡水區" },
      { value: "新北市金山區", label: "金山區" },
      { value: "新北市八里區", label: "八里區" },
      { value: "新北市萬里區", label: "萬里區" },
      { value: "新北市石門區", label: "石門區" },
      { value: "新北市三芝區", label: "三芝區" },
      { value: "新北市瑞芳區", label: "瑞芳區" },
      { value: "新北市汐止區", label: "汐止區" },
      { value: "新北市平溪區", label: "平溪區" },
      { value: "新北市貢寮區", label: "貢寮區" },
      { value: "新北市雙溪區", label: "雙溪區" },
      { value: "新北市深坑區", label: "深坑區" },
      { value: "新北市石碇區", label: "石碇區" },
      { value: "新北市新店區", label: "新店區" },
      { value: "新北市坪林區", label: "坪林區" },
      { value: "新北市烏來區", label: "烏來區" },
      { value: "新北市中和區", label: "中和區" },
      { value: "新北市永和區", label: "永和區" },
      { value: "新北市土城區", label: "土城區" },
      { value: "新北市三峽區", label: "三峽區" },
      { value: "新北市樹林區", label: "樹林區" },
      { value: "新北市鶯歌區", label: "鶯歌區" },
      { value: "新北市三重區", label: "三重區" },
      { value: "新北市蘆洲區", label: "蘆洲區" },
      { value: "新北市五股區", label: "五股區" },
   ],
   //#endregion
   //#region 基隆市
   基隆市: [
      { value: "基隆市仁愛區", label: "仁愛區" },
      { value: "基隆市中正區", label: "中正區" },
      { value: "基隆市信義區", label: "信義區" },
      { value: "基隆市中山區", label: "中山區" },
      { value: "基隆市安樂區", label: "安樂區" },
      { value: "基隆市暖暖區", label: "暖暖區" },
      { value: "基隆市七堵區", label: "七堵區" },
   ],
   //#endregion
   //#region 桃園市
   桃園市: [
      { value: "桃園市桃園區", label: "桃園區" },
      { value: "桃園市中壢區", label: "中壢區" },
      { value: "桃園市平鎮區", label: "平鎮區" },
      { value: "桃園市八德區", label: "八德區" },
      { value: "桃園市楊梅區", label: "楊梅區" },
      { value: "桃園市蘆竹區", label: "蘆竹區" },
      { value: "桃園市龜山區", label: "龜山區" },
      { value: "桃園市龍潭區", label: "龍潭區" },
      { value: "桃園市大溪區", label: "大溪區" },
      { value: "桃園市大園區", label: "大園區" },
      { value: "桃園市觀音區", label: "觀音區" },
      { value: "桃園市新屋區", label: "新屋區" },
      { value: "桃園市復興區", label: "復興區" },
   ],
   //#endregion
   //#region 新竹縣
   新竹縣: [
      { value: "新竹縣竹北市", label: "竹北市" },
      { value: "新竹縣竹東鎮", label: "竹東鎮" },
      { value: "新竹縣新埔鎮", label: "新埔鎮" },
      { value: "新竹縣關西鎮", label: "關西鎮" },
      { value: "新竹縣峨眉鄉", label: "峨眉鄉" },
      { value: "新竹縣寶山鄉", label: "寶山鄉" },
      { value: "新竹縣北埔鄉", label: "北埔鄉" },
      { value: "新竹縣橫山鄉", label: "橫山鄉" },
      { value: "新竹縣芎林鄉", label: "芎林鄉" },
      { value: "新竹縣湖口鄉", label: "湖口鄉" },
      { value: "新竹縣新豐鄉", label: "新豐鄉" },
      { value: "新竹縣尖石鄉", label: "尖石鄉" },
      { value: "新竹縣五峰鄉", label: "五峰鄉" },
   ],
   //#endregion
   //#region 新竹市
   新竹市: [
      { value: "新竹市東區", label: "東區" },
      { value: "新竹市北區", label: "北區" },
      { value: "新竹市香山區", label: "香山區" },
   ],
   //#endregion
   //#region 苗栗縣
   苗栗縣: [
      { value: "苗栗縣苗栗市", label: "苗栗市" },
      { value: "苗栗縣通霄鎮", label: "通霄鎮" },
      { value: "苗栗縣苑裡鎮", label: "苑裡鎮" },
      { value: "苗栗縣竹南鎮", label: "竹南鎮" },
      { value: "苗栗縣頭份鎮", label: "頭份鎮" },
      { value: "苗栗縣後龍鎮", label: "後龍鎮" },
      { value: "苗栗縣卓蘭鎮", label: "卓蘭鎮" },
      { value: "苗栗縣西湖鄉", label: "西湖鄉" },
      { value: "苗栗縣頭屋鄉", label: "頭屋鄉" },
      { value: "苗栗縣公館鄉", label: "公館鄉" },
      { value: "苗栗縣銅鑼鄉", label: "銅鑼鄉" },
      { value: "苗栗縣三義鄉", label: "三義鄉" },
      { value: "苗栗縣造橋鄉", label: "造橋鄉" },
      { value: "苗栗縣三灣鄉", label: "三灣鄉" },
      { value: "苗栗縣南庄鄉", label: "南庄鄉" },
      { value: "苗栗縣大湖鄉", label: "大湖鄉" },
      { value: "苗栗縣獅潭鄉", label: "獅潭鄉" },
      { value: "苗栗縣泰安鄉", label: "泰安鄉" },
   ],
   //#endregion
   //#region 臺中市
   臺中市: [
      { value: "臺中市中區", label: "中區" },
      { value: "臺中市東區", label: "東區" },
      { value: "臺中市南區", label: "南區" },
      { value: "臺中市西區", label: "西區" },
      { value: "臺中市北區", label: "北區" },
      { value: "臺中市北屯區", label: "北屯區" },
      { value: "臺中市西屯區", label: "西屯區" },
      { value: "臺中市南屯區", label: "南屯區" },
      { value: "臺中市太平區", label: "太平區" },
      { value: "臺中市大里區", label: "大里區" },
      { value: "臺中市霧峰區", label: "霧峰區" },
      { value: "臺中市烏日區", label: "烏日區" },
      { value: "臺中市豐原區", label: "豐原區" },
      { value: "臺中市后里區", label: "后里區" },
      { value: "臺中市東勢區", label: "東勢區" },
      { value: "臺中市石岡區", label: "石岡區" },
      { value: "臺中市新社區", label: "新社區" },
      { value: "臺中市和平區", label: "和平區" },
      { value: "臺中市神岡區", label: "神岡區" },
      { value: "臺中市潭子區", label: "潭子區" },
      { value: "臺中市大雅區", label: "大雅區" },
      { value: "臺中市大肚區", label: "大肚區" },
      { value: "臺中市龍井區", label: "龍井區" },
      { value: "臺中市沙鹿區", label: "沙鹿區" },
      { value: "臺中市梧棲區", label: "梧棲區" },
      { value: "臺中市清水區", label: "清水區" },
      { value: "臺中市大甲區", label: "大甲區" },
      { value: "臺中市外埔區", label: "外埔區" },
      { value: "臺中市大安區", label: "大安區" },
   ],
   //#endregion
   //#region 南投縣
   南投縣: [
      { value: "南投縣南投市", label: "南投市" },
      { value: "南投縣埔里鎮", label: "埔里鎮" },
      { value: "南投縣草屯鎮", label: "草屯鎮" },
      { value: "南投縣竹山鎮", label: "竹山鎮" },
      { value: "南投縣集集鎮", label: "集集鎮" },
      { value: "南投縣名間鄉", label: "名間鄉" },
      { value: "南投縣鹿谷鄉", label: "鹿谷鄉" },
      { value: "南投縣中寮鄉", label: "中寮鄉" },
      { value: "南投縣魚池鄉", label: "魚池鄉" },
      { value: "南投縣國姓鄉", label: "國姓鄉" },
      { value: "南投縣水里鄉", label: "水里鄉" },
      { value: "南投縣信義鄉", label: "信義鄉" },
      { value: "南投縣仁愛鄉", label: "仁愛鄉" },
   ],
   //#endregion
   //#region 彰化縣
   彰化縣: [
      { value: "彰化縣彰化市", label: "彰化市" },
      { value: "彰化縣員林鎮", label: "員林鎮" },
      { value: "彰化縣和美鎮", label: "和美鎮" },
      { value: "彰化縣鹿港鎮", label: "鹿港鎮" },
      { value: "彰化縣溪湖鎮", label: "溪湖鎮" },
      { value: "彰化縣二林鎮", label: "二林鎮" },
      { value: "彰化縣田中鎮", label: "田中鎮" },
      { value: "彰化縣北斗鎮", label: "北斗鎮" },
      { value: "彰化縣花壇鄉", label: "花壇鄉" },
      { value: "彰化縣芬園鄉", label: "芬園鄉" },
      { value: "彰化縣大村鄉", label: "大村鄉" },
      { value: "彰化縣永靖鄉", label: "永靖鄉" },
      { value: "彰化縣伸港鄉", label: "伸港鄉" },
      { value: "彰化縣線西鄉", label: "線西鄉" },
      { value: "彰化縣福興鄉", label: "福興鄉" },
      { value: "彰化縣秀水鄉", label: "秀水鄉" },
      { value: "彰化縣埔心鄉", label: "埔心鄉" },
      { value: "彰化縣埔鹽鄉", label: "埔鹽鄉" },
      { value: "彰化縣大城鄉", label: "大城鄉" },
      { value: "彰化縣芳苑鄉", label: "芳苑鄉" },
      { value: "彰化縣竹塘鄉", label: "竹塘鄉" },
      { value: "彰化縣社頭鄉", label: "社頭鄉" },
      { value: "彰化縣二水鄉", label: "二水鄉" },
      { value: "彰化縣田尾鄉", label: "田尾鄉" },
      { value: "彰化縣埤頭鄉", label: "埤頭鄉" },
      { value: "彰化縣溪州鄉", label: "溪州鄉" },
   ],
   //#endregion
   //#region 雲林縣
   雲林縣: [
      { value: "雲林縣斗六市", label: "斗六市" },
      { value: "雲林縣斗南鎮", label: "斗南鎮" },
      { value: "雲林縣虎尾鎮", label: "虎尾鎮" },
      { value: "雲林縣西螺鎮", label: "西螺鎮" },
      { value: "雲林縣土庫鎮", label: "土庫鎮" },
      { value: "雲林縣北港鎮", label: "北港鎮" },
      { value: "雲林縣莿桐鄉", label: "莿桐鄉" },
      { value: "雲林縣林內鄉", label: "林內鄉" },
      { value: "雲林縣古坑鄉", label: "古坑鄉" },
      { value: "雲林縣大埤鄉", label: "大埤鄉" },
      { value: "雲林縣崙背鄉", label: "崙背鄉" },
      { value: "雲林縣二崙鄉", label: "二崙鄉" },
      { value: "雲林縣麥寮鄉", label: "麥寮鄉" },
      { value: "雲林縣臺西鄉", label: "臺西鄉" },
      { value: "雲林縣東勢鄉", label: "東勢鄉" },
      { value: "雲林縣褒忠鄉", label: "褒忠鄉" },
      { value: "雲林縣四湖鄉", label: "四湖鄉" },
      { value: "雲林縣口湖鄉", label: "口湖鄉" },
      { value: "雲林縣水林鄉", label: "水林鄉" },
      { value: "雲林縣元長鄉", label: "元長鄉" },
   ],
   //#endregion
   //#region 嘉義縣
   嘉義縣: [
      { value: "嘉義縣太保市", label: "太保市" },
      { value: "嘉義縣朴子市", label: "朴子市" },
      { value: "嘉義縣布袋鎮", label: "布袋鎮" },
      { value: "嘉義縣大林鎮", label: "大林鎮" },
      { value: "嘉義縣民雄鄉", label: "民雄鄉" },
      { value: "嘉義縣溪口鄉", label: "溪口鄉" },
      { value: "嘉義縣新港鄉", label: "新港鄉" },
      { value: "嘉義縣六腳鄉", label: "六腳鄉" },
      { value: "嘉義縣東石鄉", label: "東石鄉" },
      { value: "嘉義縣義竹鄉", label: "義竹鄉" },
      { value: "嘉義縣鹿草鄉", label: "鹿草鄉" },
      { value: "嘉義縣水上鄉", label: "水上鄉" },
      { value: "嘉義縣中埔鄉", label: "中埔鄉" },
      { value: "嘉義縣竹崎鄉", label: "竹崎鄉" },
      { value: "嘉義縣梅山鄉", label: "梅山鄉" },
      { value: "嘉義縣番路鄉", label: "番路鄉" },
      { value: "嘉義縣大埔鄉", label: "大埔鄉" },
      { value: "嘉義縣阿里山鄉", label: "阿里山鄉" },
   ],
   //#endregion
   //#region 嘉義市
   嘉義市: [
      { value: "嘉義市東區", label: "東區" },
      { value: "嘉義市西區", label: "西區" },
   ],
   //#endregion
   //#region 臺南市
   臺南市: [
      { value: "臺南市中西區", label: "中西區" },
      { value: "臺南市東區", label: "東區" },
      { value: "臺南市南區", label: "南區" },
      { value: "臺南市北區", label: "北區" },
      { value: "臺南市安平區", label: "安平區" },
      { value: "臺南市安南區", label: "安南區" },
      { value: "臺南市永康區", label: "永康區" },
      { value: "臺南市歸仁區", label: "歸仁區" },
      { value: "臺南市新化區", label: "新化區" },
      { value: "臺南市左鎮區", label: "左鎮區" },
      { value: "臺南市玉井區", label: "玉井區" },
      { value: "臺南市楠西區", label: "楠西區" },
      { value: "臺南市南化區", label: "南化區" },
      { value: "臺南市仁德區", label: "仁德區" },
      { value: "臺南市關廟區", label: "關廟區" },
      { value: "臺南市龍崎區", label: "龍崎區" },
      { value: "臺南市官田區", label: "官田區" },
      { value: "臺南市麻豆區", label: "麻豆區" },
      { value: "臺南市佳里區", label: "佳里區" },
      { value: "臺南市西港區", label: "西港區" },
      { value: "臺南市七股區", label: "七股區" },
      { value: "臺南市將軍區", label: "將軍區" },
      { value: "臺南市學甲區", label: "學甲區" },
      { value: "臺南市北門區", label: "北門區" },
      { value: "臺南市新營區", label: "新營區" },
      { value: "臺南市後壁區", label: "後壁區" },
      { value: "臺南市白河區", label: "白河區" },
      { value: "臺南市東山區", label: "東山區" },
      { value: "臺南市六甲區", label: "六甲區" },
      { value: "臺南市下營區", label: "下營區" },
      { value: "臺南市柳營區", label: "柳營區" },
      { value: "臺南市鹽水區", label: "鹽水區" },
      { value: "臺南市善化區", label: "善化區" },
      { value: "臺南市大內區", label: "大內區" },
      { value: "臺南市山上區", label: "山上區" },
      { value: "臺南市新市區", label: "新市區" },
      { value: "臺南市安定區", label: "安定區" },
   ],
   //#endregion
   //#region 高雄市
   高雄市: [
      { value: "高雄市楠梓區", label: "楠梓區" },
      { value: "高雄市左營區", label: "左營區" },
      { value: "高雄市鼓山區", label: "鼓山區" },
      { value: "高雄市三民區", label: "三民區" },
      { value: "高雄市鹽埕區", label: "鹽埕區" },
      { value: "高雄市前金區", label: "前金區" },
      { value: "高雄市新興區", label: "新興區" },
      { value: "高雄市苓雅區", label: "苓雅區" },
      { value: "高雄市前鎮區", label: "前鎮區" },
      { value: "高雄市小港區", label: "小港區" },
      { value: "高雄市旗津區", label: "旗津區" },
      { value: "高雄市鳳山區", label: "鳳山區" },
      { value: "高雄市大寮區", label: "大寮區" },
      { value: "高雄市鳥松區", label: "鳥松區" },
      { value: "高雄市林園區", label: "林園區" },
      { value: "高雄市仁武區", label: "仁武區" },
      { value: "高雄市大樹區", label: "大樹區" },
      { value: "高雄市大社區", label: "大社區" },
      { value: "高雄市岡山區", label: "岡山區" },
      { value: "高雄市路竹區", label: "路竹區" },
      { value: "高雄市橋頭區", label: "橋頭區" },
      { value: "高雄市梓官區", label: "梓官區" },
      { value: "高雄市彌陀區", label: "彌陀區" },
      { value: "高雄市永安區", label: "永安區" },
      { value: "高雄市燕巢區", label: "燕巢區" },
      { value: "高雄市田寮區", label: "田寮區" },
      { value: "高雄市阿蓮區", label: "阿蓮區" },
      { value: "高雄市茄萣區", label: "茄萣區" },
      { value: "高雄市湖內區", label: "湖內區" },
      { value: "高雄市旗山區", label: "旗山區" },
      { value: "高雄市美濃區", label: "美濃區" },
      { value: "高雄市內門區", label: "內門區" },
      { value: "高雄市杉林區", label: "杉林區" },
      { value: "高雄市甲仙區", label: "甲仙區" },
      { value: "高雄市六龜區", label: "六龜區" },
      { value: "高雄市茂林區", label: "茂林區" },
      { value: "高雄市桃源區", label: "桃源區" },
      { value: "高雄市那瑪夏區", label: "那瑪夏區" }
   ],
   //#endregion
   //#region 屏東縣
   屏東縣: [
      { value: "屏東縣屏東市", label: "屏東市" },
      { value: "屏東縣潮州鎮", label: "潮州鎮" },
      { value: "屏東縣東港鎮", label: "東港鎮" },
      { value: "屏東縣恆春鎮", label: "恆春鎮" },
      { value: "屏東縣萬丹鄉", label: "萬丹鄉" },
      { value: "屏東縣長治鄉", label: "長治鄉" },
      { value: "屏東縣麟洛鄉", label: "麟洛鄉" },
      { value: "屏東縣九如鄉", label: "九如鄉" },
      { value: "屏東縣里港鄉", label: "里港鄉" },
      { value: "屏東縣鹽埔鄉", label: "鹽埔鄉" },
      { value: "屏東縣高樹鄉", label: "高樹鄉" },
      { value: "屏東縣萬巒鄉", label: "萬巒鄉" },
      { value: "屏東縣內埔鄉", label: "內埔鄉" },
      { value: "屏東縣竹田鄉", label: "竹田鄉" },
      { value: "屏東縣新埤鄉", label: "新埤鄉" },
      { value: "屏東縣枋寮鄉", label: "枋寮鄉" },
      { value: "屏東縣新園鄉", label: "新園鄉" },
      { value: "屏東縣崁頂鄉", label: "崁頂鄉" },
      { value: "屏東縣林邊鄉", label: "林邊鄉" },
      { value: "屏東縣南州鄉", label: "南州鄉" },
      { value: "屏東縣佳冬鄉", label: "佳冬鄉" },
      { value: "屏東縣琉球鄉", label: "琉球鄉" },
      { value: "屏東縣車城鄉", label: "車城鄉" },
      { value: "屏東縣滿州鄉", label: "滿州鄉" },
      { value: "屏東縣枋山鄉", label: "枋山鄉" },
      { value: "屏東縣霧台鄉", label: "霧台鄉" },
      { value: "屏東縣瑪家鄉", label: "瑪家鄉" },
      { value: "屏東縣泰武鄉", label: "泰武鄉" },
      { value: "屏東縣來義鄉", label: "來義鄉" },
      { value: "屏東縣春日鄉", label: "春日鄉" },
      { value: "屏東縣獅子鄉", label: "獅子鄉" },
      { value: "屏東縣牡丹鄉", label: "牡丹鄉" },
      { value: "屏東縣三地門鄉", label: "三地門鄉" },
   ],
   //#endregion
   //#region 宜蘭縣
   宜蘭縣: [
      { value: "宜蘭縣宜蘭市", label: "宜蘭市" },
      { value: "宜蘭縣羅東鎮", label: "羅東鎮" },
      { value: "宜蘭縣蘇澳鎮", label: "蘇澳鎮" },
      { value: "宜蘭縣頭城鎮", label: "頭城鎮" },
      { value: "宜蘭縣礁溪鄉", label: "礁溪鄉" },
      { value: "宜蘭縣壯圍鄉", label: "壯圍鄉" },
      { value: "宜蘭縣員山鄉", label: "員山鄉" },
      { value: "宜蘭縣冬山鄉", label: "冬山鄉" },
      { value: "宜蘭縣五結鄉", label: "五結鄉" },
      { value: "宜蘭縣三星鄉", label: "三星鄉" },
      { value: "宜蘭縣大同鄉", label: "大同鄉" },
      { value: "宜蘭縣南澳鄉", label: "南澳鄉" },
   ],
   //#endregion
   //#region 花蓮縣
   花蓮縣: [
      { value: "花蓮縣花蓮市", label: "花蓮市" },
      { value: "花蓮縣鳳林鎮", label: "鳳林鎮" },
      { value: "花蓮縣玉里鎮", label: "玉里鎮" },
      { value: "花蓮縣新城鄉", label: "新城鄉" },
      { value: "花蓮縣吉安鄉", label: "吉安鄉" },
      { value: "花蓮縣壽豐鄉", label: "壽豐鄉" },
      { value: "花蓮縣秀林鄉", label: "秀林鄉" },
      { value: "花蓮縣光復鄉", label: "光復鄉" },
      { value: "花蓮縣豐濱鄉", label: "豐濱鄉" },
      { value: "花蓮縣瑞穗鄉", label: "瑞穗鄉" },
      { value: "花蓮縣萬榮鄉", label: "萬榮鄉" },
      { value: "花蓮縣富里鄉", label: "富里鄉" },
      { value: "花蓮縣卓溪鄉", label: "卓溪鄉" },
   ],
   //#endregion
   //#region 臺東縣
   臺東縣: [
      { value: "臺東縣臺東市", label: "臺東市" },
      { value: "臺東縣成功鎮", label: "成功鎮" },
      { value: "臺東縣關山鎮", label: "關山鎮" },
      { value: "臺東縣長濱鄉", label: "長濱鄉" },
      { value: "臺東縣海端鄉", label: "海端鄉" },
      { value: "臺東縣池上鄉", label: "池上鄉" },
      { value: "臺東縣東河鄉", label: "東河鄉" },
      { value: "臺東縣鹿野鄉", label: "鹿野鄉" },
      { value: "臺東縣延平鄉", label: "延平鄉" },
      { value: "臺東縣卑南鄉", label: "卑南鄉" },
      { value: "臺東縣金峰鄉", label: "金峰鄉" },
      { value: "臺東縣大武鄉", label: "大武鄉" },
      { value: "臺東縣達仁鄉", label: "達仁鄉" },
      { value: "臺東縣綠島鄉", label: "綠島鄉" },
      { value: "臺東縣蘭嶼鄉", label: "蘭嶼鄉" },
      { value: "臺東縣太麻里鄉", label: "太麻里鄉" },
   ],
   //#endregion
   //#region 澎湖縣
   澎湖縣: [
      { value: "澎湖縣馬公市", label: "馬公市" },
      { value: "澎湖縣湖西鄉", label: "湖西鄉" },
      { value: "澎湖縣白沙鄉", label: "白沙鄉" },
      { value: "澎湖縣西嶼鄉", label: "西嶼鄉" },
      { value: "澎湖縣望安鄉", label: "望安鄉" },
      { value: "澎湖縣七美鄉", label: "七美鄉" },
   ],
   //#endregion
   //#region 金門縣
   金門縣: [
      { value: "金門縣金城鎮", label: "金城鎮" },
      { value: "金門縣金湖鎮", label: "金湖鎮" },
      { value: "金門縣金沙鎮", label: "金沙鎮" },
      { value: "金門縣金寧鄉", label: "金寧鄉" },
      { value: "金門縣烈嶼鄉", label: "烈嶼鄉" },
      { value: "金門縣烏坵鄉", label: "烏坵鄉" },
   ],
   //#endregion
   //#region 連江縣
   連江縣: [
      { value: "連江縣南竿鄉", label: "南竿鄉" },
      { value: "連江縣北竿鄉", label: "北竿鄉" },
      { value: "連江縣莒光鄉", label: "莒光鄉" },
      { value: "連江縣東引鄉", label: "東引鄉" },
   ]
   //#endregion
};
//#endregion

//#region 地區
export const Counties = [
   { value: "臺北市", label: "臺北市" },
   { value: "新北市", label: "新北市" },
   { value: "基隆市", label: "基隆市" },
   { value: "桃園市", label: "桃園市" },
   { value: "新竹縣", label: "新竹縣" },
   { value: "新竹市", label: "新竹市" },
   { value: "苗栗縣", label: "苗栗縣" },
   { value: "臺中市", label: "臺中市" },
   { value: "南投縣", label: "南投縣" },
   { value: "彰化縣", label: "彰化縣" },
   { value: "雲林縣", label: "雲林縣" },
   { value: "嘉義縣", label: "嘉義縣" },
   { value: "嘉義市", label: "嘉義市" },
   { value: "臺南市", label: "臺南市" },
   { value: "高雄市", label: "高雄市" },
   { value: "屏東縣", label: "屏東縣" },
   { value: "宜蘭縣", label: "宜蘭縣" },
   { value: "花蓮縣", label: "花蓮縣" },
   { value: "臺東縣", label: "臺東縣" },
   { value: "澎湖縣", label: "澎湖縣" },
   { value: "金門縣", label: "金門縣" },
   { value: "連江縣", label: "連江縣" },
];
//#endregion

//#region 15分鐘分隔時間表
export const times = [
   { value: "00:00", label: "00:00" },
   { value: "00:15", label: "00:15" },
   { value: "00:30", label: "00:30" },
   { value: "00:45", label: "00:45" },
   { value: "01:00", label: "01:00" },
   { value: "01:15", label: "01:15" },
   { value: "01:30", label: "01:30" },
   { value: "01:45", label: "01:45" },
   { value: "02:00", label: "02:00" },
   { value: "02:15", label: "02:15" },
   { value: "02:30", label: "02:30" },
   { value: "02:45", label: "02:45" },
   { value: "03:00", label: "03:00" },
   { value: "03:15", label: "03:15" },
   { value: "03:30", label: "03:30" },
   { value: "03:45", label: "03:45" },
   { value: "04:00", label: "04:00" },
   { value: "04:15", label: "04:15" },
   { value: "04:30", label: "04:30" },
   { value: "04:45", label: "04:45" },
   { value: "05:00", label: "05:00" },
   { value: "05:15", label: "05:15" },
   { value: "05:30", label: "05:30" },
   { value: "05:45", label: "05:45" },
   { value: "06:00", label: "06:00" },
   { value: "06:15", label: "06:15" },
   { value: "06:30", label: "06:30" },
   { value: "06:45", label: "06:45" },
   { value: "07:00", label: "07:00" },
   { value: "07:15", label: "07:15" },
   { value: "07:30", label: "07:30" },
   { value: "07:45", label: "07:45" },
   { value: "08:00", label: "08:00" },
   { value: "08:15", label: "08:15" },
   { value: "08:30", label: "08:30" },
   { value: "08:45", label: "08:45" },
   { value: "09:00", label: "09:00" },
   { value: "09:15", label: "09:15" },
   { value: "09:30", label: "09:30" },
   { value: "09:45", label: "09:45" },
   { value: "10:00", label: "10:00" },
   { value: "10:15", label: "10:15" },
   { value: "10:30", label: "10:30" },
   { value: "10:45", label: "10:45" },
   { value: "11:00", label: "11:00" },
   { value: "11:15", label: "11:15" },
   { value: "11:30", label: "11:30" },
   { value: "11:45", label: "11:45" },
   { value: "12:00", label: "12:00" },
   { value: "12:15", label: "12:15" },
   { value: "12:30", label: "12:30" },
   { value: "12:45", label: "12:45" },
   { value: "13:00", label: "13:00" },
   { value: "13:15", label: "13:15" },
   { value: "13:30", label: "13:30" },
   { value: "13:45", label: "13:45" },
   { value: "14:00", label: "14:00" },
   { value: "14:15", label: "14:15" },
   { value: "14:30", label: "14:30" },
   { value: "14:45", label: "14:45" },
   { value: "15:00", label: "15:00" },
   { value: "15:15", label: "15:15" },
   { value: "15:30", label: "15:30" },
   { value: "15:45", label: "15:45" },
   { value: "16:00", label: "16:00" },
   { value: "16:15", label: "16:15" },
   { value: "16:30", label: "16:30" },
   { value: "16:45", label: "16:45" },
   { value: "17:00", label: "17:00" },
   { value: "17:15", label: "17:15" },
   { value: "17:30", label: "17:30" },
   { value: "17:45", label: "17:45" },
   { value: "18:00", label: "18:00" },
   { value: "18:15", label: "18:15" },
   { value: "18:30", label: "18:30" },
   { value: "18:45", label: "18:45" },
   { value: "19:00", label: "19:00" },
   { value: "19:15", label: "19:15" },
   { value: "19:30", label: "19:30" },
   { value: "19:45", label: "19:45" },
   { value: "20:00", label: "20:00" },
   { value: "20:15", label: "20:15" },
   { value: "20:30", label: "20:30" },
   { value: "20:45", label: "20:45" },
   { value: "21:00", label: "21:00" },
   { value: "21:15", label: "21:15" },
   { value: "21:30", label: "21:30" },
   { value: "21:45", label: "21:45" },
   { value: "22:00", label: "22:00" },
   { value: "22:15", label: "22:15" },
   { value: "22:30", label: "22:30" },
   { value: "22:45", label: "22:45" },
   { value: "23:00", label: "23:00" },
   { value: "23:15", label: "23:15" },
   { value: "23:30", label: "23:30" },
   { value: "23:45", label: "23:45" },
   { value: "24:00", label: "24:00" },
]
//#endregion

//#region 10分鐘分隔時間表
export const tenMinTimes = [
   { value: "00:00", label: "00:00" },
   { value: "00:10", label: "00:10" },
   { value: "00:20", label: "00:20" },
   { value: "00:30", label: "00:30" },
   { value: "00:40", label: "00:40" },
   { value: "00:50", label: "00:50" },
   { value: "01:00", label: "01:00" },
   { value: "01:10", label: "01:10" },
   { value: "01:20", label: "01:20" },
   { value: "01:30", label: "01:30" },
   { value: "01:40", label: "01:40" },
   { value: "01:50", label: "01:50" },
   { value: "02:00", label: "02:00" },
   { value: "02:10", label: "02:10" },
   { value: "02:20", label: "02:20" },
   { value: "02:30", label: "02:30" },
   { value: "02:40", label: "02:40" },
   { value: "02:50", label: "02:50" },
   { value: "03:00", label: "03:00" },
   { value: "03:10", label: "03:10" },
   { value: "03:20", label: "03:20" },
   { value: "03:30", label: "03:30" },
   { value: "03:40", label: "03:40" },
   { value: "03:50", label: "03:50" },
   { value: "04:00", label: "04:00" },
   { value: "04:10", label: "04:10" },
   { value: "04:20", label: "04:20" },
   { value: "04:30", label: "04:30" },
   { value: "04:40", label: "04:40" },
   { value: "04:50", label: "04:50" },
   { value: "05:00", label: "05:00" },
   { value: "05:10", label: "05:10" },
   { value: "05:20", label: "05:20" },
   { value: "05:30", label: "05:30" },
   { value: "05:40", label: "05:40" },
   { value: "05:50", label: "05:50" },
   { value: "06:00", label: "06:00" },
   { value: "06:10", label: "06:10" },
   { value: "06:20", label: "06:20" },
   { value: "06:30", label: "06:30" },
   { value: "06:40", label: "06:40" },
   { value: "06:50", label: "06:50" },
   { value: "07:00", label: "07:00" },
   { value: "07:10", label: "07:10" },
   { value: "07:20", label: "07:20" },
   { value: "07:30", label: "07:30" },
   { value: "07:40", label: "07:40" },
   { value: "07:50", label: "07:50" },
   { value: "08:00", label: "08:00" },
   { value: "08:10", label: "08:10" },
   { value: "08:20", label: "08:20" },
   { value: "08:30", label: "08:30" },
   { value: "08:40", label: "08:40" },
   { value: "08:50", label: "08:50" },
   { value: "09:00", label: "09:00" },
   { value: "09:10", label: "09:10" },
   { value: "09:20", label: "09:20" },
   { value: "09:30", label: "09:30" },
   { value: "09:40", label: "09:40" },
   { value: "09:50", label: "09:50" },
   { value: "10:00", label: "10:00" },
   { value: "10:10", label: "10:10" },
   { value: "10:20", label: "10:20" },
   { value: "10:30", label: "10:30" },
   { value: "10:40", label: "10:40" },
   { value: "10:50", label: "10:50" },
   { value: "11:00", label: "11:00" },
   { value: "11:10", label: "11:10" },
   { value: "11:20", label: "11:20" },
   { value: "11:30", label: "11:30" },
   { value: "11:40", label: "11:40" },
   { value: "11:50", label: "11:50" },
   { value: "12:00", label: "12:00" },
   { value: "12:10", label: "12:10" },
   { value: "12:20", label: "12:20" },
   { value: "12:30", label: "12:30" },
   { value: "12:40", label: "12:40" },
   { value: "12:50", label: "12:50" },
   { value: "13:00", label: "13:00" },
   { value: "13:10", label: "13:10" },
   { value: "13:20", label: "13:20" },
   { value: "13:30", label: "13:30" },
   { value: "13:40", label: "13:40" },
   { value: "13:50", label: "13:50" },
   { value: "14:00", label: "14:00" },
   { value: "14:10", label: "14:10" },
   { value: "14:20", label: "14:20" },
   { value: "14:30", label: "14:30" },
   { value: "14:40", label: "14:40" },
   { value: "14:50", label: "14:50" },
   { value: "15:00", label: "15:00" },
   { value: "15:10", label: "15:10" },
   { value: "15:20", label: "15:20" },
   { value: "15:30", label: "15:30" },
   { value: "15:40", label: "15:40" },
   { value: "15:50", label: "15:50" },
   { value: "16:00", label: "16:00" },
   { value: "16:10", label: "16:10" },
   { value: "16:20", label: "16:20" },
   { value: "16:30", label: "16:30" },
   { value: "16:40", label: "16:40" },
   { value: "16:50", label: "16:50" },
   { value: "17:00", label: "17:00" },
   { value: "17:10", label: "17:10" },
   { value: "17:20", label: "17:20" },
   { value: "17:30", label: "17:30" },
   { value: "17:40", label: "17:40" },
   { value: "17:50", label: "17:50" },
   { value: "18:00", label: "18:00" },
   { value: "18:10", label: "18:10" },
   { value: "18:20", label: "18:20" },
   { value: "18:30", label: "18:30" },
   { value: "18:40", label: "18:40" },
   { value: "18:50", label: "18:50" },
   { value: "19:00", label: "19:00" },
   { value: "19:10", label: "19:10" },
   { value: "19:20", label: "19:20" },
   { value: "19:30", label: "19:30" },
   { value: "19:40", label: "19:40" },
   { value: "19:50", label: "19:50" },
   { value: "20:00", label: "20:00" },
   { value: "20:10", label: "20:10" },
   { value: "20:20", label: "20:20" },
   { value: "20:30", label: "20:30" },
   { value: "20:40", label: "20:40" },
   { value: "20:50", label: "20:50" },
   { value: "21:00", label: "21:00" },
   { value: "21:10", label: "21:10" },
   { value: "21:20", label: "21:20" },
   { value: "21:30", label: "21:30" },
   { value: "21:40", label: "21:40" },
   { value: "21:50", label: "21:50" },
   { value: "22:00", label: "22:00" },
   { value: "22:10", label: "22:10" },
   { value: "22:20", label: "22:20" },
   { value: "22:30", label: "22:30" },
   { value: "22:40", label: "22:40" },
   { value: "22:50", label: "22:50" },
   { value: "23:00", label: "23:00" },
   { value: "23:10", label: "23:10" },
   { value: "23:20", label: "23:20" },
   { value: "23:30", label: "23:30" },
   { value: "23:40", label: "23:40" },
   { value: "23:50", label: "23:50" },
]
//#endregion

//#region 1小時分隔時間表
export const hours = [
   { value: "00:00", label: "00:00" },
   { value: "01:00", label: "01:00" },
   { value: "02:00", label: "02:00" },
   { value: "03:00", label: "03:00" },
   { value: "04:00", label: "04:00" },
   { value: "05:00", label: "05:00" },
   { value: "06:00", label: "06:00" },
   { value: "07:00", label: "07:00" },
   { value: "08:00", label: "08:00" },
   { value: "09:00", label: "09:00" },
   { value: "10:00", label: "10:00" },
   { value: "11:00", label: "11:00" },
   { value: "12:00", label: "12:00" },
   { value: "13:00", label: "13:00" },
   { value: "14:00", label: "14:00" },
   { value: "15:00", label: "15:00" },
   { value: "16:00", label: "16:00" },
   { value: "17:00", label: "17:00" },
   { value: "18:00", label: "18:00" },
   { value: "19:00", label: "19:00" },
   { value: "20:00", label: "20:00" },
   { value: "21:00", label: "21:00" },
   { value: "22:00", label: "22:00" },
   { value: "23:00", label: "23:00" },
   { value: "24:00", label: "24:00" },
]
//#endregion

//#region 地區與轄下區域
export const cityAndCountiesLite = {
   //#region 臺北市
   "臺北市": [
      { value: "中正區", label: "中正區" },
      { value: "大同區", label: "大同區" },
      { value: "中山區", label: "中山區" },
      { value: "萬華區", label: "萬華區" },
      { value: "信義區", label: "信義區" },
      { value: "松山區", label: "松山區" },
      { value: "大安區", label: "大安區" },
      { value: "南港區", label: "南港區" },
      { value: "北投區", label: "北投區" },
      { value: "內湖區", label: "內湖區" },
      { value: "士林區", label: "士林區" },
      { value: "文山區", label: "文山區" },
   ],
   //#endregion
   //#region 新北市
   "新北市": [
      { value: "板橋區", label: "板橋區" },
      { value: "新莊區", label: "新莊區" },
      { value: "泰山區", label: "泰山區" },
      { value: "林口區", label: "林口區" },
      { value: "淡水區", label: "淡水區" },
      { value: "金山區", label: "金山區" },
      { value: "八里區", label: "八里區" },
      { value: "萬里區", label: "萬里區" },
      { value: "石門區", label: "石門區" },
      { value: "三芝區", label: "三芝區" },
      { value: "瑞芳區", label: "瑞芳區" },
      { value: "汐止區", label: "汐止區" },
      { value: "平溪區", label: "平溪區" },
      { value: "貢寮區", label: "貢寮區" },
      { value: "雙溪區", label: "雙溪區" },
      { value: "深坑區", label: "深坑區" },
      { value: "石碇區", label: "石碇區" },
      { value: "新店區", label: "新店區" },
      { value: "坪林區", label: "坪林區" },
      { value: "烏來區", label: "烏來區" },
      { value: "中和區", label: "中和區" },
      { value: "永和區", label: "永和區" },
      { value: "土城區", label: "土城區" },
      { value: "三峽區", label: "三峽區" },
      { value: "樹林區", label: "樹林區" },
      { value: "鶯歌區", label: "鶯歌區" },
      { value: "三重區", label: "三重區" },
      { value: "蘆洲區", label: "蘆洲區" },
      { value: "五股區", label: "五股區" },
   ],
   //#endregion
   //#region 基隆市
   "基隆市": [
      { value: "仁愛區", label: "仁愛區" },
      { value: "中正區", label: "中正區" },
      { value: "信義區", label: "信義區" },
      { value: "中山區", label: "中山區" },
      { value: "安樂區", label: "安樂區" },
      { value: "暖暖區", label: "暖暖區" },
      { value: "七堵區", label: "七堵區" },
   ],
   //#endregion
   //#region 桃園市
   "桃園市": [
      { value: "桃園區", label: "桃園區" },
      { value: "中壢區", label: "中壢區" },
      { value: "平鎮區", label: "平鎮區" },
      { value: "八德區", label: "八德區" },
      { value: "楊梅區", label: "楊梅區" },
      { value: "蘆竹區", label: "蘆竹區" },
      { value: "龜山區", label: "龜山區" },
      { value: "龍潭區", label: "龍潭區" },
      { value: "大溪區", label: "大溪區" },
      { value: "大園區", label: "大園區" },
      { value: "觀音區", label: "觀音區" },
      { value: "新屋區", label: "新屋區" },
      { value: "復興區", label: "復興區" },
   ],
   //#endregion
   //#region 新竹縣
   "新竹縣": [
      { value: "竹北市", label: "竹北市" },
      { value: "竹東鎮", label: "竹東鎮" },
      { value: "新埔鎮", label: "新埔鎮" },
      { value: "關西鎮", label: "關西鎮" },
      { value: "峨眉鄉", label: "峨眉鄉" },
      { value: "寶山鄉", label: "寶山鄉" },
      { value: "北埔鄉", label: "北埔鄉" },
      { value: "橫山鄉", label: "橫山鄉" },
      { value: "芎林鄉", label: "芎林鄉" },
      { value: "湖口鄉", label: "湖口鄉" },
      { value: "新豐鄉", label: "新豐鄉" },
      { value: "尖石鄉", label: "尖石鄉" },
      { value: "五峰鄉", label: "五峰鄉" },
   ],
   //#endregion
   //#region 新竹市
   "新竹市": [
      { value: "東區", label: "東區" },
      { value: "北區", label: "北區" },
      { value: "香山區", label: "香山區" },
   ],
   //#endregion
   //#region 苗栗縣
   "苗栗縣": [
      { value: "苗栗市", label: "苗栗市" },
      { value: "通霄鎮", label: "通霄鎮" },
      { value: "苑裡鎮", label: "苑裡鎮" },
      { value: "竹南鎮", label: "竹南鎮" },
      { value: "頭份鎮", label: "頭份鎮" },
      { value: "後龍鎮", label: "後龍鎮" },
      { value: "卓蘭鎮", label: "卓蘭鎮" },
      { value: "西湖鄉", label: "西湖鄉" },
      { value: "頭屋鄉", label: "頭屋鄉" },
      { value: "公館鄉", label: "公館鄉" },
      { value: "銅鑼鄉", label: "銅鑼鄉" },
      { value: "三義鄉", label: "三義鄉" },
      { value: "造橋鄉", label: "造橋鄉" },
      { value: "三灣鄉", label: "三灣鄉" },
      { value: "南庄鄉", label: "南庄鄉" },
      { value: "大湖鄉", label: "大湖鄉" },
      { value: "獅潭鄉", label: "獅潭鄉" },
      { value: "泰安鄉", label: "泰安鄉" },
   ],
   //#endregion
   //#region 臺中市
   "臺中市": [
      { value: "中區", label: "中區" },
      { value: "東區", label: "東區" },
      { value: "南區", label: "南區" },
      { value: "西區", label: "西區" },
      { value: "北區", label: "北區" },
      { value: "北屯區", label: "北屯區" },
      { value: "西屯區", label: "西屯區" },
      { value: "南屯區", label: "南屯區" },
      { value: "太平區", label: "太平區" },
      { value: "大里區", label: "大里區" },
      { value: "霧峰區", label: "霧峰區" },
      { value: "烏日區", label: "烏日區" },
      { value: "豐原區", label: "豐原區" },
      { value: "后里區", label: "后里區" },
      { value: "東勢區", label: "東勢區" },
      { value: "石岡區", label: "石岡區" },
      { value: "新社區", label: "新社區" },
      { value: "和平區", label: "和平區" },
      { value: "神岡區", label: "神岡區" },
      { value: "潭子區", label: "潭子區" },
      { value: "大雅區", label: "大雅區" },
      { value: "大肚區", label: "大肚區" },
      { value: "龍井區", label: "龍井區" },
      { value: "沙鹿區", label: "沙鹿區" },
      { value: "梧棲區", label: "梧棲區" },
      { value: "清水區", label: "清水區" },
      { value: "大甲區", label: "大甲區" },
      { value: "外埔區", label: "外埔區" },
      { value: "大安區", label: "大安區" },
   ],
   //#endregion
   //#region 南投縣
   "南投縣": [
      { value: "南投市", label: "南投市" },
      { value: "埔里鎮", label: "埔里鎮" },
      { value: "草屯鎮", label: "草屯鎮" },
      { value: "竹山鎮", label: "竹山鎮" },
      { value: "集集鎮", label: "集集鎮" },
      { value: "名間鄉", label: "名間鄉" },
      { value: "鹿谷鄉", label: "鹿谷鄉" },
      { value: "中寮鄉", label: "中寮鄉" },
      { value: "魚池鄉", label: "魚池鄉" },
      { value: "國姓鄉", label: "國姓鄉" },
      { value: "水里鄉", label: "水里鄉" },
      { value: "信義鄉", label: "信義鄉" },
      { value: "仁愛鄉", label: "仁愛鄉" },
   ],
   //#endregion
   //#region 彰化縣
   "彰化縣": [
      { value: "彰化市", label: "彰化市" },
      { value: "員林鎮", label: "員林鎮" },
      { value: "和美鎮", label: "和美鎮" },
      { value: "鹿港鎮", label: "鹿港鎮" },
      { value: "溪湖鎮", label: "溪湖鎮" },
      { value: "二林鎮", label: "二林鎮" },
      { value: "田中鎮", label: "田中鎮" },
      { value: "北斗鎮", label: "北斗鎮" },
      { value: "花壇鄉", label: "花壇鄉" },
      { value: "芬園鄉", label: "芬園鄉" },
      { value: "大村鄉", label: "大村鄉" },
      { value: "永靖鄉", label: "永靖鄉" },
      { value: "伸港鄉", label: "伸港鄉" },
      { value: "線西鄉", label: "線西鄉" },
      { value: "福興鄉", label: "福興鄉" },
      { value: "秀水鄉", label: "秀水鄉" },
      { value: "埔心鄉", label: "埔心鄉" },
      { value: "埔鹽鄉", label: "埔鹽鄉" },
      { value: "大城鄉", label: "大城鄉" },
      { value: "芳苑鄉", label: "芳苑鄉" },
      { value: "竹塘鄉", label: "竹塘鄉" },
      { value: "社頭鄉", label: "社頭鄉" },
      { value: "二水鄉", label: "二水鄉" },
      { value: "田尾鄉", label: "田尾鄉" },
      { value: "埤頭鄉", label: "埤頭鄉" },
      { value: "溪州鄉", label: "溪州鄉" },
   ],
   //#endregion
   //#region 雲林縣
   "雲林縣": [
      { value: "斗六市", label: "斗六市" },
      { value: "斗南鎮", label: "斗南鎮" },
      { value: "虎尾鎮", label: "虎尾鎮" },
      { value: "西螺鎮", label: "西螺鎮" },
      { value: "土庫鎮", label: "土庫鎮" },
      { value: "北港鎮", label: "北港鎮" },
      { value: "莿桐鄉", label: "莿桐鄉" },
      { value: "林內鄉", label: "林內鄉" },
      { value: "古坑鄉", label: "古坑鄉" },
      { value: "大埤鄉", label: "大埤鄉" },
      { value: "崙背鄉", label: "崙背鄉" },
      { value: "二崙鄉", label: "二崙鄉" },
      { value: "麥寮鄉", label: "麥寮鄉" },
      { value: "臺西鄉", label: "臺西鄉" },
      { value: "東勢鄉", label: "東勢鄉" },
      { value: "褒忠鄉", label: "褒忠鄉" },
      { value: "四湖鄉", label: "四湖鄉" },
      { value: "口湖鄉", label: "口湖鄉" },
      { value: "水林鄉", label: "水林鄉" },
      { value: "元長鄉", label: "元長鄉" },
   ],
   //#endregion
   //#region 嘉義縣
   "嘉義縣": [
      { value: "太保市", label: "太保市" },
      { value: "朴子市", label: "朴子市" },
      { value: "布袋鎮", label: "布袋鎮" },
      { value: "大林鎮", label: "大林鎮" },
      { value: "民雄鄉", label: "民雄鄉" },
      { value: "溪口鄉", label: "溪口鄉" },
      { value: "新港鄉", label: "新港鄉" },
      { value: "六腳鄉", label: "六腳鄉" },
      { value: "東石鄉", label: "東石鄉" },
      { value: "義竹鄉", label: "義竹鄉" },
      { value: "鹿草鄉", label: "鹿草鄉" },
      { value: "水上鄉", label: "水上鄉" },
      { value: "中埔鄉", label: "中埔鄉" },
      { value: "竹崎鄉", label: "竹崎鄉" },
      { value: "梅山鄉", label: "梅山鄉" },
      { value: "番路鄉", label: "番路鄉" },
      { value: "大埔鄉", label: "大埔鄉" },
      { value: "阿里山鄉", label: "阿里山鄉" },
   ],
   //#endregion
   //#region 嘉義市
   "嘉義市": [
      { value: "東區", label: "東區" },
      { value: "西區", label: "西區" },
   ],
   //#endregion
   //#region 臺南市
   "臺南市": [
      { value: "中西區", label: "中西區" },
      { value: "東區", label: "東區" },
      { value: "南區", label: "南區" },
      { value: "北區", label: "北區" },
      { value: "安平區", label: "安平區" },
      { value: "安南區", label: "安南區" },
      { value: "永康區", label: "永康區" },
      { value: "歸仁區", label: "歸仁區" },
      { value: "新化區", label: "新化區" },
      { value: "左鎮區", label: "左鎮區" },
      { value: "玉井區", label: "玉井區" },
      { value: "楠西區", label: "楠西區" },
      { value: "南化區", label: "南化區" },
      { value: "仁德區", label: "仁德區" },
      { value: "關廟區", label: "關廟區" },
      { value: "龍崎區", label: "龍崎區" },
      { value: "官田區", label: "官田區" },
      { value: "麻豆區", label: "麻豆區" },
      { value: "佳里區", label: "佳里區" },
      { value: "西港區", label: "西港區" },
      { value: "七股區", label: "七股區" },
      { value: "將軍區", label: "將軍區" },
      { value: "學甲區", label: "學甲區" },
      { value: "北門區", label: "北門區" },
      { value: "新營區", label: "新營區" },
      { value: "後壁區", label: "後壁區" },
      { value: "白河區", label: "白河區" },
      { value: "東山區", label: "東山區" },
      { value: "六甲區", label: "六甲區" },
      { value: "下營區", label: "下營區" },
      { value: "柳營區", label: "柳營區" },
      { value: "鹽水區", label: "鹽水區" },
      { value: "善化區", label: "善化區" },
      { value: "大內區", label: "大內區" },
      { value: "山上區", label: "山上區" },
      { value: "新市區", label: "新市區" },
      { value: "安定區", label: "安定區" },
   ],
   //#endregion
   //#region 高雄市
   "高雄市": [
      { value: "楠梓區", label: "楠梓區" },
      { value: "左營區", label: "左營區" },
      { value: "鼓山區", label: "鼓山區" },
      { value: "三民區", label: "三民區" },
      { value: "鹽埕區", label: "鹽埕區" },
      { value: "前金區", label: "前金區" },
      { value: "新興區", label: "新興區" },
      { value: "苓雅區", label: "苓雅區" },
      { value: "前鎮區", label: "前鎮區" },
      { value: "小港區", label: "小港區" },
      { value: "旗津區", label: "旗津區" },
      { value: "鳳山區", label: "鳳山區" },
      { value: "大寮區", label: "大寮區" },
      { value: "鳥松區", label: "鳥松區" },
      { value: "林園區", label: "林園區" },
      { value: "仁武區", label: "仁武區" },
      { value: "大樹區", label: "大樹區" },
      { value: "大社區", label: "大社區" },
      { value: "岡山區", label: "岡山區" },
      { value: "路竹區", label: "路竹區" },
      { value: "橋頭區", label: "橋頭區" },
      { value: "梓官區", label: "梓官區" },
      { value: "彌陀區", label: "彌陀區" },
      { value: "永安區", label: "永安區" },
      { value: "燕巢區", label: "燕巢區" },
      { value: "田寮區", label: "田寮區" },
      { value: "阿蓮區", label: "阿蓮區" },
      { value: "茄萣區", label: "茄萣區" },
      { value: "湖內區", label: "湖內區" },
      { value: "旗山區", label: "旗山區" },
      { value: "美濃區", label: "美濃區" },
      { value: "內門區", label: "內門區" },
      { value: "杉林區", label: "杉林區" },
      { value: "甲仙區", label: "甲仙區" },
      { value: "六龜區", label: "六龜區" },
      { value: "茂林區", label: "茂林區" },
      { value: "桃源區", label: "桃源區" },
      { value: "那瑪夏區", label: "那瑪夏區" }
   ],
   //#endregion
   //#region 屏東縣
   "屏東縣": [
      { value: "屏東市", label: "屏東市" },
      { value: "潮州鎮", label: "潮州鎮" },
      { value: "東港鎮", label: "東港鎮" },
      { value: "恆春鎮", label: "恆春鎮" },
      { value: "萬丹鄉", label: "萬丹鄉" },
      { value: "長治鄉", label: "長治鄉" },
      { value: "麟洛鄉", label: "麟洛鄉" },
      { value: "九如鄉", label: "九如鄉" },
      { value: "里港鄉", label: "里港鄉" },
      { value: "鹽埔鄉", label: "鹽埔鄉" },
      { value: "高樹鄉", label: "高樹鄉" },
      { value: "萬巒鄉", label: "萬巒鄉" },
      { value: "內埔鄉", label: "內埔鄉" },
      { value: "竹田鄉", label: "竹田鄉" },
      { value: "新埤鄉", label: "新埤鄉" },
      { value: "枋寮鄉", label: "枋寮鄉" },
      { value: "新園鄉", label: "新園鄉" },
      { value: "崁頂鄉", label: "崁頂鄉" },
      { value: "林邊鄉", label: "林邊鄉" },
      { value: "南州鄉", label: "南州鄉" },
      { value: "佳冬鄉", label: "佳冬鄉" },
      { value: "琉球鄉", label: "琉球鄉" },
      { value: "車城鄉", label: "車城鄉" },
      { value: "滿州鄉", label: "滿州鄉" },
      { value: "枋山鄉", label: "枋山鄉" },
      { value: "霧台鄉", label: "霧台鄉" },
      { value: "瑪家鄉", label: "瑪家鄉" },
      { value: "泰武鄉", label: "泰武鄉" },
      { value: "來義鄉", label: "來義鄉" },
      { value: "春日鄉", label: "春日鄉" },
      { value: "獅子鄉", label: "獅子鄉" },
      { value: "牡丹鄉", label: "牡丹鄉" },
      { value: "三地門鄉", label: "三地門鄉" },
   ],
   //#endregion
   //#region 宜蘭縣
   "宜蘭縣": [
      { value: "宜蘭市", label: "宜蘭市" },
      { value: "羅東鎮", label: "羅東鎮" },
      { value: "蘇澳鎮", label: "蘇澳鎮" },
      { value: "頭城鎮", label: "頭城鎮" },
      { value: "礁溪鄉", label: "礁溪鄉" },
      { value: "壯圍鄉", label: "壯圍鄉" },
      { value: "員山鄉", label: "員山鄉" },
      { value: "冬山鄉", label: "冬山鄉" },
      { value: "五結鄉", label: "五結鄉" },
      { value: "三星鄉", label: "三星鄉" },
      { value: "大同鄉", label: "大同鄉" },
      { value: "南澳鄉", label: "南澳鄉" },
   ],
   //#endregion
   //#region 花蓮縣
   "花蓮縣": [
      { value: "花蓮市", label: "花蓮市" },
      { value: "鳳林鎮", label: "鳳林鎮" },
      { value: "玉里鎮", label: "玉里鎮" },
      { value: "新城鄉", label: "新城鄉" },
      { value: "吉安鄉", label: "吉安鄉" },
      { value: "壽豐鄉", label: "壽豐鄉" },
      { value: "秀林鄉", label: "秀林鄉" },
      { value: "光復鄉", label: "光復鄉" },
      { value: "豐濱鄉", label: "豐濱鄉" },
      { value: "瑞穗鄉", label: "瑞穗鄉" },
      { value: "萬榮鄉", label: "萬榮鄉" },
      { value: "富里鄉", label: "富里鄉" },
      { value: "卓溪鄉", label: "卓溪鄉" },
   ],
   //#endregion
   //#region 臺東縣
   "臺東縣": [
      { value: "臺東市", label: "臺東市" },
      { value: "成功鎮", label: "成功鎮" },
      { value: "關山鎮", label: "關山鎮" },
      { value: "長濱鄉", label: "長濱鄉" },
      { value: "海端鄉", label: "海端鄉" },
      { value: "池上鄉", label: "池上鄉" },
      { value: "東河鄉", label: "東河鄉" },
      { value: "鹿野鄉", label: "鹿野鄉" },
      { value: "延平鄉", label: "延平鄉" },
      { value: "卑南鄉", label: "卑南鄉" },
      { value: "金峰鄉", label: "金峰鄉" },
      { value: "大武鄉", label: "大武鄉" },
      { value: "達仁鄉", label: "達仁鄉" },
      { value: "綠島鄉", label: "綠島鄉" },
      { value: "蘭嶼鄉", label: "蘭嶼鄉" },
      { value: "太麻里鄉", label: "太麻里鄉" },
   ],
   //#endregion
   //#region 澎湖縣
   "澎湖縣": [
      { value: "馬公市", label: "馬公市" },
      { value: "湖西鄉", label: "湖西鄉" },
      { value: "白沙鄉", label: "白沙鄉" },
      { value: "西嶼鄉", label: "西嶼鄉" },
      { value: "望安鄉", label: "望安鄉" },
      { value: "七美鄉", label: "七美鄉" },
   ],
   //#endregion
   //#region 金門縣
   "金門縣": [
      { value: "金城鎮", label: "金城鎮" },
      { value: "金湖鎮", label: "金湖鎮" },
      { value: "金沙鎮", label: "金沙鎮" },
      { value: "金寧鄉", label: "金寧鄉" },
      { value: "烈嶼鄉", label: "烈嶼鄉" },
      { value: "烏坵鄉", label: "烏坵鄉" },
   ],
   //#endregion
   //#region 連江縣
   "連江縣": [
      { value: "南竿鄉", label: "南竿鄉" },
      { value: "北竿鄉", label: "北竿鄉" },
      { value: "莒光鄉", label: "莒光鄉" },
      { value: "東引鄉", label: "東引鄉" },
   ]
   //#endregion
};
//#endregion

//#region 從1930至傳入年間西元年份
export const YearFrom1930to = (year) => ([...Array(year - 1929).keys()].map((item, index) => ({ value: 1930 + index, label: `西元 ${1930 + index} 年` })))
//#endregion

//#region 1-12月
export const month = [
   { value: "01", label: "1 月" },
   { value: "02", label: "2 月" },
   { value: "03", label: "3 月" },
   { value: "04", label: "4 月" },
   { value: "05", label: "5 月" },
   { value: "06", label: "6 月" },
   { value: "07", label: "7 月" },
   { value: "08", label: "8 月" },
   { value: "09", label: "9 月" },
   { value: "10", label: "10 月" },
   { value: "11", label: "11 月" },
   { value: "12", label: "12 月" },
]
//#endregion

//#region 對應各月份日期
export const day = [
   { value: "01", label: "1 日" },
   { value: "02", label: "2 日" },
   { value: "03", label: "3 日" },
   { value: "04", label: "4 日" },
   { value: "05", label: "5 日" },
   { value: "06", label: "6 日" },
   { value: "07", label: "7 日" },
   { value: "08", label: "8 日" },
   { value: "09", label: "9 日" },
   { value: "10", label: "10 日" },
   { value: "11", label: "11 日" },
   { value: "12", label: "12 日" },
   { value: "13", label: "13 日" },
   { value: "14", label: "14 日" },
   { value: "15", label: "15 日" },
   { value: "16", label: "16 日" },
   { value: "17", label: "17 日" },
   { value: "18", label: "18 日" },
   { value: "19", label: "19 日" },
   { value: "20", label: "20 日" },
   { value: "21", label: "21 日" },
   { value: "22", label: "22 日" },
   { value: "23", label: "23 日" },
   { value: "24", label: "24 日" },
   { value: "25", label: "25 日" },
   { value: "26", label: "26 日" },
   { value: "27", label: "27 日" },
   { value: "28", label: "28 日" },
   { value: "29", label: "29 日" },
   { value: "30", label: "30 日" },
   { value: "31", label: "31 日" },
]
//#endregion

//#region 取透過年月取日期列表
export const getDayByYearAndMonth = (year, month) => {
   switch (month) {
      case "02":
         if (year % 4 === 0 && year % 100 !== 0) {
            return day.slice(0, 29); // 1-29 閏二月
         } else if (year % 400 === 0) {
            return day.slice(0, 29); // 1-29 閏二月
         } else {
            return day.slice(0, 28); // 1-28 平二月
         }
      case "04":
         return day.slice(0, 30); // 1-30 小月
      case "06":
         return day.slice(0, 30); // 1-30 小月
      case "09":
         return day.slice(0, 30); // 1-30 小月
      case "11":
         return day.slice(0, 30); // 1-30 小月
      default:
         return day;
   }
}
//#endregion

//#region 取得星期中文敘述
export const weekDayChMapping = {
   "1": "星期一",
   "2": "星期二",
   "3": "星期三",
   "4": "星期四",
   "5": "星期五",
   "6": "星期六",
   "7": "星期日",
}
//#endregion