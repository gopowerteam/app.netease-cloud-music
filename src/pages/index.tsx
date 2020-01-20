import React, { Component } from "react";

// 使用通过hooks创建通过component访问的store
export default class Index extends Component {
  public getStore() {
    return <div></div>;
  }
  public render() {
    return <div></div>;
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
