//#region 引入 React
import React from 'react';
//#endregion
//#region 引入 knobs
import { withKnobs, text, number, select, object, button, color } from "@storybook/addon-knobs";
//#endregion
//#region 引入 Theme檔
import ContainerDefaultTheme from './Theme/Container/DefaultTheme';
import SubContainerDefaultTheme from './Theme/SubContainer/DefaultTheme';
import BasicContainerDefaultTheme from './Theme/BasicContainer/DefaultTheme';
//#endregion
//#region 引入組件
import { Container } from './Container'
import { SubContainer } from './SubContainer'
import { BasicContainer } from './BasicContainer'
//#endregion
//#region 引入說明檔案
import ContainerNote from './ContainerNote.md'
import SubContainerNote from './SubContainerNote.md'
import BasicContainerNote from './BasicContainerNote.md'
//#endregion
//#region 引入匯出樣式處理函數
import { codeExportAndCopy } from '../../Handlers/ThemeHandler';
//#endregion

//#region Menu 基本配置
export default {
  title: 'Containers',// 顯示於左方Menu，標題名稱
  decorators: [withKnobs],// withKnobs 配置Knobs
  excludeStories: /.*Data$/,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
//#endregion

//#region Container 組件
export const Container_ = (props) => {

  const themeselect = select(
    "選擇預設樣式",
    {
      ContainerDefaultTheme: 'ContainerDefaultTheme'
    },
    "ContainerDefaultTheme"
  );

  let [ContainerDefaultThemebasicwidth, ContainerDefaultThemebasicboxSizing, ContainerDefaultThemebasicflexDirection, ContainerDefaultThemebasicjustifyContent, ContainerDefaultThemebasicalignItems, ContainerDefaultThemebasicposition, ContainerDefaultThemebasicheight, ContainerDefaultThemebasicminWidth, ContainerDefaultThemebasicbackgroundColor, ContainerDefaultThemebasicbackgroundImage, ContainerDefaultThemebasicbackgroundPosition, ContainerDefaultThemebasicbackgroundRepeat, ContainerDefaultThemebasicbackgroundSize, ContainerDefaultThemebasiccursor, ContainerDefaultThemebasicwhiteSpace, ContainerDefaultThemebasictextAlign, ContainerDefaultThemebasicfontSize, ContainerDefaultThemebasiccolor, ContainerDefaultThemebasicotherStyle, ContainerDefaultThemehoverotherStyle, exportCode] = [];
  const switchDefaultTheme = (themeName) => {
    switch (themeName) {
      default:
        ContainerDefaultThemebasicwidth = text("ContainerDefaultTheme_basic_width", ContainerDefaultTheme.basic.width)
        ContainerDefaultThemebasicboxSizing = text("ContainerDefaultTheme_basic_boxSizing", ContainerDefaultTheme.basic.boxSizing)
        ContainerDefaultThemebasicflexDirection = text("ContainerDefaultTheme_basic_flexDirection", ContainerDefaultTheme.basic.flexDirection)
        ContainerDefaultThemebasicjustifyContent = text("ContainerDefaultTheme_basic_justifyContent", ContainerDefaultTheme.basic.justifyContent)
        ContainerDefaultThemebasicalignItems = text("ContainerDefaultTheme_basic_alignItems", ContainerDefaultTheme.basic.alignItems)
        ContainerDefaultThemebasicposition = text("ContainerDefaultTheme_basic_position", ContainerDefaultTheme.basic.position)
        ContainerDefaultThemebasicheight = text("ContainerDefaultTheme_basic_height", ContainerDefaultTheme.basic.height)
        ContainerDefaultThemebasicminWidth = text("ContainerDefaultTheme_basic_minWidth", ContainerDefaultTheme.basic.minWidth)
        ContainerDefaultThemebasicbackgroundColor = color("ContainerDefaultTheme_basic_backgroundColor", ContainerDefaultTheme.basic.backgroundColor)
        ContainerDefaultThemebasicbackgroundImage = text("ContainerDefaultTheme_basic_backgroundImage", ContainerDefaultTheme.basic.backgroundImage)
        ContainerDefaultThemebasicbackgroundPosition = text("ContainerDefaultTheme_basic_backgroundPosition", ContainerDefaultTheme.basic.backgroundPosition)
        ContainerDefaultThemebasicbackgroundRepeat = text("ContainerDefaultTheme_basic_backgroundRepeat", ContainerDefaultTheme.basic.backgroundRepeat)
        ContainerDefaultThemebasicbackgroundSize = text("ContainerDefaultTheme_basic_backgroundSize", ContainerDefaultTheme.basic.backgroundSize)
        ContainerDefaultThemebasiccursor = text("ContainerDefaultTheme_basic_cursor", ContainerDefaultTheme.basic.cursor)
        ContainerDefaultThemebasicwhiteSpace = text("ContainerDefaultTheme_basic_whiteSpace", ContainerDefaultTheme.basic.whiteSpace)
        ContainerDefaultThemebasictextAlign = text("ContainerDefaultTheme_basic_textAlign", ContainerDefaultTheme.basic.textAlign)
        ContainerDefaultThemebasicfontSize = text("ContainerDefaultTheme_basic_fontSize", ContainerDefaultTheme.basic.fontSize)
        ContainerDefaultThemebasiccolor = color("ContainerDefaultTheme_basic_color", ContainerDefaultTheme.basic.color)
        ContainerDefaultThemebasicotherStyle = object("ContainerDefaultTheme_basic屬性其他樣式", {})
        ContainerDefaultThemehoverotherStyle = object("ContainerDefaultTheme_hover屬性其他樣式", {})
        exportCode = button("複製ContainerDefaultTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <Container
                      baseDefaultTheme={"${themeselect}"}
                      theme={{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          width: "${ContainerDefaultThemebasicwidth}",
                          boxSizing: "${ContainerDefaultThemebasicboxSizing}",
                          flexDirection: "${ContainerDefaultThemebasicflexDirection}",
                          justifyContent: "${ContainerDefaultThemebasicjustifyContent}",
                          alignItems: "${ContainerDefaultThemebasicalignItems}",
                          position: "${ContainerDefaultThemebasicposition}",
                          height: "${ContainerDefaultThemebasicheight}",
                          minWidth: "${ContainerDefaultThemebasicminWidth}",
                          backgroundColor: "${ContainerDefaultThemebasicbackgroundColor}",
                          backgroundImage: "${ContainerDefaultThemebasicbackgroundImage}",
                          backgroundPosition: "${ContainerDefaultThemebasicbackgroundPosition}",
                          backgroundRepeat: "${ContainerDefaultThemebasicbackgroundRepeat}",
                          backgroundSize: "${ContainerDefaultThemebasicbackgroundSize}",
                          cursor: "${ContainerDefaultThemebasiccursor}",
                          whiteSpace: "${ContainerDefaultThemebasicwhiteSpace}",
                          textAlign: "${ContainerDefaultThemebasictextAlign}",
                          fontSize: "${ContainerDefaultThemebasicfontSize}",
                          color: "${ContainerDefaultThemebasiccolor}",
                          //#endregion
                          ${JSON.stringify(ContainerDefaultThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(ContainerDefaultThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
        });
        return { basic: { width: ContainerDefaultThemebasicwidth, display: ContainerDefaultTheme.basic.display, flexWrap: ContainerDefaultTheme.basic.flexWrap, boxSizing: ContainerDefaultThemebasicboxSizing, flexDirection: ContainerDefaultThemebasicflexDirection, justifyContent: ContainerDefaultThemebasicjustifyContent, alignItems: ContainerDefaultThemebasicalignItems, position: ContainerDefaultThemebasicposition, height: ContainerDefaultThemebasicheight, minWidth: ContainerDefaultThemebasicminWidth, backgroundColor: ContainerDefaultThemebasicbackgroundColor, backgroundImage: ContainerDefaultThemebasicbackgroundImage, backgroundPosition: ContainerDefaultThemebasicbackgroundPosition, backgroundRepeat: ContainerDefaultThemebasicbackgroundRepeat, backgroundSize: ContainerDefaultThemebasicbackgroundSize, cursor: ContainerDefaultThemebasiccursor, whiteSpace: ContainerDefaultThemebasicwhiteSpace, textAlign: ContainerDefaultThemebasictextAlign, fontSize: ContainerDefaultThemebasicfontSize, color: ContainerDefaultThemebasiccolor, ...ContainerDefaultThemebasicotherStyle }, hover: { ...ContainerDefaultThemehoverotherStyle }, };

    }
  }

  return <Container
    theme={(switchDefaultTheme(themeselect))}
    baseDefaultTheme={themeselect}>這是Flex外層組件</Container>;
};

Container_.story = {
  parameters: {
    notes: { "ContainerNote": ContainerNote },
  }
};
//#endregion

//#region SubContainer 組件
export const SubContainer_ = (props) => {

  const themeselect = select(
    "選擇預設樣式",
    {
      SubContainerDefaultTheme: 'SubContainerDefaultTheme'
    },
    "SubContainerDefaultTheme"
  );

  let [SubContainerDefaultThemebasicoccupy, SubContainerDefaultThemebasicboxSizing, SubContainerDefaultThemebasicposition, SubContainerDefaultThemebasicwidth, SubContainerDefaultThemebasicminWidth, SubContainerDefaultThemebasicheight, SubContainerDefaultThemebasiclineHeight, SubContainerDefaultThemebasicbackgroundColor, SubContainerDefaultThemebasicbackgroundImage, SubContainerDefaultThemebasicbackgroundPosition, SubContainerDefaultThemebasicbackgroundRepeat, SubContainerDefaultThemebasicbackgroundSize, SubContainerDefaultThemebasiccursor, SubContainerDefaultThemebasicwhiteSpace, SubContainerDefaultThemebasictextAlign, SubContainerDefaultThemebasicfontSize, SubContainerDefaultThemebasiccolor, SubContainerDefaultThemebasicotherStyle, SubContainerDefaultThemehoverotherStyle, exportCode] = [];
  const switchDefaultTheme = (themeName) => {
    switch (themeName) {
      default:
        SubContainerDefaultThemebasicboxSizing = text("SubContainerDefaultTheme_basic_boxSizing", SubContainerDefaultTheme.basic.boxSizing)
        SubContainerDefaultThemebasicposition = text("SubContainerDefaultTheme_basic_position", SubContainerDefaultTheme.basic.position)
        SubContainerDefaultThemebasicwidth = text("SubContainerDefaultTheme_basic_width", SubContainerDefaultTheme.basic.width)
        SubContainerDefaultThemebasicminWidth = text("SubContainerDefaultTheme_basic_minWidth", SubContainerDefaultTheme.basic.minWidth)
        SubContainerDefaultThemebasicoccupy = text("SubContainerDefaultTheme_basic_occupy", "")
        SubContainerDefaultThemebasicheight = text("SubContainerDefaultTheme_basic_height", SubContainerDefaultTheme.basic.height)
        SubContainerDefaultThemebasiclineHeight = text("SubContainerDefaultTheme_basic_lineHeight", SubContainerDefaultTheme.basic.lineHeight)
        SubContainerDefaultThemebasicbackgroundColor = color("SubContainerDefaultTheme_basic_backgroundColor", SubContainerDefaultTheme.basic.backgroundColor)
        SubContainerDefaultThemebasicbackgroundImage = text("SubContainerDefaultTheme_basic_backgroundImage", SubContainerDefaultTheme.basic.backgroundImage)
        SubContainerDefaultThemebasicbackgroundPosition = text("SubContainerDefaultTheme_basic_backgroundPosition", SubContainerDefaultTheme.basic.backgroundPosition)
        SubContainerDefaultThemebasicbackgroundRepeat = text("SubContainerDefaultTheme_basic_backgroundRepeat", SubContainerDefaultTheme.basic.backgroundRepeat)
        SubContainerDefaultThemebasicbackgroundSize = text("SubContainerDefaultTheme_basic_backgroundSize", SubContainerDefaultTheme.basic.backgroundSize)
        SubContainerDefaultThemebasiccursor = text("SubContainerDefaultTheme_basic_cursor", SubContainerDefaultTheme.basic.cursor)
        SubContainerDefaultThemebasicwhiteSpace = text("SubContainerDefaultTheme_basic_whiteSpace", SubContainerDefaultTheme.basic.whiteSpace)
        SubContainerDefaultThemebasictextAlign = text("SubContainerDefaultTheme_basic_textAlign", SubContainerDefaultTheme.basic.textAlign)
        SubContainerDefaultThemebasicfontSize = text("SubContainerDefaultTheme_basic_fontSize", SubContainerDefaultTheme.basic.fontSize)
        SubContainerDefaultThemebasiccolor = color("SubContainerDefaultTheme_basic_color", SubContainerDefaultTheme.basic.color)
        SubContainerDefaultThemebasicotherStyle = object("SubContainerDefaultTheme_basic屬性其他樣式", {})
        SubContainerDefaultThemehoverotherStyle = object("SubContainerDefaultTheme_hover屬性其他樣式", {})
        exportCode = button("複製SubContainerDefaultTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <SubContainer
                      baseDefaultTheme={"${themeselect}"}
                      theme={{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${SubContainerDefaultThemebasicboxSizing}",
                          position: "${SubContainerDefaultThemebasicposition}",
                          width: "${SubContainerDefaultThemebasicwidth}",
                          minWidth: "${SubContainerDefaultThemebasicminWidth}",
                          height: "${SubContainerDefaultThemebasicheight}",
                          lineHeight: "${SubContainerDefaultThemebasiclineHeight}",
                          backgroundColor: "${SubContainerDefaultThemebasicbackgroundColor}",
                          backgroundImage: "${SubContainerDefaultThemebasicbackgroundImage}",
                          backgroundPosition: "${SubContainerDefaultThemebasicbackgroundPosition}",
                          backgroundRepeat: "${SubContainerDefaultThemebasicbackgroundRepeat}",
                          backgroundSize: "${SubContainerDefaultThemebasicbackgroundSize}",
                          cursor: "${SubContainerDefaultThemebasiccursor}",
                          whiteSpace: "${SubContainerDefaultThemebasicwhiteSpace}",
                          textAlign: "${SubContainerDefaultThemebasictextAlign}",
                          fontSize: "${SubContainerDefaultThemebasicfontSize}",
                          color: "${SubContainerDefaultThemebasiccolor}",
                          ...(style.occupy(${SubContainerDefaultThemebasicoccupy})),
                          //#endregion
                          ${JSON.stringify(SubContainerDefaultThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(SubContainerDefaultThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
        });
        return { basic: { flexGrow: SubContainerDefaultTheme.basic.flexGrow, maxWidth: SubContainerDefaultTheme.basic.maxWidth, flexBasis: SubContainerDefaultTheme.basic.flexBasis, boxSizing: SubContainerDefaultThemebasicboxSizing, position: SubContainerDefaultThemebasicposition, width: SubContainerDefaultThemebasicwidth, minWidth: SubContainerDefaultThemebasicminWidth, height: SubContainerDefaultThemebasicheight, lineHeight: SubContainerDefaultThemebasiclineHeight, backgroundColor: SubContainerDefaultThemebasicbackgroundColor, backgroundImage: SubContainerDefaultThemebasicbackgroundImage, backgroundPosition: SubContainerDefaultThemebasicbackgroundPosition, backgroundRepeat: SubContainerDefaultThemebasicbackgroundRepeat, backgroundSize: SubContainerDefaultThemebasicbackgroundSize, cursor: SubContainerDefaultThemebasiccursor, whiteSpace: SubContainerDefaultThemebasicwhiteSpace, textAlign: SubContainerDefaultThemebasictextAlign, fontSize: SubContainerDefaultThemebasicfontSize, color: SubContainerDefaultThemebasiccolor, ...(!!SubContainerDefaultThemebasicoccupy && SubContainerDefaultTheme.basic.occupy(SubContainerDefaultThemebasicoccupy)), ...SubContainerDefaultThemebasicotherStyle }, hover: { ...SubContainerDefaultThemehoverotherStyle }, };

    }
  }

  return <SubContainer
    theme={(switchDefaultTheme(themeselect))}
    baseDefaultTheme={themeselect} >這是Flex內層組件</SubContainer>;
};

SubContainer_.story = {
  parameters: {
    notes: { "SubContainerNote": SubContainerNote },
  }
};
//#endregion

//#region BasicContainer 組件
export const BasicContainer_ = (props) => {

  const themeselect = select(
    "選擇預設樣式",
    {
      BasicContainerDefaultTheme: 'BasicContainerDefaultTheme'
    },
    "BasicContainerDefaultTheme"
  );

  let [BasicContainerDefaultThemebasicboxSizing, BasicContainerDefaultThemebasicposition, BasicContainerDefaultThemebasicwidth, BasicContainerDefaultThemebasicminWidth, BasicContainerDefaultThemebasicheight, BasicContainerDefaultThemebasiclineHeight, BasicContainerDefaultThemebasicbackgroundColor, BasicContainerDefaultThemebasicbackgroundImage, BasicContainerDefaultThemebasicbackgroundPosition, BasicContainerDefaultThemebasicbackgroundRepeat, BasicContainerDefaultThemebasicbackgroundSize, BasicContainerDefaultThemebasiccursor, BasicContainerDefaultThemebasicwhiteSpace, BasicContainerDefaultThemebasictextAlign, BasicContainerDefaultThemebasicfontSize, BasicContainerDefaultThemebasiccolor, BasicContainerDefaultThemebasicotherStyle, BasicContainerDefaultThemehoverotherStyle, exportCode] = [];
  const switchDefaultTheme = (themeName) => {
    switch (themeName) {
      default:
        BasicContainerDefaultThemebasicboxSizing = text("BasicContainerDefaultTheme_basic_boxSizing", BasicContainerDefaultTheme.basic.boxSizing)
        BasicContainerDefaultThemebasicposition = text("BasicContainerDefaultTheme_basic_position", BasicContainerDefaultTheme.basic.position)
        BasicContainerDefaultThemebasicwidth = text("BasicContainerDefaultTheme_basic_width", BasicContainerDefaultTheme.basic.width)
        BasicContainerDefaultThemebasicminWidth = text("BasicContainerDefaultTheme_basic_minWidth", BasicContainerDefaultTheme.basic.minWidth)
        BasicContainerDefaultThemebasicheight = text("BasicContainerDefaultTheme_basic_height", BasicContainerDefaultTheme.basic.height)
        BasicContainerDefaultThemebasiclineHeight = text("BasicContainerDefaultTheme_basic_lineHeight", BasicContainerDefaultTheme.basic.lineHeight)
        BasicContainerDefaultThemebasicbackgroundColor = color("BasicContainerDefaultTheme_basic_backgroundColor", BasicContainerDefaultTheme.basic.backgroundColor)
        BasicContainerDefaultThemebasicbackgroundImage = text("BasicContainerDefaultTheme_basic_backgroundImage", BasicContainerDefaultTheme.basic.backgroundImage)
        BasicContainerDefaultThemebasicbackgroundPosition = text("BasicContainerDefaultTheme_basic_backgroundPosition", BasicContainerDefaultTheme.basic.backgroundPosition)
        BasicContainerDefaultThemebasicbackgroundRepeat = text("BasicContainerDefaultTheme_basic_backgroundRepeat", BasicContainerDefaultTheme.basic.backgroundRepeat)
        BasicContainerDefaultThemebasicbackgroundSize = text("BasicContainerDefaultTheme_basic_backgroundSize", BasicContainerDefaultTheme.basic.backgroundSize)
        BasicContainerDefaultThemebasiccursor = text("BasicContainerDefaultTheme_basic_cursor", BasicContainerDefaultTheme.basic.cursor)
        BasicContainerDefaultThemebasicwhiteSpace = text("BasicContainerDefaultTheme_basic_whiteSpace", BasicContainerDefaultTheme.basic.whiteSpace)
        BasicContainerDefaultThemebasictextAlign = text("BasicContainerDefaultTheme_basic_textAlign", BasicContainerDefaultTheme.basic.textAlign)
        BasicContainerDefaultThemebasicfontSize = text("BasicContainerDefaultTheme_basic_fontSize", BasicContainerDefaultTheme.basic.fontSize)
        BasicContainerDefaultThemebasiccolor = color("BasicContainerDefaultTheme_basic_color", BasicContainerDefaultTheme.basic.color)
        BasicContainerDefaultThemebasicotherStyle = object("BasicContainerDefaultTheme_basic屬性其他樣式", {})
        BasicContainerDefaultThemehoverotherStyle = object("BasicContainerDefaultTheme_hover屬性其他樣式", {})
        exportCode = button("複製BasicContainerDefaultTheme樣式程式碼至剪貼簿", () => {
          codeExportAndCopy(`
                      <BasicContainer
                      baseDefaultTheme={"${themeselect}"}
                      theme={{

                        basic: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          boxSizing: "${BasicContainerDefaultThemebasicboxSizing}",
                          position: "${BasicContainerDefaultThemebasicposition}",
                          width: "${BasicContainerDefaultThemebasicwidth}",
                          minWidth: "${BasicContainerDefaultThemebasicminWidth}",
                          height: "${BasicContainerDefaultThemebasicheight}",
                          lineHeight: "${BasicContainerDefaultThemebasiclineHeight}",
                          backgroundColor: "${BasicContainerDefaultThemebasicbackgroundColor}",
                          backgroundImage: "${BasicContainerDefaultThemebasicbackgroundImage}",
                          backgroundPosition: "${BasicContainerDefaultThemebasicbackgroundPosition}",
                          backgroundRepeat: "${BasicContainerDefaultThemebasicbackgroundRepeat}",
                          backgroundSize: "${BasicContainerDefaultThemebasicbackgroundSize}",
                          cursor: "${BasicContainerDefaultThemebasiccursor}",
                          whiteSpace: "${BasicContainerDefaultThemebasicwhiteSpace}",
                          textAlign: "${BasicContainerDefaultThemebasictextAlign}",
                          fontSize: "${BasicContainerDefaultThemebasicfontSize}",
                          color: "${BasicContainerDefaultThemebasiccolor}",
                          //#endregion
                          ${JSON.stringify(BasicContainerDefaultThemebasicotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                        hover: (style) => ({
                          ...style,
                          //#region 預設樣式style區域，自行檢查刪掉與預設重複的key與value
                          //#endregion
                          ${JSON.stringify(BasicContainerDefaultThemehoverotherStyle).replace(/({|})/gm, "").replace(/(,)/gm, ",\n                            ")}
                        }),
                      }}/>
                      `)
        });
        return { basic: { boxSizing: BasicContainerDefaultThemebasicboxSizing, position: BasicContainerDefaultThemebasicposition, width: BasicContainerDefaultThemebasicwidth, minWidth: BasicContainerDefaultThemebasicminWidth, height: BasicContainerDefaultThemebasicheight, lineHeight: BasicContainerDefaultThemebasiclineHeight, backgroundColor: BasicContainerDefaultThemebasicbackgroundColor, backgroundImage: BasicContainerDefaultThemebasicbackgroundImage, backgroundPosition: BasicContainerDefaultThemebasicbackgroundPosition, backgroundRepeat: BasicContainerDefaultThemebasicbackgroundRepeat, backgroundSize: BasicContainerDefaultThemebasicbackgroundSize, cursor: BasicContainerDefaultThemebasiccursor, whiteSpace: BasicContainerDefaultThemebasicwhiteSpace, textAlign: BasicContainerDefaultThemebasictextAlign, fontSize: BasicContainerDefaultThemebasicfontSize, color: BasicContainerDefaultThemebasiccolor, ...BasicContainerDefaultThemebasicotherStyle }, hover: { ...BasicContainerDefaultThemehoverotherStyle }, };

    }
  }

  return <BasicContainer
    theme={(switchDefaultTheme(themeselect))}
    baseDefaultTheme={themeselect} >這是一個不帶Flex的容器組件</BasicContainer>;
};

BasicContainer_.story = {
  parameters: {
    notes: { "BasicContainerNote": BasicContainerNote },
  }
};
//#endregion

