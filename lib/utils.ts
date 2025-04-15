import { DefaultTheme } from "styled-components";

const getTheme = () => ({
    colors: {
        primary: 'hsl(207, 100%, 48%)',
        secondary: 'hsl(207, 21%, 43%)',
        background: 'hsl(0, 0%, 96%)',
        labelColor: '#333',
        errorLabelColor: 'red',
        scrollBarColor: 'hsl(220, 14%, 58%)',
    },
    layout: {
        shadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        paddingInline: '8px',
    }
} as DefaultTheme);

export default getTheme;