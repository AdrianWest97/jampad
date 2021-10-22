<template>
  <div class="d-flex justify-content-center flex-center">
      <div class="p-2 login-form">
        <b-form method="post" @submit.prevent="login">
            <h3>NoteOne</h3>
            <p>Create notes on the go. Lets get started!</p>
                 <b-alert v-if="error" variant="danger" show>
                   <div  v-if="Array.isArray(error) && error.length > 1">
                   <ul v-for="(err,i) in  error" :key="i">
                     <li>{{err}}</li>
                   </ul>
                   </div>
                   <p v-else>{{error}}</p>
                 </b-alert>
            <div class="form-group">
                <label>Email address</label>
                <b-form-input type="email" v-model="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <b-form-input type="password" v-model="password" class="form-control form-control-lg" />
            </div>

            <b-button variant="success" type="submit" size="lg" class="btn-block">Sign In</b-button>
             <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="">Forgot password ?</router-link>
            </p>

            <p class="text-center mt-2 mb-4">Dont have an account?</p>
        </b-form>
        <b-button @click="register()" variant="dark" size="lg" class="btn-block">Create account</b-button>

      </div>
      </div>

</template>

<script>
export default {
  name:'login',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },

methods:{
async register(){
  try{
     if(this.email != "" && this.password != ""){
      //create user account
      this.username = this.email.split('@')[0];
       await this.$axios.post('/register', {email:this.email, password:this.password, username:this.username});

          await this.$auth.loginWith('local', {
          data: {
          email: this.email,
          password: this.password
          },
        })
        this.$router.push('/')
     }else{
       alert("Please fill out all fields")
     }
  }catch(err){
  this.error = err.response.data;

  }
},


      async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
          email: this.email,
          password: this.password
          }
        })

        this.$router.push('/')
      } catch (err) {
        console.log(err)
  this.error = err.response.data;
      }
    }

}

}
</script>

<style lang="scss" scoped>
.login-form{
  width:400px !important;
}
</style>
