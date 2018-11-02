import Vue from 'vue'
import Router from 'vue-router'



// var x = fetch('http://localhost:3000/api/auth/me',{
//   method:'GET',
//   headers: {
//     'Content-Type' : 'application/x-www-form-urlencoded',
//     'x-access-token' : localStorage.getItem("token")
//   },
// }).then(res=>res.json()).then(function(data){

//   if(data.auth){

//   }
//   else{
  
//   }
// })





const routerOptions = [


  //Eğer login ise home sayfasına yönlenmesi için
  { path: '/', component: 'Login',  beforeEnter: (to, from, next) => {
    if(localStorage.getItem("token")){
      fetch('http://localhost:3000/api/auth/me',{
        method:'GET',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'x-access-token' : localStorage.getItem("token")
        },
     }).then(res=>res.json()).then(function(data){
        if(data.auth){
          location.href = '/home'
        }
     })
    }
    else{
      next()
    }
  
  } },
  { path: '/signin', component: 'Login',beforeEnter: (to, from, next) => {
        if(localStorage.getItem("token")){

        }
        else{
          next()
        }
  } },
  { path: '/signup', component: 'Register' },
  { path: '/home', component: 'Users' }
]


const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})


Vue.use(Router)


const router = new  Router({
  mode: 'history',
  routes
})

export default router