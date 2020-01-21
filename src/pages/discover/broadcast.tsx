import React from "react";
import styled from "styled-components";
import DjBanner from "~/components/discover/broadcast/banner";
import CateList, { CateInfo } from "~/components/discover/broadcast/cate-list";
import ContentBlock from "~/components/common/content-block";
import PayGift from "~/components/discover/broadcast/pay-gift";
import RecommendType from "~/components/discover/broadcast/recommend-top";

const components = {
  Wrapper: styled.section``
};

type BroadcastState = {
  hotMenus: CateInfo[] | null;
};

export default class Broadcast extends React.Component<any, BroadcastState> {
  constructor(props) {
    super(props);
    this.state = {
      hotMenus: null
    };
  }

  public render() {
    return (
      <components.Wrapper>
        <DjBanner></DjBanner>
        <CateList onload={data => this.setState({ hotMenus: data })}></CateList>
        <ContentBlock title="付费精品">
          <PayGift />
        </ContentBlock>
        {this.getHotDjList()}
      </components.Wrapper>
    );
  }

  private getHotDjList() {
    if (!this.state.hotMenus) return <div />;

    return this.state.hotMenus.map(item => (
      <ContentBlock key={item.id} title={item.name}>
        <RecommendType typeId={item.id} />
      </ContentBlock>
    ));
  }
}
