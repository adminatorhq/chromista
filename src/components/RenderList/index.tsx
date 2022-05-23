import React, { useState } from 'react';
import { ErrorAlert } from '../Alert';
import { EmptyWrapper } from '../EmptyWrapper';
import { ListSkeleton } from '../Skeleton/ListSkeleton';
import { SectionList } from '../Section/SectionList';
import { FormSearch } from '../Form/FormSearch';
import { SoftButton } from '../Form/SoftButton';

interface IRenderList<T> {
  isLoading?: boolean;
  items: T[];
  newItemLink?: string;
  singular?: string;
  error?: unknown;
  notSearchable?: boolean;
  sort?: boolean;
  render: (item: T, index: number) => JSX.Element;
  searchFunction?: (items: T[], searchString: string) => T[];
}

function defaultSearchFunction<T extends { name: string }>(
  itemsToSearch: T[],
  searchString: string,
) {
  return itemsToSearch.filter(({ name }) => name.toLowerCase().includes(searchString));
}

export function RenderList<T extends { name: string }>({
  isLoading,
  items,
  newItemLink,
  error,
  sort,
  notSearchable,
  singular = 'Item',
  render,
  searchFunction = defaultSearchFunction,
}: IRenderList<T>) {
  const itemsLength = items.length;
  const [searchString, setSearchString] = useState('');
  if (error) {
    return <ErrorAlert message={error} />;
  }
  if (isLoading) {
    return <ListSkeleton />;
  }
  if (itemsLength === 0) {
    return (
      <EmptyWrapper text={`No ${singular} To Look At`}>
        {newItemLink ? (
          <SoftButton to={newItemLink} label={`Add New ${singular}`} icon="add" />
        ) : null}
      </EmptyWrapper>
    );
  }

  const itemsToRender = sort ? [...items].sort((a, b) => a.name.localeCompare(b.name)) : items;

  const searchResults =
    searchString.length > 0 ? searchFunction(itemsToRender, searchString) : itemsToRender;

  return (
    <SectionList>
      {itemsLength > 5 && !notSearchable ? <FormSearch onChange={setSearchString} /> : null}
      {searchResults.map((item, index) => (
        <div key={item.name}>{render(item, index)}</div>
      ))}
      {searchResults.length === 0 && searchString.length > 0 ? (
        <EmptyWrapper text="No Search Results" />
      ) : null}
    </SectionList>
  );
}
