import React, { Component } from "react";
import { Button } from "antd";
import { DefaultLayout } from "./layout/default.layout";

export default class App extends Component {
  public render() {
    return (
      <div className="app">
        <DefaultLayout></DefaultLayout>
      </div>
    );
  }
}
