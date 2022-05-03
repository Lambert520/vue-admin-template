<template>
  <div>
    <Card></Card>
    <Sale></Sale>
  </div>
</template>

<script>
import Card from './card'
import Sale from './sale'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale
  }
}
</script>

<style scoped>

</style>
