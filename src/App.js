import logo from './logo.svg';
import './App.css';
import Web3Modal from "web3modal";
import { ethers, Contract } from 'ethers';

import ConnectButton from "./connectButton";
import { ChakraProvider } from "@chakra-ui/react";

const { abi } = require('./artifacts/contracts/NobleToken.json');

function App() {

  const initWeb3 = async () => {

    return new Promise (async (resolve, reject) => {

      const web3Modal = new Web3Modal({

        cacheProvider: true

    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const {chainId} = await provider.getNetwork();

    const signer = provider.getSigner();

    const contract = new Contract('0x96c2c1781E6cE352b3d5c2c2a6bF7f107DaeDF78', abi, signer);

    resolve({contract});

    })
  }
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <ConnectButton />
      </header>
      
        
    </div>
  );
}

export default App;
