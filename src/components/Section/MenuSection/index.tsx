import React from "react";
import { Icon } from "react-feather";
import { RenderList } from "../../RenderList";
import { SectionBox } from "../SectionBox";
import { SectionListItem } from "../SectionList";

interface IMenuItem {
  name: string;
  action: string | (() => void);
  IconComponent?: Icon;
  disabled?: boolean;
}

export interface IProps {
  menuItems: IMenuItem[];
  currentMenuItem?: string;
}

export function MenuSection({ menuItems, currentMenuItem }: IProps) {
  return (
    <SectionBox title="" headLess>
      <RenderList
        items={menuItems}
        notSearchable
        newItemLink=""
        singular=""
        render={(menuItem) => (
          <SectionListItem
            label={menuItem.name}
            action={menuItem.action}
            active={(typeof menuItem.action === "string"
              ? menuItem.action
              : ""
            ).includes(`${currentMenuItem}`)}
            disabled={!!menuItem.disabled}
            key={menuItem.name}
            IconComponent={menuItem.IconComponent}
          />
        )}
      />
    </SectionBox>
  );
}
