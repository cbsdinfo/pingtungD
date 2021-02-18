import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
//#region 擴充基本樣式區
import DefaultTheme from './Theme/DefaultTheme'
import PrimaryTheme from './Theme/PrimaryTheme'
import DisableTheme from './Theme/DisableTheme'
import SecondaryTheme from './Theme/SecondaryTheme'
import { BasicContainer } from '../Containers/BasicContainer';
import { iterateTheme } from '../../Handlers/ThemeHandler';
import { Transfer as TransferA } from 'antd';
import { Text } from '../Texts/Text/Text';
import { isNil } from 'lodash';
//#endregion

//#region 切換預設樣式
const switchDefaultTheme = (themeName) => {
    switch (themeName) {
        case "SecondaryTheme":
            return SecondaryTheme;
        case "DisableTheme":
            return DisableTheme;
        case "PrimaryTheme":
            return PrimaryTheme;
        default:
            return DefaultTheme;
    }
}
//#endregion

//#region Dropdown Extend antd
const TransferExtend = styled(TransferA).attrs((props) => ({}))`

& .ant-dropdown-trigger {
    display: none;
}

& .ant-transfer-operation .ant-btn:not([disabled]):first-child {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
}

`
//#endregion

//#region Transfer 
const TransferBase = (props) => {

    // const [UpdateComponent, setUpdateComponent] = useState(false);
    const [RightKeys, setRightKeys] = useState([]); // 右方穿梭框 id 集合

    useEffect(() => {
        setRightKeys(props.rightKeys);

        if (!isNil(props.rightKeys)) {
            props?.onChange && props.onChange(props.rightKeys ?? [])
        }

    }, [props.rightKeys, props.data, props.onChange])

    const handleChange = (allRIghtKeys, way, thisTimeKey) => {
        // console.log(allRIghtKeys, way, thisTimeKey)
        setRightKeys(allRIghtKeys);
    };

    return (
        <>
            <TransferExtend

                dataSource={props.data}
                showSearch
                listStyle={{
                    width: 250,
                    height: 300,
                }}
                locale={{
                    itemUnit: "項",
                    itemsUnit: "項",
                    searchPlaceholder: "請輸入站牌",
                    notFoundContent: props?.noDataMessage ?
                        props.noDataMessage
                        :
                        (
                            <Text
                                baseDefaultTheme={"DefaultTheme"}
                                theme={{ ...iterateTheme({ ...props, height: "auto" }, props.theme, switchDefaultTheme(props.baseDefaultTheme), "noDataMessage") }}
                            >
                                查無資料
                                <div className={"ant-pagination"} style={{ height: "32px", margin: "16px" }} />
                            </Text>
                        ),
                    remove: '刪除',
                    selectCurrent: '全選當頁',
                    removeCurrent: '刪除當頁',
                    selectAll: '全選所有',
                    removeAll: '刪除全部',
                    selectInvert: '反選當頁'
                }}
                titles={props.titlesName ?? ['可用站牌', '已使用站牌']}
                operations={props.operationName ?? ['新增', '刪除']}
                targetKeys={RightKeys}
                onChange={(allRIghtKeys, way, thisTimeKey) => {
                    handleChange(allRIghtKeys, way, thisTimeKey);
                    props?.onChange && props.onChange(allRIghtKeys, way, thisTimeKey)
                }}
                render={item => `${item[props.itemNameKey ?? "title"]}`}

            // footer={this.renderFooter}
            />
        </>
    )
}
//#endregion


export const Transfer = styled(TransferBase).attrs((props) => ({}))`

`