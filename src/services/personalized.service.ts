import { PersonalizedController } from '../config/services/personalized.controller'
import { Request, RequestParams } from '../core/http'
import { Observable } from 'rxjs'

/**
 * Banner API服务
 */
export class PersonalizedService {
  /**
   * 查询Banner
   * @param requestParams
   */
  @Request({
    server: PersonalizedController.personalized,
  })
  public getPersonalized(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
