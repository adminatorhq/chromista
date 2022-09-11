import React, { ReactNode } from "react";
import { Col, Row } from "styled-bootstrap-grid";
import { Spacer } from "../../../ui-blocks";

export function SectionRow({ children }: { children: ReactNode }) {
  return <Row>{children}</Row>;
}

export function SectionLeft({ children }: { children: ReactNode }) {
  return (
    <Col sm={12} lg={3}>
      {children}
      <Spacer />
    </Col>
  );
}

export function SectionRight({ children }: { children: ReactNode }) {
  return (
    <Col sm={12} lg={9}>
      {children}
    </Col>
  );
}

export function SectionCenter({ children }: { children: ReactNode }) {
  return (
    <SectionRow>
      <Col sm={12} lg={8} lgOffset={2}>
        {children}
      </Col>
    </SectionRow>
  );
}
