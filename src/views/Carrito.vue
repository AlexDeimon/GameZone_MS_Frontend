<template>
    <div class="container contenedor2">
        <div class="row justify-content-around">
            <button class="btn btn-success btn-crud" @click="crearCarrito">
                <span class="text">Crear</span>
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
            </button>
            <button class="btn btn-danger btn-crud" data-bs-toggle="modal" data-bs-target="#eliminarcarrito" v-on:click="obtenerCarritos('ids')">
                <span class="text">Eliminar</span>
                <span class="icon"><i class="fas fa-trash"></i></span>
            </button>
            <button class="btn btn-success btn-crud" data-bs-toggle="modal" data-bs-target="#añadirproducto" v-on:click="obtenerCarritos('ids')">
                <span class="text">Nuevo producto</span>
                <span class="icon"><i class="fas fa-plus"></i></span>
            </button>
            <button class="btn btn-danger btn-crud" data-bs-toggle="modal" data-bs-target="#removerproducto" v-on:click="obtenerCarritos('ids')">
                <span class="text">Quitar producto</span>
                <span class="icon"><i class="fas fa-times"></i></span>
            </button>
            <div class="input-group mb-3 input-group-search">
                <input type="search" placeholder="ID del carrito" required v-model="carrito._id">
                <button class="btn btn-primary" type="button" @click="obtenerCarrito()"><i class="fas fa-search"></i></button>
            </div>
            <div class="input-group mb-3 input-group-search">
                <input type="search" placeholder="Carritos por ID Cliente" required v-model="carrito.idCliente">
                <button class="btn btn-primary" type="button" @:click="obtenerCarritosXCliente()"><i class="fas fa-search"></i></button>
            </div>
            <button class="btn btn-primary btn-crud" @click="obtenerCarritos('todo')">
                <span class="text">Ver Carritos</span>
                <span class="icon"><i class="fas fa-tasks"></i></span>
            </button>
        </div>
        <div class="modal fade" id="buscarCarrito" tabindex="-1" aria-hidden="true" ref="obtenercarritoModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-buscar">
                        <h5 class="modal-title">Carrito</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-barcode"></i></span>
                            <input type="text" class="form-control " placeholder="ID carrito" readonly v-model="carrito._id">
                        </div>        
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-shopping-cart"></i></span>
                            <input type="number" class="form-control " placeholder="cantidad de productos" readonly v-model="carrito.cantidad_productos">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-tasks"></i></span>
                            <table>
                                <tr v-for="producto in carrito.productos" :key="producto.producto">
                                    <td scope="col">{{ producto.producto }}</td>
                                    <td scope="col">${{ producto.precio }}</td>
                                    <td scope="col">X {{ producto.cantidadCarrito }}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text input-group-text-3"><i class="fas fa-dollar-sign"></i></span>
                            <input type="text" class="form-control " placeholder="Precio total" readonly v-model="carrito.precioTotal">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="añadirproducto" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-agregar">
                        <h5 class="modal-title">Añadir Producto</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @submit.prevent="agregarProducto()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-barcode"></i></span>
                                <select class="form-select" v-model="carrito._id">
                                    <option v-for="id in ids_carritos" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-gamepad"></i></span>
                                <select class="form-select" v-model="producto.producto">
                                    <option v-for="producto in productos_list" v-bind:key="producto.producto">{{ producto }}</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-2"><i class="fas fa-shopping-cart"></i></span>
                                <input type="number" class="form-control " placeholder="Cantidad" required v-model="cantidadProducto">
                            </div>
                            <button class="btn btn-success" type="submit">Añadir</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="removerproducto" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-eliminar">
                        <h5 class="modal-title">Remover Producto</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @submit.prevent="borrarProducto()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-barcode"></i></span>
                                <select class="form-select" v-model="carrito._id">
                                    <option v-for="id in ids_carritos" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-gamepad"></i></span>
                                <select class="form-select" v-model="producto.producto">
                                    <option v-for="producto in productos_list" v-bind:key="producto.producto">{{ producto }}</option>
                                </select>
                            </div>
                            <button class="btn btn-danger" type="submit">Remover</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="eliminarcarrito" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header header-eliminar">
                        <h5 class="modal-title">Eliminar carrito</h5>
                        <button type="button" class="btn-close" @click="limpiarCampos()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex justify-content-center ">
                        <form @submit.prevent="eliminarCarrito()">
                            <div class="input-group mb-3">
                                <span class="input-group-text input-group-text-1"><i class="fas fa-barcode"></i></span>
                                <select class="form-select" v-model="carrito._id">
                                    <option v-for="id in ids_carritos" v-bind:key="id">{{ id }}</option>
                                </select>
                            </div>
                            <button class="btn btn-danger" type="submit">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="table tabla">
            <table class="table">
                <tr>
                    <th>ID Carrito</th>
                    <th>ID Cliente</th>
                    <th>Cantidad de productos</th>
                    <th>Lista de productos</th>
                    <th>Precio Total</th>
                </tr>
                <tr v-for="carrito in carritos_list" :key="carrito._id">
                    <td>{{ carrito._id }}</td>
                    <td>{{ carrito.idCliente }}</td>
                    <td>{{ carrito.cantidad_productos }}</td>
                    <td id="lista">
                        <ul class="productos">
                            <li v-for="producto in carrito.productos" :key="producto.producto">{{ producto.producto }}
                                ${{ producto.precio }} X {{ producto.cantidadCarrito }}</li>
                        </ul>
                    </td>
                    <td>${{ carrito.precioTotal }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import api from '../ApiConfig';
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Carritos",
    data: function () {
        return {
            producto: {
                _id: "",
                producto: "",
                precio: "",
                cantidadCarrito: 0
            },
            carrito: {
                _id: "",
                cantidad_productos: 0,
                productos: [],
                precioTotal: ""
            },
            cantidadProducto: "",
            carritos_list: [],
            ids_carritos: [],
            productos_list: []
        }
    },
    methods: {
        limpiarCampos() {
            this.carrito = {
                _id: "",
                idCliente: "",
                cantidad_productos: 0,
                productos: [],
                precioTotal: ""
            };
            this.producto = {
                _id: "",
                producto: "",
                precio: "",
                cantidadCarrito: 0
            };
            this.cantidadProducto = "";
        },
        mostrarAlerta(icon, title) {
            Swal.fire({ icon, title });
        },
        async crearCarrito() {
            try {
                await api.post("carritos/crear");
                this.mostrarAlerta("success", "Se ha creado el carrito");
                this.obtenerCarritos('todo');
                this.limpiarCampos();
            } catch (error) {
                console.log(error);
                this.mostrarAlerta("error", error.response.data);
            }
        },
        async agregarProducto() {
            try {
                if (this.producto.producto.trim() === "" || this.carrito._id.trim() === "") {
                    this.mostrarAlerta("error", "Todos los campos son requeridos");
                } else if (this.carrito._id === "No hay carritos") {
                    this.mostrarAlerta("warning", "Debe crear un carrito antes de añadir productos");
                    this.limpiarCampos();
                    return
                } else if (this.producto.producto === "No hay productos") {
                    this.mostrarAlerta("warning", "Debe haber productos para añadir al carrito");
                    this.limpiarCampos();
                    return
                } else {
                    await api.put(`carritos/agregarProducto/${this.carrito._id}/${this.producto.producto}/${this.cantidadProducto}`);
                    this.cantidadProducto === 1 ?
                        this.mostrarAlerta("success", `Se ha añadido ${this.producto.producto} al carrito`) :
                        this.mostrarAlerta("success", `Se han añadido ${this.cantidadProducto} ${this.producto.producto} al carrito`);
                    this.obtenerCarritos('todo');
                    this.limpiarCampos();
                }
            } catch (error) {
                console.log(error);
                this.mostrarAlerta("error", error.response.data.message);
            }
        },
        async borrarProducto() {
            try {
                if (this.producto.producto.trim() === "" || this.carrito._id.trim() === "") {
                    this.mostrarAlerta("error", "Todos los campos son requeridos");
                } else if (this.carrito._id === "No hay carritos") {
                    this.mostrarAlerta("warning", "Debe haber carritos con productos para eliminar");
                    this.limpiarCampos();
                    return
                } else if (this.producto.producto === "No hay productos") {
                    this.mostrarAlerta("warning", "Debe haber productos añadidos en el carrito para eliminar");
                    this.limpiarCampos();
                    return
                } else {
                    await api.put(`carritos/borrarProducto/${this.carrito._id}/${this.producto.producto}`);
                    this.mostrarAlerta("success", `Se ha eliminado ${this.producto.producto} del carrito`);
                    this.obtenerCarritos('todo');
                    this.limpiarCampos();
                }
            } catch (error) {
                this.mostrarAlerta("error", error.response.data.message);
                console.log(error.response);
            }
        },
        async obtenerCarrito() {
            try {
                if (!this.carrito._id.trim()) {
                    this.mostrarAlerta("warning", "Ingrese un ID de carrito");
                    this.limpiarCampos();
                    return;
                } else {
                    const response = await api.get(`carritos/${this.carrito._id}`)
                    this.carrito = response.data;
                    const modalInstance = new Modal(this.$refs.obtenercarritoModal);
                    modalInstance.show();
                }
            } catch (error) {
                this.limpiarCampos();
                this.mostrarAlerta("error", error.response.data.message);
            }
        },
        async obtenerCarritos(tipo) {
            try {
                const response = await api.get("carritos");
                if (tipo === "todo") {
                    this.carritos_list = response.data;
                } else if (tipo === "ids") {
                    this.ids_carritos = [];
                    response.data.length > 0 ? this.ids_carritos = response.data.map(carrito => carrito._id) : this.ids_carritos.push("No hay carritos");
                    this.obtenerProductos();
                } else {
                    this.carritos_list = response.data;
                    this.ids_carritos = response.data.map(carrito => carrito._id);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async obtenerCarritosXCliente() {
            try {
                if (!this.carrito.idCliente.trim()) {
                    this.mostrarAlerta("warning", "Ingrese un ID de cliente");
                    this.limpiarCampos();
                    return;
                } else {
                    const response = await api.get(`carritos/cliente/${this.carrito.idCliente}`);
                    this.carritos_list = response.data;
                    this.limpiarCampos();
                }
            } catch (error) {
                this.limpiarCampos();
                this.mostrarAlerta("error", error.response.data.message);
            }
        },
        async eliminarCarrito() {
            try {
                if (this.carrito._id.trim() === "") {
                    this.mostrarAlerta("warning", "Ingrese un ID de carrito");
                } else if (this.carrito._id === "No hay carritos") {
                    this.mostrarAlerta("warning", "No hay carritos para eliminar");
                    this.limpiarCampos();
                    return
                } else {
                    const response = await api.delete(`carritos/eliminar/${this.carrito._id}`);
                    this.mostrarAlerta("success", response.data.message);
                    this.obtenerCarritos();
                    this.limpiarCampos();
                }
            } catch (error) {
                console.log(error);
                this.mostrarAlerta("error", error.response.data.message);
            }
        },
        async obtenerProductos() {
            try {
                const response = await api.get("productos");
                this.productos_list = [];
                response.data.length > 0 ? this.productos_list = response.data.map(producto => producto.producto) : this.productos_list.push("No hay productos");
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>