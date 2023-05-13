/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { RenderCode, IProps } from ".";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/RenderCode",
  component: RenderCode,
  args: {
    input: {
      hello: {
        there: "how are you",
      },
      foo: ["bar", "baz", "bax"],
    },
  },
};

const Template: Story<IProps> = (args) => {
  return (
    <AppWrapper>
      <RenderCode {...args} />
    </AppWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {};
