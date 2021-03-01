import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import VueRouter from "vue-router"
import NestedRoute from "@/components/NestedRoute.vue"
import NestedRouteQuery from "@/components/NestedRouteQuery.vue"
import routes from "@/router/routes.js"

// 앞선 vuex 테스트와 마찬가지로 전역 객체를 오염시키지 않기 위해서 사용하는 방식
// 임시(로컬) Vue 객체를 생성해서 거기에 Router를 전달
const localVue = createLocalVue()
localVue.use(VueRouter)


describe("App", () => {
  it("라우팅을 통해서 자식 컴포넌트를 렌더한다", async () => {
    const router = new VueRouter({ routes })
    
    // mount를 사용해서 router-view의 실제 랜더 상태를 확인해야함!
    const wrapper = mount(App, { 
      localVue,
      router
    })
    // console.log(wrapper.html())

    // shallow mount 의 경우 : 쓸모없는 스텁 컴포넌트가 랜더됨
    // const wrapper = shallowMount(App, { 
    //   localVue,
    //   router
    // })
    // // <router-view-stub name="default"></router-view-stub>
    // console.log(wrapper.html())
    

    // router의 push를 발생
    router.push("/nested-route")
    // 반응성 비동기 작업 확인
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(NestedRoute).exists()).toBe(true)
  })

  it("쿼리 스트링으로부터 username을 렌더한다", () => {
    const username = 'tony'
    const wrapper = shallowMount(NestedRouteQuery, {
      mocks: {
        $route: {
          params: { username }
        }
      }
    })
  
    expect(wrapper.find(".username").text()).toBe(username)
  })
})