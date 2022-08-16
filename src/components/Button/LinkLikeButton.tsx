import styled from "styled-components";

export const StyledLinkLikeButton = styled.button`
  &:focus {
    outline: 0;
  }
  color: ${(props) => props.theme.colors.primary};
  border: 0;
  background: inherit;
`;
