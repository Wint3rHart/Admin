import { useQuery } from "@tanstack/react-query";
import React, { Suspense, createContext, lazy, useEffect, useMemo, useState } from "react";
import { Route,Routes } from "react-router-dom";
import useData from "./useData";
import usePost from "./usePost";
import useSign from "./useSign";
import RegistrationComp from "./RegistrationComp";

 const Sign=lazy(()=>{return import("./Sign")});
const Home=lazy(()=>{return import("./Home")});
const Web=lazy(()=>{return import("./Web")});

const Main_Routes=()=>{
 
    console.log("main rendered");
    


const memo=useMemo(()=>{console.log("rendering web");
;return <Suspense fallback={<p className="font-black text-4xl text-black">Loading </p>}>


<Routes>


<Route path="/sign" element={<Sign />} />
<Route path="/" element={<Home/>}/>

<Route path="/web/:type" element={<Web/>} ></Route>
</Routes>




</Suspense>

  },[])

   
return(


<div>
<RegistrationComp/>
{memo}

</div>)


}
export default Main_Routes