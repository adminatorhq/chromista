import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { AppWrapper } from '../../../AppWrapper';
import { FormSwitch, IProps } from '.';

const Demo = (args: IProps) => {
  const [value, setValue] = useState(true);
  return (
    <FormSwitch
      {...args}
      name="foo"
      onChange={setValue}
      value={value}
      label="Fooo"
    />
  );
};

export default {
  title: 'Components/FormSwitch',
  component: Demo,
  args: {},
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <Demo {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const LabelLess = Template.bind({});
LabelLess.args = {
  label: '',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};
