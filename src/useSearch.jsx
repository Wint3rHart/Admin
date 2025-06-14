import React, { useEffect, useState } from 'react';

const UseSearch = (data) => {
//    console.log("search rendered");
   
let [state,setState]=useState("");
useEffect(()=>{
let time=setTimeout(() => {
    setState(x=>x=data);
    
}, 1000);
return ()=>{ clearTimeout(time)}

},[data]);


return state
}

export default UseSearch;
