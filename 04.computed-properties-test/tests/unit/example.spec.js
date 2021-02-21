import { mount } from "@vue/test-utils"
import NumberRenderer from "@/components/NumberRenderer.vue"

describe("NumberRenderer", () => {
  it("renders even numbers", () => {
    const wrapper = mount(NumberRenderer, {
      propsData: {
        even: true
      }
    })

    expect(wrapper.text()).toBe("2, 4, 6, 8")
  })

  it("renders odd numbers", () => {
    const localThis = { even: false }
  
    // yarn test:unit passes!
    // expect(NumberRenderer.computed.numbers.call(localThis)).toBe("2, 4, 6, 8")

    // yarn test:unit failed! >>> NumberRenderer.vue 에서 커버하고 나면 passes!
    expect(NumberRenderer.computed.numbers.call(localThis)).toBe("1, 3, 5, 7, 9")
  })
})

// call or mount?
// Both techniques presented are useful for testing computed properties. 
// 1. You are testing a component that does some time consuming operations in a lifecycle methods you would like to avoid executing in your computed unit test.
// 2. You want to stub out some values on this. Using call and passing a custom context can be useful.

// Of course, you want to make sure the value is correctly rendered as well, so make sure you choose the correct technique when testing your computed properties, and test all the edge cases.