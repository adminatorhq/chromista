import React from 'react';
import { RenderList, SectionListItem } from '../../components';
import { DataStateKeys } from '@gothicgeeks/shared';
import { INavigationMenuItems } from '../types';

interface Props {
  viewMenuItems?: DataStateKeys<INavigationMenuItems[]>;
}

export const ViewMenuItems: React.FC<Props> = ({ viewMenuItems }) => {
  return (
    <RenderList
      isLoading={viewMenuItems?.isLoading}
      items={(viewMenuItems?.data || []).map(({ title, ...rest }) => ({
        name: title,
        ...rest,
      }))}
      error={viewMenuItems?.error}
      sort={true}
      render={({ name, link, action }) => (
        <SectionListItem label={name} to={link} onClick={action} key={name} />
      )}
    />
  );
};
