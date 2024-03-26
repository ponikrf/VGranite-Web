<template>
    <span v-if="status">{{ status }}</span>
    <span v-if="!status"><i class="bi bi-x-octagon"></i></span>
</template>
  
  <script>
  import { inject, ref } from 'vue'
  
  export default {
    name: 'SourceView',
    props: ['id'],
    setup(props){
      const sources = inject('sources')
      let status = ref('')
      return {  status, p: props, sources }
    },
    mounted (){
        this.status = this.sources[this.p.id]
    }
  }
  </script>
  