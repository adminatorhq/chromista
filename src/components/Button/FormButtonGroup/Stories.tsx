import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { AppWrapper } from '../../../AppWrapper';
import { FormButtonGroup, IProps } from '.';

const Demo = ({ options }: IProps) => {
  const [state, setState] = useState<string | boolean>('');
  return (
    <FormButtonGroup onChange={setState} value={state} options={options} />
  );
};

export default {
  title: 'Components/FormButtonGroup',
  component: Demo,
  args: {},
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <Demo {...args} />
  </AppWrapper>
);

export const StringValues = Template.bind({});
StringValues.args = {
  options: [
    {
      label: 'Foo',
      value: 'foo',
    },
    {
      label: 'Bar',
      value: 'bar',
    },
  ],
};

export const ManyValues = Template.bind({});
ManyValues.args = {
  options: [
    {
      label: 'Foo',
      value: 'foo',
    },
    {
      label: 'Bar',
      value: 'bar',
    },
    {
      label: 'Baz',
      value: 'baz',
    },
    {
      label: 'Lee',
      value: 'lee',
    },
    {
      label: 'Man',
      value: 'man',
    },
  ],
};

export const BooleanValues = Template.bind({});
BooleanValues.args = {
  options: [
    {
      label: 'True',
      value: true,
    },
    {
      label: 'False',
      value: false,
    },
  ],
};
