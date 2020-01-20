import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

// 控制器名称
const controller = "dj";

/**
 * DJ接口配置
 */
export const DjController: ControllerConfig = {
  // 获取Banner
  banner: {
    controller,
    action: "banner",
    type: RequestMethod.Get
  },
  // 获取电台分类
  catelist: {
    controller,
    action: "catelist",
    type: RequestMethod.Get
  },
  // 获取付费精选
  paygift: {
    controller,
    action: "paygift",
    type: RequestMethod.Get
  }
};
