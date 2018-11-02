<template>
  <v-app >
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Users</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content >
      <v-container fluid col>
           <router-view></router-view>
      </v-container>           
    </v-content>
  </v-app>
</template>

<script>
import Users from './components/Users'

export default {
  name: 'App',
  // components: {
  //   Users
  // },
  data () {
    return {
      //
    }
  }
}
</script>
