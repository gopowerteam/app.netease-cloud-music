import React, { Component, useState, FunctionComponent, SFC } from "react";

interface Props {
  test?: number;
}

export default class Index extends React.Component<Props, {}> {
  static defaultProps = {
    test: 1
  };

  public render() {
    return <>{this.props.test}</>;
  }
}
