import React, { useContext, useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../Store/Store'
import { MainPageContainer } from '../../ProjectComponent';
import { useAsync } from '../../SelfHooks/useAsync';
import { getItemLocalStorage } from '../../Handlers';
import { Result } from 'antd';

export const Error404 = (props) => {

    const { APIUrl, APIAppKey, Theme } = useContext(Context);
    const { } = Theme;

    return (
        <>
            <MainPageContainer
            // theme={{
            //     tabletOutContainer: {
            //         basic: (style) => {
            //             console.log(style)
            //             return {
            //                 ...style,
            //                 background: "red"
            //             }
            //         }
            //     }
            // }}
            >
                <Result
                    status="404"
                    title="404"
                    subTitle="很抱歉，本頁面不存在，或您沒有權限瀏覽此頁面"
                // extra={<Button type="primary">Back Home</Button>}
                />

            </MainPageContainer>
        </>
    )
}