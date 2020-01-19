import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopList from "~/components/discover/top-ranking/top-list";
import { RankService } from "~/services/rank.service";
import { RequestParams } from "~/core/http";
import TopBlock from "~/components/discover/top-ranking/top-block";

const component = {
  Wrapper: styled.section``,
  Title: styled.div`
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    border-bottom: solid 1px #f2f2f2;
    margin: 10px auto;
  `,
  Official: styled.div`
    min-height: 500px;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    grid-gap: 30px 12px;
  `,
  AnyTop: styled.div`
    min-height: 300px;
    display: grid;
    grid-template-columns: repeat(6, 150px);
    grid-gap: 30px 12px;
  `
};

type RankState = {
  topList: any[];
  artistTop: any;
};
export default class TopRanking extends React.Component<any, RankState> {
  constructor(props) {
    super(props);
    this.state = {
      topList: [],
      artistTop: null
    };
  }

  public componentDidMount() {
    this.queryTopList();
  }

  public render() {
    return (
      <component.Wrapper>
        <component.Title>官方榜</component.Title>
        <component.Official>{this.getOfficialList()}</component.Official>
        <component.Title>全球榜</component.Title>
        <component.AnyTop>{this.getGlobalTopList()}</component.AnyTop>
      </component.Wrapper>
    );
  }

  /**
   * 生成官方榜
   */
  private getOfficialList() {
    if (!this.state.topList.length) {
      return <div></div>;
    }

    return this.state.topList
      .filter(x => x.ToplistType)
      .concat(this.state.artistTop)
      .map(item => {
        return <TopList key={item.id} {...item}></TopList>;
      });
  }

  /**
   * 生成全球榜
   */
  private getGlobalTopList() {
    if (!this.state.topList) {
      return <div></div>;
    }
    return this.state.topList
      .filter(x => !x.ToplistType)
      .map(item => <TopBlock key={item.id} {...item}></TopBlock>);
  }

  /**
   * 查询排行榜
   */
  private queryTopList() {
    const rankService = new RankService();
    rankService.getTopList(new RequestParams()).subscribe(data => {
      this.setState({
        topList: data.list,
        artistTop: {
          id: "XX",
          trackUpdateTime: Date.now(),
          coverImgUrl: data.artistToplist.coverUrl
        }
      });
    });
  }
}
