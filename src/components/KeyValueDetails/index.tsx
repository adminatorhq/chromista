import React from 'react';
import { StyledSpan } from '../../styles/Element';
import { StyledMutedText } from '../../styles/Text';
import { ISystemStatusForDisplay } from '../../types';
import { BadgeBuilder } from '../Badge';
import { Currency } from '../Currency';
import { StyledListGroup } from '../Lists';
import { ListSkeleton } from '../Skeleton/ListSkeleton';
import { StringFilters } from '@gothicgeeks/shared';

export enum KeyValueDetailsFormat {
  Money = 'money',
  Number = 'number',
  Status = 'status',
}

export const KeyValueDetailsIconProps = {
  size: 15,
  color: '#a4abc5',
};

interface IKeyValueDetails {
  keyValues: {
    key: string;
    icon?: JSX.Element;
    value: string | number | undefined;
    format?: KeyValueDetailsFormat;
    statuses?: ISystemStatusForDisplay[];
  }[];
  isLoading?: boolean;
}

// :eyes throw error if statuses is not provided when it is KeyValueDetailsFormat
export const KeyValueDetails: React.FC<IKeyValueDetails> = ({ isLoading, keyValues }) => {
  if (isLoading) {
    return <ListSkeleton count={Object.entries(keyValues).length} />;
  }
  return (
    <StyledListGroup>
      {keyValues.map(({ key, value, format, statuses, icon }) => {
        let valueToRender = <>{value}</>;
        switch (format) {
          case KeyValueDetailsFormat.Status:
            if (statuses) {
              valueToRender = <BadgeBuilder value={value as string} statusSelections={statuses} />;
            }
            break;
          case KeyValueDetailsFormat.Money:
            valueToRender = <Currency price={value as number} />;
            break;
          case KeyValueDetailsFormat.Number:
            valueToRender = <>{StringFilters.formatCount(value)}</>;
        }
        return (
          <li
            key={key}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              {icon} <StyledMutedText as={StyledSpan}>{key}</StyledMutedText>
            </div>
            {valueToRender}
          </li>
        );
      })}
    </StyledListGroup>
  );
};
