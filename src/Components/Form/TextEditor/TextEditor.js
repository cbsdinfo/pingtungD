import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
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

//#region 表單內的列容器
export const TextEditorBase = (props) => {

    const [Value, setValue] = useState("");
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false);
    const [Hover, setHover] = useState(false);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "italic", "underline", "strike", "blockquote",],
            [{ 'color': [] }, { 'background': [] }],
            // [{ 'align': [] }],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "background",
        "font",
        "size",
        "color",
        "align"
    ];


    // const handleProcedureContentChange = (content, delta, source, editor) => {
    //let has_attribues = delta.ops[1].attributes || "";
    //console.log(has_attribues);
    //const cursorPosition = e.quill.getSelection().index;
    // this.quill.insertText(cursorPosition, "★");
    //this.quill.setSelection(cursorPosition + 1);
    // };

    useEffect(() => {

        setValue(props.value);
        if (!isNil(props.value)) {
            props.onChange && props.onChange(null, props.value, OnInitial);
            setOnInitial(false);
        }
    }, [props.value, props.onChange])

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
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.viewTypeTextEditorContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTextEditorContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextEditorContainer") }}
                        >
                            {/* 當前展示文字 */}
                            <Text
                                {...props.viewTypeTextEditorEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeTextEditor`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextEditor") }}
                            >
                                {parse(Value ?? "")}
                            </Text>
                        </BasicContainer>
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
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.textEditorContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} textEditorContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textEditorContainer") }}
                        >
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                value={Value || ""}
                                placeholder={props.placeholder ?? "請輸入內容..."}
                                onChange={(content, delta, source, editor) => {
                                    // console.log( editor.getContents(),content, delta, source, editor);
                                    // setValue(content)
                                    // editor.getContents()
                                    props.onChange && props.onChange(null, content, OnInitial);
                                }}
                            >
                                {/* 輸入框 */}
                                <BasicContainer
                                    {...props.textEditorEvent}
                                    baseDefaultTheme={"DefaultTheme"}
                                    className={`${props.className} textEditor`}
                                    theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "textEditor") }}
                                >

                                </BasicContainer>
                            </ReactQuill>
                        </BasicContainer>
                        {/* 下標題 */}
                    </SubContainer >
            }
        </>
    )
}

export const TextEditor = styled(TextEditorBase).attrs((props) => ({}))`

`
//#endregion