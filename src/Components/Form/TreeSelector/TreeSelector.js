import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import Select, { components } from 'react-select'
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
import { ReactComponent as CaretDown } from './Assets/img/CaretDown.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { cloneDeep, isPlainObject } from 'lodash';
// import SecondaryTheme from './Theme/SecondaryTheme'
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        // case "SecondaryTheme":
        //     return SecondaryTheme;
        case "DisableTheme":
            return DisableTheme;
        // case "PrimaryTheme":
        //     return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region 繼承 react-select 的 Select 待替換
const SelectExtend = styled(Select).attrs((props) => ({}))`
&& {
    [class*="menu"] {
        div:nth-child(1) {
            //滾動條美化
            ::-webkit-scrollbar {
                width: 0.5em;
                height: ${props => props?.theme?.scrollHeight ?? 'initial'}; //scroll-x 的高度
            }
            ::-webkit-scrollbar-track {
                -webkit-border-radius: 10px;
                border-radius: 10px;
                margin:0px 0.1rem 5px 0;
            }
            ::-webkit-scrollbar-thumb {
                -webkit-border-radius: 4px;
                border-radius: 4px;
                background: ${props => props?.theme?.scrollUnhoverBackgroundColor ?? 'rgba(0, 0, 0, 0.25)'};
            }
            &:hover::-webkit-scrollbar-thumb {
                -webkit-border-radius: 4px;
                border-radius: 4px;
                background: ${props => props?.theme?.scrollHoverBackgroundColor ?? 'rgba(0, 0, 0, 0.25)'};
            }
        }
    }
}
`
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

//#region  樹狀結構資料轉換器
export const treeSelectorTransducer = (data, optionsValueKeyName, optionsLabelKeyName, level = 1) => {
    //console.log(data)
    let vdom = [];

    if (data instanceof Array) {
        // 如果 data 是陣列，則對每一個 item 遞迴一次，並將它放入容器中
        for (var item of data) {
            let peritem = treeSelectorTransducer(item, optionsValueKeyName, optionsLabelKeyName, level);
            for (var item1 of peritem) {
                vdom.push(item1);
            }
        }

    } else {
        // 如果 data 不是陣列
        // optionsValueKeyName={"parentId"}
        // optionsLabelKeyName={"parentName"}
        vdom.push({
            ...data.item,
            value: data?.item?.[optionsValueKeyName ?? "id"] ?? null,
            childCount: data?.children?.length > 0 ? getChildCount(data.children) : 0,
            label: data?.item?.[optionsLabelKeyName ?? "name"] ?? null,
            optionsValueKeyName,
            optionsLabelKeyName,
            level: level,
            ...(data.children.length > 0 && { close: false })
        });

        if (data.children.length > 0) {
            let peritem = treeSelectorTransducer(data.children, optionsValueKeyName, optionsLabelKeyName, level + 1);
            for (var item2 of peritem) {
                vdom.push(item2);
            }
        }
    }
    return vdom;
}
//#endregion

