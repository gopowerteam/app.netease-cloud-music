import React from "react";
import styled from "styled-components";
import TopList from "~/components/discover/top-ranking/top-list";
import { RankSong } from "~/components/discover/top-ranking/rank-song.config";

const component = {
  Title: styled.div`
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    border-bottom: solid 1px #f2f2f2;
    margin: 10px auto;
  `,
  Official: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-gap: 30px 12px;
  `,
  AnyTop: styled.div``
};

export default function TopRanking() {
  return (
    <>
      <component.Title>官方榜</component.Title>
      <component.Official>
        <TopList rankType={RankSong.fastestSong}></TopList>
        <TopList rankType={RankSong.hotSong}></TopList>
        <TopList rankType={RankSong.originSong}></TopList>
        <TopList rankType={RankSong.newSong}></TopList>
        {/*  <TopList bgColor="purple"></TopList> */}
      </component.Official>
      <component.AnyTop></component.AnyTop>
    </>
  );
}
