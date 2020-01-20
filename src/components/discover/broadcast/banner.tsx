import React from "react";
import { Carousel, Tag } from "antd";
import { DjService } from "~/services/dj.service";
import { RequestParams } from "~/core/http";
import styled from "styled-components";

type DjBannerState = {
  banners: any[];
};

const components = {
  Wrapper: styled.div`
    margin: 20px auto;
    .banner-item {
      position: relative;
      .tag {
        position: absolute;
        bottom: 5px;
        right: -7px;
        border-radius: 12px 0 0 12px;
        padding-left: 14px;
      }
    }
  `
};

export default class DjBanner extends React.Component<any, DjBannerState> {
  constructor(props) {
    super(props);
    this.state = {
      banners: []
    };
  }

  public componentDidMount() {
    new DjService().getBanner(new RequestParams()).subscribe(data => {
      this.setState({
        banners: data.data
      });
    });
  }

  public render() {
    return (
      <components.Wrapper>
        <Carousel autoplay>
          {this.state.banners.map(banner => (
            <div className="banner-item" key={banner.targetType}>
              <img alt="" src={banner.pic}></img>
              <Tag className="tag" color="#ff0000cf">
                {banner.typeTitle}
              </Tag>
            </div>
          ))}
        </Carousel>
      </components.Wrapper>
    );
  }
}
