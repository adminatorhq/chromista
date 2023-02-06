/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { Minus, Plus, Save } from "react-feather";
import { DropDownMenu, IProps } from ".";
import { AppWrapper } from "../../AppWrapper";

export default {
  title: "Components/DropdownMenu",
  component: DropDownMenu,
  args: {
    menuItems: [
      {
        label: "Menu Item 1",
        IconComponent: Save,
        onClick: () => {},
      },
      {
        label: "Menu Item 2",
        description: "Hello There, Lorem Ipsum, Dolor Amet",
        IconComponent: Plus,
        onClick: () => {},
      },
      {
        label: "Menu Item 3",
        description: "Hello There, Lorem Ipsum, Dolor Amet",
        IconComponent: Minus,
        onClick: () => {},
      },
    ],
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <DropDownMenu {...args} />
    </div>
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const MakingRequest = Template.bind({});
MakingRequest.args = {
  isMakingActionRequest: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const SingleAction = Template.bind({});
SingleAction.args = {
  menuItems: [
    {
      label: "Menu Item 1",
      IconComponent: Save,
      onClick: () => {},
    },
  ],
};
