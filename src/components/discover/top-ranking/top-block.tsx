import React from "react";
import styled from "styled-components";
import { Icon } from "antd";
import { tenThoursand } from "~/utils/filter";

type TopBlockProp = {
  name: string;
  id: string;
  playCount: number;
  coverImgUrl: string;
};

const components = {
  wrap: styled.div`
    position: relative;
    &:hover {
      cursor: pointer;
    }
  `,
  content: styled.div`
    height: 150px;
    width: 150px;
    border: solid 1px #f2f2f2;
    background-size: cover;

    &:hover {
      .play {
        display: block;
      }
    }
    .title {
      position: absolute;
      width: 80px;
      top: 1px;
      right: 1px;
      height: 20px;
      line-height: 20px;
      text-align: right;
      padding-right: 5px;
      color: white;
      font-size: 11px;
      background-image: linear-gradient(90deg, #66666621 25%, #666666de 80%);
    }
    .play {
      position: absolute;
      bottom: 25px;
      right: 5px;
      display: none;
      font-size: 24px;
      color: #f2f2f2;
      &:hover {
        color: #000;
      }
    }
  `,
  footer: styled.div`
    line-height: 20px;
    height: 20px;
    font-size: 12px;
  `
};

/**
 * 排行榜歌单 Block
 * @param prop TopBlockProp
 */
export default function TopBlock(prop: TopBlockProp) {
  return (
    <components.wrap>
      <components.content
        style={{ backgroundImage: `url(${prop.coverImgUrl})` }}
      >
        <div className="title">
          <Icon type="customer-service" style={{ marginRight: "10px" }} />
          {tenThoursand(prop.playCount)}
        </div>
        <Icon className="play" type="play-circle" />
      </components.content>
      <components.footer>{prop.name}</components.footer>
    </components.wrap>
  );
}
