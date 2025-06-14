import { DevTool } from '@hookform/devtools';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';
import usePost from './usePost'



const Schema = ({schema,type}) => {
console.log("schema rendered",schema,type);


  function xyz(x,parent){
    let field=typeof(parent)==="string"?`${parent}.${x.key}`:x.key;
    // console.log(x.key,parent);
    
   let i=0;
      // console.log(field);
        
            let Comp= components[x.type];
            let child=null;
// console.log(child);
if(!Comp){return null};

if(x.children&&x.type!="nestedList" ){child=x.children.map((child)=>{console.log(i);
;return xyz(child,x.type!="nestedList"?x.key:`${x.key}[${i}]`)}) };
if(x.type=="nestedList"){return <Comp children={x.children} val={field}  />}

       i++;     return  <Comp val={field} child={child||null}   />}
// let [search,setSearch]=useSearchParams();
// const status=search.get("schema")



  let {mutate,data,isPending,error}=usePost("insert",type);
let {register,handleSubmit,control,getValues,reset,setValue}=useForm({defaultValues:{}});
const fieldArrays = {};
schema?.forEach((x) => {
  if (x.type === "list") {
    fieldArrays[x.key] = useFieldArray({ name: x.key, control });
  }
});

useEffect(() => {

  schema?.forEach((x, j) => {
    if(x.type=="text"){
    setValue(x.key,"")}
    if (x.type === "list") {
      setValue(x.key,[""]);
    }
    if (x.type === "object") {
    
      x.children.forEach((q) => {
        setValue(`${x.key}.${q.key}`,"");
      });
    }
    if (x.type === "nestedList") {
     
      // console.log(products[x.key]);
      setValue(`${x.key}`,[Object.fromEntries(x.children.map((i,j)=>{if(i.type=="text"){

      ;return [i.key,""]} else if(i.type=="list"){
      ;return [i.key,[""]]}else if(i.type=="object"){setValue(i.key,)} else {return [i.key,""]} }))   ]
        //  x.children.map((i)=>{if(i.type=="text"){return [i.key,""]} else if(i.type=="list"){return [i.key,[""]]} })
    );
   
    }
  });console.log(getValues());
  
}, [schema]);




 let components=useMemo(()=>{
  return {text: ({ val }) => {
  
;return <div>
    <p className="text-black">{val}</p>
    <input
      className="border-2 border-black"
      type="text"
   {...register(val)}
    />
  </div>}
,image:({val})=>{;return <div><p>{val}</p><input type='text' {...register(val)}/> </div>},
 list:({val})=>{ 
 
let {fields,append}=useFieldArray({name:val,control})
console.log(val,fields);

return <div className='border-2 border-black'> <p>{val}</p>
 
 {fields.map((y,i)=>{console.log(val,getValues(val));
 ;return <input key={val+i} type='text' {...register(`${val}[${i}]`)} />})}<button type='button' onClick={()=>{append("")}}>Add More</button> </div>},
 object:({val,child})=>{ 
  // console.log("comp fnx re rendered");
    
    return <div><p>{val}</p>{child.map((a,i)=> {return a})}  </div>
  },
  nestedList:({val,children})=>{
    let {fields,append}=useFieldArray({name:val,control});
    console.log(children,val);
  ;return <div><p>{val}</p>{fields.map((a,i)=>{return   <div>{children.map((x)=>{return xyz(x,`${val}[${i}]`)})}</div>   }) }<button type='append' onClick={()=>{
    
  ;append(Object.fromEntries(children.map((i,j)=>{if(i.type=="text"){

      ;return [i.key,""]} else if(i.type=="list"){
      ;return [i.key,[""]]}else if(i.type=="object"){setValue(i.key,)} else {return [i.key,""]} })) )}}>add</button></div>
  }
 


}
},[schema]);



//    const memo2=useMemo(()=>{ 
//    return schema?.map( function xyz(x,parent){
//     let field=typeof(parent)==="string"?`${parent}.${x.key}`:x.key;
//     // console.log(x.key,parent);
    
//    let i=0;
//       // console.log(field);
        
//             let Comp= components[x.type];
//             let child=null;
// // console.log(child);
// if(!Comp){return null};

// if(x.children&&x.type!="nestedList" ){child=x.children.map((child)=>{console.log(i);
// ;return xyz(child,x.type!="nestedList"?x.key:`${x.key}[${i}]`)}) };
// if(x.type=="nestedList"){return <Comp children={x.children} val={field}  />}

//        i++;     return  <Comp val={field} child={child||null}   />})
//            },[schema,state])
   

   
    return (
        <div className=' bg-red-900/85 text-black   w-[500px]' >
            <form onSubmit={handleSubmit((data)=>{console.log(data);mutate(data)
            })}>
         {schema?.map((x)=>xyz(x))} <button type='submit'>Submit</button></form><DevTool control={control}/>
         {/* <button onClick={()=>{setState(x=>x=x+1)}}>CLICK</button> */}
        </div>
    );
}

export default React.memo(Schema);
