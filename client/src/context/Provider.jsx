import { createContext, useState } from "react";
import React from "react";

export const authentication = createContext(null);

function Provider(props) {
  const [auth, setAuth] = useState(false);

  const isAuth = () => {
    setAuth(!auth);
  };
  return (
    <div>
      <authentication.Provider value={{ auth: auth, logged: isAuth }}>
        {props.children}
      </authentication.Provider>
    </div>
  );
}

export default Provider;
