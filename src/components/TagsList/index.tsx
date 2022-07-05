import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { randomNumber } from '@gothicgeeks/shared';
import styled from 'styled-components';
import { EmptyWrapper } from '../EmptyWrapper';
import { sharedSkeletonProps } from '../Skeleton/constants';
import { StyledOutlineButton } from '../Button/Button';

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

// TODO
const StyledButtonGroup = styled.div`
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding-left: 0px;
`;

export const TagsList: React.FC<IProps> = ({
  items,
  onDelete,
  isLoading,
  entityName,
  isMakingDeleteRequestForId,
}) => {
  if (isLoading) {
    return (
      <StyledWrapper>
        {Array.from({ length: 10 }, (_, k) => k).map((key) => (
          <Fragment key={key}>
            <SkeletonLoader
              {...sharedSkeletonProps}
              height="30px"
              width={`${randomNumber(50, 120)}px`}
              style={{
                marginBottom: '.50rem',
                marginTop: '0.25rem',
                float: 'left',
                marginRight: '.75rem',
              }}
            />
          </Fragment>
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
};

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
