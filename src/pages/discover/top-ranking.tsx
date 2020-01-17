import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopList from "~/components/discover/top-ranking/top-list";
import { RankTypeConfig } from "~/components/discover/top-ranking/rank-song.config";
import { RankService } from "~/services/rank.service";
import { RequestParams } from "~/core/http";
import TopBlock from "~/components/discover/top-ranking/top-block";

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
  AnyTop: styled.div`
    display: grid;
    grid-template-columns: repeat(6, 150px);
    grid-gap: 30px 12px;
  `
};

export default function TopRanking() {
  const rankService = new RankService();

  return (
    <>
      <component.Title>官方榜</component.Title>
      <component.Official>{getTopList()}</component.Official>
      <component.Title>全球榜</component.Title>
      <component.AnyTop>{getTopBlock()}</component.AnyTop>
    </>
  );

  function getTopList() {
    return RankTypeConfig.filter(x => x.type).map(item => {
      return <TopList key={item.value} idx={item.value}></TopList>;
    });
  }

  function getTopBlock() {
    return RankTypeConfig.filter(x => !x.type).map(item => (
      <TopBlock key={item.value} idx={item.value} name={item.name}></TopBlock>
    ));
  }
}