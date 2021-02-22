import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { DatePicker as DatePickerExtend, TimePicker as TimePickerExtend } from 'antd';
import locale from 'antd/es/locale/en_US'; //zh_CN zh_TW en_US
import moment from 'moment';
import 'moment/locale/zh-tw'; //日期名包
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'

import Date from './Assets/img/Date.png';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import { cssifyObject } from 'css-in-js-utils';
import { globalContextService } from '../../../Store/GlobalContext';
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

//#region 日期選擇選單
const DatePickerExtendStyle = styled(DatePickerExtend).attrs((props) => ({}))`

//#region dateTimePickerSubContainer 日期選擇框 次容器
&.ant-picker {
    padding: 4px 11px 4px 27px;
    border: 1px solid #fff;
    border-radius: 4px;
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "dateTimePickerSubContainer")['basic']))}  
}
//#endregion

//#region 修改右方 Icon 樣式 (不開放)
& .ant-picker-input {
    color: inherit;
    transition: none;

    //#region dateTimePickerInput 日期選擇框 的 Input
    input {
        ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover, disable: props.disable }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "dateTimePickerInput")['basic']))}  
    }
    //#endregion
}

& .ant-picker-input:before {
    content: ${props => `"${props.rightText}"`};
    position: absolute;
    right: 0;
    color: black;
}

& .ant-picker-input:after {
    content: ${props => ` url(${Date})`};
    position: absolute;
    color: black;
    left: -24px;
    top: 0px;
}

&& .ant-picker-suffix {
    color: inherit;
    transition: none;
    display: none; //close icon
}

//#endregion

//#region 是否開啟清除功能
&& .ant-picker-clear {
    transition: none;
    ${props => props.canClear ? "right: 24px;" : "display:none;"}
}
//#endregion

`
//#endregion

//#region 時間選擇選單
const TimePickerExtendStyle = styled(TimePickerExtend).attrs((props) => ({}))`

//#region dateTimePickerSubContainer 日期選擇框 次容器
&.ant-picker {
    padding: 4px 11px 4px 27px;
    border: 1px solid #fff;
    border-radius: 4px;
    ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "dateTimePickerSubContainer")['basic']))}  
}
//#endregion

//#region 修改右方 Icon 樣式 (不開放)
&& .ant-picker-input {
    color: inherit;
    transition: none;

    //#region dateTimePickerInput 日期選擇框 的 Input
    input {
        ${props => (cssifyObject(iterateTheme({ ...props, focus: props.focus, hover: props.hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "dateTimePickerInput")['basic']))}  
    }
    //#endregion
}
& .ant-picker-input:before {
    content: ${props => `"${props.rightText}"`};
    position: absolute;
    right: 0;
    color: black;
}

& .ant-picker-input:after {
    content: ${props => ` url(${Date})`};
    position: absolute;
    color: black;
    left: -24px;
    top: 0px;
}

&& .ant-picker-suffix {
    color: inherit;
    transition: none;
    display: none; //close icon
}


//#endregion

//#region 是否開啟清除功能
&& .ant-picker-clear {
    transition: none;
    ${props => props.canClear ? "right: 24px;" : "display:none;"}
}
//#endregion

`
//#endregion

function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

