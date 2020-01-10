import React, { Component, Props } from "react";
import styled from "styled-components";
import { Carousel, Icon } from "antd";
import { BannerService } from "../../services/banner.service";
import { RequestParams } from "../../core/http";
import { PersonalizedService } from "../../services/personalized.service";

const components = {
  Wrap: styled.section`
    .ant-carousel {
      .slick-slide {
        text-align: center;
        background: #364d79;
        overflow: hidden;
        border-radius: 10px;
      }
    }
    h3 {
      margin-bottom: 0;
      margin-right: 5px;
    }
  `,
  RecommendItem: styled.div`
    width: 20%;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    img {
      width: 100%;
      border-radius: 10px;
    }

    .item-name {
      height: 3em;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .item-play-count {
      /* width: 0;
      height: 0;
      border: 50px solid transparent;
      border-left: 50px solid yellow;
      position: absolute;
      left: 0;
      right: 0; */
    }
  `
};

const styles = (
  props?: Props<any>
): { [key: string]: React.CSSProperties } => ({
  margin: {
    margin: "30px 0"
  },
  nomargin: {
    marginBottom: "0!important"
  }
});

interface RecommendState {
  banners: any[];
  recommends: any[];
}

// 使用通过hooks创建通过component访问的store
export default class Recommend extends Component<{}, RecommendState> {
  private bannerService = new BannerService();
  private personalizedService = new PersonalizedService();

  constructor(props) {
    super(props);
    this.state = { banners: [], recommends: [] };
  }

  public render() {
    return (
      <components.Wrap>
        {this.getBannerContainer()}
        {this.getRecommendContainer()}
      </components.Wrap>
    );
  }

  public componentDidMount() {
    this.getBannerList();
    this.getRecommendList();
  }

  public convertPlayCount(count) {
    if (count > 10000) {
      return `${Math.floor(count / 10000)}万`;
    } else {
      return count;
    }
  }

  public getBannerList() {
    this.bannerService
      .getBanner(new RequestParams())
      .subscribe(({ banners }) => {
        this.setState({
          banners
        });
      });
  }

  public getRecommendList() {
    this.personalizedService
      .getPersonalized(
        new RequestParams({
          limit: 9
        })
      )
      .subscribe(({ result }) => {
        console.log(result);
        this.setState({
          recommends: result
        });
      });
  }

  public getBannerContainer() {
    return (
      <Carousel autoplay style={styles().margin}>
        {this.state.banners.map(banner => (
          <img key={banner.targetId} src={banner.imageUrl}></img>
        ))}
      </Carousel>
    );
  }

  public getRecommendContainer() {
    return (
      <section>
        <div className="flex-row align-items-center">
          <h3>推荐歌单</h3>
          <Icon type="right"></Icon>
          <div className="flex-row">
            {this.state.recommends.map(item => (
              <components.RecommendItem key={item.id}>
                <img src={item.picUrl}></img>
                <div className="item-name">{item.name}</div>
                <div className="item-play-count"></div>
              </components.RecommendItem>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
