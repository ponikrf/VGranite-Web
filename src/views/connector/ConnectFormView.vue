<template>
    <div class="container">
      <div class="row">
      <form>
        <div class="card col-md-9">
          <h5 class="card-header">Add connect</h5>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">From port</label>
              <select  v-model="form['fromID']" class="form-select" aria-label="from port">
                <option v-for="(sr, id) in sources" :value="id" :key="'from' + id">{{ sr }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">To port</label>
              <select  v-model="form['toID']" class="form-select" aria-label="to port">
                <option v-for="(sb, id) in sources" :value="id" :key="'to' + id">{{ sb }}</option>
              </select>
            </div>
          </div>
          <div class="card-footer text-body-secondary">
            <button @click="create()" class="btn btn-primary">Add</button>
          </div>
          <span class="text-danger">{{ message }}</span>
        </div>
      </form>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, ref } from 'vue'
  
  export default {
    name: 'AddView',
    setup(){
      const request = inject('request')
      const sources = inject('sources')
      const message = ref('')
      const block = ref(false)
      const form = ref({ fromID: '', toID: '' })
      return { form, block, message, request, sources}
    },

    methods: {
      async create(){
        this.block = true
        try {
            await this.request('put', '/connect/create', this.form)
            this.$router.push("/general")
        }catch (error){
            this.message = error.message
        }
        this.block = false
      }
    }
  }
  </script>
  