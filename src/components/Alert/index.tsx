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
// :eyes on the static colors here;
export type IProps = {
  type: AlertType;
} & IAlert;

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
    props.type === AlertType.Success &&
    css`
      color: ${SYSTEM_COLORS.success};
      background-color: #e1faf0;
      border-color: #b8f4db;
    `}

  ${(props) =>
    props.type === AlertType.Error &&
    css`
      color: ${SYSTEM_COLORS.danger};
      background-color: #fee6eb;
      border-color: #fcc6d1;
    `}

      ${(props) =>
    props.type === AlertType.Warning &&
    css`
      color: ${SYSTEM_COLORS.warning};
      background-color: #fff6e4;
      border-color: #ffebc1;
    `}

        ${(props) =>
    props.type === AlertType.Info &&
    css`
      color: ${SYSTEM_COLORS.info};
      background-color: #e3f4fd;
      border-color: #bde6fa;
    `}
`;

const StyledAlertButton = styled.button`
  float: right;
  font-size: 1.21875rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
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
