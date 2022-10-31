/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { BadgePill, IProps } from "./BadgePill";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/BadgePill",
  component: BadgePill,
  args: {
    value: 49,
    color: "success",
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <BadgePill {...args} />
  </AppWrapper>
);

export const Success = Template.bind({});
Success.args = {};

export const Danger = Template.bind({});
Danger.args = {
  color: "danger",
};

export const Info = Template.bind({});
Info.args = {
  color: "info",
};

export const Warning = Template.bind({});
Warning.args = {
  color: "warning",
};

export const IsIconBadge = Template.bind({});
IsIconBadge.args = {
  isIconBadge: true,
};
