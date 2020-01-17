import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayListInfo from "~/components/play-list/play-list-info";
import { RankService } from "~/services/rank.service";
import { RequestParams } from "~/core/http";

const components = {
  wrap: styled.section`
    margin: 20px 0;
  `
};

export default function PlayList(prop) {
  const rankService = new RankService();
  const idx = prop.router.query.idx;

  const [creater, setCreater] = useState({});
  const [info, setInfo] = useState({});

  useEffect(() => {
    rankService.getTopSongList(new RequestParams({ idx })).subscribe(data => {
      const playList = data.playlist;
      setCreater(playList.creator);
      setInfo({
        playCount: playList.playCount,
        trackCount: playList.trackCount,
        tags: playList.tags,
        coverImgUrl: playList.coverImgUrl,
        updateTime: playList.updateTime,
        createTime: playList.createTime,
        description: playList.description,
        name: playList.name,
        shareCount: playList.shareCount
      });
    });
  }, [idx]);

  return (
    <components.wrap>
      <PlayListInfo info={info} creater={creater}></PlayListInfo>
    </components.wrap>
  );
}
