import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RequestParams } from "~/core/http";
import { Icon } from "antd";
import { PlayListService } from "~/services/play-list.service";

type TopListProp = {
  id: string;
  trackUpdateTime: number;
  coverImgUrl: string;
  listType?: string;
};

const components = {
  Wrapper: styled.div`
    width: 300px;
    height: 370px;
    border: 1px solid #fdfdfd;
  `,
  Title: styled.div`
    flex-basis: 70px;
    height: 70px;
    justify-content: space-between;

    background-color: #6597e7;
    .title-bg {
      background-position: left center;
      background-size: cover;
      background-repeat: no-repeat;
      height: 100%;
      display: inline-block;
      width: 200px;
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
    height: 300px;
    flex: 1;
    background-color: #f2f2f2;
  `,
  Footer: styled.div`
    text-align: right;
    padding: 0 10px;
    flex-basis: 30px;
    line-height: 30px;
    background-color: #f2f2f2;
    .link {
      color: #b4b4b4;
      &:hover {
        color: gray;
      }
    }
  `,
  TrackItem: styled.div`
    line-height: 30px;
    height: 30px;
    .index {
      color: gray;
      font-size: 16px;
      &-top {
        color: red;
      }
    }
  `
};

function TopList(prop: TopListProp) {
  const [detail, setDetail] = useState<any>({});
  const playListService = new PlayListService();

  useEffect(() => {
    playListService
      .getDetail(new RequestParams({ id: prop.id }))
      .subscribe(data => {
        setDetail(data.playlist);
      });
  }, [prop.id]);

  const topTenTracks = (detail.tracks || []).slice(0, 9) as any[];

  return (
    <components.Wrapper className="flex-column">
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
        <Icon className="play" type="play-circle" />
      </components.Title>
      <components.Body>
        {topTenTracks.map((item, index) => (
          <TrackItem
            key={index}
            index={index}
            tName={item.name}
            cName={item.ar.name}
            listType={prop.listType}
          ></TrackItem>
        ))}
      </components.Body>
      <components.Footer>
        <a href="#" className="link">
          查看全部>
        </a>
      </components.Footer>
    </components.Wrapper>
  );
}

function TrackItem(prop) {
  let cssClassName = "flex-basis-1 text-right index";
  if (prop.index < 3) cssClassName += " index-top";
  return (
    <components.TrackItem className="flex-row">
      <div className={cssClassName}>{prop.index + 1}</div>
      <div className="status text-center flex-basis-1">-</div>
      <div className="t-name flex-basis-7">{prop.tName}</div>
      <div className="at-name text-right flex-basis-3">
        {prop.listType ? prop.cName : ""}
      </div>
    </components.TrackItem>
  );
}

export default TopList;
