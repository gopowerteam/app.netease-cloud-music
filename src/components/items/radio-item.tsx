import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section`
    margin-bottom: 20px;
    height: 100px;
    width: 33.3%;
    overflow: hidden;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #f5f5f5;
    }

    img {
      height: 100%;
      border-radius: 10px;
    }
  `,
  ImgContainer: styled.div`
    line-height: 100px;
    position: relative;
  `,
  IndexContainer: styled.div`
    line-height: 100px;
    padding: 0 10px;
    color: #b7b7b7;
  `,
  InfoContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 10px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .radio {
      color: #aeaeae;
    }
  `
};
interface RadioItemProps {
  data: {
    id: number;
    picUrl: string;
    name: string;
    program: any;
  };
}

interface RadioItemState {}

export default class RadioItem extends Component<
  RadioItemProps,
  RadioItemState
> {
  public render() {
    return (
      <components.Wrapper>
        {this.getImgContainer()}
        {this.getInfoContainer()}
      </components.Wrapper>
    );
  }

  public getImgContainer() {
    const { data } = this.props;
    return <img alt="" src={data.picUrl}></img>;
  }

  public getInfoContainer() {
    const { data } = this.props;
    return (
      <components.InfoContainer>
        <div className="name">{data.name}</div>
        <div className="radio">{data.program.radio.name}</div>
      </components.InfoContainer>
    );
  }
}
