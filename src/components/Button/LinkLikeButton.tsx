import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../theme";

export const StyledLinkLikeButton = styled.button`
  &:focus {
    outline: 0;
  }
  padding: 0;
  color: ${USE_ROOT_COLOR("primary-color")};
  border: 0;
  background: inherit;
`;
