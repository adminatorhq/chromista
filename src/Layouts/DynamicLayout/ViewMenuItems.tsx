import React from "react";
import { DataStateKeys } from "@gothicgeeks/shared";
import { RenderList, SectionListItem } from "../../components";
import { INavigationMenuItems } from "../types";

interface Props {
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
}

export function ViewMenuItems({ viewMenuItems }: Props) {
  return (
    <RenderList
      isLoading={viewMenuItems?.isLoading}
      items={(viewMenuItems?.data || []).map(({ title, ...rest }) => ({
        name: title,
        ...rest,
      }))}
      searchKeywordsField="searchKeywordsField"
      error={viewMenuItems?.error}
      render={({ name, action }) => (
        <SectionListItem label={name} action={action} key={name} />
      )}
    />
  );
}
