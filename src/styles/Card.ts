import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.border};
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

export const StyledCardHeader = styled.div`
  padding: 0.75rem;
  margin-bottom: 0;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;
