import { shallowMount, mount } from '@vue/test-utils'
import Parent from '@/components/Parent.vue'

describe('Parent.vue', () => {
  it('renders props.msg when passed', () => {
    // shallow mount : 자식 요소는 랜더 하지 않는다 (테스트 환경을 격리 할 수 있다)
    const shallowWrapper = shallowMount(Parent)
    // mount : 모든 요소를 랜더
    const mountWrapper = mount(Parent)

    console.log(shallowWrapper.html())
    console.log(mountWrapper.html())
  })
})
