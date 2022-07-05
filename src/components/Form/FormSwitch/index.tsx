import React from 'react';
import styled from 'styled-components';
import { APP_COLORS } from '../../../constants/colors';
import { Text, Stack } from '../../../ui-blocks';

type Sizes = 'sm' | 'md';

export interface IProps {
  value: boolean;
  onChange: (value: boolean) => void;
  size?: Sizes;
  label?: string;
  name: string;
  disabled?: boolean;
}

export const FormSwitch: React.FC<IProps> = props => {
  const {
    value,
    onChange,
    name,
    disabled,
    label,
    size = 'md',
    ...rest
  } = props;
  const ariaProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) => key.startsWith('aria-'))
  );
  return (
    <DivBlock>
      <Root htmlFor={name} size={size}>
        <Stack spacing={SIZES_CONFIG[size].labelSpacing} align="center">
          <Input
            id={name}
            type="checkbox"
            checked={value}
            disabled={disabled}
            $inputSize={size}
            onChange={() => {
              onChange(!value);
            }}
            {...ariaProps}
          />
          <Slider size={size} />
          <Text size={SIZES_CONFIG[size].fontSize}>{label}</Text>
        </Stack>
      </Root>
    </DivBlock>
  );
};

interface ISizeConfig {
  width: number;
  height: number;
  shift: number;
  circleSize: number;
  checkedShift: number;
  fontSize: '4' | '5';
  labelSpacing: number;
}

const SIZES_CONFIG: Record<Sizes, ISizeConfig> = {
  md: {
    width: 44,
    height: 24,
    shift: 3,
    checkedShift: 20,
    labelSpacing: 56,
    circleSize: 19,
    fontSize: '4',
  },
  sm: {
    width: 26,
    height: 16,
    shift: 2,
    labelSpacing: 32,
    checkedShift: 10,
    circleSize: 12,
    fontSize: '5',
  },
};

const DivBlock = styled.div``;

const Root = styled.label<{ size: Sizes }>`
  position: relative;
  display: inline-block;
  margin-bottom: 24px;
`;

const Slider = styled.span<{ size: Sizes }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: ${props => SIZES_CONFIG[props.size].width}px;
  height: ${props => SIZES_CONFIG[props.size].height}px;
  background-color: ${APP_COLORS.softBackground};
  border-radius: ${props => SIZES_CONFIG[props.size].height}px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    border-radius: 50%;
    background-color: white;
    height: ${props => SIZES_CONFIG[props.size].circleSize}px;
    width: ${props => SIZES_CONFIG[props.size].circleSize}px;
    left: ${props => SIZES_CONFIG[props.size].shift}px;
    bottom: ${props => SIZES_CONFIG[props.size].shift}px;
    transition: 0.4s;
  }
`;

const Input = styled.input<{ $inputSize: Sizes }>`
  appearance: none;

  &:checked + ${Slider} {
    background-color: ${APP_COLORS.success};

    &:before {
      transform: translateX(${p => SIZES_CONFIG[p.$inputSize].checkedShift}px);
    }
  }

  &:focus + ${Slider} {
    box-shadow: 0 0 1px ${APP_COLORS.success};
  }
`;
