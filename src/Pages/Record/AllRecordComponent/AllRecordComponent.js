import React, { useContext, useState } from 'react';
import { Context } from '../../../Store/Store'
import { SubContainer, globalContextService, Text, FormContainer, FormRow, TextInput } from '../../../Components';
import { LaptopL } from './RWD/LaptopL';
// import { Laptop } from './RWD/Laptop';
import { MobileM } from './RWD/MobileM';
import { Tablet } from './RWD/Tablet';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual } from 'lodash';

export const AllRecordComponent = (props) => {

    const { APIUrl, Theme, Switch } = useContext(Context);
    //const { pages: { login } } = Theme;

    const [Width, Height] = useWindowSize();
    return (
        <>

            {/* {console.log("out")}
            {console.log(globalContextService.get("RecordPage", "OrderTime"))} */}
            {
                1024 <= Width &&
                <LaptopL
                    data={props.data} // 搭乘紀錄
                    nowTab={props.nowTab} // 目前搭乘紀錄頁面
                    GetRecordsExecute={props.GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={props.GetRecordsPending}
                />
            }
            {/* {
                (1024 <= Width && Width < 1440) &&
                <Laptop
                />
            } */}
            {
                (768 <= Width && Width < 1024) &&
                <Tablet
                    data={props.data} // 搭乘紀錄
                    nowTab={props.nowTab} // 目前搭乘紀錄頁面
                    GetRecordsExecute={props.GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={props.GetRecordsPending}
                />
            }
            {
                Width < 768 &&
                <MobileM
                    data={props.data} // 搭乘紀錄
                    nowTab={props.nowTab} // 目前搭乘紀錄頁面
                    GetRecordsExecute={props.GetRecordsExecute} // 取得用戶各種訂單紀錄資料
                    GetRecordsPending={props.GetRecordsPending}
                />
            }
        </>
    )
}

