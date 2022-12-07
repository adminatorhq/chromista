import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { randomNumber } from "@hadmean/protozoa";
import styled from "styled-components";
import { EmptyWrapper } from "../EmptyWrapper";
import { StyledOutlineButton } from "../Button/Button";
import { BaseSkeleton } from "../Skeleton";

export interface ITagItem {
  id: string;
  label?: string;
}

export interface IProps {
  items: ITagItem[];
  onDelete: (id: string) => void;
  isLoading: boolean;
  isMakingDeleteRequestForId?: string;
  entityName: string;
}

const StyledWrapper = styled.div`
  padding-top: 0.5rem;
`;

const StyledButtonGroup = styled.div`
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding-left: 0px;
`;

const renderIcon = ({
  isMakingDeleteRequestForId,
  id,
}: {
  isMakingDeleteRequestForId?: string;
  id: string;
}) => {
  if (!id) {
    return <FontAwesomeIcon icon={faSpinner} spin />;
  }
  if (isMakingDeleteRequestForId === id) {
    return <FontAwesomeIcon icon={faSpinner} color="red" spin />;
  }
  return <FontAwesomeIcon icon={faTimes} />;
};

export function TagsList({
  items,
  onDelete,
  isLoading,
  entityName,
  isMakingDeleteRequestForId,
}: IProps) {
  if (isLoading) {
    return (
      <StyledWrapper>
        {Array.from({ length: 10 }, (_, k) => k).map((key) => (
          <BaseSkeleton
            key={key}
            height="30px"
            width={`${randomNumber(50, 120)}px`}
            bottom={8}
            top={4}
            style={{
              float: "left",
              marginRight: ".75rem",
            }}
          />
        ))}
      </StyledWrapper>
    );
  }
  if (items.length === 0) {
    return <EmptyWrapper text={`No ${entityName} Selected Yet`} />;
  }

  return (
    <StyledWrapper>
      {items
        .filter(({ label }) => label)
        .map(({ label, id }) => (
          <StyledButtonGroup key={id} className="btn-group btn-sm">
            <StyledOutlineButton size="sm" type="button">
              {label}
            </StyledOutlineButton>
            <StyledOutlineButton
              size="sm"
              color="danger"
              disabled={!!isMakingDeleteRequestForId}
              onClick={() => {
                onDelete(id);
              }}
            >
              {renderIcon({ isMakingDeleteRequestForId, id })}
            </StyledOutlineButton>
          </StyledButtonGroup>
        ))}
    </StyledWrapper>
  );
}
