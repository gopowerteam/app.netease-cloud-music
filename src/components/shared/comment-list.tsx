import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import { render } from "react-dom";
import { BannerService } from "~/services/banner.service";
import { RequestParams } from "~/core/http";

const components = {
  Wrapper: styled.section``
};

interface CommentListProps {
  data: any;
}

interface CommentListState {}

class CommentList extends Component<CommentListProps, CommentListState> {
  public render() {
    console.log(this.props.data);
    return <components.Wrapper>123</components.Wrapper>;
  }
}

export function PlayListCommentList(props) {
  const [comments, updateComments] = useState<any[]>([]);
  const bannerService = new BannerService();
  // bannerService.getBanner(new RequestParams()).subscribe(data => {
  //   console.log(333)
  //   updateComments([1, 23]);
  // });
  return <CommentList data={comments}></CommentList>;
}

export function MVCommentList() {
  return <div></div>;
}

export function VideoCommentList() {
  return <div></div>;
}
