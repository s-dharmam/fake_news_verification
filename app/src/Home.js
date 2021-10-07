import React, { useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Trends from './components/trends';
import Cardlist from './components/Cardlist';
import {UserContext} from './UserContext';

export default function Home() {
    
  const [bData, setbData] = useState("");
        return (
        <div>
        
        
        
        <UserContext.Provider value={{bData,setbData}}>
          <App/>
          <Trends/>
        </UserContext.Provider>
        </div>
        );
    }
  


//export default Home;