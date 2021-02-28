import Vuex from "vuex"
import { mount, createLocalVue } from "@vue/test-utils"
import ComponentWithVuex from "@/components/ComponentWithVuex.vue"
import ComponentWithGetters from "@/components/ComponentWithGetters.vue"


// 임시 Vue 인스턴스
const localVue = createLocalVue()
localVue.use(Vuex)

// 임시 인스턴스에 Vuex Store 넘기기
const store = new Vuex.Store({
  state: {
    username: "alice",
    firstName: "Alice",
    lastName: "Doe"
  },

  getters: {
    fullname: (state) => state.firstName + " " + state.lastName
  }
})

describe("ComponentWithVuex", () => {
  it("renders a username using a real Vuex store", () => {
    // 전역 객체 $store를 사용하는 컴포넌트에 실제 store 객체와 임시 Vue 객체를 전달(object)
    const wrapper = mount(ComponentWithVuex, { store, localVue })
    // 마운트되었기 때문에 username이라는 클래스를 찾을 수 있는 상황
    // 해당 텍스트가 alice로(정상적으로) 마운트 되었는지 확인하면 끝!
    expect(wrapper.find(".username").text()).toBe("alice")
  })

  it("renders a username using a mock store", () => {
    // 아에 store를 mock 할 수도 있다!
    const wrapper = mount(ComponentWithVuex, {
      mocks: {
        $store: {
          state: { username: "alice" }
        }
      }
    })
    // 결과는 마찬가지로 잘 마운트 되었는지만 확인
    expect(wrapper.find(".username").text()).toBe("alice")
  })
})

describe("ComponentWithGetters", () => {
  it("renders a username using a real Vuex getter", () => {
    const wrapper = mount(ComponentWithGetters, { store, localVue })

    expect(wrapper.find(".fullname").text()).toBe("Alice Doe")
  })

  it("renders a username using computed mounting options", () => {
    const wrapper = mount(ComponentWithGetters, {
      mocks: {
        $store: {
          getters: {
            fullname: "Alice Doe"
          }
        }
      }
    })

    expect(wrapper.find(".fullname").text()).toBe("Alice Doe")
  })

  it("renders a username using computed mounting options", () => {
    const wrapper = mount(ComponentWithGetters, {
      computed: {
        fullname: () => "Alice Doe"
      }
    })

    expect(wrapper.find(".fullname").text()).toBe("Alice Doe")
  })
})