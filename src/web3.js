import Web3 from 'web3';

const localDevPort = "7545";
const localDevServer = `http://127.0.0.1:${localDevPort}`;

const web3Provider = () => 
    new Promise( (res, rej) => {
        window.addEventListener("load", async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    await window.ethereum.enable();
                    res(web3);
            } catch(e) {
                console.log(`Error after Ethereum Enable: ${e}`);
                rej(e);
            }} else if (window.web3) {
                const web3 = window.web3;
                console.log("Injected web3 detected");
                res(web3);
            } else {
                const provider = new Web3.providers.HttpProvider(localDevServer);
                const web3 = new Web3(provider);
                console.log("Web3 instance missing, Working with local web3 instead");
                res(web3);
            }
        });
    });


export default web3Provider;