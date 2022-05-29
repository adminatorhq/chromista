import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { StyledSoftButton } from './Button';
import { SoftButtonIconTypes, ICON_MAP } from './SoftButton.types';

interface ISoftButton {
  label?: string;
  icon?: SoftButtonIconTypes;
  size?: 'sm' | 'xs';
  block?: true;
  pushLeft?: true;
  disabled?: boolean;

  to?: string;
  className?: string;

  onClick?: () => void;
  isMakingActionRequest?: boolean;
}

export const SoftButton: React.FC<ISoftButton> = ({
  pushLeft,
  label,
  block,
  to,
  size = 'sm',
  icon,
  disabled,
  isMakingActionRequest,
  onClick,
  className,
}) => {
  const content = (
    <>
      {isMakingActionRequest ? (
        <FontAwesomeIcon icon={faSpinner} spin={true} />
      ) : (
        <>
          {icon ? <FontAwesomeIcon icon={ICON_MAP[icon]} /> : null}
          {label ? (
            <StyledLabel $hasLabel={!!label}>{label}</StyledLabel>
          ) : null}
        </>
      )}
    </>
  );

  const props = {
    pushLeft,
    className,
    size,
    block,
    disabled,
  };

  if (to) {
    return (
      <StyledSoftButton {...props} as={Link as any} href={to}>
        {content}
      </StyledSoftButton>
    );
  }

  return (
    <StyledSoftButton
      {...props}
      onClick={(e: { stopPropagation: () => void }) => {
        if (onClick) {
          e.stopPropagation();
          return onClick();
        }
      }}
    >
      {content}
    </StyledSoftButton>
  );
};

const StyledLabel = styled.span<{ $hasLabel: boolean }>`
  ${props =>
    props.$hasLabel &&
    css`
      margin-left: 0.4rem;
    `}
`;
