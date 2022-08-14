import React from "react";
import styled, { css } from "styled-components";
import { ChevronRight } from "react-feather";
import Link from "next/link";
import { StringUtils } from "@gothicgeeks/shared";
import { ISelectionView } from "./types";

interface IRenderNavigation {
  navigation: Array<ISelectionView & { sideBarAction: () => void }>;
  isSidebarOpen: boolean;
  label?: string;
  isSubMenu?: true;
  showDash?: true;
  currentLink?: string;
}

const ARROW_SIZE = 14;

const StyledLinkLikeButton = styled.button`
  &:focus {
    outline: 0;
  }
  background: inherit;
`;

const StyledLeftSideNavMenuList = styled.li`
  list-style: none;
  display: block;
  width: 100%;
  margin-top: 6px;
`;

const StyledLeftSideNavMenuListLabel = styled(StyledLeftSideNavMenuList)`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: #687598;
  padding: 8px 0;
`;

const StyledMenuArrow = styled.span`
  margin-left: auto;
`;

const StyledLeftSideNavMenuListAnchor = styled.a<{ $isSubMenu?: true }>`
  display: flex;
  align-items: center;
  width: 100%;
  outline: none !important;
  padding: ${(props) => (props.$isSubMenu ? 5 : 7)}px 0px;
  font-size: ${(props) => (props.$isSubMenu ? 12 : 13)}px;
  color: #a9baca;
  transition: all 0.3s ease-out;
  font-weight: 400;
  background: inherit;
  border: 0;
  margin: 0;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledLeftSideNavMenuText = styled.span<{ $isSidebarOpen: boolean }>`
  display: ${(props) => (props.$isSidebarOpen ? "inline" : "none")};
`;

const StyledDash = styled.hr`
  margin: 0.5rem 0;
  border: 0;
  border-top: 1px dashed ${(props) => props.theme.colors.border};
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  border-color: #20446f;
`;

const StyleMenuIcon = styled.span<{
  $isSidebarOpen: boolean;
  $isActive?: boolean;
}>`
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : "#a9baca"};
  fill: rgba(112, 129, 185, 0.12);
  ${(props) =>
    props.$isSidebarOpen
      ? css`
          margin-right: 11px;
          width: 18px;
          height: 18px;
        `
      : css`
          margin-right: 0;
          width: 24px;
          height: 24px;
        `}
  stroke-width: 1px;
  align-self: center;
  display: inline-block;
  opacity: 0.9;
`;

export function RenderNavigation({
  navigation,
  isSidebarOpen,
  label,
  isSubMenu,
  showDash,
  currentLink = "hopefully this will never be true",
}: IRenderNavigation) {
  return (
    <>
      {showDash && navigation.length ? <StyledDash /> : null}
      {label && isSidebarOpen && navigation.length ? (
        <StyledLeftSideNavMenuListLabel>{label}</StyledLeftSideNavMenuListLabel>
      ) : null}
      {navigation.map(({ title, icon, action, sideBarAction }) => {
        const isActive = currentLink === action;
        const content = (
          <>
            <div>
              <StyleMenuIcon
                as={icon}
                $isActive={isActive}
                $isSidebarOpen={isSidebarOpen}
                data-test-id={`nav-icon__${StringUtils.sluggify(title)}`}
              />
            </div>
            <StyledLeftSideNavMenuText
              data-test-id={`nav-menu-item__${StringUtils.sluggify(title)}`}
              $isSidebarOpen={isSidebarOpen}
            >
              {title}
            </StyledLeftSideNavMenuText>
            {isSidebarOpen ? (
              <StyledMenuArrow>
                <ChevronRight size={ARROW_SIZE} />
              </StyledMenuArrow>
            ) : null}
          </>
        );
        return (
          <StyledLeftSideNavMenuList key={title}>
            {typeof action === "string" ? (
              <Link href={action || ""} passHref>
                <StyledLeftSideNavMenuListAnchor
                  $isSubMenu={isSubMenu}
                  onClick={() => sideBarAction?.()}
                >
                  {content}
                </StyledLeftSideNavMenuListAnchor>
              </Link>
            ) : (
              <StyledLeftSideNavMenuListAnchor
                $isSubMenu={isSubMenu}
                $isActive={isActive}
                as={StyledLinkLikeButton}
                onClick={() => {
                  action?.();
                  sideBarAction?.();
                }}
              >
                {content}
              </StyledLeftSideNavMenuListAnchor>
            )}
          </StyledLeftSideNavMenuList>
        );
      })}
    </>
  );
}
