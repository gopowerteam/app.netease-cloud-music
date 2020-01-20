import { Request, RequestParams } from "../core/http";
import { Observable } from "rxjs";
import { DjController } from "~/config/services/dj.controller";

/**
 * Dj 电台 API服务
 */
export class DjService {
  /**
   * 查询Banner
   * @param requestParams
   */
  @Request({
    server: DjController.banner
  })
  public getBanner(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 查询电台分类
   * @param requestParams
   */
  @Request({
    server: DjController.catelist
  })
  public getCateList(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }

  /**
   * 获取付费精选 分页
   * @param requestParams
   */
  @Request({
    server: DjController.paygift
  })
  public getPaygift(requestParams: RequestParams): Observable<any> {
    return requestParams.request();
  }
}
