/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SectionBox, IProps } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/SectionBox",
  component: SectionBox,
  args: {
    title: "Section Title",
    children: <p>Content of the section</p>,
  },
};

const Template: Story<IProps> = (args) => (
  <AppWrapper>
    <SectionBox {...args} />
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: "Some help text for you",
};

export const WithNewItemLink = Template.bind({});
WithNewItemLink.args = {
  newItemLink: "/go-somewhere",
};

export const WithIconButtons = Template.bind({});
WithIconButtons.args = {
  iconButtons: [
    {
      action: "/foo",
      label: "Foo",
      icon: "add",
    },
    {
      action: "/baz",
      icon: "settings",
    },
    {
      action: "/baz",
      label: "Bar",
    },
  ],
};

export const WithSelection = Template.bind({});
WithSelection.args = {
  selection: {
    onChange: action("on change"),
    options: [
      {
        label: "Foo",
        value: "foo",
      },
      {
        label: "Bar",
        value: "bar",
      },
    ],
  },
};

export const WithDeleteAction = Template.bind({});
WithDeleteAction.args = {
  deleteAction: {
    action: action("delete"),
    isMakingDeleteRequest: false,
  },
};

export const WithDeleteActionInProgress = Template.bind({});
WithDeleteActionInProgress.args = {
  deleteAction: {
    action: action("delete"),
    isMakingDeleteRequest: true,
  },
};

export const WithDeleteActionAndIconButtons = Template.bind({});
WithDeleteActionAndIconButtons.args = {
  deleteAction: {
    action: action("delete"),
    isMakingDeleteRequest: false,
  },
  iconButtons: [
    {
      action: "/foo",
      label: "Foo",
      icon: "add",
    },
    {
      action: "/bar",
      label: "Bar",
      icon: "close",
    },
  ],
};

export const WithBackLink = Template.bind({});
WithBackLink.args = {
  backLink: {
    action: action("delete"),
    label: "Go Back",
  },
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};

export const HeadLess = Template.bind({});
HeadLess.args = {
  headLess: true,
};

export const SideText = Template.bind({});
SideText.args = {
  sideText: "Updated Yesterday",
};

export const EveryThing = Template.bind({});
EveryThing.args = {
  sideText: "Updated Yesterday",
  description: "Some help text for you",
  newItemLink: "/go-somewhere",
  iconButtons: [
    {
      action: "/foo",
      label: "Foo",
      icon: "add",
    },
    {
      action: "/foo",
      icon: "settings",
    },
    {
      action: "/foo",
      label: "Bar",
    },
  ],
  selection: {
    onChange: action("on change"),
    options: [
      {
        label: "Foo",
        value: "foo",
      },
      {
        label: "Bar",
        value: "bar",
      },
    ],
  },
  deleteAction: {
    action: action("delete"),
    isMakingDeleteRequest: false,
  },
  backLink: {
    action: action("delete"),
    label: "Go Back",
  },
};
