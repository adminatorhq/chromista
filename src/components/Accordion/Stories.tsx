import React from 'react';
import { Story } from '@storybook/react';
import { AccordionItem, IProps } from '.';
import { AlertOctagon } from 'react-feather';
import { AppWrapper } from '../../AppWrapper';

export default {
  title: 'Components/AccordionItem',
  component: AccordionItem,
  args: {
    icon: AlertOctagon,
    name: 'Foo Title',
    body: <>Some body content</>,
  },
};

const Template: Story<IProps> = args => (
  <AppWrapper>
    <AccordionItem {...args} highlight={true} name="Highlighted" />
    <AccordionItem {...args} />
    <AccordionItem {...args} />
    <AccordionItem {...args} />
  </AppWrapper>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {};
