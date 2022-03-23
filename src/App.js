import './App.css';

import ConnectButton from "./connectButton";

import scroll from "./images/scroll.png" 
import background from "./images/bg.jpg" 

function App() {
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
