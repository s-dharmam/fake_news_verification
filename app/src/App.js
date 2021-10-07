import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import SearchField from "react-search-field";
import Cardlist from "./components/Cardlist";
import { UserContext } from "./UserContext";
function App() {
  
 const [bodyData, setbodyData] = useState("");
 const {bData, setbData}= useContext(UserContext);
 useEffect(() => {
  changedata();
 }, [bData]);

 function hello(e)
 {
   setbodyData(e);
 } 
 function changedata(){
 if(bData == "x")
 {
   setbodyData("");
 }
 else{
 setbodyData(bData);
 }
 }
 
 
  return (
    <div>
      {<SearchField
        id="searchbox"
        placeholder="Search..."
        onChange={hello}
        searchText=""
        classNames="test-class"
      /> }
      
      
       <div><Cardlist   bodydata={{ label: 1, message: bodyData }}/></div>
    </div>
    
  );
}

export default App;
