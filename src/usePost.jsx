import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'


function usePost(type,key) {
// console.log("usePost called",type);

    const abort_ref=useRef(new AbortController());
const client=useQueryClient();

    const query=useMutation({mutationFn:async(data)=>{
// console.log("aas");
// console.log(data);
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

case "signIn":{
  console.log("sign req",data);
  
  url=`http://localhost:4700/api/signIn`
  let get=await fetch(url,{signal,method:"POST",body:JSON.stringify(data),headers:{"Content-type":"Application/json"},credentials:"include"})
  let conv=await get.json();
  if(!get.ok){throw new Error(conv||"error in signIn")};
  return conv};

  case "refresh":
{
  url=`http://localhost:4700/api/refresh`
  let get=await fetch(url,{signal,method:"POST",headers:{"Content-type":"Application/json"},credentials:"include"})
  let conv=await get.json();
  if(!get.ok){throw new Error(conv||"error in refresh")};
  return conv;};

  case "insert":{
    // console.log(key);
    
url=`http://localhost:4700/api/${key}`;console.log("req in insert recieved");

let get=await fetch(url,{method:"POST",headers:{"Content-type":"Application/json"},body:JSON.stringify(data)})
let conv=await get.json();
if(!get.ok){  throw new Error(conv.msg||"error in insert")};
return conv

  };
  case "edit":{
   
    
const get=await fetch(`http://localhost:4700/api/${key}?id=${data.key}`,{method:"PUT",headers:{"Content-type":"Application/json"},body:JSON.stringify(data.data)});
const conv=await get.json();

if(!get.ok){
  throw new Error(conv||conv.msg||"error in edit");
};
return conv;

  };
case "delete":{
console.log(type,key);

  let get=await fetch(`http://localhost:4700/api/${key}?id=${data.id}&page=${data.page}`,{method:"DELETE"});
  let conv=await get.json();
  if(!get.ok){throw new Error(conv||conv.msg||"error in delete")};
  return conv;

}

      };




    },onError:(err)=>{
    },onSuccess:(x)=>{
    console.log(x);
    
      if(type=="delete"){
        client.refetchQueries({queryKey:[type],predicate:(query)=>{console.log(query);query.queryKey.includes(x.page)
        }});
      }
    }})

  return query
}

export default  usePost;