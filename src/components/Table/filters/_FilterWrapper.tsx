/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode } from "react";
import { Icon } from "react-feather";
import styled from "styled-components";
import { Dropdown } from "../../Dropdown";
import { Spacer, Stack } from "../../../ui-blocks";
import { SoftButton } from "../../Button/SoftButton";
import { USE_ROOT_COLOR } from "../../../AppWrapper/colors";

interface IProps {
  children: ReactNode;
  filterHasValue: boolean;
  clearFilter: (filter: undefined) => void;
  IconComponent: Icon;
}

const Root = styled.div`
  cursor: pointer;
`;

const DownRoot = styled(Stack)`
  background: ${USE_ROOT_COLOR("base-color")};
  padding: 8px;
  border-radius: 2px;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  min-width: 250px;
`;

export function FilterWrapper({
  children,
  filterHasValue,
  clearFilter,
  IconComponent,
}: IProps) {
  const iconProps = {
    size: 15,
    color: filterHasValue
      ? USE_ROOT_COLOR("primary-color")
      : USE_ROOT_COLOR("muted-text"),
    style: { opacity: filterHasValue ? 1 : 0.7 },
  };
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown
        preserveVisibiltyOnClick
        align="right"
        target={
          <Root>
            <IconComponent {...iconProps} />
          </Root>
        }
      >
        <DownRoot direction="column">
          <div style={{ textAlign: "left" }}>{children}</div>
          <SoftButton
            action={() => {
              clearFilter(undefined);
            }}
            size="xs"
            icon="close"
            label="Reset"
          />
          <Spacer size="xxs" />
        </DownRoot>
      </Dropdown>
    </span>
  );
}
