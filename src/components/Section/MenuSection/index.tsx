import React from 'react';
import { RenderList } from '../../RenderList';
import { SectionBox } from '../SectionBox';
import { SectionListItem } from '../SectionList';

interface IMenuItem {
  name: string;
  link: string;
  disabled: boolean;
}

interface IMenuSection {
  menuItems: IMenuItem[];
  currentMenuItem?: string;
}

export const MenuSection: React.FC<IMenuSection> = ({ menuItems, currentMenuItem }) => (
  <SectionBox title={''} headLess={true}>
    <RenderList
      items={menuItems}
      notSearchable={true}
      newItemLink={''}
      singular={''}
      render={menuItem => (
        <SectionListItem
          label={menuItem.name}
          active={menuItem.link.includes(`${currentMenuItem}`)}
          disabled={menuItem.disabled}
          key={menuItem.name}
          to={menuItem.link}
        />
      )}
    />
  </SectionBox>
);
