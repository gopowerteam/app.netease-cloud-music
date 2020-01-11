import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '../type.config'

// 控制器名称
const controller = 'personalized'

/**
 * personalized接口配置
 */
export const PersonalizedController: ControllerConfig = {
  // 获取Banner
  personalized: {
    controller,
    type: RequestMethod.Get
  },
  // 推荐新音乐
  newsong: {
    controller,
    action: "newsong",
    type: RequestMethod.Get
  },
  // 推荐电台
  djprogram: {
    controller,
    action: "djprogram",
    type: RequestMethod.Get
  },
  // 独家放送
  privatecontent: {
    controller,
    action: "privatecontent",
    type: RequestMethod.Get
  }
}
