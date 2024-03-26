<template>
    <div class="form-group mb-3">
        <label>{{ field.label }}</label>
        <input
            v-model="form[field.model]"
            v-bind:type="field.type"
            class="form-control"
        />
        <small class="form-text text-muted">{{ field.description }}</small>
    </div>
</template>
  
<script>
export default {
    props: ["model", "field"],
    name: 'FieldTextView',
    mounted(){
        if (this.model[this.field.model] === undefined){
            this.form[this.field.model] = this.field.default
        }
    },
    data: function (){
        return {
            form: this.model
        }
    }
}
</script>
  