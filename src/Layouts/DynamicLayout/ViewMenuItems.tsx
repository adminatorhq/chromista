import React from 'react';
import { DataStateKeys } from '@gothicgeeks/shared';
import { RenderList, SectionListItem } from '../../components';
import { INavigationMenuItems } from '../types';

interface Props {
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
}

export const ViewMenuItems: React.FC<Props> = ({ viewMenuItems }) => (
  <RenderList
    isLoading={viewMenuItems?.isLoading}
    items={(viewMenuItems?.data || []).map(({ title, ...rest }) => ({
      name: title,
      ...rest,
    }))}
    error={viewMenuItems?.error}
    render={({ name, link, action }) => (
      <SectionListItem label={name} to={link} onClick={action} key={name} />
    )}
  />
);
