import React, { Props } from "react";

import { Test1Provider } from "./test1";
import { Test2Provider } from "./test2";
const providers: any[] = [Test1Provider, Test2Provider];

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
