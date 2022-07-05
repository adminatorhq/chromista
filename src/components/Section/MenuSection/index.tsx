import React from 'react';
import { Icon } from 'react-feather';
import { RenderList } from '../../RenderList';
import { SectionBox } from '../SectionBox';
import { SectionListItem } from '../SectionList';

interface IMenuItem {
  name: string;
  link: string;
  IconComponent?: Icon;
  disabled?: boolean;
}

interface IMenuSection {
  menuItems: IMenuItem[];
  currentMenuItem?: string;
}

export const MenuSection: React.FC<IMenuSection> = ({
  menuItems,
  currentMenuItem,
}) => (
  <SectionBox title="" headLess>
    <RenderList
      items={menuItems}
      notSearchable
      newItemLink=""
      singular=""
      render={(menuItem) => (
        <SectionListItem
          label={menuItem.name}
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
