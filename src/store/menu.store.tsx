import React from "react";
import { useEffect, useState } from "react";
import { Provider as StoreProvider } from "reto";

export function MenuStore() {
  const [menu, updateMenu] = useState({} as any);

  useEffect(() => {}, [menu]);

  function update(value) {
    updateMenu(value);
  }

  return {
    menu,
    update
  };
}

export const MenuProvider = props => {
  return <StoreProvider of={MenuStore}>{props.children}</StoreProvider>;
};
