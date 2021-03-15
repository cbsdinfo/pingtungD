import layout from './Layout/Layout'
import login from './Pages/Login/Login'
import cases from './Pages/Case/Case'
import orgManager from './Pages/Base/OrgManager/OrgManager'
import roleManager from './Pages/Base/RoleManager/RoleManager'
import userManager from './Pages/Base/UserManager/UserManager'
import carAndDriverSetting from './Pages/Base/CarAndDriverSetting/CarAndDriverSetting'
import fareSubsidyParam from './Pages/Base/FareSubsidyParam/FareSubsidyParam'
import medicalOrgManager from './Pages/Base/MedicalOrgManager/MedicalOrgManager'
import operatingUnitSetting from './Pages/Base/OperatingUnitSetting/OperatingUnitSetting'
import news from './Pages/News/News'
import busRoute from './Pages/BusRoute/BusRoute'
import allBusRouteComponent from './Pages/BusRoute/AllBusRouteComponent/AllBusRouteComponent'

import systemNewsComponent from './Pages/News/SystemNewsComponent/SystemNewsComponent'

import callCar from './Pages/CallCar/CallCar'
import caseCallCarComponent from './Pages/CallCar/CaseCallCarComponent/CaseCallCarComponent'
import busCallCarComponent from './Pages/CallCar/BusCallCarComponent/BusCallCarComponent'
import whiteCallCarComponent from './Pages/CallCar/WhiteCallCarComponent/WhiteCallCarComponent'

import fastCallCar from './Pages/FastCallCar/FastCallCar'

import record from './Pages/Record/Record'
import qAndA from './Pages/QAndA/QAndA'
import order from './Pages/Order/Order'
import userInfo from './Pages/UserInfo/UserInfo'
//#region 
import todayTask from './Pages/TodayTask/TodayTask'
import perDespatch from './Pages/PerDespatch/PerDespatch'
import hitCard from './Pages/HitCard/HitCard'
import hitCardList from './Pages/HitCardList/HitCardList'
import taskHistory from './Pages/TaskHistory/TaskHistory'
import perTaskHistory from './Pages/PerTaskHistory/PerTaskHistory'
import income from './Pages/Income/Income'
import contact from './Pages/Contact/Contact'
import school from './Pages/School/School'
import dayCheck from './Pages/DayCheck/DayCheck'

// import busRoute from './Pages/BusRouteAndStop/BusRoute/BusRoute'
import pickUpData from './Pages/Report/PickUpData/PickUpData'
import revenue from './Pages/Report/Revenue/Revenue'
import carUsed from './Pages/Report/CarUsed/CarUsed'
import carAreaRate from './Pages/Report/CarAreaRate/CarAreaRate'
import serviceMonthlyReport from './Pages/Report/ServiceMonthlyReport/ServiceMonthlyReport'
import problemSheet from './Pages/Report/ProblemSheet/ProblemSheet'
import exportReport from './Pages/Report/ExportReport/ExportReport'

import drivers from './Pages/DriverAndCar/Drivers/Drivers'
import cars from './Pages/DriverAndCar/Cars/Cars'
import carFixedRecord from './Pages/DriverAndCar/CarFixedRecord/CarFixedRecord'

import busStop from './Pages/BusRouteAndStop/BusStop/BusStop'

import whiteConsole from './Pages/Dispatch/WhiteConsole/WhiteConsole'
import busConsole from './Pages/Dispatch/BusConsole/BusConsole'

export default {
    layout,
    pages: {
        login,
        cases, // case 是保留字

        //#region Base 系統資料管理
        orgManager,
        roleManager,
        userManager,
        carAndDriverSetting,
        fareSubsidyParam,
        medicalOrgManager,
        operatingUnitSetting,
        //#endregion

        //#region 最新消息
        news: {
            ...news,
            component: {
                systemNewsComponent,
            }
        },

        //#endregion

        //#region 最新消息
        busRoute: {
            ...busRoute,
            component: {
                allBusRouteComponent,
            }
        },

        //#endregion

        //#region 預約訂車
        callCar: {
            ...callCar,
            component: {
                caseCallCarComponent,
                busCallCarComponent,
                whiteCallCarComponent,
            }
        },
        //#endregion

        //#region 快速叫車
        fastCallCar,
        //#endregion

        //#region 訂單檢視
        record,
        //#endregion

        //#region 用戶資料
        userInfo,
        //#endregion

        //#region 聯繫客服
        // contact,
        //#endregion

        //#region 常見問題
        qAndA,
        //#endregion

        //#region 預約訂單
        order,
        //#endregion

        //#region 報表管理
        pickUpData,
        revenue,
        carUsed,
        carAreaRate,
        serviceMonthlyReport,
        problemSheet,
        exportReport,
        //#endregion

        // busRoute,

        //#region 司機車輛管理
        drivers,
        cars,
        carFixedRecord,
        //#endregion

        //#region 路線及站牌管理
        busStop,
        //#endregion

        //#region 派車調度
        whiteConsole, // 白牌車調度台
        busConsole, // 幸福巴士調度台
        //#endregion

        //#region 司機端
        todayTask, // 今日任務
        perDespatch,  // 今日任務單張調度單
        hitCard, // 打卡
        hitCardList, // 打卡紀錄
        taskHistory, // 任務歷程
        perTaskHistory,// 任務歷程單筆訂單
        income, // 收入列表
        contact, // 聯繫行控
        school, // 司機學院
        dayCheck, // 每日檢查
        //#endregion

    }
}