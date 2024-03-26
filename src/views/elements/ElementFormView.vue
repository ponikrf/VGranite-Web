<template>
    <div class="container">
      <div class="row">
        <GraphView v-if="element.path" :paths="[getPathIn(), getPathOut()]" :names="['in', 'out']" :header="element.path"></GraphView>
        <form v-if="struct">
          <div class="card col-lg-6">
            <h5 class="card-header">
              <span v-if="form.id">Edit form</span>
              <span v-if="!form.id">Add element</span>
            </h5>
            <div class="card-body">
              <FormView :model="form" :struct="struct"></FormView>
            </div>
            <div class="card-footer text-body-secondary">
              <button v-if="form.id" :disabled="block" @click="save()" class="btn btn-primary">Save</button>
              <button v-if="!form.id" :disabled="block" @click="add()" class="btn btn-primary">Add</button>
              <button :disabled="block" @click="$router.push('/general')" class="btn btn-light ms-1">Cancel</button>
              <button v-if="form.id" :disabled="block" @click="remove(form.id)" class="btn btn-danger ms-1">Delete</button>
            </div>
            <span class="text-danger">{{ message }}</span>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, ref } from 'vue'
  
  import FormView from '@/components/FormView.vue'
  import GraphView from '@/components/GraphView.vue'

  export default {
    name: 'AddView',
    components: { FormView, GraphView },
    setup(){
      const request = inject('request')
      const sourcesList = inject('sourcesList')
      const message = ref('')
      const struct = ref(false)
      const block = ref(false)
      const form = ref({})
      const source = ref(false)
      const element = ref({})
      return { form, block, message, request, struct, source, sourcesList, element}
    },

    mounted (){
      this.selectSource()
      if (this.$route.params.id) this.getData()
      this.getStruct()
    },

    methods: {

      getPathIn(){
        return 'traffic.'+ this.$route.params.id+'.mIn'
      },
      getPathOut(){
        return 'traffic.'+ this.$route.params.id+'.mOut'
      },

      async getData(){
        this.block = true
        try{
          const list = await this.request('get', this.source.path + 'list', undefined)
          const id = this.$route.params.id
          if (list.list[id] === undefined) this.$router.push('/general')
          Object.assign(this.form, list.list[id])
          Object.assign(this.element, list.list[id])
        }catch(error){
          this.message = error.message
        }
        this.block = false
      },

      selectSource(){
        for (const sc of this.sourcesList) if (sc.device === this.$route.params.device) this.source = sc
      },

      async getStruct(){
        this.block = true
        
        if (!this.source) return
        try {
            this.struct = await this.request('get', this.source.path + 'struct')
        }catch (error){
            this.message = error.message
        }
        this.block = false
      },

      async add(){
        this.block = true
        if (!this.source) return
        try {
            await this.request('put', this.source.path + 'create', this.form)
            this.$router.push("/general")
        }catch (error){
            this.message = error.message
        }
        this.block = false
      },
      
      async save(){
        this.block = true
        try {
            await this.request('put', this.source.path + 'update', this.form)
            this.$router.push("/general")
        }catch (error){
            this.message = error.message
        }
        this.block = false
      },

      async remove(id) {
        this.block = true
        try {
            await this.request('post', this.source.path + 'delete', { id })
            this.$router.push("/general")
        } catch (error) {
            this.message = error.message
        }
        this.block = false
      },
    }
  }
  </script>
  