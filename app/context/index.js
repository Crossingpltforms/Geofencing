import React,{useReducer} from 'react'
import {reducer,initalState} from '../reducer/reducer'

export const EdoutContext = React.createContext()

export const ContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initalState)
    return(
       	<EdoutContext.Provider value={{state,dispatch}}>
        	{children}
    	</EdoutContext.Provider> 
    ) 
}