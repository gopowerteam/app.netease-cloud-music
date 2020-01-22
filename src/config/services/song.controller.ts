import { RequestMethod } from "../../core/http";
import { ControllerConfig } from "../type.config";

const Controller = "song";

/**
 * 歌曲接口配置
 */
export const SongController: ControllerConfig = {
  detail: {
    controller: Controller,
    action: 'detail',
    type: RequestMethod.Get
  },
  url: {
    controller: Controller,
    action: 'url',
    type: RequestMethod.Get
  }
};
