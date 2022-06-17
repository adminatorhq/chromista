import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  border-top: 1px solid ${props => props.theme.colors.border};
  bottom: 0;
  padding: 16px;
  position: absolute;
  right: 0;
  left: 0;
  color: #7081b9;
  text-align: center;

  @media (min-width: 576px) {
    text-align: left;
  }
`;

const StyledText = styled.p`
  display: none;
  @media (min-width: 576px) {
    display: inline-block;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.colors.danger};
`;

export const Footer = () => {
  return (
    <StyledFooter>
      &copy; 2021 MDStores
      <StyledText>
        Crafted with <StyledIcon icon={faHeart} /> by GothicGeeks
      </StyledText>
    </StyledFooter>
  );
};
