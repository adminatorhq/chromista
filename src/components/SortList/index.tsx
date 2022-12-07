import React, { useState, useEffect } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import { DataStateKeys, StringUtils } from "@hadmean/protozoa";
import { Move } from "react-feather";
import { SectionList, SectionListItem } from "../Section/SectionList";
import { ErrorAlert } from "../Alert";
import { ListSkeleton } from "../Skeleton";
import { EmptyWrapper } from "../EmptyWrapper";
import { Spacer, Stack } from "../../ui-blocks";
import { FormButton } from "../Button";
import { HSpacer } from "../../ui-blocks/Spacer";
import { defaultToEmptyArray } from "./utils";

function arrayMoveMutable<T>(array: T[], fromIndex: number, toIndex: number) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

function arrayMoveImmutable<T>(array: T[], fromIndex: number, toIndex: number) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}

export interface IProps<T> {
  data: DataStateKeys<T[]>;
  onSave: (data: string[]) => Promise<void>;
  count: number;
}

const THRESHOLD_FOR_LONG_ITEMS_TO_SHOW_SAVE_CHANGES_AT_TOP = 10;

export function SortList<T extends { value: string; label?: string }>({
  data,
  onSave,
  count,
}: IProps<T>) {
  const [isMakingRequest, setIsMakingRequest] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sortedData, setSortedData] = useState<Array<T>>([]);

  useEffect(() => {
    setSortedData(defaultToEmptyArray(data.data));
  }, [JSON.stringify(data.data)]);

  const onSortEnd = (oldOrder: number, newOrder: number) => {
    setTouched(true);
    setSortedData((array) => arrayMoveImmutable(array, oldOrder, newOrder));
  };

  if (data.error) {
    return <ErrorAlert message={data.error} />;
  }

  if (data.isLoading) {
    return <ListSkeleton count={count} />;
  }

  const itemsLength = defaultToEmptyArray(data?.data)?.length;

  if (itemsLength <= 1) {
    return (
      <EmptyWrapper
        text={`Cant sort ${StringUtils.pluralize("item", itemsLength, true)}`}
      />
    );
  }

  const saveChanges = (
    <>
      <Spacer size="sm" />
      <Stack>
        <FormButton
          onClick={async () => {
            setIsMakingRequest(true);
            await onSave(sortedData.map(({ value }) => value));
            setIsMakingRequest(false);
            setTouched(false);
          }}
          text="Save Order"
          disabled={!touched}
          isMakingRequest={isMakingRequest}
        />
        <HSpacer size="sm" />
      </Stack>
      <Spacer size="sm" />
    </>
  );

  return (
    <SectionList>
      {sortedData.length >
        THRESHOLD_FOR_LONG_ITEMS_TO_SHOW_SAVE_CHANGES_AT_TOP && saveChanges}
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {sortedData.map((item) => (
          <SortableItem key={item.value}>
            <div className="item">
              <SectionListItem
                IconComponent={Move}
                label={item.label || item.value}
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
      {saveChanges}
    </SectionList>
  );
}
