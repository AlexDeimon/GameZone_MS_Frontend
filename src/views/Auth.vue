<template>
    <div class="container contenedor1">
        <loading
        v-model:active="isLoading"
       :can-cancel=false
       :is-full-page=true
       color="#42b883"
       background-color="#000"
       opacity="0.9"
       />
        <div class="card">
            <div class="card-body">
                <ul class="nav nav-tabs justify-content-center" role="tablist">
                    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" data-bs-target="#signIn">Inicia sesión</a></li>
                    <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" data-bs-target="#signUp">Regístrate</a></li>
                </ul>
                <div class="tab-content">
                    <div id="signIn" class="container tab-pane fade" role="tabpanel">
                        <h2>Bienvenido</h2>
                        <form @:submit.prevent="singInForm">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input autocomplete="off" type="email" class="form-control" placeholder="Ingrese email" v-model="singIn.email"/>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                                <input type="password" class="form-control" placeholder="Ingrese password" v-model="singIn.password" />
                            </div>
                            <div class="d-flex justify-content-center login_container">
                                <button type="submit" class="nav-menu_button btn6">Ingresar</button>
                            </div>
                        </form>
                    </div>
                    <div id="signUp" class="container tab-pane fade" role="tabpanel">
                        <h2>Regístrate</h2>
                        <form @:submit.prevent="singUpForm">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                <input autocomplete="off" type="email" class="form-control" placeholder="Ingrese email" v-model="singUp.email" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                                <input type="password" class="form-control" placeholder="Ingrese password" v-model="singUp.password" />
                            </div>
                            <div class="d-flex justify-content-center login_container">
                                <button type="submit" name="button" class="nav-menu_button btn6">Registrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { defineComponent } from 'vue';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import api from '../ApiConfig';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Auth",
    components: {
        Loading
    },
    data: function () {
        return {
            isLoading: true,
            fullpage: true,
            singIn: {
                email: "",
                password: ""
            },
            singUp: {
                email: "",
                password: ""
            },
        }
    },
    methods: {
        mostrarAlerta(icon, title) {
            Swal.fire({ icon, title });
        },
        singUpForm() {
            if (this.singUp.email.length == 0 || /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-z]+$/.test(this.email)) {
                this.mostrarAlerta('warning', 'El correo que intentas registrar es inválido');
            }
            else if (this.singUp.password.length < 8 || (!this.singUp.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/))) {
                this.mostrarAlerta('warning', 'Tu contraseña debe tener al menos una letra mayúscula y mínimo 8 caracteres alfanuméricos');
            } else {
                //* Authenticate the User
                createUserWithEmailAndPassword(auth, this.singUp.email, this.singUp.password).then(() => {
                    this.mostrarAlerta('success', 'Registro exitoso!');
                }).catch(() => {
                    this.mostrarAlerta('error', 'El correo que intentas registrar ya está en uso!');
                });
            }
        },
        singInForm() {
            signInWithEmailAndPassword(auth, this.singIn.email, this.singIn.password).then(() => {
                this.mostrarAlerta('success', 'Inicio de sesión exitoso!');
                this.$emit('log-in', this.singIn.email);
            }).catch(() => {
                this.mostrarAlerta('error', 'Parece que tu correo no está registrado o te has equivocado en tu contraseña!');
            });
        },
        async iniciarApi() {
            await api.get("productos");
            this.isLoading = false;
        }
    },
    created: function(){
        this.iniciarApi();
    }
});
</script>
<style>
h2 {
    margin: 10px;
    color: white;
}
.form-control {
    border-radius: 0 0.25em 0.25em 0;
}
.contenedor1 {
    text-align: center;
    max-width: 320px;
    margin: 0 auto;
    background: black;
    border-color: #35495e;
    border-width: 1px;
    border-style: solid;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 3px white;
}
.card-body {
    padding: 0;
}
.nav-item a {
    color: #42b883
}
.nav-link:focus, .nav-link:hover {
    color:white;
}
.contenedor1 .card {
    background-color: transparent;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
    color: #42b883;
    background-color: black;
    border-bottom-color: black;
}
</style>
