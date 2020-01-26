[![Netlify Status](https://api.netlify.com/api/v1/badges/c8cd1e9c-ceb5-4925-87fd-fdc7f9d8424b/deploy-status)](https://app.netlify.com/sites/tender-benz-6b658e/deploys)
[![LICENCE](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/edsphinx/streamapp/blob/master/LICENSE)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cb7983f0cd2f43af8fb8c80ae3e4575c)](https://www.codacy.com/app/naticode/blockchainmarket?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=edsphinx/blockchainmarket&amp;utm_campaign=Badge_Grade)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](https://travis-ci.org/edsphinx/blockchainmarket.svg?branch=master)](https://travis-ci.org/edsphinx/blockchainmarket)

#  Blockchain Market DAPP
A decentraliced marketplace where you are able to sell and buy items paying with ETH, A user can create multiples stores and create multiples items on them, also there is a balance for each store that the owner of the Store can Withdraw. The project is using IPFS to upload and display images of the items created for every store, there are 12 tests because was needed in the development process.

### Imporant Local environment Details

The address of the contract is hardcoded in the line 27 of App.js and you should update it with yours after migration, this change was made to deploy to Ropsten Network.
The truffle-config has the network name 'develop' and it should be 'development' to successfully migrate to the ganache network 

### Live Example 
It's running at [https://finalprojectconsensys.netlify.com/](https://finalprojectconsensys.netlify.com/) 

The Smart Contract is with the ENS:

You can reach the smart contract of this project on Ropsten Network at [finalproject.eth](finalproject.eth) the address is 
0x3620aC3b36A73D3AF16886C12D561132CED1F3Eb

### The ENS implementation

Was removed due to some problems the implementation is in the history:
https://github.com/edsphinx/blockchainmarket/commit/3422ee404f82f657a4e430ee2f7c3cdca8e43631#diff-14b1e33d5bf5649597cdc0e4f684dadd

### IMPORTANT DETAILS ABOUT INTERFACE

* The Price of the items/products is in Wei, I misplaced ETH as label but it should be Wei, only integers.
* All field are mandatory and the photo is upload to IPFS and will take some time to respond, please bear with me the waiting.

# NATSPEC for Contracts

The contracts with Natspec are in the dev branch:
https://github.com/edsphinx/blockchainmarket/tree/dev

#  Developer Setup
### Build / Run / Deploy Prerequisites
* Node 8.16 or above (also install npm)

### Install Node modules
* ```cd path/to/blockchainmarket``` (instructions in this document will assume you are at this path)

* ``` npm install```

### Install Ganache CLI or GUI
* ```npm install -g ganache-cli```

### Install Truffle
* ```npm install -g truffle```

# Development Tasks
## Blockchain
### Start Ganache CLI
An Ethereum client on 127.0.0.1:7545, will start up a local blockchain for testing.

```npm run ganache:start```

### Start Truffle console
Communicates with the Ethereum client, allows compiling, migrating, debugging, etc.

```truffle console```

#### Compile contracts
*truffle(development)>* ```compile```

#### Migrate contracts, replacing previous deployments
*truffle(development)>* ```migrate --reset```

#### Run contract tests
*truffle(development)>* ```test```

## React App
### Launch application
Compiles, serves, and launches app on http://localhost:3000/. Watches files for changes and reloads app in browser automatically.
Make sure you have launched Ganache first.

```npm start```

### Build application
Creates a production build of the application for deployment

```npm run build```

### Run unit tests
Runs all tests found in the /src tree

```npm test```


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# License
* Blockchain Market - MIT Licence.
