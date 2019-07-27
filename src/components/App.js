import React, { Component } from "react";
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import { Flex, Box, ThemeProvider, theme } from 'rimble-ui';

import NavigationBar from "./NavigationBar";
import Header from './Header';
import ActiveAccount from './ActiveAccount';
import history from '../history';
// import SignUp from './SignUp';
//import ListAllUsers from './ListAllUsers';

const dappTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        primary: 'blue'
    }
};


class App extends Component {

    componentDidUpdate(prevProps) {
        const {
            accountsFetched,
            selectAccount,
            accounts
        } = this.props;

        const { drizzleState, drizzle, initialized } = this.props.drizzleContext;

        if (initialized && !prevProps.drizzleContext.initialized) {
            if (Object.key(drizzleState.accounts).length) {
                accountsFetched(Object.values(drizzleState.accounts));
            }
        }

        if (accounts && accounts.length && !prevProps.accounts) {
            selectAccount(accounts[0]);
        }
    }

    renderNavigation = () => {
        const {drizzle, drizzleState, initialized} = this.props.drizzleContext;
        return <NavigationBar drizzle={drizzle} drizzleState={drizzleState} initialized={initialized}/>;
    }

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
                </Flex>
                </Router>
            </ThemeProvider>
        );
    }
}

export default App;