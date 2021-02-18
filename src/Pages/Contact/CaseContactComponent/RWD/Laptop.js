import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/ContactPage/NoData.svg'
import { ReactComponent as Phone } from '../../../../Assets/img/ContactPage/Phone.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';


const LaptopBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { contact: { caseContactComponent: { rwd: { laptop } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件

    let history = useHistory()

    let data = [
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00", carServiceTimeTip: "國定假日提前預約，皆可服務，依車行調度情況" },

    ]

    return (
        <>
            {data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        theme={laptop.noDataContainer}
                    >
                        <NoData style={laptop.noDataSvg} />
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
                                            theme={laptop.cardOutContainer}
                                        >
                                            {/* 卡片資料表單區容器 */}
                                            < BasicContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptop.cardContainer}
                                            >

                                                {/* 公司 容器 */}
                                                <Container
                                                    theme={laptop.companyContainer}
                                                >
                                                    {/* 公司名稱 */}
                                                    <Text
                                                        theme={laptop.companyName}
                                                    >
                                                        {item?.companyName}
                                                    </Text>

                                                    {/* 公司電話 */}
                                                    <Text
                                                        theme={laptop.companyPhone}
                                                    >
                                                        <Phone
                                                            style={laptop.phoneSvg}
                                                        />
                                                        {item?.companyPhone}
                                                    </Text>

                                                </Container>

                                                <Container>

                                                    {/* 車趟服務時間 容器 */}
                                                    <Container
                                                        theme={laptop.carServiceTimeContainer}
                                                    >
                                                        {/* 車趟服務時間 標題 */}
                                                        <Text
                                                            theme={laptop.carServiceTimeTitle}
                                                        >
                                                            車趟服務時間
                                                    </Text>

                                                        {/* 車趟服務時間 內文 */}
                                                        {/* 車趟服務時間 星期 */}
                                                        <Text
                                                            theme={laptop.carServiceWeekText}
                                                        >
                                                            {item?.carServiceWeek}
                                                            {/* 車趟服務時間 時段 */}
                                                            <Text
                                                                theme={laptop.carServiceTimeText}
                                                            >
                                                                {item?.carServiceTime}
                                                            </Text>
                                                        </Text>

                                                        {/* 車趟服務時間 通知 */}
                                                        <Text
                                                            theme={laptop.carServiceTimeTip}
                                                        >
                                                            {item?.carServiceTimeTip}
                                                        </Text>

                                                    </Container>


                                                    {/* 客服服務時間 容器 */}
                                                    <Container
                                                        theme={laptop.customerServiceTimeContainer}
                                                    >
                                                        {/* 客服服務時間 */}
                                                        <Text
                                                            theme={laptop.customerServiceTime}
                                                        >
                                                            客服服務時間
                                                    </Text>

                                                        {/* 客服服務時間 內文 */}
                                                        {/* 客服服務時間 星期 */}
                                                        <Text
                                                            theme={laptop.customerServiceWeekText}
                                                        >
                                                            {item?.customerServiceWeek}
                                                            {/* 客服服務時間 時段 */}
                                                            <Text
                                                                theme={laptop.customerServiceTimeText}
                                                            >
                                                                {item?.customerServiceTime}
                                                            </Text>
                                                        </Text>

                                                        {/* 客服服務時間 通知 */}
                                                        <Text
                                                            theme={laptop.customerServiceTimeTip}
                                                        >
                                                            {item?.customerServiceTimeTip}
                                                        </Text>

                                                    </Container>

                                                </Container>
                                            </BasicContainer>
                                        </SubContainer>

                                    </React.Fragment>
                                )
                            })

                        }
                    </Container>
                </>
            }
        </>
    )
}

export const Laptop = styled(LaptopBase).attrs((props) => ({}))`
 
`