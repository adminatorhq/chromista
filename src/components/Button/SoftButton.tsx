import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { StyledSoftButton } from './Button';
import { SoftButtonIconTypes, ICON_MAP } from './SoftButton.types';
import { ColorTypes } from '../../styles/types';

interface ISoftButton {
  label?: string;
  icon?: SoftButtonIconTypes;
  size?: 'sm' | 'xs';
  block?: true;
  pushLeft?: true;
  disabled?: boolean;
  color?: ColorTypes;
  to?: string;
  justIcon?: true;
  className?: string;
  type?: 'button';
  onClick?: () => void;
  isMakingActionRequest?: boolean;
}

export const SoftButton: React.FC<ISoftButton> = ({
  pushLeft,
  label,
  block,
  color,
  to,
  size = 'sm',
  icon,
  justIcon,
  type,
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
          {label && !justIcon ? (
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
    color,
    'aria-label': justIcon ? label : undefined,
  };

  if (to) {
    return (
      <Link href={to} passHref={true}>
        <StyledSoftButton {...props} as={'a'}>
          {content}
        </StyledSoftButton>
      </Link>
    );
  }

  return (
    <StyledSoftButton
      {...props}
      type={type}
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
