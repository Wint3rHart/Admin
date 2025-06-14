import React from 'react';

const SearchComp = ({data}) => {
    console.log("comp rendered");
    
    return (
        <div className='bg-red-900/50 border-2 h-50 absolute top-10 w-50'>
            
{data?.map((x,i)=>{return <p className='text-white font-black text-xl'>{x}</p>})}

        </div>
    );
}

export default React.memo(SearchComp)