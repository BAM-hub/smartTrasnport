import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UsertProvider = (props) => {
  const [user, setUser] = useState({
    name: '',
    type: '',
    line: '',
    id: '',
    ride: ''
  });
  return(
    <UserContext.Provider value={[user, setUser]}>
        {props.children}
    </UserContext.Provider>
  );
}