import React, { createContext, useState } from 'react';

export const MarkersContext = createContext();

export const MarkersProvider = (props) => {
  const [markers, setMarkers] = useState([]);
  return (
    <MarkersContext.Provider value={[markers, setMarkers]}>
      {props.children}
    </MarkersContext.Provider>
  );
} 