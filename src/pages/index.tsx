import React, { Component, useState } from "react";
import { Consumer } from "reto";
import { Test2Store } from "../store/test2";
import StoreTable from "antd/lib/table/Table";

export default class Index extends Component {
  public getStore() {
    return (
      <Consumer of={Test2Store}>
        {store => (
          <>
            <div>{store.count}</div>
            <button
              onClick={() => {
                store.increase();
              }}
            >
              123
            </button>
          </>
        )}
      </Consumer>
    );
  }
  public render() {
    return (
      <div>
        <div>测试store</div>
        {this.getStore()}
      </div>
    );
  }
}
