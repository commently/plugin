import React from 'react';
import Panel from './Panel'

export default { component: Panel };

const Template = (args) => <Panel {...args} />;

export const Primary = Template.bind({});
Primary.args = { clientX: 50, clientY: 50 };
