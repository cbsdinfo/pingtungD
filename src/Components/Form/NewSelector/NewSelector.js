import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil, toString } from 'lodash/lang'
import { omit } from 'lodash/object'
import { Select as SelectExtend } from 'antd';
import locale from 'antd/es/locale/en_US'; //zh_CN zh_TW en_US
import moment from 'moment';
import 'moment/locale/zh-tw'; //日期名包
import { useLocation } from 'react-router-dom';
import { ReactComponent as Arrow } from './Assets/img/Arrow.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import { cssifyObject } from 'css-in-js-utils';
import { globalContextService } from '../../../Store/GlobalContext';
import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
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

//#region 文字
let { DatePicker: datePicker, TimePicker: timePicker } = locale
datePicker = {
    lang: {
        ...datePicker.lang,
        backToToday: "返回今天",
        clear: "清除",
        dateFormat: "YYYY年M月D日",
        dateSelect: "選擇日期",
        dateTimeFormat: "YYYY年M月D日 HH時mm分ss秒",
        dayFormat: "D日",
        decadeSelect: "選擇年代",
        locale: "zh_CN",
        month: "月",
        monthPlaceholder: "請選擇年月份",
        monthSelect: "選擇月份",
        nextCentury: "下一世紀",
        nextDecade: "下一年代",
        nextMonth: "下個月 (翻頁下鍵)",
        nextYear: "下一年 (Control鍵加右方向鍵)",
        now: "此刻",
        ok: "確 定",
        placeholder: "請選擇日期",
        previousCentury: "上一世紀",
        previousDecade: "上一年代",
        previousMonth: "上個月 (翻頁上鍵)",
        previousYear: "上一年 (Control鍵加左方向鍵)",
        quarterPlaceholder: "請選擇季度",
        rangeMonthPlaceholder: ["開始月份", "結束月份"],
        rangePlaceholder: ["開始日期", "結束日期"],
        rangeWeekPlaceholder: ["開始週", "結束週"],
        rangeYearPlaceholder: ["開始年份", "結束年份"],
        timeSelect: "選擇時間",
        today: "今天",
        weekPlaceholder: "請選擇週",
        weekSelect: "選擇週",
        year: "年",
        yearFormat: "YYYY年",
        yearPlaceholder: "請選擇年份",
        yearSelect: "選擇年份",
    },
    timePickerLocale: {
        ...timePicker,
        placeholder: "請選擇時間",
        rangePlaceholder: ["開始時間", "結束時間"]
    }
}

//#endregion

//#region 下拉選單
const SelectExtendStyle = styled(SelectExtend).attrs((props) => ({}))`

&& .ant-select-selector {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorSubContainer")['basic']))}  
}

&.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorSubContainer")['hover']))}    
}

&.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorSubContainer")['focus']))}    
}

&& span.ant-select-selection-search {
    input {
        ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorPickerInput")['basic']))};  
        height: 100% !important;
        cursor: default !important;
    }
}

&& span.ant-select-selection-placeholder {
    line-height: 26px;
    cursor: default;
    color: #808080;
    opacity: 1;
}

&& span.ant-select-selection-item {
    line-height: 26px;
    cursor: default;
    transition: none;
    color: rgba(0, 0, 0, 0.65);
    opacity: 1;
}

&&.ant-select-multiple .ant-select-selector {
    height: auto;
}

&&.ant-select-multiple .ant-select-selection-item {
    height: 20px;
    line-height: 18px;
}

&&.ant-select-multiple .ant-select-selector::after {
    margin: 0px 0;
}

&& span.ant-select-arrow {
    // color: inherit;
}

&& span.ant-select-arrow svg {
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorSubContainer")['icon']))}    
}

`
//#endregion

