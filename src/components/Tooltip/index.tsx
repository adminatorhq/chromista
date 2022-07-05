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

export const Tooltip: React.FC<IProps> = ({ id, place = 'bottom', offset }) => (
  <ReactTooltip
    id={id}
    backgroundColor="#000"
    effect="solid"
    className="hello"
    offset={offset}
    place={place}
  />
);
