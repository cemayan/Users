<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
        
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="user.name" name="username" label="Name" type="text"></v-text-field>
                      <v-text-field prepend-icon="person" v-model="user.surname" name="surname" label="Surname" type="text"></v-text-field>
                          <v-text-field prepend-icon="person" v-model="user.username" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="user.password" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register" :disabled="nullCheck">Register</v-btn>
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
        name : '',
        surname : '',
        username: '',
        password: '',
      },
      empty : {
        name : '',
        surname : '',
        username: '',
        password: '',
      }


    }),
    computed: {
        nullCheck() {
            if(this.user.username=='' || this.user.password=='' || this.user.name=='' ||  this.user.surname==''){
              return true
            }
            else{
              return false
            }
        }
    },

    methods: {
      register() {
        var self = this
        fetch('http://localhost:3000/api/auth/register',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(self.user)
       }).then(res=>res.json()).then(function(data){

        if(data.auth){
          self.user = Object.assign({}, self.empty)
          document.location.href = '/signin'
        }
       })
      }
    }
  }
</script>