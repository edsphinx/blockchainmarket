import React, {Component} from "react";
import {connect} from "react-redux";
import {Navbar, Glyphicon} from "react-bootstrap";

import AccountsMenu from "./AccountsMenu";
import {selectAccount} from "../store/account/AccountActions";
import {KitNavbar, KitNavbarHeader, KitNav, KitNavbarBrand} from "./theme";

class NavigationBar extends Component {

    // Render the Navbar
    render() {

        const {initialized} = this.props;

        return <KitNavbar fixedTop={true} collapseOnSelect>
            <KitNavbarHeader>
                <KitNavbarBrand>
                    <Glyphicon glyph="tower"/>
                    &nbsp;
                    Blockchain Market
                </KitNavbarBrand>
                <Navbar.Toggle/>
            </KitNavbarHeader>
            <Navbar.Collapse>
                <KitNav pullRight>
                {initialized ? <AccountsMenu {...this.props}/> : null}
                </KitNav>
            </Navbar.Collapse>
        </KitNavbar>;
    }
}

const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
});

const mapDispatchToProps = (dispatch) => ({
    selectAccount: account => dispatch(selectAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);