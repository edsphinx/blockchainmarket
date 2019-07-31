import web3 from './web3';
import BlockchainMarket from "./contracts/BlockchainMarket.json";

const instance = new web3.eth.Contract(
  JSON.parse(BlockchainMarket.interface),
);

export default instance;