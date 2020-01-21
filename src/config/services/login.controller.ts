import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '../type.config'

// 控制器名称
const controller = 'login'

/**
 * 接口配置
 */
export const LoginController: ControllerConfig = {
  // 获取Banner
  login: {
    controller,
    type: RequestMethod.Get
  }
}
