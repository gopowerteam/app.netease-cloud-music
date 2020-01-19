import { RequestMethod } from '../../core/http'
import { ControllerConfig } from '../type.config'

// 控制器名称
const controller = 'comment'

/**
 * 接口配置
 */
export const CommentController: ControllerConfig = {
  // 获取歌单评论
  playlist: {
    controller,
    action: 'playlist',
    type: RequestMethod.Get
  }
}
