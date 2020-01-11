import React, { Component, Props } from "react";
import styled from "styled-components";
import { Carousel, Icon } from "antd";
import { BannerService } from "../../services/banner.service";
import { RequestParams } from "../../core/http";
import { PersonalizedService } from "../../services/personalized.service";
import { ReactComponent as CanlendarSvg } from "../../assets/icons/calendar.svg";
import { ReactComponent as PlaySvg } from "../../assets/icons/play.svg";

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
    cursor: pointer;

    img {
      width: 100%;
      border-radius: 10px;
    }

    .today {
      position: relative;

      i {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          height: 50%;
          width: 50%;
        }

        &::after {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          color: #fff;
          font-weight: bold;
          margin-top: 15%;
          content: "${new Date().getDate()}";
          transform: scaleY(1.25);
        }
      }
    }

    .img-container{
      position: relative;

      .item-play-count {
        position:absolute;
        top:5px;
        right:5px;
        font-size:12px;
        color:#fff;
        fill:#fff;
        i{
          margin-right:3px;
        }
      }

      .item-play-icon{
        display:none;
        position: absolute;
        right: 10px;
        bottom: 10px;
        width:30px;
        height:30px;
        border-radius:30px;
        background-color:rgba(255,255,255,0.4);
      
        justify-content: center;
        align-items: center;
        svg{
          width:20px;
          height:20px;
          fill: red;
        }
      }

      &:hover{
        .item-play-icon{
          display: flex;
        }
      }
    }

    .item-name {
      margin-top: 5px;
      height: 3em;
      font-size:12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:hover{
        font-weight:500;
      }
    }
  `,
  PrivateItem: styled.div`
    width: 25%;
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      border-radius: 10px;
    }

    .item-name {
      margin-top: 5px;
      height: 3em;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      &:hover {
        font-weight: 500;
      }
    }
  `
};

const styles = (
  props?: Props<any>
): { [key: string]: React.CSSProperties } => ({
  marginBottom: {
    margin: "30px 0"
  }
});

interface RecommendState {
  banners: any[];
  recommends: any[];
  privates: any[];
}

// 使用通过hooks创建通过component访问的store
export default class Recommend extends Component<{}, RecommendState> {
  private bannerService = new BannerService();
  private personalizedService = new PersonalizedService();

  constructor(props) {
    super(props);
    this.state = { banners: [], recommends: [], privates: [] };
  }

  public render() {
    return (
      <components.Wrap>
        {this.getBannerContainer()}
        {this.getRecommendContainer()}
        {this.getPrivateContainer()}
      </components.Wrap>
    );
  }

  public componentDidMount() {
    this.getBannerList();
    this.getRecommendList();
    this.getPrivateContentList();
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
        this.setState({
          recommends: result
        });
      });
  }

  public getPrivateContentList() {
    this.personalizedService
      .getPrivateContent(new RequestParams())
      .subscribe(({ result }) => {
        console.log(result);
        this.setState({
          privates: result
        });
      });
  }

  public getBannerContainer() {
    return (
      <Carousel autoplay style={styles().marginBottom}>
        {this.state.banners.map(banner => (
          <img alt="" key={banner.targetId} src={banner.imageUrl}></img>
        ))}
      </Carousel>
    );
  }

  public getRecommendContainer() {
    return (
      <section style={styles().marginBottom}>
        <div className="flex-row align-items-center margin-bottom">
          <h3>推荐歌单</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="flex-row">
          <components.RecommendItem>
            <div className="today">
              <img
                alt=""
                src={require("../../assets/images/play-bg.jpg")}
              ></img>
              <Icon component={CanlendarSvg as any}></Icon>
            </div>
            <div className="item-name">每日歌曲推荐</div>
            <div className="item-play-count"></div>
          </components.RecommendItem>
          {this.state.recommends.map(item => (
            <components.RecommendItem key={item.id}>
              <div className="img-container">
                <img alt="" src={item.picUrl}></img>
                <div className="item-play-count">
                  <Icon component={PlaySvg as any}></Icon>
                  <span>{this.convertPlayCount(item.playCount)}</span>
                </div>
                <div className="item-play-icon">
                  <Icon type="caret-right" />
                </div>
              </div>
              <div className="item-name">{item.name}</div>
            </components.RecommendItem>
          ))}
        </div>
      </section>
    );
  }

  public getPrivateContainer() {
    return (
      <section style={styles().marginBottom}>
        <div className="flex-row align-items-center margin-bottom">
          <h3>独家放送</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="flex-row">
          {this.state.privates.map(item => (
            <components.PrivateItem key={item.id}>
              <div className="img-container">
                <img alt="" src={item.sPicUrl}></img>
              </div>
              <div className="item-name">{item.name}</div>
            </components.PrivateItem>
          ))}
        </div>
      </section>
    );
  }
}
