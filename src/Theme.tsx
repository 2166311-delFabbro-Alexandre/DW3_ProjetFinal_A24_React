import { createTheme, Shadows } from '@mui/material/styles';

/**
 * Constructeur de thème de l'application
 * Inspiré du code de:
 * OpenAI. (2024). ChatGPT (Version 22 novembre 2024) [Modèle massif de langage].  https://chat.openai.com/chat
 */
const theme = createTheme({
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: ['"Poppins"', '"Roboto Mono"', 'Arial', 'sans-serif'].join(','),
        h1: {
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.015em',
            lineHeight: 1.2,
            color: '#F4E3CF',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            color: '#D1B89D',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.6,
            color: '#D1B89D',
        },
        body2: {
            fontSize: '0.9rem',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#A07855',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },

    palette: {
        mode: 'dark',
        primary: {
            main: '#B35627',
            contrastText: '#F4E3CF',
        },
        secondary: {
            main: '#FF7F32',
            contrastText: '#F4E3CF',
        },
        background: {
            default: '#1C1917',
            paper: '#2D2A27',
        },
        text: {
            primary: '#F4E3CF',
            secondary: '#D1B89D',
            disabled: 'rgba(244, 227, 207, 0.5)',
        },
        divider: '#4A4034',
    },
    shadows: Array.from({ length: 25 }, (_, i) =>
        i === 0
            ? 'none'
            : `0px ${i * 2}px ${i * 4}px rgba(0, 0, 0, ${0.05 + i * 0.02})`
    ) as Shadows,

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#1C1917',
                    color: '#F4E3CF',
                    fontFamily: '"Poppins", "Roboto Mono", Arial, sans-serif',
                    lineHeight: 1.6,
                },
                '*': {
                    boxSizing: 'border-box',
                },
                a: {
                    textDecoration: 'none',
                    color: '#B35627',
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    padding: '8px 16px',
                },
                containedPrimary: {
                    backgroundColor: '#B35627',
                    color: '#F4E3CF',
                    '&:hover': {
                        backgroundColor: '#8A3F20',
                    },
                },
                containedSecondary: {
                    backgroundColor: '#FF7F32',
                    color: '#F4E3CF',
                    '&:hover': {
                        backgroundColor: '#B65D1E',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    padding: '16px',
                    backgroundColor: '#2D2A27',
                    color: '#D1B89D',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#6B4226',
                    color: '#F4E3CF',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    fontWeight: 600,
                    textTransform: 'none',
                    padding: '8px 16px',
                }
            }
        },
    },
});

export default theme;