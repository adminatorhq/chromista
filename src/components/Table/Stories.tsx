import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AppWrapper } from '../../AppWrapper';
import { Presentation, IProps } from './Presentation';

export default {
  title: 'Components/Table',
  component: Presentation,
  args: {
    singular: 'Item',
    createPath: '/foo',
    title: 'Some Table Title',
    fetchTableDataParams: {
      pageSize: 10,
      pageIndex: 1,
      sortBy: [{ id: 'name', desc: true }],
      hiddenColumns: [],
    },
    setFetchTableDataParams: action('setFetchTableDataParams'),
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Verified',
        accessor: 'verified',
      },
    ],
    tableData: {
      data: {
        data: [
          {
            name: 'React',
            age: 27,
            verified: true,
          },
          {
            name: 'Angular',
            age: 28,
            verified: true,
          },
          {
            name: 'View',
            age: 29,
            verified: true,
          },
        ],
        pageIndex: 1,
        pageSize: 10,
        totalRecords: 200,
      },
      isLoading: false,
      error: false,
      isPreviousData: false,
    },
  } as IProps,
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <Presentation {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const Empty = Template.bind({});
Empty.args = {
  tableData: {
    data: {
      data: [],
      pageIndex: 1,
      pageSize: 10,
      totalRecords: 0,
    },
    isLoading: false,
    error: false,
    isPreviousData: false,
  },
};

export const Error = Template.bind({});
Error.args = {
  tableData: {
    data: {
      data: [],
      pageIndex: 1,
      pageSize: 10,
      totalRecords: 0,
    },
    isLoading: false,
    error: 'Some Error Occured',
    isPreviousData: false,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  tableData: {
    data: {
      data: [],
      pageIndex: 1,
      pageSize: 10,
      totalRecords: 0,
    },
    isLoading: true,
    error: false,
    isPreviousData: false,
  },
};
