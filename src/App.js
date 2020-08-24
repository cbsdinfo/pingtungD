import React, { useReducer, useState, useEffect } from 'react';
import { Context } from './Store/Store'
import themes from './ProjectThemes/Themes';
import { useSwitch } from './SelfHooks/useSwitch';
import { ContextContainer } from './Components/ContextContainer/ContextContainer';

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
  const [APIUrl, setAPIUrl] = useState("url");
  const [Value, Switch, Open, Close] = useSwitch();//控制重新渲染路由

  return (
    <>
      < Context.Provider value={{ APIUrl, Theme, setTheme, Switch }}>
        <ContextContainer />
      </Context.Provider>
    </>
  );
}

export default App;
