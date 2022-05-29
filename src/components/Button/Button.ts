import styled, { css } from 'styled-components';
import { ColorTypes } from '../../styles/types';
import { getColor } from '../../styles/utils';

export interface IStyledBaseButton {
  block?: boolean;
  size?: 'sm' | 'xs';
  color?: ColorTypes;
  float?: 'right' | '';
  pushLeft?: true; // TODO remove all this rubbish
}

export const StyledBaseButton = styled.button<IStyledBaseButton>`
  display: inline-block;
  font-weight: 400;
  color: ${props => props.theme.text.main};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
  box-shadow: none;
  line-height: 1.8;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${({ block }) =>
    block &&
    css`
      display: block;
      width: 100%;
    `}

  ${({ float }) =>
    float === 'right' &&
    css`
      float: right;
    `}

    ${({ pushLeft }) =>
    pushLeft &&
    css`
      margin-left: 0.5rem;
    `}

  ${props =>
    props.size === 'sm' &&
    css`
      padding: 0.25rem 0.5rem;
      font-size: 0.71rem;
      line-height: 1.8;
      border-radius: 0.2rem;
    `}

    ${props =>
    props.size === 'xs' &&
    css`
      padding: .25rem .5rem;
      font-size: .71rem;
      line-height: 1.2;
      border-radius: .2rem
  }
      `}

  &:focus {
    box-shadow: none;
    outline: 0;
    box-shadow: 0 0 0 0.15rem rgba(23, 97, 253, 0.25);
  }

  &:disabled {
    opacity: 0.65;
  }

  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  position: relative;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
`;

export const StyledButton = styled(StyledBaseButton)`
  color: ${props => props.theme.text.white};
  background-color: ${getColor()};
  border-color: ${getColor()};
`;

export const StyledSoftButton = styled(StyledBaseButton)`
  background-color: ${getColor(0.1)};
  color: ${getColor()};
  &:hover {
    background-color: ${getColor()};
    color: ${props => props.theme.text.white};
  }

  &:focus {
    box-shadow: 0 0 0 0.1rem ${getColor(0.2)};
    background-color: ${getColor(0.8)};
    color: ${props => props.theme.text.white};
  }
`;

export const StyledOutlineButton = styled(StyledBaseButton)`
  color: ${getColor()};
  border-color: ${getColor()};

  &:hover {
    color: ${props => props.theme.text.white};
    background-color: ${getColor()};
    border-color: ${getColor()};
  }

  &:focus {
    box-shadow: 0 0 0 0.15rem ${getColor(0.5)};
  }

  &:disabled {
    color: ${getColor()};
    background-color: transparent;
  }

  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active {
    color: ${props => props.theme.text.white};
    background-color: ${getColor()};
    border-color: ${getColor()};
  }

  &:not(:disabled):not(.disabled):active:focus,
  &:not(:disabled):not(.disabled).active:focus {
    box-shadow: 0 0 0 0.15rem ${getColor(0.5)};
  }
`;

// export const StyledButtonGroup = styled.div`
//   position: relative;
//   display: inline-flex;
//   vertical-align: middle;

//   &>button {
//     position: relative;
//     flex: 1 1 auto;
//   }
// `;

//  .btn-group>button:not(:last-child):not(.dropdown-toggle),
//  .btn-group>.btn-group:not(:last-child)>button {
//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;
//  }

// &>button:not(:first-child),
// &>.btn-group:not(:first-child)>.btn {
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;
// }

// .btn-group>button:not(:first-child),
// .btn-group>.btn-group:not(:first-child) {
//   margin-left: -1px;
