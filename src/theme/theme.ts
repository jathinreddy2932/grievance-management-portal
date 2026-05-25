import { createTheme, ThemeOptions } from '@mui/material/styles';

// Official Government-style colors (inspired by ap.gov.in / vtu.ac.in)
// Trustworthy Navy Blue, clean light backgrounds, simple gray borders
const lightPalette = {
  mode: 'light' as const,
  primary: {
    main: '#0B4EA2', // Government Blue
    light: '#1D72D6',
    dark: '#083B7A',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#4B5563', // Charcoal Grey
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#2E7D32', // Green (Resolved)
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#E65100', // Orange (Open)
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#C62828', // Red (Urgent / High Priority)
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#0B4EA2', // In Progress uses Government Blue
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F5F7FA', // Light Gray default background
    paper: '#FFFFFF', // Solid White for cards/sections
  },
  text: {
    primary: '#1F2937', // Highly readable dark gray
    secondary: '#4B5563',
  },
  divider: '#D8DEE6', // Border Gray
};

const darkPalette = {
  mode: 'dark' as const,
  primary: {
    main: '#90CAF9', // Accessible light blue
    light: '#E3F2FD',
    dark: '#0D47A1',
    contrastText: '#0F172A',
  },
  secondary: {
    main: '#9CA3AF',
    contrastText: '#0F172A',
  },
  success: {
    main: '#81C784',
    contrastText: '#0F172A',
  },
  warning: {
    main: '#FFB74D',
    contrastText: '#0F172A',
  },
  error: {
    main: '#E57373',
    contrastText: '#0F172A',
  },
  info: {
    main: '#90CAF9',
    contrastText: '#0F172A',
  },
  background: {
    default: '#111827', // Dark theme soft background (not pure black)
    paper: '#1F2937', // Slightly lighter dark gray for cards
  },
  text: {
    primary: '#F9FAFB', // Off-white
    secondary: '#D1D5DB',
  },
  divider: '#374151', // Subtle dark border
};

const commonOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
    h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
    h2: { fontSize: '1.6rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3 },
    h4: { fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.4 },
    h5: { fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4 },
    h6: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.4 },
    body1: { fontSize: '1.05rem', lineHeight: 1.6, letterSpacing: '0.01em' },
    body2: { fontSize: '0.95rem', lineHeight: 1.5 },
    button: { fontSize: '1rem', fontWeight: 700, textTransform: 'none' },
  },
  shape: {
    borderRadius: 4, // Rectangle shapes
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Completely flat design
      },
      styleOverrides: {
        root: {
          padding: '10px 20px',
          minHeight: '44px',
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          marginBottom: '16px',
          '& .MuiInputBase-root': {
            minHeight: '48px', // Clear, elderly-friendly touch target
            fontSize: '1rem',
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.95rem',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: '26px',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
  },
};

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: mode === 'light' ? lightPalette : darkPalette,
    ...commonOptions,
    components: {
      ...commonOptions.components,
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)', // Extremely minimal shadow
            border: mode === 'light' ? '1px solid #D8DEE6' : '1px solid #374151',
          },
        },
      },
    },
  });
};

