<template>
  <header class="header">
    <nav id="nav" class="nav">
      <Logo/>
      <div id="toggle-menu" class="toggle-menu" v-if="is_auth">
        <label for="toggle-menu_checkbox">
          <img src="@\assets\icono-menu.png" alt="icono menu">
        </label>
      </div>
    </nav>  
    <input type="checkbox" class="toggle-menu_checkbox" id="toggle-menu_checkbox" v-if="is_auth">
    <ul class="nav-menu" id="nav-menu" v-if="is_auth">
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Productos" class="nav-menu_button btn1">Productos</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Carrito" class="nav-menu_button btn2">Carrito</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Clientes" class="nav-menu_button btn3">Cliente</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Compras" class="nav-menu_button btn4">Compra</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><button v-on:click="logOut" class="nav-menu_button btn5">Salir</button></li>
    </ul>
  </header>
  <main>
    <router-view v-on:log-in="logIn"/>
  </main>
  <footer class="footer">
    <Logo/>
    <a href="https://github.com/AlexDeimon" class="link resaltado">❤️ Diego Sandoval</a>
  </footer>
</template>

<script>
import Logo from "@/components/Logo.vue";
import { defineComponent } from 'vue';
export default defineComponent({
  name: "App",
  components: {
    Logo,
  },
  data: function(){
    return{ 
        is_auth: sessionStorage.getItem('isAuth') || false
      }  
  },
  methods:{
    menu: function(){
      let list = document.getElementById('toggle-menu_checkbox');
      console.log('click');
      list.click();
    },
    updateAuth: function(){
      this.is_auth  = sessionStorage.getItem('isAuth') || false
      if(this.is_auth == false)
        this.$router.push({name: "Auth"})
      else{
        let username = sessionStorage.getItem("current_username")
        this.$router.push({name: "Home", params:{ username: username }})
      }  
    },
    logIn: function(username){
      sessionStorage.setItem('current_username', username)
      sessionStorage.setItem('isAuth', true)
      this.updateAuth()
    },
    logOut: function(){
      sessionStorage.removeItem('isAuth')
      sessionStorage.removeItem('current_username')
      this.updateAuth()
    }
  },
  created: function(){
    this.$router.push({name: "root"})
    this.updateAuth()
  }
});
</script>
<style>
body {
  margin: 0;
}
main {
  position: relative;
  background-image: url("assets/GZ02.jpg");
  background-size: cover;
  background-position: center;
  min-height: 80vh;
  display: flex;
  align-items: center;
  vertical-align: center;
}
.header{
  background-color: black;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.nav{
  flex-wrap: nowrap;
}
.nav-menu {
  padding: 0;
  margin: 0;
  font-size: large;
}
.nav-menu_item {
  padding: 20px 0;
  margin: 0 10px;
  display:inline-block;
}
.nav-menu_button {
  border: 1px solid #E5E7E9;
  color: white;
  border-radius: 5px;
  font-family: "Helvetica";
  text-align: center;
  margin-right: 5px;
  width: 100px;
}
.btn1{
  background-color: #fefb64;
  color: #000;
}
.btn2{
  background-color: #ffb4b0;
  color: #000;
}
.btn3{
  background: #00c8f8;
  color: #000;
}
.btn4{
  background: #ffa834;
  color: #000;
}
.btn5{
  background-color: red;
}
.nav-menu_button:hover{
  cursor: pointer;
  text-decoration: none;
  color: initial;
}
.link,
.nav-menu_button {
  margin: 1%;
  text-decoration: none;
  display: inline-block;
}
.link:hover {
  text-decoration: none;
  color: white;
}
.toggle-menu_checkbox {
  display: none;
} 
.toggle-menu img{
  display: none;
}
@media screen and (max-width: 830px) {
  .header, footer {
    height: 10vh;
  }
  .header .nav{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .nav-menu {
    position: absolute;
    top: 10vh;
    width: 100vw;
    height: 90vh;
    background-color: #000000;
    text-align: center;
    transform: translateX(-100vw);
    transition: all 1s;
    z-index: 10;
  }
  .nav-menu_item {
    padding: 0;
    margin: 0;
    display:inherit;
    background-color: inherit;
    border: none;
  }
  .toggle-menu{
    height: 40px;
  }
  .toggle-menu img{
    display: block;
    max-width: 40px;
    margin-right: 20px;
    filter: invert(1);
  }
  .toggle-menu_checkbox:checked + .nav-menu {
    transform: translateX(0);
    transition: all 1s;
  }
  .nav-menu_item .nav-menu_button{
    display: block;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
  }
}
.input-group-text {
    background: red;
    color: white;
    border: 0.1;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  font-size: large;
}
.header-agregar{
  background-color: #28a745;
  color: white;
}
.header-actualizar{
  background-color: #ffc107;
  color: #000;
}
.header-eliminar{
  background-color:#dc3545 ;
  color: white;
}
.header-buscar{
  background-color: #007bff ;
  color: white;
}
.input-group-text-1 {
  background: #dc3545;
  color: white;
  }
.input-group-text-2 {
  background: #28a745;
  color: white;
  border: 1px solid #000;
  }
.input-group-text-3 {
  background: #007bff;
  color: white;
  border: 1px solid #000;
  }
.input-group-text-4 {
  background: #ffc107;
  color: black;
  border: 1px solid #000;
  }
.form-group .input-group{
  border: 1px solid #000;
  border-radius: 0.25rem;
  margin:5px;
}
.tabla{
  width:100%;
  height: 60vh;
  overflow: auto;
  background-color: #ffffff;
  border: 3px solid #6e6e6e;
  border-radius: 3px;
}
.contenedor2{
  text-align: center;
}
.btn-crud{
  width: 160px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 5px 10px 5px; 
}
.btn-crud, .btn-crud span {
 transition: 200ms;
}
.btn-crud .text{
  transform: translateX(-8px);
}
.btn-crud .icon {
 position: absolute;
 border-left: 1px solid;
 transform: translateX(110px);
 height: 40px;
 width: 38px;
 display: flex;
 align-items: center;
 justify-content: center;
}
.btn-crud:hover .text {
 color: transparent;
}
.btn-crud:hover .icon {
 width: 135px;
 border-left: none;
 transform: translateX(0);
}
.input-group {
  margin: 0 5px 5px 5px; 
}
.error {
  display: none;
  color: red;
  font-weight: bold;
}
.productos{
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 0;
}
#listaProductos{
    background-color: #e9ecef;
}
#productos{
    list-style-type: none;
    margin-bottom: 0;
}
</style>