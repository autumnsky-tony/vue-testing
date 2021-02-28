import { mount, shallowMount } from "@vue/test-utils"
import Parent from "@/components/Parent.vue"
import Child from "@/components/Child.vue"
import ParentWithManyChildren from '@/components/ParentWithManyChildren'

describe("Parent", () => {
  it("span 태그를 렌더하지 않는다", () => {
    const wrapper = shallowMount(Parent)

    expect(wrapper.find("span").isVisible()).toBe(false)
  })

  it("자식 컴포넌트를 렌더한다", () => {
    const wrapper = shallowMount(Parent, {
      data() {
        return { showChild: true }
      }
    })
    
    // 컴포넌트를 찾을 땐 findComponent를 사용하는 것으로 분리되는게 최신버전인 듯
    expect(wrapper.findComponent(Child).exists()).toBe(true)
    // import 없이도 가능
    expect(wrapper.findComponent({ name: "Child" }).exists()).toBe(true)
  })

  it("다수의 자식을 렌더한다", () => {
    const wrapper = shallowMount(ParentWithManyChildren)
  
    // findAll 도 마찬가지 component를 찾을 땐 명시적인 메서드를 사용하는 것으로 이해하자
    // expect(wrapper.findAll(Child).length).toBe(3)
    expect(wrapper.findAllComponents(Child).length).toBe(3)
  })
})
