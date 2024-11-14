<template>
    <div class="container contenedor2">
        <div class="row justify-content-around">
            <button class="btn btn-success btn-crud" data-bs-toggle="modal" data-bs-target="#crearcompra" @:click="obtenerClientesYCarrtios()">
                <span class="text">Nueva</span>
                <span class="icon"><i class="fas fa-dollar-sign"></i></span>
            </button>
            <button class="btn btn-danger btn-crud" data-bs-toggle="modal" data-bs-target="#eliminarcompra" @:click="obtenerCompras('ids')">
                <span class="text">Eliminar</span>
                <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
            <div class="input-group mb-3 input-group-search">
                <input type="search" placeholder="Compras por ID Cliente" required v-model="compra.idCliente">
                <button class="btn btn-primary" type="button" @:click="obtenerComprasXCliente()"><i class="fas fa-search"></i></button>
            </div>
            <div class="input-group mb-3 input-group-search">
                <input type="date" placeholder="Filtrar por fecha" required v-model="compra.fecha">
                <button class="btn btn-primary" @:click="obtenerComprasXFecha()"><i class="fas fa-search"></i></button>
            </div>
            <button class="btn btn-primary btn-crud" @:click="obtenerCompras('todo')">
                <span class="text">Ver Compras</span>
                <span class="icon"><i class="fas fa-tasks"></i></span>
            </button>
        </div>
        <div class="modal fade" id="crearcompra" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-agregar">
                        <h5 class="modal-title">Crear Compra</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @:submit.prevent="agregarCompra()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-id-card"></i></span>
                                <select class="form-select" v-model="compra.idCliente">
                                    <option v-for="id in ids_clientes" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-barcode"></i></span>
                                <select class="form-select" v-model="compra.carrito._id">
                                    <option v-for="id in ids_carritos" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <button class="btn btn-success" type="submit">Crear</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="eliminarcompra" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-eliminar">
                        <h5 class="modal-title">Eliminar Compra</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @:submit.prevent="eliminarCompra()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-barcode"></i></span>
                                <select class="form-select" v-model="compra._id">
                                    <option v-for="id in compras_ids" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <button class="btn btn-danger" type="submit" >Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="table tabla">
            <table class="table table-striped">
                <tr>
                    <th>ID Compra</th> 
                    <th>ID Cliente</th>
                    <th>ID Carrito</th>
                    <th>Cantidad de productos</th>
                    <th>Precio Total</th>
                    <th>Fecha</th>
                </tr>
                <tr v-for="compra in compras_list" v-bind:key="compra._id">
                    <td>{{compra._id}}</td>
                    <td>{{compra.idCliente}}</td>
                    <td>{{compra.carrito._id}}</td>
                    <td>{{compra.carrito.cantidad_productos}}</td>
                    <td>$ {{compra.carrito.precioTotal}}</td>
                    <td>{{compra.fecha.substring(0,10)}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import api from '../ApiConfig';
import Swal from 'sweetalert2';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Compras",
    data: function(){
        return{
            compra: {
                _id: "",
                idCliente: "",
                carrito: {
                    _id: "",
                    cantidad_productos: 0,
                    precioTotal: 0
                },
                fecha: "",
            },
            compras_list: [],
            ids_clientes: [],
            ids_carritos: [],
            compras_ids: []
        }
    },
    methods: {
        limpiarCampos(){
            this.compra = {
                _id: "",
                idCliente: "",
                fecha: "",
                carrito: {
                    _id: "",
                    cantidad_productos: 0,
                    precio_total: 0
                }
            }
        },
        mostrarAlerta(icon, title) {
            Swal.fire({ icon, title });
        },
        async agregarCompra(){
            try {
                if(this.compra.idCliente === "No hay clientes"){
                    this.mostrarAlerta('warning', 'Debe haber clientes para crear una compra');
                    this.limpiarCampos();
                    return;
                }
                if(this.compra.carrito._id === "No hay carritos"){
                    this.mostrarAlerta('warning', 'Debe haber carritos para crear una compra');
                    this.limpiarCampos();
                    return;
                }
                await api.post(`/compras/agregar/${this.compra.idCliente}/${this.compra.carrito._id}`);
                this.mostrarAlerta('success', `Compra creada`);
                this.obtenerCompras('todo');
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async obtenerCompras(tipo){
            try {
                const response = await api.get('/compras');
                if(tipo === 'todo'){
                    this.compras_list = response.data;
                } else if(tipo === 'ids'){
                    this.compras_ids = [];
                    response.data.length > 0 ? this.compras_ids = response.data.map(compra => compra._id) : this.compras_ids.push('No hay compras');
                    this.obtenerClientesYCarrtios();
                    return;
                } else{
                    this.compras_list = response.data;
                    this.compras_ids = response.data.map(compra => compra._id)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async obtenerComprasXFecha(){
            try {
                if(!this.compra.fecha.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar una fecha');
                    this.limpiarCampos();
                    return;
                }
                const response = await api.get(`/compras/verComprasXFecha/${this.compra.fecha}`);
                this.compras_list = response.data;
            } catch (error) {
                console.log(error);
                this.limpiarCampos();
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async obtenerComprasXCliente(){
            try {
                if(!this.compra.idCliente.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de cliente');
                    this.limpiarCampos();
                    return;
                }
                const response = await api.get(`/compras/verComprasXCliente/${this.compra.idCliente}`);
                this.compras_list = response.data;
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
                this.limpiarCampos();
            }
        },
        async eliminarCompra(){
            try{
                if(!this.compra._id.trim()){
                    this.mostrarAlerta('warning', 'Debe ingresar un ID de compra');
                    this.limpiarCampos();
                    return;
                } else if (this.compra._id === "No hay compras") {
                    this.mostrarAlerta("warning", "No hay compras para eliminar");
                    this.limpiarCampos();
                    return
                }
                const response = await api.delete(`/compras/eliminar/${this.compra._id}`);
                this.mostrarAlerta('success', response.data.message);  
                this.obtenerCompras();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta('error', error.response.data.message);
            }
        },
        async obtenerClientesYCarrtios(){
            try {
                const response = await api.get('/clientes');
                this.ids_clientes = [];
                response.data.length > 0 ? this.ids_clientes = response.data.map(cliente => cliente._id) : this.ids_clientes.push("No hay clientes");
                const response2 = await api.get('/carritos');
                this.ids_carritos = [];
                response2.data.length > 0 ? this.ids_carritos = response2.data.map(carrito => carrito._id) : this.ids_carritos.push("No hay carritos");
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>