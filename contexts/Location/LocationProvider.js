import React, { useState } from "react";
import { LocationContext } from "./LocationContext";

function LocationProvider({ children }) {
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
