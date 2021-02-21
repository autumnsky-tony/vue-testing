import Emitter from "@/components/Emitter.vue"
import { shallowMount } from "@vue/test-utils"

describe("Emitter", () => {
  it("두 개의 인자를 가진 이벤트를 방출한다", () => {
    const wrapper = shallowMount(Emitter)

    wrapper.vm.emitEvent()
    wrapper.vm.emitEvent()

    console.log(wrapper.emitted())
    // [Object: null prototype] { myEvent: [ [ 'name', 'password' ] ] }

    
    console.log(wrapper.emitted().myEvent)
    expect(wrapper.emitted().myEvent[0]).toEqual(["name", "password"])
  })

  it("컴포넌트를 마운트 하지 않고 이벤트를 방출한다", () => {
    const events = {}
    // $emit은 자바스크립트 객체이므로 mock 가능!
    const $emit = (event, ...args) => { events[event] = [...args] }
    
    // call을 통해 실제 마운트 동작 없이 테스팅이 가능!
    Emitter.methods.emitEvent.call({ $emit })
  
    expect(events.myEvent).toEqual(["name", "password"])

    // call은 보통 created나 mounted같은 라이프 사이클 메서드에서
    // 무거운 작업을 처리해야하는 경우 유용 
    // => 테스트용 컴포넌트가 마운트되지 않기 때문에 라이프 사이클이 동작하지 않음!
  })
})