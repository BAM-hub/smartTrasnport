import React, { createContext, useState } from 'react';

export const DATAContext = createContext();


export const DATAProvider = (props) =>{
    const [DATA, setDATA] = useState([]);

    return (
        <DATAContext.Provider value={[DATA, setDATA]}>
            {props.children}
        </DATAContext.Provider>
    );
}
