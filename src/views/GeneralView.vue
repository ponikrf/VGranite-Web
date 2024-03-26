<template>
  <ElementsListView v-for="source in sourcesList" :source="source" :key="source.device"></ElementsListView>
  <ConnectsListVue></ConnectsListVue>
</template>

<script>
import ConnectsListVue from './connector/ConnectsListView.vue'

import ElementsListView from './elements/ElementsListView.vue'

import { inject } from 'vue'

export default {
  name: 'GeneralView',
  components: { 
    ElementsListView,
    ConnectsListVue
  },
  setup() {
    const sourcesList = inject('sourcesList')
    return { sourcesList }
  },
}
</script>
