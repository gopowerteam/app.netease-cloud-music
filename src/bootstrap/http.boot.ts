import { RequestService } from "../core/http";
import appConfig from "../config/app.config";

export default function () {
  // 配置服务端信息
  RequestService.setConfig({
    server: appConfig.server,
    timeout: appConfig.timeout
  })

  // 状态拦截器
  RequestService.interceptors.status.use(respone => respone.status === 200)

  // 添加成功拦截器
  RequestService.interceptors.success.use(respone => respone.data)
}