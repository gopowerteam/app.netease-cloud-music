import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { ReactComponent as PlaySvg } from "../../assets/icons/play.svg";

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

    .item-play-count {
      position: absolute;
      top: 5px;
      right: 20px;
      font-size: 12px;
      color: #fff;
      fill: #fff;
      i {
        margin-right: 3px;
      }
    }
  `,
  NameContainer: styled.div`
    .name {
      margin-top: 5px;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .artist {
      color: #7f7f7f;
    }
    &:hover {
      font-weight: 500;
    }
  `
};

interface MVItemProps {
  data: {
    id: number;
    picUrl: string;
    playCount: string;
    name: string;
    artistName: string;
  };
}

interface MVItemState {}

export default class MVItem extends Component<MVItemProps, MVItemState> {
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
        <img alt="" src={data.picUrl}></img>

        <div className="item-play-count">
          <Icon component={PlaySvg as any}></Icon>
          <span>{this.convertPlayCount(data.playCount)}</span>
        </div>
      </components.ImgContainer>
    );
  }

  public getNameContainer() {
    const { data } = this.props;

    return (
      <components.NameContainer>
        <div className="name">{data.name}</div>
        <div className="artist">{data.artistName}</div>
      </components.NameContainer>
    );
  }

  /**
   * 转换播放数
   * @param count
   */
  private convertPlayCount(count) {
    if (count > 10000) {
      return `${Math.floor(count / 10000)}万`;
    } else {
      return count;
    }
  }
}
