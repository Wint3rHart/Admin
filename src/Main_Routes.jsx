import React, { Suspense, lazy } from "react";
import { Route,Routes } from "react-router-dom";


const Main_Routes=()=>{


    const Sign=lazy(()=>{return import("./Sign")});
const Default=lazy(()=>{return import("./App")});
return(


<div>

<Suspense fallback={<p className="font-black text-4xl text-black">Loading </p>}>


<Routes>


<Route path="/sign" element={<Sign />} />

</Routes>




</Suspense>



</div>)


}
export default Main_Routes