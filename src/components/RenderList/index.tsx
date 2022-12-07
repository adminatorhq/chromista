import React, { ReactNode, useState } from "react";
import { ErrorAlert } from "../Alert";
import { EmptyWrapper } from "../EmptyWrapper";
import { ListSkeleton } from "../Skeleton/List";
import { SectionList } from "../Section/SectionList";
import { FormSearch } from "../Form/FormSearch";
import { SoftButton } from "../Button/SoftButton";

export interface IProps<T> {
  isLoading?: false | number;
  items: T[];
  newItemLink?: string;
  singular?: string;
  error?: unknown;
  notSearchable?: boolean;
  sortByName?: boolean;
  searchKeywordsField?: keyof T;
  render: (item: T, index: number) => ReactNode;
  searchFunction?: (items: T[], searchString: string) => T[];
}

function defaultSearchFunction<T extends { name: string }>(
  metaSearchKey?: keyof T
) {
  return (itemsToSearch: T[], searchString: string) => {
    return itemsToSearch.filter(
      (value) =>
        value.name.toLowerCase().includes(searchString) ||
        (metaSearchKey &&
          (value[metaSearchKey] as unknown as string)
            .toLowerCase()
            .includes(searchString))
    );
  };
}

export function RenderList<T extends { name: string }>({
  isLoading,
  items,
  newItemLink,
  error,
  sortByName,
  notSearchable,
  singular = "Item",
  render,
  searchKeywordsField,
  searchFunction,
}: IProps<T>) {
  const itemsLength = items.length;
  const [searchString, setSearchString] = useState("");
  if (error) {
    return <ErrorAlert message={error} />;
  }
  if (isLoading) {
    return <ListSkeleton count={isLoading} />;
  }
  if (itemsLength === 0) {
    return (
      <EmptyWrapper text={`No ${singular} To Look At`}>
        {newItemLink && (
          <SoftButton
            action={newItemLink}
            label={`Add New ${singular}`}
            icon="add"
          />
        )}
      </EmptyWrapper>
    );
  }

  const itemsToRender = sortByName
    ? [...items].sort((a, b) => a.name.localeCompare(b.name))
    : items;

  const searchFnToUse =
    searchFunction || defaultSearchFunction(searchKeywordsField);

  const searchResults =
    searchString.length > 0
      ? searchFnToUse(itemsToRender, searchString)
      : itemsToRender;

  return (
    <SectionList>
      {itemsLength > 5 && !notSearchable ? (
        <FormSearch onChange={setSearchString} />
      ) : null}
      {searchResults.map((item, index) => (
        <div key={item.name}>{render(item, index)}</div>
      ))}
      {searchResults.length === 0 && searchString.length > 0 ? (
        <EmptyWrapper text="No Search Results" />
      ) : null}
    </SectionList>
  );
}