//#region 表單內的下拉選單
export const TreeSelectorBase = (props) => {

    const [Options, setOptions] = useState([]);
    const [Value, setValue] = useState(null);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用
    const scrollBarRef = useRef(null);
    const selectRef = useRef(null);

    const CustomOption = ({ children, ...props }) => {
        // console.log(children, props)
        // console.log(children,)
        // console.log(`0 0 0 ${props?.data?.level * 24}px`)
        let padding = `0 0 0 ${props?.data?.level * 24 - 12}px`
        let iconLeft = `${props?.data?.level * 24 - 24}px`

        return (
            <>
                {
                    !props?.data?.hide &&
                    <components.Option {...props}>
                        {/* 重寫選項文字容器 */}
                        <Text
                            baseDefaultTheme={"DefaultTheme"}
                            className={`rewriteTextContainer`}
                            theme={{ ...iterateTheme({ ...props, padding: padding }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "rewriteTextContainer") }}
                        >
                            {/* 展開、收合圖標 */}
                            {props?.data?.childCount > 0 &&
                                <CaretDown
                                    style={{ ...iterateTheme({ ...props, iconLeft: iconLeft, close: props?.data?.close }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "rewriteCaretDownIcon")["basic"] }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOptions(o => {
                                            let optionIndex = 0; // 點擊項目 Index
                                            let optionChildCount = 0; // 點擊項目 ChildCount
                                            let optionClose; // 點擊項目 Close 
                                            for (let i = 0; i < o.length; i++) {
                                                const element = o[i];
                                                // console.log(element?.[props?.data?.optionsValueKeyName], props?.data?.[props?.data?.optionsValueKeyName])
                                                // props.optionsValueKeyName, props.optionsLabelKeyName
                                                if (element?.[props?.data?.optionsValueKeyName] === props?.data?.[props?.data?.optionsValueKeyName]) {
                                                    optionIndex = i;
                                                    optionChildCount = props?.data?.childCount;
                                                    optionClose = props?.data?.close;
                                                    break;
                                                }
                                            }

                                            // console.log(optionIndex, optionChildCount, optionClose)

                                            let cloneO = cloneDeep(o);

                                            if (optionClose) {
                                                //現在要展開項目
                                                let ReCloneO = cloneDeep(o);

                                                //#region 先將所有子層打開
                                                for (let i = optionIndex; i < ReCloneO.length; i++) {
                                                    const item = ReCloneO[i];// item

                                                    if (optionIndex === i) {
                                                        ReCloneO[i] = { ...item, close: !item?.close, hide: false };
                                                        let slicedArr = ReCloneO.silced(i + 1, i + item?.childCount);
                                                        slicedArr = slicedArr.map((it, ind) => { return { ...it, hide: ReCloneO[i].close } })
                                                        ReCloneO.replace(i + 1, slicedArr);
                                                        // console.log("處理後", item.name, slicedArr);
                                                        break;
                                                    }
                                                }
                                                //#endregion
                                                //#region 隱藏掉長輩層close為true的項目
                                                for (let i = optionIndex; i < ReCloneO.length; i++) {
                                                    const item = ReCloneO[i];// item

                                                    if (item?.close) {
                                                        //要隱藏子層
                                                        let slicedArr = ReCloneO.silced(i + 1, i + item?.childCount);
                                                        // console.log(item.name, slicedArr)
                                                        slicedArr = slicedArr.map((it, ind) => { return { ...it, hide: item?.close } })
                                                        ReCloneO.replace(i + 1, slicedArr);
                                                        // console.log("處理後", item.name, slicedArr)
                                                    }

                                                    if (i === optionIndex + props?.data?.childCount) {
                                                        break;
                                                    }
                                                }
                                                //#endregion

                                                return ReCloneO;
                                            }
                                            else {
                                                //現在要收起項目
                                                cloneO = (cloneO ?? []).map((item, index) => {

                                                    if (optionIndex === index) {
                                                        return { ...item, close: !item?.close }
                                                    }

                                                    if (optionIndex < index && index <= optionIndex + props?.data?.childCount) {
                                                        return { ...item, hide: true }
                                                    }
                                                    else {
                                                        return item;
                                                    }
                                                })
                                            }
                                            // console.log(cloneO)
                                            return cloneO
                                        });
                                    }}
                                />
                            }
                            {children}
                        </Text>
                    </components.Option>
                }
            </>
        );
    };

    useEffect(() => {
        setValue(props.value);
        // console.log("res:", treeSelectorTransducer(props.options, props.optionsValueKeyName, props.optionsLabelKeyName))
        setOptions(o =>
            [
                ...(Array.isArray(props?.addHeadOptions) ? props?.addHeadOptions : isPlainObject(props?.addHeadOptions) ? [props?.addHeadOptions] : []),
                ...treeSelectorTransducer(props.options, props.optionsValueKeyName, props.optionsLabelKeyName),
                ...(Array.isArray(props?.addTailOptions) ? props?.addTailOptions : isPlainObject(props?.addTailOptions) ? [props?.addTailOptions] : [])
            ]
        )

        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.openEye, props.value, props.onChange, props.options])

    return (
        <>
            {
                props.viewType ?
                    // 展示模式
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
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.viewTypeSelectorContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeSelectorContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeSelectorContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeSelectorEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeSelector`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeSelector") }}
                            >
                                {
                                    (Value instanceof Array) ?
                                        Value?.[0]?.label
                                        :
                                        Value?.label
                                }
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
                            className={`topLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "topLabel") }}
                        >
                            {props.topLabel}
                        </Text>
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.selectorContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`selectorContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorContainer") }}
                        >
                            {/* selector 組件 */}
                            <SelectExtend
                                ref={selectRef}
                                className={`selector`}
                                isSearchable={props?.isSearchable ?? false}
                                isClearable={props?.isClearable ?? false}
                                isMulti={props?.isMulti ?? false}
                                hideSelectedOptions={props?.hideSelectedOptions ?? (props?.isMulti ? true : false)}
                                defaultValue={props?.defaultValue}
                                options={Options ?? []}
                                // options={treeSelectorTransducer(props?.options)}
                                value={Value ?? ""}
                                isDisabled={props.disabled ?? false}
                                maxMenuHeight={props?.maxMenuHeight ?? "200px"}
                                //onChange={(e, t) => { console.log(e, t) }}
                                onChange={(values, action) => {
                                    // console.log(values);
                                    // console.log(action);
                                    setValue(values ?? []);
                                    (props?.isMulti ?
                                        props?.onChange && props.onChange(null, values ?? [], OnInitial)
                                        :
                                        props?.onChange && props.onChange(null, values, OnInitial))
                                }}
                                menuPosition={props.menuPosition ?? "fixed"} //有跑版，請傳任意值修正選單位置
                                noOptionsMessage={() => (props?.noOptionsMessage ?? "無符合資料")}
                                placeholder={props?.placeholder ?? "請選擇..."}
                                styles={{
                                    ...switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme)?.selector({ ...props, ref: selectRef })
                                }}
                                components={{ Option: CustomOption }}
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

export const TreeSelector = styled(TreeSelectorBase).attrs((props) => ({}))`

`
//#endregion