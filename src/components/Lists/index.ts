import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

export const StyledListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
  margin: -0.75rem;
`;

export const StyledListGroupFlush = styled(StyledListGroup)`
  border-radius: 0px;
`;

export const StyledListGroupItem = styled.div`
  position: relative;
  display: block;
  padding: 12px 0.75rem;
  background-color: ${USE_ROOT_COLOR("base-color")};
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  border-left: 0;
  border-right: 0;
  border-width: 0 0 1px;

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-top: 0;
  }

  &:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
    border-bottom: 0;
  }

  &.active {
    z-index: 2;
    color: ${USE_ROOT_COLOR("inverse-text")};
    background-color: ${USE_ROOT_COLOR("primary-color")};
    border-color: ${USE_ROOT_COLOR("primary-color")};
  }

  &.disabled,
  &:disabled {
    color: #7081b9;
    pointer-events: none;
    background-color: ${USE_ROOT_COLOR("base-color")};
  }
`;

export const StyledListGroupItemAction = styled(StyledListGroupItem)`
  width: 100%;
  color: ${USE_ROOT_COLOR("main-text")};
  cursor: pointer;
  text-align: inherit;

  &:hover,
  &:focus {
    z-index: 1;
    color: ${USE_ROOT_COLOR("main-text")};
    text-decoration: none;
    background-color: #f8f8fc;
  }

  &:active {
    color: ${USE_ROOT_COLOR("main-text")};
    background-color: ${USE_ROOT_COLOR("soft-color")};
  }
`;
