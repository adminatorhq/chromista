import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { EmptyWrapper } from '../EmptyWrapper';
import SkeletonLoader from 'tiny-skeleton-loader-react';
import { sharedSkeletonProps } from '../Skeleton/constants';
import { randomNumber } from '@gothicgeeks/shared';
import { StyledOutlineButton } from '../../styles/Button';
import styled from 'styled-components';

export interface ITagItem {
  id: string;
  label?: string;
}

interface ITagsList {
  items: ITagItem[];
  onDelete: (id: string) => void;
  isLoading: boolean;
  isMakingDeleteRequest: boolean;
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

export const TagsList: React.FC<ITagsList> = ({
  items,
  onDelete,
  isLoading,
  entityName,
  isMakingDeleteRequest,
}) => {
  const [currentDeleteItem, setCurrentDeleteItem] = useState('');
  if (isLoading) {
    return (
      <StyledWrapper>
        {Array.from({ length: 10 }, (_, k) => k).map(key => (
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
              disabled={isMakingDeleteRequest}
              onClick={() => {
                onDelete(id);
                setCurrentDeleteItem(id);
              }}
            >
              {renderIcon({ isMakingDeleteRequest, currentDeleteItem, id })}
            </StyledOutlineButton>
          </StyledButtonGroup>
        ))}
    </StyledWrapper>
  );
};

const renderIcon = ({
  isMakingDeleteRequest,
  currentDeleteItem,
  id,
}: {
  isMakingDeleteRequest: boolean;
  currentDeleteItem: string;
  id: string;
}) => {
  if (!id) {
    return <FontAwesomeIcon icon={faSpinner} spin={true} />;
  }
  if (isMakingDeleteRequest && currentDeleteItem === id) {
    return <FontAwesomeIcon icon={faSpinner} color="red" spin={true} />;
  }
  return <FontAwesomeIcon icon={faTimes} />;
};
