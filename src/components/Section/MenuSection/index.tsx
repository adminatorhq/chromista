import React from "react";
import { Icon } from "react-feather";
import { RenderList } from "../../RenderList";
import { SectionBox } from "../SectionBox";
import { SectionListItem } from "../SectionList";

interface IMenuItem {
  name: string;
  link: string;
  action?: () => void;
  IconComponent?: Icon;
  disabled?: boolean;
}

interface IMenuSection {
  menuItems: IMenuItem[];
  currentMenuItem?: string;
}

export function MenuSection({ menuItems, currentMenuItem }: IMenuSection) {
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
            onClick={menuItem.action}
            toNoWhere={menuItem.action ? true : undefined}
            active={menuItem.link.includes(`${currentMenuItem}`)}
            disabled={!!menuItem.disabled}
            key={menuItem.name}
            IconComponent={menuItem.IconComponent}
            to={menuItem.link}
          />
        )}
      />
    </SectionBox>
  );
}
