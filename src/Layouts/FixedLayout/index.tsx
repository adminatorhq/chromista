import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { Footer } from "./Footer";
import { PageHeader } from "./Header";
import { AppLeftSideNav } from "./SideBar";
import useWindowDimensions from "./use-window-dimensions.hook";

interface IProps {
  children: ReactNode;
}

const StyledPageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: 0;
  display: block;
  margin-left: ${(props) => (props.isSidebarOpen ? 220 : 50)}px;
  background: #edf0f1;
`;

const StyledPageContent = styled.div`
  width: 100%;
  position: relative;
  min-height: 100vh;
  padding: 0 8px 52px 8px;
  display: inline-block;

  @media (max-width: 1024px) {
    min-height: 100vh;
    padding: 0 0 50px 0;
  }
  @media (max-width: 767.98px) {
    width: 100%;
    margin-top: 0;
    min-height: 100vh;
    padding: 0 0 60px 0;
  }
`;

export function AppLayout({ children }: IProps) {
  const { width } = useWindowDimensions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => width > 1024);
  return (
    <>
      <AppLeftSideNav
        navigation={[]}
        isSidebarOpen={isSidebarOpen}
        toogleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <StyledPageWrapper isSidebarOpen={isSidebarOpen}>
        <StyledPageContent>
          <PageHeader />
          {children}
          <Footer />
        </StyledPageContent>
      </StyledPageWrapper>
    </>
  );
}
