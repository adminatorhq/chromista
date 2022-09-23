/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { BlockSkeleton, IProps } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/Skeleton/Block",
  component: BlockSkeleton,
  args: {},
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <BlockSkeleton {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  height: "200px",
};
