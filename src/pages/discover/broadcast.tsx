import React from "react";
import styled from "styled-components";
import DjBanner from "~/components/discover/broadcast/banner";
import CateList from "~/components/discover/broadcast/cate-list";
import ContentBlock from "~/components/common/content-block";
import PayGift from "~/components/discover/broadcast/pay-gift";

const components = {
  Wrapper: styled.section``
};

export default class Broadcast extends React.Component {
  public render() {
    return (
      <components.Wrapper>
        <DjBanner></DjBanner>
        <CateList></CateList>
        <ContentBlock title="付费精品">
          <PayGift />
        </ContentBlock>
      </components.Wrapper>
    );
  }
}
