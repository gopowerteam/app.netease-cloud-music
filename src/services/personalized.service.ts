import { PersonalizedController } from '../config/services/personalized.controller'
import { Request, RequestParams } from '../core/http'
import { Observable } from 'rxjs'
/**
 * Banner API服务
 */
export class PersonalizedService {
  /**
   * 查询推荐歌单
   * @param requestParams
   */
  @Request({
    server: PersonalizedController.personalized,
  })
  public getPersonalized(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
   * 查询独家放送
   * @param requestParams
   */
  @Request({
    server: PersonalizedController.privatecontent
  })
  public getPrivateContent(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
  * 查询最新音乐
  * @param requestParams
  */
  @Request({
    server: PersonalizedController.newsong
  })
  public getNewSongList(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }

  /**
  * 查询MV
  * @param requestParams
  */
  @Request({
    server: PersonalizedController.mv
  })
  public getMVList(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
  /**
   * 推荐电台
   * @param requestParams
   */
  @Request({
    server: PersonalizedController.djprogram
  })
  public getRadioList(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}


