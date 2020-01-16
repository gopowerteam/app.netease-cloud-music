import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section`
    width: 25%;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
  `,
  ImgContainer: styled.div`
    img {
      width: 100%;
      border-radius: 10px;
    }
  `,
  NameContainer: styled.div`
    margin-top: 5px;
    height: 3em;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre-wrap;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    &:hover {
      font-weight: 500;
    }
  `
};

interface PrivateContentItemProps {
  data: {
    id: number;
    sPicUrl: string;
    name: string;
  };
}

interface PrivateContentItemState {}

export default class PrivateContentItem extends Component<
  PrivateContentItemProps,
  PrivateContentItemState
> {
  public render() {
    return (
      <components.Wrapper>
        {this.getImgContainer()}
        {this.getNameContainer()}
      </components.Wrapper>
    );
  }

  public getImgContainer() {
    const { data } = this.props;

    return (
      <components.ImgContainer>
        <img alt="" src={data.sPicUrl}></img>
      </components.ImgContainer>
    );
  }

  public getNameContainer() {
    const { data } = this.props;

    return <components.NameContainer>{data.name}</components.NameContainer>;
  }
}
