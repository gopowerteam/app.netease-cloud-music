import styled from "styled-components";
import React, { Component } from "react";
import { Icon } from "antd";
import { ReactComponent as PlaySvg } from "../../assets/icons/play.svg";
import { Consumer } from "reto";
import { RouterStore } from "~/store/router.store";

const components = {
  Wrapper: styled.section`
    width: 20%;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
  `,
  ImgContainer: styled.div`
    position: relative;

    &:hover {
      .item-play-icon {
        display: flex;
      }
    }

    img {
      width: 100%;
      border-radius: 10px;
    }

    .item-play-count {
      position: absolute;
      top: 5px;
      right: 5px;
      font-size: 12px;
      color: #fff;
      fill: #fff;
      i {
        margin-right: 3px;
      }
    }

    .item-play-icon {
      display: none;
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 30px;
      height: 30px;
      border-radius: 30px;
      background-color: rgba(255, 255, 255, 0.4);

      justify-content: center;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
        fill: red;
      }
    }
  `,
  NameContainer: styled.div``
};

interface SongListItemProps {
  data: {
    id: number;
    picUrl: string;
    name: string;
    playCount: number;
  };
}

interface SongListItemState {}

/**
 * 歌单项组件
 */
export default class SongListItem extends Component<
  SongListItemProps,
  SongListItemState
> {
  public render() {
    const { data } = this.props;

    return (
      <Consumer of={RouterStore}>
        {routerStore => (
          <components.Wrapper
            onClick={() => this.openSongListDetail(routerStore, data.id)}
          >
            {this.getImgContainer()}
            {this.getNameContainer()}
          </components.Wrapper>
        )}
      </Consumer>
    );
  }

  /**
   * 获取图片容器
   */
  public getImgContainer() {
    const { data } = this.props;

    return (
      <components.ImgContainer>
        <img alt="" src={data.picUrl}></img>
        <div className="item-play-count">
          <Icon component={PlaySvg as any}></Icon>
          <span>{this.convertPlayCount(data.playCount)}</span>
        </div>
        <div className="item-play-icon">
          <Icon type="caret-right" />
        </div>
      </components.ImgContainer>
    );
  }

  /**
   * 获取名称容器
   */
  public getNameContainer() {
    const { data } = this.props;
    return <components.NameContainer>{data.name}</components.NameContainer>;
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

  private openSongListDetail(routerStore, id) {
    routerStore.history.push(`/detail/song-list/${id}`);
  }
}
