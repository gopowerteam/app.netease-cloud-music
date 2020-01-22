import React from "react";
import styled from "styled-components";
import { RequestParams } from "~/core/http";
import { Icon } from "antd";
import { PlayListService } from "~/services/playlist.service";
import { dateFormat } from "~/shared/utils/common";
import { RankService } from "~/services/rank.service";
import { Link } from "react-router-dom";

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
    height: 370px;
    border: solid 1px #f2f2f2;
  `,
  Title: styled.div`
    height: 100px;
    flex-basis: 100px;
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
    flex: 1;
    line-height: 30px;
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
    padding: 0 10px;
    .index {
      width: 10px;
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

    .t-name {
      flex: 1;
    }
    .at-name {
      width: 75px;
      text-align: right;
    }

    .status {
      width: 30px;
      text-align: center;
      &.red {
        color: red;
      }
      &.blue {
        color: blue;
      }
      &.small {
        font-size: 0.8em;
      }
      &.green {
        font-size: 0.8em;
        color: green;
      }
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
        {this.props.ToplistType ? (
          <TrackList
            {...this.state.detail}
            listType={this.props.ToplistType}
            id={this.props.id}
          ></TrackList>
        ) : (
          <ArtistsList artists={this.state.artists}></ArtistsList>
        )}
      </components.Wrapper>
    );
  }

  private queryTrackList() {
    new PlayListService()
      .getPlayListDetail(new RequestParams({ id: this.props.id }))
      .subscribe(data => {
        this.setState({
          detail: {
            tracks: data.playlist.tracks.slice(0, 8),
            trackIds: data.playlist.trackIds.slice(0, 8)
          },
          updateDate: data.playlist.updateTime
        });
      });
  }

  private queryArtistList() {
    new RankService().getTopArtists(new RequestParams()).subscribe(data => {
      this.setState({
        artists: data.list.artists.slice(0, 8),
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
          <span />
        ) : (
          <Icon className="play" type="play-circle" />
        )}
      </components.Title>
    );
  }

  private get updateDateStr() {
    return dateFormat(this.props.updateDate, "MM月dd日") + "更新";
  }
}

class TrackList extends React.Component<{
  tracks: any[];
  trackIds: any[];
  listType: string;
  id: string;
}> {
  public render() {
    if (!this.props.tracks) {
      return <NoData></NoData>;
    }
    return (
      <components.Body className="stripe">
        {this.props.tracks.map((item, index) => {
          let cssName = "status";
          let status = "-";
          const trackIdInfo =
            this.props.trackIds.find(x => x.id === item.id) || {};
          const atName = item.ar.map(x => x.name).join("/");

          switch (this.props.listType) {
            case "S":
              cssName += " small";
              status = trackIdInfo.ratio + "%";
              break;
            case "N":
            case "O":
            case "H":
              const o_lr = trackIdInfo.lr;
              if (!o_lr) {
                status = "new";
                cssName += " green";
              } else if (o_lr > index) {
                status = "↑";
                cssName += " red";
              } else if (o_lr < index) {
                status = "↓";
                cssName += " blue";
              }
              break;
          }

          return (
            <components.TrackItem key={index} className="flex-row">
              <div className={getIndexClassName(index)}>{index + 1}</div>
              <div className={cssName}>{status}</div>
              <div className="t-name">{item.name}</div>
              <div className="at-name" title={atName}>
                {atName}
              </div>
            </components.TrackItem>
          );
        })}
        <components.Footer>
          <Link to={`/detail/song-list/${this.props.id}`} className="link">
            查看更多>
          </Link>
        </components.Footer>
      </components.Body>
    );
  }
}

class ArtistsList extends React.Component<{ artists: any[] }> {
  public render() {
    if (!this.props.artists) {
      return <NoData></NoData>;
    }

    return (
      <components.Body className="stripe">
        {this.props.artists.map((item, index) => {
          let cssName = "status";
          let status = "-";
          if (item.lastRank < index) {
            status = "↓";
            cssName += " blue";
          } else if (item.lastRank > index) {
            status = "↑";
            cssName += " red";
          }
          return (
            <components.TrackItem key={index} className="flex-row">
              <div className={getIndexClassName(index)}>{index + 1}</div>
              <div className={cssName}>{status}</div>
              <div>{item.name}</div>
            </components.TrackItem>
          );
        })}
        <components.Footer>
          <a href="#" className="link">
            查看更多>
          </a>
        </components.Footer>
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
