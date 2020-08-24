import { addDecorator, addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS,/* or MINIMAL_VIEWPORTS,*/ } from '@storybook/addon-viewport';
// import DefaultTheme from '../src/ComponentsOld/Theme/DefaultTheme/DefaultTheme'
// import OtherTheme from '../src/ComponentsOld/Theme/OtherTheme/OtherTheme'
import React from 'react'


// const options = {
//     theme: [{ name: "DefaultTheme", theme: DefaultTheme }, { name: "OtherTheme", theme: OtherTheme }],
//     provider: ThemeProvider
// };

//addDecorator(withThemePlayground(options));

const customViewports = {
    //自定義裝置螢幕
    // kindleFire2: {
    //     name: 'Kindle Fire 2',
    //     styles: {
    //         width: '600px',
    //         height: '963px',
    //     },
    // },
    // kindleFireHD: {
    //     name: 'Kindle Fire HD',
    //     styles: {
    //         width: '533px',
    //         height: '801px',
    //     },
    // },
};

addParameters({
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
            ...customViewports
        }, // newViewports would be an ViewportMap. (see below for examples)
        //defaultViewport: 'someDefault',
    },
    // options: {
    //     theme: { DefaultTheme, OtherTheme },
    // },
});