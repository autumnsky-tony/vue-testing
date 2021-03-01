<template>
  <div>
    Nested Route Query
    <div class="username">
      {{ $route.params.username }}
    </div>
  </div>
</template>

<script>
import { bustCache } from "@/router/bust-cache.js"

export default {
  name: "NestedRouteQuery",
  beforeRouteLeave(to, from, next) {
    bustCache()
    next()
  }
}
</script>