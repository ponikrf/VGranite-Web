<template>
    
    <ListHeaderView caption="Connections" path="/connect/add"></ListHeaderView>

    <div class="container">
        <div class="row row-cols-1 row-cols-md-3 g-4 mt-1" v-if="connectTable">
            <div class="col mt-0" v-for="(val, index) in  connectTable" :key="'connect-' + index">
                <ConnectCardView :connect="val"></ConnectCardView>
            </div>
        </div>
    </div>

</template>
  
<script>
import { inject } from 'vue'
import ConnectCardView from '@/components/ConnectCardView.vue'
import ListHeaderView from '@/components/ListHeaderView.vue'
export default {
    name: 'ServersListView',
    components: { ConnectCardView, ListHeaderView },
    setup() {
        const connectTable = inject('connectTable')
        const connects =inject('connects')
        return { connectTable, connects }
    },
}
</script>
  