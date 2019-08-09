import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Menu, Icon } from 'semantic-ui-react';
import BlockchainMarketContract from "./contracts/BlockchainMarket.json";
import web3Provider from "./web3";
import Home from './components/Home';
import StoreDetails from './components/StoreDetails';
// import ENS from 'ethereum-ens';

class App extends Component {

    state = {
        web3: null,
        connected: false,
        accounts: null,
        contract: null,
        loading: false,
        balance: null,
    };

    connectETH = async () => {
        const web3 = await web3Provider();
        let accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const network = BlockchainMarketContract.networks[networkId];

        // const addressContract = "0x3620ac3b36a73d3af16886c12d561132ced1f3eb";
        // const addressContract = "0x41874D4ae72E1Fc0F49F0401A5B04a1F3e26eb83";
        // const contract = new web3.eth.Contract(BlockchainMarketContract.abi, addressContract);
        const contract = new web3.eth.Contract(BlockchainMarketContract.abi, network && network.address);

        this.setState({
            web3,
            accounts,
            contract,
            connected: true
        });

        web3.currentProvider.publicConfigStore.on('update', async () => {
            accounts = await web3.eth.getAccounts();
            this.setState({ accounts });
        });
        
    }

    componentDidMount = () => {
        try {
            this.connectETH(() => {
                this.getBalance();
            });
        } catch (e) {
            console.error(e);
            alert(`Failed to load web3. Error details: ${e}`);
        }
    };

    componentDidUpdate = () => {
        try {
            this.connectETH(() => {
                this.getBalance();
            });
        } catch (e) {
            console.error(e);
            alert(`Failed to load web3. Error details: ${e}`);
        }
    }

    getBalance = () => {
        this.state.web3.eth.getBalance(this.state.accounts[0]).then(wei => {
            let val = {};
            val['currentBalance'] = Math.round((wei / 1e18) * 100) / 100;
            this.setState(val);
        });
    }

    renderHeader = () =>  {
        return (
            <Header>
                <Menu attached='top'>
                    <Menu.Item key="0">
                        <a href="/">Blockchain Market</a>
                    </Menu.Item>
                    <Menu.Item key="1">
                        { this.state.connected ? <div><span><Icon color='green' name="check circle" /></span><b>Account</b> {this.state.accounts[0]}</div> : <div><span><Icon color='red' name="dont" /></span></div> }
                    </Menu.Item>
                    <Menu.Item key="2">
                        { this.state.connected ? <div onClick={this.getBalance()}><span><b>Balance:</b> {this.state.currentBalance} ETH</span></div> : <div></div> }
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <Router>
                    <Switch>
                        <Route exact path="/" render={ () => <Home {...this.state} updated={this.getBalance} />} />
                        <Route exact path="/stores/:storeId" render={ ({ match }) => <StoreDetails {...this.state} storeId={match.params.storeId} updated={this.getBalance} /> } />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
