import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";
import { PlayListController } from "~/config/services/playlist.controller";

/**
 * Banner API服务
 */
export class PlayListService {
  /**
   * 查询歌单
   * @param requestParams
   */
  @Request({
    server: PlayListController.detail,
    force: true
  })
  public getPlayListDetail(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 查询Banner
   * @param requestParams
   */
  @Request({
    server: PlayListController.subscribers
  })
  public getPlayListSubscribers(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
