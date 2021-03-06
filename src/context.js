import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'
console.log(API_ENDPOINT);
const initialState = {
  isLoading: true,
  hits: [],
  query: '',
  page: 0,
  nbPages: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async (url) => {
    debugger;
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({
        
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handlesearch = (query) => {
    
    dispatch(
      {
        type:HANDLE_SEARCH,
       payload:query
      }
    )
    console.log(query);
  }
  const removeStory = (objectID) => {
    
    dispatch(
      {
        type:REMOVE_STORY,
       payload:objectID
      }
    )
 
  }
  const handlepage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }
 

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}page=${state.page}`)
  },[state.query,state.page])

  return (
    <AppContext.Provider
      value={{ ...state,handlesearch, removeStory, handlepage}}
    >
      {children}
     
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
