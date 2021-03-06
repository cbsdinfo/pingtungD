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
import privacy from './Pages/Privacy/Privacy'

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
        cases, // case ????????????

        //#region Base ??????????????????
        orgManager,
        roleManager,
        userManager,
        carAndDriverSetting,
        fareSubsidyParam,
        medicalOrgManager,
        operatingUnitSetting,
        //#endregion

        //#region ????????????
        news: {
            ...news,
            component: {
                systemNewsComponent,
            }
        },

        //#endregion

        //#region ????????????
        busRoute: {
            ...busRoute,
            component: {
                allBusRouteComponent,
            }
        },

        //#endregion

        //#region ????????????
        callCar: {
            ...callCar,
            component: {
                caseCallCarComponent,
                busCallCarComponent,
                whiteCallCarComponent,
            }
        },
        //#endregion

        //#region ????????????
        fastCallCar,
        //#endregion

        //#region ????????????
        record,
        //#endregion

        //#region ????????????
        userInfo,
        //#endregion

        //#region ????????????
        // contact,
        //#endregion

        //#region ????????????
        qAndA,
        //#endregion

        //#region ????????????
        order,
        //#endregion

        //#region ????????????
        pickUpData,
        revenue,
        carUsed,
        carAreaRate,
        serviceMonthlyReport,
        problemSheet,
        exportReport,
        //#endregion

        // busRoute,

        //#region ??????????????????
        drivers,
        cars,
        carFixedRecord,
        //#endregion

        //#region ?????????????????????
        busStop,
        //#endregion

        //#region ????????????
        whiteConsole, // ??????????????????
        busConsole, // ?????????????????????
        //#endregion

        //#region ?????????
        todayTask, // ????????????
        perDespatch,  // ???????????????????????????
        hitCard, // ??????
        hitCardList, // ????????????
        taskHistory, // ????????????
        perTaskHistory,// ????????????????????????
        income, // ????????????
        contact, // ????????????
        school, // ????????????
        dayCheck, // ????????????
        privacy, // ???????????????
        //#endregion

    }
}