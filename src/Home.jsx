import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useData from './useData';
import useSearch_zus from './useSearch_zus';
import { motion } from 'framer-motion';
const Home = () => {
   
    
let nav=useNavigate();
let search=useSearch_zus(x=>x.search);
console.log(search);

    let {data,isPending,isLoading,error}=useData(search!="None"?"search":"all",search&&search!="None"&&search);

useEffect(()=>{ console.log(search);
 data&&console.log(data);
},[data,search]);

    return (
        <div  className='text-4xl font-black text-white bg-black h-full w-full  '>
           
<div initial={{x:-100,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:5,staggerChildren:0.5}}className='flex flex-col justify-center items-center mt-50 font-semibold text-red-600 '>

    {data?.names.map((x)=>{return <p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} className='text-white ' onClick={()=>{nav(x.url)}}>{x.name}</p>})}
</div>
           
        </div>
    );
}

export default Home;
