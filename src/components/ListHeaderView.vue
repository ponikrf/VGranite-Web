<template>
    <div class="container">
        <div class="row">
            <div class="d-flex justify-content-between">      
                <div class="col card">
                    <div class="p-2 ps-3 text-light bg-dark bg-gradient rounded d-flex justify-content-between align-items-center" >
                    <div><b>{{ caption }}</b></div>
                    <div><button class="btn btn-success btn-sm" @click="$router.push(path)"><i class="bi bi-plus-circle"></i></button></div>
                    </div>
               </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'ListHeaderView',
    props: ['caption', 'path']
}
</script>
 <style scoped>
 .list-header-header {
    background-color: #224451;
 }
 </style> 