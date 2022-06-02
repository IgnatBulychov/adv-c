<template>
  
</template>

<script>
export default {
  asyncData({redirect, route, $axios}) {
    $axios.$post(`/clicks/${route.query.o}`, {
      link: route.query.u
    })
    return redirect(route.query.u)
  }
}
</script>