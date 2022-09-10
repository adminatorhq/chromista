import { SLUG_LOADING_VALUE } from "@hadmean/protozoa";
import React, { useState, useEffect, ReactNode } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import styled, { css } from "styled-components";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

export interface IProps {
  contents: {
    label: string;
    overrideLabel?: string;
    content: ReactNode;
  }[];
  currentTab?: string;
  padContent?: boolean;
  onChange?: (tab: string) => void;
}

const StyledTabPane = styled(TabPane)`
  display: none;
  &.active {
    display: block;
  }
`;

const StyledTabContent = styled(TabContent)<{ $padContent: boolean }>`
  ${(props) =>
    props.$padContent &&
    css`
      padding-top: 1rem;
    `}
`;

const StyledNav = styled(Nav)`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
  list-style: none;
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
`;

const StyledNavItem = styled(NavItem)`
  margin-bottom: -1px;
`;

const StyledNavLink = styled(NavLink)<{ active: boolean }>`
  display: block;
  padding: 0.5rem 1rem;
  background-color: ${USE_ROOT_COLOR("base-color")};
  border: 1px solid transparent;
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;

  ${(props) =>
    props.active
      ? css`
          color: ${USE_ROOT_COLOR("primary-color")};
          background-color: ${USE_ROOT_COLOR("base-color")};
          border-color: transparent transparent
            ${USE_ROOT_COLOR("primary-color")};
        `
      : css`
          color: ${USE_ROOT_COLOR("main-text")};
        `}
`;

export function Tabs({
  contents,
  currentTab,
  onChange,
  padContent = true,
}: IProps) {
  const [activeTab, setActiveTab] = useState(currentTab || contents[0].label);

  useEffect(() => {
    if (currentTab && currentTab !== SLUG_LOADING_VALUE) {
      setActiveTab(currentTab);
    } else {
      setActiveTab(contents[0].label);
    }
  }, [currentTab]);

  const changeTab = (tabLabel: string) => {
    if (activeTab !== tabLabel) {
      setActiveTab(tabLabel);
      onChange?.(tabLabel);
    }
  };

  return (
    <>
      <StyledNav tabs role="tablist">
        {contents.map(({ label, overrideLabel }) => (
          <StyledNavItem key={label}>
            <StyledNavLink
              tag="button"
              role="tab"
              aria-selected={activeTab === label ? "true" : "false"}
              active={activeTab === label}
              onClick={() => {
                changeTab(label);
              }}
            >
              {overrideLabel || label}
            </StyledNavLink>
          </StyledNavItem>
        ))}
      </StyledNav>
      <StyledTabContent
        activeTab={activeTab}
        role="tabpanel"
        $padContent={padContent}
      >
        {contents.map(({ label, content }) => (
          <StyledTabPane tabId={label} key={label}>
            {content}
          </StyledTabPane>
        ))}
      </StyledTabContent>
    </>
  );
}
