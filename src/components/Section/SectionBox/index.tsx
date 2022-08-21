import React, { useState, ReactNode } from "react";
import * as StyledGrid from "styled-bootstrap-grid";
import styled from "styled-components";
import { HelpCircle } from "react-feather";
import { DeleteButton } from "../../Button/DeleteButton";
import { ISelectData } from "../../../types";
import { SimpleSelect } from "../../Form";
import { SoftButton } from "../../Button/SoftButton";
import { StyledCard, StyledCardBody, StyledCardHeader } from "../../Card";
import { Tooltip } from "../../Tooltip";
import { SoftButtonIconTypes } from "../../Button/SoftButton.types";
import { Spacer, Stack, Text } from "../../../ui-blocks";
import { USE_ROOT_COLOR } from "../../../AppWrapper/colors";

export interface IProps {
  title: string;
  children: ReactNode;
  description?: string;
  newItemLink?: string;
  iconButtons?: {
    action: string | (() => void);
    label?: string;
    icon?: SoftButtonIconTypes;
  }[];
  selection?: { options: ISelectData[]; onChange: (value: string) => void };
  deleteAction?: { action: () => void; isMakingDeleteRequest: boolean };
  backLink?: { label?: string; action: string | (() => void) };
  isLoading?: boolean;
  headLess?: boolean;
  sideText?: string;
}

const StyledCenterRow = styled(StyledGrid.Row)`
  align-items: center;
  justify-content: space-between;
`;

const StyledCardTitle = styled.h4`
  margin-bottom: 0.75rem;
  text-transform: capitalize;
  letter-spacing: 0.02em;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  margin: 0;
  color: ${USE_ROOT_COLOR("main-text")};
  text-shadow: 0 0 1px rgba(241, 245, 250, 0.1);
`;

const StyledDeleteButton = styled(DeleteButton)`
  margin-left: 0.25rem;
`;

export function SectionBox({
  children,
  title,
  isLoading,
  description,
  newItemLink,
  iconButtons,
  selection,
  backLink,
  deleteAction,
  headLess,
  sideText,
}: IProps) {
  const [selectionValue, setSelectionValue] = useState("");

  return (
    <>
      {backLink && (
        <>
          <SoftButton
            action={backLink.action}
            size="xs"
            icon="back"
            label={backLink.label}
          />
          <Spacer />
        </>
      )}
      <StyledCard>
        {!headLess ? (
          <StyledCardHeader>
            <StyledCenterRow>
              <StyledGrid.Col auto>
                <StyledCardTitle>
                  {isLoading ? "Loading..." : title}
                  {description ? (
                    <>
                      {" "}
                      <HelpCircle
                        data-for="section-box"
                        size="15"
                        data-tip={description}
                      />
                    </>
                  ) : null}
                </StyledCardTitle>
                {description ? <Tooltip id="section-box" /> : null}
              </StyledGrid.Col>
              {newItemLink ||
              deleteAction ||
              iconButtons ||
              selection ||
              sideText ? (
                <StyledGrid.Col auto>
                  <Stack align="center">
                    {selection ? (
                      <SimpleSelect
                        options={selection.options}
                        onChange={(newSelectionValue: string) => {
                          setSelectionValue(newSelectionValue);
                          selection.onChange(newSelectionValue);
                        }}
                        value={selectionValue}
                      />
                    ) : null}
                    {sideText ? (
                      <Text color="muted" size="5" as="span" textStyle="italic">
                        {sideText}
                      </Text>
                    ) : null}
                    {iconButtons
                      ? iconButtons.map(({ action, label, icon }) => (
                          <SoftButton
                            key={icon || label}
                            action={action}
                            label={label}
                            icon={icon}
                          />
                        ))
                      : null}
                    {newItemLink ? (
                      <SoftButton action={newItemLink} icon="add" />
                    ) : null}
                    {deleteAction && !isLoading ? (
                      <StyledDeleteButton
                        onDelete={deleteAction.action}
                        isMakingDeleteRequest={
                          deleteAction.isMakingDeleteRequest
                        }
                      />
                    ) : null}
                  </Stack>
                </StyledGrid.Col>
              ) : null}
            </StyledCenterRow>
          </StyledCardHeader>
        ) : null}
        {children ? <StyledCardBody>{children}</StyledCardBody> : null}
      </StyledCard>
    </>
  );
}
