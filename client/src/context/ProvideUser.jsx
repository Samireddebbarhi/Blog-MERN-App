import { createContext, useState, useContext } from "react";
import React from "react";
const UserContext = createContext();

export function ProvideUser({ children }) {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
