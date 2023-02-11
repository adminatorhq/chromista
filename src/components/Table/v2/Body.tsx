import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../../theme/root";
import { EmptyWrapper } from "../../EmptyWrapper";

const StyledTd = styled.td`
  padding: 0.45rem;
  vertical-align: middle;
  font-weight: 400;

  &:not(:last-child) {
    border-right: 1px solid ${USE_ROOT_COLOR("border-color")};
  }
`;

const StyledBodyTR = styled.tr`
  padding: 4px;
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
  page-break-inside: avoid;
  &:hover {
    background-color: ${USE_ROOT_COLOR("soft-color")};
  }
`;

interface IProps {
  table: Table<Record<string, unknown>>;
  dataLength: number;
  isLoading: boolean;
  emptyMessage?: string;
}

export function TableBody({
  table,
  dataLength,
  emptyMessage,
  isLoading,
}: IProps) {
  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <StyledBodyTR key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <StyledTd key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </StyledTd>
          ))}
        </StyledBodyTR>
      ))}
      {dataLength === 0 ? (
        <StyledBodyTR>
          <StyledTd colSpan={10000}>
            {isLoading ? (
              <div style={{ height: "204px" }} />
            ) : (
              <EmptyWrapper text={emptyMessage || "No Data"} />
            )}
          </StyledTd>
        </StyledBodyTR>
      ) : null}
    </tbody>
  );
}
