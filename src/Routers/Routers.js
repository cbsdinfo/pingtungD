import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getParseItemLocalStorage, pushItemLocalStorage, setStringifyItemLocalStorage } from '../Handlers';
import { urlMapping } from '../Mappings/Mappings'

//#region 以下內容供參考用，請依照實際專案調整路由
/* 
   Date   : 2020-06-17 17:35:53
   Author : Arhua Ho
   Content: 將後端傳回路由動態渲染處理。
   @Param : data ； 參數值 : 後端傳回之路由資料。
   @return : mapRoutersArr ； 回傳值 : 處理完之路由陣列
*/
// const mapRouterss = (data) => {
//     //console.log("f")
//     let mapRoutersArr = [];
//     data.forEach((item, index) => {
//         if (item.path !== "-") {
//             mapRoutersArr.push(
//                 <Route key={item.name}
//                     path={item.path}
//                     render={({ location }) => {
//                         return (localStorage.getItem("DAuth") !== null) ? (
//                             urlMapping[item.path]
//                         ) : (
//                                 <Redirect
//                                     to={{
//                                         pathname: "/Login",
//                                     }}
//                                 />
//                             );
//                     }}>
//                 </Route>)
//         }
//         //遍歷子層
//         item.children.forEach((item, index) => {
//             mapRoutersArr.push(
//                 <Route path={item.path}
//                     key={item.name}
//                     render={({ location }) => {
//                         return (localStorage.getItem("DAuth") !== null) ? (
//                             urlMapping[item.path]
//                         ) : (
//                                 <Redirect
//                                     to={{
//                                         pathname: "/Login",
//                                     }}
//                                 />
//                             );
//                     }}>
//                 </Route>
//             )
//         })
//     });
//     mapRoutersArr.push(
//         <Route key={"個人中心"} path={"/System/My"}
//             render={({ location }) => {
//                 return (getParseItemLocalStorage("DAuth") !== null) ? (
//                     urlMapping["/System/My"]
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/Login",
//                             }}
//                         />
//                     );
//             }
//             }>
//         </Route>
//     )
//     return mapRoutersArr;
// }
//#endregion

const mapRouters = (data) => {
    let mapRoutersArr = [];

    if (data instanceof Array) {
        for (var item of data) {
            let peritem = mapRouters(item);
            for (var item1 of peritem) {
                mapRoutersArr.push(item1);
            }
        }
    } else {
        if (data.item.url.trim() !== "/") {
            // 路由非為 "/" ，代表具真實路由
            mapRoutersArr.push(
                <Route
                    key={data.item.name}
                    exact
                    path={data.item.url}
                    render={({ location }) => {
                        //console.log(location.pathname, data.item.url, urlMapping[data.item.url])
                        return (localStorage.getItem("DAuth") !== null) ? (
                            urlMapping[data.item.url]
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

            //這邊處理 elements (權限)，(另外 必須手動設定 urlMapping)
            if (data.item.elements.length > 0) {
                (data.item.elements ?? []).forEach(func => { // 功能 如新增、編輯、刪除
                    // 因為例如 "刪除" 功能 不需要路由，
                    // 所以不會被寫在 urlMapping 裡面，也就是說不在 urlMapping 就不添加路由
                    // 即是 你要開放甚麼功能頁面 就要在 urlMapping 寫 "路由":<對應路由頁面組件 />
                    if (urlMapping[`${data.item.url}/${func.domId}`]) {
                        mapRoutersArr.push(
                            <Route
                                key={`${data.item.name}/${func.name}`}
                                exact
                                path={`${data.item.url}/${func.domId}`}
                                render={({ location }) => {
                                    //console.log(location.pathname, data.item.url, urlMapping[data.item.url])
                                    return (localStorage.getItem("DAuth") !== null) ? (
                                        urlMapping[`${data.item.url}/${func.domId}`]
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
                    }

                    //另外將可使用的功能加到 LocalStorage 裡面
                    if (!getParseItemLocalStorage("Functions")) {
                        setStringifyItemLocalStorage("Functions", [])
                    }
                    if (!(getParseItemLocalStorage("Functions") ?? []).includes(`${data.item.url}/${func.domId}`)) {
                        pushItemLocalStorage("Functions", `${data.item.url}/${func.domId}`)
                    }
                });
            }
        }

        if (data.children.length > 0) {
            let peritem = mapRouters(data.children);
            for (var item2 of peritem) {
                mapRoutersArr.push(item2);
            }
        }
    }

    return mapRoutersArr;
}

//#region 路由組件
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
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            // urlMapping["/"]
                            <Redirect
                                to={{
                                    pathname: "/TodayTask",
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
                {/* 
                   Date   : 2020-07-08 18:58:41
                   Author : Arhua Ho
                   Content: 寫死的路由
                */}
                <Route exact path={"/TodayTask"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/TodayTask"]
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
                <Route exact path={"/PerDespatch"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/PerDespatch"]
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
                <Route exact path={"/HitCard"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/HitCard"]
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
                <Route exact path={"/HitCardList"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/HitCardList"]
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
                <Route exact path={"/TaskHistory"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/TaskHistory"]
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
                <Route exact path={"/PerTaskHistory"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/PerTaskHistory"]
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
                <Route exact path={"/Income"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/Income"]
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
                <Route exact path={"/Contact"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/Contact"]
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
                <Route exact path={"/School"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/School"]
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
                <Route exact path={"/DayCheck"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
                            urlMapping["/DayCheck"]
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
                {/* <Route exact path={"/Test"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
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
                </Route> */}
                {/* 
                   Date   : 2020-07-08 19:00:47
                   Author : Arhua Ho
                   Content: 登入
                */}
                <Route path={"/Login"}
                    render={({ location }) => {
                        return (getParseItemLocalStorage("DAuth") === null) ? (
                            urlMapping["/Login"]
                        ) : (
                            <Redirect
                                to={{
                                    pathname: "/TodayTask",
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
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
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
                {getParseItemLocalStorage("ModulesTree") && mapRouters(getParseItemLocalStorage("ModulesTree"))}

                {/* 
                   Date   : 2020-06-17 16:52:02
                   Author : Arhua Ho
                   Content: 亂打網址
                */}
                <Route path="*"
                    component={({ location }) => {
                        //console.log("sad")
                        return (getParseItemLocalStorage("DAuth") !== null) ? (
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