import React, { Component, Props } from "react";
import styled from "styled-components";
import Header from "./components/header.component";
import SideMenu from "./components/side-menu.component";
import Footer from "./components/footer.component";
import { FlexRow, FlexColumn } from "../shared/components";
import Router from "../Router";

const components = {
  HeaderWrap: styled.div`
    flex-basis: 50px;
    height: 50px;
  `,
  SideMenuWrap: styled.div`
    flex-basis: 200px;
    width: 200px;
  `,
  FooterWrap: styled.div`
    flex-basis: 50px;
    height: 50px;
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
      <FlexColumn style={styles().full}>
        {this.layoutHeader()}
        <FlexRow style={styles().autoFlex}>
          {this.layoutSideMenu()}
          {this.lauyoutContent()}
        </FlexRow>
        {this.lauyoutFooter()}
      </FlexColumn>
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
        <SideMenu></SideMenu>
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
    return (
      <components.Content>
        <Router></Router>
      </components.Content>
    );
  }
}
