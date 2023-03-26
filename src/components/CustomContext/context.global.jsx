import React, { useEffect, createContext, useContext, useReducer, useMemo } from 'react';

const ACTIONS = {
  SET_STATE: 'SET_STATE',
  SET_LOADING: 'SET_LOADING',
};

// should have different state (system state (cannot be removed), custom state)
const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const GlobalContext = createContext(initialState);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const reducer = (prevState, action) => {
  const newState = { ...prevState };

  switch (action.type) {
    case ACTIONS.SET_STATE:
      return { ...newState, ...action.payload };
    case ACTIONS.SET_LOADING:
      return { ...newState, loading: action.payload };
    default:
      return newState;
  }
};

export const GlobalProvider = (props) => {
  const { children, ...restProps } = props;
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...restProps });

  const methods = useMemo(
    () => ({
      // should have something like setAllState (replace all), setPartialState (replace mentioned property)
      setState: (newState = {}) => {
        return dispatch({ type: ACTIONS.SET_STATE, payload: newState });
      },
      setLoading: (loading) => {
        return dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
      },
    }),
    []
  );

  return <GlobalContext.Provider value={[state, methods]}>{children}</GlobalContext.Provider>;
};
