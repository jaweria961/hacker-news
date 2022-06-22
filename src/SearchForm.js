import React, {useState} from 'react'
import { useGlobalContext } from './context'

const SearchForm = () => {


  const{ query,handlesearch}  = useGlobalContext()
  

return (
    <>
    <form className="search-form " onClick={(e)=>e.preventDefault()}>

      
      <input 
      type='text'
      value={query}
      className='form-input mb-3'
      placeholder='search the news'
      onChange={(e) => handlesearch(e.target.value)}
      />



    </form>
    
    
    
    
    </>


  );
}

export default SearchForm
