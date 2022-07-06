/* eslint-disable react/function-component-definition */
import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Download, Plus } from 'react-feather';
import { AppWrapper } from '../../AppWrapper';
import { Presentation, IProps } from './Presentation';

export default {
  title: 'Components/Table',
  component: Presentation,
  args: {
    title: 'Some Table title',
    menuItems: [
      {
        label: 'Create Item',
        onClick: action('Create Item'),
        IconComponent: Plus,
      },
      {
        label: 'Download Data',
        onClick: action('Download Item'),
        IconComponent: Download,
      },
    ],
    paginatedDataState: {
      pageSize: 10,
      pageIndex: 1,
      sortBy: [{ id: 'name', desc: true }],
      hiddenColumns: [],
    },
    setPaginatedDataState: action('setPaginatedDataState'),
    columns: [
      {
        Header: 'Name Foo',
        accessor: 'name',
        filter: { _type: 'string' },
      },
      {
        Header: 'Age',
        accessor: 'age',
        filter: { _type: 'number' },
      },
      {
        Header: 'Verified',
        accessor: 'verified',
        disableSortBy: true,
        filter: {
          _type: 'status',
          bag: [
            { color: '#00ff00', label: 'Yes', value: 'true' },
            { color: '#ff0000', label: 'No', value: 'false' },
          ],
        },
      },
      {
        Header: 'Author',
        accessor: 'author',
        filter: {
          _type: 'list',
          bag: [
            { id: 'fb', name: 'Facebook' },
            { id: 'ggl', name: 'Google' },
          ],
        },
      },
      {
        Header: 'Actions',
        accessor: '__action__',
        disableSortBy: true,
        Cell: () => <p>Some Action</p>,
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

const Template: Story<IProps> = (args) => (
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
