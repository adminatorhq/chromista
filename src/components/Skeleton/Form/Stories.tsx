/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { FormSkeleton, FormSkeletonSchema, IProps } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/Skeleton/Form",
  component: FormSkeleton,
  args: {
    schema: [
      FormSkeletonSchema.Input,
      FormSkeletonSchema.Input,
      FormSkeletonSchema.RichTextArea,
      FormSkeletonSchema.Textarea,
    ],
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <FormSkeleton {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
