import React, { useState, ReactNode } from "react";
import { Row, Col } from "styled-bootstrap-grid";
import styled from "styled-components";
import { HelpCircle } from "react-feather";
import { DeleteButton } from "../../Button/DeleteButton";
import { ISelectData } from "../../../types";
import { SimpleSelect } from "../../Form";
import { SoftButton } from "../../Button/SoftButton";
import { StyledCard, StyledCardBody, StyledCardHeader } from "../../Card";
import { Tooltip } from "../../Tooltip";
import { SoftButtonIconTypes } from "../../Button/SoftButton.types";
import { Spacer, Stack, Typo } from "../../../ui-blocks";
import { BaseSkeleton } from "../../Skeleton";

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

const StyledCenterRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
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
              <Col auto>
                <Typo.MD weight="bold">
                  {isLoading ? (
                    <BaseSkeleton width="150px" height="20px" />
                  ) : (
                    title
                  )}
                  {description ? (
                    <Tooltip text={description}>
                      <HelpCircle size="15" />
                    </Tooltip>
                  ) : null}
                </Typo.MD>
              </Col>
              {newItemLink ||
              deleteAction ||
              iconButtons ||
              selection ||
              sideText ? (
                <Col auto>
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
                      <Typo.SM color="muted" as="span" textStyle="italic">
                        {sideText}
                      </Typo.SM>
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
                </Col>
              ) : null}
            </StyledCenterRow>
          </StyledCardHeader>
        ) : null}
        {children ? <StyledCardBody>{children}</StyledCardBody> : null}
      </StyledCard>
    </>
  );
}
