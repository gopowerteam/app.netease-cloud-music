import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Icon, Slider } from "antd";
import { Consumer } from "reto";
import { AudioStore } from "~/store/audio.store";
import { AudioState, AudioMedia } from "~/shared/utils/audio-media";
import { ReactComponent as VoiceSvg } from "~/assets/icons/voice.svg";
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
  `,
  Progress: styled(Slider)`
    margin: 0 -10px !important;
    padding: 0 !important;
    z-index: 10;
    height: 1px !important;
    .ant-slider-handle {
      opacity: 0;
      background-color: #c94436;
      border-color: #c94436;
    }
    .ant-slider-track {
      background-color: #c94436;
    }
    &:hover {
      .ant-slider-track {
        background-color: #c94436 !important;
      }
      .ant-slider-handle {
        opacity: 1;
        background-color: #c94436 !important;
        border-color: #c94436 !important;
      }
    }
  `,
  VoiceWrap: styled.div`
    position: absolute;
    bottom: 40px;
    height: 80px;
    z-index: 10;
    opacity: 0;

    .ant-slider-handle {
      background-color: #c94436;
      border-color: #c94436;
    }
    .ant-slider-track {
      background-color: #c94436;
    }

    &:hover {
      opacity: 1;
      .ant-slider-track {
        background-color: #c94436 !important;
      }
      .ant-slider-handle {
        background-color: #c94436 !important;
        border-color: #c94436 !important;
      }
    }
  `
};

interface MusicListProps {
  ids: number[];
}

interface MusicListState {
  duration: number;
  offset: number;
}

export default class Footer extends Component<{}, MusicListState> {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      offset: 0
    };
  }

  private audio;
  private seeking = false;
  private interval;
  private volumn = 100;
  /**
   * 更新音频对象
   * @param audioStore
   */
  public update(audioStore) {
    this.audio = audioStore.audio as AudioMedia;

    if (this.interval) {
      clearInterval(this.interval);
    }

    if (!this.audio || this.audio.state !== AudioState.ready) {
      return;
    }

    this.interval = setInterval(() => {
      if (this.seeking) {
        clearInterval(this.interval);
        return;
      }

      const offset = audioStore.audio.getOffset();
      this.setState({
        offset,
        duration: audioStore.audio.duration
      });
    });
  }

  public render() {
    return (
      <components.Wrapper>
        <Consumer of={AudioStore}>
          {audioStore => {
            if (audioStore.audio !== this.audio) {
              this.update(audioStore);
            }

            return (
              <Row className="full">
                <Col span={24}>
                  <components.Progress
                    step={1}
                    defaultValue={0}
                    value={this.state.offset}
                    max={this.state.duration || 0}
                    onChange={progress => {
                      this.seeking = true;
                      this.setState({
                        offset: progress as number
                      });
                    }}
                    onAfterChange={progress => {
                      this.setState({
                        offset: progress as number
                      });
                      audioStore.audio.setOffset(progress);
                      this.seeking = false;
                    }}
                    disabled={audioStore.audioState === AudioState.none}
                    tooltipVisible={false}
                  />
                </Col>
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
            );
          }}
        </Consumer>
      </components.Wrapper>
    );
  }

  public getMusicContainer(store) {
    if (!store.audioData) {
      return <></>;
    }
    const { al, ar, name } = store.audioData;

    return (
      <components.MusicContainer className="flex-row align-items-center">
        <img src={al.picUrl}></img>
        <div>
          <div className="name">
            {name} - {ar.map(x => x.name).join("/")}
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
          onClick={() => store.preAudio().then(audio => audio.play())}
        />
        <Icon
          style={{ color: "#C94436", fontSize: 36 }}
          type={
            store.audioState === AudioState.running
              ? "pause-circle"
              : "play-circle"
          }
          theme="filled"
          onClick={() => this.onChangeState(store.audio)}
        />
        <Icon
          style={{ color: "#C94436", fontSize: 24 }}
          type="step-forward"
          theme="filled"
          onClick={() => store.nextAudio().then(audio => audio.play())}
        />
        <Icon type="share-alt" style={{ fontSize: 18 }} />
      </components.MusicContainer>
    );
  }

  /**
   * 获取操作容器
   * @param store
   */
  public getActionContainer(audioStore) {
    return (
      <components.MusicContainer className="flex-row justify-content-end align-items-center">
        <Icon component={VoiceSvg as any}></Icon>
        <components.VoiceWrap>
          <Slider
            vertical
            value={this.volumn}
            max={100}
            onChange={value => {
              this.volumn = value as number;
              audioStore.audio && audioStore.audio.setVolumn(value);
            }}
          />
        </components.VoiceWrap>
      </components.MusicContainer>
    );
  }

  /**
   * 修改播放状态
   * @param audio
   */
  private onChangeState(audio: AudioMedia) {
    if (audio.state === "running") {
      audio.pause();
    } else {
      audio.resume();
    }
  }
}
