/*
 * 전역 객체 모킹
 * Vue.prototype 에 부착한 전역 객체를 mock
 * 혹은 모든 테스트의 default mock을 설정
*/

import { shallowMount } from "@vue/test-utils"
import Bilingual from "@/components/Bilingual.vue"

describe("Bilingual", () => {
  it("성공적으로 렌더한다", () => {
    // const wrapper = shallowMount(Bilingual)
    // [Vue warn]: Error in config.errorHandler: "TypeError: _vm.$t is not a function"
    // vue-i18n을 설치하지 않았기 때문 => $t 메서드는 존재하지 않음
    // mocks 마운팅 옵션을 사용해서 해당 메서드를 mock!!
    const wrapper = shallowMount(Bilingual, {
      mocks: {
        $t: (msg) => msg
      }
    })
  })
})