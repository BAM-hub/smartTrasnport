import React, { createContext, useState } from 'react';

export const DATAContext = createContext();


export const DATAProvider = (props) =>{
    const [DATA, setDATA] = useState([
        {
          name: 'Ali',
          line: 'Amman As-Salt',
          distance: 'Calculating',
          time: 'Calculating',
          coords: {
            latitude: 31.966882,
            longitude: 35.988638
          }
        },
        {
          name: 'Ali',
          line: 'Amman As-Salt',
          distance: 'Calculating',
          time: 'Calculating',
          coords: {
            latitude: 31.963817,
            longitude: 35.975449
          }
        },
      ]);

    return (
        <DATAContext.Provider value={[DATA, setDATA]}>
            {props.children}
        </DATAContext.Provider>
    );
}
