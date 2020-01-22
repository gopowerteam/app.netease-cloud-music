import React from "react";
import { PlayListService } from "~/services/playlist.service";
import { RequestParams } from "~/core/http";
import styled from "styled-components";
import { Icon } from "antd";
import { tenThoursand } from "~/shared/utils/common";

type DetailState = {
  playDataSet: any[];
  pageIndex: number;
};

const components = {
  Wrapper: styled.div`
    margin: 20px 0;
    justify-content: space-between;
  `,
  Block: styled.div`
    position: relative;
    width: 180px;
    margin: 10px 0;

    &:hover {
      cursor: pointer;
    }

    .img {
      height: 180px;
    }
    .play-count {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 20px;
      line-height: 20px;
      text-align: right;
      padding-right: 5px;
      color: white;
      font-size: 11px;
      background-image: linear-gradient(90deg, #66666621 25%, #666666de 80%);
    }
    .creater {
      position: absolute;
      top: 155px;
      left: 0;
      width: 180px;
      color: #fff;
      font-size: 11px;
      height: 25px;
      line-height: 20px;
      padding: 5px;
      background-image: linear-gradient(0, #00000085, #00000000);
    }
    .play-list-name {
    }
  `
};

export default class PlayListDetail extends React.Component<
  { tag: string },
  DetailState
> {
  constructor(props) {
    super(props);

    this.state = {
      playDataSet: [],
      pageIndex: 0
    };
  }

  private playlistService = new PlayListService();

  public componentDidMount() {
    this.queryPlayList();
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.tag !== this.props.tag) {
      this.queryPlayList();
    }
  }

  public render() {
    if (!this.props.tag) return <components.Wrapper></components.Wrapper>;

    return (
      <components.Wrapper className="flex-row">
        {this.state.playDataSet.map((item, index) => (
          <Block
            key={index}
            pic={item.coverImgUrl}
            name={item.name}
            playCount={item.playCount}
            nickName={item.creator.nickname}
          ></Block>
        ))}
      </components.Wrapper>
    );
  }

  private queryPlayList() {
    this.playlistService
      .getPlayListByTag(
        new RequestParams({
          cat: this.props.tag,
          order: "hot",
          limit: 10
        })
      )
      .subscribe(data => {
        this.setState({ playDataSet: data.playlists });
      });
  }
}

type BlockProp = {
  pic: string;
  name: string;
  nickName: string;
  playCount: number;
};

class Block extends React.Component<BlockProp> {
  public render() {
    return (
      <components.Block>
        <img src={this.props.pic} className="img" />
        <div className="play-count">
          <Icon type="customer-service" />
          {tenThoursand(this.props.playCount)}
        </div>
        <div className="creater">
          <Icon type="user" />
          {this.props.nickName}
        </div>
        <div className="play-list-name">{this.props.name}</div>
      </components.Block>
    );
  }
}
