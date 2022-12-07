import React from "react";
import { DataStateKeys } from "@hadmean/protozoa";
import { RenderList, SectionListItem } from "../../components";
import { INavigationMenuItems } from "../types";

interface Props {
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
}

export function ViewMenuItems({ viewMenuItems }: Props) {
  return (
    <RenderList
      isLoading={viewMenuItems?.isLoading && 20}
      items={(viewMenuItems?.data || []).map(({ title, ...rest }) => ({
        name: title,
        ...rest,
      }))}
      searchKeywordsField="searchKeywords"
      error={viewMenuItems?.error}
      render={({ name, action, secondaryAction }) => (
        <SectionListItem
          label={name}
          action={action}
          secondaryAction={secondaryAction}
          key={name}
        />
      )}
    />
  );
}
