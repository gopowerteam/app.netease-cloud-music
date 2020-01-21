import React from "react";
import styled from "styled-components";
import { Button, Popover, Icon, Radio } from "antd";
import { PlayListService } from "~/services/playlist.service";
import { RequestParams } from "~/core/http";

const components = {
  Wrapper: styled.div``,
  Panel: styled.div`
    width: 520px;
    height: 300px;
    overflow-y: auto;

    .activated {
      border-color: red;
      color: red;
    }
  `,
  TypeItem: styled.div`
    margin: 5px 0;
    .type-name {
      flex-basis: 80px;
    }
    .cates {
      flex: 1;
      .ant-btn {
        width: 80px;
        font-size: 12px;
      }
    }
    .hot {
      color: red;
    }
  `
};

type CategoryProp = {
  onChange: (name: string) => void;
};

type CategoryState = {
  cTag: string;
  resData: {
    all: cateInfo;
    sub: cateInfo[];
    categories: { [key: string]: string };
  } | null;
};

interface cateInfo {
  name: string;
  category: string;
  hot: boolean;
}

export default class CategoryPanel extends React.Component<
  CategoryProp,
  CategoryState
> {
  constructor(props) {
    super(props);
    this.state = {
      cTag: "",
      resData: null
    };
  }

  public componentDidMount() {
    new PlayListService().getAllTags(new RequestParams()).subscribe(data => {
      this.setState({
        cTag: data.all.name,
        resData: data
      });
    });
  }

  public render() {
    if (!this.state.resData) return <components.Wrapper></components.Wrapper>;
    return (
      <components.Wrapper>
        <Popover
          style={{ padding: 0 }}
          title="选择标签"
          trigger="click"
          placement="bottomLeft"
          content={this.getContent()}
        >
          <Button>
            {this.state.cTag}
            <Icon type="down" />
          </Button>
        </Popover>
      </components.Wrapper>
    );
  }

  private getContent() {
    if (!this.state.resData) return <div></div>;

    const allName = this.state.resData!.all.name;

    return (
      <components.Panel>
        <div>
          <Button
            onClick={() => this.cateChange(allName)}
            className={allName === this.state.cTag ? "activated" : ""}
            block
          >
            {allName}
          </Button>
        </div>
        {Object.entries(this.state.resData.categories).map(([k, v]) => {
          const cates = this.state.resData!.sub.filter(x => x.category == k);
          return (
            <components.TypeItem key={k} className="flex-row">
              <div className="type-name">{v}</div>
              <div className="cates">
                {cates.map(item => (
                  <Button
                    className={item.name === this.state.cTag ? "activated" : ""}
                    key={item.name}
                    onClick={() => this.cateChange(item.name)}
                  >
                    {item.name}
                    {item.hot ? (
                      <Icon type="check-square" className="hot" />
                    ) : (
                      <span />
                    )}
                  </Button>
                ))}
              </div>
            </components.TypeItem>
          );
        })}
      </components.Panel>
    );
  }

  private cateChange(name: string) {
    this.setState({
      cTag: name
    });
    this.props.onChange(name);
  }
}
