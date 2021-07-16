import React, { useReducer, useState, useLayoutEffect } from 'react';
import { Context } from './Store/Store'
import themes from './ProjectThemes/Themes';
import { useSwitch } from './SelfHooks/useSwitch';
import { ContextContainer } from './Components/ContextContainer/ContextContainer';
import 'antd/dist/antd.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import withClearCache from './ClearCache';
import { useLocation, useHistory } from 'react-router-dom';
import { isNil } from 'lodash';
import { setItemLocalStorage } from './Handlers';

const reducer = (state, action) => {

  switch (action.type) {
    case "ThemeDafault":
      return themes.defaultTheme;
    case "ThemeOther":
      return themes.otherTheme;
    case "ThemeCustom":
      return 0;
    default:
      return "處理Theme失敗";
  }
}

const ClearCacheComponent = withClearCache(MainApp);

function App() {
  return <ClearCacheComponent />;
}

function MainApp() {
  const [Theme, setTheme] = useReducer(reducer, themes.defaultTheme);
  // dev : http://openauth.react.dev.1966.org.tw:20025
  // uat : http://openauth.react.1966.org.tw:20026 
  const [APIUrl, setAPIUrl] = useState("https://itcdev.mass.org.tw/api/")//useState("http://openauth.1966.org.tw/api/");
  const [APIFileUrl, setAPIFileUrl] = useState("https://itcdev.mass.org.tw/WebContents/")//useState("http://openauth.1966.org.tw/");
  const [APIAppKey, setAPIAppKey] = useState("driver");
  const [Value, Switch, Open, Close] = useSwitch();//控制重新渲染路由
  const [Collapse, setCollapse] = useState(false); // 控制768以上畫面，左側欄收合情況
  const [DrawerCollapse, setDrawerCollapse] = useState(true); // 抽屜收合

  let urlParams = new URLSearchParams(useLocation().search);//取得參數
  let history = useHistory();
  let location = useLocation();

  useLayoutEffect(() => {
    let token = urlParams.get("token"); //會是最新的值

    console.log(token, location.pathname)

    if (!isNil(token)) {
      setItemLocalStorage("DAuth", JSON.stringify(token));
      setItemLocalStorage("DriverAccountStatus", JSON.stringify(""));
    }
  }, [])

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        < Context.Provider value={{ APIUrl, APIAppKey, APIFileUrl, Theme, setTheme, Switch, Collapse, setCollapse, DrawerCollapse, setDrawerCollapse }}>
          <ContextContainer />
        </Context.Provider>
      </DndProvider>
    </>
  );
}

export default App;
