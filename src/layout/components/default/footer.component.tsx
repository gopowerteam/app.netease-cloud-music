import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Icon } from "antd";
import { Consumer } from "reto";
import { AudioStore } from "~/store/audio.store";

const components = {
  Wrapper: styled.section`
    padding: 0 10px;
    height: 100%;
    width: 100%;
  `,
  MusicContainer: styled.div`
    height: 100%;
    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin-right: 10px;
    }
    i {
      margin: 0 10px;
      cursor: pointer;
    }
    .name {
      font-size: 12px;
    }
    .progress {
      font-size: 10px;
      color: #e2e2e2;
    }
  `
};

interface MusicListProps {
  ids: number[];
}

interface MusicListState {
  songs: any[];
}

export default class Footer extends Component {
  public render() {
    return (
      <components.Wrapper>
        <Consumer of={AudioStore}>
          {audioStore => (
            <Row className="full">
              <Col className="full-height" span={8}>
                {this.getMusicContainer(audioStore)}
              </Col>
              <Col className="full-height" span={8}>
                {this.getControlContainer(audioStore)}
              </Col>
              <Col className="full-height" span={8}>
                {this.getActionContainer(audioStore)}
              </Col>
            </Row>
          )}
        </Consumer>
      </components.Wrapper>
    );
  }

  public getMusicContainer(store) {
    if (!store.music) {
      return <></>;
    }
    const { al, ar } = store.music;

    console.log(store.media.audioContext.currentTime);
    return (
      <components.MusicContainer className="flex-row align-items-center">
        <img src={al.picUrl}></img>
        <div>
          <div className="name">
            {store.music.name} - {ar.map(x => x.name).join("/")}
          </div>
          <div className="progress"></div>
        </div>
      </components.MusicContainer>
    );
  }

  public getControlContainer(store) {
    return (
      <components.MusicContainer className="full-height flex-row justify-content-center align-items-center">
        <Icon type="heart" style={{ fontSize: 18 }} />
        <Icon
          style={{ color: "#C94436", fontSize: 24 }}
          type="step-backward"
          theme="filled"
        />
        <Icon
          style={{ color: "#C94436", fontSize: 36 }}
          type="play-circle"
          theme="filled"
        />
        <Icon
          style={{ color: "#C94436", fontSize: 24 }}
          type="step-forward"
          theme="filled"
        />
        <Icon type="share-alt" style={{ fontSize: 18 }} />
      </components.MusicContainer>
    );
  }

  public getActionContainer(store) {
    return <components.MusicContainer></components.MusicContainer>;
  }
}
