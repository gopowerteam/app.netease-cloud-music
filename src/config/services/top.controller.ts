import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

// 控制器名称
const controller = "top";

/**
 * 排行榜接口配置
 */
export const TopController: ControllerConfig = {
  // 排行榜
  list: {
    controller,
    action: "list",
    type: RequestMethod.Get
  }
};
