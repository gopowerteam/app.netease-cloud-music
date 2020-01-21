import React, { Component } from "react";
import styled from "styled-components";
import { RequestParams } from "~/core/http";
import { CommentService } from "~/services/comment.service";
import { Observable } from "rxjs";
import { Avatar, Button, Icon, Divider, Pagination, Row, Col } from "antd";
import moment from "moment";
import { PageService } from "~/core/services/page.service";
import TextArea from "antd/lib/input/TextArea";
const components = {
  Wrapper: styled.section``,
  HotCommentsWrapper: styled.div``,
  CommentsWrapper: styled.div``,
  CommentItemWrapper: styled.div`
    padding: 20px 10px;

    .avatar {
      flex-basis: 70px;
    }
    .content {
      font-size: 12px;
      .time {
        color: #aeaeae;
      }
    }
    .replied {
      background-color: #f5f5f5;
      padding: 5px;
    }
    .action {
      flex-basis: 100px;
      color: #7f7f7f;
    }
  `
};

interface CommentListProps {
  source: (option?: any) => Observable<any>;
}

interface CommentListState {
  hotComments: any[];
  comments: [];
  value: "";
}

class CommentList extends Component<CommentListProps, CommentListState> {
  private pageService = new PageService();

  constructor(props) {
    super(props);
    this.state = { hotComments: [], comments: [], value: "" };
  }

  public componentDidMount() {
    this.getComments();
  }

  public render() {
    return (
      <components.Wrapper>
        {this.getCommentEditor()}
        <Divider></Divider>
        {this.getHotCommentContainer()}
        {this.getCommentContainer()}
      </components.Wrapper>
    );
  }

  public getCommentEditor() {
    const onChange = e => {
      this.setState({ value: e.target.value });
    };

    return (
      <Row>
        <Col span={24}>
          <TextArea
            placeholder="输入评论或@朋友"
            rows={4}
            onChange={onChange}
            value={this.state.value}
          />
        </Col>
        <Col span={24} className="text-right padding-top">
          <Button shape="round">评论</Button>
        </Col>
      </Row>
    );
  }

  public getHotCommentContainer() {
    const { hotComments } = this.state;

    if (hotComments.length <= 0) {
      return;
    }

    return (
      <>
        <components.HotCommentsWrapper>
          <h4>精彩评论</h4>
          <div>{hotComments.map(item => this.getCommentItem(item))}</div>
        </components.HotCommentsWrapper>
        <Divider></Divider>
      </>
    );
  }

  public getCommentContainer() {
    const { comments } = this.state;

    return (
      <components.CommentsWrapper>
        <h4>最新评论</h4>
        <div>{comments.map(item => this.getCommentItem(item))}</div>
        <div className="text-center">
          <Pagination
            defaultPageSize={20}
            onChange={(page, size) => this.onPageChange(page, size)}
            defaultCurrent={1}
            total={this.pageService.total}
          />
        </div>
      </components.CommentsWrapper>
    );
  }

  /**
   * 获取评论项
   * @param comment
   */
  public getCommentItem(comment) {
    const { user } = comment;
    const isLatest = Date.now() - comment.time < 1000 * 60 * 60;

    const getAvatar = () => (
      <div className="avatar">
        <Avatar size={50} src={user.avatarUrl}></Avatar>
      </div>
    );

    const getBeReplied = () => {
      if (comment.beReplied.length <= 0) {
        return "";
      }

      return (
        <div className="replied">
          {comment.beReplied.map(item => (
            <div key={item.beRepliedCommentId} className="replied ">
              <a>@{item.user.nickname}:</a>
              <span>{item.content}</span>
            </div>
          ))}
        </div>
      );
    };

    const getContent = () => (
      <div className="content flex-auto">
        <div>
          <a>{user.nickname}:</a>
          <span>{comment.content}</span>
        </div>
        {getBeReplied()}
        <div className="time">
          {isLatest
            ? moment(comment.time).fromNow()
            : moment(comment.time).format("HH:MM")}
        </div>
      </div>
    );

    const getAction = () => (
      <div className="action flex-row justify-content-around">
        <Icon type="like" />
        <Icon type="share-alt" />
        <Icon type="message" />
      </div>
    );

    return (
      <components.CommentItemWrapper
        key={comment.commentId}
        className="flex-row"
      >
        {getAvatar()}
        {getContent()}
        {getAction()}
      </components.CommentItemWrapper>
    );
  }

  private getComments() {
    const { source } = this.props;
    source({
      page: this.pageService
    }).subscribe(({ comments, hotComments }) => {
      this.setState({
        comments,
        hotComments: hotComments || []
      });
    });
  }

  private onPageChange(page, size) {
    this.pageService.pageIndex = page;
    this.pageService.pageSize = size;
    this.getComments();
  }
}

export function PlayListCommentList(props) {
  const commentService = new CommentService();

  function getComments(options) {
    return commentService.getPlayListComment(
      new RequestParams(
        {
          id: props.id
        },
        {
          ...options
        }
      )
    );
  }

  return <CommentList source={getComments}></CommentList>;
}

export function MVCommentList() {
  return <div></div>;
}

export function VideoCommentList() {
  return <div></div>;
}
