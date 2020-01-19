import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopList from "~/components/discover/top-ranking/top-list";
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

  const [topList, setTopList] = useState<any[]>([]);

  useEffect(() => {
    rankService.getTopList(new RequestParams()).subscribe(data => {
      setTopList(data.list);
    });
  });

  function getOfficialList() {
    return topList
      .filter(x => x.ToplistType)
      .map(item => {
        return <TopList key={item.id} {...item}></TopList>;
      });
  }

  function getGlobalTopList() {
    return topList
      .filter(x => !x.ToplistType)
      .map(item => <TopBlock key={item.id} {...item}></TopBlock>);
  }

  return (
    <>
      <component.Title>官方榜</component.Title>
      <component.Official>{getOfficialList()}</component.Official>
      <component.Title>全球榜</component.Title>
      <component.AnyTop>{getGlobalTopList()}</component.AnyTop>
    </>
  );
}
