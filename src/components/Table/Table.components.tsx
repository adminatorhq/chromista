import React, { useMemo } from 'react';
import keyBy from 'lodash/keyBy';

interface IRenderNameAndIdListValue {
  selections: { id: string; name: string }[];
  values: string[];
}

export const RenderNameAndIdListValue: React.FC<IRenderNameAndIdListValue> = ({
  selections,
  values,
}) => {
  const selectionsAsObject = useMemo(() => keyBy(selections, 'id'), [
    selections,
  ]);
  return (
    <>
      {values
        .map(category => selectionsAsObject[category]?.name)
        .filter(category => category)
        .join(', ')}
    </>
  );
};
