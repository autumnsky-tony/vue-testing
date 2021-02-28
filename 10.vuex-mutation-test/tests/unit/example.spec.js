import mutations from "@/store/mutations.js"

// mutation의 경우 분리되어 있는 mutations 코드만으로 단독 검사가 가능
// 일반 자바스크립트 함수로 취급할 수 있기 때문!
// 그렇기 때문에 main Vue app에서 독립적으로 테스트하자!

describe("SET_POST", () => {
  it("상태에 post를 추가한다", () => {
    const post = { id: 1, title: "Post" }
    const state = {
      postIds: [],
      posts: {}
    }

    mutations.SET_POST(state, { post })

    expect(state).toEqual({
      postIds: [1],
      posts: { "1": post }
    })
  })
})