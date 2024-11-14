<template>
  <header class="header">
    <nav id="nav" class="nav">
      <Logo />
      <div id="toggle-menu" class="toggle-menu" v-if="is_auth">
        <label for="toggle-menu_checkbox">
          <img src="@\assets\icono-menu.png" alt="icono menu">
        </label>
      </div>
    </nav>
    <input type="checkbox" class="toggle-menu_checkbox" id="toggle-menu_checkbox" v-if="is_auth">
    <ul class="nav-menu" id="nav-menu" v-if="is_auth">
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Categorias" class="nav-menu_button btn1">Categorias</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Productos" class="nav-menu_button btn2">Productos</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Carritos" class="nav-menu_button btn3">Carrito</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Clientes" class="nav-menu_button btn4">Cliente</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><router-link to="/Compras" class="nav-menu_button btn5">Compra</router-link></li>
      <li class="nav-menu_item" v-on:click="menu"><button @click="logOut" class="nav-menu_button btn6">Salir</button></li>
    </ul>
  </header>
  <main>
    <router-view v-on:log-in="logIn" />
  </main>
  <footer class="footer">
    <Logo />
    <a href="https://github.com/AlexDeimon" class="link resaltado">💚 Diego Sandoval</a>
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
  data() {
    return {
      is_auth: sessionStorage.getItem('isAuth') || false
    }
  },
  methods: {
    menu() {
      let list = document.getElementById('toggle-menu_checkbox');
      list.click();
    },
    updateAuth() {
      this.is_auth = sessionStorage.getItem('isAuth') || false
      if (this.is_auth == false)
        this.$router.push({ name: "Auth" })
      else {
        let username = sessionStorage.getItem("current_username")
        this.$router.push({ name: "Home", params: { username: username } })
      }
    },
    logIn(username) {
      sessionStorage.setItem('current_username', username)
      sessionStorage.setItem('isAuth', true)
      this.updateAuth()
    },
    logOut() {
      sessionStorage.removeItem('isAuth')
      sessionStorage.removeItem('current_username')
      this.updateAuth()
    }
  },
  created() {
    this.$router.push({ name: "root" })
    this.updateAuth()
  }
});
</script>
<style>
body {
  margin: 0;
}
main {
  padding: 10px 0;
  position: relative;
  background: url("assets/GZ02.jpg"), #42b883;
  background-blend-mode: luminosity;
  background-size: cover;
  background-position: center;
  min-height: 85vh;
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
  color: black;
}
.btn2{
  background-color: #ffb4b0;
  color: black;
}
.btn3{
  background: #00c8f8;
  color: black;
}
.btn4{
  background: #ffa834;
  color: black;
}
.btn5{
  background: red;
  color: white;
}
.btn6{
  background-color: #42b883;
  color: #35495e;
}
.input-group{
  border: 1px solid black;
  border-radius: 0.25rem;
}
.input-group-text {
    background: #42b883;
    color: #35495e;
}
.input-group-search{
  width: auto;
  border: none;
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
  color: black;
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
  }
.input-group-text-3 {
  background: #007bff;
  color: white;
  }
.input-group-text-4 {
  background: #ffc107;
  color: black;
  }
.tabla{
  width:100%;
  height: 60vh;
  overflow: auto;
  background-color: white;
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
.link,
.nav-menu_button {
  margin: 1%;
  text-decoration: none;
  display: inline-block;
}
.toggle-menu_checkbox {
  display: none;
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
.form-check-label {
    max-width: 260px;
}
.form-check-input:checked {
    background-color: #dc3545;
    border-color: #dc3545;
}
.form-check-input:focus {
    border-color: #fe8686;
    box-shadow: 0 0 0 .25rem rgba(253, 13, 13, 0.25);
}
.form-check .form-check-input {
    float: none;
}
.form-switch .form-check-input:focus {
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e")
}
.btn-crud, .btn-crud span {
 transition: 200ms;
}
.toggle-menu img{
  display: none;
}
@media screen and (max-width: 830px) {
  .nav-menu {
    position: absolute;
    top: 72px;
    width: 100vw;
    height: 85vh;
    background-color: black;
    text-align: center;
    transform: translateX(-100vw);
    transition: all 1s;
    z-index: 10;
  }
  .toggle-menu{
    height: 40px;
  }
  .nav-menu_item {
    padding: 0;
    margin: 0;
    display:inherit;
    background-color: inherit;
    border: none;
  }
  .toggle-menu img{
    display: block;
    max-width: 40px;
    margin-right: 20px;
    filter: invert(1);
  }
  .header .nav{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .nav-menu_item .nav-menu_button{
    display: block;
    width: 90%;
    margin: 10px auto;
    padding: 10px;
  }
  .toggle-menu_checkbox:checked + .nav-menu {
    transform: translateX(0);
    transition: all 1s;
  }
}
.nav-menu_button:hover{
  cursor: pointer;
  text-decoration: none;
}
.link:hover {
  text-decoration: none;
  color: white;
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
#productos{
    list-style-type: none;
    margin-bottom: 0;
}
</style>