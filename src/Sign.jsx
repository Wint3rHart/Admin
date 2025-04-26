import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Sign=()=>{


let [reg,setReg]=useState(true);



useEffect(()=>{console.log(reg);},[reg])

let {register,handleSubmit,formState,control}=useForm({defaultValues:{name:'',email:'',password:'',pic:null},mode:"all"});

let {errors}=formState;

// const ref_callback=useCallback((x)=>{console.log("callback called"); },[register])
    
return(


<div>

  
<div className='flex justify-center items-center h-250  text-[#D3D3D3] p-6 ' >
      
      <section className="shadow-2xl rounded-2xl p-8 relative w-full bg-gray-900 max-w-md border border-[#A9A9A9] text-[#D3D3D3]">
      
      <h1 className='text-xl font-bold w-50 m-auto mb-10 text-center'>{"User SignUp"}</h1>
      <span className='text-gray-400 hover:pointer absolute top-0 hover:border-white hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-purple-700 inline-block mb-5 rounded-full p-3 top-5 ml-0 border-1 rounded-full' >Back</span>
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={()=>{setReg((x)=>{return false})}}
            className={`w-1/3 pb-4 font-medium text-center  cursor-pointer scale-98 hover:scale-99 hover:border-white capitalize border-b-2 transition`}
          >
            Sign In
          </button>
          <button
           onClick={()=>{setReg(x=>true)}}
            className={`w-1/3 pb-4 font-medium text-center cursor-pointer scale-99 hover:scale-98  capitalize border-b-2 hover:border-white transition`}
          >
            Sign Up
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} >
          <div className="relative">
            <input 
            {...register("name",{required:{message:"Cant be Empty"},validate:(data)=>{ data.length<6?false:true}})}
            
              type="text"
              placeholder="Username"
              className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"
              
            />
            <p className='text-white  font-black mt-4'></p>
          </div>

         
         {reg&&   <div>
              <label
                htmlFor="dropzone-file"
                className="flex items-center justify-center py-3 text-center bg-transparent border-2 border-dashed border-[#A9A9A9] rounded-lg cursor-pointer hover:border-[#D3D3D3]"
              >
                <h2 className="ml-3 text-[#A9A9A9]">Profile Photo</h2>
                <input id="dropzone-file" type="file" className="hidden" {...register("pic",{required:"Camt be Empty"})}  />
              </label>
              <p className='text-white  font-black mt-4'></p>
            </div>}
       

          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"

            />
            <p className='text-white  font-black mt-4'></p>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"
              

            /><p className='text-white  font-black mt-4'></p>
          </div>

          {reg&&
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-3 pl-4 pr-4 text-[#D3D3D3] bg-transparent border border-[#A9A9A9] rounded-lg shadow-sm focus:ring-2 focus:ring-[#A9A9A9] focus:outline-none placeholder-[#A9A9A9]"

             

              />
              <p className='text-white  font-black mt-4'></p>
            </div>}
        

        
         
          <div className='mt-1 flex justify-evenly'>
            <button type='submit'    className="group hover:shadow-[0_0px_7px_0px_rgba(70,10,174,1)] sm:w-64 w-40 border-1 border-[#A9A9A9] transition-color duration-300 relative bg-transparent text-[#A9A9A9] font-bold py-2 px-4 border hover:border-gray-100 hover:text-white rounded-full">
              Submit
            </button>
          </div>
          <p className='text-white'></p>
        </form>
       
      </section>
    </div>
  
  </div>      



    

)


}
export default Sign