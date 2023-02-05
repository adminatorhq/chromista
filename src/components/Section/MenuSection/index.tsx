import React from "react";
import { Icon } from "react-feather";
import styled from "styled-components";
import { SHADOW_CSS, StyledCardBody } from "../../Card";
import { RenderList } from "../../RenderList";
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

const Root = styled(StyledCardBody)`
  ${SHADOW_CSS}
`;

export function MenuSection({ menuItems, currentMenuItem }: IProps) {
  return (
    <Root>
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
    </Root>
  );
}
