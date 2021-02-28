import { shallowMount, mount } from '@vue/test-utils'
import ParentWithAPICallChild from '@/components/ParentWithAPICallChild.vue'
import ComponentWithAsyncCall from '@/components/ComponentWithAsyncCall.vue'

describe('ParentWithAPICallChild.vue', () => {
  // it('마운트로 렌더하고 API 호출을 초기화한다', () => {
  //   const wrapper = mount(ParentWithAPICallChild)

  //   // expect(wrapper.find(ComponentWithAsyncCall).exists()).toBe(true)
  //   // [vue-test-utils]: finding components with `find` or `get` is deprecated and will be removed in the next major version. Use `findComponent` and `getComponent` instead.
  //   expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)

    
  // })

  // 우리가 검사하고 싶은건 자식 컴포넌트의 호출 상태가 아님!
  // 아주 단순하게 ComponentWithAsyncCall 라는 컴포넌트를 랜더하는가? 만 궁금함

  it('마운트로 렌더하고 API 호출을 초기화한다', () => {
    const wrapper = mount(ParentWithAPICallChild, {
      // stub 동작으로 내부 methods들은 전부 깡통으로 대체됨!
      stubs: {
        ComponentWithAsyncCall: true

        // ComponentWithAsyncCall: "<div class='stub'></div>"
        // Using a string for stubs is deprecated and will be removed in the next major version.
      }
    })
    // 자식 컴포넌트의 created 단계의 console log가 없어짐을 확인해보자
    expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)
  })

  it('shallowMount로 렌더하고 API 호출을 호기화 하지 않는다', () => {
    // shallowMount : 다른 컴포넌트를 자동으로 스텁 (default 동작)
    const wrapper = shallowMount(ParentWithAPICallChild)
  
    expect(wrapper.findComponent(ComponentWithAsyncCall).exists()).toBe(true)
  })
})
