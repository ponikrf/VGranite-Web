<template>
    <div class="container">
        <div class="row">
            <div class="col">
              <Network v-if="showMap" ref="network" id="mapview" :nodes="nodes" :edges="edges"  :options="options" />
            </div>
        </div>
    </div>
</template>

<script>
import { Network } from 'vue3-visjs'
import { inject } from 'vue'

export default {
name: 'GeneralView',
  data() {
    return {
      edges: [
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: '55' },
        { from: 3, to: 3 },
      ],
      nodes: [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" },
        { id: 4, label: "Node 4" },
        { id: '55', label: "Node 5" },
      ],
      options: {
        locale: 'ru',
        interaction: {
          dragNodes:false,
          dragView: false,
          hoverConnectedEdges: false,
          selectable: false,
          zoomView: false
        },
        manipulation: {
          enabled: false,
        },
        nodes: {
          shape: "box",
        },
        physics:{
          enabled: false,
        }
      },
      showMap: false
    }
  },

  setup(){
    const sources = inject('sources')
    const connects = inject('connects')
    return { sources, connects }
  },

  components: { Network },
  mounted (){
    this.updateMap()
  },
  methods: {
    updateMap(){
      this.edges = []
      this.nodes = []
      for (const id in this.sources){
        this.nodes.push({ id, label: this.sources[id] })
        if (!this.connects[id]) continue
        for (const to of this.connects[id]){
          this.edges.push({
            from: id, to: to, arrows: "to"
          })
        }
      }
      this.showMap = true
    }
  }
}
</script>

<style>
#mapview {
height: 600px;
}
</style>
