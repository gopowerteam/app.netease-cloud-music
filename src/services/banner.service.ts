import { BannerController } from '../config/services/banner.controller'
import { Request, RequestParams } from '../core/http'
import { Observable } from 'rxjs'

/**
 * Banner API服务
 */
export class BannerService {
  /**
   * 查询Banner
   * @param requestParams
   */
  @Request({
    server: BannerController.banner
  })
  public getBanner(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
