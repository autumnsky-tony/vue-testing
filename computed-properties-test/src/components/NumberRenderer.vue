<template>
  <div>
    {{ numbers }}
  </div>
</template>

<script>
export default {
  name: "NumberRenderer",
  props: {
    even: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    numbers() {
      const evens = []

      // for (let i = 1; i < 10; i++) {
      //   if (i % 2 === 0) {
      //     evens.push(i)
      //   }
      // }

      // yarn test:unit failed!
      // return evens

      // yarn test:unit passes! >>> 홀수인 경우 failed!
      // return evens.join(", ")

      // yarn test:unit passes!
      const odds = []

      for (let i = 1; i < 10; i++) {
        if (i % 2 === 0) {
          evens.push(i)
        } else {
          odds.push(i)
        }
      }
      return this.even === true ? evens.join(", ") : odds.join(", ")
    }
  }
}
</script>