import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getItemlocalStorage } from '../Handlers/LocalStorageHandler';
import { urlMapping } from '../Mappings/Mappings'

//#region 以下內容供參考用，請依照實際專案調整路由
/* 
   Date   : 2020-06-17 17:35:53
   Author : Arhua Ho
   Content: 將後端傳回路由動態渲染處理。
   @Param : data ； 參數值 : 後端傳回之路由資料。
   @return : mapRoutersArr ； 回傳值 : 處理完之路由陣列
*/
const mapRouters = (data) => {
    //console.log("f")
    let mapRoutersArr = [];
    data.forEach((item, index) => {
        if (item.path !== "-") {
            mapRoutersArr.push(
                <Route key={item.name}
                    path={item.path}
                    render={({ location }) => {
                        return (localStorage.getItem("Auth") !== null) ? (
                            urlMapping[item.path]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }}>
                </Route>)
        }
        //遍歷子層
        item.children.forEach((item, index) => {
            mapRoutersArr.push(
                <Route path={item.path}
                    key={item.name}
                    render={({ location }) => {
                        return (localStorage.getItem("Auth") !== null) ? (
                            urlMapping[item.path]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }}>
                </Route>
            )
        })
    });
    mapRoutersArr.push(
        <Route key={"個人中心"} path={"/System/My"}
            render={({ location }) => {
                return (getItemlocalStorage("Auth") !== null) ? (
                    urlMapping["/System/My"]
                ) : (
                        <Redirect
                            to={{
                                pathname: "/Login",
                            }}
                        />
                    );
            }
            }>
        </Route>
    )
    return mapRoutersArr;
}


export const Routers = (props) => {

    return (
        <>
            <Switch>

                {/* 
                   Date   : 2020-06-17 16:52:45
                   Author : Arhua Ho
                   Content: 固定段，含根、登入、404
                */}
                <Route exact path={"/"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                {/* 
                   Date   : 2020-07-08 18:58:41
                   Author : Arhua Ho
                   Content: 寫死的路由
                */}
                <Route exact path={"/Administrators"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Administrators"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/Locations"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Locations"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/Experts"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Experts"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/Customers"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Customers"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/Dispatch"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Dispatch"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/DispatchBoard"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/DispatchBoard"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/ReservationList"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/ReservationList"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                <Route exact path={"/Percentage"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Percentage"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                {/* 
                   Date   : 2020-07-08 19:00:47
                   Author : Arhua Ho
                   Content: 測試組件頁面
                */}
                <Route exact path={"/Test"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/Test"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                {/* 
                   Date   : 2020-07-08 19:00:47
                   Author : Arhua Ho
                   Content: 登入
                */}
                <Route path={"/Login"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") === null) ? (
                            urlMapping["/Login"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
                {/* 
                   Date   : 2020-07-08 19:00:47
                   Author : Arhua Ho
                   Content: 404
                */}
                <Route path={"/404"}
                    render={({ location }) => {
                        return (getItemlocalStorage("Auth") !== null) ? (
                            urlMapping["/404"]
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>

                {/* 
                   Date   : 2020-06-17 16:52:19
                   Author : Arhua Ho
                   Content: 中間遍歷段
                */}
                {/* {JSON.parse(getItemlocalStorage("LeftSideData")) && mapRouters(JSON.parse(getItemlocalStorage("LeftSideData")))} */}

                {/* 
                   Date   : 2020-06-17 16:52:02
                   Author : Arhua Ho
                   Content: 亂打網址
                */}
                <Route path="*"
                    component={({ location }) => {
                        //console.log("sad")
                        return (getItemlocalStorage("Auth") !== null) ? (
                            <Redirect
                                to={{
                                    pathname: "/404",
                                }}
                            />
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: "/Login",
                                    }}
                                />
                            );
                    }
                    }>
                </Route>
            </Switch>
        </>
    )
}
//#endregion