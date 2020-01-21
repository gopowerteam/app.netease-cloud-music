import React from "react";
import { DjService } from "~/services/dj.service";
import { RequestParams } from "~/core/http";
import styled from "styled-components";
import { Icon } from "antd";

type PayGiftState = {
  items: any[] | null;
};

const components = {
  Wrapper: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
  `,
  Item: styled.div`
    width: 100%;
    height: 120px;
    margin: 10px 0;
    .image {
      flex-basis: 120px;
      height: 100%;
      &:hover {
        cursor: pointer;
      }
    }
    .content {
      flex: 1;
      padding: 0 5px;
      .title {
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
      .text {
        line-height: 20px;
        height: 20px;
        font-size: 12px;
        color: #797777b8;
      }
      .price {
        color: #cd0505;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
      }
    }
  `
};

export default class PayGift extends React.Component<any, PayGiftState> {
  constructor(props) {
    super(props);
    this.state = {
      items: null
    };
  }

  public componentDidMount() {
    new DjService()
      .queryPaygift(new RequestParams({ limit: 4 }))
      .subscribe(data => {
        this.setState({
          items: data.data.list
        });
      });
  }

  public render() {
    if (!this.state.items) {
      return <div />;
    }
    return (
      <components.Wrapper>
        {this.state.items.map((item, index) => (
          <components.Item key={index} className="flex-row flex-nowrap">
            <div className="pic">
              <img src={item.picUrl} alt="" className="image" />
            </div>
            <div className="content">
              <h4 className="title">{item.name}</h4>
              <div className="text text-hidden">{item.rcmdText}</div>
              <div className="text text-hidden">
                <Icon type="caret-right" />
                {item.lastProgramName}
              </div>
              <div className="price">
                {this.moneyFormat(item.originalPrice)}
              </div>
            </div>
          </components.Item>
        ))}
      </components.Wrapper>
    );
  }

  private moneyFormat(value: number) {
    let r = (value / 100).toFixed(0);
    return "￥" + r;
  }
}
