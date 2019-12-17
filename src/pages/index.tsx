import React, { Component, useState, FunctionComponent, SFC } from "react";

// interface Props {
//   test?: number;
// }

// export default class Index extends React.Component<Props, {}> {
//   static defaultProps = {
//     test: 1
//   };

//   public render() {
//     return <>{this.props.test}</>;
//   }
// }

export default function() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
