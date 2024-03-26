<template>
  <div class="container mb-2">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="row">
      <nav class="navbar sticky-top bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" @click="$router.push('/general')" href="javascript:void(0)">
            <img :src="require('@/assets/logo.png')" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
            <span class="align-middle ms-2" style="color: #01161e"><b>VGranite</b></span>
          </a>
          <div class="text-end">
            <a href="https://github.com/ponikrf/VGranite" class="btn btn-light"><i class="bi bi-github" style="color: #01161e"></i></a>
            <button @click="$router.push('/map')" type="button" class="btn btn-light"><i class="bi bi-diagram-2-fill" style="color: #01161e"></i></button>
            <button @click="updateList()" type="button" class="btn btn-light me-2"><i class="bi bi-arrow-repeat" style="color: #01161e"></i></button>
          </div>
        </div>
      </nav>
      <div v-if="block" class="col card m-2 p-2">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>Loading content</div><span class="loader"></span>
        </div>
      </div>
    </div>
  </div>
  <router-view v-if="!block"/>
</template>
<script>

import { inject, provide, ref } from 'vue'

export default {
  name: 'HomeView',
  components: {},
  setup(){
    const request = inject('request')
    const token = inject('token')
    const message = ref({})

    const connects = ref({})
    const sources = ref({})
    const sourcesList = ref([])
    const connectTable = ref([])

    provide('connects', connects)
    provide('connectTable', connectTable)
    provide('sources', sources)
    provide('sourcesList', sourcesList)
  
    const block = ref(false)
    return { request, token, message, block, connects, connectTable, sources, sourcesList }
  },

  beforeRouteUpdate(to, from, next) {
    if (this.token === false){ this.$router.push('/login'); return }
    this.updateList()
    next()
  },

  mounted: function (){
    if (this.token === false){ this.$router.push('/login'); return }
    this.updateList()
  },

  methods: {

    async updateList() {
      this.block = true
      const ss = {}
      try {
          this.sourcesList = await this.request('get', '/connect/sources', undefined)
          for (const source of this.sourcesList){
            const c = await this.request('get', source.path + 'list', undefined)
            for (const id in c.list) ss[id] = c.list[id].path
          }
          this.connects = await this.request('get', '/connect/list', undefined)
      } catch (error) {
          this.setMessage('Error update list', error.toString())
      }
      this.block = false
      this.sources = ss
      this.updateConnectTable()
    },

    updateConnectTable(){
      const table = []
      for (const from in this.connects){
        for (const to of this.connects[from]){
          table.push({ from, to }) 
        }
      }
      this.connectTable = table
    },
    
    setMessage(message, subMessage){
      this.message = { message, subMessage }
    }
  }
}
</script>

<style>
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #FF3D00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>