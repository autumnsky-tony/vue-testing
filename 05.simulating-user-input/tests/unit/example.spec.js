import { shallowMount } from "@vue/test-utils"
import FormSubmitter from "@/components/FormSubmitter.vue"

describe("FormSubmitter", () => {
  it("제출했을 때 알림이 나타난다", async () => {
    const wrapper = shallowMount(FormSubmitter)

    // username이라는 data 변수를 찾고, alice라는 값으로 설정
    wrapper.find("[data-username]").setValue("alice")
    // form 태그를 찾고, submit.prevent(제출 이벤트가 페이지를 다시 로드 하지 않음) 동작을 트리거
    wrapper.find("form").trigger("submit.prevent")

    // 비동기 처리 : 반응성 시스템을 통해 DOM이 업데이트 되었는지 확인하는 로직
    await wrapper.vm.$nextTick()

    // 클래스 message 가 적용된 요소를 찾고, 텍스트를 반환한다.
    expect(wrapper.find(".message").text())
      .toBe("Thank you for your submission, alice.")
  })
})