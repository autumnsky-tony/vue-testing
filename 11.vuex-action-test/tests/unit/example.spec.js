import actions from "@/store/actions.js"

// mutation과 마찬가지로 action 또한 분리 테스트가 가능함

// 일반적인 action logic => 테스트 포커싱
// 1. API 비동기 호출 => API의 엔드포인트가 정확한가?
// 2. response를 통한 데이터 처리 => 처리된 페이로드가 정확한가?
// 3. payload의 결과로 뮤테이션 커밋 => 뮤테이션이 올바르게 커밋되었는가?


// 실제 api 서버로 요청을 보낼 수 없기 때문에 (실제로 보내도 ㄱㅊ)
// (테스트 예시를 위해) 요청 및 응답을 위한 promise를 mock

let url = ''
let body = {}
let mockError = false


jest.mock("axios", () => ({
  post: (_url, _body) => { 
    return new Promise((resolve) => {
      if (mockError) 
        throw Error("Mock error")

      url = _url
      body = _body
      resolve(true)
    })
  }
}))


describe("authenticate", () => {
  // api 호출에 성공 했을 때의 then 처리 테스트
  it("authenticated a user", async () => {
    const commit = jest.fn()
    const username = "alice"
    const password = "password"

    await actions.authenticate({ commit }, { username, password })

    expect(url).toBe("/api/authenticate")
    expect(body).toEqual({ username, password })
    expect(commit).toHaveBeenCalledWith(
      "SET_AUTHENTICATED", true)
  })

  // api 호출에 실패 했을 때의 catch 처리 테스트
  it("catches an error", async () => {
    mockError = true

    await expect(actions.authenticate({ commit: jest.fn() }, {}))
      .rejects.toThrow("API Error occurred.")
  })
})