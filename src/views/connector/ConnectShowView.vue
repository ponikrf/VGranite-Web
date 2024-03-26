<template>
    <div class="container">
      <div class="row">
      <GraphView :paths="[getPath()]" :names="['traffic']" header="Connecion"></GraphView>
      <form>
        <div class="card">
          <h5 class="card-header">Connect</h5>
          <div class="card-body">
            <div class="mb-3 d-flex  justify-content-center">
                <SourceView :id="$route.params.from"></SourceView>
                <b><i class="bi bi-arrow-right"></i></b>
                <SourceView :id="$route.params.to"></SourceView>
            </div>
          </div>
          <div class="card-footer text-body-secondary">
            <button @click="remove()" class="btn btn-danger">Delete</button>
          </div>
          <span class="text-danger">{{ message }}</span>
        </div>
      </form>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, ref } from 'vue'
  import SourceView from '@/components/SourceView.vue';
  import GraphView from '@/components/GraphView.vue'
  export default {
    name: 'AddView',
    components: {SourceView, GraphView},
    setup(){
      const request = inject('request')
      const message = ref('')
      const block = ref(false)
      const form = ref({ fromID: '', toID: '' })
      return { form, block, message, request}
    },

    methods: {
      async remove(){
        this.block = true
        try {
            await this.request('post', '/connect/delete', { fromID: this.$route.params.from, toID: this.$route.params.to})
            this.$router.push("/general")
        }catch (error){
            this.message = error.message
        }
        this.block = false
      },
      getPath(){
        return 'connect.'+  this.$route.params.from + '.' + this.$route.params.to
      }
    }
  }
  </script>
  