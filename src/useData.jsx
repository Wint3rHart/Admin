import React from "react";
import { useQuery } from "@tanstack/react-query";
const useData=(type)=>{

const query=useQuery({queryKey:["access",type],queryFn:async({queryKey})=>{ console.log(queryKey);
;let get=await fetch(`http://localhost:4700/api/${type}`,{credentials:"include"});let conv=await get.json();if(!get.ok){throw new Error(conv.msg||"error in login/refresh")};return conv  },refetchOnWindowFocus:false,retry:0});


    return query
};
export default useData