import { mount } from '@vue/test-utils'
import SubmitButton from '@/components/SubmitButton.vue'

describe("SubmitButton", () => {
  const msg = "submit"
  const factory = (propsData) => {
    return mount(SubmitButton, {
      propsData: {
        msg,
        ...propsData
      }
    })
  }
  
  describe("does not have admin privileges", ()=> {
    it("renders a message", () => {
      const wrapper = factory()

      expect(wrapper.find("span").text()).toBe("Not Authorized")
      expect(wrapper.find("button").text()).toBe("submit")
    })
  })

  describe("has admin privileges", ()=> {
    it("renders a message", () => {
      const wrapper = factory({ isAdmin: true })

      expect(wrapper.find("span").text()).toBe("Admin Privileges")
      expect(wrapper.find("button").text()).toBe("submit")
    })
  })
})