import { beforeEach } from "@/router/index.js"
import mockModule from "@/router/bust-cache.js"
import NestedRouteQuery from '@/components/NestedRouteQuery'

jest.mock("@/router/bust-cache.js", () => ({ bustCache: jest.fn() }))

describe("beforeEach", () => {
  afterEach(() => {
    mockModule.bustCache.mockClear()
  })

  it("/user로 이동할 때 캐시를 없앤다", () => {
    const to = {
      matched: [{ meta: { shouldBustCache: true } }]
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(mockModule.bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("/user로 이동할 때 캐시를 없애지 않는다", () => {
    const to = {
      matched: [{ meta: { shouldBustCache: false } }]
    }
    const next = jest.fn()

    beforeEach(to, undefined, next)

    expect(mockModule.bustCache).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })

  it("라우트를 떠날 때 bustCache와 next를 호출한다", async () => {
    const next = jest.fn()
    NestedRouteQuery.beforeRouteLeave(undefined, undefined, next)
  
    expect(mockModule.bustCache).toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})