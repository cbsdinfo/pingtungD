import React, { useContext, useState } from 'react';
import { Context } from '../../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../../../Components';
import { LaptopL } from './RWD/LaptopL';
import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

export const CaseOrderView = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;
    const [WhichForm, setWhichForm] = useState("Login"); // 切換 登入、忘記密碼、設定登入密碼 表單
    const [SendedAuthCode, setSendedAuthCode] = useState(false); // 紀錄是否已經發送過驗證碼 (要不要顯示重新發送驗證碼)
    const [WaitSecToZero, setWaitSecToZero] = useState(true); // 控制驗證碼倒數
    const [NowTab, setNowTab] = useState("車行公告"); // 目前公告頁面
    const [Width, Height] = useWindowSize();

    return (
        <>
            {
                1440 <= Width &&
                <LaptopL
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    WhichForm={WhichForm}
                    setWhichForm={setWhichForm}
                    SendedAuthCode={SendedAuthCode}
                    setSendedAuthCode={setSendedAuthCode}
                    WaitSecToZero={WaitSecToZero}
                    setWaitSecToZero={setWaitSecToZero}
                    nowTab={NowTab}
                    setNowTab={setNowTab}
                />
            }
        </>
    )
}