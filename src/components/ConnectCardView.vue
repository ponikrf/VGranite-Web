<template>
    <div class="card mb-2">
        <div class="card-header p-0 d-flex justify-content-between align-items-center">
            <button @click="$router.push({name:'ConnectShow', params: { from: connect.from, to: connect.to } })" type="button" class="btn btn-light"><i class="bi bi-list"></i></button>
        </div>
        <div class="card-body">
            <span class="card-title p-0 m-0">
                <SourceView :id="connect.from"></SourceView>
                    <b><i class="bi bi-arrow-right"></i></b>
                <SourceView :id="connect.to"></SourceView>
            </span>
        </div>
    </div>
</template>

<script>
import SourceView from '@/components/SourceView.vue';
export default {
    name: 'ConnectCardView',
    props: ['connect'],
    components: { SourceView },
}
</script>