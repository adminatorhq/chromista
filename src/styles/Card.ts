import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  border-radius: 0.25rem;
`;

export const StyledCardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.75rem;
`;

export const StyledCardImage = styled.img`
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  flex-shrink: 0;
  width: 100%;
`;

export const StyledCardHeader = styled.div`
  padding: 0.75rem;
  margin-bottom: 0;
  background-color: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const StyledCardTitle = styled.h4`
  margin-bottom: 0.75rem;
  text-transform: capitalize;
  letter-spacing: 0.02em;
  font-size: 14px;
  font-weight: 500;
  line-height: 30px;
  margin: 0;
  color: ${props => props.theme.text.main};
  text-shadow: 0 0 1px rgba(241, 245, 250, 0.1);
  font-family: 'Poppins', sans-serif;
`;
