import './App.css';
import Web3Modal from "web3modal";
import { ethers, Contract } from 'ethers';

import Play from './pages/Play';
import About from './pages/About';

import scroll from "./images/scroll.png" 
import background from "./images/bg.jpg" 
import { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Button, Center } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const { abi } = require('./artifacts/contracts/NobleToken.json');

function App() {

  const contractAddress = "0x4131e415B69E139dB9d2A4dB1A8335715c64ce8B";
  const contractAbi = abi;
  const [currentAccount, setCurrentAccount] = useState(null);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  const checkWalletIsConnected = async () => { 
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
      if(ethereum){
        console.log("Minting NFT");
        let nftTxn = await contract.mintNFTs(1, {value: ethers.utils.parseEther("0.2")});

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

   const getMyNftHandler = async () => {
    try{
      if(ethereum){
        console.log("Getting NFT");
        const nfts = await contract.getMyTokens();
        console.log("NFT retrieved : " + nfts);
        const baseUri = await contract.tokenURI(0);
        const uri = baseUri.toString() + ".json";
        console.log("URI : " + uri.toString());
        const img = await contract.tokenURI(0);
      }
      else{
        console.log("Eth object not found");
      }
    }
    catch(err){
      console.log(err);
    }

  }

  const connectWalletButton = () => {
    return (
      <button style={{padding: '10px'}} onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const mintNftButton = () => {
    return (
      <button style={{padding: '10px'}} onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  const getMyNftButton = () => {
    return (
      <button style={{padding: '10px'}} onClick={getMyNftHandler} className='cta-button get-my-nft-button'>
        Get My NFT
        </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div style={{height: '100%', width: '100%', backgroundImage: `url(${background})`}} className='main-app'>
      <header>
        <Router>
        <div style={{backgroundColor: 'grey'}}>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Play">Play!</Link>
          </li>
        </div>
        <Routes>
          <Route path="/About" element={About} />
          <Route path="/Play" element={Play} />
        </Routes>
      </Router>
      </header>
      
      <h1 style={{textAlign: 'center'}}>Mint NFT</h1>
      <div style={{textAlign: 'center'}}>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
      <div style={{padding: '10px', textAlign: 'center'}}>
        {currentAccount ? getMyNftButton() : null}
      </div>
    </div>
  )
}

export default App;
