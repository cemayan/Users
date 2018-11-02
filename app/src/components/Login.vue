<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
        
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="user.username" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="user.password" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-alert
                  :value="true"
                  type="error"
                  v-show="error"
                  outline
                  >
                    Please try again.
                 </v-alert>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login" :disabled="nullCheck">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

  export default {
    data: () => ({
      user : {
        username: '',
        password: '',
      },
      error : false
    }),
    computed: {
        nullCheck() {
            if(this.user.username=='' || this.user.password==''){
              return true
            }
            else{
              return false
            }
        }
    },
    methods: {
      login() {
        var self = this
        fetch('http://localhost:3000/api/auth/login',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(self.user)
       }).then(res=>res.json()).then(function(data){

          if(data.auth){
            localStorage.setItem("token",data.token)
             window.location.href = "/home"
          }
          else{
            self.error = true
          }

       })
      }
    }
  }
</script>