import { RequestService } from '@gothicgeeks/shared';
import querystring from 'qs';
import { useQuery } from 'react-query';
import { IFetchTableDataParams, ITablePayload } from './Table.types';

const tableDataParamsToQueryString = (
  fetchTableDataParams: IFetchTableDataParams
): string => {
  const sortBy = fetchTableDataParams.sortBy[0]?.id || 'createdAt';
  const orderBy = fetchTableDataParams.sortBy[0]
    ? fetchTableDataParams.sortBy[0].desc
      ? 'DESC'
      : 'ASC'
    : 'DESC';
  return querystring.stringify({
    page: fetchTableDataParams.pageIndex + 1,
    take: fetchTableDataParams.pageSize,
    orderBy,
    sortBy,
    filters: fetchTableDataParams.filters,
  });
};

export const useFetchTableData = (
  url: string,
  fetchTableDataParams: IFetchTableDataParams
) =>
  useQuery<ITablePayload<Record<string, unknown>>>(
    [fetchTableDataParams],
    async () =>
      (
        await RequestService.get(
          `${url}?${tableDataParamsToQueryString(fetchTableDataParams)}`
        )
      ).data,
    { keepPreviousData: true }
  );
