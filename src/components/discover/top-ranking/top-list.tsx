import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RankType } from "./rank-song.config";
import { RankService } from "~/services/rank.service";
import { RequestParams } from "~/core/http";

type TopListProp = {
  rankType?: RankType;
};

const components = {
  Wrapper: styled.div`
    width: 300px;
    height: 370px;
    border: 1px solid #fdfdfd;
  `,
  Title: styled.div`
    flex-basis: 70px;
    background-color: #6597e7;
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
    background-color: #a3f1f1;
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
  const isSongRank = !!prop.rankType;

  const [list, updateList] = useState(new Array<any>());
  const [background, updateBackground] = useState("");
  const rankSongService = new RankService();

  useEffect(() => {
    if (list.length) return;
    console.log(prop.rankType, "123");
    if (isSongRank) {
      rankSongService
        .getTopSongList(new RequestParams({ idx: prop.rankType!.value }))
        .subscribe(data => {
          updateList(data.playlist.tracks);
          updateBackground(data.playlist.coverImgUrl);
        });
    }
  });

  return (
    <components.Wrapper className="flex-column">
      <components.Title
        style={{
          backgroundImage: `url(${background})`
        }}
      >
        {isSongRank ? prop.rankType!.name : "歌手榜"}
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
        <a href="#">查看全部></a>
      </components.Footer>
    </components.Wrapper>
  );
}

export default TopList;
