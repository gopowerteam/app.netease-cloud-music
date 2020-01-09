import { RequestParams } from './request-params'
export abstract class ExtendService {
  public before!: (params: RequestParams) => any

  public after!: (option, params: RequestParams) => any
}
