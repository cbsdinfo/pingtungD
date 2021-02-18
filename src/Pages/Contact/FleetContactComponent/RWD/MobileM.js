import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/ContactPage/NoData.svg'
import { ReactComponent as Phone } from '../../../../Assets/img/ContactPage/Phone2.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const MobileMBase = (props) => {
    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { contact: { fleetContactComponent: { rwd: { mobileM } } } } } = Theme;
    const [Width, Height] = useWindowSize();

    let data = [
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        // { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },

    ]
    return (
        <>
            {data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        theme={mobileM.noDataContainer}
                    >
                        <NoData />
                    </BasicContainer>
                </>
                :
                <>
                    <Container>
                        {
                            (data).map((item, index) => {
                                return (
                                    <React.Fragment key={index}>

                                        {/* 卡片資料外層容器 */}
                                        <SubContainer
                                            theme={mobileM.cardOutContainer}
                                        >
                                            {/* 卡片資料表單區容器 */}
                                            < BasicContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={mobileM.cardContainer}
                                            >

                                                {/* 公司 容器 */}
                                                <Container
                                                    theme={mobileM.companyContainer}
                                                >
                                                    {/* 公司名稱 */}
                                                    <Text
                                                        theme={mobileM.companyName}
                                                    >
                                                        {item?.companyName}
                                                    </Text>

                                                    {/* <a href="tel:+886-2-3278918"> */}
                                                    {/* <a href="tel:+886-918837233">*/}
                                                    <a href={`tel:+886-${item?.companyPhone}` ?? "#"}>
                                                        {/* 公司電話 */}
                                                        <Text
                                                            theme={mobileM.companyPhone}
                                                        >
                                                            <Phone
                                                                style={mobileM.phoneSvg}
                                                            />
                                                            {item?.companyPhone}
                                                        </Text>
                                                    </a>

                                                    {/* 提醒 */}
                                                    <Text
                                                        theme={mobileM.tip}
                                                    >
                                                        國定假日提前預約，皆可服務，依車行調度情況。
                                            </Text>

                                                </Container>

                                                <Container>

                                                    {/* 車趟服務時間 容器 */}
                                                    <Container
                                                        theme={mobileM.carServiceTimeContainer}
                                                    >
                                                        {/* 車趟服務時間 標題 */}
                                                        <Text
                                                            theme={mobileM.carServiceTimeTitle}
                                                        >
                                                            車趟服務時間
                                                    </Text>

                                                        {([
                                                            { week: "平日", time: "08:00-18:00" },
                                                            { week: "六", time: "08:00-18:00" },
                                                            { week: "日", time: "08:00-18:00" }
                                                        ]).map((date) => {
                                                            return (
                                                                <>
                                                                    {/* 車趟服務時間 內文 */}
                                                                    {/* 車趟服務時間 星期 */}
                                                                    <Text
                                                                        theme={mobileM.carServiceWeekText}
                                                                    >
                                                                        ({date?.week})

                                                                    {/* 車趟服務時間 時段 */}
                                                                        <Text
                                                                            theme={mobileM.carServiceTimeText}
                                                                        >
                                                                            {date?.time}
                                                                        </Text>

                                                                    </Text>

                                                                </>
                                                            )
                                                        })}

                                                    </Container>


                                                    {/* 客服服務時間 容器 */}
                                                    <Container
                                                        theme={mobileM.customerServiceTimeContainer}
                                                    >
                                                        {/* 客服服務時間 */}
                                                        <Text
                                                            theme={mobileM.customerServiceTime}
                                                        >
                                                            客服服務時間
                                                </Text>

                                                        {([
                                                            { week: "一", time: "08:00-18:00" },
                                                            { week: "二", time: "08:00-18:00" },
                                                            { week: "三", time: "08:00-18:00" },
                                                            { week: "四", time: "08:00-18:00" },
                                                            { week: "五", time: "08:00-18:00" },
                                                            { week: "六", time: "08:00-18:00" },
                                                        ]).map((date) => {
                                                            return (
                                                                <>
                                                                    {/* 客服服務時間 內文 */}
                                                                    {/* 客服服務時間 星期 */}
                                                                    <Text
                                                                        theme={mobileM.customerServiceWeekText}
                                                                    >
                                                                        ({date?.week})

                                                                {/* 客服服務時間 時段 */}
                                                                        <Text
                                                                            theme={mobileM.customerServiceTimeText}
                                                                        >
                                                                            {date?.time}
                                                                        </Text>

                                                                    </Text>
                                                                </>
                                                            )
                                                        })}
                                                    </Container>

                                                </Container>
                                            </BasicContainer>
                                        </SubContainer>

                                    </React.Fragment>
                                )
                            })

                        }
                    </Container>

                    {/* 沒有更多車行 提醒 */}
                    <Text
                        theme={mobileM.noDataTip}
                    >
                        沒有更多車行
                    </Text>
                </>
            }
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`
