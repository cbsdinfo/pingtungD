import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Checkbox, Container, Text, TitleModal, globalContextService, OldTable, Tag, FormContainer, FormRow, TextInput, SubContainer, CheckboxItem } from '../../Components';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as Search } from './Assets/img/Search.svg'
import { AutoComplete as AutoCompleteExtend } from 'antd';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
import { isNil, isUndefined, debounce, throttle } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { cssifyObject } from 'css-in-js-utils';
import { valid } from '../../Handlers';
import { useAsync } from '../../SelfHooks/useAsync';
import { useCallback } from 'react';
// import PrimaryTheme from './Theme/PrimaryTheme'
// import DisableTheme from './Theme/DisableTheme'
// import SuccessTheme from './Theme/SuccessTheme'
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        // case "SuccessTheme":
        //     return SuccessTheme;
        // case "BasicButtonDisableTheme":
        //     return BasicButtonDisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region Map8地圖組件
const Map8CanvasBase = (props) => {

    ///Map8 API Key Setting
    const key = props?.mapKey ?? "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYnNkLmluZm9AZ21haWwuY29tIiwibmFtZSI6ImthaWFuejUxQGdtYWlsLmNvbSIsImlhdCI6MTYwNzA2MjgyMSwib2JqZWN0cyI6WyJcL21hcHNcL2pzIiwiXC9tYXBzXC9zdGF0aWMiLCJcL3BsYWNlXC9nZW9jb2RlIiwiXC9wbGFjZVwvZmluZHBsYWNlZnJvbXRleHQiLCJcL3BsYWNlXC9uZWFyYnlzZWFyY2giLCJcL3BsYWNlXC90ZXh0c2VhcmNoIiwiXC9wbGFjZVwvYXV0b2NvbXBsZXRlIiwiXC9kYXRhIiwiXC9zdHlsZXMiLCJcL3Nwcml0ZXMiLCJcL2ZvbnRzIiwiXC9yb3V0ZVwvZGlyZWN0aW9ucyIsIlwvcm91dGVcL2Rpc3RhbmNlbWF0cml4IiwiXC9yb3V0ZVwvdHJpcCIsIlwvcm9hZFwvbmVhcmVzdFJvYWRzIiwiXC9yb2FkXC9zbmFwVG9Sb2FkcyJdLCJleHAiOjE2MTA5NTA4MjF9.tUwsQ4Khaw0RaD0w-ZHdlwO2tyJTzJclkPuH3ATa2uI";

    useEffect(() => {

        // console.log(props?.mapId)
        // if (isNil(globalContextService.get("Map8Obj", props?.mapId ?? "map8"))) {
        let map;
        if (window.gomp) {
            window.gomp.accessToken = key;


            map = new window.gomp.Map({
                ...props?.mapAttr,
                // maxBounds: [[105, 15], [138.45858, 33.4]], // 台灣地圖區域
                // center: [121.54885, 25.03625], // 初始中心座標，格式為 [lng, lat]
                // zoom: 16, // 初始 ZOOM LEVEL; [0-20, 0 為最小 (遠), 20 ;最大 (近)]
                // minZoom: 6, // 限制地圖可縮放之最小等級, 可省略, [0-19.99]
                // maxZoom: 19.99, // 限制地圖可縮放之最大等級, 可省略 [0-19.99]
                // pitch: 50, // 攝影機仰角, 可省略, [0-60]
                // bearing: 0, // 地圖角度, 可省略, [-180 ~ 180; 0 為正北朝上, 180 為正南朝上]
                // attributionControl: false,

                //#region 應固定屬性
                container: props?.mapId ?? "map8", // 地圖容器 ID
                style: 'https://api.map8.zone/styles/go-life-maps-tw-style-std/style.json', // 地圖樣式檔案位置
                //#endregion

            }).addControl(new window.gomp.AttributionControl({
                compact: false
            }));
            map.addControl(new window.gomp.NavigationControl());

            globalContextService.set("Map8Obj", props?.mapId ?? "map8", map); // 將地圖物件放入 GCS

            // console.log(props?.mapId, map)



            //#region 地圖路線服務

            let gompWebServiceJsClient = new window.GompWebServiceJsClient({
                key: key
            });

            let map8Route = new window.Map8Route({
                gompWebServiceJsClient
            });

            map.addControl(map8Route);
            //#endregion


            map.on('load', function () {

                globalContextService.set("Map8Obj", `${props?.mapId}_OneRoute`, map8Route); // 將地圖路線物件放入 GCS

                //#region 新增圖層 以方便打標記點
                var markerEl = document.createElement('img');
                markerEl.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAqCAYAAACgLjskAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjlJREFUeNrUl8FOwkAQhocVjAYJmBgveCDxBTTqwZN9A/EN8Amsid7x7EWfQHgC9A3grInwACZcuKiJEkI0ouBOnZJa2t2Bbk38k2VLd7ZfZ3d2Z5sYjUag0vbpc05WJVksKlmfSVeWOpXK3fnKq+p5iTAggcqyHMF0usR+YeBAoIQV8W0DvOEKvS5J6LW/QQTAbFnVIsCA+tbks0pKD8ngCszqUHpamQDSMNYgHh24w+sAKUDaEYdRN6cFDCR3Du0YYe6c2o6HWydPLO+Ggzd4f3mAz/4jjIaDn/kQKUimV2FheR1EapHlZVL+FHWwr48e9Du3Y5Ar/D/odZyXSOd3YG4+o/OyKAio9CwI5gejDdpq5AAtlQUOowrmhaKtRpbQDScOF1cM26zgvDlXHFuhmz/TUgIx1DH0ueLYaocU1xlXHFsENlQGuKg5b442aKtRQ1CmVg4rLmoVFNvQhrHbXAtKtErhDrK0tgupTP4XGK/xHrZpdpkx0M0W6OUexKuGzBaWN1vELXscpZLclNVZjLBjYkwcMTAr7xuG3UhYMWwd4pmmZRDWomcGL3w6S1qGoPgMy38+ndhpDEEDYaFbW0RoKEy5l84IVcK0m/eUUC1M+THjO/5vyOpeY7bprrVI6cmzMVRVX0wcGBtIKivaLoxkfJ+X7RAvq9QGpj100gvzXrSg8QWQt0NXepczdogKy2ue67rRU1uIvJDmXwCb/wo4ddBQ4LRpqRSm7ZucMf3UZ+wH3wIMAPnJ+VlcHpUWAAAAAElFTkSuQmCC';

                map.loadImage(markerEl.src, function (error, image) {
                    map.addImage('marker', markerEl);
                    map.addLayer({
                        'id': `${props?.mapId}_pois`,
                        'type': 'symbol',
                        // 若於新增圖層時直接指定 Data，將會自動產生一個同名 id 的 Source
                        'source': {
                            'type': 'geojson',
                            'data': {
                                "type": "FeatureCollection",
                                "features": []
                            }
                        },
                        'layout': {
                            'icon-image': 'marker',
                            'icon-offset': [0, -21],
                            'icon-allow-overlap': true
                        }
                    });

                    globalContextService.set("Map8Obj", `${props?.mapId}_markers`, [])
                });
                //#endregion

                props?.mapOn && props.mapOn(map);

            });
            map.once('idle', function () {
                props?.mapOnce && props.mapOnce(map);
            });

            //#endregion

        }

        return () => {
            // document.body.removeChild(mapBasicScript);
            // document.body.removeChild(mapServiceScript);
            // document.body.removeChild(mapRouteScript);
        }
    }, []);



    return (
        <>
            {/* 地圖容器 */}
            <BasicContainer
                id={props?.mapId ?? "map8"} // 必傳
                {...props.mapContainerEvent}
                baseDefaultTheme={"DefaultTheme"}
                className={`${props.className} mapContainer`}
                theme={iterateTheme(props, props.theme, switchDefaultTheme(props.baseDefaultTheme), "mapContainer")}
            >

            </BasicContainer>
        </>
    )
}
//#endregion

