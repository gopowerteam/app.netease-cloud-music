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

  const [historyBackCount, _updateHistoryBackCount] = useState(0);
  const [historyForwardCount, _updateHistoryForwardCount] = useState(0);

  function updateLocation(value) {
    _updateLocation(value);
  }

  function updateHistory(value) {
    _updateHistory(value);
    value.listen((location, action) => {
      if (action === "PUSH") {
        _updateHistoryBackCount(historyBackCount + 1);
        _updateHistoryForwardCount(0);
      } else {
        _updateHistoryBackCount(historyBackCount - 1);
        _updateHistoryForwardCount(historyForwardCount + 1);
      }
    });
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
    updateParams,
    historyBackCount,
    historyForwardCount
  };
}

export const RouterProvider = props => {
  return <StoreProvider of={RouterStore}>{props.children}</StoreProvider>;
};
