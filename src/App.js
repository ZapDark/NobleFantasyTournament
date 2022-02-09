import logo from './logo.svg';
import './App.css';

import ConnectButton from "./connectButton";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
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
