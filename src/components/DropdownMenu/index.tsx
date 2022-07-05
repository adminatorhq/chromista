import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-feather';
import { StyledMutedText } from '../../styles/Text';
import { StyledSoftButton } from '../Button/Button';

const togglePreviousState = (prev: boolean) => !prev;

export interface IDropDownMenuItem {
  label: string;
  description?: string;
  IconComponent?: Icon;
  onClick: () => void;
}

interface IProps {
  menuItems: IDropDownMenuItem[];
  isMakingActionRequest?: boolean;
  disabled?: boolean;
}

export const DropDownMenu: React.FC<IProps> = ({
  menuItems,
  isMakingActionRequest,
  disabled,
}) => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    if (!isMakingActionRequest && !disabled) {
      setDropDownOpen(togglePreviousState);
    }
  };

  const [currentMenuItem, setCurrentMenuItem] = useState<IDropDownMenuItem>(
    menuItems[0],
  );

  useEffect(() => {
    setCurrentMenuItem(menuItems[0]);
  }, [menuItems]);

  const onMenuItemClick = (menuIndex: number) => {
    const menuItem = menuItems[menuIndex];
    toggleDropDown();
    menuItem.onClick();
    setCurrentMenuItem(menuItem);
  };

  const { IconComponent, onClick, label } = currentMenuItem;

  if (menuItems.length === 0) {
    return null;
  }

  const currentItem = (
    <>
      {isMakingActionRequest ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : IconComponent ? (
        <IconComponent size="14" />
      ) : null}
      {' '}
      {label}
    </>
  );

  if (menuItems.length === 1) {
    return (
      <StyledSoftButton
        size="sm"
        disabled={isMakingActionRequest || disabled}
        onClick={() => onClick()}
      >
        {currentItem}
      </StyledSoftButton>
    );
  }

  return (
    <StyledDropDown
      as={Dropdown}
      isOpen={isDropDownOpen}
      tag="span"
      toggle={toggleDropDown}
    >
      <StyledCurrentButton
        size="sm"
        disabled={isMakingActionRequest || disabled}
        onClick={() => onClick()}
      >
        {currentItem}
      </StyledCurrentButton>
      <StyledDropDownToggle as={DropdownToggle} tag="div">
        <StyledDropDownIcon size="sm">
          <StyledSROnly>Toggle Dropdown</StyledSROnly>
        </StyledDropDownIcon>
      </StyledDropDownToggle>
      <StyledDropDownMenu right>
        {menuItems.map(({ label: label$1, description }, index) => (
          <StyledDropDownItem
            key={label$1}
            onClick={() => onMenuItemClick(index)}
          >
            {label$1}
            <br />
            {description ? (
              <StyledDescriptionText as="span">
                {description}
              </StyledDescriptionText>
            ) : null}
          </StyledDropDownItem>
        ))}
      </StyledDropDownMenu>
    </StyledDropDown>
  );
};

const StyledDescriptionText = styled(StyledMutedText)`
  font-size: 12px;
`;

const StyledDropDown = styled.div`
  position: relative;
`;

const StyledDropDownItem = styled.button`
  display: block;
  width: 100%;
  padding: 6px 12px;
  clear: both;
  font-weight: 400;
  line-height: 20px;
  color: ${(props) => props.theme.text.main};
  text-align: inherit;
  background-color: transparent;
  border: 0;
  &:hover {
    background-color: rgba(248, 248, 252, 0.5);
    color: ${(props) => props.theme.text.main};
  }
`;

const StyledDropDownMenu = styled(DropdownMenu)`
  box-shadow: 0 3px 12px #d6e4f1;
  margin: 0;

  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 4px 0;
  margin: 0.125rem 0 0;
  font-size: 0.8125rem;
  color: ${(props) => props.theme.text.main};
  text-align: left;
  list-style: none;
  background-color: ${(props) => props.theme.colors.white};
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;

  right: 0;
  left: auto;

  &.show {
    display: block;
  }
`;

const StyledSROnly = styled.span`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const StyledDropDownToggle = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

const StyledCurrentButton = styled(StyledSoftButton)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const StyledDropDownIcon = styled(StyledSoftButton)`
  margin-left: -1px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  white-space: nowrap;
  position: relative;
  flex: 1 1 auto;

  &::after {
    display: inline-block;
    vertical-align: 0.255em;
    content: '';
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }
`;
