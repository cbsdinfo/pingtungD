import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SubContainer } from '../../Containers/SubContainer';
import { iterateTheme } from '../../../Handlers/ThemeHandler';
import { isNil } from 'lodash/lang'
import { NativeTextInput } from '../NativeTextInput/NativeTextInput';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Eye } from './Assets/img/Eye.svg'
import { ReactComponent as Pic } from './Assets/img/Pic.svg'
import { ReactComponent as EyeInvisible } from './Assets/img/EyeInvisible.svg'
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
// import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import { BasicContainer } from '../../Containers/BasicContainer';
import { Text } from '../../Texts/Text/Text';
import { Upload as UploadOld } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { modalsService } from '../../Modal/Modals/Modals';
import { cssifyObject } from 'css-in-js-utils';
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

//#region 繼承 UploadOld 組件 待修改
const UploadOldExtend = styled(UploadOld).attrs((props) => ({}))`

&& .ant-upload.ant-upload-select-picture-card {
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "fileInput")['basic']))}  
}

&& .ant-upload.ant-upload-select-picture-card:hover {
    ${props => (cssifyObject(iterateTheme({ ...props, fatherHeight: props.fatherHeight, tableHeaderHeight: props.tableHeaderHeight, pageFootHeight: props.pageFootHeight }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "fileInput")['hover']))}  
}

`
//#region 

//#region 讀取檔案
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
//#endregion

//#region 檢查檔案格式、大小
const beforeUpload = (file, acceptFileType, acceptFileSize) => {
    let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (acceptFileType) {
        isJpgOrPng = acceptFileType.includes(file.type);
    }

    if (!isJpgOrPng) {
        modalsService.infoModal.error({
            iconRightText: "上傳檔案格式錯誤。",
            yes: true,
            yesText: "確認",
            // no: true,
            // autoClose: true,
            backgroundClose: false,
            yesOnClick: (e, close) => {
                close();
            }
        })
    }

    let isLt10M = file.size / 1024 / 1024 < 10;

    if (acceptFileSize) {
        isLt10M = file.size / 1024 / 1024 < acceptFileSize;
    }

    if (!isLt10M) {
        modalsService.infoModal.error({
            iconRightText: `上傳檔案大小上限為 ${acceptFileSize ?? 10}MB。`,
            yes: true,
            yesText: "確認",
            // no: true,
            // autoClose: true,
            backgroundClose: false,
            yesOnClick: (e, close) => {
                close();
            }
        })
    }

    return isJpgOrPng && isLt10M;
}
//#endregion

//#region 表單內的列容器
export const UploadBase = (props) => {

    const [Loading, setLoading] = useState(false);
    const [ImageUrl, setImageUrl] = useState(null);
    // const [Value, setValue] = useState("");
    const [OnInitial, setOnInitial] = useState(true); // 用於 onChange 中 初始渲染與 後續選染動作不同時
    const [Focus, setFocus] = useState(false);
    const [Hover, setHover] = useState(false);

    useEffect(() => {
        setImageUrl(props.imageUrl);
        if (!isNil(props.imageUrl)) {
            props.onChange && props.onChange(null, props?.acceptFileType, props.imageUrl, OnInitial);
            setOnInitial(false);
        }
    }, [props.openEye, props.imageUrl, props.acceptFileType, props.onChange])


    //#region 輸入框值變動時 處發函數
    const handleChange = (info, acceptFileType) => {
        //#region 如果有要走預設的Request
        // if (info.file.status === 'uploading') {
        //     setLoading(true);
        //     return;
        // }
        // if (info.file.status === 'done') {
        //     // Get this url from response in real world.
        //     getBase64(info.file.originFileObj, imageUrl => {
        //         setLoading(false);
        //         setImageUrl(imageUrl);
        //     }
        //     );
        // }
        //#endregion

        // console.log(info)

        if (beforeUpload(info.file, acceptFileType)) {

            //#region // 如果有打API 應該由API內部調用
            if (props?.uploadAPI) {
                if (!Loading) {
                    getBase64(info.file.originFileObj, imageUrl => {
                        setImageUrl(imageUrl);
                    });
                }
            }
            //#endregion
            //#region 非透過API，直接顯示圖片
            else {
                getBase64(info.file.originFileObj, imageUrl => {
                    setLoading(false);
                    setImageUrl(imageUrl);
                });
            }
            //#endregion
        }
    };
    //#endregion

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
                            {...props.viewTypeTextInputContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} viewTypeTextInputContainer`}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeTextInputContainer") }}
                        >
                            {/* 當前展示圖片 */}
                            <Text
                                {...props.viewTypeFileInputEvent}
                                baseDefaultTheme={"DefaultTheme"}
                                className={`${props.className} viewTypeFileInput`}
                                theme={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypeFileInput") }}
                            >
                                {/* 預覽圖片 Img DOM */}
                                {ImageUrl && <img onDragStart={(e) => { e.preventDefault() }} src={ImageUrl} alt="上傳圖片" style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "viewTypePreview")["basic"] }} />}

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
                        {/* 輸入框本體 */}
                        <BasicContainer
                            {...props.uploadContainerEvent}
                            baseDefaultTheme={"DefaultTheme"}
                            className={`${props.className} uploadContainer`}
                            onMouseOver={(e) => { setHover(true); props.onMouseover && props.onMouseover(e); }}
                            onMouseOut={(e) => { setHover(false); props.onMouseout && props.onMouseout(e); }}
                            onFocus={(e) => { setFocus(true); props.onFocus && props.onFocus(e); }}
                            onBlur={(e) => { setFocus(false); props.onBlur && props.onBlur(e); }}
                            theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "uploadContainer") }}
                        >
                            {/* fileInput */}
                            <UploadOldExtend
                                name={props?.name ?? "上傳圖片"}
                                listType="picture-card"
                                className="avatar-uploader"
                                customRequest={(infos) => { props?.uploadAPI ? props.uploadAPI(infos, () => { setLoading(false) }) : infos.onSuccess(null, infos.file) }}
                                showUploadList={false}
                                beforeUpload={(file) => { props?.beforeUpload ? props.beforeUpload(file, props?.acceptFileType, props?.acceptFileSize) : beforeUpload(file, props?.acceptFileType, props?.acceptFileSize) }}
                                onChange={(info) => { props?.onChange && props.onChange(info, props?.acceptFileType, props.imageUrl, OnInitial); handleChange(info, props?.acceptFileType) }}
                            >
                                {/* 預覽圖片 Img DOM */}
                                {ImageUrl && <img onDragStart={(e) => { e.preventDefault() }} src={ImageUrl} alt="上傳圖片" style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "preview")["basic"] }} />}

                                {/* 上傳圖片遮罩 */}
                                <BasicContainer
                                    theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover, imageUrl: ImageUrl }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "uploadImgContainer") }}
                                >
                                    {/* 上傳照片圖標 */}
                                    {Loading ? <LoadingOutlined /> : <Pic style={{ ...iterateTheme(props, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "picIcon")["basic"] }} />}
                                    {/* 上傳圖片文字 */}
                                    <Text
                                        baseDefaultTheme={"DefaultTheme"}
                                        theme={{ ...iterateTheme({ ...props, focus: Focus, hover: Hover }, props.theme, switchDefaultTheme(props.disable ? "DisableTheme" : props.baseDefaultTheme), "uploadImgText") }}
                                    >
                                        上傳照片
                                    </Text>
                                </BasicContainer>
                            </UploadOldExtend>
                            {props.children}
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

export const Upload = styled(UploadBase).attrs((props) => ({}))`

`
//#endregion
