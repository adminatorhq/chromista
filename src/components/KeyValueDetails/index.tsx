import React, { ReactNode } from "react";
import { StringFilters } from "@gothicgeeks/shared";
import { Text } from "../../ui-blocks";
import { ISystemStatusForDisplay } from "../../types";
import { BadgeBuilder } from "../Badge";
import { Currency } from "../Currency";
import { StyledListGroup } from "../Lists";
import { ListSkeleton } from "../Skeleton/ListSkeleton";

export enum KeyValueDetailsFormat {
  Money = "money",
  Number = "number",
  Status = "status",
}

export const KeyValueDetailsIconProps = {
  size: 15,
  color: "#a4abc5",
};

interface IKeyValueDetails {
  keyValues: {
    key: string;
    icon?: ReactNode;
    value: string | number | undefined;
    format?: KeyValueDetailsFormat;
    statuses?: ISystemStatusForDisplay[];
  }[];
  isLoading?: boolean;
}

// :eyes throw error if statuses is not provided when it is KeyValueDetailsFormat
export function KeyValueDetails({ isLoading, keyValues }: IKeyValueDetails) {
  if (isLoading) {
    return <ListSkeleton count={Object.entries(keyValues).length} />;
  }
  return (
    <StyledListGroup>
      {keyValues.map(({ key, value, format, statuses, icon }) => {
        let valueToRender = <span>{value}</span>;
        switch (format) {
          case KeyValueDetailsFormat.Status:
            if (statuses) {
              valueToRender = (
                <BadgeBuilder
                  value={value as string}
                  statusSelections={statuses}
                />
              );
            }
            break;
          case KeyValueDetailsFormat.Money:
            valueToRender = <Currency price={value as number} />;
            break;
          case KeyValueDetailsFormat.Number:
            valueToRender = <>{StringFilters.formatCount(value)}</>;
            break;
        }
        return (
          <li
            key={key}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              {icon}{" "}
              <Text color="muted" as="span">
                {key}
              </Text>
            </div>
            {valueToRender}
          </li>
        );
      })}
    </StyledListGroup>
  );
}
