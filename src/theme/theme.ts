import React from 'react'


export type ThemeProps = {
    colors: typeof pallete;
    spacing: typeof spacing;
    textVariants: {
        header: {},
        body: {}
    }
    breakpoints: typeof breakpoints
}

export const pallete = {
    background: '#fff',
    foreground: '#fafafa',
    primary: 'rgb(0, 149, 246)',
    secondary: 'rgb(38, 38, 38)',
    success: '',
    danger: '#ed4956',
    warning: '',
    textWhite: "#fff",
    textLight: '#47afff',
    textDark: "#000"
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
            fontFamily: 'MerriweatherSans-Regular',
            fontSize: 16,
        },
    },
    breakpoints: breakpoints
}

