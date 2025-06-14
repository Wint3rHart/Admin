import React, { useMemo } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import Schema from './Schema';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useInfiniteQuery } from '@tanstack/react-query';
import usePost from './usePost';


const WithFnx = ({data:{products,schema,edit_fnx,type,ind} }) => {
console.log("with Rendered");

//     const default_values_fnx=(x,y,z,type)=>{
        
        
// if(type=="text"){setValue(y,Object.entries(x)[0][1])}
// else if(type=="list"){ 
//     console.log(Object.entries(x));
//   }
//     }

    let [search,setSearch]=useSearchParams();
    let nav=useNavigate();
const {register,handleSubmit,control,setValue,getValues,reset}=useForm();
let {mutate,isPending,isSuccess}=usePost("delete",type)//id to be added to delete

    const compMap = useMemo(() => {
    
        return {



            //here the props are recieved that were passed below,and then used.both steps are important
            text: ({ value, style, child, j, field }) => {
                // console.log(field, );

search.get("i")==j&& setValue(field,Object.entries(value)[0][1]);
// default_values_fnx(value,field,"","text")
                ; return <div style={style ? style : undefined} className='text-left' >{Object.entries(value).map(x => { return <div>{search.get("i") != j ? <div> <span className='font-black text-xl text-red-600'>{x[0]}</span><span>{`${x[1]}`}</span></div> : <div><span className='font-black text-xl text-red-600'>{x[0]}</span> <input className='text-white border-1' {...register(field)} /></div>}  </div> })}<span>{child}</span> </div>
            },
            list: ({ value, style, j,field }) => {
                //  console.log(field,value);
                 
   ;search.get("i")==j&&setValue(field,Object.entries(value)[0][1])
            
                   return <div className=''><span className='font-black text-xl text-red-600'>{Object.entries(value)[0][0]} : </span> {Object.entries(value)[0][1].map((x,i) => {
                
                 return <div>{search.get("i")==j? <   input  className='text-white border-1'{...register(`${field}[${i}]`)}  />:<span className='text-white'>{x}</span>}</div>
                })}</div>;
             
                
            },
            image: ({ value, style, j, child, field }) => {
       search.get("i")==j&&    setValue(field,Object.entries(value)[0][1])
                ; return <div><img style={style ? style : undefined} src={value[Object.keys(value)[0]]} alt="Image not loaded" />{search.get("i") == j && <div className='font-black text-xl text-red-600 mt-2'>Image Url<input {...register(field)} type='text' className='border-2 border-white  ml-5' /> </div>}</div>
            },
            object: ({ value, style, child, i }) => {
                // console.log(child);

                ; let elem = Object.entries(value).flat(); return <div><p className='font-black text-2xl text-red-200'>{elem[0]}</p><ul>{child.map((x) => { return x })}</ul> </div>
            },
            nestedList: ({ value, style, child, i }) => {
                // console.log(i);

                ; let elem = Object.entries(value).flat(); return <div><p>{elem[0]}</p> <div style={style || null}>{child.map((x) => { return x })}</div> </div>
            }
            // value={images:{image:"",blur:""}}=[[images,{a-b,c-d,e-f}]]=[[]]
        }
    },[search]
    ) 




// console.log(products);
function ifArray(arr,sch,j,parent){
// console.log(arr,sch);

 ;return arr.map((x,k)=>{return render(x,sch,j,`${parent}[${k}]`)}) }
    function render(a,b,i,parent){
// console.log(a,b);

        return b?.map((p)=>{
    //    console.log(parent);
       const field=parent?`${parent}.${p.key}`:p.key;
       
        // console.log(field);
        
            let Component=compMap[p.type];
            
            if(!Component){return null};
            
            let value=a?.[p.key];
            //[{},{}]//{a:""}
            
            let child=null;
         
            
        if(p.children){if(Array.isArray( value)){
        ;child=ifArray(value,p.children,i,p.key)} else{ child= render(value,p.children,i,p.key)} };
        // console.log(i,value,field);
        
        let prop={value:{[p.key]:value},style:{...p.style},child:child,j:i,field:field};

        // child&&console.log(child);
        
        return <Component {...prop} >{child&&child}</Component>
        })
        
        
        
            }

    
    
 return <div className=' ml-50'><form onSubmit={handleSubmit((data)=>{ ;edit_fnx({key:search.get("id"),data})
 })}>  { products?.map((x,i)=>{
 
   return <div className='mt-10' >{search.get("i")!=i?<div><p className='text-white font-black'>{ind}</p><button type='button' className='bg-red-200' onClick={(e)=>{console.log(e.target,"ll");setSearch({schema:"edit",id:x._id,i:i})
   }}>Edit</button> <button className='bg-red-200 border-4' type='button'  onClick={(e)=>{
   
    mutate({id:x._id,page:e.target.parentElement.firstElementChild.innerText})

   }}>Delete</button></div>:<div><button className='bg-red-200' type='submit'>Submit</button><button className='bg-red-200' type='button' onClick={()=>{nav(`/web/${type}?schema=false`)}}>Back</button> </div>}<div className='mt-5'>{render(x,schema,i)}</div></div> })
}
</form> <DevTool control={control}/>
</div>

};


export default React.memo(WithFnx);
