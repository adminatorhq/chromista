import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { StyledButton, StyledOutlineButton, IStyledBaseButton } from '../../../styles/Button';

interface IFormButton extends IStyledBaseButton {
  text: string;
  isMakingRequest: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  isInverse?: boolean;
}

export const FormButton: React.FC<IFormButton> = ({
  text,
  disabled,
  isMakingRequest,
  onClick,
  isInverse,
  size = 'sm',
  float = 'right',
  color = 'primary',
  ...rest
}) => {
  const options = {
    ...rest,
    color,
    disabled: disabled || isMakingRequest,
    onClick,
    type: 'submit' as 'submit' | 'button' | 'reset' | undefined,
    size,
    float,
  };

  const toRender = actionButtonIsMakingRequest(isMakingRequest, text);

  if (isInverse) {
    return (
      <>
        <StyledOutlineButton {...options}>{toRender}</StyledOutlineButton>
        {float && <div style={{ clear: 'both' }} />}
      </>
    );
  }
  return (
    <>
      <StyledButton {...options}>{toRender}</StyledButton>
      {float && <div style={{ clear: 'both' }} />}
    </>
  );
};

export const actionButtonIsMakingRequest = (isMakingRequest: boolean, text: string) =>
  isMakingRequest ? <FontAwesomeIcon icon={faSpinner} spin={true} /> : text;
