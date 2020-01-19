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

  const [params, _updateParams] = useState();

  function updateLocation(value) {
    _updateLocation(value);
  }

  function updateHistory(value) {
    _updateHistory(value);
  }
  function updateParams(value) {
    _updateParams(value);
  }

  return {
    location,
    history,
    params,
    updateLocation,
    updateHistory,
    updateParams
  };
}

export const RouterProvider = props => {
  return <StoreProvider of={RouterStore}>{props.children}</StoreProvider>;
};
