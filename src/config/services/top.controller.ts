import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

const Controller = "top";

/**
 * 热门推荐
 */
export const TopController: ControllerConfig = {
  /**
   * 排行项目列表
   */
  playlist: {
    controller: Controller,
    action: "playlist",
    type: RequestMethod.Get
  }
};
