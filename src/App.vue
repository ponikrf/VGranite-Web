<template>
  <router-view/>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup: function (){
    const token = ref(false)
    provide('token', token)
    const router = useRouter()
    const request = async (method, path, body) => {
      // Указать полную строку хоста без последнего слеша
      const host = ''
      if (token.value !== false) path = host + path + '?token=' + token.value
      if (body !== undefined) body = JSON.stringify(body)
      const response = await fetch(path, {
        method,
        headers: {"Content-Type": "application/json"},
        body
      })
      const result = await response.json()
      if (result.result === 'error'){ 
        if (result.resultData.name === 'InvalidToken') {
          token.value = false
          router.push('/login')
        }
        throw new Error(result.resultData.message) 
      }
      return result.resultData
    }
    provide('request', request)
    return { token,  }
  },
}
</script>
<style>
</style>
