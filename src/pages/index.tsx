import React, { Component, useState } from "react";
import { Consumer } from "reto";
import { Test2Store } from "../store/test2";
import StoreTable from "antd/lib/table/Table";

// 使用通过hooks创建通过component访问的store
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

// 使用基于hooks的store
// export default function() {
//   // 声明一个新的叫做 “count” 的 state 变量
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }
