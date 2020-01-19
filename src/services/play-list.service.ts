import { PlayListController } from "../config/services/play-list.controller";
import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";

/**
 * 歌单服务
 */
export class PlayListService {
  /**
   * 查询歌单详情
   * @param requestParams
   */
  @Request({
    server: PlayListController.detail,
    force: true
  })
  public getDetail(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
