import React from 'react';
import debounce from 'lodash-es/debounce';
import AsyncSelect from 'react-select/async';
import { useQuery } from 'react-query';
import { RequestService } from '../../services';
import { USE_QUERY_CONFIG } from '../../hooks/data/config';
import { ISelectData } from '../../types';
import { FormNoValueSelect } from './FormSelect';

interface IFormEntitySelectionList {
  disabledOptions: string[];
  onChange: (value: string, label?: string) => void;
  cacheKey: string;
  entity: 'products';
}

const debouncedSearch = debounce(
  async (
    inputValue: string,
    entity: string,
    disabledOptions: string[],
    resolve: (value: any) => void,
  ) =>
    resolve(
      (
        await RequestService.get(`selection-list?entity=${entity}&search=${inputValue}`)
      ).data.filter(({ value }: ISelectData) => !disabledOptions.includes(value)),
    ),
  700,
);

export const FormEntitySelectionList: React.FC<IFormEntitySelectionList> = ({
  disabledOptions,
  onChange,
  cacheKey,
  entity,
}): JSX.Element => {
  const { data = [] } = useQuery<ISelectData[]>(
    cacheKey,
    async () => (await RequestService.get(`selection-list?entity=${entity}`)).data,
    USE_QUERY_CONFIG,
  );

  if (data.length && data[0].value === 'SELECTION_LIST_LIMIT') {
    return (
      <AsyncSelect
        cacheOptions={true}
        defaultOptions={true}
        onChange={({ value, label }: any) => {
          if (value) {
            onChange(value, label);
          }
        }}
        value={{ value: '' }}
        loadOptions={inputValue => {
          return new Promise(async resolve => {
            if (inputValue.length < 3) {
              return resolve([
                {
                  value: '',
                  label: 'Please input three characters or more',
                },
              ]);
            }
            debouncedSearch(inputValue, entity, disabledOptions, resolve);
          });
        }}
      />
    );
  }

  return (
    <FormNoValueSelect onChange={onChange} disabledOptions={disabledOptions} selectData={data} />
  );
};
