import React from 'react';
import { DATAProvider } from './context/DATAContext';
import { LocationProvider } from './context/LocationContext';
import { MarkersProvider } from './context/MarkersContext';
import { SocketContext, socket } from './context/socket';
import { UsertProvider } from './context/UserContext';
import ScreenProvider from './screens/ScreenProvider';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <UsertProvider>
        <MarkersProvider>
          <LocationProvider>
            <DATAProvider>
              <ScreenProvider />
            </DATAProvider>
          </LocationProvider>
        </MarkersProvider>
      </UsertProvider>
    </SocketContext.Provider>
  );
};


export default App;