export const Map8Canvas = styled(Map8CanvasBase).attrs((props) => ({}))`
`
//#endregion


//#region 導出可用方法 - (不能在地圖渲染完成前使用)

//#region 取得基礎地圖物件
const getBasicMap = (mapId) => {
    let basicMap = globalContextService.get("Map8Obj", mapId);
    return basicMap;
}
//#endregion

//#region 更新地圖攝影機中心位置
const setCenter = (mapId, center) => {

    let basicMap = globalContextService.get("Map8Obj", mapId);

    if (window.gomp) {
        basicMap.setCenter(center);
    }
    return basicMap;
}
//#endregion

//#region 新增一個地圖標記
const addOneMarkerPoint = (mapId = "map8", addPosition = { lat: 25.01293, lng: 121.474708 }) => {
    let markerPoint = "本方法僅能新增一個地圖標記";

    if (isNil(globalContextService.get("Map8Obj", `${mapId}_OneMark`))) {
        if (window.gomp) {
            markerPoint = new window.gomp.Marker()
                .setLngLat(addPosition)
                .addTo(globalContextService.get("Map8Obj", mapId));

            globalContextService.set("Map8Obj", `${mapId}_OneMark`, markerPoint)
        }
    }
    else {
        console.warn("map8Controll.addOneMarkerPoint 方法僅能新增一個地圖標記。");
    }

    return markerPoint;
}
//#endregion

