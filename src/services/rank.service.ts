import { TopListController } from "../config/services/top-list.controller";
import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";

/**
 * 排行榜 API服务
 */
export class RankService {
  /**
   * 查询歌手排行
   * @param requestParams
   */
  @Request({
    server: TopListController.topArtists
  })
  public getTopArtists(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 查询排行榜歌单
   * @param requestParams
   */
  @Request({
    server: TopListController.topList
  })
  public getTopList(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
