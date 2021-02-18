export default {
    //#region 展示模式
    //#region 容器
    viewTypeContainer: {
        basic: {
            //#region SubContainer預設樣式
            flexGrow: "0",
            maxWidth: "none",
            flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            // padding: "0.5rem",
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.25)',
            //#endregion
            //#region 覆寫樣式
            padding: "0 16px 0 0",
            //#endregion
        }
    },
    //#endregion
    //#region 上標題
    viewTypeTopLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "32px",
            lineHeight: "22px",
            userSelect: "none",
            cursor: "default",
            // margin: "0 0 12px 0",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#region 輸入框本體
    viewTypeSelectorContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // height: "auto",
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.65)',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            height: "30px",
            padding: "2px",
            width: "100%",
            margin: "0 0 2px 0",
            borderBottom: "1px dashed #91D5FF",
            //#endregion
        }),
        hover: {
            //#region 覆寫樣式
            // color: '#1890ff',
            //#endregion
        },
    },
    //#endregion
    //#region 當前展示文字
    viewTypeSelector: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            // lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "22px",
            lineHeight: "22px",
            userSelect: "none",
            cursor: "default"
            //#endregion
        }
    },
    //#endregion
    //#region 下標題
    viewTypeBottomLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "0",// 自行調整
            userSelect: "none",
            cursor: "default",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#endregion

    //#region 一般編輯模式
    //#region 容器
    container: {
        basic: {
            //#region SubContainer預設樣式
            flexGrow: "0",
            maxWidth: "none",
            flexBasis: "auto",
            boxSizing: "border-box",
            occupy: (c) => ({ maxWidth: c * 100 / 12 + '%', flexBasis: c * 100 / 12 + '%' }),//調用時請使用如 ...(style.occupy(10))
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            // padding: "0.5rem",
            backgroundColor: "transparent",
            backgroundImage: "none",
            backgroundPosition: "0% 0%",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            cursor: "auto",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.25)',
            //#endregion
            //#region 覆寫樣式
            padding: "0 16px 0 0",
            //#endregion
        }
    },
    //#endregion
    //#region 上標題
    topLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "2rem",
            userSelect: "none",
            cursor: "default",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#region 輸入框本體
    selectorContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontSize: "medium",
            color: 'rgba(0, 0, 0, 0.65)',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            padding: "2px",
            width: "100%"
            //#endregion
        }),
        hover: {
            //#region 覆寫樣式
            // color: '#1890ff',
            //#endregion
        },
    },
    //#endregion
    //#region selector 組件
    selector: (props) => ({
        container: (provided, state) => {
            return {
                //#region provided
                ...provided,
                //label: "container"
                // position: "relative",
                // pointerEvents: null,
                // direction: null,
                //#endregion

                width: "100%",
                //width: "200px",
                height: props?.isMulti ? "auto" : "28px",
                lineHeight: props?.isMulti ? "initial" : "28px",
                border: "0px solid rgba(0, 0, 0 ,0 )",
                boxSizing: "border-box",
                borderRadius: "2px",
                fontSize: "0.75rem",
                outline: "none",
                boxShadow: "none",
                '&:focus': {
                    outline: "none",
                    border: "0px solid rgba(0, 0, 0 ,0 )",
                    boxShadow: "none"
                },
                '&:hover': {
                    outline: "none",
                    border: "0px solid rgba(0, 0, 0 ,0 )",
                    boxShadow: "none"
                },
            }
        },
        control: (provided, state) => {
            // console.log(provided)
            return {
                ...provided,
                boxSizing: "border-box",
                height: props?.isMulti ? "auto" : "28px",
                minHeight: props?.isMulti ? "28px" : "28px",
                lineHeight: props?.isMulti ? "auto" : "28px",
                border: state.isFocused ? "1px solid #1890ff" : "1px solid #D9D9D9",
                boxShadow: state.isFocused ? "0px 0px 0px 2px rgba(24,144,255,0.2)" : "none",
                outline: "none",
                borderRadius: "2px",
                color: state.isFocused ? "rgba(24, 144, 255, 0.86)" : "#d9d9d9",
                //boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 0, 0.65)" : "none",
                //border: "0px solid #00000000",
                // borderBottom: !state.isFocused ? "rgba(0, 0, 0, 0.65)444 1px solid" : "none",
                '&:focus': {
                    // border: "0px solid #00000000",
                    // borderBottom: !state.isFocused ? "rgba(0, 0, 0, 0.65)444 1px solid" : "none",
                    // borderRadius: state.isFocused ? "4px" : "0rem",
                    // outline: "none",
                    // border: "1px solid #1890ff",
                    // boxShadow: "0px 0px 0px 2px rgba(24,144,255,0.2)"
                },
                '&:hover': {
                    // border: "0px solid #00000000",
                    //borderBottom: !state.isFocused ? "rgba(0, 0, 0, 0.65)444 1px solid" : "none",
                    // borderRadius: state.isFocused ? "4px" : "0rem",
                    outline: "none",
                    border: "1px solid #1890ff",
                    color: "rgba(24, 144, 255, 0.86)",
                    boxShadow: state.isFocused ? "0px 0px 0px 2px rgba(24,144,255,0.2)" : "none",
                }
            }
        },
        menu: (provided, state) => {
            // console.log(props)
            // console.log(props.ref)
            // console.log(props.ref.current.select)
            //  console.log(props.ref.current.select.controlRef.getBoundingClientRect())
            //  console.log(provided)
            // let refProps = props.ref.current.props; //取得 select 的 props
            let clientWidth = props.ref.current.select.controlRef.clientWidth; // control DOM 寬度
            // let bottomTOBowser = props.ref.current.select.controlRef.getBoundingClientRect().bottom; // control DOM 至瀏覽器底部距離
            // console.log(bottomTOBowser)
            // console.log(refProps.maxMenuHeight)
            // console.log(`${-(bottomTOBowser - parseInt(refProps.maxMenuHeight, 10))}px`)
            return {
                ...provided,
                boxShadow: "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
                ...(props.menuPosition &&
                {
                    position: "fixed",
                    width: `${clientWidth}px`,
                    top: null,
                    bottom: null
                    //bottom: `${-(bottomTOBowser - parseInt(refProps.maxMenuHeight, 10))}px`
                }
                )
            }
        },
        indicatorSeparator: () => ({
            display: "none"
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: props?.isMulti ? "auto" : "28px",
            lineHeight: props?.isMulti ? "auto" : "28px",
            padding: "0 0 0 12px;"
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0px',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            //height: "28px",
            // lineHeight: "2rem",
            color: "inherit",
            padding: "0px 4px 0",
            //color: state.isFocused ? "rgba(24, 144, 255, 0.86)" : "#d9d9d9",
            transition: 'transform .2s ease',
            transform: state.isFocused ? 'rotate(-180deg)' : null,
            '&:hover': {
                color: "rgba(24, 144, 255, 0.86)",
            }
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            color: "inherit",
            height: props?.isMulti ? "calc( 28px - 2px )" : "28px",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "14px",
            marginTop: "0rem",
            marginLeft: "0rem",
            padding: "0 0 0 0px",
            color: "rgba(0, 0, 0, 0.65)"
        }),
        multiValue: (provided, state) => ({
            //容器
            ...provided,
            fontFamily: "'Noto Sans TC', sans-serif",
            fontSize: "14px",
            backgroundColor: "#f4f4f5",
            border: "1px solid #e9e9eb",
            borderRadius: "4px",
            height: "20px",
        }),
        multiValueLabel: (provided, state) => ({
            //label
            ...provided,
            fontFamily: "'Noto Sans TC', sans-serif",
            //padding: "0",
            color: "rgba(0, 0, 0, 0.65)",
            height: "20px",
            lineHeight: "20px",
            top: "-4px",
            position: "relative"
        }),
        multiValueRemove: (provided, state) => ({
            //icon
            ...provided,
            marginTop: "3px",
            marginLeft: "0rem",
            color: "#909399",
            backgroundColor: "#c0c4cc",
            border: "1px solid #e9e9eb",
            borderRadius: "8px",
            width: "0.8rem",
            height: "0.8rem",
            padding: "0",
            marginRight: "0.1rem",
            ":hover": {
                color: "#fff",
                backgroundColor: "#c0c4cc",
            }
        }),
        placeholder: (provided, state) => ({
            ...provided,
            fontFamily: "'Noto Sans TC', sans-serif",
            marginTop: "0rem",
            marginLeft: "0rem",
            fontSize: "14px",
            padding: "0 0 0 0px"
        }),
        option: (provided, { data, isDisabled, isFocused, isSelected }) => {
            // data 所有選項
            // isDisabled 是否禁用
            // isFocused 是否注焦
            // isSelected 是否被選
            //console.log(data)
            return {
                ...provided,
                height: "2rem",
                lineHeight: "2rem",
                backgroundColor: isDisabled ? null : isSelected ? "#f5f5f5" : isFocused ? "#e6f7ff" : null,
                color: isDisabled ? 'rgba(0, 0, 0, 0.45)' : isSelected ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0.65)",
                cursor: isDisabled ? 'not-allowed' : 'default',
                fontWeight: "normal",
                textAlign: "left",
                paddingTop: "0rem",
                fontSize: "14px",
                fontFamily: "'Noto Sans TC', sans-serif",
                ":hover": {
                    backgroundColor: isDisabled ? null : '#e6f7ff',
                },
            };
        },
    }),
    //#region 重寫選項文字容器
    rewriteTextContainer: {
        basic: (style, props) => ({
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            width: "auto",
            minWidth: '0',//修復滾動條 x 方向
            height: "auto",
            lineHeight: "normal",
            whiteSpace: "normal",
            // textAlign: 'initial',
            // fontSize: "medium",
            // color: '#000',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            ...style,
            display: "inline-block",
            padding: props.padding,
            color: "inherit",
            textAlign: "left",
            fontSize: "14px",
        })
    },
    //#endregion
    //#region 展開、收合圖標
    rewriteCaretDownIcon: {
        basic: (style, props) => {
            //console.log(props)
            return {
                position: "absolute",
                left: props.iconLeft,
                height: "100%",
                color: "inherit",
                transition: "transform .7s cubic-bezier(0.075, 0.82, 0.165, 1)",
                transform: props.close ? "rotate(-90deg)" : null
            }
        }
    },
    //#endregion
    //#endregion
    //#region 下標題
    bottomLabel: {
        basic: {
            //#region 基本設置
            boxSizing: "border-box",
            position: "relative",       //控制position屬性: static、relative、fixed、absolute、sticky、inherit、initial
            minWidth: '0',//修復滾動條 x 方向
            lineHeight: "normal",
            whiteSpace: "normal",
            textAlign: 'initial',
            fontFamily: `'Noto Sans TC', sans-serif`,
            fontWeight: 'normal',
            letterSpacing: 'normal',
            //#endregion
            //#region 覆寫樣式
            width: "100%",
            fontSize: "14px",
            color: " rgba(0, 0, 0, 0.85)",
            height: "0",// 自行調整
            userSelect: "none",
            cursor: "default",
            padding: "0 0 0 2px"
            //#endregion
        }
    },
    //#endregion
    //#endregion
}