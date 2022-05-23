import React from 'react';
import ReactTooltip from 'react-tooltip';

interface ITooltip {
  id: string;
  place?: 'bottom' | 'right';
  offset?: { right: number };
}

// .hello{
//     padding: .25rem .5rem;
//   }

export const Tooltip: React.FC<ITooltip> = ({ id, place = 'bottom', offset }) => {
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
};
