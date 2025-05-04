import { data } from "react-router-dom";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useSign=create(subscribeWithSelector((set,get)=>{

return {
data:{name:"",email:"",id:"",status:false},fnx:{setSign:(x)=>{set((val)=>{return {...val,data:{...val.data,name:x.name,email:x.email,id:x.id,status:true}}})}}

}


}));
export default useSign