import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            background: string;
            labelColor: string;
            errorLabelColor: string;
            scrollBarColor: string;
        };
        layout: {
            shadow: string;
            paddingInline: string;
        };
    }
}
