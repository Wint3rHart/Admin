import { create } from "zustand";

const useSearch_zus=create((set,get)=>{


return {search:"None",set_search:(x)=>{set((state)=>{return {...state,search:x}})}}

});

export default useSearch_zus;