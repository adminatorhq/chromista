import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SLUG_LOADING_VALUE } from '@gothicgeeks/shared';
import { ThemeProvider } from 'styled-components';
import { Tabs } from '.';
import { themeContext } from '../../AppWrapper/Global';

import '@testing-library/jest-dom/extend-expect';

describe('Tabs', () => {
  it('should render first tab by default', () => {
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

  it('should render first tab when current tab is loading', () => {
    const { getByText } = render(
      <ThemeProvider theme={themeContext}>
        <Tabs
          currentTab={SLUG_LOADING_VALUE}
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

  it('should render currentTab', () => {
    const { getByText } = render(
      <ThemeProvider theme={themeContext}>
        <Tabs
          currentTab="Baz Label"
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

    expect(getByText('Foo Content')).not.toBeVisible();
    expect(getByText('Bar Content')).not.toBeVisible();
    expect(getByText('Baz Content')).toBeVisible();
  });

  it('should switch tab', async () => {
    const { getByText } = render(
      <ThemeProvider theme={themeContext}>
        <Tabs
          currentTab="Baz Label"
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

    expect(getByText('Foo Content')).not.toBeVisible();
    expect(getByText('Bar Content')).not.toBeVisible();
    expect(getByText('Baz Content')).toBeVisible();

    fireEvent.click(getByText('Bar Label'));

    expect(getByText('Foo Content')).not.toBeVisible();
    expect(getByText('Bar Content')).toBeVisible();
    expect(getByText('Baz Content')).not.toBeVisible();

    fireEvent.click(getByText('Bar Label'));

    expect(getByText('Foo Content')).not.toBeVisible();
    expect(getByText('Bar Content')).toBeVisible();
    expect(getByText('Baz Content')).not.toBeVisible();
  });
});
