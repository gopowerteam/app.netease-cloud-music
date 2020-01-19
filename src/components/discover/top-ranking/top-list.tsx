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

function TopList(prop: TopListProp) {
  const [detail, setDetail] = useState<any>({});
  const [artists, setArtists] = useState<any[]>([]);
  const [updateDate, setUpdateDate] = useState(
    dateFormat(prop.trackUpdateTime, "MM月dd日")
  );
  const playListService = new PlayListService();
  const rankService = new RankService();

  useEffect(() => {
    if (prop.ToplistType) {
      playListService
        .getDetail(new RequestParams({ id: prop.id }))
        .subscribe(data => {
          setDetail(data.playlist);
          setUpdateDate(dateFormat(data.playlist.trackUpdateTime, "MM月dd日"));
        });
    } else {
      rankService.getTopArtists(new RequestParams()).subscribe(data => {
        const { list } = data;
        setArtists(list.artists);
        setUpdateDate(dateFormat(list.updateTime, "MM月dd日"));
      });
    }
  }, [prop.ToplistType]);

  /**
   * 歌曲数据行
   */
  function getTopTrackList() {
    const tracks = (detail.tracks || []) as any[];
    return tracks.slice(0, 9).map((item, index) => {
      const arNames = item.ar.map(x => x.name).join("/");
      let status = "-";
      if (prop.ToplistType === "S") {
        const trackIdItem = detail.trackIds.find(x => x.id === item.id);
        if (!trackIdItem) return;
        status = trackIdItem.ratio + "%";
      }
      return (
        <ListItem
          key={index}
          index={index}
          tName={item.name}
          cName={arNames}
          status={<components.TrackStatus>{status}</components.TrackStatus>}
        ></ListItem>
      );
    });
  }

  /**
   * 歌手数据行
   */
  function getTopArtists() {
    return artists.splice(0, 9).map((item, index) => {
      let status = "-";
      let statusClassName = "";

      if (item.lastRank > index) {
        status = "↑";
        statusClassName = "red";
      } else if (item.lastRank < index) {
        status = "↓";
        statusClassName = "blue";
      }

      return (
        <ListItem
          key={index}
          index={index}
          tName={item.name}
          status={
            <components.TrackStatus className={statusClassName}>
              {status}
            </components.TrackStatus>
          }
        ></ListItem>
      );
    });
  }

  return (
    <components.Wrapper>
      <components.Title
        className="flex-row align-items-center"
        style={{
          backgroundImage: `url(${prop.coverImgUrl})`
        }}
      >
        <div
          className="title-bg"
          style={{
            backgroundImage: `url(${prop.coverImgUrl})`
          }}
        ></div>
        <div className="update-date">{updateDate + "更新"}</div>
        {prop.ToplistType ? (
          <Icon className="play" type="play-circle" />
        ) : (
          <span />
        )}
      </components.Title>
      <components.Body className="stripe">
        {prop.ToplistType ? getTopTrackList() : getTopArtists()}
      </components.Body>
      <components.Footer>
        <a href="#" className="link">
          查看全部>
        </a>
      </components.Footer>
    </components.Wrapper>
  );
}

function ListItem(prop) {
  let cssClassName = "index";
  if (prop.index < 3) cssClassName += " index-top";
  return (
    <components.TrackItem className="flex-row track-item">
      <div className="flex-basis-2">
        <span className={cssClassName}>{prop.index + 1}</span>
        {prop.status}
      </div>
      <div className="t-name flex-basis-7">{prop.tName}</div>
      <div className="at-name text-right flex-basis-3" title={prop.cName}>
        {prop.cName}
      </div>
    </components.TrackItem>
  );
}

export default TopList;
