import { mount } from "@vue/test-utils"
import Bilingual from "@/components/Bilingual.vue"


// package.json 설정 및 jest.init.js 설정
// default config 설정을 하고 나면 error 없음

describe("Bilingual", () => {
  it("renders successfully", () => {
    const wrapper = mount(Bilingual)

    expect(wrapper.find(".hello").text()).not.toBe("")
  })
})