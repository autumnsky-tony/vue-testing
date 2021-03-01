import Vuex from "vuex"
import { createLocalVue, mount } from "@vue/test-utils"
import ComponentWithButtons from "@/components/ComponentWithButtons.vue"

// state & getters 와 마찬가지로 임시 Vue 객체를 생성해서 진행 할 수 있음
// 임시 Vue 객체를 사용하는 이유?
// 전역 Vue 인스턴스가 오염될 수 있음 => 테스트 환경을 최대한 분리하고자 하는 목적성이 보임
const localVue = createLocalVue()
localVue.use(Vuex)

// mutation 및 action의 일반적인 로직은 다음과 같음
// 1. 비동기 요청 발생
// 2. 응답에 따른 데이터 처리
// 3. 데이터 커밋

// 현재 우리가 원하는 것은?  action 및 mutation
// 3번 테스트 : 커밋을 위한 payload가 잘 구성되었는가? & 정확한 뮤테이션을 커밋했는가?

const mutations = {
  testMutation: jest.fn()
}

const store = new Vuex.Store({
  mutations,
})

describe("ComponentWithButtons", () => {
  it("commits a mutation when a button is clicked", async () => {
    // 임시 Vue 객체 전달해서 mutation 테스트하기
    const wrapper = mount(ComponentWithButtons, {
      store, localVue
    })

    wrapper.find(".commit").trigger("click")
    // 비동기 요청 : 반응성 시스템을 통해 DOM이 업데이트 되었는지 확인하는 로직
    await wrapper.vm.$nextTick()

    // mutation에는 jest의 mock함수가 들어있음! toHavaBeenCalledWith에 2개의 인자를 넣어주게 되는데
    expect(mutations.testMutation).toHaveBeenCalledWith(
      // 현재 상태
      {},
      // payload
      { msg: "Test Commit" }
    )
  })

  it("dispatches an action when a button is clicked", async () => {
    // mock을 통해 action 테스트하기
    const mockStore = { dispatch: jest.fn() }
    
    const wrapper = mount(ComponentWithButtons, {
      mocks: {
        $store: mockStore 
      }
    })

    wrapper.find(".dispatch").trigger("click")
    await wrapper.vm.$nextTick()
    
    // mockStore의 dispatch는 jest의 mock함수! toHavaBeenCalledWith에 2개의 인자를 넣어주게 되는데
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      // 액션 핸들러
      "testAction", { msg: "Test Dispatch" })
  })


  it("dispatch a namespaced action when button is clicked", async () => {
    // 실제 Vuex 스토어 전달 + mock dispatch method
    // 1. 액션이 올바른 인자와 함께 디스패치 되었는가?
    // 2. 뮤테이션이 정상적으로 커밋되었는가?

    // Vuex Store
    const store = new Vuex.Store()
    // mock dispatch method
    store.dispatch = jest.fn()

    // store 전달
    const wrapper = mount(ComponentWithButtons, {
      store, localVue
    })

    // dispatch 발생시키기
    wrapper.find(".namespaced-dispatch").trigger("click")
    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith(
      // action type(name)
      'namespaced/very/deeply/testAction',
      // payload
      { msg: "Test Namespaced Dispatch" }
    )
  })
})