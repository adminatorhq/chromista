import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ChevronDown, ChevronUp, Icon } from 'react-feather';

const ARROW_SIZE = 12;

interface IAccordionItem {
  icon: Icon;
  name: string;
  body: JSX.Element;
  highlight?: boolean;
}

export const AccordionItem: React.FC<IAccordionItem> = ({ icon, name, body, highlight }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  return (
      <StyledWrapper highlight={highlight}>
        <StyledAnchor
          onClick={() => {
            setIsBoxOpen(!isBoxOpen);
          }}
        >
          <StyledLabel highlight={highlight}>
            <StyledLabelIcon as={icon} size={ARROW_SIZE} />
            {name}
          </StyledLabel>
          {isBoxOpen ? (
            <StyledIcon highlight={highlight} as={ChevronUp} size={ARROW_SIZE} />
          ) : (
            <StyledIcon highlight={highlight} as={ChevronDown} size={ARROW_SIZE} />
          )}
        </StyledAnchor>
        {isBoxOpen ? <StyledBodyWrapper> {body} </StyledBodyWrapper> : null}
      </StyledWrapper>
  );
};

const StyledAnchor = styled.button`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0.5rem;
  background: inherit;
  border: 0;
  width: 100%;
  &:focus {
    outline: 0;
  }
`;

const StyledBodyWrapper = styled.div`
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const StyledLabelIcon = styled.i`
  margin-right: 0.4rem;
`;

const StyledIcon = styled.i<{ highlight?: boolean }>`
  margin-top: 0.2rem;
  color: ${props => (props.highlight ? props.theme.text.white : props.theme.text.main)};
`;

const StyledWrapper = styled.div<{ highlight?: boolean }>`
  padding: 0;
  ${props =>
    props.highlight &&
    css`
      background: ${props.theme.colors.primary};
    `};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1px;
`;

const StyledLabel = styled.p<{ highlight?: boolean }>`
  margin-bottom: 0;
  font-size: 12px;
  color: ${props => (props.highlight ? props.theme.text.white : props.theme.text.main)};
`;
