/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AppWrapper } from "../../AppWrapper";
import { SoftButton, IProps } from "./SoftButton";

export default {
  title: "Components/Button",
  component: SoftButton,
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <SoftButton {...args} />
  </AppWrapper>
);

export const Loading = Template.bind({});
Loading.args = {
  isMakingActionRequest: true,
  action: () => action("On Click"),
};

export const Edit = Template.bind({});
Edit.args = {
  icon: "edit",
  label: "Edit",
  action: () => action("On Click"),
};

export const Add = Template.bind({});
Add.args = {
  icon: "add",
  label: "Add",
  action: () => action("On Click"),
};

export const Save = Template.bind({});
Save.args = {
  icon: "save",
  label: "Save",
  action: () => action("On Click"),
};

export const Settings = Template.bind({});
Settings.args = {
  icon: "settings",
  label: "Settings",
  action: () => action("On Click"),
};

export const Close = Template.bind({});
Close.args = {
  icon: "close",
  label: "Close",
  action: () => action("On Click"),
};

export const Eye = Template.bind({});
Eye.args = {
  icon: "eye",
  label: "Eye",
  action: () => action("On Click"),
};

export const Help = Template.bind({});
Help.args = {
  icon: "help",
  label: "Help",
  action: () => action("On Click"),
};

export const Back = Template.bind({});
Back.args = {
  icon: "back",
  label: "Back",
  action: () => action("On Click"),
};
