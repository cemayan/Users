<template>
  <v-app >
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span><a href="/" style="text-decoration:none">Users</a></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-btn color="primary" @click="logout" v-show="checkToken" >Logout</v-btn>
    </v-toolbar>

    <v-content >
      <v-container fluid col>
           <router-view ></router-view>
      </v-container>           
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed : {
    checkToken(){
        if(localStorage.getItem("token")){
          return true
        }
        else{
          return false
        }
    }
  },
  methods : {
      logout(){
            localStorage.removeItem("token")
            document.location.href = '/signin'
      },
  }
}
</script>
