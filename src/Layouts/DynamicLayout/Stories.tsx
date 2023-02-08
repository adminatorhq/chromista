/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Home, Settings, Shield, Table, User, Users, Zap } from "react-feather";
import { DataStateKeys } from "@hadmean/protozoa";
import { DynamicLayout, IProps } from ".";
import { AppWrapper } from "../../AppWrapper";
import { INavigationMenuItems } from "../types";

export default {
  title: "Layouts/DynamicLayout",
  component: DynamicLayout,
  args: {
    children: <p>Layout Content Will Be Here</p>,
    selectionView: [
      {
        title: "Home",
        icon: Home,
        action: action("menu Action"),
        view: <p>First View</p>,
        description: "Some Description here",
        iconButtons: [
          {
            icon: "add",
            onClick: action("icon button click"),
          },
        ],
      },
      {
        title: "Tables",
        icon: Table,
        action: action("menu Action"),
        viewMenuItems: {
          menuItems: {
            error: "Some Error Message",
            isLoading: false,
            data: [],
            isRefetching: false,
          } as DataStateKeys<INavigationMenuItems[]>,
        },
        description: "Some Description here",
      },
      {
        title: "Actions",
        icon: Zap,
        action: action("menu Action"),
        viewMenuItems: {
          menuItems: {
            error: "",
            isLoading: true,
            data: [],
            isRefetching: false,
          } as DataStateKeys<INavigationMenuItems[]>,
        },
        description: "Some Description here",
      },
      {
        title: "Settings",
        icon: Settings,
        action: action("menu Action"),
        viewMenuItems: {
          menuItems: {
            error: "",
            isLoading: false,
            data: [],
            isRefetching: false,
          } as DataStateKeys<INavigationMenuItems[]>,
        },
        description: "Some Description here",
      },
      {
        title: "Users",
        icon: Users,
        action: action("menu Action"),
        viewMenuItems: {
          menuItems: {
            error: "",
            isLoading: false,
            data: [
              { title: "Foo1", link: "link1" },
              { title: "Foo2", link: "link2" },
              { title: "Foo3", link: "link3" },
              { title: "Foo4", action: action("Foo 4") },
              { title: "Foo5", link: "link5" },
            ],
            isRefetching: false,
          } as DataStateKeys<INavigationMenuItems[]>,
        },
        description: "Some Description here",
      },
      {
        title: "Roles",
        icon: Shield,
        action: action("menu Action"),
        viewMenuItems: {
          topAction: {
            title: "Please Click Me",
            action: "link-some-where",
          },
          menuItems: {
            error: "",
            isLoading: false,
            data: [
              { title: "Foo", link: "link1" },
              { title: "Foo2", link: "link2" },
              { title: "Foo3", action: action("Foo 3") },
            ],
            isRefetching: false,
          } as DataStateKeys<INavigationMenuItems[]>,
        },
        description: "Some Description here",
      },
    ],
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <DynamicLayout {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const WithSecondary = Template.bind({});
WithSecondary.args = {
  secondarySelectionView: [
    {
      title: "Account",
      icon: User,
      action: "/foo",
      description: "Some Description here",
    },
  ],
};
