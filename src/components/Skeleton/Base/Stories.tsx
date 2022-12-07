/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { BaseSkeleton, IProps } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/Skeleton/Base",
  component: BaseSkeleton,
  args: {},
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <BaseSkeleton {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const FullWidth = Template.bind({});
FullWidth.args = {
  height: "200px",
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  height: "200px",
  width: "200px",
};
