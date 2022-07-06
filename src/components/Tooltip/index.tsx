import React from 'react';
import ReactTooltip from 'react-tooltip';

export interface IProps {
  id: string;
  place?: 'bottom' | 'right';
  offset?: { right: number };
}

// .hello{
//     padding: .25rem .5rem;
//   }

export function Tooltip({ id, place = 'bottom', offset }: IProps) {
  return (
    <ReactTooltip
      id={id}
      backgroundColor="#000"
      effect="solid"
      className="hello"
      offset={offset}
      place={place}
    />
  );
}
