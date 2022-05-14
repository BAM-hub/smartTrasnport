import React, { useEffect, useState } from 'react';
import Map from '../components/Map';




const MapScreen = ({ location, user, markers }) => {

  // useEffect(() => {
  //   const socket = io(SOCKET_URL, {
  //     transports: ["websocket"]
  //   });
  //   socket.connect();
  //   // console.log(socket);
  //   socket.on("connect", ()  => {
  //     console.log('connected!');
  //     // socket.emit("my_event", { data: "do u hear me" });
  //   });
  //   socket?.emit('user_live',
  //    {...user, cords: location}
  //   );
  //   socket?.on('initial-coords', markerCords => {
  //     console.log('markers: ', markerCords);
  //       if(markers.length !== 0)
  //         return;
  //       setMarkers(markerCords);
  //   });
  //   console.log(socket.connected);
  //   console.log(markers);
  //   return () => {
  //     socket?.off('connection');
  //     socket?.off('join');
  //     socket.close();
  //   }
  // });


  return (
      <>
        <Map 
          location={location}
          user={user}
          markers={markers}
        />
      </>
  );
};

  

export default MapScreen;