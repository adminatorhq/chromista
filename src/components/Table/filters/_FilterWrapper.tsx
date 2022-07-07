/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode } from 'react';
import { Filter, Search } from 'react-feather';
import styled from 'styled-components';
import { themeContext } from '../../../AppWrapper/Global';
import { Dropdown } from '../../Dropdown';
import { APP_COLORS } from '../../../constants/colors';
import { Stack } from '../../../ui-blocks';
import { SoftButton } from '../../Button/SoftButton';

interface IProps {
    children: ReactNode;
    filterHasValue: boolean;
    clearFilter: (filter: undefined) => void;
    iconType: 'search' | 'filter' | 'numeric' | 'list' | 'date' | 'boolean';
  }

const StyledSoftButton = styled(SoftButton)`
  margin-bottom: 0.25rem;
`;

const Root = styled.div`
  cursor: pointer;
`;

const DownRoot = styled(Stack)`
  background: ${APP_COLORS.white};
  padding: 8px;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.border};
  min-width: 250px;
`;

export function FilterWrapper({
  children,
  filterHasValue,
  clearFilter,
  iconType,
}: IProps) {
  const iconProps = {
    size: 15,
    color: filterHasValue ? themeContext.colors.primary : 'rgb(48, 62, 103)',
    style: { opacity: filterHasValue ? 1 : 0.3 },
  };
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown
        preserveVisibiltyOnClick
        target={(
          <Root>
            {iconType === 'search' ? (
              <Search {...iconProps} />
            ) : (
              <Filter {...iconProps} />
            )}
          </Root>
          )}
      >
        <DownRoot direction="column">
          <div>{children}</div>
          <StyledSoftButton
            onClick={() => {
              clearFilter(undefined);
            }}
            size="xs"
            icon="close"
            label="Reset"
          />
        </DownRoot>
      </Dropdown>
    </span>
  );
}
