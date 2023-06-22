/* eslint-disable react/function-component-definition */
import React from "react";
import { Story } from "@storybook/react";
import { ContentLayout } from ".";
import { AppWrapper } from "../../../AppWrapper";

export default {
  title: "Components/ContentLayout",
  component: ContentLayout,
  args: {
    title: "Section Title",
    children: <p>Content of the section</p>,
  },
};

const Template: Story = () => (
  <AppWrapper>
    <ContentLayout.Center>
      <div style={{ width: "100%", height: "100px", background: "red" }}>
        Hello
      </div>
    </ContentLayout.Center>
    <br />
    <ContentLayout>
      <ContentLayout.Left>
        <div style={{ width: "100%", height: "100px", background: "green" }}>
          Left
        </div>
      </ContentLayout.Left>
      <ContentLayout.Right>
        <div style={{ width: "100%", height: "100px", background: "blue" }}>
          Right
        </div>
      </ContentLayout.Right>
    </ContentLayout>
  </AppWrapper>
);

export const Default = Template.bind({});
Default.args = {};
