import getters from "../../src/store/getters.js"
// getter 또한 분리 테스트로 진행

const dogs = [
  { name: "lucky", breed: "poodle", age: 1 },
  { name: "pochy", breed: "dalmatian", age: 2 },
  { name: "blackie", breed: "poodle", age: 4 }
]
const state = { dogs }

describe("poodles", () => {
  it("returns poodles", () => {
    // 실제 getter - state 동작과 흡사하게 가지고 있는 state를 그대로 getter에 넘김
    const actual = getters.poodles(state)

    expect(actual).toEqual([ dogs[0], dogs[2] ])
  })
})


describe("poodlesByAge", () => {
  it("returns poodles by age", () => {
    // getters의 poodles를 스텁해서 별도로 테스팅
    // 이렇게 해도 괜찮을까?
    // ㅇㅇ ㄱㅊ : 이미 앞서 poodles 게터 동작을 테스팅했기 때문에!
    // 오히려 poodlesByAge 게터 동작을 분리 테스트를 진행한다는 점에서 매끄러운 느낌
    const poodles = [ dogs[0], dogs[2] ]
    const actual = getters.poodlesByAge(state, { poodles })(1)

    expect(actual).toEqual([ dogs[0] ])
  })
})