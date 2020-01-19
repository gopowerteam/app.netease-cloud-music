import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RequestParams } from "~/core/http";
import { Icon } from "antd";
import { PlayListService } from "~/services/play-list.service";
import { dateFormat } from "~/utils/filter";
import { RankService } from "~/services/rank.service";

type TopListProp = {
  id: string;
  trackUpdateTime: number;
  coverImgUrl: string;
  ToplistType?: string;
};

type TopListState = {
  detail: any;
  artists: any;
  updateDate: number;
};

const components = {
  Wrapper: styled.div`
    width: 320px;
  `,
  Title: styled.div`
    height: 70px;
    justify-content: space-between;

    background-color: #6597e7;
    .title-bg {
      background-position: left center;
      background-size: cover;
      background-repeat: no-repeat;
      height: 100%;
      display: inline-block;
      width: 180px;
    }
    .update-date {
      font-size: 0.9em;
      color: #ffffffd1;
      align-self: flex-end;
      margin-left: -15px;
      margin-bottom: 5px;
    }
    .play {
      font-size: 32px;
      margin-right: 10px;
      color: #fffdfd;
      &:hover {
        color: gray;
        cursor: pointer;
      }
    }
  `,
  Body: styled.div`
    min-height: 270px;
  `,
  Footer: styled.div`
    text-align: right;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    background-color: #f8f8f8;
    .link {
      color: #b4b4b4;
      &:hover {
        color: gray;
      }
    }
  `,
  TrackItem: styled.div`
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    .index {
      color: gray;
      font-size: 1.3em;
      &-top {
        color: red;
      }
    }
    .t-name,
    .at-name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .red {
      color: red;
    }
    .blue {
      color: blue;
    }
  `,
  TrackStatus: styled.span`
    font-size: 0.9em;
    margin-left: 5px;
  `
};

export default class TopList extends React.Component<
  TopListProp,
  TopListState
> {
  constructor(props: TopListProp) {
    super(props);
    this.state = {
      detail: null,
      artists: null,
      updateDate: props.trackUpdateTime
    };
  }

  public componentDidMount() {
    if (this.props.ToplistType) {
      this.queryTrackList();
    } else {
      this.queryArtistList();
    }
  }

  public render() {
    return (
      <components.Wrapper>
        <RankTitle
          coverImgUrl={this.props.coverImgUrl}
          updateDate={this.state.updateDate}
          hiddenPlay={!this.props.ToplistType}
        ></RankTitle>
      </components.Wrapper>
    );
  }

  private queryTrackList() {
    new PlayListService()
      .getDetail(new RequestParams({ id: this.props.id }))
      .subscribe(data => {
        this.setState({
          detail: {
            tracks: data.playlist.tracks.slice(0, 9),
            trackIds: data.playlist.trackIds.slice(0, 9)
          },
          updateDate: data.playlist.updateTime
        });
      });
  }

  private queryArtistList() {
    new RankService().getTopArtists(new RequestParams()).subscribe(data => {
      this.setState({
        artists: data.list.artists.slice(0, 9),
        updateDate: data.updateTime
      });
    });
  }
}

class RankTitle extends React.Component<{
  coverImgUrl: string;
  updateDate: number;
  hiddenPlay?: boolean;
}> {
  private updateDateStr = "----";

  constructor(props) {
    super(props);
    this.updateDateStr = dateFormat(props.updateDate, "MM月dd日") + "更新";
  }

  public render() {
    return (
      <components.Title
        className="flex-row align-items-center"
        style={{
          backgroundImage: `url(${this.props.coverImgUrl})`
        }}
      >
        <div
          className="title-bg"
          style={{
            backgroundImage: `url(${this.props.coverImgUrl})`
          }}
        ></div>
        <div className="update-date">{this.updateDateStr}</div>

        {this.props.hiddenPlay ? (
          <span></span>
        ) : (
          <Icon className="play" type="play-circle" />
        )}
      </components.Title>
    );
  }
}

class TrackList extends React.Component<{ tracks: any[]; trackIds: any[] }> {
  constructor(props) {
    super(props);
  }

  public render() {
    return <components.Body></components.Body>;
  }
}

class ArtistsList extends React.Component<{ artists: any[] }> {
  constructor(props) {
    super(props);
  }

  public getIndexClassName(index: number) {
    let name = "index";
    if (index < 3) name += " index-top";
  }

  public render() {
    if (!this.props.artists.length) {
      return <NoData></NoData>;
    }

    return (
      <components.Body>
        {this.props.artists.map((item, index) => {
          let cssName = "";
          let status = "-";
          if (item.lastRank < index) {
            status = "↓";
            cssName = "blue";
          } else if (item.lastRank > index) {
            status = "↑";
            cssName = "red";
          }
          return (
            <components.TrackItem key={index}>
              <div className={getIndexClassName(index)}>{index + 1}</div>
              <div className={cssName}>{status}</div>
              <div>{item.name}</div>
            </components.TrackItem>
          );
        })}
      </components.Body>
    );
  }
}

function getIndexClassName(index: number) {
  let name = "index";
  if (index < 3) name += " index-top";
  return name;
}

function NoData() {
  return <components.Body>暂无数据</components.Body>;
}
