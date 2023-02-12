import { flexRender, Table } from "@tanstack/react-table";
import * as React from "react";
import { ArrowUp } from "react-feather";
import styled, { css } from "styled-components";
import { USE_ROOT_COLOR } from "../../theme/root";
import { Stack, Typo } from "../../ui-blocks";
import { TableFilter } from "./filters";
import { TableFilterType } from "./filters/types";
import { StyledTh } from "./styles";

const StyledTHead = styled.thead`
  background-color: ${USE_ROOT_COLOR("soft-color")};
`;

interface IColumnMeta {
  filter?: TableFilterType;
}

const StyledSorting = styled(ArrowUp)<{ $isSorted: boolean; $isDesc: boolean }>`
  color: ${USE_ROOT_COLOR("muted-text")};
  opacity: 0.7;
  cursor: pointer;
  margin-left: 0px;
  transition: transform 0.3s;
  ${(props) => props.$isDesc && "transform: rotate(180deg);"}

  ${(props) =>
    props.$isSorted &&
    css`
      color: ${USE_ROOT_COLOR("primary-color")};
      opacity: 1;
    `}
`;

interface IProps {
  table: Table<Record<string, unknown>>;
}

export function TableHead({ table }: IProps) {
  return (
    <StyledTHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <StyledTh
                key={header.id}
                $isSortable={header.column.getCanSort()}
                onClick={header.column.getToggleSortingHandler()}
              >
                <Stack justify="space-between" align="center">
                  <Typo.XS weight="bold" as="span">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Typo.XS>
                  <Stack justify="end" width="auto" align="center" spacing={0}>
                    {header.column.getCanSort() && (
                      <StyledSorting
                        size={18}
                        aria-label={`Sort By ${header.id} ${
                          // eslint-disable-next-line no-nested-ternary
                          header.column.getIsSorted()
                            ? header.column.getIsSorted() === "desc"
                              ? "Desc"
                              : "Asc"
                            : ""
                        }`}
                        $isSorted={!!header.column.getIsSorted()}
                        $isDesc={header.column.getIsSorted() === "desc"}
                      />
                    )}
                    {header.column.getCanFilter() ? (
                      <TableFilter
                        column={header.column}
                        type={
                          (header.column.columnDef.meta as IColumnMeta).filter
                        }
                      />
                    ) : null}
                  </Stack>
                </Stack>
              </StyledTh>
            );
          })}
        </tr>
      ))}
    </StyledTHead>
  );
}