//#region 新式下拉選單
export const NewSelectorBase = (props) => {

    const [Value, setValue] = useState(null);
    const [DefaultValue, setDefaultValue] = useState(undefined);
    const [ViewTypeValue, setViewTypeValue] = useState(null);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用
    const [DateTimeContainerRefWidth, setDateTimeContainerRefWidth] = useState(null);
    const [TimeRefWidth, setTimeRefWidth] = useState(null);

    const DateRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        let paddingLeftRight = 0;

        if (DateRef?.current) {
            paddingLeftRight = parseInt(window.getComputedStyle(DateRef?.current)['padding-left'], 10) + parseInt(window.getComputedStyle(DateRef?.current)['padding-right'], 10)
        }
        //getBoundingClientRect
        //getClientRects
        setDateTimeContainerRefWidth(DateRef?.current?.clientWidth - paddingLeftRight)
        // setTimeRefWidth(TimeRef?.current?.pickerRef?.current?.clientWidth) //看Ref都有些什麼
    })

    useEffect(() => {
        if (isArray(props.value)) {
            setValue((props.value.map((item) => item.value)));
        }
        else if (isPlainObject(props.value)) {
            setValue(props.value.value);
        }
        else {
            setValue(props.value ?? undefined);
        }

        if (!isNil(props.value)) {
            setViewTypeValue(props.value)
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])
    // console.log(DateTimeContainerRefWidth, TimeRefWidth)

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
                            {...props.viewTypeDateTimePickerContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeDateTimePickerContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeDateTimePickerContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeDateTimePickerEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeDateTimePicker`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeDateTimePicker") }}
                            >
                                {
                                    (ViewTypeValue instanceof Array) ?
                                        ViewTypeValue?.[0]?.label
                                        :
                                        ViewTypeValue?.label
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
                            className={`${props.className} topLabel`}
                            theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "topLabel") }}
                        >
                            {props.topLabel}
                        </Text>
                        {/* 下拉框本體 */}
                        <BasicContainer
                            {...props.selectorContainerEvent}
                            ref={DateRef}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} selectorContainer`}
                            // onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                            // onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                            // onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                            // onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "selectorContainer") }}
                        >
                            {/* DatePicker */}
                            <SelectExtendStyle
                                ref={selectRef}
                                className={`newSelector`}
                                showSearch={props?.isSearchable ?? false} // 僅支持單選模式禁用搜尋，多選一律開放
                                showArrow={true} // 是否顯示 ICON
                                allowClear={props?.isClearable ?? false}
                                mode={props?.isMulti ? "multiple" : undefined} //  multiple | tags
                                // hideSelectedOptions={props?.hideSelectedOptions ?? (props?.isMulti ? true : false)} // 暫不支援此功能
                                defaultValue={props?.defaultValue} // 吃的不是物件，是value id 陣列 defaultValue={['a10', 'c12']} 或 id
                                options={props?.options && props.options.map((item) => ({ disabled: item?.isDisabled, ...omit(item, ["isDisabled"]) }))}   // [{value:"",label:"",isDisabled:true}]  disabled
                                filterOption={(input, option) => {
                                    // console.log(input, option);
                                    return (toString(option.value).toLowerCase().indexOf(input.toLowerCase()) >= 0) || (toString(option.label).toLowerCase().indexOf(input.toLowerCase()) >= 0);
                                }}

                                value={Value} // 吃的不是物件，是value id 陣列 defaultValue={['a10', 'c12']} 或 id
                                disabled={props.disabled ?? false}
                                style={{ width: "100%" }}
                                listHeight={props?.maxMenuHeight ?? 320}
                                //onChange={(e, t) => { console.log(e, t) }}
                                onChange={(justValue, values, action) => {
                                    // console.log(values);
                                    // console.log(action);
                                    setValue(justValue);
                                    setViewTypeValue(values);
                                    (props?.isMulti ?
                                        props?.onChange && props.onChange(null, values, OnInitial)
                                        :
                                        props?.onChange && props.onChange(null, values, OnInitial))
                                }}
                                notFoundContent={
                                    (props?.noOptionsMessage ??
                                        <div style={{
                                            fontFamily: `'Noto Sans TC', sans-serif`,
                                            fontWeight: 'normal',
                                            textAlign: "center",
                                            color: "#999999",
                                            fontSize: "12px",
                                            cursor: "default"
                                        }}>
                                            無符合資料
                                        </div>
                                    )}
                                suffixIcon={<Arrow style={{
                                    position: "relative",
                                    top: "-4px",
                                    color: (Hover || Focus) ? "rgba(24,144,255,0.86)" : "rgb(217, 217, 217)",
                                    transition: 'transform .2s ease',
                                    transform: Focus ? 'rotate(-180deg)' : null

                                }} />}
                                placeholder={props?.placeholder ?? "請選擇..."}
                                transitionName="" //取消動畫
                                onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                                onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                                onMouseEnter={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                                onMouseLeave={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                                focus={Focus ? 1 : 0}
                                hover={Hover ? 1 : 0}
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

export const NewSelector = styled(NewSelectorBase).attrs((props) => ({}))`

`
//#endregion