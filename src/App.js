import './App.css';
import Web3Modal from "web3modal";
import { ethers, Contract } from 'ethers';

import ConnectButton from "./connectButton";

import scroll from "./images/scroll.png" 
import background from "./images/bg.jpg" 
import { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@chakra-ui/react';

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

      const contract = new Contract('0xDee20e4F4d533Af08E1a93E772284b15b9f19beA', abi, signer);

      resolve({contract});
    })
  }

  const mintToken = async (tokenName) => {
    if (!tokenName) return;

    contract.mintToken(tokenName).then((tx) => {

      tx.wait().then(() => {

        setLogMessage('Token minted.');

      });

    }).catch((err) => setLogMessage(err.message));

  };

  const getAllTokens = async () => {
    const tokens = await contract.getAllTokens();
    setTokens(tokens);
  };

  const getMyTokens = async () => {
    const myTokens = await contract.getMyTokens();
    setMyTokens(myTokens);
  }

  useEffect(() => {

    initWeb3().then(async ({contract}) => {

      setContract(contract);

      const tokens = await contract.getAllTokens();

      setTokens(tokens);

    }).catch((err) => {

      console.log(err);

      setLogMessage(err);
    });

  }, []);

  return (
    <div className="App" >
      <img src={background} className="bg" height="2000vmin" max-width="100%" object-fit="contain"/>
      <header className="App-header" >
        
        <div className="title" >
          <img src={scroll} class="img" alt="title"/>
          <div class="centered">Noble Fantasy Tournament</div>
        </div> 

        <ConnectButton/>

        <div className="playButton">
          <img src={scroll} class="img" alt="title"/>
          <div class="centered">Play</div>
        </div>
      </header>  

      <body>
        testing text
        <form>
          <h2> Mint New Token </h2>
          <Button onClick={() => mintToken()}> Mint Token </Button>
        </form>
        <br />
        <div>
          <Button onClick={getMyTokens}>My Minted Tokens</Button>
          <Button onClick={getAllTokens}>All Minted Tokens</Button>
        </div>
      </body>    
    </div>
  );
}

export default App;
