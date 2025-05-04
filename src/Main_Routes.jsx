import { useQuery } from "@tanstack/react-query";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route,Routes } from "react-router-dom";
import useData from "./useData";
import usePost from "./usePost";
import useSign from "./useSign";


const Main_Routes=()=>{
// let {name,email,id,status}=useSign((state)=>{return state.data});
let {setSign}=useSign(state=>state.fnx);

let get=useData("login");
let post=usePost("refresh");
//need to make a login api/fetch.then on its failure,will call the new access fetch.
    useEffect(() => {
        console.log("fetching access");
        if (get.isSuccess && get.data) {
            console.log(get.data);
            setSign(get.data.detail)
        }
        if (get.isError) {
            console.log(get.error, "sending refresh request");
            ; post.mutate();
        };


    }, [get.data, get.isError, get.isSuccess]);

    useEffect(() => {
        let obs = useSign.subscribe((state) => { return state.data }, (x) => {
            console.log(x);
        }); return () => obs()
    }, [])

    useEffect(() => {
        if (post.isSuccess && post.data) {
            console.log("send login again");
            ; get.refetch()
        } else if (post.isError) {
            console.log(post.error);
        }
    }, [post.data, post.isSuccess, post.isError])




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