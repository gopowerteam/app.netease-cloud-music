import React, { Component, Props } from "react";
import styled from "styled-components";
import Header from "./components/default/header.component";
import SideMenu from "./components/default/side-menu.component";
import Footer from "./components/default/footer.component";
import { FlexRow, FlexColumn } from "../shared/components";
import Router from "../Router";

const components = {
  HeaderWrap: styled.div`
    flex-basis: 50px;
    height: 50px;
    min-height: 50px;
    position: relative;
    background-color: #f7f7f7;
  `,
  SideMenuWrap: styled.div`
    flex-basis: 200px;
    width: 200px;
    overflow: auto;
    position: relative;
    background-color: #ededed;
  `,
  FooterWrap: styled.div`
    flex-basis: 50px;
    height: 50px;
    min-height: 50px;
    position: relative;
  `,
  ContentWrap: styled.section`
    flex: 1;
    position: relative;
  `,
  Content: styled.main`
    overflow: auto;
    max-width: 1100px;
    min-width: 700px;
    padding: 10px 25px;
  `
};

const styles = (
  props?: Props<any>
): { [key: string]: React.CSSProperties } => ({
  autoFlex: {
    flex: 1,
    position: "relative"
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
        <div style={styles().autoFlex}>
          <FlexRow className="full-absolute">
            {this.layoutSideMenu()}
            {this.lauyoutContent()}
          </FlexRow>
        </div>
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
      <components.ContentWrap>
        <components.Content className="full-absolute">
          <Router></Router>
        </components.Content>
      </components.ContentWrap>
    );
  }
}
