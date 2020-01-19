import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";

const components = {
  miniWrap: styled.div`
    .name {
      font-size: 15px;
      margin: 0 5px;
    }
  `
};

export function CreaterDetail(prop) {
  return <div></div>;
}

export function CreateMini(prop: { avatarUrl: string; nickname: string }) {
  return (
    <components.miniWrap>
      <Avatar src={prop.avatarUrl}></Avatar>
      <span className="name">{prop.nickname}</span>
    </components.miniWrap>
  );
}
