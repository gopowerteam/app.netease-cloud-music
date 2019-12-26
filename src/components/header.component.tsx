import React, { Component } from "react";
import styled from "styled-components";

// styled 作为组件，名称必须大写开头
const StyledHeader = styled.section`
  background-color: #000;
  width: 100%;
  height: 100%;
  color: white;
  line-height: 50px;
  font-size: 28px;
  text-indent: 2em;
`;

export default class Header extends Component {
  public render() {
    return <StyledHeader>网易云音乐！！</StyledHeader>;
  }
}
