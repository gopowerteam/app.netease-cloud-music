import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RankType } from "./rank-song.config";
import { RankService } from "~/services/rank.service";
import { RequestParams } from "~/core/http";
import { Icon } from "antd";

type TopListProp = {
  idx: string;
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

    padding: 0 10px;

    .index {
      color: gray;
      font-size: 16px;
      margin-right: 10px;
      &-top {
        color: red;
      }
    }
  `
};

function TopList(prop: TopListProp) {
  const isSongRank = !!prop.idx;

  const [list, updateList] = useState(new Array<any>());
  const [background, updateBackground] = useState(
    "http://p2.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg"
  );
  const rankSongService = new RankService();

  useEffect(() => {
    // rankSongService
    //   .getTopSongList(new RequestParams({ idx: prop.idx }))
    //   .subscribe(data => {
    //     updateList(data.playlist.tracks);
    //     updateBackground(data.playlist.coverImgUrl);
    //   });
  }, [prop.idx]);

  return (
    <components.Wrapper className="flex-column">
      <components.Title
        className="flex-row align-items-center"
        style={{
          backgroundImage: `url(${background})`
        }}
      >
        <div
          className="title-bg"
          style={{
            backgroundImage: `url(${background})`
          }}
        ></div>
        <Icon className="play" type="play-circle" />
      </components.Title>
      <components.Body>
        {list.slice(0, 9).map((item, index) => {
          let itemClassName = "index";
          if (index < 3) itemClassName += " index-top";
          return (
            <components.TrackItem key={item.id}>
              <span className={itemClassName}>{index + 1}</span>
              {item.name}
            </components.TrackItem>
          );
        })}
      </components.Body>
      <components.Footer>
        <a href="#" className="link">
          查看全部>
        </a>
      </components.Footer>
    </components.Wrapper>
  );
}

export default TopList;
