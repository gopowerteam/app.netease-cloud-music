import React, { Props } from "react";
import { useEffect, useState } from "react";
import { Provider as StoreProvider } from "reto";

export function Test2Store() {
  const [count, setCount] = useState(100);

  useEffect(() => {
    console.log("x is updated.");
  }, [count]);

  function increase() {
    setCount(count + 1);
  }

  return {
    count,
    increase
  };
}

export const Test2Provider = props => {
  return <StoreProvider of={Test2Store}>{props.children}</StoreProvider>;
};
