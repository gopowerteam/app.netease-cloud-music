import React, { Props } from "react";
import { useEffect, useState } from "react";
import { Provider as StoreProvider } from "reto";

export function Test1Store() {
  const [count, setCount] = useState(1);

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

export const Test1Provider = props => {
  return <StoreProvider of={Test1Store}>{props.children}</StoreProvider>;
};
