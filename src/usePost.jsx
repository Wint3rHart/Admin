import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'

function usePost(type,key) {

    const abort_ref=useRef(new AbortController());
//  

    const query=useMutation({mutationFn:async(data)=>{
console.log("aas");
console.log(data);
abort_ref.current=new AbortController();
      const signal=abort_ref.current.signal ;   
   let time=  setTimeout(() => {
            abort_ref.current.abort("took too long")
        }, 10000);

 let  url="";

      switch (type){
case "register":{
  
  url= `http://localhost:4700/api/register`;
let form=new FormData();
form.append("name",data.name);
form.append("email",data.email);
form.append("password",data.password);
form.append("pic",data.pic[0]);
 let get=await fetch(url,{signal,method:"POST",body:form});
if(!get.ok){let conv=await get.json();throw new Error(conv||"error in registration")};
clearTimeout(time);
return await get.json()};

case "signIn":
  console.log("sign req",data);
  
  url=`http://localhost:4700/api/signIn`
  let get=await fetch(url,{signal,method:"POST",body:JSON.stringify(data),headers:{"Content-type":"Application/json"},credentials:"include"})
  let conv=await get.json();
  if(!get.ok){throw new Error(conv||"error in signIn")};
  return conv;

      };




    },onError:(err)=>{console.log(error);
    },onSuccess:(data)=>{console.log(data);
    }})

  return query
}

export default usePost