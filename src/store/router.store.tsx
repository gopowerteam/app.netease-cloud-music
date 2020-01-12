import React from "react";
import { useState } from "react";
import { Provider as StoreProvider } from "reto";

export function RouterStore() {
  const { hash, search, pathname } = window.location;

  const [location, _updateLocation] = useState({
    hash,
    search,
    pathname
  });

  const [history, _updateHistory] = useState();

  function updateLocation(value) {
    _updateLocation(value);
  }

  function updateHistory(value) {
    _updateHistory(value);
  }

  return {
    location,
    history,
    updateLocation,
    updateHistory
  };
}

export const RouterProvider = props => {
  return <StoreProvider of={RouterStore}>{props.children}</StoreProvider>;
};
