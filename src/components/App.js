import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { Router, Route, Switch } from 'react-router-dom';

import { Flex, Box, ThemeProvider, theme } from 'rimble-ui';

import Header from './Header';
import ActiveAccount from './ActiveAccount';
import history from '../history';
import SignUp from './SignUp';
import ListAllUsers from './ListAllUsers';

const dappTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        primary: 'blue'
    }
};


class App extends Component {
  render() {
    return (
        <ThemeProvider>
            <Router history={history}>
            <Flex px={30} flexBasis="auto" flexDirection="column">
                <Box>
                    <Header />
                </Box>
                <Box>
                    <ActiveAccount />
                </Box>
                <ToastContainer />
                <SignUp />
                <ListAllUsers />
            </Flex>
            </Router>
      </ThemeProvider>
    );
  }
}

export default App;