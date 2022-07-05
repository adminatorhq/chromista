import React, {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import useClickAway from 'react-use/lib/useClickAway';
import useKey from 'react-use/lib/useKey';
import styled from 'styled-components';
import { Z_INDEXES } from '../../constants/zIndex';

const Root = styled.div`
  position: relative;
  display: inline-block;
`;

type Align = 'left' | 'right';

const DropdownRoot = styled.div<{ zIndex: number; align: Align }>`
  position: absolute;
  right: ${(props) => (props.align === 'right' ? '0' : 'auto')};
  left: ${(props) => (props.align === 'left' ? '0' : 'auto')};
  top: calc(100% + 8px);
  z-index: ${(props) => props.zIndex};
`;

interface IProps {
  target: ReactNode;
  children: ReactNode;
  rootZIndex?: number;
  preserveVisibiltyOnClick?: boolean;
  onDropDownActiveChange?: (isActive: boolean) => void;
  align?: Align;
}

export const Dropdown: React.FC<IProps> = ({
  align = 'right',
  target,
  children,
  preserveVisibiltyOnClick,
  onDropDownActiveChange,
  rootZIndex = Z_INDEXES.dropDown,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const rootRef = useRef(null);

  useClickAway(rootRef, () => setMenuVisible(false));

  useEffect(() => {
    if (onDropDownActiveChange) {
      onDropDownActiveChange(menuVisible);
    }
  }, [onDropDownActiveChange, menuVisible]);

  const close = () => {
    setMenuVisible(false);
  };

  useKey('Escape', close);

  return (
    <Root ref={rootRef}>
      <span onClick={() => setMenuVisible(!menuVisible)}>{target}</span>
      {menuVisible && (
        // The click handling on the element is not real interactivity, this is a workaround for the useClickAway on the container.
        // eslint-disable-next-line styled-components-a11y/click-events-have-key-events, styled-components-a11y/no-static-element-interactions
        <DropdownRoot
          align={align}
          zIndex={rootZIndex}
          onClick={() => {
            if (!preserveVisibiltyOnClick) {
              close();
            }
          }}
        >
          {children}
        </DropdownRoot>
      )}
    </Root>
  );
};
