import React from 'react';
import { Story } from '@storybook/react';
import { TagsList, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';

export default {
  title: 'Components/TagsList',
  component: TagsList,
  args: {
    items: [
      {
        id: 'Foo',
        label: 'Foo',
      },
      {
        id: 'Bar',
        label: 'Bar',
      },
      {
        id: 'Baz',
        label: 'Baz',
      },
      {
        id: 'Labelless',
      },
    ],
  },
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <TagsList {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const DeletingItem = Template.bind({});
DeletingItem.args = {
  isMakingDeleteRequestForId: 'Foo',
};

export const Empty = Template.bind({});
Empty.args = {
  items: [],
  entityName: 'Item',
};
