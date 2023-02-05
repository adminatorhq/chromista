import styled from "styled-components";
import { USE_ROOT_COLOR } from "../../theme";

export const StyledCard = styled.div`
  background-color: ${USE_ROOT_COLOR("base-color")};
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 0 ${USE_ROOT_COLOR("border-color")},
    0 0 ${USE_ROOT_COLOR("border-color")},
    0 1px 3px 0 ${USE_ROOT_COLOR("border-color")},
    0 1px 2px -1px ${USE_ROOT_COLOR("border-color")};
  border-radius: 8px;
`;

export const StyledCardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 16px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: ${USE_ROOT_COLOR("base-color")};
`;

export const StyledCardHeader = styled.div`
  padding: 16px;
  margin-bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background-color: ${USE_ROOT_COLOR("base-color")};
  border-bottom: 1px solid ${USE_ROOT_COLOR("border-color")};
`;
