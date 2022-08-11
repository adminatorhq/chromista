import React from "react";
import debounce from "lodash/debounce";
import AsyncSelect from "react-select/async";
import { makeGetRequest, useApi } from "@gothicgeeks/shared";
import { ISelectData } from "../../../types";
import { FormSelect, IBaseFormSelect, StyledSelect } from "../FormSelect";
import { generateClassNames, wrapLabelAndError } from "../_wrapForm";
import { FormSkeleton, FormSkeletonSchema } from "../../Skeleton";
import { ErrorAlert } from "../../Alert";

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
  ) => {
    const toReturn = (
      await makeGetRequest(`${url}?value_like=${inputValue}`)
    ).filter(
      ({ value }: ISelectData) => !disabledOptions.includes(value as string)
    );
    resolve(toReturn);
  },
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
    return wrapLabelAndError(
      <StyledSelect
        as={AsyncSelect}
        cacheOptions
        defaultOptions
        {...input}
        onChange={({ value }: any) => {
          input.onChange(nullable && !value ? null : value);
        }}
        classNamePrefix="react-select"
        isDisabled={disabled}
        className={generateClassNames(meta)}
        value={{ value: input.value, label: "Selected Value" }}
        loadOptions={(inputValue) =>
          new Promise((resolve) => {
            if (inputValue.length < 3) {
              resolve([
                {
                  value: "",
                  label: "Input three or more characters to start searching",
                },
              ]);
              return;
            }
            debouncedSearch(inputValue, url, disabledOptions, resolve);
          })
        }
      />,
      props
    );
  }

  return <FormSelect {...props} selectData={data} />;
}
