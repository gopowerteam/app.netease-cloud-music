import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

const Controller = "toplist";

/**
 * 排行榜接口配置
 */
export const TopListController: ControllerConfig = {
  /**
   * 排行项目列表
   */
  topList: {
    controller: Controller,
    type: RequestMethod.Get
  },
  /**
   * 歌手详情
   */
  topArtists: {
    controller: Controller,
    action: "artist",
    type: RequestMethod.Get
  }
};
