import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { RankService } from "~/services/rank.service";
import { RequestParams } from "~/core/http";

type TopBlockProp = {
  name: string;
  idx: string;
};

const components = {
  wrap: styled.div`
    position: relative;
    &:hover {
      cursor: pointer;
    }
  `,
  content: styled.div`
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
  footer: styled.div`
    line-height: 20px;
    height: 20px;
    font-size: 12px;
  `
};

export default function TopBlock(prop: TopBlockProp) {
  const rankService = new RankService();

  const [tracks, updateTracks] = useState(new Array<any>());
  const [playCount, updatePlayCount] = useState("0");
  const [coverImgUrl, updateImageUrl] = useState(
    "http://p1.music.126.net/8-GBrukQ3BHhs4CmK6qE4w==/109951163424197392.jpg"
  );

  useEffect(() => {
    // rankService
    //   .getTopSongList(new RequestParams({ idx: prop.idx }))
    //   .subscribe(data => {
    //     updateImageUrl(data.playlist.coverImgUrl);
    //     updateTracks(data.playlist.tracks);
    //     updatePlayCount((data.playlist.playCount / 10000).toFixed(0));
    //   });
  }, [prop.idx]);

  return (
    <components.wrap>
      <components.content style={{ backgroundImage: `url(${coverImgUrl})` }}>
        <div className="title">
          <Icon type="customer-service" style={{ marginRight: "10px" }} />
          {playCount}万
        </div>
        <Icon className="play" type="play-circle" />
      </components.content>
      <components.footer>{prop.name}</components.footer>
    </components.wrap>
  );
}
