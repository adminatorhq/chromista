/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { IPaginatedDataState } from "@hadmean/protozoa";
import { AppWrapper } from "../../AppWrapper";
import { Table, IProps, DEFAULT_TABLE_STATE } from ".";
import { TABLE_COLUMNS, TABLE_DATA } from "./data";

export default {
  title: "Components/Table",
  component: Table,
  args: {
    overridePaginatedDataState: {
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
    syncPaginatedDataStateOut: action("setPaginatedDataState"),
    columns: TABLE_COLUMNS,
    tableData: TABLE_DATA,
  } as IProps<unknown>,
};

const Template: Story<IProps<unknown>> = (args) => {
  const [paginatedDataState, setPaginatedDataState] = useState<
    IPaginatedDataState<any>
  >({ ...DEFAULT_TABLE_STATE });

  return (
    <AppWrapper>
      <button
        type="button"
        onClick={() => {
          setPaginatedDataState({
            pageSize: 10,
            pageIndex: 4,
            sortBy: [{ id: "id", desc: false }],
            filters: [
              {
                id: "name",
                value: {
                  value: new Date(),
                  operator: "e",
                },
              },
            ],
            hiddenColumns: [],
          });
        }}
      >
        Click Me
      </button>
      <Table {...args} overridePaginatedDataState={paginatedDataState} />
    </AppWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithBorder = Template.bind({});
WithBorder.args = {
  border: true,
};

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
    ...TABLE_DATA,
    isPreviousData: true,
  },
};
