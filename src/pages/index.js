import React from 'react'
import Home from '../components/Home';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "../styles/App.css"

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12
  },
  text: {
    primary: "#fff"
  },
  select: {
    primary: "#fff"
  },
  root: {
    primary: "#fff"
  },
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#fff'
    },
    secondary: {
      main: '#000000'
    },
  },
});


const IndexPage = () => (
  <MuiThemeProvider theme={theme}>
    <Home />
  </MuiThemeProvider>
)

export default IndexPage


