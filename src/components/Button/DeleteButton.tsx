import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { StyledSoftButton } from '../../styles/Button';
import { ConfirmAlert } from '../ConfirmAlert';

interface IDeleteButton {
  onDelete: () => void;
  isMakingDeleteRequest?: boolean;
  text?: string;
  size?: 'sm' | 'xs';
  shouldConfirmAlert?: boolean;
}

export const DeleteButton: React.FC<IDeleteButton> = ({
  onDelete,
  isMakingDeleteRequest,
  text,
  size = 'sm',
  shouldConfirmAlert = true,
}) => (
  <StyledSoftButton
    size={size}
    color="danger"
    type="button"
    onClick={(e: React.BaseSyntheticEvent) => {
      e.stopPropagation();
      if (shouldConfirmAlert) {
        // TODO move to a pop confirm
        return ConfirmAlert({
          title: 'Confirm Delete',
          message: 'Are you sure you want to do this.',
          action: onDelete,
        });
      }
      return onDelete();
    }}
    disabled={isMakingDeleteRequest}
  >
    {isMakingDeleteRequest ? (
      <FontAwesomeIcon icon={faSpinner} spin={true} />
    ) : (
      <>
        <FontAwesomeIcon icon={faTrash} /> {text ? `Delete ${text}` : null}
      </>
    )}
  </StyledSoftButton>
);
