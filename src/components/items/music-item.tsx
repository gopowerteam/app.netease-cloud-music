import React, { Component } from "react";
import styled from "styled-components";

const components = {
  Wrapper: styled.section`
    height: 100px;
    width: 50%;

    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    display: flex;

    &:hover {
      background-color: #f5f5f5;
    }
  `,
  ImgContainer: styled.div`
    line-height: 100px;
    position: relative;
    img {
      height: 80%;
      border-radius: 10px;
    }
  `,
  IndexContainer: styled.div`
    line-height: 100px;
    padding: 0 10px;
    color: #b7b7b7;
  `,
  InfoContainer: styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: between;

    .alias {
      color: #7f7f7f;
    }

    .artists {
      color: #7f7f7f;
    }
  `
};

interface MusicItemProps {
  index?: number;
  data: {
    id: number;
    picUrl: string;
    name: string;
    song: any;
  };
}

interface MusicItemState {}

export default class MusicItem extends Component<
  MusicItemProps,
  MusicItemState
> {
  public render() {
    return (
      <components.Wrapper>
        {this.getImgContainer()}
        {this.getIndexContainer()}
        {this.getInfoContainer()}
      </components.Wrapper>
    );
  }

  public getImgContainer() {
    const { data } = this.props;
    return (
      <components.ImgContainer>
        <img alt="" src={data.picUrl}></img>
      </components.ImgContainer>
    );
  }

  public getIndexContainer() {
    return (
      <components.IndexContainer>
        {(this.props.index || "").toString().padStart(2, "0")}
      </components.IndexContainer>
    );
  }

  public getInfoContainer() {
    const {
      data: { song }
    } = this.props;
    return (
      <components.InfoContainer>
        <div className="flex-column justify-content-center">
          <div>
            <span>{song.name} </span>
            <span className="alias">
              {song.alias.length > 0 && `(${song.alias.join(" / ")})`}
            </span>
          </div>
          <div className="artists">
            {song.artists.map(x => x.name).join(" / ")}
          </div>
        </div>
        <div></div>
      </components.InfoContainer>
    );
  }
}
