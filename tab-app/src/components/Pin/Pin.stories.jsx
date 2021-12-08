import React from 'react';
import Pin from './Pin'

export default { component: Pin };

const Template = (args) => <Pin {...args} />;

export const Primary = Template.bind({});
Primary.args = { clientX: 10, clientY: 10 };