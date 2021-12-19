import React from 'react';
import Panel from './Panel'

export default { component: Panel };

const Template = (args) => <Panel {...args} />;

export const Initial = Template.bind({});
Initial.args = { clientX: 50, clientY: 50, comments: [] };

export const WithComments = Template.bind({});
WithComments.args = { clientX: 50, clientY: 50, comments: [
  {
    id: '1',
    createdAt: 1639948585271,
    text: `That should be on the right`,
  },
  {
    id: '2',
    createdAt: 1639948660856,
    text: 'This comment is a long sentence because we need long texts in the posts as well',
  },
  {
    id: '3',
    createdAt: 1639948674404,
    text: `This comment is a two-line post.
To preserve use formatting.`,
  }
] };
