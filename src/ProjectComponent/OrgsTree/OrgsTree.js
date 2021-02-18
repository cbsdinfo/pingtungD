import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { BasicContainer, ScrollBar, Container, Text, globalContextService } from '../../Components/';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { ReactComponent as CaretDown } from './Assets/img/CaretDown.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import { useWindowSize } from '../../SelfHooks/useWindowSize';
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

//#region 組織樹遍歷
const OrgsTreeBase = (props) => {
    const [Close, setClose] = useState([]);
    const [Select, setSelect] = useState([]);

    useEffect(() => {
        // 供外部可調用 OrgsTree 的 setSelect 函數
        globalContextService.set(props.pageName, "setSelectStateForTreeSelector", setSelect);
    })

    return (
        <>
            {props?.OrgsTree && generateOrgsTree(
                props,
                props?.OrgsTree,
                props?.GetSubDataExecute,
                Select,
                setSelect,
                Close,
                setClose,
                props.pageName  //globalContextService.get("OrgManagerPage", "orgId")
            )}
        </>
    )
}
//#endregion

//#region 取得 children 數量
const getChildCount = (child) => {
    let count = 0;
    if (child instanceof Array) {
        for (let item of child) {
            count = count + getChildCount(item, count);
        }
    }
    else {
        count = count + 1 + getChildCount(child.children, count);

    }
    return count;
}
//#endregion

//#region 組織樹遍歷 (子項部分)
const generateOrgsTree = (props, data, GetSubDataExecute, Select, setSelect, Close, setClose, pageName, level = 1) => {
    // console.log(data)
    let vdom = [];

    if (data instanceof Array) {
        // 如果 data 是陣列，則對每一個 item 遞迴一次，並將它放入容器中
        let list = [];
        for (let item of data) {
            list.push(generateOrgsTree(props, item, GetSubDataExecute, Select, setSelect, Close, setClose, pageName, level));
        }

        if (list.length > 0) {
            for (let item1 of list) {
                vdom.push(item1);
            }
        }

    } else {
        // 如果 data 不是陣列
        vdom.push(
            // OrgsTree遍歷項容器
            <BasicContainer
                key={data.item.id}
                baseDeafultTheme={"DefaultTheme"}
                // close={Close}
                // id={data.item.id}
                // childCount={getChildCount(data.children)}
                theme={{ ...iterateTheme({ ...props, close: Close, id: data.item.id, childCount: getChildCount(data.children) }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "OrgsTreeContainer") }}
            >
                {/* OrgsTree項目容器 */}
                <Text
                    key={data.item.id}
                    baseDeafultTheme={"DefaultTheme"}
                    // level={level}
                    // id={data.item.id}
                    // select={Select}
                    // orgId={globalContextService.get("OrgManagerPage", "orgId")}
                    theme={{ ...iterateTheme({ ...props, level: level, id: data.item.id, select: Select, orgId: globalContextService.get(pageName, "orgId") }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "OrgsTreeItemContainer") }}
                    onClick={() => {
                        setSelect(data.item.id);
                        if (globalContextService.get(pageName, "orgId") !== data.item.id) {
                            GetSubDataExecute(true, data.item.id, 99999, 1);
                            globalContextService.set(pageName, "orgNameForTreeSelector", data.item.name);
                        }
                    }}
                >
                    {/* 左側欄項目名稱 */}
                    {data.item.name}

                    {/* 展開的 icon 圖標 */}
                    {data.children.length > 0 &&
                        <CaretDown
                            style={props?.theme?.caretDownIcon
                                ?
                                props.theme.caretDownIcon(level, Close, data.item.id)
                                :
                                switchDefaultTheme(props.baseDefaultTheme)?.caretDownIcon(level, Close, data.item.id)
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                if ((Close ?? []).includes(data.item.id)) {
                                    setClose(c => (c.filter((i) => (i !== data.item.id))))
                                } else {
                                    setClose(c => ([...c, data.item.id]))
                                }
                            }}
                        />
                    }
                </Text>
                {generateOrgsTree(props, data.children, GetSubDataExecute, Select, setSelect, Close, setClose, pageName, level + 1)}
            </BasicContainer >
        );

    }
    return vdom;
}
//#endregion



export const OrgsTree = styled(OrgsTreeBase).attrs((props) => ({}))`
`
//#endregion









