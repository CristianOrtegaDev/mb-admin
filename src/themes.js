import teal from '@material-ui/core/colors/teal'

const defaultContentTheme = {
  direction: 'ltr',
  typography: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '1.81',
    letterSpacing: 'normal',
    color: '#000000',
    subheading: {
      fontSize: '16px',
      color: '#1873f3'
    },
    display3: {
      fontSize: '18px',
      color: '#1973F3'
    },
    headline: {
      fontSize: '24px',
      color: '#1873f3'
    }
  },
  palette: {
    type: 'light',
    primary: teal,
    secondary: {
      main: '#004D40'
    }
  },
  status: {
    danger: 'lightGreen'
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: '#FFF',
        color: '#000'
      }
    }
  }
}

const themes = [
  {
    id: 'terrand-teal',
    name: 'Terrand Teal - Mi Barrio 1.0',
    theme: {
      contentTheme: {
        ...defaultContentTheme
      }
    }
  },
  {
    id: 'terrand-grey',
    name: 'Terrand Grey - Mi Barrio 1.0',
    theme: {
      contentTheme: {
        ...defaultContentTheme,
        palette: {
          type: 'light',
          text: '#000',
          primary: {
            main: '#FFF' //#BCD6FC
          },
          secondary: {
            main: '#F5F5F5',
            alternative: '#F5F5F5'
          },
          common: {
            black: '#000',
            blue: '#1873f3',
            lightBlue: '#BBDEFB',
            darkgrey: '#424242',
            error: '#FF0000',
            hint: '#ADADAD',
            white: '#FFFFFF'
          }
        },
        overrides: {
          MuiAppBar: {
            colorDefault: {
              color: '#000'
            }
          }
        }
      }
    }
  }
]

export default themes
