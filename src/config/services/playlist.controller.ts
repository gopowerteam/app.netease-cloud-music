import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '../type.config'

// 控制器名称
const controller = 'playlist'

/**
 * Banner接口配置
 */
export const PlayListController: ControllerConfig = {
  // 获取PlayListDetail
  detail: {
    controller,
    action: 'detail',
    type: RequestMethod.Get
  }
}
