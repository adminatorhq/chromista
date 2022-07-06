import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Tabs } from '.';
import { themeContext } from '../../AppWrapper/Global';
import '@testing-library/jest-dom/extend-expect';

describe('Tabs', () => {
  it('should render first content by default', () => {
    const { getByText } = render(
      <ThemeProvider theme={themeContext}>
        <Tabs
          contents={[
            {
              label: 'Foo Label',
              content: <>Foo Content</>,
            },
            {
              label: 'Bar Label',
              content: <>Bar Content</>,
            },
            {
              label: 'Baz Label',
              content: <>Baz Content</>,
            },
          ]}
        />
      </ThemeProvider>,
    );

    expect(getByText('Foo Content')).toBeVisible();
    expect(getByText('Bar Content')).not.toBeVisible();
    expect(getByText('Baz Content')).not.toBeVisible();
  });
});
