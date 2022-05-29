import React from 'react';
import { Story } from '@storybook/react';
import { Breadcrumbs, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [
      {
        value: 'Foo',
        label: 'Foo',
      },
      {
        value: 'Bar',
        label: 'Bar',
      },
      {
        value: 'Baz',
        label: 'Baz',
      },
    ],
    onItemClick: action('onItemClick'),
  },
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <Breadcrumbs {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
