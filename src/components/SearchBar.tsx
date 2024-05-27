'use client'

import React, { useState } from "react";
import SearchOutlined  from "@ant-design/icons";
import { useRouter } from 'next/navigation'
    
const SearchBar = ({ search }: { search?: string }) => {
    const router = useRouter()
    const [texts,setTexts] = useState(search)
    

    return (
        <div className='relative rounded-md shadow-sm'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <SearchOutlined 
              className='text-xl black'
              aria-hidden='true'
            />
          </div>
          <input
            value={texts}
            placeholder='Search any food...'
            onChange={e => setTexts(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
          />
        </div>
      )
}
export default SearchBar