import React, { Component, Props } from "react";
import { Button } from "antd";
import styled from "styled-components";
import Header from "./components/header.component";
import { SideMenu } from "./components/side-menu.component";
import Footer from "./components/footer.component";

const components = {
  FlexColumn: styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  `,
  FlexRow: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  `,
  HeaderWrap: styled.div`
    flex: 1;
  `,
  SideMenuWrap: styled.div`
    flex-basis: 100px;
    width: 100px;
  `,
  FooterWrap: styled.div`
    flex-basis: 100px;
    height: 100px;
  `,
  Content: styled.main`
    flex: 1;
  `
};

const styles = (
  props?: Props<any>
): { [key: string]: React.CSSProperties } => ({
  autoFlex: {
    flex: 1
  },
  full: {
    width: "100%",
    height: "100%"
  }
});

export class DefaultLayout extends Component {
  public render() {
    return (
      <components.FlexColumn style={styles().full}>
        {this.layoutHeader()}
        <components.FlexRow style={styles().autoFlex}>
          {this.layoutSideMenu()}
          {this.lauyoutContent()}
          {this.lauyoutFooter()}
        </components.FlexRow>
      </components.FlexColumn>
    );
  }

  public layoutHeader() {
    return (
      <components.HeaderWrap>
        <Header></Header>
      </components.HeaderWrap>
    );
  }

  public layoutSideMenu() {
    return (
      <components.SideMenuWrap>
        <Header></Header>
      </components.SideMenuWrap>
    );
  }

  public lauyoutFooter() {
    return (
      <components.FooterWrap>
        <Footer></Footer>
      </components.FooterWrap>
    );
  }

  public lauyoutContent() {
    return <components.Content>111</components.Content>;
  }
}