//#region 移除一個地圖標記
const removeOneMarkerPoint = (mapId = "map8") => {

    if (!isNil(globalContextService.get("Map8Obj", `${mapId}_OneMark`))) {
        globalContextService.get("Map8Obj", `${mapId}_OneMark`).remove();
        globalContextService.remove("Map8Obj", `${mapId}_OneMark`);
    }
}
//#endregion

//#region 取得目前一或多個標記
const getMarkerPoints = (mapId = "map8") => {
    if (window.gomp) {
        return globalContextService.get("Map8Obj", `${mapId}_markers`);
    }
}
//#endregion

//#region 新增、更新一或多個標記
const addOrUpdateMarkerPoints = (mapId = "map8", markersGeometry) => {

    let res;

    if (window.gomp) {

        let basicMap = globalContextService.get("Map8Obj", mapId);
        let source = {
            "type": "FeatureCollection",
            "features": []
        }

        let filterMarkersGeometry = (markersGeometry ?? []).map((item, index) => {
            let newItem = item.filter(i => i !== "hide"); // [121.520991, 25.046558] or [121.520991, 25.046558, "hide"]
            return newItem
        })

        source["features"] = (filterMarkersGeometry ?? []).map((item, index) => {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": item, // [121.520991, 25.046558] 
                }
            }
        })

        // console.log("新增、更新一或多個標記", basicMap?.getSource)

        basicMap?.getSource && basicMap.getSource(`${mapId}_pois`).setData(source);

        globalContextService.set("Map8Obj", `${mapId}_markers`, cloneDeep(filterMarkersGeometry))

        res = cloneDeep(filterMarkersGeometry);
    }

    return res ?? cloneDeep(markersGeometry);
}
//#endregion

//#region 尾部增加一或多個標記
const appendMarkerPoints = (mapId = "map8", markersGeometry) => {

    let res;

    if (window.gomp) {

        let basicMap = globalContextService.get("Map8Obj", mapId);
        let source = {
            "type": "FeatureCollection",
            "features": []
        }

        let oldmarkersGeometry = globalContextService.get("Map8Obj", `${mapId}_markers`)

        let filterOldmarkersGeometry = (markersGeometry ?? []).map((item, index) => {
            let newItem = item.filter(i => i !== "hide"); // [121.520991, 25.046558] or [121.520991, 25.046558, "hide"]
            return newItem
        })

        let oldSource = (filterOldmarkersGeometry ?? []).map((item, index) => {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": item, // [121.520991, 25.046558] 
                }
            }
        })

        let newSource = (markersGeometry ?? []).map((item, index) => {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": item, // [121.520991, 25.046558] 
                }
            }
        })

        source["features"] = [...oldSource, ...newSource]

        basicMap?.getSource && basicMap.getSource(`${mapId}_pois`).setData(source);

        globalContextService.set("Map8Obj", `${mapId}_markers`, cloneDeep([...oldmarkersGeometry, ...markersGeometry]))

        res = cloneDeep([...oldmarkersGeometry, ...markersGeometry])

    }

    return res ?? cloneDeep(markersGeometry);
}
//#endregion

//#region 刪除全部個標記
const delAllMarkerPoints = (mapId = "map8", markersGeometry) => {

    if (window.gomp) {

        let basicMap = globalContextService.get("Map8Obj", mapId);
        let source = {
            "type": "FeatureCollection",
            "features": []
        }

        basicMap?.getSource && basicMap.getSource(`${mapId}_pois`).setData(source);

        globalContextService.set("Map8Obj", `${mapId}_markers`, [])
    }

    return [];
}
//#endregion

