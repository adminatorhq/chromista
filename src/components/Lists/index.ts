import styled from 'styled-components';

export const StyledListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
  margin: -0.75rem;
`;

export const StyledListGroupFlush = styled(StyledListGroup)`
  border-radius: 0px;
`;

export const StyledListGroupItem = styled.div`
  position: relative;
  display: block;
  padding: 12px 0.75rem;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-left: 0;
  border-right: 0;
  border-width: 0 0 1px;

  &:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-top: 0;
  }

  &:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
    border-bottom: 0;
  }

  &.active {
    z-index: 2;
    color: ${props => props.theme.text.white};
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
  }

  &.disabled,
  &:disabled {
    color: #7081b9;
    pointer-events: none;
    background-color: ${props => props.theme.colors.white};
  }
`;

export const StyledListGroupItemAction = styled(StyledListGroupItem)`
  width: 100%;
  color: ${props => props.theme.text.main};
  cursor: pointer;
  text-align: inherit;

  &:hover,
  &:focus {
    z-index: 1;
    color: ${props => props.theme.text.main};
    text-decoration: none;
    background-color: #f8f8fc;
  }

  &:active {
    color: ${props => props.theme.text.main};
    background-color: ${props => props.theme.colors.softBackground};
  }
`;
