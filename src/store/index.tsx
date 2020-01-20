import React from "react";

import { RouterProvider } from "./router.store";
import { MenuProvider } from "./menu.store";
import { AuthStoreProvider } from "./auth.store";
const providers: any[] = [RouterProvider, MenuProvider, AuthStoreProvider];

const ProvidersComposer = props =>
  props.providers.reduceRight(
    (children, Parent) => <Parent>{children}</Parent>,
    props.children
  );

export const Provider = props => {
  return (
    <ProvidersComposer providers={providers}>
      {props.children}
    </ProvidersComposer>
  );
};
