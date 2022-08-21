import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

export const StyledLinkLikeButton = styled.button`
  &:focus {
    outline: 0;
  }
  color: ${USE_ROOT_COLOR("primary-color")};
  border: 0;
  background: inherit;
`;
