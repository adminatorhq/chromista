import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';
import { getBestErrorMessage } from '@gothicgeeks/shared';

export enum AlertType {
  Success = 'success',
  Error = 'danger',
  Warning = 'warning',
  Info = 'info',
}

interface IAlert {
  message: Record<string, unknown> | string | unknown;
  renderJsx?: boolean;
}

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

  ${(props) => props.type === AlertType.Success
    && css`
      color: #03d87f;
      background-color: #e1faf0;
      border-color: #b8f4db;
    `}

  ${(props) => props.type === AlertType.Error
    && css`
      color: ${props.theme.colors.danger};
      background-color: #fee6eb;
      border-color: #fcc6d1;
    `}

      ${(props) => props.type === AlertType.Warning
    && css`
      color: #ffb822;
      background-color: #fff6e4;
      border-color: #ffebc1;
    `}

        ${(props) => props.type === AlertType.Info
    && css`
      color: #12a4ed;
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

// TODO Add the retry mechanism
export function Alert({ type, message, renderJsx }: IProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    setShouldRender(true);
  }, [message]);

  if (!shouldRender || !message) {
    return null;
  }
  return (
    <StyledAlert type={type} role="alert" data-test-id="alert">
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
