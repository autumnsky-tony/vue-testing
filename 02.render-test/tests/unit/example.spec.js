import { shallowMount, mount } from '@vue/test-utils'
import Parent from '@/components/Parent.vue'

describe('Parent.vue', () => {
  it('renders props.msg when passed', () => {
    const shallowWrapper = shallowMount(Parent)
    const mountWrapper = mount(Parent)

    console.log(shallowWrapper.html())
    console.log(mountWrapper.html())
  })
})
