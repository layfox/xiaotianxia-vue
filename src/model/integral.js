/* eslint-disable class-methods-use-this */
import { get } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Integral {
  // constructor() {}

  // 获取积分列表，可通过用户名筛选
  async getIntegral(data) {
    const res = await get('v1/integral', data)
    return res
  }
}

export default new Integral()
