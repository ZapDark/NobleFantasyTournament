import './App.css';
import Web3Modal from "web3modal";
import { ethers, Contract } from 'ethers';

import ConnectButton from "./connectButton";

import scroll from "./images/scroll.png" 
import background from "./images/bg.jpg" 

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
    <div className="App" >
      <img src={background} classname="bg" height="2000vmin" max-width="100%" object-fit="contain"/>
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
      </body>    
    </div>
  );
}

export default App;
