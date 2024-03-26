<template>
  <div v-for="(header, hi) of struct.blocks" :key="'hi' + hi">
    <h5 >{{ header.label }}</h5>
    <div v-for="(field, fi) of header.fields" :key="'h' + hi + 'f' + fi">
      <component :is="field.type" :model="form" :field="field"></component>
    </div>
  </div>
</template>
<script>
// import { ref } from 'vue'

import FieldTextView from './FieldTextView.vue'
import FieldSelectView from './FieldSelectView.vue'
import FieldCheckboxView from './FieldCheckboxView.vue'
import FieldTextareaView from './FieldTextareaView.vue'
import FieldNumberView from './FieldNumberView.vue'

export default {
  name: 'FormView',
  components: { text: FieldTextView, checkbox: FieldCheckboxView, select: FieldSelectView, textarea: FieldTextareaView, number:FieldNumberView },
  props: ['model', 'struct'],
  data: function(){
    return {
      form: this.model
    }
  },

  mounted(){

  },
}
</script>