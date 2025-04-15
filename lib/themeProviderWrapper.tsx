'use client';

import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';
import getTheme from './utils';
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0;
        padding: 0;
    }

    body {
        background-color: ${({ theme }) => theme.colors.background};
    }

    p, h1, h2, h3, h4 {
        color: black;
    }
`;

const queryClient = new QueryClient();

export default function ThemeProviderWrapper({
    children,
}: {
    children: ReactNode;
}) {
    const theme = getTheme();
    return <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            {children}
        </QueryClientProvider>

    </ThemeProvider>;
}