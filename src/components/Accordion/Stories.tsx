/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { AlertOctagon } from "react-feather";
import { AccordionItem, IProps } from ".";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/AccordionItem",
  component: AccordionItem,
  args: {
    icon: AlertOctagon,
    name: "Foo Title",
    body: <>Some body content</>,
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <AccordionItem {...args} highlight name="Highlighted" />
    <AccordionItem {...args} />
    <AccordionItem {...args} />
    <AccordionItem {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
