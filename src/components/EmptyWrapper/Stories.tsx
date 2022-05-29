import React from 'react';
import { Story } from '@storybook/react';
import { EmptyWrapper, IProps } from '.';
import { AppWrapper } from '../../AppWrapper';

export default {
  title: 'Components/EmptyWrapper',
  component: EmptyWrapper,
  args: {
    text: 'Some empty message for you',
  },
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <EmptyWrapper {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const NoIcon = Template.bind({});
NoIcon.args = {
  hideIcon: true,
  border: true,
};

export const Border = Template.bind({});
Border.args = {
  border: true,
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  children: (
    <>
      <b>This is bold</b> <>This is not</>
    </>
  ),
};
