

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';

const UsePagination = (type) => {
// console.log(ind);

    const query = useInfiniteQuery({ queryKey: [`${type }`], 
        queryFn: async ({ pageParam = parseInt(ind),queryKey}) => { 
            console.log(queryKey);
            
            let get = await fetch(`http://localhost:4700/api/${type}?page=${pageParam}`); 
    let conv = await get.json(); 
    if (!get.ok) { throw new Error(conv.msg || conv || `error in ${type} pagination`) };
     return conv },
      getNextPageParam: (lastPage,pages) => { 
      ;if(lastPage?.nextPage>0&&lastPage.nextPage<=Math.ceil(lastPage.number.count/2)){console.log(lastPage.nextPage);
      
      ;return lastPage.nextPage};return undefined},initialPageParam:1,refetchOnWindowFocus:false,staleTime:9000 });
      return query
}

export default UsePagination;
