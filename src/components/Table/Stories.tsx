import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AppWrapper } from '../../AppWrapper';
import { Presentation, IProps } from './Presentation';
import {
  ListSelectionFilter,
  NumberSelectionFilter,
  StatusFilter,
  TextSearchFilter,
} from './Table.filters';

export default {
  title: 'Components/Table',
  component: Presentation,
  args: {
    singular: 'Item',
    createPath: '/foo',
    title: 'Some Table Title',
    paginatedDataState: {
      pageSize: 10,
      pageIndex: 1,
      sortBy: [{ id: 'name', desc: true }],
      hiddenColumns: [],
    },
    setPaginatedDataState: action('setPaginatedDataState'),
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
        Filter: TextSearchFilter,
      },
      {
        Header: 'Age',
        accessor: 'age',
        Filter: NumberSelectionFilter,
      },
      {
        Header: 'Verified',
        accessor: 'verified',
        Filter: StatusFilter([
          { color: '#00ff00', label: 'Yes', value: 'true' },
          { color: '#ff0000', label: 'No', value: 'false' },
        ]),
      },
      {
        Header: 'Author',
        accessor: 'author',
        Filter: ListSelectionFilter([
          { id: 'fb', name: 'Facebook' },
          { id: 'ggl', name: 'Google' },
        ]),
      },
    ],
    tableData: {
      data: {
        data: [
          {
            name: 'React',
            age: 27,
            verified: true,
            approved: 'pending',
            author: 'Facbook',
          },
          {
            name: 'Angular',
            age: 28,
            verified: true,
            approved: 'progress',
            author: 'Goggle',
          },
          {
            name: 'Vue',
            age: 29,
            verified: true,
            approved: 'done',
            author: 'Evan Yue',
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
