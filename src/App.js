import './App.css';
import Web3Modal from "web3modal";
import { ethers, Contract } from 'ethers';

import ConnectButton from "./Components/connectButton";

import scroll from "./images/scroll.png" 
import background from "./images/bg.jpg" 
import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@chakra-ui/react';

const { abi } = require('./artifacts/contracts/NobleToken.json');

function App() {

  const contractAddress = "0xaf52FD88baeE7e7e2b379f2596302174d2693f68";
  const contractAbi = abi;
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => { 
    const { ethereum } = window;
    
    if(!ethereum) {
      console.log("No wallet connected");
      return;
    }
    else{
      console.log("Wallet connected");
    }
  }

  const connectWalletHandler = async () => { 
    const { ethereum } = window;
    
    if(!ethereum) {
      alert("Please install MetaMask");
    }

    try{
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    }
    catch(err){
      console.log(err);
    }
  }


  const mintNftHandler = async () => { }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Mint NFT</h1>
      <div>
        {connectWalletButton()}
      </div>
    </div>
  )
}

export default App;
