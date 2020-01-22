import React from "react";
import styled from "styled-components";
import { PlayListService } from "~/services/playlist.service";
import { RequestParams } from "~/core/http";
import CategoryPanel from "~/components/discover/play-list/category-panel";
import PlayListDetail from "~/components/discover/play-list/play-list-detail";

const components = {
  Wrapper: styled.section`
    margin: 20px 0;
    font-size: 13px;
  `,
  Tags: styled.div`
    height: 12px;
    line-height: 12px;
    margin: 10px 0;
    .tag {
      padding: 0 20px;
      .tag-btn {
        &:hover {
          cursor: pointer;
        }
      }
    }
    .tag + .tag {
      border-left: solid 1px #dbdbdb;
    }
  `,
  Container: styled.div``
};

type PlayListState = {
  tags: any[] | null;
  cTag: string;
};

/**
 * 发现音乐--歌单
 */
export default class PlayList extends React.Component<any, PlayListState> {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      cTag: "全部"
    };
  }

  public componentDidMount() {
    new PlayListService().getHotTags(new RequestParams()).subscribe(data => {
      this.setState({
        tags: data.tags
      });
    });
  }

  public render() {
    return (
      <components.Wrapper>
        <CategoryPanel
          onChange={name => this.setState({ cTag: name })}
        ></CategoryPanel>
        {this.getTagsElement()}
        <PlayListDetail tag={this.state.cTag}></PlayListDetail>
      </components.Wrapper>
    );
  }

  private getTagsElement() {
    if (!this.state.tags) return <div />;
    return (
      <components.Tags className="flex-row">
        <div>热门标签:</div>
        {this.state.tags.map(item => (
          <div key={item.id} className="tag">
            <span
              className="tag-btn"
              onClick={() => this.setState({ cTag: item.name })}
            >
              {item.name}
            </span>
          </div>
        ))}
      </components.Tags>
    );
  }
}
