/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, useEffect, useRef, useState } from "react";
import useClickAway from "react-use/lib/useClickAway";
import useKey from "react-use/lib/useKey";
import styled from "styled-components";
import { Z_INDEXES } from "../../constants/zIndex";
import { USE_ROOT_COLOR } from "../../theme/root";

const Root = styled.div`
  position: relative;
  display: inline-block;
`;

type Align = "right" | "left";

const DropdownRoot = styled.div<{
  zIndex: number;
  align: Align;
  offset: number;
  $width: number;
}>`
  position: absolute;
  right: ${(props) =>
    props.align === "right"
      ? `${Math.min(0, props.offset - props.$width)}px`
      : "auto"};
  left: ${(props) => (props.align === "left" ? "0" : "auto")};
  top: calc(100% + 8px);
  z-index: ${(props) => props.zIndex};
  background: ${USE_ROOT_COLOR("base-color")};
  border-radius: 2px;
  border: 1px solid ${USE_ROOT_COLOR("border-color")};
`;

export interface IProps {
  target: ReactNode;
  children: ReactNode;
  rootZIndex?: number;
  preserveVisibiltyOnClick?: boolean;
  onDropDownActiveChange?: (isActive: boolean) => void;
  align?: Align;
  width: number;
}

export function Dropdown({
  align = "right",
  target,
  width,
  children,
  preserveVisibiltyOnClick,
  onDropDownActiveChange,
  rootZIndex = Z_INDEXES.dropDown,
}: IProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useClickAway(rootRef, () => setMenuVisible(false));

  useEffect(() => {
    if (onDropDownActiveChange) {
      onDropDownActiveChange(menuVisible);
    }
  }, [onDropDownActiveChange, menuVisible]);

  const close = () => {
    setMenuVisible(false);
  };

  useKey("Escape", close);

  return (
    <Root ref={rootRef}>
      <span
        onClick={(e) => {
          setMenuVisible(!menuVisible);
          e.stopPropagation();
        }}
      >
        {target}
      </span>
      {menuVisible && (
        <DropdownRoot
          offset={rootRef.current?.offsetLeft || 0}
          align={align}
          $width={width}
          zIndex={rootZIndex}
          onClick={(e) => {
            if (!preserveVisibiltyOnClick) {
              close();
            }
            e.stopPropagation();
          }}
        >
          {children}
        </DropdownRoot>
      )}
    </Root>
  );
}
