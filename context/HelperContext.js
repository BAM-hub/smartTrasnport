import React, { createContext, useState } from 'react';

export const HelperContext = createContext();

export const HelperProvider = (props) => {
  const [helper, setHelper] = useState({
    state: false,
    index: 0,
    scrollHelper: false
  });
  return (
    <HelperContext.Provider value={[helper, setHelper]}>
      {props.children}
    </HelperContext.Provider>
  );
} 