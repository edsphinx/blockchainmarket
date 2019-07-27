import BlockchainMarket from './contracts/BlockchainMarket.json';
import Store from './contracts/Store.json';

const drizzleOptions = {
    contracts: [
        BlockchainMarket,
        Store
    ],
    events: {
        BlockchainMarket: [
            'NewUserSignUp',
            'ItemAdded'
        ],
        Store: [
            'NewContractAdded'
        ]
    },
    web3: {
        fallback: {
            type: 'ws',
            url: 'wss://127.0.0.1:7545'
        }
    }
};

export default drizzleOptions;
