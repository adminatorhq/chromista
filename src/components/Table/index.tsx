import React, { useState } from 'react';
import { DEFAULT_TABLE_PARAMS } from './constants';
import { Presentation } from './Presentation';
import { useFetchTableData } from './Table.hooks';
import { IFetchTableDataParams, ITableProps } from './Table.types';

// TODO when I click on products the state should be preserved when returning back for navigation
// and keep all the settings in localstorage except the pageIndex

export const Table: React.FC<ITableProps> = ({ url, ...props }) => {
  const [fetchTableDataParams, setFetchTableDataParams] = useState<
    IFetchTableDataParams
  >(DEFAULT_TABLE_PARAMS);

  const tableData = useFetchTableData(url, fetchTableDataParams);

  return (
    <Presentation
      {...{
        tableData,
        setFetchTableDataParams,
        fetchTableDataParams,
        ...props,
      }}
    />
  );
};
// nice  to have, column ordering
// https://react-table.tanstack.com/docs/examples/row-selection-and-pagination
// https://react-table.tanstack.com/docs/examples/editable-data
// https://react-table.tanstack.com/docs/examples/column-hiding
// https://react-table.tanstack.com/docs/examples/column-resizing
// https://react-table.tanstack.com/docs/examples/full-width-table
// https://react-table.tanstack.com/docs/examples/full-width-resizable-table
