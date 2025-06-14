import React, { useEffect } from 'react';
import useData from "./useData";
import usePost from "./usePost";
import useSign from "./useSign";

const RegistrationComp = () => {

let {setSign}=useSign(state=>state.fnx);
let get=useData("login");
let post=usePost("refresh");

 useEffect(() => {
        
        
        console.log("fetching access");
        if (get.isSuccess && get.data) {
            // console.log("success");
        
            // console.log(get.data);
            setSign(get.data.detail)
        }
        if (get.isError) {
            // console.log(get.error, "sending refresh request");
            ; post.mutate();
        };


    }, [get.data, get.isError, get.isSuccess]);

    useEffect(() => {
        let obs = useSign.subscribe((state) => { return state.data }, (x) => {
            // console.log(x);
        }); return () => obs()
    }, [])

    useEffect(() => {
        if (post.isSuccess && post.data) {
            console.log("send login again");
            ; get.refetch()
        } else if (post.isError) {
            // console.log(post.error);
        }
    }, [post.data, post.isSuccess, post.isError])


    return (
        <div>
            
        </div>
    );
}

export default RegistrationComp;
