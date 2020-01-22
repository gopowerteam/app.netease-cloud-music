import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

// 控制器名称
const controller = "playlist";

/**
 * 歌单 接口配置
 */
export const PlayListController: ControllerConfig = {
  // 获取PlayListDetail
  detail: {
    controller,
    action: "detail",
    type: RequestMethod.Get
  },
  // 获取歌单收藏者
  subscribers: {
    controller,
    action: "subscribers",
    type: RequestMethod.Get
  },
  // 歌单分类
  catlist: {
    controller,
    action: "catlist",
    type: RequestMethod.Get
  },
  // 热门标签（分类）
  hot: {
    controller,
    action: "hot",
    type: RequestMethod.Get
  }
};
