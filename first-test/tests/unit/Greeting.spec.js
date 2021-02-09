// mount : Component를 불러오는 역할
import { mount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'

describe('Greeting.vue', () => {
  it('renders a greeting', () => {
    // 보통 wrapper라는 이름의 변수를 사용
    const wrapper = mount(Greeting)

    // Greeting 컴포넌트가 랜더되는 html 형태 출력하기
    console.log(wrapper.html())
    console.log(wrapper.text())

    // jest의 expect 함수를 통해 테스트
    // https://jestjs.io/docs/en/expect
    // expect(wrapper.html().includes("Vue and TDD")).toBe(true)

    // example : Vue and TDD test 도 가능 (해당 문자열이 들어가 있는지 확인)
    expect(wrapper.text()).toMatch("Vue and TDD")
  })
})