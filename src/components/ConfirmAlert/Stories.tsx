/* eslint-disable react/function-component-definition */
import React from 'react';
import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Presentation, IPresentationProps } from '.';
import { AppWrapper } from '../../AppWrapper';

export default {
  title: 'Components/ConfirmAlert',
  component: Presentation,
  args: {
    action: action('action'),
    onClose: action('onClose'),
    title: 'Wanna do this',
    message: 'This is irrevisble',
  },
};

const Template: Story<IPresentationProps> = (args) => (
  <AppWrapper>
    <Presentation {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
