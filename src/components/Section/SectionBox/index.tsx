import React, { useState, ReactNode } from 'react';
import * as StyledGrid from 'styled-bootstrap-grid';
import styled from 'styled-components';
import { DeleteButton } from '../../Button/DeleteButton';
import { ISelectData } from '../../../types';
import { SimpleSelect } from '../../Form';
import { SoftButton } from '../../Button/SoftButton';
import {
  StyledCard,
  StyledCardBody,
  StyledCardHeader,
  StyledCardTitle,
} from '../../../styles/Card';
import { StyledMutedText } from '../../../styles/Text';
import { StyledI } from '../../../styles/Element';
import { HelpCircle } from 'react-feather';
import { Tooltip } from '../../Tooltip';
import { TimeFilters } from '@gothicgeeks/shared';
import { SoftButtonIconTypes } from '../../Button/SoftButton.types';

interface IProps {
  title: string;
  children: ReactNode;
  description?: string;
  newItemLink?: string;
  iconButtons?: {
    link?: string;
    onClick?: () => void;
    label?: string;
    icon?: SoftButtonIconTypes;
  }[];
  selection?: { options: ISelectData[]; onChange: (value: string) => void };
  deleteAction?: () => void;
  backLink?: { label?: string; link?: string; onClick?: () => void };
  isMakingDeleteRequest?: boolean;
  isLoading?: boolean;
  headLess?: boolean;
  lastUpdated?: string;
}

const StyledCenterRow = styled(StyledGrid.Row)`
  align-items: center;
  justify-content: space-between;
`;

// TODO replace this Loading... with skeleton
export const SectionBox: React.FC<IProps> = ({
  children,
  title,
  isLoading,
  description,
  newItemLink,
  iconButtons,
  selection,
  backLink,
  deleteAction,
  isMakingDeleteRequest,
  headLess,
  lastUpdated,
}) => {
  const [selectionValue, setSelectionValue] = useState('');

  return (
    <StyledCard>
      {!headLess ? (
        <StyledCardHeader>
          <StyledCenterRow>
            <StyledGrid.Col auto={true}>
              {backLink ? (
                <SoftButton
                  to={backLink.link}
                  onClick={backLink.onClick}
                  size="xs"
                  icon="back"
                  label={backLink.label ? `Back To ${backLink.label}` : ''}
                />
              ) : null}
              <StyledCardTitle data-test-id="section-box__title">
                {isLoading ? 'Loading...' : title}
                {description ? (
                  <>
                    {' '}
                    <HelpCircle
                      data-for="section-box"
                      size="15"
                      data-tip={description}
                    />
                  </>
                ) : null}
              </StyledCardTitle>
              {description ? <Tooltip id="section-box" /> : null}
            </StyledGrid.Col>
            {newItemLink ||
            deleteAction ||
            iconButtons ||
            selection ||
            lastUpdated ? (
              <StyledGrid.Col auto={true}>
                {selection ? (
                  <SimpleSelect
                    options={selection.options}
                    onChange={(newSelectionValue: string) => {
                      setSelectionValue(newSelectionValue);
                      selection.onChange(newSelectionValue);
                    }}
                    value={selectionValue}
                  />
                ) : null}
                {lastUpdated ? (
                  <StyledMutedText as={StyledI}>
                    Last modified{' '}
                    {TimeFilters.formatTime(new Date(lastUpdated), 'L')}
                  </StyledMutedText>
                ) : null}
                {iconButtons
                  ? iconButtons.map(({ link, label, icon, onClick }) => (
                      <SoftButton
                        key={icon || label}
                        to={link}
                        label={label}
                        icon={icon}
                        onClick={onClick}
                        pushLeft={true}
                      />
                    ))
                  : null}
                {newItemLink ? (
                  <SoftButton to={newItemLink} icon="add" />
                ) : null}
                {deleteAction && !isLoading ? (
                  <StyledDeleteButton
                    onDelete={deleteAction}
                    isMakingDeleteRequest={isMakingDeleteRequest}
                  />
                ) : null}
              </StyledGrid.Col>
            ) : null}
          </StyledCenterRow>
        </StyledCardHeader>
      ) : null}
      {children ? <StyledCardBody>{children}</StyledCardBody> : null}
    </StyledCard>
  );
};

const StyledDeleteButton = styled(DeleteButton)`
  margin-left: 0.25rem;
`;
