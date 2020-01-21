import React from "react";
import { DjService } from "~/services/dj.service";
import { RequestParams } from "~/core/http";
import styled from "styled-components";

type CateListState = {
  categories: CateInfo[] | null;
};

export type CateInfo = {
  id: string;
  name: string;
  picUrl: string;
};

type CateListProps = {
  onload: (data: CateInfo[]) => void;
};

const components = {
  Wrapper: styled.div`
    margin: 20px auto;

    .item-group {
      & > div {
        display: inline-block;
      }
    }
  `,

  Item: styled.div`
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2e8;
      border-radius: 5px;
    }
    width: 80px;
    padding: 10px 0;
    margin: 0 20px;

    .item-icon {
      height: 32px;
      width: 32px;
      background-size: cover;
      padding: 10px auto;
      margin: auto;
    }
    .item-name {
      text-align: center;
      font-size: 0.9em;
    }
  `
};

export default class CateList extends React.Component<
  CateListProps,
  CateListState
> {
  constructor(props) {
    super(props);
    this.state = {
      categories: null
    };
  }

  public componentDidMount() {
    new DjService().getCateList(new RequestParams()).subscribe(data => {
      this.setState({
        categories: data.categories.map(x => {
          return {
            name: x.name,
            id: x.id,
            picUrl: x.picWebUrl
          };
        })
      });
      this.props.onload(this.state.categories!.splice(0, 5));
    });
  }

  public render() {
    if (!this.state.categories) {
      return <div></div>;
    }
    return (
      <components.Wrapper className="flex-row">
        {this.state.categories.map((item, index) => {
          return (
            <components.Item key={index}>
              <div
                className="item-icon"
                style={{ backgroundImage: `url(${item.picUrl})` }}
              />
              <div className="item-name">{item.name}</div>
            </components.Item>
          );
        })}
      </components.Wrapper>
    );
  }
}
