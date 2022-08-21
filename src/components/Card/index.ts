import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../AppWrapper/colors";

export const StyledCard = styled.div`
  background-color: ${USE_ROOT_COLOR("base-color")};
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
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
  background-color: ${USE_ROOT_COLOR("base-color")};
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
`;
