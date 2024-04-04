<template>
    <ListHeaderView :caption="source.caption" :path="'/element/' + source.device + '/add'"></ListHeaderView>
    <div class="container mb-3">
        <div class="row row-cols-1 row-cols-md-3 g-4 mt-1" v-if="list && markers">
            <div class="col mt-0" v-for="(val, index) in  list.list" :key="index + '-server'">
                <StatusCardView :id="index" :identify="val.path" :marker="val.marker" :description="val.description" :status="list.status[index]" :traffic="list.traffic[index]" :source="source"></StatusCardView>
            </div>
        </div>
    </div>
</template>
  
<script>
import { inject, provide, ref } from 'vue'
import StatusCardView from '@/components/StatusCardView.vue'
import ListHeaderView from '@/components/ListHeaderView.vue'
export default {
    name: 'ServersListView',
    props: ['source'],
    components: {StatusCardView, ListHeaderView},
    mounted (){
      this.updateList()
      this.updateMarkers()
    },
    setup() {
        const request = inject('request')
        const list = ref([])
        const markers = ref(false)
        const message = ref({})
        const loading = ref(false)
        provide("markers", markers)
        return { request, list, message, loading, markers }
    },

    methods: {
        async updateList(){
            this.block = true
            try {
                this.list = await this.request('get', this.source.path + 'list', undefined)                
            } catch (error) {
                this.setMessage('Error update list', error.toString())
            }
            this.block = false
        },
        async updateMarkers(){
            this.block = true
            try {
                this.markers = await this.request('get', this.source.path + 'markers', undefined)                
            } catch (error) {
                this.setMessage('Error update markers', error.toString())
            }
            this.block = false
        }

    }
}
</script>
  