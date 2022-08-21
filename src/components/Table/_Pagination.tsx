import ReactPaginate from "react-paginate";
import React from "react";
import styled from "styled-components";
import { SimpleSelect } from "../Form";
import { Stack, Text } from "../../ui-blocks";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

const StyledPagination = styled.div`
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
  }

  .page-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.71rem;
    line-height: 1.8;
    color: ${USE_ROOT_COLOR("primary-color")};
  }

  .page-item.active {
    .page-link {
      z-index: 3;
      color: ${USE_ROOT_COLOR("inverse-text")};
      background-color: ${USE_ROOT_COLOR("primary-color")};
      border-color: ${USE_ROOT_COLOR("primary-color")};
    }
  }

  .page-item.disabled {
    .page-link {
      color: #b6c2e4;
      border-color: #eaf0f9;
    }
  }
`;

interface IProps {
  setPageSize: (pageSize: number) => void;
  gotoPage: (page: number) => void;
  totalRecords: number;
  pageSize: number;
  totalPageCount: number;
}

const PAGE_SIZES = [10, 25, 50, 100];

export function TablePagination({
  setPageSize,
  gotoPage,
  totalRecords,
  pageSize,
  totalPageCount,
}: IProps) {
  return (
    <Stack justify="space-between" align="center">
      <Text>
        Showing{" "}
        <SimpleSelect
          options={PAGE_SIZES.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          onChange={(value) => setPageSize(Number(value))}
          value={pageSize}
        />{" "}
        entries of <b>{totalRecords}</b> results
      </Text>
      <StyledPagination>
        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          breakLabel="..."
          pageCount={totalPageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          pageClassName="page-item"
          breakLinkClassName="page-link"
          pageLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          onPageChange={({ selected }) => {
            gotoPage(selected);
          }}
        />
      </StyledPagination>
    </Stack>
  );
}
