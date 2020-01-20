import { Request, RequestParams } from '../core/http'
import { Observable } from 'rxjs'
import { CommentController } from '../config/services/comment.controller'

/**
 * Banner API服务
 */
export class CommentService {
  /**
   * 查询Banner
   * @param requestParams
   */
  @Request({
    server: CommentController.playlist
  })
  public getPlayListComment(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
