import { ExtendService } from '../http'

export class PageService extends ExtendService {
  public default = {
    pageSize: 20,
    pageIndex: 1,
    total: 0,
    pageSizeOpts: [20, 50, 100, 200]
  }
  public pageSize: number
  public pageIndex: number
  public total: number
  public pageSizeOpts: number[]

  constructor(data?: any) {
    super()

    if (data) this.default = { ...this.default, ...data }

    this.pageSize = this.default.pageSize
    this.pageIndex = this.default.pageIndex || 1
    this.total = this.default.total
    this.pageSizeOpts = this.default.pageSizeOpts
  }



  public before = params => {
    params.data = {
      ...params.data,
      limit: this.pageSize,
      offset: (this.pageIndex - 1) * this.pageSize
    }
  }

  public after = (data: any, params) => {
    if (data.total) {
      this.total = data.total
    }
  }

  public reset() {
    this.pageIndex = this.default.pageIndex
    this.pageSize = this.default.pageSize
  }
}
