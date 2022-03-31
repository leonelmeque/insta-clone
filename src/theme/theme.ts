
export type ColorProps = {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    text: string
}

export type ThemeProps = {
    colors: ColorProps;
    spacing: typeof spacing;
    textVariants: {
        header: {},
        body: {}
    }
    breakpoints: typeof breakpoints
}

export const pallete: ColorProps = {
    background: '#fff',
    foreground: '#fafafa',
    primary: 'rgb(0, 149, 246)',
    secondary: 'rgb(38, 38, 38)',
    success: '',
    danger: '#ed4956',
    warning: '',
    text: '#47afff'
}

export const breakpoints = {
    smallPhone: 0,
    phone: 321,
    tablet: 768,
}

export const spacing = {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
}

export const theme: ThemeProps = {
    colors: pallete,
    spacing: spacing,
    textVariants: {
        header: {
            fontFamily: 'Raleway',
            fontSize: 36,
            fontWeight: 'bold',
        },
        body: {
            fontFamily: 'Merriweather',
            fontSize: 16,
        },
    },
    breakpoints: breakpoints
}

