import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [location, setLocation] = useState({
    coords: { latitude: 0, longitude: 0 },
  });

  return (
    <AuthContext.Provider value={{ location, setLocation }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
