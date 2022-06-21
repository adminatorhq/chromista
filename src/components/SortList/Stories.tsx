import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SortList, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';

interface IDemoType {
  name: string;
}

export default {
  title: 'Components/SortList',
  component: SortList,
  args: {
    onSave: action('save'),
    data: {
      isLoading: false,
      error: '',
      data: [
        { name: 'Planck' },
        { name: 'Faraday' },
        { name: 'Newton' },
        { name: 'Einstein' },
        { name: 'Bohr' },
        { name: 'Curie' },
      ],
    },
  },
};

const Template: Story<IProps<IDemoType>> = args => (
  <AppWrapper>
    <SortList {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
  data: {
    isLoading: true,
    data: [],
    error: '',
    isRefetching: false,
  },
};

export const Error = Template.bind({});
Error.args = {
  data: {
    isLoading: false,
    data: [],
    error: 'Some Error',
    isRefetching: false,
  },
};

export const Empty = Template.bind({});
Empty.args = {
  data: {
    isLoading: false,
    data: [],
    error: '',
    isRefetching: false,
  },
};

export const SingleItem = Template.bind({});
SingleItem.args = {
  data: {
    isLoading: false,
    data: [{ name: 'Foo' }],
    error: '',
    isRefetching: false,
  },
};
