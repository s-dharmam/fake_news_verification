import React from "react";
import { useState, useEffect ,useContext} from "react";
import Card from "./Card";
import axios from "axios";
import {UserContext} from '../UserContext';
export default function Cardlist(props) {
  
  const [userData, setUserData] = useState({
    data: [{ label: 1, message: "loading.." }],
  });
  
  
  let card_data=props.bodydata;

  useEffect(() => {
    getGiHubUserWithAxios();
  }, [props.bodydata]);

  const getGiHubUserWithAxios = async () => {
      
    const response = await axios
      .post("http://127.0.0.1:5000/check_relevant", card_data)
      .then((response) => {
        return response.data;
      });
    let array = [];
    Object.keys(response).forEach(function (key) {
      array.push(response[key]);
    });

    //let temp = { data: array };

    setUserData({ data: array });
  };
  
 
  return (
    <p>
      {userData.data.map((item) => (
        <Card
          id={item.$oid}
          negative={item.negative}
          neutral={item.neutral}
          positive={item.positive}
          message={item.message}
        />
      ))}
    </p>
  );
}
