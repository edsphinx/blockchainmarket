import React from 'react';

const AccountsOptions = props => {
    const { accounts, selectedAccount, selectAccount } = props;
    const { networkId } = props.drizzleState.web3;

    const renderEthMenu = () => {
        let url;
        switch (networkId) {
            case 1:
                url = `https://etherscan.io/address/`;
                break;
            case 3:
                url = `https://ropsten.etherscan.io/address/`;
                break;
            case 4:
                url = `https://rinkeby.etherscan.io/address/`;
                break;
            case 42:
                url = `https://kovan.etherscan.io/address/`;
                break;
            default:
                url = ``;
        }
        return !!url ? 
    }
}