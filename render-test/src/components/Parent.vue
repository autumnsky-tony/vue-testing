<template>
  <div>
    Parent
    <Child />
  </div>
</template>

<script>
import Child from '@/components/Child'
export default {
  name: 'Parent',
  components: {
    Child,
  }
}
</script>

<style>

</style>