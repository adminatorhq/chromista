// import { useCurrentRouteConfig, useLocationParams } from '../../../../routes/hooks';
import * as StyledGrid from 'styled-bootstrap-grid';
import styled from 'styled-components';
import React from 'react';
// import { Breadcrumbs } from '../../components/Breadcrumbs';

const StyledPageTitleBox = styled.div`
  padding: 16px 0;
  @media (max-width: 767.98px) {
    margin-top: 5px;
  }
`;

// const StyledTitle = styled.h4`
//   margin-bottom: 0px;
// `;

export const PageHeader = () => {
  // const { breadcrumbs = [], title = '' } = useCurrentRouteConfig() || { breadcrumbs: [] };

  // const param = useLocationParams();

  // const mappedBreadcrumbs = breadcrumbs.map(breadcrumb => {
  //   // You might be able to map along
  //   // It will be done here when products is done
  //   // improvement on storing the product details in localstorage
  //   // so if you have it then we can transfer you back there
  //   const splitCrumbs = breadcrumb.value.split('/');
  //   // loops this when you want support mulitple
  //   const paramPresentIndex = splitCrumbs.findIndex(crumb => crumb.startsWith(':'));
  //   if (paramPresentIndex > -1) {
  //     splitCrumbs[paramPresentIndex] = param; // pop on multiple
  //     return { ...breadcrumb, link: splitCrumbs.join('/') };
  //   }
  //   return breadcrumb;
  // });
  return (
    <>
      {/* <Helmet>
        <title>MDStores - {title}</title>
      </Helmet> */}
      <StyledGrid.Container fluid={true}>
        <StyledGrid.Row>
          <StyledGrid.Col sm={12}>
            <StyledPageTitleBox>
              <StyledGrid.Row>
                {/* <StyledGrid.Col>
                  <StyledTitle>{title}</StyledTitle>
                  <Breadcrumbs
                    items={[
                      {
                        label: 'Home',
                        value: '/',
                      },
                      ...mappedBreadcrumbs,
                      {
                        label: title,
                        value: '',
                      },
                    ]}
                  />
                </StyledGrid.Col> */}
              </StyledGrid.Row>
            </StyledPageTitleBox>
          </StyledGrid.Col>
        </StyledGrid.Row>
      </StyledGrid.Container>
    </>
  );
};
