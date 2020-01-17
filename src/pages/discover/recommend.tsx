import React, { Component } from "react";
import styled from "styled-components";
import { Carousel, Icon } from "antd";
import { BannerService } from "~/services/banner.service";
import { RequestParams } from "~/core/http";
import { PersonalizedService } from "~/services/personalized.service";
import { ReactComponent as CanlendarSvg } from "~/assets/icons/calendar.svg";
import SongListItem from "~/components/items/songlist-item";
import PrivateContentItem from "~/components/items/private-content-item";
import MusicItem from "~/components/items/music-item";
import MVItem from "~/components/items/mv-item";
import RadioItem from "~/components/items/radio-item";
const components = {
  Wrapper: styled.section`
    padding: 10px 0;
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
    .margin-bottom {
      margin-bottom: 30px;
    }
  `,
  TodaySongListItem: styled.div`
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
  `,
  NewMusicContainer: styled.div`
    .container {
      height: 500px;
    }
  `,
  MusicItemWrapper: styled(MusicItem)`
    width: 50%;
    height: 100px;
    background: red;
    padding: 10px;
  `
};

interface RecommendState {
  banners: any[];
  recommends: any[];
  privates: any[];
  songs: any[];
  mv: any[];
  radios: any[];
}

// 使用通过hooks创建通过component访问的store
export default class Recommend extends Component<{}, RecommendState> {
  private bannerService = new BannerService();
  private personalizedService = new PersonalizedService();

  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      recommends: [],
      privates: [],
      songs: [],
      mv: [],
      radios: []
    };
  }

  public render() {
    return (
      <components.Wrapper>
        {this.getBannerContainer()}
        {this.getSongListContainer()}
        {this.getPrivateContainer()}
        {this.getNewSongContainer()}
        {this.getMVContainer()}
        {this.getRadioContainer()}
      </components.Wrapper>
    );
  }

  public componentDidMount() {
    this.getBannerList();
    this.getSongList();
    this.getPrivateContentList();
    this.getNewSongs();
    this.getMVList();
    this.getRadioList();
  }

  /**
   * 获取Banner内容
   */
  public getBannerContainer() {
    return (
      <div className="margin-bottom">
        <Carousel>
          {this.state.banners.map(banner => (
            <img alt="" key={banner.targetId} src={banner.imageUrl}></img>
          ))}
        </Carousel>
      </div>
    );
  }

  /**
   * 获取推荐歌单内容
   */
  public getSongListContainer() {
    return (
      <div className="margin-bottom">
        <div className="flex-row align-items-center margin-bottom">
          <h3>推荐歌单</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="flex-row">
          {this.getTodaySongListItem()}
          {this.state.recommends.map(item => (
            <SongListItem key={item.id} data={item}></SongListItem>
          ))}
        </div>
      </div>
    );
  }

  /**
   * 获取今日歌单内容
   */
  public getTodaySongListItem() {
    return (
      <components.TodaySongListItem>
        <div className="today">
          <img alt="" src={require("../../assets/images/play-bg.jpg")}></img>
          <Icon component={CanlendarSvg as any}></Icon>
        </div>
        <div className="item-name">每日歌曲推荐</div>
        <div className="item-play-count"></div>
      </components.TodaySongListItem>
    );
  }

  /**
   * 获取独家放送内容
   */
  public getPrivateContainer() {
    return (
      <div className="margin-bottom">
        <div className="flex-row align-items-center margin-bottom">
          <h3>独家放送</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="flex-row">
          {this.state.privates.map(item => (
            <PrivateContentItem key={item.id} data={item}></PrivateContentItem>
          ))}
        </div>
      </div>
    );
  }

  public getNewSongContainer() {
    return (
      <components.NewMusicContainer className="margin-bottom">
        <div className="flex-row align-items-center margin-bottom">
          <h3>最新音乐</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="container flex-column flex-wrap">
          {this.state.songs.map((item, index) => (
            <components.MusicItemWrapper
              key={item.id}
              data={item}
              index={index + 1}
            ></components.MusicItemWrapper>
          ))}
        </div>
      </components.NewMusicContainer>
    );
  }

  public getMVContainer() {
    return (
      <div className="margin-bottom">
        <div className="flex-row align-items-center margin-bottom">
          <h3>推荐MV</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="flex-row">
          {this.state.mv.map(item => (
            <MVItem key={item.id} data={item}></MVItem>
          ))}
        </div>
      </div>
    );
  }

  public getRadioContainer() {
    return (
      <div className="margin-bottom">
        <div className="flex-row align-items-center margin-bottom">
          <h3>主播电台</h3>
          <Icon type="right"></Icon>
        </div>
        <div className="flex-row">
          {this.state.radios.map(item => (
            <RadioItem key={item.id} data={item}></RadioItem>
          ))}
        </div>
      </div>
    );
  }

  /**
   * 获取Banner列表
   */
  private getBannerList() {
    this.bannerService
      .getBanner(new RequestParams())
      .subscribe(({ banners }) => {
        this.setState({
          banners
        });
      });
  }

  /**
   * 获取推荐Songlist列表
   */
  private getSongList() {
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

  /**
   * 获取独家放送列表
   */
  public getPrivateContentList() {
    this.personalizedService
      .getPrivateContent(new RequestParams())
      .subscribe(({ result }) => {
        this.setState({
          privates: result
        });
      });
  }

  private getNewSongs() {
    this.personalizedService
      .getNewSongList(new RequestParams())
      .subscribe(({ result }) => {
        this.setState({
          songs: result
        });
      });
  }

  private getMVList() {
    this.personalizedService
      .getMVList(new RequestParams())
      .subscribe(({ result }) => {
        this.setState({
          mv: result
        });
      });
  }

  private getRadioList() {
    this.personalizedService
      .getRadioList(new RequestParams())
      .subscribe(({ result }) => {
        this.setState({
          radios: result
        });
      });
  }
}
