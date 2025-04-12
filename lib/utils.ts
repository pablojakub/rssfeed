import { DefaultTheme } from "styled-components";

const getTheme = () => ({
    colors: {
        primary: 'hsl(207, 100%, 48%)',
        secondary: 'hsl(207, 21%, 43%)',
        background: 'hsl(0, 0%, 96%)',
        labelColor: '#333',
        errorLabelColor: 'red',
    },
} as DefaultTheme);

export default getTheme;