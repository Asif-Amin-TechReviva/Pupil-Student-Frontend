export default function Container(theme) {
    return {
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.down('sm')]: {
              paddingLeft: 0,
              paddingRight: 0,
              margin:0
            }
          }
        }
      }
    };
  }
  