//#region 隱藏全部個標記
const hideAllMarkerPoints = (mapId = "map8") => {

    let res = [];

    if (window.gomp) {

        let nowMarkers = globalContextService.get("Map8Obj", `${mapId}_markers`);

        let newMarkers = (nowMarkers ?? []).map(item => {
            return [...item, "hide"]
        })  // 在原有標記陣列內加上 "hide"字串


        let basicMap = globalContextService.get("Map8Obj", mapId);
        let source = {
            "type": "FeatureCollection",
            "features": []
        }

        source["features"] = (newMarkers ?? []).filter(i => !i.includes("hide")).map((item, index) => {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": item, // [121.520991, 25.046558]
                }
            }
        })

        // console.log("新增、更新一或多個標記", basicMap?.getSource)

        basicMap?.getSource && basicMap.getSource(`${mapId}_pois`).setData(source);

        globalContextService.set("Map8Obj", `${mapId}_markers`, cloneDeep(newMarkers))
        res = cloneDeep(newMarkers);
    }

    return res;
}
//#endregion

//#region 新增一條路線 (所有地圖共用)
const addOneRoute = (mapId, routeAttr) => {

    let map8Route = globalContextService.get("Map8Obj", `${mapId}_OneRoute`)
    // console.log(globalContextService.get("Map8Obj", `${mapId}_OneRoute`))
    map8Route?.route && map8Route.route({
        ...routeAttr,
        // origin: [121.474708, 25.012930],
        // destination: [121.570260, 25.032806],
        // waypoints: [
        //     [121.49993, 25.03678],
        //     [121.517498, 25.046273]
        // ],
        profile: "car",
        fitBoundsOptions: { padding: 30 }    // 設定 `Map8Route.route()` 完成繪製時的過場動畫效果為顯示範圍周遭留白 30px
    });

    // console.log(map8Route.getOrigin());
    // console.log(map8Route.getDestination());
    // console.log(map8Route.getWaypoints());

    return map8Route;

}
//#endregion

//#region 移除一條路線 (所有地圖共用)
const removeOneRoute = (mapId) => {
    let map8Route = globalContextService.get("Map8Obj", `${mapId}_OneRoute`);
    map8Route?.removeRoutes && map8Route.removeRoutes();
    globalContextService.set("Map8Obj", `${mapId}_OneRoute`, map8Route)
}
//#endregion

//#region 方法承載物件 (不能在地圖渲染完成前使用)
const map8Controll = {
    getBasicMap, // 取得基礎地圖物件
    setCenter, // 更新地圖攝影機中心位置
    addOneMarkerPoint, // 新增一個地圖標記
    removeOneMarkerPoint, // 移除一個地圖標記
    getMarkerPoints, // 取得目前一或多個標記
    addOrUpdateMarkerPoints, // 新增、更新一或多個標記
    appendMarkerPoints, // 尾部增加一或多個標記
    delAllMarkerPoints, // 刪除全部個標記
    hideAllMarkerPoints, // 隱藏全部個標記， !! 注意 僅當次有效
    addOneRoute, // 新增一條路線 (所有地圖共用)
    removeOneRoute, // 移除一條路線 (所有地圖共用)
}
//#endregion

export { map8Controll }
//#endregion


//#region 搜尋地圖資訊組件

//#region 搜尋地圖資訊組件
const AutoCompleteExtendStyle = styled(AutoCompleteExtend).attrs((props) => ({}))`
//#region 

&.ant-select {
    width: 100%;
}

&& .ant-select-selector {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "map8InputSubContainer")['basic']))}  
}
&& .ant-select-selection-search {
    height: 100%;
}

// && .ant-select-selection-search-input{
//     //權重不夠高
//     ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "map8Input")['basic']))}  
// }

&&.ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "map8Input")['basic']))}  
}

&& .ant-select-selection-placeholder {
    position: relative;
    opacity: 1;
    color: rgba(0,0,0,0.65);
    top: -2px;
}

//#endregion


`
//#endregion

