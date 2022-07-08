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

interface IProps {
  title: string;
  children: ReactNode;
  description?: string;
  newItemLink?: string;
  iconButtons?: {
    link?: string;
    onClick?: () => void;
    label?: string;
    icon?: SoftButtonIconTypes;
  }[];
  selection?: { options: ISelectData[]; onChange: (value: string) => void };
  deleteAction?: () => void;
  backLink?: { label?: string; link?: string; onClick?: () => void };
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

const StyledFullHeight = styled.div`
  // min-height: 100vh;
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
    <StyledCard>
      <StyledFullHeight>
        {!headLess ? (
          <StyledCardHeader>
            <StyledCenterRow>
              <StyledGrid.Col auto>
                {backLink ? (
                  <SoftButton
                    to={backLink.link}
                    onClick={backLink.onClick}
                    size="xs"
                    icon="back"
                    label={backLink.label ? `Back To ${backLink.label}` : ""}
                  />
                ) : null}
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
                    ? iconButtons.map(({ link, label, icon, onClick }) => (
                        <SoftButton
                          key={icon || label}
                          to={link}
                          label={label}
                          icon={icon}
                          onClick={onClick}
                          pushLeft
                        />
                      ))
                    : null}
                  {newItemLink ? (
                    <SoftButton to={newItemLink} icon="add" />
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
      </StyledFullHeight>
    </StyledCard>
  );
}
