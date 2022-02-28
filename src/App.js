import './App.css';

import ConnectButton from "./connectButton";

import scroll from "./images/scroll.png" 

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <div className="title">
          <img src={scroll} class="img" alt="title"/>
          <div class="centered">Noble Fantasy Tournament</div>
        </div> 
        <div className="connectButton">
          {/* <img src={scroll} class="img" alt="title"/> */}
          {/* <div class="centered">Connect to metamask</div> */}
          <ConnectButton/>
        </div>
        
      </header>      
    </div>
  );
}

export default App;
