import React, { Component } from "react";
import styled from "styled-components";
import { Carousel } from "antd";
import { BannerService } from "../../services/banner.service";
import { RequestParams } from "../../core/http";
const components = {
  Wrap: styled.section`
    .ant-carousel {
      margin: 30px;

      .slick-slide {
        text-align: center;
        background: #364d79;
        overflow: hidden;
        border-radius: 10px;
      }
    }
  `
};

interface RecommendState {
  banners: any[];
}

// 使用通过hooks创建通过component访问的store
export default class Recommend extends Component<{}, RecommendState> {
  private bannerService = new BannerService();

  constructor(props) {
    super(props);
    this.state = { banners: [] };
  }

  public render() {
    return (
      <components.Wrap>
        <Carousel autoplay>
          {this.state.banners.map(banner => (
            <img key={banner.targetId} src={banner.imageUrl}></img>
          ))}
        </Carousel>
      </components.Wrap>
    );
  }

  public componentDidMount() {
    this.getBannerList();
  }

  public getBannerList() {
    this.bannerService
      .getBanner(new RequestParams())
      .subscribe(({ banners }) => {
        console.log(banners);
        this.setState({
          banners
        });
      });
  }
}
