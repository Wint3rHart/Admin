import React, { useMemo, useRef } from 'react';
import useData from './useData';
import { useEffect } from 'react';
import WithFnx from './withFnx';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import usePost from './usePost';
import Schema from './Schema';
import UsePagination from './usePagination';



const Web = () => {
// console.log("web rendered");
    console.log("web rendered");
   const [search,setSearch]=useSearchParams();
 let {type}=useParams();  
 let ref_no=useRef(1);
let first_load=useRef(true);


 
 let {data,isLoading,fetchNextPage,isSuccess,refetch}=UsePagination(type)
//  console.log(type);


 let post=usePost(search.get("schema"),type)
// data&&console.log(data.pages);
const mem=useMemo(()=>{return data?.pages.map((x,i)=>{return <WithFnx  data={{schema:x.schema,products:x.data,edit_fnx:post.mutate,type,ind:i}} />})  },[data])
let nav=useNavigate();
// useEffect(()=>{data&&console.log(data);
// },[data,isLoading]);

// useEffect(()=>{
// },[search])
// console.log(type);
if(!data||isLoading){return <div className='font-black  text-4xl text-white'><p>Loading</p></div>}
    return (<div>    
        <div className='flex flex-col justify-center items-center border-2 border-red-600'>
          <button className='border-2 border-red-900 bg-red-400/50' onClick={()=>{setSearch({schema:"insert"})}}>Add</button>
  {mem}
<button className='bg-red-600/50' onClick={()=>{
;fetchNextPage()}}>Next</button>


        </div > <div className=' top-5 absolute  left-[30%]'>{search.get("schema")=="insert"&&<Schema schema={data?.pages?.[0]?.schema} type={type}/>}</div> </div>
    );
}


export default Web;