//#region 表單內的勾選框
export const DateTimePickerBase = (props) => {

    const [Value, setValue] = useState(null);
    const [DefaultValue, setDefaultValue] = useState(null);
    const [ViewTypeValue, setViewTypeValue] = useState(null);
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false); // 本組件不使用
    const [Hover, setHover] = useState(false); // 本組件不使用
    const [DateTimeContainerRefWidth, setDateTimeContainerRefWidth] = useState(null);
    const [TimeRefWidth, setTimeRefWidth] = useState(null);

    const DateRef = useRef();
    const TimeRef = useRef();

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
        //  console.log("props", props.value,moment.isMoment(props.value),moment(Value))
        let momentParse = null;
        if (moment.isMoment(props.value)) {
            setValue(moment(props.value));

            switch (props.type) {
                case "time":
                    momentParse = moment(props.value).format(props.format ?? "HH:mm");
                    setViewTypeValue(moment(props.value).format(props.format ?? "HH:mm"));
                    break;
                case "date":
                    momentParse = moment(props.value).format(props.format ?? "YYYY-MM-DD");
                    setViewTypeValue(moment(props.value).format(props.format ?? "YYYY-MM-DD"));
                    break;
                case "week":
                    momentParse = `${moment(props.value).format(props.format ?? "YYYY")}-${moment(props.value).week()}週`;
                    setViewTypeValue(`${moment(props.value).format(props.format ?? "YYYY")}-${moment(props.value).week()}週`);
                    break;
                case "month":
                    momentParse = moment(props.value).format(props.format ?? "YYYY-MM");
                    setViewTypeValue(moment(props.value).format(props.format ?? "YYYY-MM"));
                    break;
                case "quarter":
                    momentParse = `${moment(props.value).format(props.format ?? "YYYY")}-Q${moment(props.value).quarter()}`;
                    setViewTypeValue(`${moment(props.value).format(props.format ?? "YYYY")}-Q${moment(props.value).quarter()}`);
                    break;
                case "year":
                    momentParse = moment(props.value).format(props.format ?? "YYYY");
                    setViewTypeValue(moment(props.value).format(props.format ?? "YYYY"));
                    break;

                default:
                    momentParse = moment(props.value).format(props.format ?? "YYYY-MM-DD");
                    setViewTypeValue(moment(props.value).format(props.format ?? "YYYY-MM-DD"));
                    break;
            }

        } else {
            setValue(null); // 非moment格式皆設為null
        }

        if (!isNil(props.value)) {
            props.onChange && props.onChange(momentParse, props.value, OnInitial); // value momentObj OnInitial
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
                        {/* 日期選擇框本體 */}
                        <BasicContainer
                            {...props.dateTimePickerContainerEvent}
                            ref={DateRef}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} dateTimePickerContainer`}
                            onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                            onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                            onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                            onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "dateTimePickerContainer") }}
                        >
                            {props.type !== "time" ?
                                <>
                                    {/* DatePicker */}
                                    < DatePickerExtendStyle
                                        rightText={props?.rightText ?? ""}
                                        ref={TimeRef}
                                        //onChange={(e) => { setChecked(c => !c); props.onChange && props.onChange(e, e.target.checked, OnInitial); }}
                                        disabled={props.disable ?? false}
                                        disable={props.disable ?? false} //供判斷
                                        focus={Focus}
                                        hover={Hover}
                                        canClear={props.canClear ?? false}
                                        picker={props.type ?? "date"} //date、week、month、quarter、year
                                        placeholder={props.placeholder} // 具locale預設值
                                        popupStyle={{ width: DateTimeContainerRefWidth, minWidth: "276px", padding: "4px 0 0" }}
                                        transitionName="" //取消動畫
                                        {...((props.type ?? "date") === "date" && {
                                            showToday: props.showToday ?? false,
                                            renderExtraFooter: props.extraFooter // 傳送 type參數
                                        })}
                                        {...(props.type === "week" && {
                                            renderExtraFooter: props.extraFooter
                                        })}
                                        {...(props.type === "month" && {
                                            renderExtraFooter: props.extraFooter
                                        })}
                                        {...(props.type === "quarter" && {
                                            renderExtraFooter: props.extraFooter
                                        })}
                                        {...(props.type === "year" && {
                                            renderExtraFooter: props.extraFooter
                                        })}

                                        locale={{
                                            ...datePicker
                                        }}
                                        defaultValue={moment.isMoment(props.value) ? moment(props.value) : null}
                                        // value={moment.isMoment(Value) ? moment(Value) : null}
                                        value={Value}
                                        onChange={(momentObj, value) => {
                                            // console.log("ONCG", value, momentObj, OnInitial)
                                            props?.onChange && props.onChange(value, momentObj, OnInitial) // 外部接收 值 再接收moment，相反
                                            setValue(momentObj);
                                            setViewTypeValue(value)
                                        }}
                                        disabledDate={props?.disabledDate}
                                        disabledTime={props?.disabledTime}
                                        theme={props.theme}
                                    />
                                </>
                                :
                                <>
                                    {/* TimePicker */}
                                    <TimePickerExtendStyle
                                        rightText={props?.rightText ?? ""}
                                        //onChange={(e) => { setChecked(c => !c); props.onChange && props.onChange(e, e.target.checked, OnInitial); }}
                                        disabled={props.disable ?? false}
                                        disable={props.disable ?? false} //供判斷
                                        focus={Focus}
                                        hover={Hover}
                                        canClear={props.canClear ?? false}
                                        picker={props.type ?? "time"} //time
                                        placeholder={props.placeholder} // 具locale預設值
                                        popupStyle={{ width: DateTimeContainerRefWidth, minWidth: "276px", padding: "4px 0 0" }}
                                        transitionName="" //取消動畫
                                        renderExtraFooter={props.extraFooter}  // 傳送 type參數
                                        format={props.format ?? "HH:mm"} // HH:mm:ss
                                        hourStep={props.hourStep}
                                        minuteStep={props.minuteStep}
                                        secondStep={props.secondStep}
                                        locale={{
                                            ...datePicker
                                        }}
                                        defaultValue={moment.isMoment(props.value) ? moment(props.value) : null}
                                        // value={moment.isMoment(Value) ? moment(Value) : null}
                                        value={Value}
                                        onChange={(momentObj, value) => {
                                            // console.log(value, momentObj, OnInitial)
                                            props?.onChange && props.onChange(value, momentObj, OnInitial) // 外部接收 值 再接收moment，相反
                                            setValue(momentObj);
                                            setViewTypeValue(value)
                                        }}
                                        disabledHours={props?.disabledHours && props.disabledHours(range)}
                                        disabledMinutes={props?.disabledMinutes && props.disabledMinutes(range)}
                                        disabledSeconds={props?.disabledSeconds && props.disabledSeconds(range)}
                                        hideDisabledOptions={props?.hideDisabledOptions ?? true}
                                        theme={props.theme}
                                    />
                                </>
                            }
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

export const DateTimePicker = styled(DateTimePickerBase).attrs((props) => ({}))`

`
//#endregion