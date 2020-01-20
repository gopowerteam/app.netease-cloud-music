import React, { Component } from "react";
import styled from "styled-components";
import { PlayListService } from "~/services/playlist.service";
import { RequestParams } from "~/core/http";
import { Row, Col, Avatar, Icon, Pagination } from "antd";
import { PageService } from "~/core/services/page.service";

const components = {
  Wrapper: styled.section``
};

interface CollectorListProps {
  id: number;
  count: number;
}

interface CollectorListState {
  collectors: any[];
}

export default class CollectorList extends Component<
  CollectorListProps,
  CollectorListState
> {
  private pageService: PageService;
  private playListService = new PlayListService();

  constructor(props) {
    super(props);
    this.state = { collectors: [] };
    this.pageService = new PageService({
      pageSize: 60,
      total: this.props.count
    });
  }

  public componentDidMount() {
    this.getCollectorsList();
  }

  public render() {
    return (
      <Row>
        <Row>
          {this.state.collectors.map(collector => (
            <Col
              key={collector.userId}
              span={12}
              className="padding flex-row align-items-center"
            >
              <Avatar size={80} src={collector.avatarUrl}></Avatar>
              <div className="padding-x">
                <span>{collector.nickname}</span>
                <span style={{ paddingLeft: "10px" }}>
                  {this.getUserAvatar(collector.gender)}
                </span>
              </div>
            </Col>
          ))}
          <Col span={24} className="text-center">
            <Pagination
              defaultPageSize={60}
              onChange={(page, size) => this.onPageChange(page, size)}
              defaultCurrent={1}
              total={this.props.count}
            />
          </Col>
        </Row>
      </Row>
    );
  }

  public getUserAvatar(gender) {
    if (gender === 0) {
      return <></>;
    }
    const avatarStyles = {
      1: { color: "#489BCC", backgroundColor: "#CCF2FE" },
      2: { color: "#DB4B80", backgroundColor: "#FCD0E7" }
    };
    return <Avatar size={21} style={avatarStyles[gender]} icon="man"></Avatar>;
  }

  /**
   * 获取收藏者
   */
  private getCollectorsList() {
    this.playListService
      .getPlayListSubscribers(
        new RequestParams(
          {
            id: this.props.id
          },
          {
            page: this.pageService
          }
        )
      )
      .subscribe(({ subscribers }) => {
        this.setState({
          collectors: subscribers
        });
      });
  }

  private onPageChange(page, size) {
    this.pageService.pageIndex = page;
    this.pageService.pageSize = size;
    this.getCollectorsList();
  }
}
