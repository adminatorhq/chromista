import React from 'react';
import debounce from 'lodash/debounce';
import AsyncSelect from 'react-select/async';
import { useQuery } from 'react-query';
import { RequestService } from '@gothicgeeks/shared';
import { ISelectData } from '../../types';
import { FormNoValueSelect } from './FormSelect';

interface IProps {
  disabledOptions: string[];
  onChange: (value: string, label?: string) => void;
  url: string;
}

const debouncedSearch = debounce(
  async (
    inputValue: string,
    url: string,
    disabledOptions: string[],
    resolve: (value: any) => void,
  ) => resolve(
    (await RequestService.get(`${url}&search=${inputValue}`)).data.filter(
      ({ value }: ISelectData) => !disabledOptions.includes(value as string),
    ),
  ),
  700,
);

export function FormEntitySelectionList({
  disabledOptions,
  onChange,
  url,
}: IProps) {
  const { data = [] } = useQuery<ISelectData[]>(
    [url],
    async () => (await RequestService.get(url)).data,
  );

  if (data.length && data[0].value === 'SELECTION_LIST_LIMIT') {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        onChange={({ value, label }: any) => {
          if (value) {
            onChange(value, label);
          }
        }}
        value={{ value: '' }}
        loadOptions={(inputValue) => new Promise((resolve) => {
          if (inputValue.length < 3) {
            resolve([
              {
                value: 'Please input three characters or more',
                // label: 'Please input three characters or more',
              },
            ]);
            return;
          }
          debouncedSearch(inputValue, url, disabledOptions, resolve);
        })}
      />
    );
  }

  return (
    <FormNoValueSelect
      onChange={onChange}
      disabledOptions={disabledOptions}
      selectData={data}
    />
  );
}
