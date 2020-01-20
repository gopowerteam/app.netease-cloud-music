import React from "react";
import { DjService } from "~/services/dj.service";
import { RequestParams } from "~/core/http";
import styled from "styled-components";
import ContentBlock from "~/components/common/content-block";
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
    margin: 10px 0;
    .image {
      height: 120px;
      width: 120px;
      &:hover {
        cursor: pointer;
      }
    }
    .content {
      margin-left: 10px;
      .text {
        color: #7a7a7a;
        line-height: 20px;
        height: 25px;
        font-size: 0.9em;
      }
      .price {
        color: #cd0505;
        font-size: 1.3em;
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
      .getPaygift(new RequestParams({ limit: 4 }))
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
          <components.Item key={index} className="flex-row">
            <img src={item.picUrl} alt="" className="image" />
            <div className="content">
              <h3>{item.name}</h3>
              <div className="text">{item.rcmdText}</div>
              <div className="text">
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
