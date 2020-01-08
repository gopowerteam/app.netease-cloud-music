import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Index from "./pages";

export default class Router extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect push to="/discover/recommend"></Redirect>
          </Route>
          <Route path="/discover/recommend" children={<Index />}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
