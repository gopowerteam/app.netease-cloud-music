import React from "react";
import { useEffect, useState } from "react";
import { Provider as StoreProvider } from "reto";

export function UserStore() {
  const [userName, setUserName] = useState({ userName: "" });

  useEffect(() => {}, [userName]);

  function updateUserName(name) {
    setUserName(name);
  }

  return {
    userName,
    updateUserName
  };
}

export const UserStoreProvider = props => {
  return <StoreProvider of={UserStore}>{props.children}</StoreProvider>;
};
