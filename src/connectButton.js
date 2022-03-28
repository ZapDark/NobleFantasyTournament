// https://dev.to/jacobedawson/build-a-web3-dapp-in-react-login-with-metamask-4chp
// ConnectButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import scroll from "./images/scroll.png" 
import './App.css';


export default function ConnectButton() {
  const {activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (

    <div className="connectButton">
      <img src={scroll} class="img" alt="title"/>
      <div class="centered">
        Signed in as: <br/>
        <font size="3">{account}</font><br/>
        {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH</div>
    </div> 

  ) : (
    <div className="connectButton" onClick={handleConnectWallet}>
      <img src={scroll} class="img" alt="title"/>
      <div class="centered">Connect to Metamask</div>
    </div> 
  );
}
