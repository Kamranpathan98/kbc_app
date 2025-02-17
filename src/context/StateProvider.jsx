import React, { createContext, useContext, useReducer } from 'react';

// Create a context
const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Create a custom hook to use the StateContext
export const useStateValue = () => useContext(StateContext);