import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '../type.config'

// 控制器名称
const controller = 'banner'

/**
 * Banner接口配置
 */
export const BannerController: ControllerConfig = {
  // 获取Banner
  banner: {
    controller,
    type: RequestMethod.Get
  }
}
