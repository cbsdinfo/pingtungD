import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../../Store/Store'
import styled from 'styled-components';
import { MainPageContainer } from '../../../../ProjectComponent';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { login: { rwd: { mobileM } } } } = Theme;

    return (
        <>
            <MainPageContainer>
                目前尚無設計稿
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
