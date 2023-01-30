import React from "react";
import { RenderList, SectionListItem, SoftButton } from "../../components";
import { Spacer } from "../../ui-blocks";
import { IViewMenuItems } from "../types";

interface Props {
  viewMenuItems: IViewMenuItems;
}

export function ViewMenuItems({
  viewMenuItems: { menuItems, singular, newItemLink, topAction },
}: Props) {
  return (
    <>
      {topAction && (
        <>
          <SoftButton
            action={topAction?.action}
            block
            label={topAction.title}
            icon="settings"
          />
          <Spacer size="xxl" />
        </>
      )}
      <RenderList
        isLoading={menuItems?.isLoading && 20}
        items={(menuItems?.data || []).map(({ title, ...rest }) => ({
          name: title,
          ...rest,
        }))}
        singular={singular}
        newItemLink={newItemLink}
        searchKeywordsField="searchKeywords"
        error={menuItems?.error}
        render={({ name, action, secondaryAction }) => (
          <SectionListItem
            label={name}
            action={action}
            secondaryAction={secondaryAction}
            key={name}
          />
        )}
      />
    </>
  );
}
