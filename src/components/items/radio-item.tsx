import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section`
    width: 20%;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
  `
};

interface RadioItemProps {
  data: {
    id: number;
    picUrl: string;
    name: string;
  };
}

interface RadioItemState {}

export default class RadioItem extends Component<
  RadioItemProps,
  RadioItemState
> {
  public render() {
    return <components.Wrapper></components.Wrapper>;
  }
}
