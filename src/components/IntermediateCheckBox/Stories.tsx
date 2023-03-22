/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { IntermediateCheckBox, IProps } from ".";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/IntermediateCheckBox",
  component: IntermediateCheckBox,
  args: {
    onClick: () => action("onClick"),
    label: "Label",
  },
};

const Template: Story<IProps> = (args) => {
  return (
    <AppWrapper>
      <IntermediateCheckBox {...args} />
    </AppWrapper>
  );
};

export const Checked = Template.bind({});
Checked.args = {
  state: "checked",
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  state: "unchecked",
};

export const Partial = Template.bind({});
Partial.args = {
  state: "partial",
};

export const Disabled = Template.bind({});
Disabled.args = {
  state: "unchecked",
  disabled: true,
};
