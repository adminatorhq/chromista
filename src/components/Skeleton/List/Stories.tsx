/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { ListSkeleton, IProps } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/Skeleton/List",
  component: ListSkeleton,
  args: {},
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <ListSkeleton {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
