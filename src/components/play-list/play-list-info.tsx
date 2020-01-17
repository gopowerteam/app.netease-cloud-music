import React from "react";
import styled from "styled-components";
import { tenThoursand, dateFormat } from "~/utils/filter";
import { CreateMini } from "./creater";
import { Button } from "antd";

const componets = {
  wrap: styled.div`
    height: 200px;
    padding: 20px;
  `,
  avatar: styled.div`
    background-size: cover;
    width: 200px;
    height: 200px;
  `,
  info: styled.div`
    margin-left: 20px;
    .title {
      justify-content: space-between;
      height: 40px;

      .type {
        color: red;
        border: solid 1px red;
        padding: 1px 3px;
        border-radius: 2px;
      }
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      .title-block {
        display: inline-block;
        text-align: right;
        line-height: 20px;
        height: 40px;
        padding: 0 5px;
      }
      .title-block + .title-block {
        border-left: solid 1px gray;
      }
    }
  `
};

export default function PlayListInfo(prop: { info: any; creater: any }) {
  const createInfo = prop.creater;
  const playListInfo = prop.info;

  return (
    <componets.wrap className="flex-row">
      <componets.avatar
        style={{ backgroundImage: playListInfo.coverImgUrl }}
      ></componets.avatar>
      <componets.info>
        <div className="flex-row title">
          {/* <Button type="danger" ghost disabled size="small">
            歌单
          </Button> */}
          <div className="type">歌单</div>
          <div className="name">{playListInfo.name}</div>
          <div>
            <div className="title-block">
              <div>歌曲数</div>
              <div>{tenThoursand(playListInfo.songCount)}</div>
            </div>
            <div className="title-block">
              <div>播放数</div>
              <div>{tenThoursand(playListInfo.playCount)}</div>
            </div>
          </div>
        </div>
        <div className="flex-row">
          <CreateMini
            avatarUrl={createInfo.avatarUrl}
            nickname={createInfo.nickname}
          ></CreateMini>
          <div>
            {playListInfo.updateTime
              ? `更新时间：${dateFormat(playListInfo.updateTime)}`
              : `创建时间: ${dateFormat(playListInfo.createTime)}`}
          </div>
        </div>
        <div>
          <Button.Group>
            <Button type="danger" icon="play-circle">
              播放全部
            </Button>
            <Button type="danger" icon="plus"></Button>
          </Button.Group>
          <Button>收藏</Button>
          <Button>分享</Button>
          <Button>下载全部</Button>
        </div>

        <div>标签：{playListInfo.tags.join("/")}</div>
        <div>简介：{playListInfo.description}</div>
      </componets.info>
    </componets.wrap>
  );
}
