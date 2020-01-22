import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";
import { SongController } from "~/config/services/song.controller";

/**
 * 歌曲 API服务
 */
export class SongService {
  /**
   * 歌曲详情
   * @param requestParams
   */
  @Request({
    server: SongController.detail
  })
  public getSongDetail(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
  * 歌曲URL
  * @param requestParams
  */
  @Request({
    server: SongController.url
  })
  public getSongUrl(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
