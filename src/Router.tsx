import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages";

export default class Router extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Index></Index>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
