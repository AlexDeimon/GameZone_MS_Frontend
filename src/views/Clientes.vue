<template>
    <div class="container contenedor2">
        <div class="row justify-content-around">
            <button class="btn btn-success btn-crud" data-bs-toggle="modal" data-bs-target="#nuevocliente" @:click="obtenerCarritos()">
                <span class="text">Nuevo</span>
                <span class="icon"><i class="fas fa-user"></i></span>
            </button>
            <button class="btn btn-warning btn-crud" data-bs-toggle="modal" data-bs-target="#actualizarcliente" @:click="obtenerClientes('ids')">
                <span class="text">Actualizar</span>
                <span class="icon"><i class="fas fa-edit"></i></span>
            </button>
            <button class="btn btn-danger btn-crud" data-bs-toggle="modal" data-bs-target="#eliminarcliente" @:click="obtenerClientes('ids')">
                <span class="text">Eliminar</span>
                <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
            <div class="input-group mb-3 input-group-search">
                <input type="search" placeholder="ID cliente" required v-model="cliente._id">
                <button class="btn btn-primary" type="button" @:click="obtenerCliente(true)"><i class="fas fa-search"></i></button>
            </div>
            <button class="btn btn-primary btn-crud" @:click="obtenerClientes('todo')">
                <span class="text">Ver Clientes</span>
                <span class="icon"><i class="fas fa-tasks"></i></span>
            </button>
        </div>
        <div class="modal fade" id="buscarcliente" tabindex="-1" aria-hidden="true" ref="obtenerclienteModal">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-buscar">
                        <h5 class="modal-title">Cliente</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-id-card"></i></span>
                            <input type="text" class="form-control " placeholder="ID cliente" readonly v-model="cliente._id">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-user"></i></span>
                            <input type="text" class="form-control " placeholder="Nombre" readonly v-model="cliente.nombre">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-user"></i></span>
                            <input type="text" class="form-control " placeholder="Apellidos" readonly v-model="cliente.apellidos">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-at"></i></span>
                            <input type="email" class="form-control " placeholder="Correo" readonly v-model="cliente.correo">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-mobile-alt"></i></span>
                            <input type="tel" class="form-control " placeholder="Teléfono" readonly v-model="cliente.telefono">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-map-marker-alt"></i></span>
                            <input type="text" class="form-control " placeholder="Dirección" readonly v-model="cliente.direccion">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="nuevocliente" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-agregar">
                        <h5 class="modal-title">Nuevo cliente</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @:submit.prevent="agregarCliente()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-id-card"></i></span>
                                <input type="text" class="form-control " placeholder="ID cliente" required v-model="cliente._id">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-user"></i></span>
                                <input type="text" class="form-control " placeholder="Nombre" required v-model="cliente.nombre">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-user"></i></span>
                                <input type="text" class="form-control " placeholder="Apellidos" required v-model="cliente.apellidos">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-map-marker-alt"></i></span>
                                <input type="text" class="form-control " placeholder="Dirección" required v-model="cliente.direccion">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-mobile-alt"></i></span>
                                <input type="tel" class="form-control " placeholder="Teléfono" required v-model="cliente.telefono">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-at"></i></span>
                                <input type="email" class="form-control " placeholder="Correo" required v-model="cliente.correo">
                            </div>
                            <button class="btn btn-success" type="submit">Crear</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="actualizarcliente" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-actualizar">
                        <h5 class="modal-title">Actualizar Cliente</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center">
                        <form @:submit.prevent="actualizarCliente()">
                            <div class="input-group  mb-3">
                                <select class="form-select" v-model="cliente._id" ref="clienteActualizar">
                                    <option v-for="id in clientes_ids" v-bind:key="id">{{ id }}</option>
                                </select>
                                <button class="btn btn-warning" type="button"><i class="fas fa-search" @:click="obtenerCliente(false)"></i></button>
                            </div>
                            <div ref="clienteActualizarForm">
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control " placeholder="Nombre" required v-model="cliente.nombre">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control " placeholder="Apellidos" required v-model="cliente.apellidos">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-at"></i></span>
                                    <input type="email" class="form-control " placeholder="Email" required v-model="cliente.correo">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-mobile-alt"></i></span>
                                    <input type="tel" class="form-control " placeholder="Teléfono" required v-model="cliente.telefono">
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text input-group-text-4"><i class="fas fa-map-marker-alt"></i></span>
                                    <input type="text" class="form-control " placeholder="Dirección" required v-model="cliente.direccion">
                                </div>
                                <button class="btn btn-warning" type="submit">Actualizar</button>    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="eliminarcliente" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" >
                <div class="modal-content">
                    <div class="modal-header header-eliminar">
                        <h5 class="modal-title">Eliminar Cliente</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @:submit.prevent="eliminarCliente()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-id-card"></i></span>
                                <select class="form-select" v-model="cliente._id">
                                    <option v-for="id in clientes_ids" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="eliminaCompras" v-model="eliminaCompras">
                                <label class="form-check-label" for="eliminaCompras">¿Eliminar tambien las compras realizadas por este cliente?</label>
                            </div><br>
                            <button class="btn btn-danger" type="submit" >Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="table tabla">
            <table class="table table-striped">
                <tr>
                    <th>ID cliente</th>
                    <th>Nombre completo</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Cantidad de Compras</th>
                </tr>
                <tr v-for="cliente in clientes_list" v-bind:key="cliente._id">
                    <td>{{cliente._id}}</td>
                    <td>{{cliente.nombre}} {{cliente.apellidos}}</td>
                    <td>{{cliente.correo}}</td>
                    <td>{{cliente.telefono}}</td>
                    <td>{{cliente.direccion}}</td>
                    <td>{{cliente.compras.length}}</td>
                </tr>
            </table>
        </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { Modal } from 'bootstrap';
