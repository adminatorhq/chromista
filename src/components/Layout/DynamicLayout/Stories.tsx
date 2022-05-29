import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DynamicLayout, IProps } from '.';
import { AppWrapper } from '../../../AppWrapper';
import { HardDrive } from 'react-feather';

export default {
  title: 'Layouts/DynamicLayout',
  component: DynamicLayout,
  args: {
    children: <p>Layout Content Will Be Here</p>,
    selectionView: [
      {
        title: 'Menu Item 1',
        icon: HardDrive,
        link: '/foo',
        action: action('menu Action'),
        dataTestId: 'foo-test-id',

        view: <p>Demo View</p>,
        description: 'Some Description here',
        iconButtons: [
          {
            icon: 'add',
            onClick: action('icon button click'),
          },
        ],
      },
    ],
  },
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <DynamicLayout {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
