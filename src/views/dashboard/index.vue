<template>
  <div>
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Card from './card'
import Sale from './sale'
import Observe from './observe'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Observe
  }
}
</script>

<style scoped>

</style>
