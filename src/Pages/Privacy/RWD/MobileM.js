import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../../Store/Store'
import { MainPageContainer, MainPageTitleBar, Sign, TitleBar } from '../../../ProjectComponent';
import { Container, BasicContainer, DateTimePicker, TextEditor, Tooltip, Tag, OldTable, Selector, NativeLineButton, SubContainer, LineButton, Text, FormContainer, FormRow, TextInput, globalContextService, modalsService, Checkbox, CheckboxItem } from '../../../Components';
import { ReactComponent as Warning } from '../../../Assets/img/DayCheckPage/Warning.svg'
import { ReactComponent as Cross } from '../../../Assets/img/DayCheckPage/Cross.svg'
import { ReactComponent as Check } from '../../../Assets/img/DayCheckPage/Check.svg'
import { ReactComponent as Note } from '../../../Assets/img/DayCheckPage/Note.svg'
import { ReactComponent as Heart } from '../../../Assets/img/DayCheckPage/Heart.svg'
import { ReactComponent as GrayCheck } from '../../../Assets/img/DayCheckPage/GrayCheck.svg'
import { useHistory } from 'react-router-dom';
import { useWindowSize } from '../../../SelfHooks/useWindowSize';
import { isEqual, isNil, isUndefined } from 'lodash';

const MobileMBase = (props) => {

    const { APIUrl, Theme, Switch, History, Location } = useContext(Context);
    const { pages: { privacy: { rwd: { mobileM } } } } = Theme;
    let history = useHistory()
    const [ForceUpdate, setForceUpdate] = useState(false); // 供強制刷新組件
    const [Width, Height] = useWindowSize();
    //#region 分頁映射
    const tabMap = (key) => {
        return props.NewsType.map(item => { return item.label })
    }
    //#endregion


    return (
        <>
            <TitleBar />

            <MainPageContainer
                height={Height}
                theme={mobileM.mainPageContainer}
                outSideTopComponent={
                    <>
                    </>
                }
            >
                {/* 標題 文字 */}
                <Text
                    theme={mobileM.titleText}
                >
                    {"長照交通預約系統隱私權保護政策"}
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"隱私權保護政策的內容"}
                </Text>
                <Text
                    theme={mobileM.contentText}
                >
                    {"長照交通預約系統 為尊重並保護會員的隱私權，請您閱讀以下有關隱私權保護政策，以協助您瞭解 長照交通預約系統 如何蒐集、應用以及保護您所提供的個人資訊。"}
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"適用範圍"}
                </Text>
                <Text
                    theme={mobileM.contentText}
                >
                    {"本隱私權保護政策，適用於您在使用 長照交通預約系統 時，所涉及的個人資料蒐集、運用與保護。"}
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"個人資料之蒐集與使用方式"}
                </Text>
                <Text
                    theme={mobileM.contentText}
                >
                    {"當您在使用 長照交通預約系統 時，我們會保留伺服器所產生的相關記錄，包括您使用連線設備的IP位址、連線時間、瀏覽器種類及點選紀錄等。 當 長照交通預約系統 要蒐集您的個人資料時，會依不同的活動請您填寫個人資料(例如姓名、電子郵件、手機號碼、住址、帳號、密碼等），目的在於確認您的身分，以便於提供精確的服務、完成交易或進行統計分析。長照交通預約系統 不會在您不知情的情況下，取得您的任何個人資料。"}
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"帳號、密碼及安全"}
                </Text>
                <Text
                    theme={mobileM.midContentText}
                >
                    {"您應妥善保管帳號及密碼，並於每次連線完畢時或使用後確實登出，以防他人盜用。以同一個會員手機號碼和密碼使用會員服務所進行的所有行為，都將被認為是這位會員本人的行為。"}
                </Text>
                <Text
                    theme={mobileM.contentText}
                >
                    {"利用此組帳號與密碼登入系統後所進行之一切活動，您將負完全的責任。請勿將您的帳號與密碼洩露或提供予第三人知悉，以免因此遭人非法使用。"}
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"與第三者共用個人資料"}
                </Text>
                <Text
                    theme={mobileM.midContentText}
                >
                    {"長照交通預約系統 不會向任何人出售或展示您的個人資料。但在下列的情況， 長照交通預約系統 有可能會向其他人士或公司提供你的個人資料："}

                    <ul style={{ padding: "16px 0 0 40px", margin: "0" }}>
                        <li>在與其他人士或公司共用資料前有取得您的授權。</li>
                        <li>必須有您部份的個人資料才能使用 長照交通預約系統 所提供的特定服務。</li>
                        <li>受司法相關主管機關要求。</li>
                        <li>受政府主管機關依法要求。</li>
                        <li>在緊急情況下為保護 長照交通預約系統 會員或第三人之人身安全。</li>
                        <li>當您的行為違反 長照交通預約系統 服務條款或妨礙第三者權益時。</li>
                    </ul>
                </Text>
                <Text
                    theme={mobileM.contentText}
                    style={{ padding: "0" }}
                >
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"Cookies的運用"}
                </Text>
                <Text
                    theme={mobileM.midContentText}
                >
                    {"Cookies 是伺服器經由瀏覽器，在會員的硬碟中儲存一些簡短資訊。透過 Cookies 的功能， 長照交通預約系統 可以做到："}

                    <ul style={{ padding: "16px 0 0 40px", margin: "0" }}>
                        <li>記錄您使用本網站時的喜好或習慣。</li>
                        <li>提供您不同的個人化服務。</li>
                        <li>統計瀏覽人次及流量 大多數的瀏覽器可以自行設定是否啟動 Cookies 或更改 Cookies的接受程度。 如果您拒絕所有的 Cookies，將造成無法使用 長照交通預約系統 大部分的功能。</li>
                    </ul>
                </Text>
                <Text
                    theme={mobileM.contentText}
                    style={{ padding: "0" }}
                >
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"個人資料修改之政策"}
                </Text>
                <Text
                    theme={mobileM.midContentText}
                >
                    {"使用者進入長照交通預約系統 時， 長照交通預約系統 會紀錄使用者上站的位址，以及瀏覽活動等資料，但上述資料僅供作資料分析，以便於改善 長照交通預約系統 的服務品質，不會和特定個人相連繫。"}
                </Text>
                <Text
                    theme={mobileM.midContentText}
                >
                    {"長照交通預約系統 所取得之個人資料，僅依照原來說明的使用目的和範圍加以使用，除非事先說明或依照相關法律規定，否則長照交通預約系統 不會將使用者個人資料提供給第三人或移作其他目的使用。"}
                </Text>
                <Text
                    theme={mobileM.contentText}
                >
                    {"除依法應提供司法、檢調機構、相關主管機關及長照交通預約系統 的必要範圍之利用外，不會將您的個人資料提供給第三人。"}
                </Text>

                <Text
                    theme={mobileM.subTitleText}
                >
                    {"隱私權保護政策修訂"}
                </Text>
                <Text
                    theme={mobileM.midContentText}
                >
                    {"長照交通預約系統 可不時修訂本政策。當我們在個人資料的處理上有重大變更時，會將通知傳送到您在 長照交通預約系統 帳號中指定的主要電子郵件地址或手機簡訊，或在我們的網站上張貼告示。"}
                </Text>
            </MainPageContainer>
        </>
    )
}

export const MobileM = styled(MobileMBase).attrs((props) => ({}))`
 
`