<template>
    <div class="form-check mb-3">
        <input v-model="form[field.model]" v-bind:type="field.type" class="form-check-input" v-bind:id="field.model" />
        <label class="form-check-label" style="display: block;" v-bind:for="field.model">{{ field.label }}</label>
        <small class="form-text text-muted" v-bind:for="field.model">{{ field.description }}</small>
    </div>
</template>

<script>
export default {
    props: ["model", "field"],
    name: 'FieldCheckboxView',
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