<template>
  <div>

    <div class="detailOrder" v-if="$route.query.orderId">
      <DetailOrder></DetailOrder>
    </div>
    <div class="allOrder" v-else>
      <AllOrder></AllOrder>
    </div>





  </div>
</template>
<script setup lang='ts'>

import AllOrder from './allOrder/index.vue'
import DetailOrder from './detailOrder/index.vue'





</script>
<style scoped lang="scss"></style>