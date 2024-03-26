<template>
    <main class="form-signin w-100 m-auto">
    <form>
        <h1 class="h3 mb-3 fw-normal">Вход</h1>

        <div class="form-floating  m-2">
        <input type="text" :disabled="block" v-model="loginForm['username']" class="form-control" id="floatingInput" placeholder="admin">
        <label for="floatingInput">Username</label>
        </div>

        <div class="form-floating  m-2">
        <input type="password" :disabled="block" v-model="loginForm['password']" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>
        <div class="p-2">
            <button class="btn btn-primary w-100 py-2"  :disabled="block" @click="login()">Sign in</button>
        </div>
        <p class="text-danger p-2">{{ errorMessage }}</p>
    </form>
    </main>
</template>
  

<script>
import { inject, ref } from 'vue'

export default {
  setup: function (){
    const request = inject('request')
    const token = inject('token')
    const loginForm = ref({ username: 'admin', password: 'admin' })
    const block = ref(false)
    const errorMessage = ref('')
    return { request, loginForm, token, block, errorMessage }
  },

  methods: {
    async login(){
        try {
            this.block = true
            const result = await this.request('post', '/users/login', this.loginForm)
            if (result.token) {
                this.token = result.token
                this.$router.push('/general')
            }
        }catch (error){
            if (error.name === "InvalidToken") {
              this.$router.push("/login")
            }
            this.errorMessage = error.message
        }
        this.block = false
    }
  }
}
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}
</style>