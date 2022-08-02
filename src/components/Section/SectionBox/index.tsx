import React, { useState, ReactNode } from "react";
import * as StyledGrid from "styled-bootstrap-grid";
import styled from "styled-components";
import { HelpCircle } from "react-feather";
import { TimeFilters } from "@gothicgeeks/shared";
import { DeleteButton } from "../../Button/DeleteButton";
import { ISelectData } from "../../../types";
import { SimpleSelect } from "../../Form";
import { SoftButton } from "../../Button/SoftButton";
import {
  StyledCard,
  StyledCardBody,
  StyledCardHeader,
} from "../../../styles/Card";
import { StyledMutedText } from "../../../styles/Text";
import { Tooltip } from "../../Tooltip";
import { SoftButtonIconTypes } from "../../Button/SoftButton.types";
import { Spacer } from "../../../ui-blocks";

interface IProps {
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
  deleteAction?: () => void;
  backLink?: { label?: string; action: string | (() => void) };
  isMakingDeleteRequest?: boolean;
  isLoading?: boolean;
  headLess?: boolean;
  lastUpdated?: string;
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
  color: ${(props) => props.theme.text.main};
  text-shadow: 0 0 1px rgba(241, 245, 250, 0.1);
  font-family: "Poppins", sans-serif;
`;

const StyledDeleteButton = styled(DeleteButton)`
  margin-left: 0.25rem;
`;

// TODO replace this Loading... with skeleton
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
  isMakingDeleteRequest,
  headLess,
  lastUpdated,
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
            label={backLink.label ? `Back To ${backLink.label}` : ""}
          />
          <Spacer />
        </>
      )}
      <StyledCard>
        {!headLess ? (
          <StyledCardHeader>
            <StyledCenterRow>
              <StyledGrid.Col auto>
                <StyledCardTitle data-test-id="section-box__title">
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
              lastUpdated ? (
                <StyledGrid.Col auto>
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
                  {lastUpdated ? (
                    <StyledMutedText as="i">
                      Last modified{" "}
                      {TimeFilters.formatTime(new Date(lastUpdated), "L")}
                    </StyledMutedText>
                  ) : null}
                  {iconButtons
                    ? iconButtons.map(({ action, label, icon }) => (
                        <SoftButton
                          key={icon || label}
                          action={action}
                          label={label}
                          icon={icon}
                          pushLeft
                        />
                      ))
                    : null}
                  {newItemLink ? (
                    <SoftButton action={newItemLink} icon="add" pushLeft />
                  ) : null}
                  {deleteAction && !isLoading ? (
                    <StyledDeleteButton
                      onDelete={deleteAction}
                      isMakingDeleteRequest={isMakingDeleteRequest}
                    />
                  ) : null}
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
