import { create } from '@storybook/theming/create';
//import { ReactComponent as Logo } from './logo.svg'
import logoUrl from './public/logo.svg';

export default create({
    //   base: 'light',

    //   colorPrimary: 'hotpink',
    //   colorSecondary: 'deepskyblue',

    // UI
       appBg: 'white',
    //   appContentBg: 'silver',
       appBorderColor: 'grey',
     //  appBorderRadius: 4,

    // Typography
    //   fontBase: '"Open Sans", sans-serif',
    //   fontCode: 'monospace',

    // Text colors
    //   textColor: 'black',
    //   textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: '#fff',
    barSelectedColor: '#f4f1bb',
    barBg: '#36c9c6',

    // Form colors
    //   inputBg: 'white',
    //   inputBorder: 'silver',
    //   inputTextColor: 'black',
    //   inputBorderRadius: 4,

    brandTitle: '組件收藏庫',
    brandUrl: '#',
    brandImage: (process.env.NODE_ENV === 'production') ? '/logo.svg' : logoUrl,
});