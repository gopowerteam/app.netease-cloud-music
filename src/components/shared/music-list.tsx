import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section``
};

interface MusicListProps {
  id: string;
}

interface MusicListState {}

export default class MusicList extends Component<
  MusicListProps,
  MusicListState
> {
  public render() {
    return <components.Wrapper></components.Wrapper>;
  }
}
