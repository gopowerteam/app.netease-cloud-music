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

interface MusicItemProps {
  data: {
    id: number;
    picUrl: string;
    name: string;
  };
}

interface MusicItemState {}

export default class MusicItem extends Component<
  MusicItemProps,
  MusicItemState
> {
  public render() {
    return <components.Wrapper></components.Wrapper>;
  }
}
