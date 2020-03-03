import React from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { tenThoursand } from "~/shared/utils/common";
import { Consumer } from "reto";
import { RouterStore } from "~/store/router.store";

type TopBlockProp = {
  name: string;
  id: string;
  playCount: number;
  coverImgUrl: string;
};

const components = {
  Wrapper: styled.div`
    position: relative;
    &:hover {
      cursor: pointer;
    }
  `,
  Content: styled.div`
    height: 150px;
    width: 150px;
    border: solid 1px #f2f2f2;
    background-size: cover;

    &:hover {
      .play {
        display: block;
      }
    }
    .title {
      position: absolute;
      width: 80px;
      top: 1px;
      right: 1px;
      height: 20px;
      line-height: 20px;
      text-align: right;
      padding-right: 5px;
      color: white;
      font-size: 11px;
      background-image: linear-gradient(90deg, #66666621 25%, #666666de 80%);
    }
    .play {
      position: absolute;
      bottom: 25px;
      right: 5px;
      display: none;
      font-size: 24px;
      color: #f2f2f2;
      &:hover {
        color: #000;
      }
    }
  `,
  Footer: styled.div`
    line-height: 20px;
    height: 20px;
    font-size: 12px;
  `
};

/**
 * 排行榜歌单 Block
 */
export default class TopBlock extends React.Component<TopBlockProp, any> {
  private get playCount() {
    return tenThoursand(this.props.playCount);
  }

  public render() {
    return (
      <Consumer of={RouterStore}>
        {routerStore => (
          <components.Wrapper
            onClick={() => {
              routerStore.history.push(`/detail/song-list/${this.props.id}`);
            }}
          >
            <components.Content
              style={{ backgroundImage: `url(${this.props.coverImgUrl})` }}
            >
              <div className="title">
                <Icon type="customer-service" style={{ marginRight: "10px" }} />
                {this.playCount}
              </div>
              <Icon className="play" type="play-circle" />
            </components.Content>
            <components.Footer>{this.props.name}</components.Footer>
          </components.Wrapper>
        )}
      </Consumer>
    );
  }
}
