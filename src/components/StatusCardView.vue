<template>
    <div class="card mb-1">
        <div class="card-header p-0 d-flex justify-content-between align-items-center">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button @click="$router.push({name: 'EditElement', params: {id: id, device: source.device} })" type="button" class="btn btn-light"><i class="bi bi-list"></i></button>
            </div>
            <span v-if="marker && markers" class="badge rounded-pill " :class="marker">{{ markers[marker] }}</span>
            <button class="btn btn-warning" v-if="status.status !== 'on'" @click="showStatus=!showStatus"><i class="bi bi-exclamation-diamond-fill"></i></button>
            <div class="me-3" :class="{'text-danger': status.status !== 'on','text-success': status.status === 'on'  }"><i class="bi bi-circle-fill"></i></div>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ identify }}</h5>
            <div v-if="showStatus" class="mt-3 mb-3 p-2 text-light rounded bg-danger">{{ status.message }}</div>
            <div v-if="traffic">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div><CIndicator :connect="cts.from"></CIndicator><small>Send:</small></div><div> {{ hS(traffic.out) }} </div><div><i class="bi bi-clock-history"></i> {{ hS(traffic.mOut) }}</div>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div><CIndicator :connect="cts.to"></CIndicator><small>Receive:</small></div><div> {{ hS(traffic.in) }} </div><div><i class="bi bi-clock-history"></i> {{ hS(traffic.mIn) }}</div>
                </div>
            </div>
        </div>
        <div v-if="description" class="card-footer">
            {{ description }}
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import CIndicator from './CIndicatorView.vue';

export default {
    name: 'SourceView',
    props: ['id','identify', 'status', 'traffic','description', 'source', 'marker'],
    components: { CIndicator },
    setup() {
        const connects = inject('connects')
        const cts = ref({to: false, from: false})
        const showStatus = ref(false)
        const markers = inject('markers')
        return { connects, cts, showStatus, markers }
    },
    beforeMount(){
        this.updateIndicators()
    },
    watch: {
        connects: function (){
            this.updateIndicators()
        }
    },
    methods: {
        updateIndicators(){
            for (const index in this.connects){
                if (index === this.id) this.cts.from = true
                for (const tct of this.connects[index]){
                    if (tct === this.id){
                        this.cts.to = true
                        break
                    }
                }
            }
        },

        hS(bytes, si = false, dp = 1) {
            const thresh = si ? 1000 : 1024;
            if (Math.abs(bytes) < thresh) return bytes.toFixed(dp) + " B";
            const units = si
                ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
                : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
            let u = -1;
            const r = 10 ** dp;
            do {
                bytes /= thresh;
                ++u;
            } while (
                Math.round(Math.abs(bytes) * r) / r >= thresh &&
                u < units.length - 1
            );
            return bytes.toFixed(dp) + " " + units[u];
        }

    }
}
</script>