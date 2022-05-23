import React, {useState, createContext} from 'react';

export const LocationContext = createContext();


export const LocationProvider = (props) =>{

    const [location, setLocation] = useState({
        longitude: 0,
        latitude: 0
    });

    return (
        <LocationContext.Provider value={[location, setLocation]}>
            {props.children}
        </LocationContext.Provider>
    );
}
