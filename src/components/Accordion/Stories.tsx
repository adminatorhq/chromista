import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AccordionItem, IProps } from '.';
import { ChevronUp } from 'react-feather';

export default {
  title: 'AccordionItem',
  component: AccordionItem,
  args: {
    icon: ChevronUp,
    name: 'Foo Title',
    body: <>Some body content</>,
  },
};

const Template: Story<IProps> = args => <AccordionItem {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});
Default.args = {};


export const Highlighted = Template.bind({});
Highlighted.args = {
    highlight: true
};