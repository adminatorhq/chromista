/* eslint-disable react/function-component-definition */
import React from 'react';
import { Story } from '@storybook/react';
import { Tooltip, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    id: 'foo',
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <p id="foo">Hover over me</p>
    <Tooltip {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const ToTheRight = Template.bind({});
ToTheRight.args = {
  place: 'right',
};

export const OffsetRight = Template.bind({});
OffsetRight.args = {
  place: 'right',
  offset: {
    right: 40,
  },
};
