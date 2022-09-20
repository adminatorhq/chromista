import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { getBestErrorMessage } from "@hadmean/protozoa";
import { SYSTEM_COLORS } from "../../AppWrapper/colors";

export enum AlertType {
  Success = "success",
  Error = "danger",
  Warning = "warning",
  Info = "info",
}

interface IAlert {
  message: Record<string, unknown> | string | unknown;
  renderJsx?: boolean;
}

export type IProps = {
  type: AlertType;
} & IAlert;

const buildColor = (color: string) => {
  return css`
    color: ${color};
    background-color: ${color}1A;
    border-color: ${color};
  `;
};

const StyledAlert = styled.div<{
  type: AlertType;
}>`
  border: 0;
  position: relative;
  padding: 0.5rem;
  margin-bottom: 0;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center;

  ${(props) =>
    props.type === AlertType.Success && buildColor(SYSTEM_COLORS.success)}

  ${(props) =>
    props.type === AlertType.Error && buildColor(SYSTEM_COLORS.danger)}

      ${(props) =>
    props.type === AlertType.Warning && buildColor(SYSTEM_COLORS.warning)}

        ${(props) =>
    props.type === AlertType.Info && buildColor(SYSTEM_COLORS.info)}
`;

const StyledAlertButton = styled.button`
  float: right;
  font-size: 1.21875rem;
  font-weight: 700;
  line-height: 1;
  color: ${SYSTEM_COLORS.black};
  text-shadow: 0 1px 0 ${SYSTEM_COLORS.white};
  opacity: 0.5;
  padding: 0;
  background-color: transparent;
  border: 0;
`;

export function Alert({ type, message, renderJsx }: IProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setShouldRender(true);
  }, [message]);

  if (!shouldRender || !message) {
    return null;
  }
  return (
    <StyledAlert type={type} role="alert">
      <StyledAlertButton
        type="button"
        onClick={() => {
          setShouldRender(false);
        }}
        aria-label="Close"
      >
        <FontAwesomeIcon icon={faTimes} size="xs" />
      </StyledAlertButton>
      {(renderJsx ? message : getBestErrorMessage(message)) as string}
    </StyledAlert>
  );
}

export function ErrorAlert(props: IAlert) {
  return <Alert {...props} type={AlertType.Error} />;
}
export function SuccessAlert(props: IAlert) {
  return <Alert {...props} type={AlertType.Success} />;
}
export function WarningAlert(props: IAlert) {
  return <Alert {...props} type={AlertType.Warning} />;
}
