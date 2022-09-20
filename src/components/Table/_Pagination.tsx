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
    margin-left: 4px;
    font-size: 0.71rem;
    border-radius: 4px;
    line-height: 1.8;
    cursor: pointer;
    color: ${USE_ROOT_COLOR("primary-color")};
    border: 1px solid ${USE_ROOT_COLOR("primary-color")};
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
      cursor: not-allowed;
      color: ${USE_ROOT_COLOR("muted-text")};
      border-color: ${USE_ROOT_COLOR("border-color")};
    }
  }
`;

const Root = styled.div`
  background: ${USE_ROOT_COLOR("base-color")};
  padding: 0 0.5rem;
`;

interface IProps {
  setPageSize: (pageSize: number) => void;
  gotoPage: (page: number) => void;
  totalRecords: number;
  pageIndex: number;
  pageSize: number;
  totalPageCount: number;
}

const PAGE_SIZES = [10, 25, 50, 100];

export function TablePagination({
  setPageSize,
  gotoPage,
  totalRecords,
  pageIndex,
  pageSize,
  totalPageCount,
}: IProps) {
  if (totalPageCount === 0) {
    return null;
  }
  return (
    <Root>
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
          entries of <b>{Intl.NumberFormat("en-US").format(totalRecords)}</b>{" "}
          results
        </Text>
        <StyledPagination>
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            breakLabel="..."
            pageCount={totalPageCount}
            renderOnZeroPageCount={() => null}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            breakClassName="page-item"
            nextClassName="page-item"
            forcePage={pageIndex}
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
    </Root>
  );
}
