import React from "react";
import { useQuery } from "@tanstack/react-query";
import useSearch from './useSearch';
const useData=(type,key)=>{
// console.log(type,key);

console.log("useData rendered");

let search= useSearch(type=="search"&&key);
search&&console.log(search);
// console.log("data rendered");

const query=useQuery({queryKey:[type=="search"?search:type=="all"?"all":type=="login"?"access":type,"type"&&type],queryFn:async({queryKey,signal})=>{ 
    console.log(queryKey);
    // if(type=="search"&&search.length==0){return;}
  
    
    let url=type=="search"?`http://localhost:4700/api/search?value=${search}`:`http://localhost:4700/api/${type}`;
    
    
;let get=await fetch(url,{credentials:"include"});let conv=await get.json();if(!get.ok){throw new Error(conv.msg||"error in login/refresh")};return conv  },refetchOnWindowFocus:false,retry:0});


    return query
};
export default useData