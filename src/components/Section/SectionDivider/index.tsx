import React, { ReactNode } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import { Spacer } from "../../../ui-blocks";

interface IProps {
  children: ReactNode;
  size?: number;
}

export function SectionRow({ children }: { children: ReactNode }) {
  return <Row>{children}</Row>;
}

export function SectionLeft({ children, size = 3 }: IProps) {
  return (
    <Col sm={12} lg={size}>
      {children}
      <Spacer />
    </Col>
  );
}

export function SectionRight({ children, size = 9 }: IProps) {
  return (
    <Col sm={12} lg={size}>
      {children}
    </Col>
  );
}

export function SectionCenter({ children, size = 8 }: IProps) {
  return (
    <SectionRow>
      <Col sm={12} lg={size} lgOffset={(12 - size) / 2}>
        {children}
      </Col>
    </SectionRow>
  );
}
