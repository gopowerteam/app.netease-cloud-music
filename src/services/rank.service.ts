import { TopController } from "../config/services/top.controller";
import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";

/**
 * 排行榜 API服务
 */
export class RankService {
  /**
   * 查询排行榜
   * @param requestParams
   */
  @Request({
    server: TopController.list
  })
  public getTopSongList(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
