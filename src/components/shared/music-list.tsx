import React, { Component } from "react";
import styled from "styled-components";
import { SongService } from "~/services/song.service";
import { RequestParams } from "~/core/http";
import { Table, Row, Col, Icon } from "antd";
import moment from "moment";

const components = {
  Wrapper: styled.section`
    .ant-table-thead > tr > th {
      padding: 5px;
      font-size: 12px;
      font-weight: normal !important;
    }
    .ant-table-tbody > tr {
      /* &:hover {
        background-color: #adaa4a;
      } */
      & > td {
        padding: 10px;
        font-size: 12px;
      }
    }

    .time,
    .alias {
      color: #aeaeae;
    }
  `
};

interface MusicListProps {
  ids: number[];
}

interface MusicListState {
  songs: any[];
}

export default class MusicList extends Component<
  MusicListProps,
  MusicListState
> {
  private songService = new SongService();

  columns = [
    {
      key: "ftype",
      render: (item, row, index) => (++index).toString().padStart(2, "0")
    },
    {
      width: 60,
      render: (id, row, index) => this.getColumnAction(id),
      key: "id"
    },
    {
      title: "音乐标题",
      render: row => this.getColumnName(row),
      key: "name"
    },
    {
      title: "歌手",
      render: row => this.getColumnSonger(row),
      key: "ar"
    },
    {
      title: "专辑",
      dataIndex: "al.name",
      key: "al.id"
    },
    {
      title: "时长",
      render: row => this.getColumnTime(row),
      key: "dt"
    }
  ];

  constructor(props) {
    super(props);
    this.state = { songs: [] };
  }

  public componentDidMount() {
    this.getSongDetail();
  }

  public render() {
    return (
      <components.Wrapper>
        <Table
          locale={{ emptyText: "暂无数据" }}
          rowKey="id"
          pagination={false}
          dataSource={this.state.songs}
          columns={this.columns}
        ></Table>
      </components.Wrapper>
    );
  }

  public getColumnName(row) {
    const alias = row.alia.length ? `(${row.alia.map(x => x).join("/")})` : "";

    return (
      <div>
        <span>{row.name}</span>
        <span className="alias">{alias}</span>
      </div>
    );
  }

  public getColumnSonger(row) {
    const alias = row.ar.length ? row.ar.map(x => x.name).join("/") : "";

    return <div>{alias}</div>;
  }

  public getColumnTime(row) {
    const time = moment(row.dt);
    return (
      <div className="time">
        {time
          .minutes()
          .toString()
          .padStart(2, "0")}
        :{time.seconds()}
      </div>
    );
  }

  public getColumnAction(id) {
    return (
      <Row>
        <Col span={12}>
          <Icon type="heart" />
        </Col>
        <Col span={12}>
          <Icon type="download" />
        </Col>
      </Row>
    );
  }

  private getSongDetail() {
    this.songService
      .getSongDetail(
        new RequestParams({
          ids: this.props.ids.join(",")
        })
      )
      .subscribe(({ songs }) => {
        this.setState({
          songs
        });
      });
  }
}
