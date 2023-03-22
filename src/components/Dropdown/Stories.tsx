/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MoreVertical } from "react-feather";
import { Dropdown, IProps } from ".";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  args: {
    target: <MoreVertical />,
    children: <div>Hello world</div>,
    onDropDownActiveChange: action("onDropDownActiveChange"),
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Dropdown {...args} />
    </div>
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const PreserveClick = Template.bind({});
PreserveClick.args = {
  preserveVisibiltyOnClick: true,
};

export const Left = Template.bind({});
Left.args = {
  align: "left",
};
