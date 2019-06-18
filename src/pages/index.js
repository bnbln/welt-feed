import React from 'react'
import Background from '../components/Background';
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
    <Background colors={["#00518B", "#003a5a", "#003a5a", "#00518B"]} />
  </MuiThemeProvider>
)

export default IndexPage


