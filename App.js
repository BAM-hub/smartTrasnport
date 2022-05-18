import React from 'react';
import { SocketContext, socket } from './context/socket';
import ScreenProvider from './screens/ScreenProvider';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <ScreenProvider />
    </SocketContext.Provider>
  );
};


export default App;