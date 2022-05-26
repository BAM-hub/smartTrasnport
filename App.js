import React from 'react';
import { DATAProvider } from './context/DATAContext';
import { LocationProvider } from './context/LocationContext';
import { MarkersProvider } from './context/MarkersContext';
import { SocketContext, socket } from './context/socket';
import { UsertProvider } from './context/UserContext';
import { HelperProvider } from './context/HelperContext';
import ScreenProvider from './screens/ScreenProvider';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <HelperProvider>
      <UsertProvider>
        <MarkersProvider>
          <LocationProvider>
            <DATAProvider>
              <ScreenProvider />
            </DATAProvider>
          </LocationProvider>
        </MarkersProvider>
      </UsertProvider>
      </HelperProvider>
    </SocketContext.Provider>
  );
};


export default App;