import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";
import { PlayListController } from "~/config/services/playlist.controller";
import { TopController } from "~/config/services/top.controller";

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
   * 获取歌单收藏者
   * @param requestParams
   */
  @Request({
    server: PlayListController.subscribers
  })
  public getPlayListSubscribers(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 获取所以标签
   * @param requestParams
   */
  @Request({
    server: PlayListController.catlist
  })
  public getAllTags(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 获取热门标签
   * @param requestParams
   */
  @Request({
    server: PlayListController.hot
  })
  public getHotTags(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 查询热门歌单
   * @param requestParams
   */
  @Request({
    server: TopController.playlist
  })
  public getPlayListByTag(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
