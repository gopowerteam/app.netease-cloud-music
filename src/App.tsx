import React, { Component } from "react";
import { DefaultLayout } from "./layout/default.layout";
import { Provider } from "./store";
export default class App extends Component {
  public render() {
    return (
      <div className="app">
        <Provider>
          <DefaultLayout></DefaultLayout>
        </Provider>
      </div>
    );
  }
}
