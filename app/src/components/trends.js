import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {UserContext} from '../UserContext';

function Trends() {
  const [userData, setUserData] = useState({'trends':[]});
  const {bData, setbData}= useContext(UserContext);
 // const providervalue = use
  const getGiHubUserWithAxios = () => { 
    const response = axios.get("http://127.0.0.1:5000/trends")
      .then((response) => {
        return response.data;
      });
    
  };
  
  function hello(){
    axios.get("http://127.0.0.1:5000/trends")
      .then((response) => {
       
        setUserData({'trends':response.data.trends})
      });
  }
  function getd(e)
  {
    
      setbData(e.target.innerHTML);
  }
  
  return (
   
      <div>
        <div>{bData}</div>
        <button onClick={getd}>x</button> 
        <button onClick={hello}>Load twitter trends</button>
        {userData.trends.map(temp => (
        <button onClick={getd}>{temp}</button>
      ))}
      
      </div>);
};

export default Trends;
