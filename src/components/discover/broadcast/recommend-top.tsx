import React from "react";
import { DjService } from "~/services/dj.service";
import { RequestParams } from "~/core/http";
import styled from "styled-components";
import { Consumer } from "reto";
import { RouterStore } from "~/store/router.store";

type RecommendTypeState = {
  items: any;
};

type RecommendTypeProp = {
  typeId: string;
};

const components = {
  Wrapper: styled.div`
    height: 200px;
    justify-content: space-between;
    overflow: hidden;
    margin-bottom: 20px;
  `,
  Block: styled.div`
    width: 150px;
    margin: 10px 0;
    &:hover {
      cursor: pointer;
    }
    .pic {
      position: relative;
      .img {
        height: 150px;
        width: 150px;
      }
      .name {
        position: absolute;
        bottom: 0;
        width: 150px;
        color: #fff;
        font-size: 0.8em;
        height: 25px;
        line-height: 20px;
        padding: 5px;
        background-image: linear-gradient(0, #00000085, #00000000);
      }
    }
    .rc-text {
      font-size: 0.9em;
    }
  `
};

export default class RecommendType extends React.Component<
  RecommendTypeProp,
  RecommendTypeState
> {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
  }

  public componentDidMount() {
    new DjService()
      .queryRecommendByType(new RequestParams({ type: this.props.typeId }))
      .subscribe(data => {
        this.setState({
          items: data.djRadios.slice(0, 6)
        });
      });
  }

  public render() {
    if (!this.state.items) {
      return <components.Wrapper />;
    }
    return (
      <components.Wrapper className="flex-row">
        <Consumer of={RouterStore}>
          {routerStore =>
            this.state.items.map((item, index) => (
              <components.Block
                key={index}
                className="block"
                onClick={() => {
                  routerStore.history.push(`/detail/song-list/${item.id}`);
                }}
              >
                <div className="pic">
                  <img src={item.picUrl} alt="" className="img" />
                  <div className="name">{item.name}</div>
                </div>
                <div className="rc-text">{item.rcmdtext}</div>
              </components.Block>
            ))
          }
        </Consumer>
      </components.Wrapper>
    );
  }
}
