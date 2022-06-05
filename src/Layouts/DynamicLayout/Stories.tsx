import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DynamicLayout, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';
import { HardDrive } from 'react-feather';
import { DataStateKeys } from '@gothicgeeks/shared';
import { INavigationMenuItems } from '../types';

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
        view: <p>First View</p>,
        description: 'Some Description here',
        iconButtons: [
          {
            icon: 'add',
            onClick: action('icon button click'),
          },
        ],
      },
      {
        title: 'Error Menu Items',
        icon: HardDrive,
        link: '/foo1',
        action: action('menu Action'),
        viewMenuItems: {
          error: 'Some Error Message',
          isLoading: false,
          data: [],
          isRefetching: false,
        } as DataStateKeys<INavigationMenuItems[]>,
        description: 'Some Description here',
      },
      {
        title: 'Loading Menu Items',
        icon: HardDrive,
        link: '/foo2',
        action: action('menu Action'),
        viewMenuItems: {
          error: '',
          isLoading: true,
          data: [],
          isRefetching: false,
        } as DataStateKeys<INavigationMenuItems[]>,
        description: 'Some Description here',
      },
      {
        title: 'Loading Menu Items',
        icon: HardDrive,
        link: '/foo3',
        action: action('menu Action'),
        viewMenuItems: {
          error: '',
          isLoading: true,
          data: [],
          isRefetching: false,
        } as DataStateKeys<INavigationMenuItems[]>,
        description: 'Some Description here',
      },
      {
        title: 'Empty Menu Items',
        icon: HardDrive,
        link: '/foo4',
        action: action('menu Action'),
        viewMenuItems: {
          error: '',
          isLoading: false,
          data: [],
          isRefetching: false,
        } as DataStateKeys<INavigationMenuItems[]>,
        description: 'Some Description here',
      },
      {
        title: 'With Menu Items',
        icon: HardDrive,
        link: '/foo5',
        action: action('menu Action'),
        viewMenuItems: {
          error: '',
          isLoading: false,
          data: [
            { title: 'Foo', link: 'link1' },
            { title: 'Foo2', link: 'link2' },
            { title: 'Foo3', action: action('Foo 3') },
          ],
          isRefetching: false,
        } as DataStateKeys<INavigationMenuItems[]>,
        description: 'Some Description here',
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
