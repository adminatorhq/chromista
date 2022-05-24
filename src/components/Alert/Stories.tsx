import React from 'react';
import { Story } from '@storybook/react';
import { Alert, IProps, AlertType } from '.';
import { AppWrapper} from '../../AppWrapper';

export default {
  title: 'Alert',
  component: Alert,
  args: {
    message: "Hello There, This is an alert",
  },
};

const Template: Story<IProps> = args => <AppWrapper><Alert {...args} /></AppWrapper>;

export const Info = Template.bind({});
Info.args = {
    type: AlertType.Info
};

export const Success = Template.bind({});
Success.args = {
    type: AlertType.Success
};

export const Error = Template.bind({});
Error.args = {
    type: AlertType.Error
};

export const Warning = Template.bind({});
Warning.args = {
    type: AlertType.Info
};

export const JSX = Template.bind({});
JSX.args = {
    type: AlertType.Info,
    message: <span><b>This is bold</b> And This is not</span>,
    renderJsx: true,
};
