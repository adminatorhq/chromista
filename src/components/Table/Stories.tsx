/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Download, Plus } from "react-feather";
import { AppWrapper } from "../../AppWrapper";
import { Table, IProps } from ".";

export default {
  title: "Components/Table",
  component: Table,
  args: {
    title: "Some Table title",
    menuItems: [
      {
        label: "Create Item",
        onClick: action("Create Item"),
        IconComponent: Plus,
      },
      {
        label: "Download Data",
        onClick: action("Download Item"),
        IconComponent: Download,
      },
    ],
    paginatedDataState: {
      pageSize: 10,
      pageIndex: 1,
      sortBy: [{ id: "id", desc: false }],
      filters: [
        {
          id: "name",
          value: {
            value: "React",
            operator: "e",
          },
        },
      ],
      hiddenColumns: [],
    },
    setPaginatedDataState: action("setPaginatedDataState"),
    columns: [
      {
        Header: "Id",
        accessor: "id",
        filter: { _type: "idField" },
      },
      {
        Header: "Name Foo",
        accessor: "name",
        filter: { _type: "string" },
      },
      {
        Header: "Age",
        accessor: "age",
        filter: { _type: "number" },
      },
      {
        Header: "Verified",
        accessor: "verified",
        disableSortBy: true,
        filter: {
          _type: "boolean",
          bag: [
            { color: "#00ff00", label: "Yes", value: "true" },
            { color: "#ff0000", label: "No", value: "false" },
          ],
        },
      },
      {
        Header: "Role",
        accessor: "role",
        disableSortBy: true,
        filter: {
          _type: "status",
          bag: [
            { color: "#00ff00", label: "Admin", value: "admin" },
            { color: "#fff000", label: "Editor", value: "editor" },
            { color: "#fff000", label: "User", value: "user" },
            { color: "#ff00f0", label: "Developer", value: "developer" },
          ],
        },
      },
      {
        Header: "Author",
        accessor: "author",
        filter: {
          _type: "list",
          bag: "http://localhost:3000/roles",
        },
      },
      {
        Header: "Registered",
        accessor: "createdAt",
        filter: {
          _type: "date",
        },
      },
      {
        Header: "Actions",
        accessor: "__action__",
        disableSortBy: true,
        Cell: () => <p>Some Action</p>,
      },
    ],
    tableData: {
      data: {
        data: [
          {
            id: 1,
            name: "React",
            age: 27,
            verified: "true",
            approved: "pending",
            role: "Admin",
            author: "Facbook",
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "Angular",
            age: 28,
            verified: "true",
            role: "Editor",
            approved: "progress",
            author: "Goggle",
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            name: "Vue",
            age: 29,
            role: "User",
            verified: "false",
            approved: "done",
            author: "Evan Yue",
            createdAt: new Date().toISOString(),
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
    <Table {...args} />
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
    error: "Some Error Occured",
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

export const PreviousData = Template.bind({});
PreviousData.args = {
  tableData: {
    data: {
      data: [],
      pageIndex: 1,
      pageSize: 10,
      totalRecords: 0,
    },
    isLoading: false,
    error: false,
    isPreviousData: true,
  },
};
