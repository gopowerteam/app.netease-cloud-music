import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section`
    width: 20%;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
  `,
  ImgContainer: styled.div``,
  NameContainer: styled.div``
};

interface MVItemProps {
  data: {
    id: number;
    picUrl: string;
    name: string;
  };
}

interface MVItemState {}

export default class MVItem extends Component<
  MVItemProps,
  MVItemState
> {
  public render() {
    return <components.Wrapper></components.Wrapper>;
  }
}
