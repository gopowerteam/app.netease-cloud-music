import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

/**
 * 排行榜接口配置
 */
export const TopController: ControllerConfig = {
  // 排行榜
  list: {
    controller: "top",
    action: "list",
    type: RequestMethod.Get
  },
  /**
   * 排行项目列表
   */
  rankItems: {
    controller: "toplist",
    type: RequestMethod.Get
  }
};
