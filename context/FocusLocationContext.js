import React, { createContext, useState } from 'react';

export const FocusLocationContext = createContext();

export const FocusLocationProvider = (props) => {
    const [focucsLocation, setFocusLocation] = useState({
      latitude: 31.966882, longitude: 35.988638 
    });
  return (
    <FocusLocationContext.Provider value={[focucsLocation, setFocusLocation]}>
        {props.children}
    </FocusLocationContext.Provider>
  );
}