import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import usePost from './usePost';
import useData from './useData';
import SearchComp from './Search_Comp';
import useSearch_zus from './useSearch_zus';



const Nav = () => {
    let nav=useNavigate();
    // const [search,setSearch]=useState("None");
  let set_search=useSearch_zus(state=>{return state.set_search});

    
// useEffect(()=>{mutate()},[search])
    return (
        <div className='border-2 border-red-800  text-white'>
           <ul className='flex justify-evenly items-center mt-2 text-2xl font-black'>
            <li onClick={()=>{nav("/")}}>Home</li>
            <li onClick={()=>{nav("/sign")}}>Sign In</li>
            <li></li>
          <div> 
            <select 
  className="text-white text-sm bg-red-800/25 w-40"
  onChange={(e)=>{set_search(e.target.value)}}
>
    <option value="None">None</option>
  <option value="Hospitality">Hospitality</option>
  <option value="Food and Drinks">Food and Drinks</option>
  <option value="Entertainment">Entertainment</option>
</select>

                
               {/* {data||error&& <SearchComp data={data}/>} */}
                </div> 
            </ul> 
        </div>
    );
}

export default Nav;
