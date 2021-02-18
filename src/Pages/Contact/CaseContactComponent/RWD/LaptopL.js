import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../../Store/Store'
import { ReactComponent as NoData } from '../../../../Assets/img/ContactPage/NoData.svg'
import { ReactComponent as Phone } from '../../../../Assets/img/ContactPage/Phone.svg'
import { ReactComponent as Search } from '../../../../Assets/img/ContactPage/Search.svg'
import { useHistory } from 'react-router-dom';
import { DateTimePicker, BasicContainer, FormContainer, FormRow, globalContextService, NativeLineButton, NewSelector, SubContainer, Text, TextInput, Radio, RadioItem, modalsService, Container, OldTable } from '../../../../Components';
import { useWindowSize } from '../../../../SelfHooks/useWindowSize';

const LaptopLBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { contact: { caseContactComponent: { rwd: { laptopL } } } } } = Theme;

    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    let history = useHistory()

    let data = [
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },
        { companyName: "凡亨國際租賃有限公司凡亨國際租賃有限公司", companyPhone: "(02)2912-1966", carServiceWeek: "週一至週五", carServiceTime: "08:00-18:00", customerServiceWeek: "週一至週五", customerServiceTime: "08:00-18:00" },

    ]
    return (
        <>
            {/* 一般輸入框 請輸入車行名稱  */}
            <TextInput
                bascDefaultTheme={"DefaultTheme"}
                theme={laptopL.keyword}
                type="text"
                placeholder={"請輸入車行名稱"}
                rightIcon={
                    <Search
                        style={laptopL.keywordRightIcon}
                        onClick={(e) => {
                            console.log("目前不支援搜尋功能")
                            // props.GetSubOrgsExecute(true, "");
                        }
                        }
                    />
                }
                value={globalContextService.get("ContactPage", "Keyword") ?? ""}
                onChange={(e, value, onInitial) => {
                    globalContextService.set("ContactPage", "Keyword", value);
                }}
            />

            {data.length === 0
                ?
                <>
                    {/* 無資料表單區容器 */}
                    < BasicContainer
                        baseDefaultTheme={"DefaultTheme"}
                        height={Height}
                        theme={laptopL.noDataContainer}
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
                                            theme={laptopL.cardOutContainer}
                                        >
                                            {/* 卡片資料表單區容器 */}
                                            < SubContainer
                                                baseDefaultTheme={"DefaultTheme"}
                                                theme={laptopL.cardContainer}
                                            >

                                                {/* 公司 容器 */}
                                                <Container
                                                    theme={laptopL.companyContainer}
                                                >
                                                    {/* 公司名稱 */}
                                                    <Text
                                                        theme={laptopL.companyName}
                                                    >
                                                        {item?.companyName}
                                                    </Text>

                                                    {/* 公司電話 */}
                                                    <Text
                                                        theme={laptopL.companyPhone}
                                                    >
                                                        <Phone
                                                            style={laptopL.phoneSvg}
                                                        />
                                                        {item?.companyPhone}
                                                    </Text>

                                                    {/* 提醒 */}
                                                    <Text
                                                        theme={laptopL.tip}
                                                    >
                                                        國定假日提前預約，皆可服務，依車行調度情況
                                                    </Text>

                                                </Container>

                                                <Container>

                                                    {/* 車趟服務時間 容器 */}
                                                    <Container
                                                        theme={laptopL.carServiceTimeContainer}
                                                    >
                                                        {/* 車趟服務時間 標題 */}
                                                        <Text
                                                            theme={laptopL.carServiceTimeTitle}
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
                                                                    < Text
                                                                        theme={laptopL.carServiceWeekText}
                                                                    >
                                                                        ({date.week})

                                                                    {/* 車趟服務時間 時段 */}
                                                                        < Text
                                                                            theme={laptopL.carServiceTimeText}
                                                                        >
                                                                            {date.time}
                                                                        </Text>
                                                                    </Text>
                                                                </>
                                                            )
                                                        })}


                                                    </Container>


                                                    {/* 客服服務時間 容器 */}
                                                    <Container
                                                        theme={laptopL.customerServiceTimeContainer}
                                                    >
                                                        {/* 客服服務時間 */}
                                                        <Text
                                                            theme={laptopL.customerServiceTime}
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
                                                                        theme={laptopL.customerServiceWeekText}
                                                                    >
                                                                        ({date.week})
                                                                        {/* 客服服務時間 時段 */}
                                                                        <Text
                                                                            theme={laptopL.customerServiceTimeText}
                                                                        >
                                                                            {date.time}
                                                                        </Text>
                                                                    </Text>
                                                                </>
                                                            )
                                                        })}

                                                    </Container>

                                                </Container>
                                            </SubContainer>
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

export const LaptopL = styled(LaptopLBase).attrs((props) => ({}))`
 
`