import { createTheme } from '@mui/material'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#445569',
      light: '#92A3B6',
      dark: '#29333f',
    },
    secondary: {
      main: '#DB880B',
      dark: '#b67006',
    },
    background: {
      default: '#F1F4FA',
      paper: '#fff',
    },
  },
  components: {
    // set background color of body to default background color
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F1F4FA',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#445569',
          color: '#fff',
        },
        paperAnchorDockedLeft: {
          borderRight: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f1f4fa',
          boxShadow: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          marginLeft: '20px',
          marginTop: '10px',
          width: 'calc(100% - 30px)',
          backgroundColor: '#fff',
          color: '#445569',
          boxShadow: 'none',
          borderRadius: '12px',
        },
      },
    },
    // Make MUI typography h4 have primary color and be uppercase
    MuiTypography: {
      styleOverrides: {
        h4: {
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: '#445569',
          fontSize: '1.375rem',
        },
      },
    },
    // Make MUI table have primary color for header background and decrease height of table rows
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          padding: '8px 16px',
        },
        head: {
          backgroundColor: '#445569',
          color: '#fff',
          fontWeight: 'bold',
        },
        body: {
          borderBottom: '1px solid #d2d2d2',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#DB880B20',
          color: '#DB880B',
          fontWeight: 500,
          borderRadius: '14px',
        },
      },
    },
    // MUI set all text input to use small prop
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          textTransform: 'none',
          backgroundColor: '#DB880B',
          color: 'white',
          fontWeight: 500,
          marginRight: 8,
          marginBottom: 16,
          ':hover': {
            backgroundColor: '#DB880B',
          },
        },
      },
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
    },
  },
})

export default theme
