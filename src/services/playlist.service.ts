import { Request, RequestParams } from '../core/http'
import { Observable } from 'rxjs'
import { PlayListController } from '~/config/services/playlist.controller'

/**
 * Banner API服务
 */
export class PlayListService {
  /**
   * 查询Banner
   * @param requestParams
   */
  @Request({
    server: PlayListController.detail
  })
  public getPlayListDetail(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
