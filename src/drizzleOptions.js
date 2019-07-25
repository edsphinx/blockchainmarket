import BlockchainMarket from './contracts/BlockchainMarket.json';

const drizzleOptions = {
    contracts: [
        BlockchainMarket
    ],
    events: {
        BlockchainMarket: [
            'LogUserSignUp',
            'LogAdminApproved'
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
