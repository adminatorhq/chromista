/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { GitHub } from "react-feather";
import { action } from "@storybook/addon-actions";
import { Alert, IProps, AlertType } from ".";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/Alert",
  component: Alert,
  args: {
    message: "Hello There, This is an alert",
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <Alert {...args} />
  </AppWrapper>
);

export const Info = Template.bind({});
Info.args = {
  type: AlertType.Info,
};

export const Success = Template.bind({});
Success.args = {
  type: AlertType.Success,
};

export const Error = Template.bind({});
Error.args = {
  type: AlertType.Error,
};

export const Warning = Template.bind({});
Warning.args = {
  type: AlertType.Warning,
};

export const WithAction = Template.bind({});
WithAction.args = {
  type: AlertType.Info,
  action: {
    action: () => action(""),
    Icon: GitHub,
    label: "Do Something",
  },
};

export const JSX = Template.bind({});
JSX.args = {
  type: AlertType.Info,
  action: {
    action: () => action(""),
    Icon: GitHub,
    label: "Do Something",
  },
  message: (
    <span>
      <p>
        <b> Awesome!,</b>
      </p>
      <p>
        You have been using Hadmean for about a week now. Hope you are enjoying
        it so far.
      </p>
      <p>
        We have spent countless hours developing this free app, and we would
        really appreciate it if you could drop a star on Github to boost our
        motivation.
      </p>
    </span>
  ),
  renderJsx: true,
};
