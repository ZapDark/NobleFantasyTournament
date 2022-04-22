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

  const contractAddress = "0x650FBce849d36595b4Db1C9669ce2d22e15008de";
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

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    }
    else{
      console.log("No accounts found");
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


  const mintNftHandler = async () => {
    try{
      const { ethereum } = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        console.log("Minting NFT");
        let nftTxn = await contract.mintNFTs(1, {value: ethers.utils.parseEther("1.00")});

        console.log("Mining... please wait");
        await nftTxn.wait();
        console.log("Minted NFT");
      }
      else {
        console.log("Eth object not found");
      }
    }
    catch(err){
      console.log(err);
    }
   }

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
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
    </div>
  )
}

export default App;
