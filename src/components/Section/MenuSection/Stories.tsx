/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Save } from "react-feather";
import { MenuSection, IProps } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/MenuSection",
  component: MenuSection,
  args: {
    menuItems: [
      {
        name: "Item 1",
        action: "item-1",
      },
      {
        name: "Item Icon",
        action: "item-icon",
        IconComponent: Save,
      },
      {
        name: "Item Action",
        action: action("Click me"),
      },
      {
        name: "Item Disabled",
        action: "item-disabled",
        disabled: true,
      },
    ],
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <MenuSection {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {
  currentMenuItem: "item-1",
};
