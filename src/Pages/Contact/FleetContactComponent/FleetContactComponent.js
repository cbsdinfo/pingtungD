import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';

export const FleetContactComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;

    const [Width, Height] = useWindowSize();

    return (
        <>
            {/* laptopL、laptop、tablet 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                />
            }
        </>
    )
}

