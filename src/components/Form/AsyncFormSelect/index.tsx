import React from "react";
import debounce from "lodash/debounce";
import AsyncSelect from "react-select/async";
import { makeGetRequest, useApi } from "@gothicgeeks/shared";
import { ISelectData } from "../../../types";
import { FormSelect, IBaseFormSelect } from "../FormSelect";
import { generateClassNames } from "../_wrapForm";
import { FormSkeleton, FormSkeletonSchema } from "../../Skeleton";
import { ErrorAlert } from "../../Alert";

// interface IProps {
//   disabledOptions: string[];
//   onChange: (value: string, label?: string) => void;
//   url: string;
//   limit?: number;
// }

interface IProps extends IBaseFormSelect {
  url: string;
  limit?: number;
}

const debouncedSearch = debounce(
  async (
    inputValue: string,
    url: string,
    disabledOptions: string[],
    resolve: (value: any) => void
  ) =>
    resolve(
      (await makeGetRequest(`${url}&search=${inputValue}`)).data.filter(
        ({ value }: ISelectData) => !disabledOptions.includes(value as string)
      )
    ),
  700
);

export function AsyncFormSelect(props: IProps) {
  const {
    input,
    url,
    limit = 50,
    meta,
    disabled,
    // label: formLabel,
    disabledOptions = [],
    nullable,
    // defaultLabel,
  } = props;

  const { isLoading, error, data = [] } = useApi<ISelectData[]>(url);

  if (isLoading) {
    return <FormSkeleton schema={[FormSkeletonSchema.Input]} />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (data.length >= limit) {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        {...input}
        onChange={({ value }: any) => {
          input.onChange(nullable && !value ? null : value);
        }}
        isDisabled={disabled}
        className={generateClassNames(meta)}
        value={{ value: "" }}
        loadOptions={(inputValue) =>
          new Promise((resolve) => {
            if (inputValue.length < 3) {
              resolve([
                {
                  value: "Please input three characters or more",
                  // label: 'Please input three characters or more',
                },
              ]);
              return;
            }
            debouncedSearch(inputValue, url, disabledOptions, resolve);
          })
        }
      />
    );
  }

  return <FormSelect {...props} selectData={data} />;
}
