import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

const Controller = "playlist";

/**
 * 歌单接口配置
 */
export const PlayListController: ControllerConfig = {
  // 排行榜
  detail: {
    controller: Controller,
    action: "detail",
    type: RequestMethod.Get
  }
};
