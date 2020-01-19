import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section``
};

interface CollectorListProps {
  id: string;
}

interface CollectorListState {}

export default class CollectorList extends Component<
  CollectorListProps,
  CollectorListState
> {
  public render() {
    return <components.Wrapper></components.Wrapper>;
  }
}