//#region 搜尋地圖資訊組件
export const Map8InputBase = (props) => {

    const [Value, setValue] = useState("");
    const [ViewTypeValue, setViewTypeValue] = useState("");
    const [options, setOptions] = useState([]);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用

    useEffect(() => {
        setValue(props.value)
        if (props.value) {
            setViewTypeValue(`${props.value}`)
        }
        else {
            setViewTypeValue("")
        }

        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])

    // const delayedHandleSearch = debounce(eventData => GetSearchPosExecute(eventData), 1000);

    //#region 自動完成查詢 API
    const getSearchPos = useCallback(async (searchText) => {
        if (!valid(searchText, ["[^\u3100-\u312F]+$"], ["含有注音"])[1]) { // 若有注音則，vaild有值不發API

            const key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYnNkLmluZm9AZ21haWwuY29tIiwibmFtZSI6ImthaWFuejUxQGdtYWlsLmNvbSIsImlhdCI6MTYwNzA2MjgyMSwib2JqZWN0cyI6WyJcL21hcHNcL2pzIiwiXC9tYXBzXC9zdGF0aWMiLCJcL3BsYWNlXC9nZW9jb2RlIiwiXC9wbGFjZVwvZmluZHBsYWNlZnJvbXRleHQiLCJcL3BsYWNlXC9uZWFyYnlzZWFyY2giLCJcL3BsYWNlXC90ZXh0c2VhcmNoIiwiXC9wbGFjZVwvYXV0b2NvbXBsZXRlIiwiXC9kYXRhIiwiXC9zdHlsZXMiLCJcL3Nwcml0ZXMiLCJcL2ZvbnRzIiwiXC9yb3V0ZVwvZGlyZWN0aW9ucyIsIlwvcm91dGVcL2Rpc3RhbmNlbWF0cml4IiwiXC9yb3V0ZVwvdHJpcCIsIlwvcm9hZFwvbmVhcmVzdFJvYWRzIiwiXC9yb2FkXC9zbmFwVG9Sb2FkcyJdLCJleHAiOjE2MTA5NTA4MjF9.tUwsQ4Khaw0RaD0w-ZHdlwO2tyJTzJclkPuH3ATa2uI";

            fetch(`https://api.map8.zone/v2/place/autocomplete?key=${key}&input=${encodeURIComponent(searchText)}&location=25.06102,121.58790&radius=50.000`,
                {})
                .then(Result => {
                    const ResultJson = Result.clone().json();//Respone.clone()
                    return ResultJson;
                })
                .then((PreResult) => {
                    // console.log(PreResult)

                    if (PreResult.status === "OK") {
                        let a = PreResult.predictions.map((item) => { return { label: item.name, value: item.id } })
                        setOptions(!searchText ? [] : a)
                    }
                    else if (PreResult.status === "ZERO_RESULTS") {
                        setOptions(!searchText ? [] : [{ label: "查無資料", value: "查無資料", disabled: true }])
                    }
                    else {
                        throw PreResult;
                    }
                })
                .catch((Error) => {
                })
                .finally(() => {
                });
        }

    }, [])

    const [GetSearchPosExecute, GetSearchPosPending] = useAsync(getSearchPos, false);
    //#endregion 

    // const onSearch = (searchText) => {
    //     delayedHandleSearch(searchText); // 防抖動效果
    // }

    const onSearch = useCallback(debounce(v => {
        GetSearchPosExecute(v); // 防抖動效果
    }, 1000), [debounce]);


    return (
        <>
            {
                props.viewType ?
                    // 展示模式 (未開放)
                    // 容器
                    <SubContainer
                        {...props.viewTypeContainerEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`${props.className} viewTypeContainer`}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeContainer") }}
                    >
                        {/* 上標題 */}
                        <Text
                            {...props.viewTypeTopLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTopLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTopLabel") }}
                        >
                            {props.viewTypeTopLabel ?? props.topLabel}
                        </Text>
                        {/* 勾選框本體 */}
                        <BasicContainer
                            {...props.viewTypeMap8InputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeMap8InputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeMap8InputContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeMap8InputEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeMap8Input`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeMap8Input") }}
                            >
                                {ViewTypeValue ?? ""}
                            </Text>
                        </BasicContainer>
                        {/* 下標題 */}
                        <Text
                            {...props.viewTypeBottomLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeBottomLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeBottomLabel") }}
                        >
                            {props.viewTypeBottomLabel ?? props.bottomLabel}
                        </Text>
                    </SubContainer>
                    :
                    // 一般編輯模式
                    // 容器
                    <SubContainer
                        {...props.containerEvent}
                        baseDefaultTheme={"DefaultTheme"}
                        className={`${props.className} container`}
                        theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "container") }}
                    >
                        {/* 上標題 */}
                        <Text
                            {...props.topLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} topLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "topLabel") }}
                        >
                            {props.topLabel}
                        </Text>
                        {/* 搜尋地圖資訊組件本體 */}
                        <BasicContainer
                            {...props.map8InputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} map8InputContainer`}
                            onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                            onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                            onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                            onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "map8InputContainer") }}
                        >

                            {/* 搜尋地圖資訊組件 */}
                            < AutoCompleteExtendStyle
                                options={options}
                                onSelect={(value, option) => {
                                    // console.log('onSelect', value, option);
                                    // "https://api.map8.zone/v2/place/details/json?key=<您的 key>&placeid=NzYqAQYARhkCVltTRRxiJBIYMDIIZgVSLyMdf25eBDIIPQ1VHWEwEg==&postcode=true"
                                    const key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYnNkLmluZm9AZ21haWwuY29tIiwibmFtZSI6ImthaWFuejUxQGdtYWlsLmNvbSIsImlhdCI6MTYwNzA2MjgyMSwib2JqZWN0cyI6WyJcL21hcHNcL2pzIiwiXC9tYXBzXC9zdGF0aWMiLCJcL3BsYWNlXC9nZW9jb2RlIiwiXC9wbGFjZVwvZmluZHBsYWNlZnJvbXRleHQiLCJcL3BsYWNlXC9uZWFyYnlzZWFyY2giLCJcL3BsYWNlXC90ZXh0c2VhcmNoIiwiXC9wbGFjZVwvYXV0b2NvbXBsZXRlIiwiXC9kYXRhIiwiXC9zdHlsZXMiLCJcL3Nwcml0ZXMiLCJcL2ZvbnRzIiwiXC9yb3V0ZVwvZGlyZWN0aW9ucyIsIlwvcm91dGVcL2Rpc3RhbmNlbWF0cml4IiwiXC9yb3V0ZVwvdHJpcCIsIlwvcm9hZFwvbmVhcmVzdFJvYWRzIiwiXC9yb2FkXC9zbmFwVG9Sb2FkcyJdLCJleHAiOjE2MTA5NTA4MjF9.tUwsQ4Khaw0RaD0w-ZHdlwO2tyJTzJclkPuH3ATa2uI";

                                    fetch(`https://api.map8.zone/v2/place/details/json?key=${key}&placeid=${encodeURIComponent(value)}&postcode=true`,
                                        // https://api.map8.zone/v2/place/geocode/json?key=<您的 key>&address=台北市內湖區新湖三路189號
                                        // fetch(`https://api.map8.zone/v2/place/geocode/json?key=${key}&address=${encodeURIComponent(option.label)}`,
                                        {})
                                        .then(Result => {
                                            const ResultJson = Result.clone().json();//Respone.clone()
                                            return ResultJson;
                                        })
                                        .then((PreResult) => {
                                            // console.log(PreResult)
                                            // console.log(PreResult.results[0])

                                            if (PreResult.status === "OK") {
                                                props.onSelect && props.onSelect(null, option, OnInitial, PreResult.result);
                                                // props.onSelect && props.onSelect(null, option, OnInitial, PreResult.results[0]);
                                            }
                                            else {
                                                throw PreResult;
                                            }
                                        })
                                        .catch((Error) => {
                                            // console.log(Error)
                                        })
                                        .finally(() => {
                                        });
                                }}

                                onSearch={onSearch}

                                disabled={props.disable ?? false}
                                // disable={props.disable ?? false} //供判斷
                                // focus={Focus}
                                // hover={Hover}
                                placeholder={props.placeholder ?? "請搜尋地址"} // 具locale預設值
                                transitionName="" //取消動畫
                                value={Value}

                                onChange={(value, option) => {
                                    // console.log(value, option)
                                    props.onChange && props.onChange(null, option?.label ?? value, OnInitial);
                                    setValue(option?.label ?? value);
                                    setViewTypeValue(option?.label ?? value)
                                }}
                                theme={props.theme}
                            />

                        </BasicContainer>
                        {/* 下標題 */}
                        <Text
                            {...props.bottomLabelEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} bottomLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "bottomLabel") }}
                        >
                            {props.bottomLabel}
                        </Text>
                    </SubContainer >
            }
        </>
    )
}

export const Map8Input = styled(Map8InputBase).attrs((props) => ({}))`

`
//#endregion

//#endregion
