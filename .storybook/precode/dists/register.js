// import React from 'react';
// import { addons, types } from '@storybook/addons';
// import { useParameter } from '@storybook/api';
// import { AddonPanel } from '@storybook/components';

// const ADDON_ID = 'myaddon';
// const PARAM_KEY = 'myAddon';
// const PANEL_ID = `${ADDON_ID}/panel`;

// const MyPanel = () => {
//   const value = useParameter(PARAM_KEY, null);
//   const item = value ? value.data : "";
//   return <div>{item}</div>;
// }

// addons.register(ADDON_ID, api => {
//   const render = ({ active, key }) => (
//     <AddonPanel active={active} key={key}>
//       <MyPanel />
//     </AddonPanel>
//   );
//   const title = 'My Addon';

//   addons.add(PANEL_ID, {
//     type: types.PANEL,
//     title,
//     render,
//     paramKey: PARAM_KEY,
//   });
// });


import React from 'react';
import { addons } from '@storybook/addons';
import { useChannel } from '@storybook/api';
import { STORY_CHANGED } from '@storybook/core-events';
import { AddonPanel } from '@storybook/components';

const MyPanel = () => {
  const emit = useChannel({
    STORY_RENDERED: id => { /* do something */ },
    'my/customEvent': () => { /* so something */ },
  });

  //return <button onClick={() => emit('my/otherEvent')}>click to emit</button>;
  return `接下來將整合更多功能...`
}

// Register the addon with a unique name.
addons.register('my/addon', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('my/addon/panel', {
    title: '新功能開發中',
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <MyPanel />
      </AddonPanel>
    ),
  });
});