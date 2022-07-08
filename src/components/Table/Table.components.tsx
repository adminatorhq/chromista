import React, { useMemo } from "react";
import keyBy from "lodash/keyBy";

interface IProps {
  selections: { id: string; name: string }[];
  values: string[];
}

export function RenderNameAndIdListValue({ selections, values }: IProps) {
  const selectionsAsObject = useMemo(
    () => keyBy(selections, "id"),
    [selections]
  );
  return (
    <>
      {values
        .map((category) => selectionsAsObject[category]?.name)
        .filter((category) => category)
        .join(", ")}
    </>
  );
}
