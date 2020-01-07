import React, { Props } from "react";
import { useEffect, useState } from "react";
import { Provider as StoreProvider } from "reto";

export function MenuStore() {
  const [menu, updateMenu] = useState(1);

  useEffect(() => {
    console.log("x is updated.");
  }, [menu]);

  function update() {
    updateMenu(menu);
  }

  return {
    menu,
    update
  };
}

export const MenuProvider = props => {
  return <StoreProvider of={MenuStore}>{props.children}</StoreProvider>;
};
