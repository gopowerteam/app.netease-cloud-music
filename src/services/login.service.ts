import { Request, RequestParams } from '../core/http'
import { Observable } from 'rxjs'
import { LoginController } from '~/config/services/login.controller'

/**
 * Login API服务
 */
export class LoginService {
  /**
   * 登录
   * @param requestParams
   */
  @Request({
    server: LoginController.login
  })
  public login(requestParams: RequestParams): Observable<any> {
    return requestParams.request()
  }
}
