import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Dropdown, Menu, Icon } from 'semantic-ui-react';
import BlockchainMarketContract from "./contracts/BlockchainMarket.json";
import web3Provider from "./web3";
import Home from './components/Home';
import StoreDetails from './components/StoreDetails';
import Orders from './components/Orders';

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
        const networkId = await web3.eth.net.getId();
        const network = BlockchainMarketContract.networks[networkId];
        const contract = new web3.eth.Contract(BlockchainMarketContract.abi, network && network.address);
        let accounts = await web3.eth.getAccounts();
        web3.currentProvider.publicConfigStore.on('update', async () => {
            accounts = await web3.eth.getAccounts();
            this.setState({ accounts });
        });
        this.setState({ 
            web3, 
            accounts, 
            contract, 
            connected: true });
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
                    <Menu.Menu>
                        <Dropdown item text='Menu'>
                            <Dropdown.Menu>
                                <Dropdown.Item key="10">
                                    { this.state.connected ? <a href="/balance"><b>Balance</b></a> : <div></div> }
                                </Dropdown.Item>
                                <Dropdown.Item key="11">
                                    { this.state.connected ? <a href="/orders"><b>Orders</b></a> : <div></div> }
                                </Dropdown.Item>
                                <Dropdown.Item key="12">
                                    { this.state.connected ? <a href="/stores"><b>Stores</b></a> : <div></div> }
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                    <Menu.Item key="1">
                        { this.state.connected ? <span><Icon color='green' name="check circle" /></span> : <span><Icon color='red' name="dont" /></span> }
                    </Menu.Item>
                    <Menu.Item key="2">
                        { this.state.connected ? <div><b>Account</b> {this.state.accounts[0]}</div> : <div></div> }
                    </Menu.Item>
                    <Menu.Item key="3">
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
                        <Route exact path="/stores" render={ () => <div>Store</div> }/>
                        <Route exact path="/stores/:storeId" render={ ({ match }) => <StoreDetails {...this.state} storeId={match.params.storeId} updated={this.getBalance} /> } />
                        <Route exact path="/balance" render={() => <div>Balance</div> } />
                        <Route exact path="/orders" render={() => <Orders {...this.state} updated={this.getBalance} /> } />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
