import React, { useState, useEffect } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import { SectionList, SectionListItem } from '../Section/SectionList';
import { DataStateKeys } from '@gothicgeeks/shared';
import { ErrorAlert } from '../Alert';
import { ListSkeleton } from '../Skeleton';
import { EmptyWrapper } from '../EmptyWrapper';
import { Spacer, Stack } from '../../ui-blocks';
import { FormButton } from '../Button';
import { Move } from 'react-feather';

export interface IProps<T> {
  data: DataStateKeys<T[]>;
  onSave: (data: string[]) => Promise<void>;
}

export function SortList<T extends { name: string }>({
  data,
  onSave,
}: IProps<T>) {
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [touched, setTouched] = useState(false);

  const [sortedData, setSortedData] = useState<Array<T>>([]);

  useEffect(() => {
    setSortedData(data.data || []);
  }, [data.data]);

  const onSortEnd = (oldOrder: number, newOrder: number) => {
    setTouched(true);
    setSortedData(array => arrayMoveImmutable(array, oldOrder, newOrder));
  };

  if (data.error) {
    return <ErrorAlert message={data.error} />;
  }

  if (data.isLoading) {
    return <ListSkeleton />;
  }

  const itemsLength = (data?.data || [])?.length;

  if (itemsLength <= 1) {
    return <EmptyWrapper text={`Cant sort ${itemsLength} items`} />;
  }

  return (
    <SectionList>
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {sortedData.map(item => (
          <SortableItem key={item.name}>
            <div className="item">
              <SectionListItem
                IconComponent={Move}
                label={item.name}
                toNoWhere={true}
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
      <Spacer />
      <Stack>
        <FormButton
          onClick={async () => {
            setIsMakingRequest(true);
            await onSave(sortedData.map(({ name }) => name));
            setIsMakingRequest(false);
            setTouched(false);
          }}
          text={'Save Order'}
          disabled={!touched}
          isMakingRequest={isMakingRequest}
        />
      </Stack>
    </SectionList>
  );
}
