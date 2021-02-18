import React, { useContext, useState } from 'react';
import { Context } from '../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../SelfHooks/useWindowSize';

export const Contact = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [NowTab, setNowTab] = useState("長照"); // 目前預約訂車頁面
    const [Width, Height] = useWindowSize();

    return (
        <>
            {/* laptopL、laptop、tablet 共用theme */}
            {
                768 <= Width &&
                <LaptopL
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {/* {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            } */}
            {
                Width < 768 &&
                <MobileM
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
        </>
    )
}