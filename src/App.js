import React, { useReducer, useState, useEffect } from 'react';
import { Context } from './Store/Store'
import themes from './ProjectThemes/Themes';
import { useSwitch } from './SelfHooks/useSwitch';
import { ContextContainer } from './Components/ContextContainer/ContextContainer';
import 'antd/dist/antd.css';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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

function App() {
  const [Theme, setTheme] = useReducer(reducer, themes.defaultTheme);
  // dev : http://openauth.react.dev.1966.org.tw:20025
  // uat : http://openauth.react.1966.org.tw:20026 
  const [APIUrl, setAPIUrl] = useState("http://openauth.react.dev.1966.org.tw:20025/api/")//useState("http://openauth.1966.org.tw/api/");
  const [APIAppKey, setAPIAppKey] = useState("openauth");
  const [Value, Switch, Open, Close] = useSwitch();//控制重新渲染路由
  const [Collapse, setCollapse] = useState(false); // 控制768以上畫面，左側欄收合情況

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        < Context.Provider value={{ APIUrl, APIAppKey, Theme, setTheme, Switch, Collapse, setCollapse }}>
          <ContextContainer />
        </Context.Provider>
      </DndProvider>
    </>
  );
}

export default App;