import api from '../ApiConfig';
import Swal from 'sweetalert2';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Clientes",
    data: function(){
        return{
            cliente: {
                _id: "",
                nombre: "",
                apellidos: "",
                direccion: "",
                telefono: "",
                correo: "",
                compras: []
            },
            carrito: {
                _id:"",
                cantidad_productos: "",
                productos: [],
                precioTotal: ""
            },
            clientes_list: [],
            ids_carritos: [],
            clientes_ids: [],
            eliminaCompras: false
        }
    },
    methods: {
        limpiarCampos(){
            this.cliente = {
                _id: "",
                idCarrito: "",
                nombre: "",
                apellidos: "",
                direccion: "",
                telefono: "",
                correo: ""
            };
            this.carrito = {
                _id:"",
                cantidad_productos: "",
                productos: [],
                precioTotal: ""
            };
            this.$refs.clienteActualizar.disabled = false;
        },
        mostrarAlerta(icon, title) {
            Swal.fire({ icon, title });
        },
        async obtenerClientes(tipo){
            try{
                const response = await api.get('/clientes');
                if(tipo === 'todo'){
                    this.clientes_list = response.data;
                }else if(tipo === 'ids'){
                    this.clientes_ids = [];
                    response.data.length > 0 ? this.clientes_ids = response.data.map(cliente => cliente._id) : this.clientes_ids.push("No hay clientes");
                    this.obtenerCarritos();
                    this.$refs.clienteActualizarForm.style.display = "none";
                    return;
                }else{
                    this.clientes_list = response.data;
                    this.clientes_ids = response.data.map(cliente => cliente._id);
                    return;
                }
            }catch(error){
                console.log(error);
            }
        },
        async agregarCliente(){
            try {
                this.cliente._id = this.cliente._id.trim();
                this.cliente.nombre = this.cliente.nombre.trim();
                this.cliente.apellidos = this.cliente.apellidos.trim();
                this.cliente.direccion = this.cliente.direccion.trim();
                this.cliente.telefono = this.cliente.telefono.trim();
                this.cliente.correo = this.cliente.correo.trim();
                await api.post(`clientes/agregar`, this.cliente);
                this.mostrarAlerta('success', `Se ha agregado el cliente ${this.cliente.nombre} ${this.cliente.apellidos}`);
                this.obtenerClientes();
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async obtenerCliente(estado){
            try {
                if(!this.cliente._id.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de cliente');
                    this.limpiarCampos();
                    return;
                } else if(this.cliente._id === "No hay clientes"){
                    this.mostrarAlerta('error', 'No hay clientes registrados');
                    return;
                }
                const response = await api.get(`/clientes/${this.cliente._id}`);
                this.cliente = response.data;
                if(estado){
                    const modalInstance = new Modal(this.$refs.obtenerclienteModal);
                    modalInstance.show();
                } else {
                    this.$refs.clienteActualizar.disabled = true;
                    this.$refs.clienteActualizarForm.style.display = "block";
                }
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async actualizarCliente(){
            try{
                if(!this.cliente._id.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de cliente');
                    this.limpiarCampos();
                    return;
                }
                if(this.cliente._id === "No hay clientes"){
                    this.mostrarAlerta('error', 'No hay clientes registrados para actualizar');
                    return;
                }
                this.cliente.nombre = this.cliente.nombre.trim();
                this.cliente.apellidos = this.cliente.apellidos.trim();
                this.cliente.direccion = this.cliente.direccion.trim();
                this.cliente.telefono = this.cliente.telefono.trim();
                this.cliente.correo = this.cliente.correo.trim();
                await api.put(`/clientes/actualizar/${this.cliente._id}`, this.cliente);
                this.mostrarAlerta('success', `Se ha actualizado el cliente ${this.cliente.nombre} ${this.cliente.apellidos}`);
                this.obtenerClientes();
                this.limpiarCampos();
                this.$refs.clienteActualizarForm.style.display = "none";
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async eliminarCliente(){
            try{
                if(!this.cliente._id.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de cliente');
                    this.limpiarCampos();
                    return;
                }else if (this.cliente._id === "No hay clientes") {
                    this.mostrarAlerta("warning", "No hay clientes para eliminar");
                    this.limpiarCampos();
                    return
                }
                const url = this.eliminaCompras ? 
                    `/clientes/eliminar/${this.cliente._id}?borrarCompras=true` : 
                    `/clientes/eliminar/${this.cliente._id}`;
                const response = await api.delete(url);
                this.mostrarAlerta('success', response.data);  
                this.obtenerClientes();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async obtenerClienteXCarrito(){
            try {
                if(!this.cliente.idCarrito.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de carrito');
                    this.limpiarCampos();
                    return;
                }
                const response = await api.get(`/clientes/verClienteXCarrito/${this.cliente.idCarrito}`);
                this.cliente = response.data;
                const modalInstance = new Modal(this.$refs.obtenerclientecarritoModal);
                modalInstance.show();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async obtenerCarritoXIdCliente(){
            try{
                if(!this.cliente._id.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de cliente');
                    this.limpiarCampos();
                    return;
                }
                const response = await api.get(`/clientes/verCarritoXCliente/${this.cliente._id}`);
                this.carrito = response.data;
                const modalInstance = new Modal(this.$refs.obtenercarritoModal);
                modalInstance.show();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
       async obtenerCarritos(){
            try {
                const response = await api.get('/carritos');
                this.ids_carritos = [];
                response.data.length > 0 ? this.ids_carritos = response.data.map(carrito => carrito._id) : this.ids_carritos.push("No hay carritos");
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>