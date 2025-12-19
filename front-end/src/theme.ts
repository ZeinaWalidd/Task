import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    shape: {
        borderRadius: 12
    },
    palette: {
        primary: {
            main: '#4F46E5',
        },
        error: {
            main: '#EF4444'
        },
        grey: {
            100: '#F3F4F6'
        },
        background: {
        default: '#E9EBFF',
        paper: '#FFFFFF',
        },
        text: {
        primary: '#1F2937',
        secondary: '#6B7280',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 10,
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#4338CA',
                    },
                },
                containedError: {
                    '&:hover': {
                        backgroundColor: '#DC2626',
                    },
                },
                text: {
                    color: '#6B7280',
                    '&:hover': {
                        backgroundColor: '#F3F4F6',
                        color: '#111827',
                    }
                }
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#6B7280',
                    '&:hover': {
                        backgroundColor: '#F3F4F6',
                        color: '#111827'
                    }
                }
            }
        }
    },
    typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        h4: {
        fontWeight: 600,
        },
    },
});

export default theme;
