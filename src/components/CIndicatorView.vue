<template>
    <span v-if="connect" class="text-success ms-1 me-1"><i class="bi bi-hdd-network-fill"></i></span>
    <span v-if="!connect" class="text-danger ms-1 me-1"><i class="bi bi-hdd-network"></i></span>
</template>
  
  <script>
  export default {
    name: 'SourceView',
    props: ['connect'],
  }
  </script>
  