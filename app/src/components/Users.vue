<template>
  <div >
    <v-toolbar flat color="white">
      <v-toolbar-title>Users</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2" @click.native="save">New user</v-btn>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="currentUser.name" label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="currentUser.surname" label="Surname"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="currentUser.username" label="Username"></v-text-field>
                </v-flex>
                   <v-flex xs12 sm6 md4>
                  <v-text-field v-model="currentUser.password" label="Password"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="saveUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs">{{ props.item.name }}</td>
        <td class="text-xs">{{ props.item.surname }}</td>
           <td class="text-xs">{{ props.item.username }}</td>

        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="edit(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteUser(props.item._id)"
          >
            delete
          </v-icon>
        </td>
      </template>""
      <template slot="no-data">
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      dialog: false,
      editStatus: 0,
      currentUser: {
        _id : '',
        username : '',
        name : '',
        surname : '',
      },
      defaultUser: {
        _id : '',
        username : '',
        name : '',
        surname : '',
      },
      headers: [
          {text: 'Name',value: 'Name'},
          { text: 'Surname', value: 'Surname' },
          { text: 'Username', value: 'username' },
        ],
 
      users: []
    }
  },
  created() {
  
      var self = this
        fetch('http://localhost:3000/api/auth/me',{
          method:'GET',
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'x-access-token' : localStorage.getItem("token")
          },
       }).then(res=>res.json()).then(function(data){

          if(data.auth){
               self.init()
          }
          else{
            window.location.href = "/signin"
          }
       })
  },
  methods : {
    init(){
      var self = this
      fetch('http://localhost:3000/users').then(x=>x.json()).then(function(response){
        self.users = response
      })
    },
    saveUser(){
      var self = this

      if(self.editStatus){

        fetch('http://localhost:3000/users/'+self.currentUser._id,{
              method:'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify(self.currentUser)
        }).then(res=>res.json()).then(function(){
          self.init()
        })

        this.dialog = false
        this.currentUser  = Object.assign({}, this.defaultItem)

      }
      else{
          fetch('http://localhost:3000/api/auth/register',{
              method:'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify(self.currentUser)
        }).then(res=>res.json()).then(function(){
          self.init()
        })

        self.editStatus = 0 
        this.dialog = false
        this.currentUser  = Object.assign({}, this.defaultItem)

      }
    },
    edit(user){

      this.dialog = true
      this.editStatus = 1
      this.currentUser  = Object.assign({}, user)
    },
    save(){
      this.editStatus = 0  
    },
    editUser(user) {
      fetch('http://localhost:3000/users',{
          method:'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(user)
       }).then(res=>res.json());
    },
    deleteUser(id){
      var self = this
          fetch('http://localhost:3000/users/'+ id,{
              method:'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
              }
        }).then(res=>res.json()).then(function(){
          self.init()
        })
    },
    close(){
      this.dialog = false
      this.editStatus = 0
      this.currentUser  = Object.assign({}, this.defaultItem)
    }
  }

  }
</script>

<style>

</style>
